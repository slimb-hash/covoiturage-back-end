const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Accès refusé' });
  next();
};

// Tous les users
router.get('/users', auth, isAdmin, (req, res) => {
  db.query('SELECT id, nom, prenom, email, role, statut FROM users', (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.json(results);
  });
});

// Valider un user
router.put('/users/:id/valider', auth, isAdmin, (req, res) => {
  db.query('UPDATE users SET statut = ? WHERE id = ?', ['certifié', req.params.id], (err) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.json({ message: 'Utilisateur validé' });
  });
});

// Rejeter un user
router.put('/users/:id/rejeter', auth, isAdmin, (req, res) => {
  db.query('UPDATE users SET statut = ? WHERE id = ?', ['rejeté', req.params.id], (err) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.json({ message: 'Utilisateur rejeté' });
  });
});

// Stats dashboard
router.get('/stats', auth, isAdmin, (req, res) => {
  db.query('SELECT COUNT(*) as total_users FROM users', (err1, users) => {
    db.query('SELECT COUNT(*) as total_trajets FROM trajets', (err2, trajets) => {
      db.query('SELECT COUNT(*) as total_reservations FROM reservations', (err3, reservations) => {
        res.json({
          total_users: users[0].total_users,
          total_trajets: trajets[0].total_trajets,
          total_reservations: reservations[0].total_reservations
        });
      });
    });
  });
});

module.exports = router;