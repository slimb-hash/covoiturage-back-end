const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const trajetRoutes = require('./routes/trajets');
const reservationRoutes = require('./routes/reservations');
const profilRoutes = require('./routes/profil');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/trajets', trajetRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/profil', profilRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));