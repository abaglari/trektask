// Importing BrowserRouter

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

//Importing Routes and Components

import SiteLayout from "./components/SiteLayout";
import Home from "./routes/Site Routes/Home";
import Features from "./routes/Site Routes/Features";
import Contact from "./routes/Site Routes/Contact";
import AppLayout from "./components/AppLayout";
import Signin from "./routes/Site Routes/Signin";
import Signup from "./routes/Site Routes/Signup";
import Protected from "./routes/Site Routes/Protected";
import AddProject from "./routes/App Routes/Modals/AddProjects";
import AddTask from "./routes/App Routes/Modals/AddTask";
import AllTasks from "./routes/App Routes/AllTasks";
import Today from "./routes/App Routes/Today";
import Upcoming from "./routes/App Routes/Upcoming";
import Projects from "./routes/App Routes/Projects";

// Importing Context

import TaskContextProvider from "./context/TaskContext";
import AuthContextProvider from "./context/AuthContext";
import MenuContextProvider from "./context/MenuContext";

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <TaskContextProvider>
            <MenuContextProvider>
              <Routes>
                <Route path='/' element={<SiteLayout />}>
                  <Route index element={<Home />} />
                  <Route path='/features' element={<Features />} />
                  <Route path='/contact' element={<Contact />} />
                  <Route path='/signin' element={<Signin />} />
                  <Route path='/signup' element={<Signup />} />
                </Route>
                <Route
                  path='/app'
                  element={
                    <Protected>
                      <AppLayout />
                    </Protected>
                  }
                >
                  <Route path='/app/all' element={<AllTasks />} />
                  <Route path='/app/today' element={<Today />} />
                  <Route path='/app/upcoming' element={<Upcoming />} />
                  <Route path='/app/:project' element={<Projects />} />
                  <Route path='/app/add-project' element={<AddProject />} />
                  <Route path='/app/add-task' element={<AddTask />} />
                </Route>
              </Routes>
            </MenuContextProvider>
          </TaskContextProvider>
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
