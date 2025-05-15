import { useState } from "react";
import axios from "axios";

function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    actividad: "",
    fecha: "",
    horas: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      form.nombre &&
      form.email &&
      form.actividad &&
      form.fecha &&
      form.horas
    ) {
      await axios.post("http://localhost:3001/registros", form);
      alert("Voluntariado registrado con éxito");
    } else {
      alert("Por favor completa todos los campos");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registro-form">
      <input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="actividad"
        placeholder="Actividad de voluntariado"
        onChange={handleChange}
      />
      <input type="date" name="fecha" onChange={handleChange} />
      <input
        type="number"
        name="horas"
        placeholder="Horas dedicadas"
        onChange={handleChange}
      />
      <button type="submit">Registrar Voluntariado</button>
    </form>
  );
}

export default Registro;
