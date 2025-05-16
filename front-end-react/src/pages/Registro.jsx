import { useState } from 'react';
import axios from 'axios';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [actividad, setActividad] = useState('');
  const [fecha, setFecha] = useState('');
  const [horas, setHoras] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoRegistro = { nombre, actividad, email, fecha, horas };

    try {
      await axios.post('http://localhost:3001/registros', nuevoRegistro);
      alert('Registro guardado');
      setNombre('');
      setEmail('');
      setActividad('');
      setFecha('');
      setHoras('');
    } catch (error) {
      alert('Error al guardar');
    }
  };

  return (
    <div>
      <h2>Formulario de Voluntariado</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre del voluntario:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Correo electrónico:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />


        <label>Actividad:</label>
        <input
          type="text"
          value={actividad}
          onChange={(e) => setActividad(e.target.value)}
          required
        />

        <label>Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />

        <label>Horas:</label>
        <input
          type="number"
          value={horas}
          onChange={(e) => setHoras(e.target.value)}
          required
        />

        <div className="container-btn">
          <button type="submit" className="guardar-btn">Guardar</button>
          <button type="reset" className="cancelar-btn">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
