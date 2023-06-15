import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthStatus from "../Hooks/useAuthStatus";

export default function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if(checkingStatus){
    return <h1>loading...</h1>
  }
  return loggedIn ? <Outlet /> : <Navigate to="/Sign-in" />;
}
