import React from 'react';
import errorImg from '../../assets/Error.png';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <img
        src={errorImg}
        alt="404 Not Found"
        className="w-96 h-auto object-contain"
      />
    </div>
  );
};

export default ErrorPage;
