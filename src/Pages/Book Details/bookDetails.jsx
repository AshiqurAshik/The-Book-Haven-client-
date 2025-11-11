import React from 'react';
import Navbar from '../Navbar/Navbar';
import SingleBook from './SingleBook';
import Footer from '../Footer/Footer';

const bookDetails = () => {
  return (
    <div>
      <Navbar></Navbar>
      <SingleBook></SingleBook>
      <Footer></Footer>
    </div>
  );
};

export default bookDetails;