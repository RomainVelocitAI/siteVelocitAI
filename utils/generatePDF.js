const PDFDocument = require('pdfkit');

/**
 * Génère un PDF professionnel pour un devis
 * @param {Object} devisData - Données du devis
 * @returns {Buffer} - Buffer du PDF généré
 */
function generateDevisPDF(devisData) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];
      
      // Collecter les chunks du PDF
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      // Couleurs VelocitAI
      const primaryColor = '#7C3AED';
      const grayColor = '#6B7280';
      const darkColor = '#1F2937';

      // En-tête avec logo
      doc.fontSize(28)
         .fillColor(primaryColor)
         .text('VelocitAI', 50, 50);
      
      doc.fontSize(12)
         .fillColor(grayColor)
         .text('Automatisation d\'entreprise • Le Tampon, La Réunion', 50, 85);

      // Ligne de séparation
      doc.moveTo(50, 110)
         .lineTo(550, 110)
         .strokeColor(primaryColor)
         .lineWidth(3)
         .stroke();

      // Titre du devis
      doc.fontSize(20)
         .fillColor(darkColor)
         .text(`DEVIS - ${devisData.entreprise.toUpperCase()}`, 50, 130);

      // Statut
      doc.fontSize(10)
         .fillColor('#1E40AF')
         .text(`Statut: ${devisData.statut}`, 450, 135);

      // Informations client
      let yPos = 170;
      doc.fontSize(14)
         .fillColor(primaryColor)
         .text('INFORMATIONS CLIENT', 50, yPos);

      yPos += 25;
      doc.fontSize(10)
         .fillColor(darkColor)
         .text(`Nom: ${devisData.nom}`, 50, yPos)
         .text(`Entreprise: ${devisData.entreprise}`, 50, yPos + 15)
         .text(`Email: ${devisData.email}`, 50, yPos + 30)
         .text(`Téléphone: ${devisData.telephone || 'Non renseigné'}`, 50, yPos + 45)
         .text(`Date: ${new Date(devisData.dateCreation).toLocaleDateString('fr-FR')}`, 300, yPos)
         .text(`N° Devis: ${devisData.numeroDevis}`, 300, yPos + 15);

      // Cadre autour des infos client
      doc.rect(45, yPos - 5, 505, 70)
         .strokeColor('#E5E7EB')
         .stroke();

      // Détails du devis
      yPos += 90;
      doc.fontSize(14)
         .fillColor(primaryColor)
         .text('DÉTAILS DU DEVIS', 50, yPos);

      yPos += 25;
      
      // Parser et afficher les services
      const services = parseServices(devisData.devisDetaille);
      services.forEach((service, index) => {
        // Nom du service
        doc.fontSize(12)
           .fillColor(darkColor)
           .text(`${index + 1}. ${service.nom}`, 50, yPos);
        
        yPos += 20;
        
        // Description
        if (service.description) {
          doc.fontSize(9)
             .fillColor(grayColor)
             .text(service.description, 70, yPos, { width: 400 });
          yPos += service.description.split('\n').length * 12;
        }
        
        // Prix
        doc.fontSize(10)
           .fillColor(darkColor)
           .text(`Quantité: ${service.quantite}`, 70, yPos)
           .text(`Prix unitaire: ${service.prixUnitaire}€${service.isMonthly ? '/mois' : ''}`, 200, yPos)
           .text(`Total: ${service.total}€${service.isMonthly ? '/mois' : ''}`, 350, yPos);
        
        yPos += 30;
      });

      // Validité
      yPos += 10;
      doc.fontSize(10)
         .fillColor('#92400E')
         .rect(45, yPos - 5, 505, 25)
         .fillAndStroke('#FEF3C7', '#F59E0B')
         .fillColor('#92400E')
         .text('Validité du devis: 30 jours à compter de la date de création', 50, yPos + 5);

      // Récapitulatif financier
      yPos += 50;
      doc.fontSize(14)
         .fillColor(primaryColor)
         .text('RÉCAPITULATIF FINANCIER', 50, yPos);

      yPos += 25;
      const isMonthly = devisData.devisDetaille.includes('/mois');
      
      doc.fontSize(11)
         .fillColor(darkColor)
         .text(`Total HT:`, 50, yPos)
         .text(`${devisData.totalHT.toLocaleString('fr-FR')}€${isMonthly ? '/mois' : ''}`, 450, yPos)
         .text(`TVA (0%):`, 50, yPos + 20)
         .text(`0€`, 450, yPos + 20);

      // Ligne de séparation
      doc.moveTo(50, yPos + 40)
         .lineTo(550, yPos + 40)
         .strokeColor(primaryColor)
         .lineWidth(2)
         .stroke();

      // Total final
      doc.fontSize(14)
         .fillColor(primaryColor)
         .text(`Total TTC:`, 50, yPos + 50)
         .text(`${devisData.totalHT.toLocaleString('fr-FR')}€${isMonthly ? '/mois' : ''}`, 450, yPos + 50);

      // Notes si présentes
      if (devisData.notes) {
        yPos += 90;
        doc.fontSize(12)
           .fillColor(primaryColor)
           .text('NOTES', 50, yPos);
        
        yPos += 20;
        doc.fontSize(10)
           .fillColor(darkColor)
           .text(devisData.notes, 50, yPos, { width: 500 });
      }

      // Footer
      const footerY = 750;
      doc.moveTo(50, footerY - 20)
         .lineTo(550, footerY - 20)
         .strokeColor('#E5E7EB')
         .lineWidth(1)
         .stroke();

      doc.fontSize(9)
         .fillColor(grayColor)
         .text('VelocitAI - Automatisation d\'entreprise', 50, footerY, { align: 'center' })
         .text('📍 Le Tampon, La Réunion • 📧 contact@velocit-ai.fr • 🌐 velocit-ai.fr', 50, footerY + 12, { align: 'center' })
         .text('Devis généré automatiquement • Mentions légales disponibles sur velocit-ai.fr', 50, footerY + 24, { align: 'center' });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Parse les services depuis le texte du devis
 */
