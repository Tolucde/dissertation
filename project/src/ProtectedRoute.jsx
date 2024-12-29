import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = (() => {
    try {
      return !!JSON.parse(localStorage.getItem('user'));
    } catch {
      return false;
    }
  })();

  return (
    isAuthenticated ? (
      <Component {...rest} />
    ) : (
      <Navigate to="/login" state={{ from: rest.location }} replace />
    )
  );
};

export default ProtectedRoute;