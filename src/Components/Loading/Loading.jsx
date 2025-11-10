import React from 'react';
import loadingImg from '../../assets/loading.png';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <img
        src={loadingImg}
        alt="Loading..."
        className="w-40 h-40 mb-6 animate-bounce"
      />
      <p className="text-[#3B2C24] text-lg font-medium">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loading;
