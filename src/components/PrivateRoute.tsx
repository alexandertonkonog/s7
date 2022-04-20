import { Navigate, useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { ComponentType, FC } from "react";

const NavigateComponent: FC = () => {
  const location = useLocation();
  return <Navigate to={`/login?path=${location.pathname}`} />;
}

const privateRoute = (Component: JSX.Element, loading: boolean, condition: boolean): React.ReactNode => {
  if (loading) {
    return <CircularProgress />;
  }

  if (!condition) {
    return <NavigateComponent />;
  }

  return Component;
};

export default privateRoute;