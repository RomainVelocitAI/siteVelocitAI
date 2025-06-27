#!/bin/bash

echo "🚀 Installation des dépendances pour le blog VelocitAI..."

# Installation des dépendances
npm install gray-matter@^4.0.3 remark@^15.0.1 remark-html@^16.0.1 @tailwindcss/typography@^0.5.15

echo "✅ Dépendances installées avec succès!"

echo "🔧 Génération des types TypeScript..."
npm run type-check

echo "🎨 Vérification du build..."
npm run build

echo "🌟 Blog VelocitAI prêt! Vous pouvez maintenant:"
echo "   - Accéder au blog sur /blog"
echo "   - Lire l'article sur /blog/automatisation-entreprise-guide-strategique-2025"
echo "   - Le site est en mode sombre par défaut"
echo ""
echo "🚀 Pour démarrer le serveur de développement:"
echo "   npm run dev"