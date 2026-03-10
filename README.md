# ⏳ TimeTravel Agency

## 🎬 Livrables du projet

- **URL de la webapp (Vercel) :** [[App]](https://time-travel-agency-webapp-interactive-pwmd0xth0.vercel.app/)
- **Repository GitHub :** [Repository GitHub](https://github.com/Nolan-Courdavault/TimeTravel-Agency-Webapp-Interactive.git)

---

## 📝 Description du projet

**TimeTravel Agency** est une application web vitrine premium proposant des voyages temporels de luxe. L'interface a été conçue pour offrir une expérience utilisateur immersive, élégante et fluide, reflétant le prestige des services proposés (de la Belle Époque parisienne à l'ère du Crétacé).

Ce projet a été réalisé dans le cadre d'un rendu académique (TP) visant à démontrer la maîtrise des technologies front-end modernes et l'intégration d'intelligences artificielles via API.

## ✨ Fonctionnalités (Features)

- **Landing Page Immersive :** Section Hero avec arrière-plan visuel fort et typographie soignée.
- **Galerie Animée :** Présentation des destinations temporelles sous forme de cartes interactives avec effets de survol et animations d'entrée.
- **Système de Réservation :** Modale interactive à plusieurs étapes avec barre de progression pour la réservation de voyages.
- **Chatbot IA ("Agent Temporel") :** Assistant virtuel intégré sous forme de widget flottant, capable de conseiller les utilisateurs sur les différentes époques en temps réel.
- **Modales Informatives :** Gestion centralisée des formulaires de contact et des pages légales (Mentions légales, Politique de confidentialité) sans rechargement de page.
- **Design Responsive & Accessible :** Interface s'adaptant parfaitement aux écrans mobiles, tablettes et ordinateurs de bureau.

## 🛠️ Stack Technique

L'application repose sur une architecture front-end moderne et performante :

- **Framework Core :** React JS (v18) avec TypeScript
- **Bundler :** Vite
- **Styling :** Tailwind CSS (approche utilitaire pour un design sur-mesure)
- **Animations :** Framer Motion (`motion/react` pour des transitions fluides)
- **Icônes :** Lucide React
- **Intelligence Artificielle :** API REST Mistral AI

## 🤖 Transparence IA (Méthodologie Vibe Coding)

Dans le cadre de ce projet et conformément aux exigences de transparence, l'utilisation de l'Intelligence Artificielle a été intégrée à deux niveaux distincts :

1. **Génération de Code (Vibe Coding) :** L'ensemble de la base de code (composants React, logique d'état, intégration Tailwind et Framer Motion) a été généré et itéré en utilisant **Google AI Studio (modèle Gemini)**. Le rôle du développeur a été de concevoir l'architecture, de prompter efficacement (Vibe Coding) et de valider l'intégration technique.
2. **Fonctionnalité Chatbot :** Le widget de discussion ("Agent Temporel") s'appuie sur l'API de **Mistral AI**, en utilisant spécifiquement le modèle `mistral-small-latest` via des requêtes HTTP directes.

## 🧠 Prompts & Démarche (Vibe Coding)

Voici un aperçu des prompts majeurs utilisés pour générer cette application :

- **Prompt Initial (Setup & UI) :** *"Crée une landing page immersive pour une agence de voyage temporel de luxe appelée 'TimeTravel Agency'. Utilise React, Tailwind CSS (avec des tons sombres zinc et des accents ambrés) et Framer Motion pour des animations fluides. Inclus une section Hero avec un arrière-plan visuel fort, une galerie de destinations (Paris 1889, Crétacé, Florence 1504) sous forme de cartes interactives, et une section vidéo."*
- **Prompt Chatbot (Mistral) :** *"Intègre un widget de chat flottant utilisant l'API Mistral AI (modèle mistral-small-latest). Le système prompt doit configurer l'IA comme l'assistant virtuel de TimeTravel Agency, un expert passionné d'histoire au ton professionnel mais chaleureux, capable de conseiller sur les destinations (Paris 1889, Crétacé, Florence 1504) et d'inventer des prix luxueux."*
- **Prompt Modales & Réservation :** *"Rends les boutons de réservation fonctionnels en créant une modale de réservation interactive à plusieurs étapes (Détails du voyage, Informations personnelles, Confirmation) avec une barre de progression. Ajoute également une modale de quiz de personnalité pour suggérer une destination, et des modales pour les détails de chaque destination."*

## 💡 Réflexion sur le processus

Le Vibe Coding a rendu la création de cette application web extrêmement intuitive et rapide. Cette approche permet de se concentrer sur la vision globale, l'architecture et l'expérience utilisateur, tout en générant du code de haute qualité presque instantanément. L'intégration et la configuration de l'API de Mistral AI pour le chatbot se sont déroulées avec une très grande facilité.

Cependant, j'ai rencontré un défi technique concernant l'intégration de la vidéo de présentation : la lecture directe de la vidéo nativement sur le site s'est avérée très compliquée, voire impossible, en raison des contraintes de l'environnement de développement et de la gestion des assets volumineux. C'est pourquoi j'ai opté pour une redirection vers un lien externe (Google Drive) lors du clic sur le lecteur vidéo.

## 🚀 Instructions d'installation locale

Pour faire tourner le projet sur votre machine locale, veuillez suivre les étapes ci-dessous :

### 1. Cloner le dépôt
```bash
git clone [INSERER LE LIEN DU REPO GITHUB ICI]
cd timetravel-agency
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement
Créez un fichier `.env` à la racine du projet et ajoutez-y votre clé API Mistral :
```env
VITE_MISTRAL_API_KEY=votre_cle_api_mistral_ici
```

### 4. Lancer le serveur de développement
```bash
npm run dev
```
L'application sera accessible à l'adresse indiquée dans votre terminal (généralement `http://localhost:3000` ou `http://localhost:5173`).

---
*Projet développé et documenté avec soin.*
