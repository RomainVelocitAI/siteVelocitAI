# 📝 Workflow Blog Automatisé - Romain VelocitAI

## 🎯 Votre Workflow Idéal

Préparez 20 articles à l'avance dans Airtable → Le système publie automatiquement 1 article par jour → Vous n'avez plus qu'à surveiller et préparer de nouveaux articles !

## 🚀 Installation Rapide

```bash
# Dans /home/romain/Projet/siteVelocitAI-main
cd /home/romain/Projet/siteVelocitAI-main

# Vérification rapide du système
npm run blog:check

# Déploiement complet (si nécessaire)
npm run blog:deploy

# Test du système
npm run blog:test
```

## 📋 Structure Airtable pour Votre Workflow

### Table "Blog Articles" - Configuration Simplifiée

**Champs Obligatoires :**
- **Title** (Single line text) - Titre de l'article
- **Content** (Long text) - Contenu en Markdown
- **Category** (Single select) - Catégorie
- **Status** (Single select) - Toujours mettre "Scheduled"

**Champs Optionnels (auto-générés si vides) :**
- **Slug** - URL (généré automatiquement)
- **Description** - Description SEO (extrait du contenu)
- **Author** - Auteur (défaut: VelocitAI)
- **Tags** - Tags SEO
- **SEO Title** - Titre SEO optimisé
- **Read Time** - Temps de lecture (calculé auto)

**Champs Système (ne pas toucher) :**
- **Published** (Checkbox) - Géré automatiquement
- **Publication Date** - Mise à jour automatique

### Options pour Status
- **Scheduled** ← Utilisez toujours celui-ci pour vos articles
- Draft (pour les brouillons)
- Published (géré automatiquement)
- Archived (pour archiver)

### Options pour Category
- Stratégie d'Entreprise
- Automatisation
- Intelligence Artificielle
- Productivité
- Transformation Digitale
- Guides Pratiques

## 🔄 Votre Workflow Quotidien

### 1. Préparation (Une fois par semaine)
```bash
# Voir votre file d'attente
npm run blog:queue

# Voir les statistiques
npm run blog:stats

# Simuler les 14 prochains jours
npm run blog:simulate
```

### 2. Création d'Articles dans Airtable
1. Ouvrir votre base Airtable
2. Créer un nouvel enregistrement
3. Remplir :
   - **Title** : "Mon Super Article"
   - **Content** : Votre contenu en Markdown
   - **Category** : Choisir une catégorie
   - **Status** : "Scheduled"
4. Sauvegarder

### 3. Publication Automatique
- **Chaque jour à 9h** : Le script publie automatiquement le prochain article
- **Ordre** : Premier créé = Premier publié (FIFO)
- **Mise à jour** : Sitemap et SEO automatiques

## 📊 Commandes de Gestion

```bash
# Voir la file d'attente complète
npm run blog:queue

# Statistiques (combien d'articles restants, etc.)
npm run blog:stats

# Simuler les publications des 7 prochains jours
npm run blog:simulate

# Simuler les publications des 14 prochains jours
node scripts/prepare-blog-queue.js simulate 14

# Publier le prochain article maintenant (test)
node scripts/prepare-blog-queue.js publish

# Voir les logs en temps réel
tail -f logs/blog-automation.log

# Monitoring du système
npm run blog:monitor
```

## 🎯 Exemple de Préparation de 20 Articles

### Dans Airtable, créez 20 enregistrements comme ceci :

**Article 1:**
- Title: "5 Étapes pour Automatiser Votre Service Client"
- Content: [Votre contenu Markdown]
- Category: "Automatisation"
- Status: "Scheduled"

**Article 2:**
- Title: "ROI de l'IA en Entreprise : Calcul et Exemples"
- Content: [Votre contenu Markdown]
- Category: "Intelligence Artificielle"
- Status: "Scheduled"

... et ainsi de suite jusqu'à 20 articles.

### Résultat :
- **Jour 1** : Publication de l'Article 1
- **Jour 2** : Publication de l'Article 2
- **Jour 20** : Publication de l'Article 20
- **Jour 21** : Aucune publication (préparer de nouveaux articles)

## 📅 Planning de Publication

```bash
# Voir votre planning pour les 2 prochaines semaines
npm run blog:simulate
```

Exemple de sortie :
```
📅 Simulation des publications pour les 7 prochains jours:

📅 lundi 2024-12-24:
   ✅ "5 Étapes pour Automatiser Votre Service Client"
   📂 Automatisation
   ⏱️  8 min de lecture

📅 mardi 2024-12-25:
   ✅ "ROI de l'IA en Entreprise : Calcul et Exemples"
   📂 Intelligence Artificielle
   ⏱️  12 min de lecture

📅 mercredi 2024-12-26:
   ✅ "Chatbots IA : Guide Complet 2025"
   📂 Intelligence Artificielle
   ⏱️  15 min de lecture
```

## 🔧 Configuration Initiale

### 1. Variables d'environnement
Créez `.env` dans `/home/romain/Projet/siteVelocitAI-main/` :

```bash
# Airtable Configuration
AIRTABLE_API_KEY=votre_cle_api_airtable
AIRTABLE_BASE_ID=votre_base_id_airtable
```

### 2. Obtenir les clés Airtable
1. **API Key** : https://airtable.com/account → "Generate API key"
2. **Base ID** : Dans votre base → Help → API documentation → Base ID

### 3. Test de configuration
```bash
npm run blog:test
```

## 🚨 Surveillance et Maintenance

### Vérifications Hebdomadaires
```bash
# Combien d'articles restent ?
npm run blog:stats

# Le système fonctionne-t-il ?
npm run blog:monitor

# Voir les dernières publications
tail -20 logs/blog-automation.log
```

### Alertes à Surveiller
- **"Aucun article en attente"** → Préparer de nouveaux articles
- **Erreurs dans les logs** → Vérifier la configuration
- **Articles non publiés** → Vérifier le cron job

## 🎉 Avantages de Ce Workflow

✅ **Gain de temps** : Préparez tout en une fois  
✅ **Régularité** : Publication automatique quotidienne  
✅ **SEO optimisé** : Sitemap et métadonnées automatiques  
✅ **Traçabilité** : Logs détaillés de toutes les publications  
✅ **Flexibilité** : Possibilité de publication manuelle  
✅ **Évolutif** : Ajoutez des articles quand vous voulez  

## 🔮 Prochaines Étapes

1. **Configurer le système** avec `npm run blog:deploy`
2. **Créer votre base Airtable** avec la structure fournie
3. **Préparer vos 20 premiers articles**
4. **Lancer le système** et surveiller les publications
5. **Préparer régulièrement** de nouveaux articles pour maintenir la file

---

**🚀 Votre blog VelocitAI va maintenant publier automatiquement du contenu de qualité chaque jour !**