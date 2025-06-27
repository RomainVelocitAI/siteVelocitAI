#!/bin/bash

# Script de configuration du cron job pour l'automatisation blog
# À exécuter une seule fois pour configurer la tâche quotidienne

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Configuration du cron job pour l'automatisation blog${NC}"

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    exit 1
fi

# Obtenir le chemin absolu du projet
PROJECT_PATH="/home/romain/Projet/siteVelocitAI-main"
SCRIPT_PATH="$PROJECT_PATH/scripts/auto-publish-blog.js"

# Vérifier si le script existe
if [ ! -f "$SCRIPT_PATH" ]; then
    echo -e "${RED}❌ Script auto-publish-blog.js non trouvé${NC}"
    exit 1
fi

# Rendre le script exécutable
chmod +x "$SCRIPT_PATH"

# Créer un script wrapper pour charger les variables d'environnement
WRAPPER_SCRIPT="$PROJECT_PATH/scripts/blog-automation-wrapper.sh"

cat > "$WRAPPER_SCRIPT" << EOF
#!/bin/bash

# Wrapper script pour l'automatisation blog
# Charge les variables d'environnement et exécute le script Node.js

cd "$PROJECT_PATH"

# Charger les variables d'environnement
if [ -f .env ]; then
    export \$(grep -v '^#' .env | xargs)
fi

# Exécuter le script d'automatisation
/usr/bin/node "$SCRIPT_PATH" >> "$PROJECT_PATH/logs/blog-automation.log" 2>&1
EOF

# Rendre le wrapper exécutable
chmod +x "$WRAPPER_SCRIPT"

# Créer le répertoire de logs
mkdir -p "$PROJECT_PATH/logs"

# Configurer le cron job
CRON_JOB="0 9 * * * $WRAPPER_SCRIPT"

# Vérifier si le cron job existe déjà
if crontab -l 2>/dev/null | grep -q "$WRAPPER_SCRIPT"; then
    echo -e "${YELLOW}⚠️  Cron job déjà configuré${NC}"
else
    # Ajouter le cron job
    (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
    echo -e "${GREEN}✅ Cron job configuré pour s'exécuter tous les jours à 9h${NC}"
fi

echo -e "${GREEN}📋 Configuration terminée:${NC}"
echo -e "  • Script: $SCRIPT_PATH"
echo -e "  • Wrapper: $WRAPPER_SCRIPT"
echo -e "  • Logs: $PROJECT_PATH/logs/blog-automation.log"
echo -e "  • Horaire: Tous les jours à 9h00"

echo -e "\n${YELLOW}📝 Prochaines étapes:${NC}"
echo -e "  1. Configurer vos variables d'environnement dans .env"
echo -e "  2. Créer votre base Airtable avec la structure recommandée"
echo -e "  3. Tester le script manuellement: node scripts/auto-publish-blog.js"

echo -e "\n${GREEN}🔧 Commandes utiles:${NC}"
echo -e "  • Voir les cron jobs: crontab -l"
echo -e "  • Voir les logs: tail -f logs/blog-automation.log"
echo -e "  • Test manuel: node scripts/auto-publish-blog.js"