const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// Lister tous les trajets
router.get('/', (req, res) => {
  db.query(
    'SELECT * FROM trajets ORDER BY date_depart DESC',
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      res.json(results);
    }
  );
});

// Rechercher des trajets
router.get('/recherche', (req, res) => {
  const { depart, destination, date } = req.query;

  if (!depart || !destination || !date) {
    return res.status(400).json({
      message: 'Les champs depart, destination et date sont obligatoires'
    });
  }

  db.query(
    'SELECT * FROM trajets WHERE depart LIKE ? AND destination LIKE ? AND DATE(date_depart) = ? ORDER BY date_depart ASC',
    [`%${depart}%`, `%${destination}%`, date],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      res.json(results);
    }
  );
});

// Détail d'un trajet
router.get('/:id', (req, res) => {
  db.query(
    'SELECT * FROM trajets WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur serveur' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Trajet non trouvé' });
      }

      res.json(results[0]);
    }
  );
});

// Créer un trajet
router.post('/', auth, (req, res) => {
  const { depart, destination, date_depart, places, prix } = req.body;

  // Validation des données
  if (!depart || !destination || !date_depart || places == null || prix == null) {
    return res.status(400).json({
      message: 'Tous les champs sont obligatoires'
    });
  }

  if (places <= 0) {
    return res.status(400).json({
      message: 'Le nombre de places doit être supérieur à 0'
    });
  }

  if (prix < 0) {
    return res.status(400).json({
      message: 'Le prix ne peut pas être négatif'
    });
  }

  db.query(
    'INSERT INTO trajets (conducteur_id, depart, destination, date_depart, places, prix) VALUES (?, ?, ?, ?, ?, ?)',
    [req.user.id, depart, destination, date_depart, places, prix],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur serveur' });
      }

      res.status(201).json({
        message: 'Trajet créé avec succès',
        trajetId: result.insertId
      });
    }
  );
});

// Supprimer un trajet
router.delete('/:id', auth, (req, res) => {
  db.query(
    'DELETE FROM trajets WHERE id = ? AND conducteur_id = ?',
    [req.params.id, req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur serveur' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: 'Trajet non trouvé ou non autorisé'
        });
      }

      res.json({ message: 'Trajet supprimé' });
    }
  );
});

module.exports = router;