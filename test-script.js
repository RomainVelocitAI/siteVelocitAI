console.log("Démarrage du script de test...");
try {
  console.log("Tentative d'importation de Next.js...");
  const next = require('next');
  console.log("Next.js importé avec succès!");
  console.log("Version de Next.js:", next.default({ dev: true }).version);
} catch (error) {
  console.error("Erreur lors de l'importation de Next.js:", error);
  process.exit(1);
}
