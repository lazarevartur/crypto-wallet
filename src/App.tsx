import React from 'react';
import './App.css';
import { useWeb3React } from '@web3-react/core';
import LoginForm from './components/loginForm/LoginForm';
import MainLayout from './components/layout/mainLayout/MainLayout';
import UserAccount from './components/userAccount/UserAccount';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

function App() {
  const { active } = useWeb3React()
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <MainLayout>
      <Select defaultValue="ru" style={{ width: 140, paddingBottom: 20 }} onChange={changeLanguage}>
        <Select.Option value="ru">ru</Select.Option>
        <Select.Option value="en">en</Select.Option>
      </Select>
      {active ? <UserAccount /> : <LoginForm />}
    </MainLayout>
  );
}

export default App;
