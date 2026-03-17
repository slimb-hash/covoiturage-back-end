const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Inscription
router.post('/register', (req, res) => {
  const { nom, prenom, email, password } = req.body;
  if (!email.endsWith('@lacitec.on.ca'))
    return res.status(400).json({ message: 'Email institutionnel requis' });
  const hash = bcrypt.hashSync(password, 10);
  db.query('INSERT INTO users (nom, prenom, email, password) VALUES (?,?,?,?)',
    [nom, prenom, email, hash],
    (err) => {
      if (err) return res.status(500).json({ message: 'Email déjà utilisé' });
      res.json({ message: 'Compte créé!' });
    });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0)
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    const user = results[0];
    if (!bcrypt.compareSync(password, user.password))
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, nom: user.nom, prenom: user.prenom, email: user.email, role: user.role } });
  });
});

module.exports = router;

