import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute check:", { loading, user, adminOnly });

  if (loading) return null;

  if (!user) {
    console.log("Redirecting: no user found");
    return <Navigate to={adminOnly ? "/admin/login" : "/login"} replace />;
  }

  if (adminOnly && user.role !== "admin") {
    console.log("Redirecting: user is not admin", user.role);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;