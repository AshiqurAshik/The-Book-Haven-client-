import React from 'react';
import Navbar from '../../Pages/Navbar/Navbar';
import Footer from '../../Pages/Footer/Footer';
import LoginPage from './LoginPage';

const Login = () => {
  return (
    <div>
      <Navbar></Navbar>
      <LoginPage></LoginPage>
      <Footer></Footer>
    </div>
  );
};

export default Login;
