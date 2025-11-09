import React from 'react';
import Navbar from '../../Pages/Navbar/Navbar';
import Footer from '../../Pages/Footer/Footer';
import RegisterPage from './RegisterPage';

const Register = () => {
  return (
    <div>
      <Navbar></Navbar>
      <RegisterPage></RegisterPage>
      <Footer></Footer>
    </div>
  );
};

export default Register;