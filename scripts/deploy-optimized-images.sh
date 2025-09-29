#!/bin/bash

# Script pour déployer les images optimisées
# Ce script remplace les images originales par les versions WebP optimisées

OPTIMIZED_DIR="public/images-optimized"
IMAGES_DIR="public/images"
BACKUP_DIR="public/images-backup-$(date +%Y%m%d_%H%M%S)"

echo "🚀 Déploiement des images optimisées"
echo "===================================="
echo ""

# Vérifier que le dossier optimized existe
if [ ! -d "$OPTIMIZED_DIR" ]; then
    echo "❌ Erreur: Le dossier $OPTIMIZED_DIR n'existe pas"
    echo "   Exécutez d'abord: node scripts/optimize-images.js"
    exit 1
fi

# Créer une sauvegarde des images originales
echo "📦 Création d'une sauvegarde dans $BACKUP_DIR..."
mkdir -p "$BACKUP_DIR"
cp -r "$IMAGES_DIR"/* "$BACKUP_DIR/" 2>/dev/null || true
echo "✅ Sauvegarde créée"
echo ""

# Compter les fichiers à déployer
WEBP_COUNT=$(find "$OPTIMIZED_DIR" -name "*.webp" | wc -l)
echo "📊 $WEBP_COUNT fichiers WebP à déployer"
echo ""

# Copier les images WebP optimisées
echo "🔄 Copie des images optimisées..."
rsync -av --progress "$OPTIMIZED_DIR/" "$IMAGES_DIR/"

echo ""
echo "✅ Images optimisées déployées avec succès!"
echo ""
echo "📝 Note importante:"
echo "   - Testez le site pour vérifier que toutes les images s'affichent"
echo "   - Les images originales sont dans: $BACKUP_DIR"
echo "   - Mettez à jour les chemins dans le code pour utiliser .webp"
echo ""
echo "🔧 Prochaines étapes:"
echo "   1. npm run dev - Tester localement"
echo "   2. npm run build - Vérifier le build"
echo "   3. Déployer sur production"