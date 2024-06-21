const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const notificationRoutes = require('./routes/notifications');

const app = express();
const port = 3000;

// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/cfe', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', notificationRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
