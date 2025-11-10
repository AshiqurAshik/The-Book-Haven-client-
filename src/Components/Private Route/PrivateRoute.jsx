import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../Auth/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const location = useLocation();
  console.log(location);

  if (loading) {
    return <span className="loading loading-dots loading-l"></span>;
  }

  if (user) {
    return children;
  } else return <Navigate to="/login" state={{ from: location }} replace />;

};

export default PrivateRoute;
