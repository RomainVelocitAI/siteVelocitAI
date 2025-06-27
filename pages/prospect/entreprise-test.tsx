import { NextPage } from 'next';
import Head from 'next/head';

interface ProspectLandingProps {
  prospectName: string;
  companyName: string;
  email: string;
  phone: string;
  // Ajoutez d'autres champs personnalisables ici
}

const ProspectLanding: NextPage<ProspectLandingProps> = ({
  prospectName,
  companyName,
  email,
  phone,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Head>
        <title>Offre Spéciale pour {companyName} | VelocitAI</title>
        <meta name="description" content={`Solution sur mesure pour ${companyName}`} />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Bonjour {prospectName} !
          </h1>
          <p className="text-xl text-gray-600">
            Découvrez notre offre exclusive pour {companyName}
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Votre Solution sur Mesure
              </h2>
              <p className="text-gray-600 mb-6">
                Nous avons préparé une offre personnalisée pour répondre aux besoins spécifiques de {companyName}.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Contact</h3>
                  <p className="text-blue-600">{email}</p>
                  <p className="text-blue-600">{phone}</p>
                </div>
                
                <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Découvrir l'offre
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProspectLanding;
