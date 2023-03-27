import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const provider = new GoogleAuthProvider();

  //Sign up with Email and Password
  const signup = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      await sendEmailVerification(userCredential.user);
      setError("Verification mail has been sent to your email");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email is already registered");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak");
      } else {
        setError("Failed to sign up. Please try again later.");
      }
    }
  };

  //Sign in with Email and Password
  const signin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userCredential.user.emailVerified) {
        await sendEmailVerification(userCredential.user);
        setError("Please verify your email address to login.");
      }
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("Incorrect Password");
      } else if (error.code === "auth/user-not-found") {
        setError("Invalid User");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid Email");
      } else {
        console.log(error.code);
        setError("Failed to log in. Please try again later.");
      }
    }
  };

  //Google Sign in
  const googleSignIn = async () => {
    await signInWithRedirect(auth, provider);
  };

  //Sign out
  const signout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/");
  };

  //Set user onAuthStateChanged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Check if email is verfied if not sign out the user, if verfied navigate to the app
      if (currentUser && !currentUser.emailVerified) {
        signOut(auth);
      } else if (currentUser && currentUser.emailVerified) {
        setUser(currentUser);
        navigate("/app/all");
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signin,
        signout,
        googleSignIn,
        signup,
        error,
        setError,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
