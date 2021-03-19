import '../styles/globals.css';
import React from 'react';
import AuthState from '../context/auth/authState';


const MyApp = ({Component, pageProps}) => {
  return (
    <AuthState>
      <Component />
    </AuthState>
    )
}

export default MyApp
