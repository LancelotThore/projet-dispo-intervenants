# 📅 Gestion des disponibilités des intervenants

![Next.js](https://img.shields.io/badge/Next.js-white?style=for-the-badge&logo=next.js&logoColor=black)
![React](https://img.shields.io/badge/React-white?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-white?style=for-the-badge&logo=typescript&logoColor=3178C6)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-white?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-white?style=for-the-badge&logo=postgresql&logoColor=336791)
![Docker](https://img.shields.io/badge/Docker-white?style=for-the-badge&logo=docker&logoColor=2496ED)

⭐ Projet universitaire réalisé en **3ᵉ année de BUT MMI (2024 – 2025)**

Application web permettant de **gérer les disponibilités des intervenants universitaires**.

Le système permet aux intervenants de saisir leurs disponibilités et aux administrateurs de les consulter et les gérer via un **dashboard d’administration**.

# 🎯 Objectif du projet

Ce projet avait pour objectif de concevoir une application permettant de :

* gérer les **intervenants**
* enregistrer leurs **disponibilités**
* permettre aux administrateurs de **consulter et modifier les disponibilités**
* **exporter et importer les données**

Le développement du projet a été réalisé de manière **itérative**.

# ✨ Fonctionnalités

### 👨‍🏫 Gestion des intervenants

* ajout d’un intervenant
* modification d’un intervenant
* suppression d’un intervenant
* régénération d’une clé d’accès

### 📅 Gestion des disponibilités

* ajout d’une disponibilité
* modification d’une disponibilité
* suppression d’une disponibilité
* gestion des disponibilités par défaut
* visualisation des disponibilités

### 🔐 Administration

* dashboard d’administration
* protection de l’accès au dashboard
* gestion des disponibilités par l’administrateur

### 🔄 Import / Export

* export des données en **JSON**
* import de données **JSON**

# 🛠️ Stack technique

### Frontend
- Next.js
- React
- TypeScript
- TailwindCSS

### Backend
- API Routes Next.js
- Node.js

### Base de données
- PostgreSQL

### Environnement
- Docker
- Docker Compose

# 🚀 Lancer le projet

## Prérequis

* Docker
* Docker Compose

## ⚙️ Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/LancelotThore/projet-dispo-intervenants.git
cd projet-dispo-intervenants
```

### 2. Créer le fichier `.env`

```env
AUTH_SECRET=your-secret-key
```

Pour générer une clé sécurisée :

```bash
openssl rand -base64 32
```

ou en **PowerShell** :

```powershell
$bytes = New-Object byte[] 32; $rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::Create(); $rng.GetBytes($bytes); [Convert]::ToBase64String($bytes)
```

### 3. Lancer les conteneurs

```bash
docker compose up -d
```

Les services seront accessibles une fois les conteneurs démarrés.

| Service     | URL                   |
| ----------- | --------------------- |
| Application | http://localhost:3000 |
| pgAdmin     | http://localhost:8080 |

### Arrêter les conteneurs

```bash
docker compose down
```

# 🗄️ Connexion pgAdmin

| Champ    | Valeur                                        |
| -------- | --------------------------------------------- |
| Email    | [admin@example.com](mailto:admin@example.com) |
| Password | admin                                         |

Le serveur PostgreSQL est **configuré automatiquement via Docker**.

# 👤 Compte administrateur par défaut

Défini dans `init.sql` :

| Champ    | Valeur                                      |
| -------- | ------------------------------------------- |
| Email    | [user@example.com](mailto:user@example.com) |
| Password | 123456                                      |

# 🧪 Historique du développement

## 20/12/2024

* Itération 13 : Ajouter une disponibilité
* Itération 14 : Supprimer une disponibilité
* Itération 15 : Édition d’une disponibilité
* Itération 16 : Disponibilités par défaut
* Itération 17 : Gestion des disponibilités par l’administrateur
* Itération 18 : Export JSON
* Itération 19 : Upgrade : la date
* Itération 20 : Les semaines à saisir (upgrade BDD)
* Itération 21 : Import

## 13/12/2024

* Itération 10 : Protection de l'accès au dashboard d’administration
* Itération 12 : Visualisation des disponibilités pour l’intervenant identifié

## 06/12/2024

* Itération 7 : Gestion des intervenants - édition
* Itération 8 : Gestion des intervenants - régénérer la clé
* Itération 11 : Accès par clé

## 29/11/2024

* Itération 2 : Création du dashboard d’administration
* Itération 4 : Gestion des intervenants - lecture
* Itération 5 : Gestion des intervenants - suppression
* Itération 6 : Gestion des intervenants - ajout
* Itération 9 : [BDD] Ajout des administrateurs

## 22/11/2024

* Itération 0 : Mise en place de l’environnement de développement
* Itération 1 : Configuration du projet Next.js
* Itération 3 : [BDD] Ajout des intervenants

# 📚 Contexte pédagogique

Projet réalisé dans le cadre de la **3ᵉ année du BUT MMI (Métiers du Multimédia et de l’Internet)**
à l'**Université de Limoges**.