function parseServices(devisText) {
  const services = [];
  const lines = devisText.split('\n');
  let currentService = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Nouveau service
    const serviceMatch = trimmed.match(/^(\d+)\.\s*(.+)/);
    if (serviceMatch) {
      if (currentService) services.push(currentService);
      currentService = {
        nom: serviceMatch[2],
        description: '',
        quantite: 1,
        prixUnitaire: 0,
        total: 0,
        isMonthly: serviceMatch[2].includes('/mois')
      };
      continue;
    }
    
    if (!currentService) continue;
    
    // Description
    if (trimmed.startsWith('-')) {
      currentService.description += (currentService.description ? '\n' : '') + trimmed;
    }
    
    // Prix
    const prixMatch = trimmed.match(/Prix unitaire:\s*(\d+(?:\s?\d{3})*(?:,\d{2})?)€/);
    if (prixMatch) {
      currentService.prixUnitaire = parseFloat(prixMatch[1].replace(/\s/g, '').replace(',', '.'));
    }
    
    const totalMatch = trimmed.match(/Total:\s*(\d+(?:\s?\d{3})*(?:,\d{2})?)€/);
    if (totalMatch) {
      currentService.total = parseFloat(totalMatch[1].replace(/\s/g, '').replace(',', '.'));
    }
    
    const quantiteMatch = trimmed.match(/Quantité:\s*(\d+)/);
    if (quantiteMatch) {
      currentService.quantite = parseInt(quantiteMatch[1]);
    }
  }
  
  if (currentService) services.push(currentService);
  
  return services.length > 0 ? services : [{
    nom: 'Prestation personnalisée',
    description: 'Service sur mesure selon vos besoins',
    quantite: 1,
    prixUnitaire: 0,
    total: 0,
    isMonthly: false
  }];
}

module.exports = { generateDevisPDF };