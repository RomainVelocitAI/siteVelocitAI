# Guide d'intégration n8n pour la génération automatique de pages prospects

## 🎯 Vue d'ensemble

Ce système permet de générer automatiquement des pages personnalisées pour chaque nouveau lead via n8n, avec déploiement automatique sur GitHub.

## 🔧 Configuration requise

### 1. Variables d'environnement

Ajoutez ces variables à votre `.env.local` :

```bash
# API de génération de pages
PROSPECT_API_KEY=votre_cle_api_secrete_ici

# Configuration Git
ENABLE_GIT_PUSH=true
TRIGGER_DEPLOY=true
GIT_BRANCH=main
GIT_REMOTE=origin

# Webhook de déploiement (optionnel)
DEPLOY_WEBHOOK_URL=https://your-deployment-service.com/webhook
```

### 2. Configuration Git

Assurez-vous que votre repository Git est configuré avec les droits d'écriture :

```bash
# Configurer l'utilisateur Git
git config user.name "n8n Bot"
git config user.email "bot@velocit-ai.fr"

# Configurer l'authentification (GitHub Token ou SSH)
git remote set-url origin https://TOKEN@github.com/username/repo.git
```

## 📡 Workflow n8n

### Structure du workflow recommandé :

1. **Trigger** : Nouveau lead (webhook, CRM, formulaire)
2. **Transformation** : Formatage des données
3. **HTTP Request** : Appel API génération page
4. **Conditional** : Vérification succès
5. **Notifications** : Email/Slack en cas de succès/erreur

### 1. Nœud HTTP Request - Génération de page

**Configuration :**
- **Method :** POST
- **URL :** `https://votre-domaine.com/api/generate-prospect-page`
- **Headers :**
  ```json
  {
    "Content-Type": "application/json",
    "x-api-key": "{{$env.PROSPECT_API_KEY}}"
  }
  ```

**Body (JSON) :**
```json
{
  "prospectName": "{{$json.firstName}} {{$json.lastName}}",
  "companyName": "{{$json.company}}",
  "email": "{{$json.email}}",
  "phone": "{{$json.phone}}",
  "industry": "{{$json.industry}}",
  "companySize": "{{$json.companySize}}",
  "challenges": {{$json.challenges}},
  "goals": {{$json.goals}},
  "budget": "{{$json.budget}}",
  "timeline": "{{$json.timeline}}",
  "leadSource": "{{$json.source}}",
  "leadScore": {{$json.score}},
  "customMessage": "{{$json.customMessage}}",
  "offerType": "{{$json.offerType || 'standard'}}",
  "ctaText": "Planifier un rendez-vous",
  "ctaUrl": "https://calendly.com/votre-lien"
}
```

### 2. Nœud de transformation des données

**JavaScript Code :**
```javascript
// Formatage des défis en tableau
const challenges = [];
if ($input.item.json.challenge1) challenges.push($input.item.json.challenge1);
if ($input.item.json.challenge2) challenges.push($input.item.json.challenge2);
if ($input.item.json.challenge3) challenges.push($input.item.json.challenge3);

// Formatage des objectifs
const goals = [];
if ($input.item.json.goal1) goals.push($input.item.json.goal1);
if ($input.item.json.goal2) goals.push($input.item.json.goal2);

// Détermination du type d'offre selon le score/budget
let offerType = 'standard';
if ($input.item.json.budget > 10000 || $input.item.json.score > 80) {
  offerType = 'enterprise';
} else if ($input.item.json.budget > 5000 || $input.item.json.score > 60) {
  offerType = 'premium';
}

return {
  ...item.json,
  challenges,
  goals,
  offerType,
  processedAt: new Date().toISOString()
};
```

### 3. Nœud conditionnel de vérification

**Condition :**
```
{{$json.success}} === true
```

### 4. Nœuds de notification

**En cas de succès :**
- **Email** : "Page prospect créée pour {{$json.data.companyName}}"
- **URL** : {{$json.data.url}}

**En cas d'erreur :**
- **Slack/Email** : Notification d'erreur avec détails

## 🔗 URLs générées

Le format des URLs est prévisible :
```
https://votre-domaine.com/prospect/[company-slug]
```

Exemples :
- "ACME Corporation" → `/prospect/acme-corporation`
- "Café de la Plage" → `/prospect/cafe-de-la-plage`
- "Tech Solutions 2024" → `/prospect/tech-solutions-2024`

## 📊 Exemples de payloads

### Payload minimal :
```json
{
  "prospectName": "Jean Dupont",
  "companyName": "Restaurant Le Palmier",
  "email": "jean@lepalmier.re"
}
```

### Payload complet :
```json
{
  "prospectName": "Marie Martin",
  "companyName": "Boutique Mode Réunion",
  "email": "marie@boutique-mode.re",
  "phone": "+262 692 123 456",
  "industry": "Commerce de détail",
  "companySize": "10-50 employés",
  "challenges": [
    "Gestion manuelle des stocks",
    "Réponse clients trop lente",
    "Processus de commande complexe"
  ],
  "goals": [
    "Automatiser la gestion des stocks",
    "Améliorer l'expérience client",
    "Augmenter les ventes en ligne"
  ],
  "budget": "15000",
  "timeline": "3 mois",
  "leadSource": "Facebook Ads",
  "leadScore": 75,
  "customMessage": "Nous avons remarqué vos excellents avis clients et souhaitons vous aider à automatiser vos processus pour maintenir cette qualité tout en gagnant du temps.",
  "offerType": "premium",
  "ctaText": "Réserver mon audit gratuit",
  "ctaUrl": "https://calendly.com/velocitai/audit-gratuit"
}
```

## 🚀 Réponses API

### Succès (201) :
```json
{
  "success": true,
  "message": "Prospect page generated successfully",
  "data": {
    "slug": "boutique-mode-reunion",
    "url": "https://velocit-ai.fr/prospect/boutique-mode-reunion",
    "prospectName": "Marie Martin",
    "companyName": "Boutique Mode Réunion",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Erreur (400/500) :
```json
{
  "error": "Missing required fields: prospectName, companyName, email",
  "details": "Validation failed"
}
```

## 🔧 Test manuel

Pour tester manuellement :

```bash
curl -X POST https://votre-domaine.com/api/generate-prospect-page \
  -H "Content-Type: application/json" \
  -H "x-api-key: votre_cle_api" \
  -d '{
    "prospectName": "Test User",
    "companyName": "Test Company",
    "email": "test@example.com"
  }'
```

## 📋 Checklist de déploiement

- [ ] Variables d'environnement configurées
- [ ] API key générée et sécurisée
- [ ] Repository Git accessible avec token
- [ ] Workflow n8n créé et testé
- [ ] Notifications configurées
- [ ] Test end-to-end effectué

## 🛠️ Dépannage

### Erreur 401 - Unauthorized
- Vérifier la clé API dans les headers
- Vérifier la variable d'environnement `PROSPECT_API_KEY`

### Erreur 409 - Page already exists
- La page existe déjà pour cette entreprise
- Modifier le nom de l'entreprise ou supprimer l'ancienne page

### Erreur Git
- Vérifier les droits d'accès au repository
- Vérifier la configuration Git (user.name, user.email)
- Vérifier le token d'authentification