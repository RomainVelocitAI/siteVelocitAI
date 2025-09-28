import { NextPage } from 'next'
import SEO from '../components/seo/Seo'

const PolitiqueConfidentialite: NextPage = () => {
  return (
    <>
      <SEO
        title="Politique de Confidentialité | VelocitAI"
        description="Politique de confidentialité et protection des données personnelles de VelocitAI"
      />
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Politique de Confidentialité
            </h1>

            <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Introduction</h2>
                <p className="text-gray-600">
                  VelocitAI s'engage à protéger la vie privée et les données personnelles de ses utilisateurs et clients.
                  Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons
                  vos informations personnelles conformément au Règlement Général sur la Protection des Données (RGPD)
                  et à la loi Informatique et Libertés.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Responsable du traitement</h2>
                <div className="space-y-2 text-gray-600">
                  <p><strong className="text-gray-900">Entreprise :</strong> VelocitAI</p>
                  <p><strong className="text-gray-900">Représentant :</strong> Romain CANO</p>
                  <p><strong className="text-gray-900">Adresse :</strong> 77b Rue Adrien Lagourgue, 97424 Piton Saint Leu, La Réunion</p>
                  <p><strong className="text-gray-900">Email :</strong> direction@velocit-ai.fr</p>
                  <p><strong className="text-gray-900">Téléphone :</strong> +262 693 11 15 38</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Données collectées</h2>
                <div className="space-y-4 text-gray-600">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">3.1 Données collectées directement</h3>
                    <p>Lors de votre interaction avec nos services, nous pouvons collecter :</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Nom, prénom et civilité</li>
                      <li>Adresse email professionnelle</li>
                      <li>Numéro de téléphone professionnel</li>
                      <li>Nom de l'entreprise et fonction</li>
                      <li>Adresse postale professionnelle</li>
                      <li>Données relatives à votre projet (besoins, contraintes, budget)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">3.2 Données collectées automatiquement</h3>
                    <p>Lors de votre navigation sur notre site, nous collectons :</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Adresse IP</li>
                      <li>Type de navigateur et système d'exploitation</li>
                      <li>Pages visitées et durée de visite</li>
                      <li>Source de trafic (site référent)</li>
                      <li>Données de géolocalisation approximative</li>
                      <li>Interactions avec le calculateur de ROI</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Finalités du traitement</h2>
                <div className="space-y-3 text-gray-600">
                  <p>Vos données personnelles sont collectées et traitées pour les finalités suivantes :</p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li><strong className="text-gray-900">Gestion de la relation client :</strong> Répondre à vos demandes, établir des devis, assurer le suivi commercial</li>
                    <li><strong className="text-gray-900">Exécution des prestations :</strong> Réaliser les services commandés et assurer le support technique</li>
                    <li><strong className="text-gray-900">Communication :</strong> Vous informer sur nos services et actualités (avec votre consentement)</li>
                    <li><strong className="text-gray-900">Amélioration des services :</strong> Analyser l'utilisation du site pour optimiser l'expérience utilisateur</li>
                    <li><strong className="text-gray-900">Obligations légales :</strong> Respecter nos obligations comptables et fiscales</li>
                    <li><strong className="text-gray-900">Sécurité :</strong> Prévenir les fraudes et assurer la sécurité du site</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Base légale du traitement</h2>
                <div className="space-y-3 text-gray-600">
                  <p>Le traitement de vos données personnelles est fondé sur :</p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li><strong className="text-gray-900">L'exécution contractuelle :</strong> Pour traiter vos demandes et exécuter nos prestations</li>
                    <li><strong className="text-gray-900">Le consentement :</strong> Pour l'envoi de communications marketing et l'utilisation de cookies</li>
                    <li><strong className="text-gray-900">L'intérêt légitime :</strong> Pour améliorer nos services et assurer la sécurité du site</li>
                    <li><strong className="text-gray-900">L'obligation légale :</strong> Pour respecter nos obligations comptables et fiscales</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Destinataires des données</h2>
                <div className="space-y-3 text-gray-600">
                  <p>Vos données peuvent être partagées avec :</p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li><strong className="text-gray-900">Nos équipes internes :</strong> Personnel autorisé de VelocitAI</li>
                    <li><strong className="text-gray-900">Prestataires techniques :</strong> Hébergeur (Netlify), services cloud, outils d'analyse</li>
                    <li><strong className="text-gray-900">Partenaires commerciaux :</strong> Uniquement avec votre consentement explicite</li>
                    <li><strong className="text-gray-900">Autorités légales :</strong> En cas de demande légale ou judiciaire</li>
                  </ul>
                  <p className="mt-3">
                    Nous nous assurons que tous nos prestataires respectent des standards de sécurité équivalents aux nôtres
                    et s'engagent contractuellement à protéger vos données.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Transfert de données hors UE</h2>
                <p className="text-gray-600">
                  Certains de nos prestataires (comme Google Analytics) peuvent transférer des données aux États-Unis.
                  Ces transferts sont encadrés par des clauses contractuelles types approuvées par la Commission Européenne
                  ou sont effectués vers des pays reconnus comme offrant un niveau de protection adéquat.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Durée de conservation</h2>
                <div className="space-y-3 text-gray-600">
                  <ul className="list-disc ml-6 space-y-2">
                    <li><strong className="text-gray-900">Données clients :</strong> Pendant toute la durée de la relation commerciale + 3 ans</li>
                    <li><strong className="text-gray-900">Données prospects :</strong> 3 ans à compter du dernier contact</li>
                    <li><strong className="text-gray-900">Données comptables :</strong> 10 ans conformément aux obligations légales</li>
                    <li><strong className="text-gray-900">Cookies et données de navigation :</strong> 13 mois maximum</li>
                    <li><strong className="text-gray-900">Données de connexion :</strong> 1 an conformément à la réglementation</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Vos droits</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :</p>

                  <div className="bg-purple-50 p-4 rounded-lg space-y-3">
                    <p><strong className="text-purple-900">Droit d'accès :</strong> Obtenir la confirmation que vos données sont traitées et en recevoir une copie</p>
                    <p><strong className="text-purple-900">Droit de rectification :</strong> Corriger vos données si elles sont inexactes ou incomplètes</p>
                    <p><strong className="text-purple-900">Droit à l'effacement :</strong> Demander la suppression de vos données dans certains cas</p>
                    <p><strong className="text-purple-900">Droit à la limitation :</strong> Limiter le traitement de vos données dans certaines situations</p>
                    <p><strong className="text-purple-900">Droit à la portabilité :</strong> Recevoir vos données dans un format structuré et lisible</p>
                    <p><strong className="text-purple-900">Droit d'opposition :</strong> Vous opposer au traitement de vos données pour des raisons légitimes</p>
                    <p><strong className="text-purple-900">Droit de retrait du consentement :</strong> Retirer votre consentement à tout moment</p>
                  </div>

                  <p className="mt-4">
                    Pour exercer ces droits, contactez-nous à : <strong>direction@velocit-ai.fr</strong>
                  </p>
                  <p>
                    Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (Commission Nationale
                    de l'Informatique et des Libertés) : www.cnil.fr
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">10. Sécurité des données</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    VelocitAI met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Chiffrement SSL/TLS pour toutes les transmissions de données</li>
                    <li>Accès restreint aux données personnelles</li>
                    <li>Mots de passe forts et authentification sécurisée</li>
                    <li>Sauvegardes régulières et sécurisées</li>
                    <li>Mise à jour régulière des systèmes de sécurité</li>
                    <li>Formation du personnel à la protection des données</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">11. Cookies et technologies similaires</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Notre site utilise des cookies pour améliorer votre expérience et analyser l'utilisation du site.</p>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Types de cookies utilisés :</h3>
                    <ul className="list-disc ml-6 space-y-2">
                      <li><strong className="text-gray-900">Cookies essentiels :</strong> Nécessaires au fonctionnement du site</li>
                      <li><strong className="text-gray-900">Cookies analytiques :</strong> Google Analytics pour comprendre l'utilisation du site</li>
                      <li><strong className="text-gray-900">Cookies de préférences :</strong> Pour mémoriser vos choix et personnaliser votre expérience</li>
                    </ul>
                  </div>

                  <p className="mt-3">
                    Vous pouvez gérer vos préférences cookies via la bannière de consentement ou les paramètres de votre navigateur.
                    Le refus des cookies peut affecter certaines fonctionnalités du site.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">12. Mineurs</h2>
                <p className="text-gray-600">
                  Notre site et nos services s'adressent exclusivement aux professionnels et aux personnes majeures.
                  Nous ne collectons pas sciemment de données personnelles de mineurs de moins de 18 ans.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">13. Modifications de la politique</h2>
                <p className="text-gray-600">
                  Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
                  Les modifications seront publiées sur cette page avec une date de mise à jour.
                  Nous vous encourageons à consulter régulièrement cette politique pour rester informé.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">14. Contact</h2>
                <div className="space-y-2 text-gray-600">
                  <p>Pour toute question concernant cette politique de confidentialité ou vos données personnelles :</p>
                  <div className="bg-blue-50 p-4 rounded-lg mt-3">
                    <p><strong className="text-blue-900">Email :</strong> direction@velocit-ai.fr</p>
                    <p><strong className="text-blue-900">Téléphone :</strong> +262 693 11 15 38</p>
                    <p><strong className="text-blue-900">Adresse :</strong> 77b Rue Adrien Lagourgue, 97424 Piton Saint Leu, La Réunion</p>
                  </div>
                </div>
              </section>

              <section className="pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  <strong className="text-gray-900">Date de dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-gray-600 mt-2">
                  <strong className="text-gray-900">Version :</strong> 1.0
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default PolitiqueConfidentialite