import React from 'react';
import MainMenu from './components/MainMenu';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainMenu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
