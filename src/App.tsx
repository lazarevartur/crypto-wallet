import React from 'react';
import './App.css';
import { useWeb3React } from '@web3-react/core';
import LoginForm from './components/loginForm/LoginForm';
import MainLayout from './components/layout/mainLayout/MainLayout';
import UserAccount from './components/userAccount/UserAccount';

function App() {
  const { active } = useWeb3React()
  return (
    <MainLayout>
      {active ? <UserAccount /> : <LoginForm />}
    </MainLayout>
  );
}

export default App;
