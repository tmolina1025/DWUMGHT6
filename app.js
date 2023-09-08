// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db'); // Importa la conexión a MongoDB
const Topic = require('./CargaDatosHT6'); // Importa el modelo del tópico

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rutas de la API

// Crear un nuevo dato
app.post('/topics', async (req, res) => {
  try {
    const { id,
      CompanyName,
      OwnerFirst,
      OwnerLast,
      MailingAddress,
      Phone,
      Email,
      Agency,
      CertificationType,
      Certified,
      Capability,
      ServiceType,
      CertifyingAgency,
      Website } = req.body;
    const newTopic = new Topic({ id,
      CompanyName,
      OwnerFirst,
      OwnerLast,
      MailingAddress,
      Phone,
      Email,
      Agency,
      CertificationType,
      Certified,
      Capability,
      ServiceType,
      CertifyingAgency,
      Website});
    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todos los datos
app.get('/topics', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un dato por ID
app.get('/topics/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ error: 'Dato no encontrado' });
    }
    res.json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un dato por ID
app.put('/topics/:id', async (req, res) => {
  try {
    const { id,
      CompanyName,
      OwnerFirst,
      OwnerLast,
      MailingAddress,
      Phone,
      Email,
      Agency,
      CertificationType,
      Certified,
      Capability,
      ServiceType,
      CertifyingAgency,
      Website, } = req.body;
    const updatedTopic = await Topic.findByIdAndUpdate(req.params.id, { id,
      CompanyName,
      OwnerFirst,
      OwnerLast,
      MailingAddress,
      Phone,
      Email,
      Agency,
      CertificationType,
      Certified,
      Capability,
      ServiceType,
      CertifyingAgency,
      Website, }, { new: true });
    if (!updatedTopic) {
      return res.status(404).json({ error: 'Dato no encontrado' });
    }
    res.json(updatedTopic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un dato por ID
app.delete('/topics/:id', async (req, res) => {
  try {
    const deletedTopic = await Topic.findByIdAndRemove(req.params.id);
    if (!deletedTopic) {
      return res.status(404).json({ error: 'Dato no encontrado' });
    }
    res.json(deletedTopic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor API REST en ejecución en el puerto ${port}`);
});
