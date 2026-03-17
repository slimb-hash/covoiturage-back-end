const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// Lister tous les trajets
router.get('/', (req, res) => {
  db.query('SELECT * FROM trajets ORDER BY date_depart DESC', (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.json(results);
  });
});

// Rechercher trajets
router.get('/recherche', (req, res) => {
  const { depart, destination, date } = req.query;
  db.query(
    'SELECT * FROM trajets WHERE depart LIKE ? AND destination LIKE ? AND DATE(date_depart) = ?',
    [`%${depart}%`, `%${destination}%`, date],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      res.json(results);
    });
});

// Détail d'un trajet
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM trajets WHERE id = ?', [req.params.id], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ message: 'Trajet non trouvé' });
    res.json(results[0]);
  });
});

// Créer un trajet (driver)
router.post('/', auth, (req, res) => {
  const { depart, destination, date_depart, places, prix } = req.body;
  db.query(
    'INSERT INTO trajets (conducteur_id, depart, destination, date_depart, places, prix) VALUES (?,?,?,?,?,?)',
    [req.user.id, depart, destination, date_depart, places, prix],
    (err) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      res.json({ message: 'Trajet créé!' });
    });
});

// Supprimer un trajet
router.delete('/:id', auth, (req, res) => {
  db.query('DELETE FROM trajets WHERE id = ? AND conducteur_id = ?',
    [req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      res.json({ message: 'Trajet supprimé' });
    });
});

module.exports = router;
// TODO: ajouter validation des trajets
// Validation des données pour créer un trajet
if (!req.body.depart || !req.body.arrivee || !req.body.date) {
  return res.status(400).json({ message: "Champs obligatoires manquants" });
}

if (req.body.places <= 0) {
  return res.status(400).json({ message: "Nombre de places invalide" });
}