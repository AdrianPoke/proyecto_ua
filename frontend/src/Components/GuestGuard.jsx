import React from "react";
import { Navigate } from "react-router-dom";

const GuestGuard = ({ children }) => {
  const authToken = localStorage.getItem("authToken");

  if (authToken) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default GuestGuard;