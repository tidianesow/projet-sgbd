const express = require('express');
const passport = require('./config/oauth');
const authRoutes = require('./routes/authRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configuration CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/submission', submissionRoutes);
app.use('/exercise', exerciseRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur SGBD !');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});