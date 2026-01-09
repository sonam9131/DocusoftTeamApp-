import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const agrno = localStorage.getItem("agrno");
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("pass");

  return !!(agrno && email && password);
};

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
