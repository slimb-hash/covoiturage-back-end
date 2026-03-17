CREATE DATABASE IF NOT EXISTS covoiturage;
USE covoiturage;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100),
  prenom VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  password VARCHAR(255),
  role ENUM('passager', 'conducteur', 'admin') DEFAULT 'passager',
  statut ENUM('en_attente', 'certifié', 'rejeté') DEFAULT 'en_attente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trajets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  conducteur_id INT,
  depart VARCHAR(150),
  destination VARCHAR(150),
  date_depart DATETIME,
  places INT,
  prix DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conducteur_id) REFERENCES users(id)
);

CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  passager_id INT,
  trajet_id INT,
  statut ENUM('en_attente', 'confirmé', 'annulé') DEFAULT 'en_attente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (passager_id) REFERENCES users(id),
  FOREIGN KEY (trajet_id) REFERENCES trajets(id)
);
