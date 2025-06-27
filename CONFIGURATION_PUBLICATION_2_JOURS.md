# 📅 Configuration Publication Tous les 2 Jours

## ✅ Système Configuré

### **Logique de Publication**
- **Vérification quotidienne** : Le script s'exécute tous les jours à 9h00
- **Publication effective** : Seulement tous les 2 jours
- **Algorithme** : Basé sur les jours pairs depuis l'époque Unix

### **Avantages du Système**
✅ **Rythme optimal** : Pas de spam, contenu régulier
✅ **Gestion automatique** : 15 articles = 30 jours de contenu
✅ **Sécurité** : Maximum 1 article tous les 2 jours
✅ **Flexibilité** : Vous pouvez ajouter des articles quand vous voulez

## 📊 Calendrier de Publication

### **Exemple avec 15 articles préparés :**
- **Jour 1** : Publication article 1
- **Jour 2** : Pas de publication
- **Jour 3** : Publication article 2
- **Jour 4** : Pas de publication
- **Jour 5** : Publication article 3
- **...et ainsi de suite**

### **Durée de contenu :**
- **15 articles** = 30 jours de contenu automatique
- **20 articles** = 40 jours de contenu automatique
- **30 articles** = 60 jours de contenu automatique

## 🔧 Configuration Technique

### **Script Principal**
```javascript
// Vérifie si c'est un jour de publication
shouldPublishToday() {
  const today = new Date();
  const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  return daysSinceEpoch % 2 === 0; // Tous les 2 jours
}
```

### **Cron Job**
```bash
# S'exécute tous les jours à 9h00
0 9 * * * cd /home/romain/Projet/siteVelocitAI-main && node scripts/auto-publish-blog.js
```

## 🎯 Workflow pour Romain

### **1. Préparation (Une fois)**
1. Créez 20-30 articles dans Airtable
2. Mettez le statut sur "Scheduled"
3. Remplissez les 6 URLs d'images
4. Configurez le cron job : `bash scripts/setup-cron.sh`

### **2. Fonctionnement Automatique**
- Le système publie automatiquement tous les 2 jours
- Aucune intervention nécessaire pendant 1-2 mois
- Vous recevez les logs pour suivre les publications

### **3. Maintenance (Mensuelle)**
- Vérifiez le nombre d'articles restants
- Ajoutez de nouveaux articles quand nécessaire
- Consultez les logs pour vérifier le bon fonctionnement

## 📝 Logs et Monitoring

### **Logs Automatiques**
```bash
# Voir les logs en temps réel
tail -f /home/romain/Projet/siteVelocitAI-main/logs/blog-automation.log

# Voir les dernières publications
grep "Article publié" logs/blog-automation.log
```

### **Messages Types**
- **Jour de publication** : "📅 Jour de publication ! Recherche d'un article..."
- **Pas de publication** : "📅 Pas de publication aujourd'hui (cycle de 2 jours)"
- **Article publié** : "✅ Article publié: nom-de-l-article"
- **Aucun article** : "ℹ️ Aucun article en attente de publication"

## 🚀 Commandes Utiles

### **Test Manuel**
```bash
cd /home/romain/Projet/siteVelocitAI-main
node scripts/auto-publish-blog.js
```

### **Vérifier le Cron**
```bash
crontab -l
```

### **Voir la File d'Attente**
```bash
node scripts/prepare-blog-queue.js queue
```

### **Statistiques**
```bash
node scripts/prepare-blog-queue.js stats
```

## 🎉 Résultat Final

**Votre blog VelocitAI publiera automatiquement du contenu de qualité tous les 2 jours, avec 6 images par article, sans aucune intervention de votre part !**

- ✅ Système 100% automatisé
- ✅ Publication tous les 2 jours
- ✅ 6 images par article
- ✅ Gestion intelligente de la file d'attente
- ✅ Logs complets pour le monitoring