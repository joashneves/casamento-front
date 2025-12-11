import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Guests from './pages/Guests'; // Will create this next
import './App.css'; // Keep App.css for general styling
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Gifts from './pages/Gifts';
import Admin from './pages/Admin';
import Padrinhos from './pages/Padrinhos';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/padrinhos" element={<Padrinhos />} />
        <Route path="/guests" element={<Guests />} />
        <Route path="/gifts" element={<Gifts/>}/>
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
