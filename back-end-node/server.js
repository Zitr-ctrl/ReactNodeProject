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

// GET /registros
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

// POST /registros
app.post('/registros', (req, res) => {
  try {
    const nuevo = req.body;
    const raw = fs.readFileSync(FILE_PATH);
    const data = JSON.parse(raw);
    data.push(nuevo);
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
    res.status(201).json({ mensaje: 'Registro creado' });
  } catch (err) {
    console.error('Error al escribir en registros.json:', err.message);
    res.status(500).json({ error: 'Error al guardar el registro' });
  }
});

// DELETE /registros/:index
app.delete('/registros/:index', (req, res) => {
  try {
    const index = parseInt(req.params.index);
    const raw = fs.readFileSync(FILE_PATH);
    const data = JSON.parse(raw);
    if (index < 0 || index >= data.length) {
      return res.status(404).json({ error: 'Índice no válido' });
    }
    data.splice(index, 1);
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
    res.json({ mensaje: 'Registro eliminado' });
  } catch (err) {
    console.error('Error al eliminar registro:', err.message);
    res.status(500).json({ error: 'Error al eliminar registro' });
  }
});

// PUT /registros/:index
app.put('/registros/:index', (req, res) => {
  try {
    const index = parseInt(req.params.index);
    const updatedRecord = req.body;
    const raw = fs.readFileSync(FILE_PATH);
    const data = JSON.parse(raw);
    if (index < 0 || index >= data.length) {
      return res.status(404).json({ error: 'Índice no válido' });
    }
    data[index] = updatedRecord;
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
    res.json({ mensaje: 'Registro actualizado', registro: updatedRecord });
  } catch (err) {
    console.error('Error al actualizar registro:', err.message);
    res.status(500).json({ error: 'Error al actualizar registro' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
