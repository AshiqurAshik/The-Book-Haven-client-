import React from 'react';
import Navbar from '../../Navbar/Navbar';
import Banner from '../Banner';
import RecentBook from '../RecentBook';
import Genre from '../Genre';
import TopBooks from '../TopBooks';
import About from '../About';
import BlogSection from './BlogSection ';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <TopBooks></TopBooks>
      <Genre></Genre>
      <RecentBook></RecentBook>
      <BlogSection></BlogSection>
    </div>
  );
};

export default Home;
