import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../Auth/AuthContext';
import Loading from '../Loading/Loading';

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const location = useLocation();
  console.log(location);

  if (loading) {
    return <Loading></Loading>;
  }

  if (user) {
    return children;
  } else return <Navigate to="/login" state={{ from: location }} replace />;

};

export default PrivateRoute;
