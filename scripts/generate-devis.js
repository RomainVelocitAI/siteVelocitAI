const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Fonction pour parser les arguments CLI
function parseArgs() {
  const args = process.argv.slice(2);
  const config = {
    clientNom: '',
    clientEmail: '',
    clientTelephone: '',
    clientAdresse: '',
    prestations: [],
    options: []
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--client-nom' && args[i + 1]) {
      config.clientNom = args[++i];
    } else if (arg === '--client-email' && args[i + 1]) {
      config.clientEmail = args[++i];
    } else if (arg === '--client-tel' && args[i + 1]) {
      config.clientTelephone = args[++i];
    } else if (arg === '--client-adresse' && args[i + 1]) {
      config.clientAdresse = args[++i];
    } else if (arg === '--prestation' && args[i + 1]) {
      // Format: "Titre|Description|Prix|Detail1;Detail2;Detail3"
      const prestationData = args[++i].split('|');
      if (prestationData.length >= 3) {
        config.prestations.push({
          titre: prestationData[0],
          description: prestationData[1],
          prixUnitaire: parseFloat(prestationData[2]),
          total: parseFloat(prestationData[2]),
          details: prestationData[3] ? prestationData[3].split(';') : []
        });
      }
    } else if (arg === '--option' && args[i + 1]) {
      config.options.push(args[++i]);
    }
  }

  return config;
}

// Validation des arguments requis
const cliConfig = parseArgs();

if (!cliConfig.clientNom || cliConfig.prestations.length === 0) {
  console.error('❌ Erreur : Arguments manquants');
  console.log('\n📖 Usage:');
  console.log('node generate-devis.js --client-nom "Nom" --prestation "Titre|Description|Prix|Details" [options]\n');
  console.log('Arguments requis:');
  console.log('  --client-nom "Nom du client"');
  console.log('  --prestation "Titre|Description|Prix|Detail1;Detail2;Detail3" (au moins une)\n');
  console.log('Arguments optionnels:');
  console.log('  --client-email "email@example.com"');
  console.log('  --client-tel "0692123456"');
  console.log('  --client-adresse "Adresse complète"');
  console.log('  --option "Option incluse" (répétable)\n');
  console.log('Exemple:');
  console.log('node generate-devis.js \\');
  console.log('  --client-nom "Jean DUPONT" \\');
  console.log('  --client-email "jean@email.com" \\');
  console.log('  --prestation "Site Web|Développement site complet|5000|Design moderne;Responsive;SEO" \\');
  console.log('  --option "Formation incluse" \\');
  console.log('  --option "Support 3 mois"');
  process.exit(1);
}

