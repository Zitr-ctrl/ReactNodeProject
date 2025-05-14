import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Registro from "./pages/Registro.jsx";
import Lista from "./pages/Lista.jsx";
import './styles.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/lista" element={<Lista />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
