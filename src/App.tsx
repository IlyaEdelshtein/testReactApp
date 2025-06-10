import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TodoPage from './pages/TodoPage';
import Time from './pages/Time';
import TickTackGame from './pages/TickTackGame';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<TodoPage />} />
      <Route path="/time" element={<Time />} />
      <Route path="/ticktackgame" element={<TickTackGame />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  </>
);

export default App;

