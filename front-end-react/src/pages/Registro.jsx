import { useState } from "react";
import axios from "axios";

function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    descripcion: "",
    fecha: "",
    categoria: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      form.nombre &&
      form.email &&
      form.descripcion &&
      form.fecha &&
      form.categoria
    ) {
      await axios.post("http://localhost:3001/registros", form);
      alert("Registro exitoso");
    } else {
      alert("Por favor completa todos los campos");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registro-form">
      <input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        onChange={handleChange}
      ></textarea>
      <input type="date" name="fecha" onChange={handleChange} />
      <select name="categoria" onChange={handleChange}>
        <option value="">Selecciona categoría</option>
        <option value="Tecnología">Tecnología</option>
        <option value="Educación">Educación</option>
        <option value="Salud">Salud</option>
      </select>
      <button type="submit">Registrar</button>
    </form>
  );
}

export default Registro;
