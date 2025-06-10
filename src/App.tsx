import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TodoPage from './pages/TodoPage';
import Time from './pages/Time';
import TickTackGame from './pages/TickTackGame';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => (
  <>
    <Header />
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <TodoPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/time"
        element={
          <ProtectedRoute>
            <Time />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ticktackgame"
        element={
          <ProtectedRoute>
            <TickTackGame />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  </>
);

export default App;

