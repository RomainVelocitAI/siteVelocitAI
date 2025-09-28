import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Solutions',
      links: [
        { name: 'Calculateur ROI', url: '/#calculateur' },
        { name: 'Nos Solutions IA', url: '/#solutions' },
        { name: 'Méthodologie', url: '/#methodologie' },
        { name: 'Avant/Après', url: '/#avant-apres' }
      ]
    },
    {
      title: 'Ressources',
      links: [
        { name: 'Blog', url: '/#blog' },
        { name: 'FAQ', url: '/#faq' },
        { name: 'Témoignages', url: '/#temoignages' },
        { name: 'Contact', url: '/#contact' }
      ]
    },
    {
      title: 'Entreprise',
      links: [
        { name: 'Pourquoi Automatiser', url: '/#pourquoi' },
        { name: 'Mentions légales', url: '/mentions-legales' },
        { name: 'CGV', url: '/cgv' },
        { name: 'Politique de confidentialité', url: '/politique-confidentialite' }
      ]
    },
    {
      title: 'Suivez-nous',
      links: [
        {
          name: 'Facebook',
          url: 'https://www.facebook.com/profile.php?id=100089911241589',
          icon: (
            <svg className="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          )
        },
        {
          name: 'Instagram',
          url: 'https://www.instagram.com/velocit_ai/',
          icon: (
            <svg className="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.415-2.427.465-1.067.048-1.407.06-4.123.06h-.16c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          )
        }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-lg mr-3">
                ∞
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                VelocitAI
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Expert en automatisation d'entreprise à La Réunion.
              Solutions IA sur mesure pour doubler votre productivité.
            </p>
            <div className="space-y-1">
              <p className="text-gray-400 text-sm">
                📍 77b Rue Adrien Lagourgue
              </p>
              <p className="text-gray-400 text-sm">
                97424 Piton Saint Leu
              </p>
              <p className="text-gray-400 text-sm">
                📧 direction@velocit-ai.fr
              </p>
              <p className="text-gray-400 text-sm">
                📱 +262 693 11 15 38
              </p>
            </div>
          </div>

          {/* Sections de liens */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 text-white">{section.title}</h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    {link.url.startsWith('http') ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors flex items-center"
                      >
                        {'icon' in link && link.icon}
                        {link.name}
                      </a>
                    ) : link.url.startsWith('/#') ? (
                      <a
                        href={link.url}
                        className="text-gray-400 hover:text-white transition-colors block"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link href={link.url}>
                        <span className="text-gray-400 hover:text-white transition-colors cursor-pointer block">
                          {link.name}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Liens légaux et copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} VelocitAI. Tous droits réservés.
            </p>

            {/* Liens légaux secondaires */}
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
              <Link href="/politique-confidentialite">
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Politique de confidentialité
                </span>
              </Link>
            </div>
          </div>

          {/* SEO Keywords */}
          <p className="text-gray-500 text-xs text-center mt-4">
            Automatisation entreprise La Réunion | Agents IA | Chatbots intelligents | Solutions sur mesure | ROI garanti
          </p>
        </div>
      </div>
    </footer>
  );
}