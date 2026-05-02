import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <p className="p-6 text-red-500">Please login first</p>;
  }

  return children;
}

export default ProtectedRoute;