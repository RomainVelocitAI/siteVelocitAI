# 🤖 Système d'Automatisation Blog VelocitAI

## 🎯 Vue d'ensemble

Ce système permet d'automatiser complètement la publication d'articles de blog en récupérant le contenu depuis Airtable et en générant automatiquement les fichiers Markdown, en mettant à jour le sitemap et en optimisant le SEO.

## 🚀 Installation rapide

```bash
# 1. Déploiement complet du système
npm run blog:deploy

# 2. Test de la configuration
npm run blog:test

# 3. Configuration du cron job
npm run blog:setup
```

## 📋 Structure Airtable requise

### Table "Blog Articles"

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| **Title** | Single line text | ✅ | Titre de l'article |
| **Slug** | Single line text | ❌ | URL slug (auto-généré si vide) |
| **Description** | Long text | ✅ | Description courte pour SEO |
| **Content** | Long text | ✅ | Contenu principal en Markdown |
| **Author** | Single line text | ❌ | Auteur (défaut: VelocitAI) |
| **Category** | Single select | ✅ | Catégorie de l'article |
| **Tags** | Multiple select | ❌ | Tags pour SEO |
| **Publication Date** | Date | ✅ | Date de publication programmée |
| **Status** | Single select | ✅ | Draft/Scheduled/Published/Archived |
| **Featured** | Checkbox | ❌ | Article mis en avant |
| **SEO Title** | Single line text | ❌ | Titre optimisé SEO |
| **SEO Description** | Long text | ❌ | Description meta SEO |
| **SEO Keywords** | Multiple select | ❌ | Mots-clés SEO |
| **Image URL** | URL | ❌ | Image principale |
| **Published** | Checkbox | ❌ | Statut de publication |

### Options pour les champs Select

**Status:**
- Draft
- Scheduled
- Published
- Archived

**Category:**
- Stratégie d'Entreprise
- Automatisation
- Intelligence Artificielle
- Productivité
- Transformation Digitale

## ⚙️ Configuration

### 1. Variables d'environnement

Créez un fichier `.env` avec :

```bash
# Airtable Configuration
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here
```

### 2. Obtenir les clés Airtable

1. **API Key :** https://airtable.com/account → Generate API key
2. **Base ID :** Dans votre base Airtable → Help → API documentation → Base ID

## 🔄 Workflow de publication

### 1. Création dans Airtable
- Créer un nouvel enregistrement
- Remplir les champs obligatoires
- Définir la date de publication
- Mettre le statut sur "Scheduled"

### 2. Publication automatique
- Script s'exécute quotidiennement à 9h
- Vérifie les articles programmés
- Génère les fichiers Markdown
- Met à jour le sitemap
- Change le statut à "Published"

## 📊 Commandes disponibles

```bash
# Test complet du système
npm run blog:test

# Publication manuelle
npm run blog:publish

# Configuration du cron job
npm run blog:setup

# Déploiement complet
npm run blog:deploy

# Monitoring du système
npm run blog:monitor

# Voir les logs en temps réel
tail -f logs/blog-automation.log

# Voir les tâches cron
crontab -l
```

## 🛠️ Fonctionnalités

### ✨ Génération automatique
- **Slug SEO-friendly** : Suppression accents, caractères spéciaux
- **Temps de lecture** : Calcul automatique (200 mots/min)
- **Front matter YAML** : Métadonnées complètes
- **Sitemap dynamique** : Mise à jour automatique

### 🔍 SEO optimisé
- Métadonnées complètes
- Mots-clés automatiques
- Sitemap XML dynamique
- URLs optimisées

### 📈 Monitoring
- Logs détaillés
- Gestion d'erreurs
- Statistiques de publication
- Alertes automatiques

## 🚨 Dépannage

### Problèmes courants

**❌ Erreur de connexion Airtable**
```bash
# Vérifier la configuration
npm run blog:test
```

**❌ Articles non publiés**
- Vérifier le statut "Scheduled"
- Contrôler la date de publication
- Consulter les logs

**❌ Cron job ne fonctionne pas**
```bash
# Vérifier les tâches cron
crontab -l

# Tester manuellement
npm run blog:publish
```

### Logs et monitoring

```bash
# Voir les logs en temps réel
tail -f logs/blog-automation.log

# Monitoring du système
npm run blog:monitor

# Vérifier les erreurs récentes
grep "❌\|ERROR" logs/blog-automation.log | tail -10
```

## 📁 Structure des fichiers

```
scripts/
├── auto-publish-blog.js          # Script principal d'automatisation
├── test-blog-automation.js       # Tests et validation
├── setup-cron.sh                 # Configuration cron job
├── deploy-blog-automation.sh     # Déploiement complet
└── monitor-blog-automation.sh    # Monitoring système

content/blog/                     # Articles générés
logs/                            # Logs d'exécution
docs/blog-automation-guide.md   # Documentation complète
```

## 🔮 Évolutions futures

- 🖼️ Génération automatique d'images avec IA
- 📱 Intégration réseaux sociaux
- 📊 Analytics de performance
- 🌍 Traduction multilingue
- 📧 Notifications email/Slack

## 📞 Support

Pour toute question :
1. Consulter la documentation complète : `docs/blog-automation-guide.md`
2. Exécuter les tests : `npm run blog:test`
3. Vérifier les logs : `tail -f logs/blog-automation.log`
4. Contacter l'équipe VelocitAI

---

**🎉 Votre système d'automatisation blog est maintenant opérationnel !**

Créez votre premier article dans Airtable et laissez la magie opérer ! ✨