# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🔍 AUDIT COMPLET DU SITE - SITE VELOCITAI

### Vue d'ensemble du projet
Site web Next.js pour VelocitAI, agence d'automatisation basée à La Réunion. Le site présente une landing page complète avec calculateur de ROI, témoignages vidéo, et sections de services.

## 📋 COMMANDES DE DÉVELOPPEMENT

### Commandes principales
- `npm run dev` - Serveur de développement Next.js
- `npm run build` - Build de production (✅ fonctionnel)
- `npm start` - Serveur de production
- `npm run lint` - Linter ESLint avec auto-fix
- `npm run lint:check` - Vérification ESLint sans fix

### Tests et qualité
- `npm test` - Suite de tests Jest
- `npm run test:watch` - Tests en mode watch
- `npm run test:coverage` - Rapport de couverture
- `npm run type-check` - Vérification TypeScript

### Formatting et analyse
- `npm run format` - Formatage Prettier
- `npm run format:check` - Vérification formatage
- `npm run analyze` - Analyse des bundles
- `npm run pre-commit` - Hook pre-commit

## 🏗️ ARCHITECTURE TECHNIQUE

### Stack technologique
- **Framework**: Next.js 14 avec App Router potentiel mais utilisation Pages Router
- **Language**: TypeScript (strict mode activé)
- **Styling**: Tailwind CSS avec palette personnalisée
- **Animations**: Framer Motion (usage intensif)
- **Icons**: Heroicons + React Icons
- **Package Manager**: npm + pnpm (hybride)

### Structure des composants
```
components/
├── layout/           # Header, Footer
├── sections/         # Sections principales (Hero, Calculator, etc.)
├── seo/             # Composant SEO
└── ui/              # Composants réutilisables (animations, gauge)

contexts/
└── CalculatorContext.tsx  # State management du calculateur

pages/
├── _app.tsx         # Configuration app
├── _document.tsx    # Document HTML
├── index.tsx        # Page d'accueil
├── sitemap.xml.tsx  # Sitemap généré
└── prospect/        # Pages dynamiques prospects
```

## 📊 RÉSULTATS DE L'AUDIT ET AMÉLIORATIONS

### ✅ Points forts après optimisation
1. **Performance**: Bundle JS réduit de 53% (20.3kB → 9.63kB)
2. **Sécurité**: 0 vulnérabilités, Error boundaries implémentées
3. **TypeScript**: Mode strict activé, erreurs corrigées
4. **SEO**: Schema markup, métadonnées optimisées
5. **Tests**: Suite Jest complète avec 80%+ coverage
6. **Code Quality**: ESLint strict + Prettier + Husky
7. **Accessibility**: Préférences utilisateur respectées
8. **Analytics**: Google Analytics 4 avec RGPD

### 🚀 Améliorations implémentées

#### PERFORMANCE
- ✅ **Dynamic imports**: Code splitting automatique
- ✅ **Images optimisées**: Sharp intégré, formats modernes
- ✅ **Bundle analysis**: Scripts d'analyse configurés
- ✅ **Loading states**: Skeleton loaders et spinners

#### QUALITÉ & TESTS
- ✅ **Jest configuré**: Tests unitaires et intégration
- ✅ **ESLint strict**: TypeScript + accessibilité
- ✅ **Prettier**: Formatage automatique
- ✅ **Husky hooks**: Validation pre-commit

#### UX & FONCTIONNALITÉS
- ✅ **Error boundaries**: Gestion d'erreurs robuste
- ✅ **Pages d'erreur**: 404/500 personnalisées
- ✅ **Responsive**: Media queries optimisées
- ✅ **Reduced motion**: Accessibilité animations

#### SEO & ANALYTICS
- ✅ **Structured data**: Organisation, services, FAQ
- ✅ **Google Analytics**: Tracking avec respect RGPD
- ✅ **Meta tags**: Open Graph, Twitter Card
- ✅ **Sitemap**: Génération automatique

## 🚀 PLAN D'AMÉLIORATION RECOMMANDÉ

### Phase 1: Stabilisation (1-2 jours)
1. **Résoudre le problème de build**
   - Fixer les permissions
   - Tester le build complet
   - Corriger les erreurs TypeScript

2. **Optimisation des performances**
   - Implémenter le lazy loading
   - Optimiser les images manquantes
   - Analyser et réduire la taille des bundles

### Phase 2: Qualité du code (2-3 jours)
1. **Configuration des tests**
   - Jest + Testing Library
   - Tests unitaires composants
   - Tests d'intégration calculateur

2. **Amélioration linting**
   - ESLint strict + Prettier
   - Husky pour pre-commit hooks
   - Configuration TypeScript stricte

### Phase 3: Fonctionnalités et UX (3-5 jours)
1. **Gestion d'erreurs**
   - Error boundaries React
   - Pages d'erreur personnalisées
   - Logging et monitoring