// Configuration du devis
const devisData = {
  numero: `DEVIS-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
  date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
  validite: new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }),

  // Informations entreprise
  entreprise: {
    nom: 'VelocitAI',
    adresse: 'La Réunion, France',
    email: 'contact@velocit-ai.fr',
    telephone: '0693124760',
    siren: '883371130'
  },

  // Informations client
  client: {
    nom: cliConfig.clientNom,
    adresse: cliConfig.clientAdresse || '',
    email: cliConfig.clientEmail || '',
    telephone: cliConfig.clientTelephone || ''
  },

  // Prestations
  prestations: cliConfig.prestations,

  // Options incluses
  optionsIncluses: cliConfig.options,

  // Conditions (calculées automatiquement selon le montant)
  conditions: {
    acompte: '',
    solde: '',
    delai: '',
    validite: '30 jours'
  }
};

// Calcul du total automatique
const sousTotal = devisData.prestations.reduce((sum, p) => sum + p.total, 0);
const totalHT = sousTotal;
const totalTTC = totalHT;

// Mise à jour automatique des conditions en fonction du montant
if (totalTTC >= 100000) {
  const acompteAmount = Math.round(totalTTC * 0.4);
  const soldeAmount = totalTTC - acompteAmount;
  devisData.conditions.acompte = `40% à la signature (${acompteAmount.toLocaleString('fr-FR')} €)`;
  devisData.conditions.solde = `60% à la mise en production (${soldeAmount.toLocaleString('fr-FR')} €)`;
  devisData.conditions.delai = '8 à 12 semaines';
} else if (totalTTC >= 50000) {
  devisData.conditions.acompte = '35% à la commande';
  devisData.conditions.solde = '65% à la livraison';
  devisData.conditions.delai = '6 à 8 semaines';
} else {
  devisData.conditions.acompte = '30% à la commande';
  devisData.conditions.solde = '70% à la livraison';
  devisData.conditions.delai = '4 à 6 semaines';
}

// Génération du HTML
const generateHTML = () => {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <style>
    @page {
      size: A4;
      margin: 20mm;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 40px;
      border-bottom: 3px solid #7c3aed;
      padding-bottom: 20px;
    }

    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #7c3aed;
      margin: 0;
    }

    .subtitle {
      font-size: 14px;
      color: #666;
      margin-top: 5px;
    }

    .devis-info {
      text-align: right;
      font-size: 14px;
    }

    .devis-info h1 {
      color: #7c3aed;
      margin: 0 0 10px 0;
      font-size: 28px;
    }

    .contacts {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      gap: 40px;
    }

    .contact-box {
      flex: 1;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .contact-box h3 {
      margin-top: 0;
      color: #7c3aed;
      font-size: 16px;
      border-bottom: 2px solid #7c3aed;
      padding-bottom: 8px;
      margin-bottom: 12px;
    }

    .contact-box p {
      margin: 5px 0;
      font-size: 14px;
    }

    .prestations {
      margin-bottom: 30px;
    }

    .prestation {
      margin-bottom: 30px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
      background: #fff;
    }

    .prestation-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 12px;
    }

    .prestation-title {
      flex: 1;
      font-weight: bold;
      font-size: 16px;
      color: #1f2937;
    }

    .prestation-price {
      font-size: 18px;
      font-weight: bold;
      color: #7c3aed;
      white-space: nowrap;
      margin-left: 20px;
    }

    .prestation-description {
      color: #666;
      font-size: 14px;
      margin-bottom: 12px;
      font-style: italic;
    }

    .prestation-details {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .prestation-details li {
      padding: 6px 0 6px 24px;
      position: relative;
      font-size: 13px;
      color: #4b5563;
    }

    .prestation-details li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #10b981;
      font-weight: bold;
    }

    .options-incluses {
      background: #f0fdf4;
      border: 1px solid #86efac;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 30px;
    }

    .options-incluses h3 {
      color: #16a34a;
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 16px;
    }

    .options-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .options-list li {
      padding-left: 24px;
      position: relative;
      font-size: 13px;
      color: #166534;
    }

    .options-list li:before {
      content: "🎁";
      position: absolute;
      left: 0;
    }

    .totaux {
      margin-top: 30px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .total-line {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      font-size: 16px;
    }

    .total-line.final {
      border-top: 3px solid #7c3aed;
      margin-top: 10px;
      padding-top: 15px;
      font-size: 22px;
      font-weight: bold;
      color: #7c3aed;
    }

    .conditions {
      margin-top: 40px;
      padding: 20px;
      background: #fef3c7;
      border: 1px solid #fbbf24;
      border-radius: 8px;
    }

    .conditions h3 {
      color: #92400e;
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 16px;
    }

    .conditions-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }

    .condition-item {
      font-size: 13px;
    }

    .condition-label {
      font-weight: bold;
      color: #92400e;
    }

    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      font-size: 12px;
      color: #666;
    }

    .signature-box {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      gap: 40px;
    }

    .signature {
      flex: 1;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
      min-height: 100px;
    }

    .signature-title {
      font-weight: bold;
      color: #7c3aed;
      margin-bottom: 10px;
      font-size: 14px;
    }

    .signature-subtitle {
      font-size: 12px;
      color: #666;
      margin-bottom: 40px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="logo">VelocitAI</h1>
      <p class="subtitle">Automatisation & Solutions Digitales</p>
    </div>
    <div class="devis-info">
      <h1>DEVIS</h1>
      <p><strong>N° ${devisData.numero}</strong></p>
      <p>Date : ${devisData.date}</p>
      <p>Valable jusqu'au : ${devisData.validite}</p>
    </div>
  </div>

  <div class="contacts">
    <div class="contact-box">
      <h3>VelocitAI</h3>
      <p><strong>${devisData.entreprise.nom}</strong></p>
      <p>${devisData.entreprise.adresse}</p>
      <p>Email : ${devisData.entreprise.email}</p>
      <p>Tél : ${devisData.entreprise.telephone}</p>
      <p>SIREN : ${devisData.entreprise.siren}</p>
    </div>

    <div class="contact-box">
      <h3>Client</h3>
      <p><strong>${devisData.client.nom}</strong></p>
      ${devisData.client.adresse ? `<p>${devisData.client.adresse}</p>` : ''}
      ${devisData.client.email ? `<p>Email : ${devisData.client.email}</p>` : ''}
      ${devisData.client.telephone ? `<p>Tél : ${devisData.client.telephone}</p>` : ''}
    </div>
  </div>

  <div class="prestations">
    ${devisData.prestations.map(p => `
      <div class="prestation">
        <div class="prestation-header">
          <div class="prestation-title">${p.titre}</div>
          <div class="prestation-price">${p.total.toLocaleString('fr-FR')} €</div>
        </div>
        <p class="prestation-description">${p.description}</p>
        ${p.details && p.details.length > 0 ? `
          <ul class="prestation-details">
            ${p.details.map(d => `<li>${d}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `).join('')}
  </div>

  ${devisData.optionsIncluses && devisData.optionsIncluses.length > 0 ? `
    <div class="options-incluses">
      <h3>✨ Options Incluses (Sans Supplément)</h3>
      <ul class="options-list">
        ${devisData.optionsIncluses.map(opt => `<li>${opt}</li>`).join('')}
      </ul>
    </div>
  ` : ''}

  <div class="totaux">
    <div class="total-line">
      <span>Sous-total HT</span>
      <span>${sousTotal.toLocaleString('fr-FR')} €</span>
    </div>
    <div class="total-line final">
      <span>TOTAL TTC</span>
      <span>${totalTTC.toLocaleString('fr-FR')} €</span>
    </div>
  </div>

  <div class="conditions">
    <h3>📋 Conditions de Règlement & Délais</h3>
    <div class="conditions-grid">
      <div class="condition-item">
        <span class="condition-label">Acompte :</span> ${devisData.conditions.acompte}
      </div>
      <div class="condition-item">
        <span class="condition-label">Solde :</span> ${devisData.conditions.solde}
      </div>
      <div class="condition-item">
        <span class="condition-label">Délai de réalisation :</span> ${devisData.conditions.delai}
      </div>
      <div class="condition-item">
        <span class="condition-label">Validité du devis :</span> ${devisData.conditions.validite}
      </div>
    </div>
  </div>

  <div class="signature-box">
    <div class="signature">
      <div class="signature-title">Pour VelocitAI</div>
      <div class="signature-subtitle">Date et signature</div>
    </div>
    <div class="signature">
      <div class="signature-title">Pour le Client</div>
      <div class="signature-subtitle">Bon pour accord<br>Date et signature précédées de la mention "Lu et approuvé"</div>
    </div>
  </div>

  <div class="footer">
    <p><strong>VelocitAI</strong> - Automatisation & Solutions Digitales</p>
    <p>${devisData.entreprise.email} | ${devisData.entreprise.telephone}</p>
    <p>SIREN: ${devisData.entreprise.siren}</p>
    <p>Ce devis est valable ${devisData.conditions.validite} à compter de sa date d'émission</p>
  </div>
</body>
</html>
  `;
};

// Génération du PDF
(async () => {
  const outputDir = path.join(__dirname, '..', 'devis');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const pdfPath = path.join(outputDir, `devis-${devisData.numero}.pdf`);

  console.log('🚀 Génération du PDF en cours...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(generateHTML(), { waitUntil: 'networkidle0' });

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20mm',
      right: '15mm',
      bottom: '20mm',
      left: '15mm'
    }
  });

  await browser.close();

  console.log('✅ Devis PDF généré avec succès !');
  console.log(`📄 Fichier : ${pdfPath}`);
  console.log('\n📋 Informations du devis :');
  console.log(`   Numéro : ${devisData.numero}`);
  console.log(`   Client : ${devisData.client.nom}`);
  console.log(`   Montant : ${totalTTC.toLocaleString('fr-FR')} €`);
  console.log(`   Date : ${devisData.date}`);
  console.log(`   Validité : ${devisData.validite}`);
})();
