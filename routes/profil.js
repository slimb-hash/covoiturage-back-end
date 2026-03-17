const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// Voir profil
router.get('/', auth, (req, res) => {
  db.query('SELECT id, nom, prenom, email, role, statut FROM users WHERE id = ?',
    [req.user.id],
    (err, results) => {
      if (err || results.length === 0) return res.status(404).json({ message: 'Profil non trouvé' });
      res.json(results[0]);
    });
});

// Modifier profil
router.put('/', auth, (req, res) => {
  const { nom, prenom } = req.body;
  db.query('UPDATE users SET nom = ?, prenom = ? WHERE id = ?',
    [nom, prenom, req.user.id],
    (err) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      res.json({ message: 'Profil mis à jour' });
    });
});

module.exports = router;