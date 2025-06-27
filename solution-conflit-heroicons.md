# Solution au conflit de dépendances entre @heroicons/react et react-icons

## Problème identifié

Le projet utilise actuellement deux bibliothèques d'icônes qui peuvent créer des conflits :
- `@heroicons/react` v2.2.0
- `react-icons` v5.5.0

Ces deux bibliothèques peuvent entrer en conflit car elles ont des dépendances différentes et des méthodes d'importation qui peuvent se chevaucher.

## Solutions possibles

### Option 1: Conserver uniquement @heroicons/react (Recommandée)

Cette option est recommandée car `@heroicons/react` est déjà largement utilisée dans le projet.

1. Désinstaller react-icons :
```bash
npm uninstall react-icons
```

2. Mettre à jour package.json pour supprimer la dépendance :
```json
// Supprimer cette ligne
"react-icons": "^5.5.0",
```

### Option 2: Conserver uniquement react-icons

Cette option nécessite plus de travail mais offre plus d'icônes.

1. Désinstaller @heroicons/react :
```bash
npm uninstall @heroicons/react
```

2. Remplacer tous les imports d'heroicons par des imports react-icons :
   - `import { XMarkIcon } from '@heroicons/react/24/outline';` → `import { HiOutlineXMark } from "react-icons/hi2";`
   - `import { CheckCircleIcon } from '@heroicons/react/24/solid';` → `import { HiCheckCircle } from "react-icons/hi2";`

### Option 3: Utiliser des versions compatibles des deux bibliothèques

Downgrader react-icons à une version compatible :
```bash
npm uninstall react-icons
npm install react-icons@4.12.0
```

## Recommandation pour le calculateur VelocitAI

Pour le calculateur, nous recommandons l'**Option 1** car :
1. Le calculateur n'utilise pas directement d'icônes de ces bibliothèques
2. Le reste du site utilise déjà largement @heroicons/react
3. C'est la solution la plus simple et la moins risquée

## Étapes à suivre

1. Supprimer react-icons :
```bash
npm uninstall react-icons
```

2. Mettre à jour package.json pour supprimer la référence à react-icons

3. Vérifier que toutes les icônes fonctionnent correctement

4. Reconstruire l'application :
```bash
npm run build
```

Cette solution devrait résoudre le conflit de dépendances tout en minimisant les changements nécessaires dans le code.