const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// Mes réservations
router.get('/mes-reservations', auth, (req, res) => {
  db.query(
    'SELECT r.*, t.depart, t.destination, t.date_depart FROM reservations r JOIN trajets t ON r.trajet_id = t.id WHERE r.passager_id = ?',
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      res.json(results);
    });
});

// Réserver un trajet
router.post('/', auth, (req, res) => {
  const { trajet_id } = req.body;
  db.query(
    'INSERT INTO reservations (passager_id, trajet_id, statut) VALUES (?,?,?)',
    [req.user.id, trajet_id, 'en_attente'],
    (err) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      res.json({ message: 'Réservation effectuée!' });
    });
});

// Annuler une réservation
router.delete('/:id', auth, (req, res) => {
  db.query('DELETE FROM reservations WHERE id = ? AND passager_id = ?',
    [req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      res.json({ message: 'Réservation annulée' });
    });
});

module.exports = router;