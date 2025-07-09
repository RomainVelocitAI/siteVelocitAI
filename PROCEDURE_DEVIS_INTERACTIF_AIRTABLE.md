# Procédure - Page de Devis Interactif avec Airtable

## Vue d'ensemble
Ce document décrit la procédure complète pour créer une page de devis interactif connectée à Airtable pour automatiser la gestion des prospects et la génération de devis.

## ✅ Structure Airtable CRÉÉE

### Base : "Devis" (ID: appRCCSf1bIo1iois)

#### ✅ Table 1: "Prospects" (ID: tblpkw6KE4GQyoMlj)
| Champ | Type | Description | Exemples |
|-------|------|-------------|----------|
| Nom | Texte court | Nom du prospect | Marie Dubois, Jean-Pierre Martin |
| Email | Email | Email du prospect | marie.dubois@boutique-zen.re |
| Téléphone | Téléphone | Numéro de téléphone | +262 692 12 34 56 |
| Entreprise | Texte court | Nom de l'entreprise | Boutique Zen, Clinique du Sourire |
| Secteur | Sélection simple | E-commerce, Services, Industrie, Santé, Éducation, Technologie, Finance, Immobilier, Tourisme, Autre |
| Taille Entreprise | Sélection simple | 1-10, 11-50, 51-200, 200+ |
| Date de Contact | Date | Date de premier contact | 2025-07-06 |
| Statut Lead | Sélection simple | Nouveau, Qualifié, Proposition, Client, Perdu |
| Score Qualification | Nombre | Score de 1 à 10 | 8, 9, 10 |
| Source | Sélection simple | Site web, Référencement, Publicité Facebook/Google, LinkedIn, Recommandation, Email marketing, Autre |
| Notes | Texte long | Commentaires libres | "Intéressée par une boutique en ligne..." |

#### ✅ Table 2: "Devis VelocitAI" (ID: tbl8mZfO2bQo8cVZI)
| Champ | Type | Description | Exemples |
|-------|------|-------------|----------|
| Nom Prospect | Texte court | Nom du prospect | Marie Dubois - Boutique Zen |
| Date Création | Date | Date de création du devis | 2025-07-06 |
| Date Expiration | Date | Date d'expiration (30 jours) | 2025-08-05 |
| Statut | Sélection simple | Brouillon, Envoyé, Accepté, Refusé, Expiré |
| Budget Estimé | Nombre | Budget estimé par le prospect (€) | 9000 |
| Fonctionnalités | Texte long | Liste des fonctionnalités demandées | "E-commerce complet\n- Catalogue produits..." |
| Prix HT | Nombre | Prix hors taxes calculé (€) | 8500 |
| URL Devis | URL | Lien vers le PDF généré | https://velocitai.com/devis/DEV-2025-001.pdf |

#### ✅ Table 3: "Services" (ID: tblkG6MYLYUjJzSWk)
| Champ | Type | Description | Exemples |
|-------|------|-------------|----------|
| Nom Service | Texte court | Nom du service | Site web vitrine, E-commerce complet |
| Catégorie | Sélection simple | Développement, Design, Marketing, Formation, Maintenance, Consultation |
| Prix Unitaire | Nombre | Prix de base (€) | 2500, 8500, 95 |
| Unité | Sélection simple | Heure, Jour, Projet, Page, Mois |
| Description | Texte long | Description détaillée | "Création d'un site web vitrine responsive..." |
| Durée Estimée | Nombre | Durée en jours | 15, 45, 25 |

**Services disponibles :**
- Site web vitrine (2 500€/projet, 15 jours)
- E-commerce complet (8 500€/projet, 45 jours) 
- Chatbot IA personnalisé (3 500€/projet, 25 jours)
- Design UI/UX (95€/heure, 2 jours)
- Maintenance mensuelle (150€/mois, continu)

#### ✅ Table 4: "Éléments Devis" (ID: tbllxNotS1wYM49ZO)
| Champ | Type | Description | Exemples |
|-------|------|-------------|----------|
| Nom Service | Texte court | Nom du service | E-commerce complet, Site web vitrine |
| Quantité | Nombre | Quantité demandée | 1, 15, 12 |
| Prix Unitaire | Nombre | Prix unitaire du service (€) | 8500, 95, 150 |
| Personnalisation | Texte long | Adaptations spécifiques | "Intégration API livraison La Réunion..." |

## Procédure de Développement

### ✅ Étape 1: Configuration Airtable - TERMINÉE
1. ✅ Créer la base "Devis" (appRCCSf1bIo1iois)
2. ✅ Configurer les 4 tables avec les champs définis
3. ✅ Ajouter des exemples réalistes dans chaque table
4. 🔄 Paramétrer les liaisons entre tables (à faire)
5. 🔄 Créer des vues filtrées par statut (à faire)
6. 🔄 Configurer les couleurs des champs sélection (à faire)
7. 🔄 Configurer les permissions d'accès (à faire)

### Étape 2: Développement du Formulaire Interactif
```javascript
// Composant principal du formulaire de devis
const DevisInteractif = () => {
  const [etapeActuelle, setEtapeActuelle] = useState(1);
  const [donneesProspect, setDonneesProspect] = useState({});
  const [servicesSelectionnes, setServicesSelectionnes] = useState([]);
  const [prixEstime, setPrixEstime] = useState(0);

  // Logique de progression par étapes
  // Calcul automatique du prix
  // Intégration Airtable
};
```

