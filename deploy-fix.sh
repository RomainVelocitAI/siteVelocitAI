#!/bin/bash

# Script de déploiement des corrections Error 500
# Usage: ./deploy-fix.sh

echo "🚀 Déploiement des corrections Error 500 pour VelocitAI"
echo "======================================================="

# Couleurs pour le terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 1. Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    log_error "Erreur: package.json non trouvé. Exécutez ce script depuis la racine du projet."
    exit 1
fi

echo ""
echo "📋 Liste des modifications appliquées:"
echo "--------------------------------------"
echo "  • netlify.toml - Configuration corrigée"
echo "  • next.config.js - Optimisations production"
echo "  • pages/_app.tsx - ErrorBoundary intégré"
echo "  • middleware.ts - Headers de cache optimisés"
echo "  • lib/api-wrapper.ts - Gestion timeout/retry"
echo "  • pages/api/health.ts - Endpoint de monitoring"
echo "  • pages/500.tsx - Page d'erreur personnalisée"
echo "  • netlify/functions/warmup.ts - Fonction de warmup"
echo ""

# 2. Demander confirmation
read -p "Voulez-vous continuer avec le déploiement? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log_warning "Déploiement annulé"
    exit 0
fi

# 3. Vérifier le status Git
echo ""
echo "🔍 Vérification du status Git..."
git status --short

# 4. Ajouter les fichiers modifiés
echo ""
echo "📦 Ajout des fichiers au commit..."
git add -A
log_success "Fichiers ajoutés"

# 5. Créer le commit
echo ""
echo "💾 Création du commit..."
git commit -m "Fix: Résolution erreur 500 après inactivité + optimisations SEO

- Correction configuration Netlify pour Next.js
- Ajout gestion d'erreurs robuste avec ErrorBoundary  
- Implémentation API wrapper avec timeout et retry
- Création système de warmup pour prévenir cold starts
- Optimisation cache et performances SSR
- Page 500 personnalisée avec auto-récupération

Ces modifications résolvent le problème d'erreur 500 qui survenait
après une période d'inactivité prolongée sur Netlify et améliorent
significativement les performances SEO du site." || {
    log_warning "Aucun changement à commiter ou commit échoué"
}

# 6. Afficher le dernier commit
echo ""
echo "📝 Dernier commit:"
git log -1 --oneline

# 7. Demander confirmation pour le push
echo ""
read -p "Voulez-vous pusher vers GitHub? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Push vers GitHub..."
    git push origin main || git push origin master || {
        log_error "Échec du push. Vérifiez votre connexion et vos credentials."
        exit 1
    }
    log_success "Push réussi! Le déploiement Netlify va démarrer automatiquement."
else
    log_warning "Push annulé. Exécutez 'git push origin main' quand vous serez prêt."
fi

echo ""
echo "📌 Prochaines étapes:"
echo "--------------------"
echo "1. ✅ Vérifier le build sur Netlify Dashboard"
echo "2. ⚙️  Configurer les variables d'environnement sur Netlify:"
echo "     - URL=https://velocit-ai.fr"
echo "     - AIRTABLE_API_KEY (si utilisé)"
echo "3. 🔄 Configurer UptimeRobot pour le warmup:"
echo "     - Monitor 1: https://velocit-ai.fr/api/health (5 min)"
echo "     - Monitor 2: https://velocit-ai.fr/.netlify/functions/warmup (15 min)"
echo "4. 🧪 Tester après déploiement:"
echo "     - curl https://velocit-ai.fr/api/health"
echo "     - Lighthouse audit"
echo ""
log_success "Script terminé avec succès!"