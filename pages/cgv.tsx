import { NextPage } from 'next'
import SEO from '../components/seo/Seo'

const CGV: NextPage = () => {
  return (
    <>
      <SEO
        title="Conditions Générales de Vente | VelocitAI"
        description="Conditions générales de vente des services VelocitAI, agence d'automatisation IA à La Réunion"
      />
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Conditions Générales de Vente
            </h1>

            <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 1 - Objet</h2>
                <p className="text-gray-600">
                  Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre VelocitAI,
                  société immatriculée sous le numéro SIREN 809 538 473, et ses clients professionnels dans le cadre de
                  prestations de services d'automatisation, de développement d'intelligence artificielle et de conseil en transformation digitale.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 2 - Acceptation des conditions</h2>
                <p className="text-gray-600">
                  Le fait de passer commande implique l'adhésion entière et sans réserve du client aux présentes CGV.
                  Toute condition contraire posée par le client sera donc, à défaut d'acceptation expresse, inopposable à VelocitAI.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 3 - Services proposés</h2>
                <div className="space-y-3 text-gray-600">
                  <p>VelocitAI propose les services suivants :</p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Développement de solutions d'automatisation sur mesure</li>
                    <li>Intégration de systèmes d'intelligence artificielle</li>
                    <li>Création de chatbots et d'assistants virtuels</li>
                    <li>Automatisation des processus métiers (RPA)</li>
                    <li>Conseil en transformation digitale</li>
                    <li>Formation et accompagnement</li>
                    <li>Maintenance et support technique</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 4 - Devis et commandes</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    <strong className="text-gray-900">4.1 Établissement du devis :</strong> Chaque projet fait l'objet d'un devis détaillé et personnalisé,
                    établi gratuitement par VelocitAI après analyse des besoins du client.
                  </p>
                  <p>
                    <strong className="text-gray-900">4.2 Durée de validité :</strong> Les devis sont valables pour une durée de 30 jours à compter
                    de leur date d'émission, sauf mention contraire.
                  </p>
                  <p>
                    <strong className="text-gray-900">4.3 Acceptation :</strong> Le devis signé et retourné par le client vaut bon de commande
                    et acceptation des présentes CGV.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 5 - Tarifs et modalités de paiement</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    <strong className="text-gray-900">5.1 Prix :</strong> Les prix sont exprimés en euros et hors taxes. La TVA applicable est celle en vigueur
                    au jour de la facturation.
                  </p>
                  <p>
                    <strong className="text-gray-900">5.2 Modalités de paiement :</strong>
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Acompte de 30% à la signature du devis</li>
                    <li>Paiement échelonné selon l'avancement du projet</li>
                    <li>Solde à la livraison finale</li>
                  </ul>
                  <p>
                    <strong className="text-gray-900">5.3 Moyens de paiement :</strong> Virement bancaire, chèque, ou tout autre moyen convenu entre les parties.
                  </p>
                  <p>
                    <strong className="text-gray-900">5.4 Délai de paiement :</strong> Les factures sont payables à 30 jours fin de mois, sauf accord particulier.
                  </p>
                  <p>
                    <strong className="text-gray-900">5.5 Retard de paiement :</strong> En cas de retard de paiement, des pénalités de retard au taux de 3 fois
                    le taux d'intérêt légal seront appliquées, ainsi qu'une indemnité forfaitaire de 40€ pour frais de recouvrement.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 6 - Délais de livraison</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    Les délais de livraison sont donnés à titre indicatif et ne constituent pas un engagement ferme.
                    VelocitAI s'efforce de respecter les délais convenus mais ne peut être tenu responsable des retards
                    dus à des causes indépendantes de sa volonté.
                  </p>
                  <p>
                    Les délais commencent à courir à réception de l'acompte et de l'ensemble des éléments nécessaires
                    à la réalisation de la prestation.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 7 - Obligations du client</h2>
                <div className="space-y-3 text-gray-600">
                  <p>Le client s'engage à :</p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Fournir toutes les informations nécessaires à la réalisation du projet</li>
                    <li>Collaborer activement avec les équipes de VelocitAI</li>
                    <li>Valider les étapes intermédiaires dans les délais convenus</li>
                    <li>Respecter les conditions d'utilisation des solutions livrées</li>
                    <li>Assurer la maintenance de son infrastructure technique</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 8 - Propriété intellectuelle</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    <strong className="text-gray-900">8.1 Droits de propriété :</strong> Les développements spécifiques réalisés pour le client
                    deviennent sa propriété après paiement intégral de la prestation.
                  </p>
                  <p>
                    <strong className="text-gray-900">8.2 Composants standards :</strong> VelocitAI conserve la propriété intellectuelle de ses
                    composants standards, frameworks et méthodologies.
                  </p>
                  <p>
                    <strong className="text-gray-900">8.3 Licence d'utilisation :</strong> Le client bénéficie d'une licence d'utilisation
                    non exclusive et non cessible des composants standards intégrés dans sa solution.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 9 - Confidentialité</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    Les parties s'engagent à maintenir strictement confidentielles toutes les informations échangées
                    dans le cadre de leur relation commerciale, pendant toute la durée du contrat et pendant 5 ans
                    après sa cessation.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 10 - Garanties et responsabilité</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    <strong className="text-gray-900">10.1 Garantie de conformité :</strong> VelocitAI garantit la conformité des livrables
                    aux spécifications définies dans le cahier des charges validé par le client.
                  </p>
                  <p>
                    <strong className="text-gray-900">10.2 Période de garantie :</strong> Les développements sont garantis pendant 3 mois
                    à compter de la livraison finale, hors évolutions et modifications demandées par le client.
                  </p>
                  <p>
                    <strong className="text-gray-900">10.3 Limitation de responsabilité :</strong> La responsabilité de VelocitAI est limitée
                    au montant total de la prestation. VelocitAI ne saurait être tenu responsable des dommages indirects.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 11 - Maintenance et support</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    <strong className="text-gray-900">11.1 Support technique :</strong> Un support technique est inclus pendant la période
                    de garantie pour les anomalies bloquantes.
                  </p>
                  <p>
                    <strong className="text-gray-900">11.2 Contrat de maintenance :</strong> Au-delà de la période de garantie,
                    un contrat de maintenance peut être souscrit selon les conditions tarifaires en vigueur.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 12 - Résiliation</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    En cas de manquement grave de l'une des parties à ses obligations, l'autre partie peut résilier
                    le contrat de plein droit, après mise en demeure restée infructueuse pendant 15 jours.
                  </p>
                  <p>
                    Les sommes déjà versées pour les prestations réalisées restent acquises à VelocitAI.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 13 - Force majeure</h2>
                <p className="text-gray-600">
                  VelocitAI ne pourra être tenu responsable de l'inexécution de ses obligations en cas de force majeure,
                  notamment en cas de catastrophe naturelle, pandémie, grève, guerre, ou tout événement indépendant de sa volonté.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 14 - Protection des données personnelles</h2>
                <p className="text-gray-600">
                  VelocitAI s'engage à respecter la réglementation en vigueur applicable au traitement de données à caractère personnel,
                  notamment le Règlement Général sur la Protection des Données (RGPD). Pour plus d'informations, consultez notre{' '}
                  <a href="/politique-confidentialite" className="text-purple-600 hover:text-purple-700 underline">
                    Politique de Confidentialité
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 15 - Droit applicable et juridiction</h2>
                <p className="text-gray-600">
                  Les présentes CGV sont régies par le droit français. En cas de litige, une solution amiable sera recherchée.
                  À défaut, les tribunaux de Saint-Denis de La Réunion seront seuls compétents.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Article 16 - Modifications des CGV</h2>
                <p className="text-gray-600">
                  VelocitAI se réserve le droit de modifier les présentes CGV à tout moment. Les CGV applicables sont celles
                  en vigueur à la date de signature du devis.
                </p>
              </section>

              <section className="pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  <strong className="text-gray-900">Date de mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-gray-600 mt-2">
                  <strong className="text-gray-900">Contact :</strong> Pour toute question concernant ces CGV, veuillez nous contacter à direction@velocit-ai.fr
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default CGV