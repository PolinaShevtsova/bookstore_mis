import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Catalog_page from './Catalog_page/Catalog_page.js';
import Login_page from './Login_page/Login_page.js';
import Details_page from './Details_page/Details_page.js';

function App(){
  
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login_page />} />
        <Route path="/Catalog" element={<Catalog_page />} />
        <Route path="/new/:id" element={<Details_page />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);