import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import { Layout } from "antd";

function App() {
  return (
    <Layout>
      <Layout.Content>
        <LoginForm />
      </Layout.Content>
    </Layout>
  );
}

export default App;
