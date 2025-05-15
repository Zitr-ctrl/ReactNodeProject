import { useEffect, useState } from "react";
import axios from "axios";

function Lista() {
  const [voluntariados, setVoluntariados] = useState([]);
  const [editIndex, setEditIndex] = useState(null);  // Estado para manejar la edición
  const [editForm, setEditForm] = useState({
    nombre: "",
    email: "",
    actividad: "",
    fecha: "",
    horas: 0,
  });

  useEffect(() => {
    cargarVoluntariados();
  }, []);

  const cargarVoluntariados = () => {
    axios
      .get("http://localhost:3001/registros")
      .then((res) => setVoluntariados(res.data))
      .catch((err) => console.error(err));
  };

  const eliminarVoluntariado = async (index) => {
    try {
      await axios.delete(`http://localhost:3001/registros/${index}`);
      cargarVoluntariados();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const comenzarEdicion = (index) => {
    const vol = voluntariados[index];
    setEditIndex(index);  // Establecer el índice del registro que se está editando
    setEditForm({ ...vol });  // Llenar el formulario con los datos del voluntariado
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const guardarEdicion = async () => {
    try {
      await axios.put(`http://localhost:3001/registros/${editIndex}`, editForm);
      setEditIndex(null);  // Restablecer el estado editIndex después de guardar
      cargarVoluntariados();  // Recargar los voluntariados
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const cancelarEdicion = () => {
    setEditIndex(null);  // Restablecer el estado editIndex cuando se cancela la edición
  };

  return (
    <div className="lista">
      <h2>Voluntariados Registrados</h2>
      <ul>
        {voluntariados.map((item, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  name="nombre"
                  value={editForm.nombre}
                  onChange={handleEditChange}
                />
                <input
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                />
                <input
                  name="actividad"
                  value={editForm.actividad}
                  onChange={handleEditChange}
                />
                <input
                  type="date"
                  name="fecha"
                  value={editForm.fecha}
                  onChange={handleEditChange}
                />
                <input
                  type="number"
                  name="horas"
                  value={editForm.horas}
                  onChange={handleEditChange}
                />
                <button className="guardar-btn" onClick={guardarEdicion}>
                  Guardar
                </button>
                <button className="cancelar-btn" onClick={cancelarEdicion}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <div className="actividad">{item.actividad}</div>
                <div className="persona">{item.nombre} - {item.email}</div>
                <div className="fecha-horas">
                  {item.fecha} - {item.horas} horas
                </div>
                <div className="container-btn">
                  <button className="edit-btn" onClick={() => comenzarEdicion(index)}>
                    Editar
                  </button>
                  <button className="delete-btn" onClick={() => eliminarVoluntariado(index)}>
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lista;
