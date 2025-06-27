# Guide d'Automatisation Blog VelocitAI

## Vue d'ensemble

Ce système permet d'automatiser complètement la publication d'articles de blog en récupérant le contenu depuis Airtable et en générant automatiquement les fichiers Markdown, en mettant à jour le sitemap et en optimisant le SEO.

## Architecture du système

```
Airtable (Base de données) 
    ↓
Script d'automatisation (Cron quotidien)
    ↓
Génération fichiers Markdown
    ↓
Mise à jour sitemap
    ↓
Publication automatique
```

## Configuration Airtable

### Structure de la table "Blog Articles"

| Champ | Type | Description | Obligatoire |
|-------|------|-------------|-------------|
| Title | Single line text | Titre de l'article | ✅ |
| Slug | Single line text | URL slug (auto-généré si vide) | ❌ |
| Description | Long text | Description courte pour SEO | ✅ |
| Content | Long text | Contenu principal en Markdown | ✅ |
| Author | Single line text | Auteur (défaut: VelocitAI) | ❌ |
| Category | Single select | Catégorie de l'article | ✅ |
| Tags | Multiple select | Tags pour SEO et classification | ❌ |
| Publication Date | Date | Date de publication programmée | ✅ |
| Status | Single select | Draft, Scheduled, Published, Archived | ✅ |
| Featured | Checkbox | Article mis en avant | ❌ |
| SEO Title | Single line text | Titre optimisé SEO | ❌ |
| SEO Description | Long text | Description meta SEO | ❌ |
| SEO Keywords | Multiple select | Mots-clés SEO | ❌ |
| Image URL | URL | Image principale de l'article | ❌ |
| Read Time | Number | Temps de lecture (auto-calculé) | ❌ |
| Published | Checkbox | Statut de publication | ❌ |
| Last Modified | Last modified time | Dernière modification | ❌ |

### Options pour les champs Select

**Status (Single select):**
- Draft
- Scheduled  
- Published
- Archived

**Category (Single select):**
- Stratégie d'Entreprise
- Automatisation
- Intelligence Artificielle
- Productivité
- Transformation Digitale
- Cas d'Usage
- Guides Pratiques

**Tags (Multiple select):**
- automatisation entreprise
- IA
- productivité
- transformation digitale
- ROI
- stratégie
- innovation
- chatbots
- workflows
- optimisation

## Installation et Configuration

### 1. Variables d'environnement

Créez un fichier `.env` avec :

```bash
# Airtable Configuration
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here
```

### 2. Installation des dépendances

```bash
npm install node-fetch
```

### 3. Configuration du cron job

```bash
# Rendre le script de configuration exécutable
chmod +x scripts/setup-cron.sh

# Exécuter la configuration
./scripts/setup-cron.sh
```

### 4. Test du système

```bash
# Test complet du système
node scripts/test-blog-automation.js

# Test manuel d'une publication
node scripts/auto-publish-blog.js
```

## Utilisation

### Workflow de publication

1. **Création dans Airtable :**
   - Créer un nouvel enregistrement
   - Remplir les champs obligatoires
   - Définir la date de publication
   - Mettre le statut sur "Scheduled"

2. **Publication automatique :**
   - Le script s'exécute quotidiennement à 9h
   - Vérifie les articles programmés pour le jour
   - Génère les fichiers Markdown
   - Met à jour le sitemap
   - Change le statut à "Published"

3. **Vérification :**
   - Consulter les logs : `tail -f logs/blog-automation.log`
   - Vérifier la publication sur le site

### Commandes utiles

```bash
# Voir les tâches cron
crontab -l

# Voir les logs en temps réel
tail -f logs/blog-automation.log

# Test manuel
node scripts/auto-publish-blog.js

# Test de connexion Airtable
node scripts/test-blog-automation.js
```

## Fonctionnalités avancées

### Génération automatique de slug

Si le champ "Slug" est vide, le système génère automatiquement un slug SEO-friendly :
- Suppression des accents
- Conversion en minuscules
- Remplacement des espaces par des tirets
- Suppression des caractères spéciaux

### Estimation du temps de lecture

Le système calcule automatiquement le temps de lecture basé sur :
- 200 mots par minute (moyenne de lecture)
- Comptage des mots dans le contenu

### Mise à jour dynamique du sitemap

Le sitemap est automatiquement régénéré avec :
- Toutes les pages existantes
- Nouveaux articles publiés
- Dates de modification
- Priorités SEO (featured = 0.8, normal = 0.7)

### Gestion des erreurs

- Logs détaillés de toutes les opérations
- Continuation en cas d'erreur sur un article
- Sauvegarde automatique des configurations
- Validation des données avant publication

## Structure des fichiers générés

### Front matter YAML

```yaml
---
title: "Titre de l'article"
description: "Description SEO"
slug: "slug-de-l-article"
date: "2024-12-24"
author: "VelocitAI"
category: "Stratégie d'Entreprise"
tags: ["automatisation", "IA", "productivité"]
image: "/images/blog/article-image.jpg"
readTime: 15
featured: true
seo:
  metaTitle: "Titre SEO optimisé"
  metaDescription: "Description meta SEO"
  keywords: ["mot-clé 1", "mot-clé 2"]
---
```

### Contenu Markdown

Le contenu est directement inséré après le front matter, supportant :
- Markdown standard
- Images
- Liens
- Listes
- Code blocks
- Tableaux

## Monitoring et maintenance

### Logs

Les logs sont sauvegardés dans `logs/blog-automation.log` avec :
- Timestamp de chaque opération
- Détails des articles traités
- Erreurs et warnings
- Statistiques de publication

### Surveillance

Surveillez régulièrement :
- Espace disque (logs et articles)
- Fonctionnement du cron job
- Connexion Airtable
- Génération du sitemap

### Maintenance

- Rotation des logs (recommandé mensuel)
- Sauvegarde de la base Airtable
- Vérification des liens et images
- Mise à jour des dépendances

## Dépannage

### Problèmes courants

**Erreur de connexion Airtable :**
- Vérifier l'API key et Base ID
- Contrôler les permissions Airtable
- Tester avec le script de test

**Articles non publiés :**
- Vérifier le statut "Scheduled"
- Contrôler la date de publication
- Consulter les logs d'erreur

**Sitemap non mis à jour :**
- Vérifier les permissions d'écriture
- Contrôler la structure des articles
- Tester la génération manuelle

**Cron job ne fonctionne pas :**
- Vérifier `crontab -l`
- Contrôler les chemins absolus
- Tester le wrapper script

### Support

Pour toute question ou problème :
1. Consulter les logs détaillés
2. Exécuter le script de test
3. Vérifier la configuration Airtable
4. Contacter l'équipe technique VelocitAI

## Évolutions futures

### Fonctionnalités prévues

- Génération automatique d'images avec IA
- Intégration réseaux sociaux
- Analytics de performance
- A/B testing des titres
- Optimisation SEO automatique
- Traduction multilingue

### Personnalisations possibles

- Horaires de publication multiples
- Templates d'articles personnalisés
- Intégration CMS externes
- Notifications Slack/Email
- Validation automatique du contenu