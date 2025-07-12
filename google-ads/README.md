# 🎯 Google Ads API - Mode d'emploi VelocitAI

## 📋 Vue d'ensemble

Ce dossier contient tout le nécessaire pour intégrer l'API Google Ads et créer des campagnes automatiquement pour vos clients.

## 🔧 Prérequis techniques

### 1. Compte Google Ads Manager
- ✅ Compte Google Ads actif
- ✅ Accès Manager Account (MCC) recommandé
- ✅ Droits administrateur sur les comptes clients

### 2. Accès développeur Google Ads
- ✅ Demande d'accès API Google Ads
- ✅ Developer Token
- ✅ Customer ID(s)

### 3. Authentification OAuth 2.0
- ✅ Client ID Google Cloud
- ✅ Client Secret
- ✅ Refresh Token

## 📊 Informations à collecter

### 🔐 Identifiants requis

```bash
# À renseigner dans .env
GOOGLE_ADS_DEVELOPER_TOKEN="votre_developer_token"
GOOGLE_ADS_CLIENT_ID="votre_client_id.apps.googleusercontent.com"
GOOGLE_ADS_CLIENT_SECRET="votre_client_secret"
GOOGLE_ADS_REFRESH_TOKEN="votre_refresh_token"
GOOGLE_ADS_CUSTOMER_ID="123-456-7890"  # Sans tirets dans le code
```

### 📝 Où trouver ces informations :

1. **Developer Token** : 
   - Google Ads → Outils → Configuration API → Centre API
   - Demande d'accès si premier usage

2. **Customer ID** :
   - Coin supérieur droit de Google Ads
   - Format : 123-456-7890

3. **Client ID/Secret** :
   - Google Cloud Console → APIs & Services → Credentials
   - Créer OAuth 2.0 Client ID

4. **Refresh Token** :
   - Généré via le processus OAuth (script fourni)

## 🚀 Étapes de configuration

### Étape 1 : Installation des dépendances
```bash
npm install google-ads-api google-auth-library dotenv
```

### Étape 2 : Configuration OAuth
```bash
node google-ads/setup-oauth.js
```

### Étape 3 : Test de connexion
```bash
node google-ads/test-connection.js
```

### Étape 4 : Création de campagne test
```bash
node google-ads/create-campaign.js
```

## 📂 Structure du dossier

```
google-ads/
├── README.md              # Ce guide
├── config/
│   ├── .env.example       # Template variables d'environnement
│   └── ads-config.js      # Configuration API
├── scripts/
│   ├── setup-oauth.js     # Configuration OAuth
│   ├── test-connection.js # Test de connexion
│   ├── create-campaign.js # Création de campagne
│   └── manage-campaigns.js # Gestion des campagnes
├── examples/
│   ├── search-campaign.js # Exemple campagne Search
│   ├── display-campaign.js # Exemple campagne Display
│   └── campaign-templates.js # Templates de campagnes
└── docs/
    ├── api-reference.md   # Référence API
    └── troubleshooting.md # Résolution problèmes
```

## 🎯 Fonctionnalités prévues

### Phase 1 : Configuration
- [x] Structure du projet
- [ ] Configuration OAuth
- [ ] Test de connexion API
- [ ] Documentation complète

### Phase 2 : Campagnes basiques
- [ ] Création campagne Search
- [ ] Gestion mots-clés
- [ ] Configuration budgets
- [ ] Rapports de base

### Phase 3 : Automatisation avancée
- [ ] Templates de campagnes VelocitAI
- [ ] Création multi-comptes
- [ ] Optimisation automatique
- [ ] Intégration dashboard client

## ⚠️ Notes importantes

### Limites API Google Ads
- **Quotas quotidiens** : 15,000 opérations/jour (compte standard)
- **Rate limiting** : 1,000 requêtes/minute
- **Approbation requise** : Campagnes soumises à validation Google

### Recommandations sécurité
- 🔒 Ne jamais commiter les tokens
- 🔒 Utiliser variables d'environnement
- 🔒 Rotation régulière des tokens
- 🔒 Accès restreint aux comptes clients

## 📞 Support

Pour toute question technique :
- 📧 Email : romain@velocit-ai.fr
- 📚 Documentation Google : [developers.google.com/google-ads/api](https://developers.google.com/google-ads/api)
- 🆘 Stack Overflow : tag `google-ads-api`

---

**Prêt à automatiser la création de campagnes Google Ads ! 🚀**