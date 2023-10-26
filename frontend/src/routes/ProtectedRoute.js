import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const ProtectedRoute = ({ children, guestOrder }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (loading === false) {
      if (!isAuthenticated && !guestOrder) {
        // Redirect to login page if not authenticated and not a guest order
        navigate("/login", {
          state: {
            previousUrl: location.pathname,
          },
        });
      }
    }
  }, [isAuthenticated, location.pathname, loading, navigate, guestOrder]);

  if (loading === false) {
    return children;
  }

  // If loading is not finished, you can return a loading indicator or handle it differently.
  return <Spinner />;
};

export default ProtectedRoute;
