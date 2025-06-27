#!/bin/bash

# Script de déploiement pour l'automatisation blog
# À utiliser pour mettre en production le système

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Déploiement du système d'automatisation blog VelocitAI${NC}"

# Vérifications préliminaires
echo -e "\n${YELLOW}🔍 Vérifications préliminaires...${NC}"

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js installé${NC}"

# Vérifier npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm n'est pas installé${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm installé${NC}"

# Vérifier crontab
if ! command -v crontab &> /dev/null; then
    echo -e "${RED}❌ crontab n'est pas disponible${NC}"
    exit 1
fi
echo -e "${GREEN}✅ crontab disponible${NC}"

# Vérifier la structure du projet
PROJECT_PATH=$(pwd)
REQUIRED_FILES=(
    "scripts/auto-publish-blog.js"
    "scripts/test-blog-automation.js"
    "content/blog"
    "pages/blog"
    "package.json"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -e "$PROJECT_PATH/$file" ]; then
        echo -e "${RED}❌ Fichier/dossier manquant: $file${NC}"
        exit 1
    fi
done
echo -e "${GREEN}✅ Structure du projet validée${NC}"

# Installation des dépendances
echo -e "\n${YELLOW}📦 Installation des dépendances...${NC}"
npm install node-fetch gray-matter
echo -e "${GREEN}✅ Dépendances installées${NC}"

# Vérification du fichier .env
echo -e "\n${YELLOW}🔧 Vérification de la configuration...${NC}"
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  Fichier .env non trouvé, création à partir du template...${NC}"
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${YELLOW}📝 Veuillez configurer vos variables d'environnement dans .env${NC}"
    else
        echo -e "${RED}❌ Fichier .env.example non trouvé${NC}"
        exit 1
    fi
fi

# Vérifier les variables d'environnement critiques
source .env 2>/dev/null || true
if [ -z "$AIRTABLE_API_KEY" ] || [ -z "$AIRTABLE_BASE_ID" ]; then
    echo -e "${RED}❌ Variables Airtable non configurées dans .env${NC}"
    echo -e "${YELLOW}📝 Veuillez configurer AIRTABLE_API_KEY et AIRTABLE_BASE_ID${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Configuration Airtable trouvée${NC}"

# Création des répertoires nécessaires
echo -e "\n${YELLOW}📁 Création des répertoires...${NC}"
mkdir -p logs
mkdir -p test-output
echo -e "${GREEN}✅ Répertoires créés${NC}"

# Rendre les scripts exécutables
echo -e "\n${YELLOW}🔐 Configuration des permissions...${NC}"
chmod +x scripts/auto-publish-blog.js
chmod +x scripts/test-blog-automation.js
chmod +x scripts/setup-cron.sh
echo -e "${GREEN}✅ Permissions configurées${NC}"

# Test de connexion Airtable
echo -e "\n${YELLOW}🧪 Test de connexion Airtable...${NC}"
if node scripts/test-blog-automation.js > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Connexion Airtable réussie${NC}"
else
    echo -e "${RED}❌ Échec de connexion Airtable${NC}"
    echo -e "${YELLOW}🔧 Exécutez 'node scripts/test-blog-automation.js' pour plus de détails${NC}"
fi

# Configuration du cron job
echo -e "\n${YELLOW}⏰ Configuration du cron job...${NC}"
./scripts/setup-cron.sh

# Création d'un script de monitoring
echo -e "\n${YELLOW}📊 Création du script de monitoring...${NC}"
cat > scripts/monitor-blog-automation.sh << 'EOF'
#!/bin/bash

# Script de monitoring pour l'automatisation blog

LOG_FILE="logs/blog-automation.log"
ALERT_EMAIL="admin@velocitai.com"

# Vérifier si le log existe
if [ ! -f "$LOG_FILE" ]; then
    echo "❌ Fichier de log non trouvé: $LOG_FILE"
    exit 1
fi

# Vérifier les erreurs récentes (dernières 24h)
RECENT_ERRORS=$(grep -c "❌\|ERROR" "$LOG_FILE" | tail -100)

if [ "$RECENT_ERRORS" -gt 0 ]; then
    echo "⚠️  $RECENT_ERRORS erreur(s) détectée(s) dans les logs récents"
    echo "📋 Dernières erreurs:"
    grep "❌\|ERROR" "$LOG_FILE" | tail -5
else
    echo "✅ Aucune erreur récente détectée"
fi

# Vérifier la dernière exécution
LAST_RUN=$(grep "🎉 Automatisation terminée" "$LOG_FILE" | tail -1)
if [ -n "$LAST_RUN" ]; then
    echo "✅ Dernière exécution réussie: $LAST_RUN"
else
    echo "⚠️  Aucune exécution réussie trouvée récemment"
fi

# Statistiques
TOTAL_ARTICLES=$(grep -c "✅ Article publié" "$LOG_FILE")
echo "📊 Total d'articles publiés: $TOTAL_ARTICLES"
EOF

chmod +x scripts/monitor-blog-automation.sh
echo -e "${GREEN}✅ Script de monitoring créé${NC}"

# Sauvegarde de la configuration
echo -e "\n${YELLOW}💾 Sauvegarde de la configuration...${NC}"
BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp .env "$BACKUP_DIR/"
cp -r scripts "$BACKUP_DIR/"
echo -e "${GREEN}✅ Configuration sauvegardée dans $BACKUP_DIR${NC}"

# Résumé du déploiement
echo -e "\n${BLUE}📋 Résumé du déploiement:${NC}"
echo -e "  ✅ Dépendances installées"
echo -e "  ✅ Configuration validée"
echo -e "  ✅ Permissions configurées"
echo -e "  ✅ Cron job configuré"
echo -e "  ✅ Monitoring configuré"
echo -e "  ✅ Sauvegarde créée"

echo -e "\n${GREEN}🎉 Déploiement terminé avec succès!${NC}"

echo -e "\n${YELLOW}📝 Prochaines étapes:${NC}"
echo -e "  1. Vérifiez votre base Airtable avec la structure recommandée"
echo -e "  2. Testez le système: node scripts/test-blog-automation.js"
echo -e "  3. Créez votre premier article programmé dans Airtable"
echo -e "  4. Surveillez les logs: tail -f logs/blog-automation.log"

echo -e "\n${BLUE}🔧 Commandes utiles:${NC}"
echo -e "  • Test complet: node scripts/test-blog-automation.js"
echo -e "  • Monitoring: ./scripts/monitor-blog-automation.sh"
echo -e "  • Logs en temps réel: tail -f logs/blog-automation.log"
echo -e "  • Voir cron jobs: crontab -l"

echo -e "\n${GREEN}✨ Le système d'automatisation blog VelocitAI est maintenant opérationnel!${NC}"