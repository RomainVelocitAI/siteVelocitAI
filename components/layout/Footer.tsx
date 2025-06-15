import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: 'Services',
      links: [
        'Automatisation des tâches répétitives',
        'Création de chatbots',
        'Optimisation des processus',
        'Intégration de systèmes'
      ]
    },
    {
      title: 'Secteurs',
      links: [
        'Commerce et E-commerce',
        'Services et Conseil',
        'Santé et Bien-être',
        'Industrie et Logistique'
      ]
    },
    {
      title: 'Suivez-nous',
      links: [
        'Instagram',
        'Facebook'
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div>
            <h3 className="font-semibold mb-4">Velocit.AI</h3>
            <p className="text-gray-400 text-sm mb-4">
              Expert en automatisation d'entreprise à La Réunion. 
              Automatisez vos tâches répétitives et créez des chatbots intelligents.
            </p>
            <p className="text-gray-400 text-sm">
              Le Tampon, La Réunion<br />
              📧 contact@velocit-ai.fr
            </p>
          </div>

          {/* Liens des sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {section.links.map((link, idx) => (
                  <li key={idx} className="hover:text-white transition-colors">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Velocit.AI. Tous droits réservés. | 
            Automatisation entreprise La Réunion | Chatbot intelligent | Gain de temps
          </p>
        </div>
      </div>
    </footer>
  );
}
