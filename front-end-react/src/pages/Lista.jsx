import { useEffect, useState } from "react";
import axios from "axios";

function Lista() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    nombre: "",
    email: "",
    descripcion: "",
    fecha: "",
    categoria: "",
  });

  // Carga las publicaciones desde el backend
  useEffect(() => {
    cargarPublicaciones();
  }, []);

  const cargarPublicaciones = () => {
    axios
      .get("http://localhost:3001/registros")
      .then((res) => setPublicaciones(res.data))
      .catch((err) => console.error(err));
  };

  // Elimina una publicación por índice
  const eliminarPublicacion = async (index) => {
    try {
      await axios.delete(`http://localhost:3001/registros/${index}`);
      cargarPublicaciones();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  // Comienza la edición cargando los datos en el formulario
  const comenzarEdicion = (index) => {
    const pub = publicaciones[index];
    setEditIndex(index);
    setEditForm({ ...pub });
  };

  // Maneja cambios en el formulario de edición
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Guarda los cambios editados enviando PUT al backend
  const guardarEdicion = async () => {
    try {
      await axios.put(`http://localhost:3001/registros/${editIndex}`, editForm);
      setEditIndex(null);
      cargarPublicaciones();
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  // Cancela la edición
  const cancelarEdicion = () => {
    setEditIndex(null);
  };

  return (
    <div className="lista">
      <h2>Publicaciones Registradas</h2>
      <ul>
        {publicaciones.map((item, index) => (
          <li key={index} style={{ marginBottom: "20px" }}>
            {editIndex === index ? (
              <>
                <input
                  name="nombre"
                  value={editForm.nombre}
                  onChange={handleEditChange}
                  placeholder="Nombre"
                />
                <br />
                <input
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  placeholder="Email"
                />
                <br />
                <textarea
                  name="descripcion"
                  value={editForm.descripcion}
                  onChange={handleEditChange}
                  placeholder="Descripción"
                  rows={3}
                  cols={30}
                ></textarea>
                <br />
                <input
                  type="date"
                  name="fecha"
                  value={editForm.fecha}
                  onChange={handleEditChange}
                />
                <br />
                <select
                  name="categoria"
                  value={editForm.categoria}
                  onChange={handleEditChange}
                >
                  <option value="">Selecciona categoría</option>
                  <option value="Tecnología">Tecnología</option>
                  <option value="Educación">Educación</option>
                  <option value="Salud">Salud</option>
                </select>
                <br />
                <button onClick={guardarEdicion}>Guardar</button>{" "}
                <button onClick={cancelarEdicion}>Cancelar</button>
              </>
            ) : (
              <>
                <strong>{item.nombre}</strong> - {item.categoria}
                <br />
                {item.descripcion}
                <br />
                <small>
                  {item.email} - {item.fecha}
                </small>
                <br />
                <br />
                <button onClick={() => comenzarEdicion(index)}>Editar</button>{" "}
                <button onClick={() => eliminarPublicacion(index)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lista;
