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

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
