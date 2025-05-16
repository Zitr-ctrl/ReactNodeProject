import React from "react";
import { Link } from "react-router-dom";

const containerStyle = {
  height: "100vh",
  background: `linear-gradient(rgba(0,70,130,0.6), rgba(0,70,130,0.6)), url('/68e9bbed-6f67-4cc5-8270-856c5a87c644.png') no-repeat center center / cover`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontWeight: "600",
  textAlign: "center",
  padding: "2rem",
  marginTop: 0,
  textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
};

const headingStyle = {
  fontSize: "1.8rem",
};

const buttonsContainerStyle = {
  marginTop: "2rem",
  display: "flex",
  justifyContent: "center",
  gap: "1.5rem",
};

const buttonStyle = {
  backgroundColor: "#3b82f6",
  color: "white",
  padding: "0.75rem 1.5rem",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "1rem",
  boxShadow: "0 4px 10px rgba(59,130,246,0.3)",
  transition: "background-color 0.3s ease, transform 0.2s ease",
  display: "inline-block",
};

function App() {
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Bienvenido a la Plataforma de Publicaciones</h1>
      <div style={buttonsContainerStyle}>
        <Link to="/registro" style={buttonStyle}>
          Ir a Registro
        </Link>
        <Link to="/lista" style={buttonStyle}>
          Ver Publicaciones
        </Link>
      </div>
    </div>
  );
}

export default App;
