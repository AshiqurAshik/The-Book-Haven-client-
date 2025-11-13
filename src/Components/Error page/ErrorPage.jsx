import React from 'react';
import errorImg from '../../assets/Error.png';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#3B2A23] transition-colors duration-500">
      <img
        src={errorImg}
        alt="404 Not Found"
        className="w-96 h-auto object-contain"
      />
    </div>
  );
};

export default ErrorPage;
