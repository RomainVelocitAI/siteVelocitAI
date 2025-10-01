#!/bin/bash

# Script de vérification SSR - VelocitAI
# Vérifie que le contenu texte est bien présent dans le HTML généré

echo "🔍 Vérification du SSR VelocitAI"
echo "================================"
echo ""

HTML_FILE=".next/server/pages/index.html"

if [ ! -f "$HTML_FILE" ]; then
    echo "❌ Fichier HTML non trouvé. Lancez 'npm run build' d'abord."
    exit 1
fi

echo "📄 Fichier: $HTML_FILE"
echo ""

# Comptage des sections
SECTION_COUNT=$(grep -o "<section" "$HTML_FILE" | wc -l)
echo "✅ Sections HTML: $SECTION_COUNT"

# Vérification du contenu clé
KEYWORDS=(
    "Écosystème d'Agents IA"
    "Pourquoi Automatiser"
    "Calculez vos économies"
    "Notre Méthode"
    "Questions Fréquentes"
)

echo ""
echo "🔎 Vérification du contenu:"
echo ""

for keyword in "${KEYWORDS[@]}"; do
    if grep -q "$keyword" "$HTML_FILE"; then
        echo "  ✅ '$keyword' présent"
    else
        echo "  ❌ '$keyword' MANQUANT"
    fi
done

echo ""
echo "📊 Statistiques:"
echo "  - Taille HTML: $(wc -c < "$HTML_FILE" | numfmt --to=iec-i --suffix=B)"
echo "  - Lignes HTML: $(wc -l < "$HTML_FILE")"
echo ""

# Vérification production
if command -v curl &> /dev/null; then
    echo "🌐 Test serveur local (si disponible):"
    if curl -s http://localhost:3000 > /tmp/ssr-test.html 2>/dev/null; then
        LIVE_SECTIONS=$(grep -o "<section" /tmp/ssr-test.html | wc -l)
        echo "  ✅ Sections serveur: $LIVE_SECTIONS"
        rm /tmp/ssr-test.html
    else
        echo "  ⚠️  Serveur non disponible (normal si non démarré)"
    fi
fi

echo ""
echo "✅ Vérification terminée!"
