import { NextPage } from 'next'
import SEO from '../components/seo/Seo'

const MentionsLegales: NextPage = () => {
  return (
    <>
      <SEO
        title="Mentions Légales | VelocitAI"
        description="Mentions légales du site VelocitAI, agence d'automatisation IA à La Réunion"
      />
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Mentions Légales
            </h1>

            <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Éditeur du site</h2>
                <div className="space-y-2 text-gray-600">
                  <p><strong className="text-gray-900">Raison sociale :</strong> VelocitAI</p>
                  <p><strong className="text-gray-900">Représentant légal :</strong> Romain CANO</p>
                  <p><strong className="text-gray-900">Adresse :</strong> 77b Rue Adrien Lagourgue, 97424 Piton Saint Leu, La Réunion</p>
                  <p><strong className="text-gray-900">SIREN :</strong> 809 538 473</p>
                  <p><strong className="text-gray-900">Email :</strong> direction@velocit-ai.fr</p>
                  <p><strong className="text-gray-900">Téléphone :</strong> +262 693 11 15 38</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Directeur de publication</h2>
                <p className="text-gray-600">Romain CANO - direction@velocit-ai.fr</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Hébergement</h2>
                <div className="space-y-2 text-gray-600">
                  <p><strong className="text-gray-900">Hébergeur :</strong> Netlify, Inc.</p>
                  <p><strong className="text-gray-900">Adresse :</strong> 2325 3rd Street, Suite 296, San Francisco, California 94107, USA</p>
                  <p><strong className="text-gray-900">Site web :</strong> https://www.netlify.com</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Propriété intellectuelle</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
                    Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                  </p>
                  <p>
                    La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de publication.
                  </p>
                  <p>
                    Les marques citées sur ce site sont déposées par les sociétés qui en sont propriétaires.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Protection des données personnelles</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés,
                    vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles.
                  </p>
                  <p>
                    Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : direction@velocit-ai.fr
                  </p>
                  <p>
                    Pour plus d'informations sur la gestion de vos données personnelles, consultez notre{' '}
                    <a href="/politique-confidentialite" className="text-purple-600 hover:text-purple-700 underline">
                      Politique de Confidentialité
                    </a>.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Cookies</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic.
                    Les cookies sont de petits fichiers texte stockés sur votre appareil lors de votre visite.
                  </p>
                  <p>
                    Vous pouvez configurer votre navigateur pour refuser les cookies ou être alerté lorsqu'un cookie est envoyé.
                    Cependant, certaines parties du site peuvent ne pas fonctionner correctement sans cookies.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Limitation de responsabilité</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour,
                    mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
                  </p>
                  <p>
                    VelocitAI ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur,
                    lors de l'accès au site www.velocit-ai.fr, et résultant soit de l'utilisation d'un matériel ne répondant pas aux
                    spécifications, soit de l'apparition d'un bug ou d'une incompatibilité.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Droit applicable et juridiction</h2>
                <p className="text-gray-600">
                  Tout litige en relation avec l'utilisation du site www.velocit-ai.fr est soumis au droit français.
                  Il est fait attribution exclusive de juridiction aux tribunaux compétents de Saint-Denis de La Réunion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Date de mise à jour</h2>
                <p className="text-gray-600">Ces mentions légales ont été mises à jour le {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}.</p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default MentionsLegales