import React from 'react';
import Navbar from '../../Navbar/Navbar';
import Banner from '../Banner';
import RecentBook from '../RecentBook';
import Genre from '../Genre';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <RecentBook></RecentBook>
      <Genre></Genre>
    </div>
  );
};

export default Home;
