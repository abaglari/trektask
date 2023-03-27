import { database } from "../firebase";
import { useEffect, useContext, createContext, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  collection,
  onSnapshot,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";

const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
  const { user } = useAuth();
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState();

  const newProject = async (title) => {
    try {
      const currentDate = new Date();
      const projectRef = collection(database, "users", user.uid, "projects");
      const addNewProject = await addDoc(projectRef, {
        title: title,
        dateAdded: currentDate,
      });
      console.log(projectList);
    } catch (error) {
      console.log(error.code);
    }
  };

  const newTask = async (taskDetails) => {
    try {
      const currentDate = new Date();
      const taskRef = collection(
        database,
        "users",
        user.uid,
        "projects",
        taskDetails.projectId,
        "tasks"
      );
      const addNewTask = await addDoc(taskRef, {
        title: taskDetails.title,
        dateAdded: currentDate,
        description: taskDetails.description,
        dueDate: taskDetails.date,
        priority: taskDetails.priority,
        status: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const createUser = async () => {
      try {
        // Create a new user document with the user's UID as the document ID
        await setDoc(doc(database, "users", user?.uid), {
          premium: false,
        });
      } catch (e) {
        console.error(e.code);
      }
    };
    if (user) {
      createUser();
    }
  }, [user]);

  // Fetch current projects of the user and store them in projectList

  useEffect(() => {
    let unsubscribeProjects;
    let unsubscribeTasks = [];
    if (user) {
      unsubscribeProjects = onSnapshot(
        collection(database, "users", user?.uid, "projects"),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => {
            const projectId = doc.id;
            const projectData = doc.data();
            const taskRef = collection(
              database,
              "users",
              user?.uid,
              "projects",
              projectId,
              "tasks"
            );
            const unsubscribeTask = onSnapshot(taskRef, (snapshot) => {
              const taskData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));

              setProjectList((prevProjectList) => {
                const projectIndex = prevProjectList.findIndex(
                  (project) => project.id === projectId
                );
                if (snapshot.empty) {
                  return prevProjectList;
                } else {
                  const updatedProject = {
                    ...prevProjectList[projectIndex],
                    tasks: taskData,
                  };
                  const newProjectList = [...prevProjectList];
                  if (projectIndex !== -1) {
                    newProjectList[projectIndex] = updatedProject;
                  } else {
                    newProjectList.push({
                      id: projectId,
                      ...projectData,
                      tasks: taskData,
                    });
                  }
                  return newProjectList;
                }
              });
            });
            unsubscribeTasks.push(unsubscribeTask);
            return {
              id: projectId,
              ...projectData,
              tasks: [],
            };
          });
          setProjectList(data);
        }
      );
    }

    return () => {
      if (unsubscribeProjects) {
        unsubscribeProjects();
      }
      unsubscribeTasks.forEach((unsubscribeTask) => {
        unsubscribeTask();
      });
    };
  }, [user]);

  return (
    <TaskContext.Provider
      value={{
        user,
        newProject,
        newTask,
        projectList,
        selectedProject,
        setSelectedProject,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  return useContext(TaskContext);
};

export default TaskContextProvider;
