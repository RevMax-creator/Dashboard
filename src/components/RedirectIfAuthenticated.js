import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ children }) => {
  const {user, loading} = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default RedirectIfAuthenticated;