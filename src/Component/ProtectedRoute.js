// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Component/Login/AuthContext';

const ProtectedRoute = ({ element, roleRequired }) => {
  const { isAuthenticated, role, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or screen
  }

  if (!isAuthenticated) {
    return <Navigate to="/UserLogin" />;
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/Home" />;
  }

  return element;
};

export default ProtectedRoute;
   