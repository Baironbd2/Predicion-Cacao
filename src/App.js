import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'

import Home from "./components/Home";
import Predictions from "./components/Predictions";
import Navigation from "./components/Navigation";
import History from "./components/History";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predicciones" element={<Predictions />} />
          <Route path="/historial" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
