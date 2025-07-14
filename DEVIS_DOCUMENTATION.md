# Documentation - Page de Devis Unique VelocitAI

## Vue d'ensemble

La page de devis unique permet aux clients de VelocitAI de consulter leurs devis personnalisés directement depuis un lien unique. Les données sont récupérées en temps réel depuis Airtable.

## Configuration

### Variables d'environnement requises

```env
AIRTABLE_API_KEY=your_airtable_api_key_here
```

### Structure Airtable

**Base ID**: `appRCCSf1bIo1iois`
**Table**: `Devis Clients` (`tblVufTcqkATBP3vm`)

#### Champs requis dans Airtable :

- **Nom Prénom** (`Nom Prénom`) - Nom complet du client
- **Entreprise** (`Entreprise`) - Nom de l'entreprise (optionnel)
- **Email** (`Email`) - Email du client
- **Téléphone** (`Téléphone`) - Numéro de téléphone (optionnel)
- **Devis Détaillé** (`Devis Détaillé`) - Description complète du devis
- **Total HT** (`Total HT`) - Montant hors taxes
- **Statut** (`Statut`) - Statut du devis (Créé, Envoyé, Accepté, Refusé)
- **Date Création** (`Date Création`) - Date de création du devis
- **URL Devis** (`URL Devis`) - URL complète du devis
- **Notes** (`Notes`) - Notes additionnelles (optionnel)

## Fonctionnalités

### 1. Affichage du devis

- **URL format**: `https://velocit-ai.fr/devis/[numero-devis]`
- **Récupération automatique** des données depuis Airtable
- **Parser intelligent** du champ "Devis Détaillé" pour extraire les services
- **Calcul automatique** de la TVA (8.5% - taux La Réunion)

### 2. Actions client

- **Accepter le devis** : Met à jour le statut à "Accepté" dans Airtable
- **Contacter via WhatsApp** : Lien direct avec message prérempli
- **Télécharger PDF** : Génération du devis en PDF
- **Affichage du statut** : Badge coloré selon le statut

### 3. Parsing du devis détaillé

Le système peut parser plusieurs formats dans le champ "Devis Détaillé" :

#### Format 1 : Liste avec prix inline
```
• Site web automatisé avec blog (1x 4500€)
• Abonnement mensuel maintenance (1x 300€/mois)
```

#### Format 2 : Liste numérotée avec prix séparé
```
1. Site E-commerce complet
   - Catalogue produits
   - Gestion commandes
   Prix: 8 500€

2. Formation utilisation
   - 4 heures de formation
   Prix: 380€
```

#### Format 3 : Format libre
```
DEVIS VELOCITAI - Boutique Zen

Site E-commerce complet avec toutes les fonctionnalités
TOTAL HT: 9 780€
```

## Utilisation

### 1. Créer un devis dans Airtable

1. Ajouter une nouvelle ligne dans la table "Devis Clients"
2. Remplir tous les champs requis
3. Générer une URL unique : `https://velocit-ai.fr/devis/VEL-YYYYMMDD-XXX`
4. Mettre cette URL dans le champ "URL Devis"

### 2. Envoyer le devis au client

Le client peut accéder au devis via l'URL unique. La page affiche :
- Informations client
- Détail des services
- Récapitulatif financier
- Actions disponibles

### 3. Suivi du devis

- Le statut est mis à jour automatiquement quand le client accepte
- Les actions du client sont trackées
- Notifications possibles via webhooks (à implémenter)

## Sécurité

- **URLs uniques** : Chaque devis a une URL difficile à deviner
- **Pas d'indexation** : `robots.txt` exclut les pages de devis
- **Meta robots** : `noindex, nofollow` sur toutes les pages de devis
- **Validation** : Vérification de l'existence du devis avant affichage

## Personnalisation

### Styles et animations

- Design responsive avec Tailwind CSS
- Animations Framer Motion pour l'interactivité
- Thème cohérent avec le site VelocitAI

### Messages WhatsApp

Le message WhatsApp est prérempli avec :
```
Bonjour ! Je viens de consulter mon devis VelocitAI n°[NUMERO]. J'aimerais en discuter avec vous.
```

### Calcul TVA

- Taux fixe de 8.5% (taux en vigueur à La Réunion)
- Calcul automatique : `TVA = Total HT × 8.5%`
- Total TTC = Total HT + TVA

## API Endpoints

### GET `/devis/[id]`
- Récupère et affiche un devis spécifique
- Server-side rendering avec Next.js

### POST `/api/devis/accept`
- Accepte un devis et met à jour le statut dans Airtable
- Body : `{ devisId: string, numeroDevis: string }`

### GET `/api/devis/pdf/[id]`
- Génère et télécharge le PDF du devis (à implémenter)

## Développement

### Structure des fichiers

```
pages/
├── devis/
│   └── [id].tsx          # Page principale du devis
└── api/
    └── devis/
        ├── accept.ts     # API d'acceptation
        └── pdf/
            └── [id].ts   # Génération PDF (à implémenter)
```

### Types TypeScript

```typescript
interface QuoteData {
  id: string;
  numeroDevis: string;
  client: {
    nom: string;
    entreprise?: string;
    email: string;
    telephone?: string;
  };
  services: Array<{
    nom: string;
    description: string;
    quantite: number;
    prixUnitaire: number;
    total: number;
  }>;
  totaux: {
    totalHT: number;
    tva: number;
    totalTTC: number;
    tauxTVA: number;
  };
  statut: string;
  dateCreation: string;
  notes?: string;
}
```

## Améliorations futures

1. **Génération PDF** : Implémentation complète du téléchargement PDF
2. **Notifications** : Webhooks pour notifier l'équipe des acceptations
3. **Signature électronique** : Intégration d'un système de signature
4. **Historique** : Suivi des versions et modifications
5. **Templates** : Système de templates pour différents types de devis
6. **Analytics** : Tracking des consultations et conversions

## Dépannage

### Devis introuvable
- Vérifier que l'URL est correcte dans Airtable
- Vérifier la configuration AIRTABLE_API_KEY
- Consulter les logs pour les erreurs d'API

### Erreur d'acceptation
- Vérifier les permissions Airtable (écriture requise)
- Vérifier que le statut "Accepté" existe dans les options

### Problèmes de parsing
- Vérifier le format du champ "Devis Détaillé"
- Adapter les regex dans `parseDevisDetails()` si nécessaire