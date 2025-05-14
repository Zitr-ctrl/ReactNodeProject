import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Bienvenido a la Plataforma de Publicaciones</h1>
      <Link to="/registro">Ir a Registro</Link><br />
      <Link to="/lista">Ver Publicaciones</Link>
    </div>
  );
}

export default App;
