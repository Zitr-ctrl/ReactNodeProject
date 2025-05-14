import { useEffect, useState } from "react";
import axios from "axios";

function Lista() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/registros")
      .then((res) => setPublicaciones(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="lista">
      <h2>Publicaciones Registradas</h2>
      <ul>
        {publicaciones.map((item, index) => (
          <li key={index}>
            <strong>{item.nombre}</strong> - {item.categoria}
            <br />
            {item.descripcion}
            <br />
            <small>
              {item.email} - {item.fecha}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lista;
