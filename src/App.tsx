import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PageOne from './pages/PageOne';
import PageTwo from './pages/PageTwo';
import PageThree from './pages/PageThree';

const App: React.FC = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<PageOne />} />
      <Route path="/two" element={<PageTwo />} />
      <Route path="/three" element={<PageThree />} />
    </Routes>
  </>
);

export default App;