### Étape 3: Intégration Airtable API
```javascript
// Configuration API Airtable - VALEURS RÉELLES
const AIRTABLE_CONFIG = {
  baseId: 'appRCCSf1bIo1iois', // Base "Devis" 
  apiKey: process.env.AIRTABLE_API_KEY,
  tables: {
    prospects: 'Prospects',           // tblpkw6KE4GQyoMlj
    devis: 'Devis VelocitAI',        // tbl8mZfO2bQo8cVZI
    services: 'Services',            // tblkG6MYLYUjJzSWk
    elementsDevis: 'Éléments Devis'  // tbllxNotS1wYM49ZO
  }
};

// Fonction de création de devis
async function creerDevis(donneesFormulaire) {
  // 1. Créer/mettre à jour le prospect
  // 2. Créer l'enregistrement devis
  // 3. Ajouter les éléments de devis
  // 4. Calculer le total
  // 5. Générer le PDF
}
```

### Étape 4: Automatisations
1. **Email de confirmation** : Envoi automatique après soumission
2. **Relances automatiques** : Rappels à J+3, J+7, J+15
3. **Notifications équipe** : Slack/Teams pour nouveaux devis
4. **Mise à jour statuts** : Workflow automatisé
5. **Génération PDF** : Création automatique du document

### Étape 5: Interface Utilisateur
- Design responsive et moderne
- Progress bar pour les étapes
- Validation en temps réel
- Aperçu en direct du prix
- Animations fluides
- Accessibilité optimisée

## Fonctionnalités Clés

### Côté Prospect
- Formulaire en plusieurs étapes intuitif
- Calcul de prix en temps réel
- Sauvegarde automatique des données
- Prévisualisation du devis
- Signature électronique possible

### Côté VelocitAI
- Dashboard de gestion des prospects
- Suivi des conversions
- Analytics et métriques
- Gestion des relances
- Export des données

## Sécurité et Conformité
- Chiffrement des données sensibles
- Conformité RGPD
- Sauvegarde automatique
- Logs d'audit
- Validation côté serveur

## Métriques à Suivre
- Taux de conversion par étape
- Temps de remplissage moyen
- Valeur moyenne des devis
- Sources les plus performantes
- Taux d'acceptation des devis

## Technologies Recommandées
- **Frontend** : Next.js + TypeScript
- **UI** : Tailwind CSS + Framer Motion
- **Backend** : API Routes Next.js
- **Base de données** : Airtable
- **Génération PDF** : PDFKit ou jsPDF
- **Email** : SendGrid ou Mailgun
- **Hébergement** : Vercel ou Netlify

## Points d'Attention
1. **Performance** : Optimiser les appels API Airtable
2. **UX** : Minimiser les étapes obligatoires
3. **Mobile** : Priorité mobile-first
4. **SEO** : Optimisation pour les moteurs de recherche
5. **Analytics** : Tracking détaillé des interactions

## ✅ État d'avancement et Prochaines Étapes

### Terminé ✅
1. ✅ Structure Airtable créée avec IDs réels
2. ✅ 4 tables configurées avec champs appropriés
3. ✅ Exemples de données ajoutés dans toutes les tables
4. ✅ Configuration API documentée avec IDs réels

### À faire 🔄
1. ⚠️ **Configurer les couleurs manuellement dans Airtable** (voir guide ci-dessous)
2. 🔄 Paramétrer les liaisons entre tables (Prospects ↔ Devis, Services ↔ Éléments Devis)
3. 🔄 Créer des vues filtrées par statut dans chaque table
4. 🔄 Créer les wireframes de l'interface
5. 🔄 Développer le MVP du formulaire interactif
6. 🔄 Tester l'intégration Airtable avec les vraies données
7. 🔄 Implémenter les automatisations (emails, relances)
8. 🔄 Déployer en production

### 🎨 Guide configuration couleurs (manuel dans Airtable)

**L'API ne permettant pas de modifier les couleurs, voici le guide pour les configurer manuellement :**

#### Table "Prospects" → Champ "Statut Lead"
- **Nouveau** → Bleu 🔵
- **Qualifié** → Jaune 🟡  
- **Proposition** → Orange 🟠
- **Client** → Vert 🟢
- **Perdu** → Rouge 🔴

#### Table "Devis VelocitAI" → Champ "Statut"
- **Brouillon** → Gris ⚪
- **Envoyé** → Bleu 🔵
- **Accepté** → Vert 🟢
- **Refusé** → Rouge 🔴
- **Expiré** → Orange 🟠

#### Table "Services" → Champ "Catégorie"
- **Développement** → Bleu 🔵
- **Design** → Violet 🟣
- **Marketing** → Rose 🩷
- **Formation** → Jaune 🟡
- **Maintenance** → Orange 🟠
- **Consultation** → Vert 🟢

**Pour appliquer :** Aller dans Airtable → Cliquer sur le champ → Modifier les options → Changer les couleurs

### 📊 Données disponibles pour tests
- **3 prospects** : Marie Dubois (E-commerce), Jean-Pierre Martin (Santé), Sophie Chen (Tech)
- **5 services** : Site vitrine, E-commerce, Chatbot IA, Design UI/UX, Maintenance
- **2 devis** : Boutique Zen (8 500€), Clinique du Sourire (3 800€)
- **4 éléments** : Lignes détaillées avec personnalisations

**Base Airtable opérationnelle :** https://airtable.com/appRCCSf1bIo1iois

---
*Document mis à jour le 06/07/2025 - VelocitAI*