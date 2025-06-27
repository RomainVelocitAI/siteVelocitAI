# Blog VelocitAI - Mode Sombre

## 🌟 Fonctionnalités

- ✅ **Mode sombre par défaut** - Le site démarre automatiquement en mode sombre
- ✅ **Basculement de thème** - Bouton pour passer du mode sombre au mode clair
- ✅ **Article de blog publié** - Guide stratégique d'automatisation d'entreprise 2025
- ✅ **Design responsive** - Optimisé pour mobile, tablette et desktop
- ✅ **SEO optimisé** - Métadonnées, Open Graph, Twitter Cards, Schema.org
- ✅ **Partage social** - Boutons de partage Twitter, LinkedIn, Facebook
- ✅ **Navigation fluide** - Animations et transitions

## 📁 Structure du Blog

```
pages/blog/
├── index.tsx          # Page d'accueil du blog
└── [slug].tsx         # Page d'article individuel

content/blog/
└── automatisation-entreprise-guide-strategique-2025.md

contexts/
└── ThemeContext.tsx   # Gestion du thème sombre/clair
```

## 🚀 Installation et Démarrage

1. **Installer les dépendances :**
   ```bash
   ./install-blog-deps.sh
   ```

2. **Démarrer le serveur de développement :**
   ```bash
   npm run dev
   ```

3. **Accéder au blog :**
   - Page d'accueil du blog : `http://localhost:3000/blog`
   - Article publié : `http://localhost:3000/blog/automatisation-entreprise-guide-strategique-2025`

## 🎨 Thème Sombre

Le site utilise un système de thème intelligent :

- **Mode par défaut** : Sombre (défini dans `ThemeContext.tsx`)
- **Persistance** : Le choix de thème est sauvegardé dans localStorage
- **Basculement** : Bouton dans le header (icône soleil/lune)
- **Classes Tailwind** : `dark:` pour les styles en mode sombre

## 📝 Ajouter un Nouvel Article

1. **Créer le fichier markdown :**
   ```bash
   touch content/blog/mon-nouvel-article.md
   ```

2. **Ajouter le front matter :**
   ```yaml
   ---
   title: "Titre de l'article"
   description: "Description SEO"
   slug: "mon-nouvel-article"
   date: "2024-12-24"
   author: "VelocitAI"
   category: "Catégorie"
   tags: ["tag1", "tag2"]
   readTime: 10
   featured: false
   seo:
     metaTitle: "Titre SEO"
     metaDescription: "Description SEO"
     keywords: ["mot-clé1", "mot-clé2"]
   ---
   ```

3. **Ajouter le contenu en markdown**

4. **Mettre à jour les pages :**
   - Ajouter le slug dans `getStaticPaths` de `[slug].tsx`
   - Ajouter l'article dans `getStaticProps` de `index.tsx`

## 🔧 Configuration

### Thème par défaut
Pour changer le thème par défaut, modifier dans `contexts/ThemeContext.tsx` :
```tsx
const [theme, setTheme] = useState<Theme>('dark'); // 'light' ou 'dark'
```

### Couleurs du thème
Les couleurs sont définies dans `tailwind.config.js` et `styles/globals.css`.

## 📱 Responsive Design

Le blog est optimisé pour :
- **Mobile** : Navigation hamburger, layout adaptatif
- **Tablette** : Grille 2 colonnes
- **Desktop** : Grille 3 colonnes, navigation complète

## 🔍 SEO et Performance

- **Métadonnées complètes** : Title, description, keywords
- **Open Graph** : Partage optimisé sur les réseaux sociaux
- **Schema.org** : Données structurées pour les moteurs de recherche
- **Images optimisées** : Next.js Image component
- **Lazy loading** : Chargement différé du contenu

## 🎯 Fonctionnalités Avancées

- **Animations** : Framer Motion pour les transitions
- **Partage social** : Boutons natifs avec compteurs
- **Navigation** : Breadcrumbs et liens de retour
- **CTA** : Appels à l'action intégrés
- **Typography** : Plugin Tailwind pour le contenu markdown

## 🚀 Déploiement

Le blog est prêt pour le déploiement sur :
- **Netlify** (configuration incluse)
- **Vercel**
- **Tout hébergeur supportant Next.js**

## 📊 Analytics

Pour ajouter Google Analytics, modifier `components/GoogleAnalytics.tsx` avec votre ID de suivi.