import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to='/signin' />;
  }
  return children;
};

export default Protected;