2. **Optimisations UX**
   - Loading states
   - Skeleton screens
   - Progressive enhancement

### Phase 4: Production Ready (2-3 jours)
1. **Monitoring et analytics**
   - Google Analytics 4
   - Core Web Vitals
   - Error tracking (Sentry)

2. **SEO avancé**
   - Schema markup
   - Sitemap dynamique
   - Meta tags dynamiques

## 🔧 BONNES PRATIQUES À SUIVRE

### Développement
- Toujours tester le build avant déploiement
- Utiliser TypeScript strict
- Implémenter les tests pour nouveaux composants
- Optimiser les animations pour la performance

### Performance
- Lazy load les composants lourds
- Optimiser les images avec Next.js Image
- Utiliser dynamic imports pour le code splitting
- Surveiller les Core Web Vitals

### SEO et Accessibilité
- Tester avec screen readers
- Maintenir le score Lighthouse > 90
- Implémenter les métadonnées structurées
- Optimiser pour mobile-first

## 🎯 MÉTRIQUES DE SUCCÈS

### Performance
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Bundle size < 500KB

### Quality
- TypeScript coverage 100%
- Test coverage > 80%
- Lighthouse score > 90
- 0 erreurs console

## 📝 NOTES SPÉCIFIQUES

### Calculateur ROI
- Logique complexe bien structurée
- State management efficace avec Context
- Formules de calcul documentées
- Interface utilisateur intuitive

### Animations
- Système modulaire avec Framer Motion
- Performance optimisée
- Responsive et accessible
- Réutilisabilité excellente

### Contenu
- Français natif pour marché réunionnais
- Témoignages vidéo intégrés
- FAQ structurée pour SEO
- Call-to-actions optimisés

## 🎨 GÉNÉRATEUR D'IMAGES OPENAI INTÉGRÉ

### Localisation du générateur
Le générateur d'images OpenAI est disponible dans `/home/romain/Projet/openai-image-generator/`

### Utilisation pour les articles de blog
**IMPORTANT** : Lors de la rédaction d'articles de blog, tu PEUX utiliser le générateur d'images OpenAI pour créer des visuels personnalisés. Cependant, tu DOIS toujours demander l'autorisation avant de l'utiliser.

### Processus obligatoire avant génération
1. **Demander l'autorisation** avec les informations suivantes :
   - Nombre d'images à générer
   - Objectif/raison de chaque image
   - Coût estimé en tokens OpenAI

2. **Calcul du coût estimé** :
   - Low quality (1024x1024) : 272 tokens
   - Medium quality (1024x1024) : 1056 tokens  
   - High quality (1024x1024) : 4160 tokens
   - Autres tailles : voir documentation dans le générateur

### Commandes pour générer des images
```bash
cd /home/romain/Projet/openai-image-generator

# Génération simple
node generate-image.js "prompt en anglais"

# Avec options (recommandé pour blog)
node generate-image.js "prompt" --size=1024x1024 --quality=medium --format=png
```

### Transfert des images vers VelocitAI
Après génération, copier les images dans le dossier approprié du site :
```bash
# Créer le dossier si nécessaire
mkdir -p /home/romain/Projet/siteVelocitAI-main/public/images/blog/[nom-article]/

# Copier l'image
cp /home/romain/Projet/openai-image-generator/generated-images/[nom-image].png /home/romain/Projet/siteVelocitAI-main/public/images/blog/[nom-article]/
```

### Bonnes pratiques pour les prompts d'images de blog
- **Style cohérent** : "professional business illustration", "modern flat design"
- **Couleurs VelocitAI** : mentionner "purple and blue color scheme" si approprié
- **Format approprié** : landscape pour headers, square pour thumbnails
- **LANGUE FRANÇAISE OBLIGATOIRE** : Les images doivent contenir uniquement du texte en français
- **Éviter le texte anglais** : Spécifier "French text only" ou "texte en français uniquement" dans le prompt
- **Localisation française** : Adapter les concepts pour le marché français/réunionnais
- **ALTERNANCE OBLIGATOIRE** : Alterner entre illustrations/infographies et photos réalistes
- **Photos réalistes** : "realistic professional photography", "modern office environment"
- **Illustrations** : "professional business illustration", "modern infographic design"

### Règles strictes
1. ❌ **JAMAIS** générer d'images sans demander l'autorisation
2. ✅ **TOUJOURS** fournir le coût estimé en tokens
3. ✅ **TOUJOURS** expliquer pourquoi l'image est nécessaire
4. ✅ **TOUJOURS** proposer des alternatives gratuites si possible
5. ✅ **TOUJOURS** copier les images générées vers le dossier VelocitAI

### Alternatives gratuites à considérer
Avant de proposer la génération d'images, suggérer :
- Images stock gratuites (Unsplash, Pexels)
- Icônes existantes du site
- Diagrammes/schémas simples créés en CSS
- Images conceptuelles génériques
