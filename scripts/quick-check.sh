#!/bin/bash

# Script de vérification rapide du système blog
# À utiliser pour vérifier que tout fonctionne correctement

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔍 Vérification rapide du système blog VelocitAI${NC}\n"

PROJECT_PATH="/home/romain/Projet/siteVelocitAI-main"

# Vérifier qu'on est dans le bon répertoire
if [ "$(pwd)" != "$PROJECT_PATH" ]; then
    echo -e "${YELLOW}📁 Changement vers le répertoire du projet...${NC}"
    cd "$PROJECT_PATH" || exit 1
fi

echo -e "${GREEN}✅ Répertoire: $(pwd)${NC}"

# Vérifier les fichiers essentiels
echo -e "\n${YELLOW}📋 Vérification des fichiers...${NC}"

FILES=(
    "scripts/auto-publish-blog.js"
    "scripts/prepare-blog-queue.js"
    "scripts/test-blog-automation.js"
    "package.json"
    ".env"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file manquant${NC}"
        if [ "$file" = ".env" ]; then
            echo -e "${YELLOW}   💡 Créez le fichier .env avec vos clés Airtable${NC}"
        fi
    fi
done

# Vérifier les dépendances
echo -e "\n${YELLOW}📦 Vérification des dépendances...${NC}"
if npm list node-fetch gray-matter > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Dépendances installées${NC}"
else
    echo -e "${RED}❌ Dépendances manquantes${NC}"
    echo -e "${YELLOW}   💡 Exécutez: npm install node-fetch gray-matter${NC}"
fi

# Vérifier les variables d'environnement
echo -e "\n${YELLOW}🔧 Vérification de la configuration...${NC}"
if [ -f ".env" ]; then
    source .env 2>/dev/null || true
    if [ -n "$AIRTABLE_API_KEY" ] && [ -n "$AIRTABLE_BASE_ID" ]; then
        echo -e "${GREEN}✅ Variables Airtable configurées${NC}"
    else
        echo -e "${RED}❌ Variables Airtable manquantes dans .env${NC}"
        echo -e "${YELLOW}   💡 Ajoutez AIRTABLE_API_KEY et AIRTABLE_BASE_ID${NC}"
    fi
else
    echo -e "${RED}❌ Fichier .env manquant${NC}"
fi

# Vérifier le cron job
echo -e "\n${YELLOW}⏰ Vérification du cron job...${NC}"
if crontab -l 2>/dev/null | grep -q "auto-publish-blog.js\|blog-automation-wrapper.sh"; then
    echo -e "${GREEN}✅ Cron job configuré${NC}"
    echo -e "${BLUE}📅 Tâches cron actuelles:${NC}"
    crontab -l 2>/dev/null | grep -E "auto-publish-blog|blog-automation" || echo "   Aucune tâche blog trouvée"
else
    echo -e "${RED}❌ Cron job non configuré${NC}"
    echo -e "${YELLOW}   💡 Exécutez: npm run blog:setup${NC}"
fi

# Vérifier les répertoires
echo -e "\n${YELLOW}📁 Vérification des répertoires...${NC}"
DIRS=("logs" "content/blog")

for dir in "${DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✅ $dir/${NC}"
    else
        echo -e "${YELLOW}⚠️  $dir/ manquant (sera créé automatiquement)${NC}"
    fi
done

# Test rapide de connexion (si configuré)
if [ -n "$AIRTABLE_API_KEY" ] && [ -n "$AIRTABLE_BASE_ID" ]; then
    echo -e "\n${YELLOW}🔗 Test de connexion Airtable...${NC}"
    if timeout 10s node scripts/test-blog-automation.js > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Connexion Airtable réussie${NC}"
    else
        echo -e "${RED}❌ Échec de connexion Airtable${NC}"
        echo -e "${YELLOW}   💡 Vérifiez vos clés API et votre base${NC}"
    fi
fi

# Résumé et recommandations
echo -e "\n${BLUE}📊 Résumé:${NC}"

# Compter les vérifications réussies
CHECKS=0
TOTAL=5

[ -f "scripts/auto-publish-blog.js" ] && ((CHECKS++))
[ -f ".env" ] && [ -n "$AIRTABLE_API_KEY" ] && ((CHECKS++))
npm list node-fetch > /dev/null 2>&1 && ((CHECKS++))
[ -d "content/blog" ] && ((CHECKS++))
crontab -l 2>/dev/null | grep -q "auto-publish-blog\|blog-automation" && ((CHECKS++))

echo -e "   ${CHECKS}/${TOTAL} vérifications réussies"

if [ $CHECKS -eq $TOTAL ]; then
    echo -e "\n${GREEN}🎉 Système prêt ! Vous pouvez commencer à utiliser l'automatisation blog.${NC}"
    echo -e "\n${BLUE}🚀 Prochaines étapes:${NC}"
    echo -e "   1. npm run blog:queue    # Voir la file d'attente"
    echo -e "   2. npm run blog:stats    # Voir les statistiques"
    echo -e "   3. Créer des articles dans Airtable avec Status = 'Scheduled'"
elif [ $CHECKS -ge 3 ]; then
    echo -e "\n${YELLOW}⚠️  Système partiellement configuré. Quelques ajustements nécessaires.${NC}"
    echo -e "\n${BLUE}🔧 Actions recommandées:${NC}"
    [ ! -f ".env" ] && echo -e "   • Créer le fichier .env avec vos clés Airtable"
    ! npm list node-fetch > /dev/null 2>&1 && echo -e "   • Installer les dépendances: npm install"
    ! crontab -l 2>/dev/null | grep -q "auto-publish-blog" && echo -e "   • Configurer le cron: npm run blog:setup"
else
    echo -e "\n${RED}❌ Configuration incomplète. Utilisez le déploiement automatique.${NC}"
    echo -e "\n${BLUE}🚀 Solution rapide:${NC}"
    echo -e "   npm run blog:deploy"
fi

echo -e "\n${BLUE}📚 Aide:${NC}"
echo -e "   • Documentation: cat WORKFLOW_BLOG_ROMAIN.md"
echo -e "   • Test complet: npm run blog:test"
echo -e "   • Support: Consultez les logs avec 'tail -f logs/blog-automation.log'"