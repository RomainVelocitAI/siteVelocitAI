# Configuration Airtable pour les témoignages

## 1. Structure de votre base Airtable "Témoignage VélocitAI"

Créez une table avec les champs suivants :

### Champs obligatoires
- **name** (Single line text) : Nom du client
- **quote** (Long text) : Citation/témoignage principal
- **statut** (Single select) : Options "actif" ou "inactif"

### Champs recommandés
- **role** (Single line text) : Poste du client
- **company** (Single line text) : Nom de l'entreprise
- **thumbnail** (Attachment) : Photo miniature pour la vidéo
- **companyLogo** (Attachment) : Logo de l'entreprise (optionnel)
- **videoUrl** (URL ou Single line text) : Lien vers la vidéo
- **highlight** (Single line text) : Phrase d'accroche courte
- **metrics** (Long text) : JSON des métriques, format :
  ```json
  [
    {"label": "Gain de temps", "value": "+75%", "icon": "chart"},
    {"label": "ROI", "value": "420%", "icon": "trending"}
  ]
  ```
- **rating** (Number) : Note de 1 à 5
- **featured** (Checkbox) : Mettre en avant ce témoignage
- **tags** (Multiple select) : Tags/catégories
- **date** (Date) : Date du témoignage
- **ordre** (Number) : Ordre d'affichage

### Options pour les icônes dans metrics
- `chart` : Graphique
- `trending` : Tendance croissante
- `sparkles` : Étincelles
- `check` : Validation
- `clock` : Horloge
- `checkCircle` : Cercle validé

## 2. Configuration des variables d'environnement Netlify

Dans votre dashboard Netlify, allez dans :
**Site settings → Environment variables**

Ajoutez ces 3 variables :

### AIRTABLE_API_KEY
1. Allez sur https://airtable.com/account
2. Dans la section "API", cliquez sur "Generate API key"
3. Copiez la clé générée
4. Dans Netlify : `AIRTABLE_API_KEY = votre_clé_api`

### AIRTABLE_BASE_ID
1. Allez sur https://airtable.com/api
2. Sélectionnez votre base "Témoignage VélocitAI"
3. L'ID de la base est dans l'URL : `https://airtable.com/appXXXXXXXXXXXXXX/api/docs`
4. Dans Netlify : `AIRTABLE_BASE_ID = appXXXXXXXXXXXXXX`

### AIRTABLE_TABLE_NAME
1. C'est le nom exact de votre table dans Airtable
2. Par défaut, ce devrait être "Table 1" ou le nom que vous avez donné
3. Dans Netlify : `AIRTABLE_TABLE_NAME = Table 1`

## 3. Mise à jour du code

Pour utiliser la version dynamique des témoignages, modifiez `pages/index.tsx` :

```tsx
// Remplacez cette ligne :
const TestimonialsSection = dynamic(() => import('@/components/sections/PremiumTestimonialsSection'), {

// Par celle-ci :
const TestimonialsSection = dynamic(() => import('@/components/sections/DynamicPremiumTestimonialsSection'), {
```

## 4. Format des données dans Airtable

### Exemple de témoignage complet

**name**: Romain Caillot
**role**: Gérant
**company**: Caillot Immobilier
**quote**: VelocitAI a transformé notre façon de travailler. Les résultats dépassent toutes nos attentes.
**highlight**: 3x plus de dossiers traités
**metrics**:
```json
[
  {"label": "Gain de temps", "value": "+75%", "icon": "chart"},
  {"label": "ROI", "value": "420%", "icon": "trending"},
  {"label": "Satisfaction", "value": "98%", "icon": "check"}
]
```
**rating**: 5
**featured**: ✓
**tags**: Immobilier, Automatisation, IA
**date**: 2023-12-15
**ordre**: 1
**statut**: actif

### Vidéos

Pour les vidéos, vous avez 2 options :

1. **Vidéos locales** : Entrez simplement le chemin : `videos/romain_temoignage.mp4`
2. **Vidéos externes** : URL complète : `https://example.com/video.mp4`

### Images

- Uploadez les images directement dans Airtable
- Format recommandé : 16:9 pour les miniatures
- Taille recommandée : 1280x720px minimum

## 5. Déploiement

Après avoir configuré les variables d'environnement :

1. Déclenchez un nouveau build dans Netlify
2. Les témoignages seront automatiquement récupérés depuis Airtable
3. En cas d'erreur, les témoignages de fallback seront utilisés

## 6. Test local

Pour tester en local, créez un fichier `.env.local` :

```env
AIRTABLE_API_KEY=votre_clé_api
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Table 1
```

## 7. Gestion du cache

- Les témoignages sont mis en cache pendant 1 heure
- Pour forcer le rafraîchissement : déclenchez un nouveau build
- L'API retourne toujours les témoignages avec `statut = "actif"`
- L'ordre d'affichage suit le champ `ordre` (croissant)

## 8. Troubleshooting

### Les témoignages ne s'affichent pas
1. Vérifiez les variables d'environnement dans Netlify
2. Vérifiez que au moins un témoignage a `statut = "actif"`
3. Consultez les logs de build dans Netlify

### Les images ne s'affichent pas
1. Vérifiez que les images sont bien uploadées dans Airtable
2. Les URLs d'images Airtable expirent après un certain temps, re-uploadez si nécessaire

### Les métriques ne s'affichent pas
1. Vérifiez le format JSON dans le champ `metrics`
2. Utilisez un validateur JSON pour vérifier la syntaxe

## 9. Bonnes pratiques

1. **Toujours avoir au moins 3 témoignages actifs** pour un bon rendu
2. **Un seul témoignage "featured"** à la fois
3. **Optimisez les images** avant l'upload (< 500KB)
4. **Testez les vidéos** sur mobile et desktop
5. **Utilisez des métriques réelles** et vérifiables