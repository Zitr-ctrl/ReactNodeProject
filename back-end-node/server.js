const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;
const FILE_PATH = path.join(__dirname, 'registros.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// GET /registros - Obtener todos los voluntariados
app.get('/registros', (req, res) => {
  try {
    const raw = fs.readFileSync(FILE_PATH);
    const data = JSON.parse(raw);
    res.json(data);
  } catch (err) {
    console.error('Error al leer registros.json:', err.message);
    res.status(500).json({ error: 'Error al leer registros' });
  }
});

// POST /registros - Crear un nuevo voluntariado
app.post('/registros', (req, res) => {
  try {
    const nuevo = req.body;
    const raw = fs.readFileSync(FILE_PATH);
    const data = JSON.parse(raw);
    data.push(nuevo);
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
    res.status(201).json({ mensaje: 'Voluntariado registrado con éxito' });
  } catch (err) {
    console.error('Error al guardar el voluntariado:', err.message);
    res.status(500).json({ error: 'Error al guardar el voluntariado' });
  }
});

// PUT /registros/:index - Editar un voluntariado por índice
app.put('/registros/:index', (req, res) => {
  try {
    const index = parseInt(req.params.index);
    const updatedRecord = req.body;
    const raw = fs.readFileSync(FILE_PATH);
    const data = JSON.parse(raw);

    if (index < 0 || index >= data.length) {
      return res.status(404).json({ error: 'Índice no válido' });
    }

    // Reemplazar el registro en el índice con el nuevo objeto
    data[index] = updatedRecord;

    // Guardar los datos actualizados en el archivo JSON
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));

    res.json({ mensaje: 'Registro de voluntariado actualizado', registro: updatedRecord });
  } catch (err) {
    console.error('Error al actualizar el voluntariado:', err.message);
    res.status(500).json({ error: 'Error al actualizar el voluntariado' });
  }
});

// DELETE /registros/:index - Eliminar un voluntariado por índice
app.delete('/registros/:index', (req, res) => {
  try {
    const index = parseInt(req.params.index);
    const raw = fs.readFileSync(FILE_PATH);
    const data = JSON.parse(raw);
    
    if (index < 0 || index >= data.length) {
      return res.status(404).json({ error: 'Índice no válido' });
    }

    // Eliminar el voluntariado en el índice especificado
    data.splice(index, 1);

    // Guardar los datos actualizados en el archivo JSON
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));

    res.json({ mensaje: 'Voluntariado eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar voluntariado:', err.message);
    res.status(500).json({ error: 'Error al eliminar voluntariado' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
