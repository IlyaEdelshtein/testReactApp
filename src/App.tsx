import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TodoPage from './pages/TodoPage';
import PageTwo from './pages/PageTwo';
import PageThree from './pages/PageThree';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<TodoPage />} />
      <Route path="/two" element={<PageTwo />} />
      <Route path="/three" element={<PageThree />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  </>
);

export default App;

