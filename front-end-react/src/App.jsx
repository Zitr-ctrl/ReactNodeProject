import { Routes, Route, Link } from 'react-router-dom';
import Registro from './pages/Registro';
import Lista from './pages/Lista';
import './styles.css';
import imagenVoluntariado from './imagenes/voluntariado.jpg';

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <h1> Voluntariados UNEMI</h1>
        </div>
        <ul className="navbar-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/registro">Formulario</Link></li>
          <li><Link to="/lista">Publicaciones</Link></li>
        </ul>
      </nav>

      <h1>Bienvenidos a Voluntariados UNEMI</h1>
      <Routes>
        <Route
          path="/"
          element={
            <main className="inicio">
               <img src={imagenVoluntariado} alt="Voluntariado" className="hero-img" />
              <div className="modulos">
                <Link to="/registro" className="modulo">Registro de Voluntariado</Link>
                <Link to="/lista" className="modulo">Ver Publicaciones</Link>
              </div>
            </main>
          }
        />
        <Route path="/registro" element={<Registro />} />
        <Route path="/lista" element={<Lista />} />
      </Routes>
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Voluntariados UNEMI — Todos los derechos reservados</p>
          <div className="footer-links">
            <a href="https://unemi.edu.ec" target="_blank" rel="noreferrer">Sitio Oficial</a>
            <a href="mailto:contacto@unemi.edu.ec">Contáctanos</a>
          </div>
        </div>
      </footer>

    </>
  );
}

export default App;
