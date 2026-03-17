# 🚗 Projet Covoiturage – Backend

## Description

Ce projet est une API backend pour une plateforme de covoiturage.
Elle permet aux utilisateurs de créer des trajets, rechercher des trajets et gérer des réservations entre passagers et conducteurs.

## Technologies utilisées

* Node.js
* Express.js
* MySQL
* JWT Authentication
* REST API

## Fonctionnalités principales

### Gestion des utilisateurs

* Inscription
* Connexion
* Gestion du profil
* Rôles (passager, conducteur, admin)

### Gestion des trajets

* Créer un trajet
* Modifier un trajet
* Rechercher un trajet
* Voir les détails d’un trajet

### Gestion des réservations

* Demander une réservation
* Accepter ou refuser une réservation
* Annuler une réservation

## Structure du projet

```
config/
   db.js

middleware/
   auth.js

routes/
   auth.js
   trajets.js
   reservations.js
   profil.js
   admin.js

server.js
database.sql
package.json
```

## Installation

1. Cloner le projet

```
git clone https://github.com/slimb-hash/covoiturage-back-end.git
```

2. Installer les dépendances

```
npm install
```

3. Configurer les variables d'environnement (.env)

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=covoiturage
JWT_SECRET=secret
```

4. Lancer le serveur

```
node server.js
```

Le serveur démarre sur :

```
http://localhost:3000
```

## Base de données

Le fichier **database.sql** contient la structure de la base de données :

* users
* trajets
* reservations

