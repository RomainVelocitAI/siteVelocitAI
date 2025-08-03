import { useState } from 'react';
import dynamic from 'next/dynamic';
import { SparklesIcon, StarIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

// Dynamic imports
const OriginalTestimonialsSection = dynamic(() => import('./TestimonialsSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const PremiumTestimonialsSection = dynamic(() => import('./PremiumTestimonialsSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const LuxuryTestimonialsSection = dynamic(() => import('./LuxuryTestimonialsSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

type SectionType = 'original' | 'premium' | 'luxury';

interface SectionInfo {
  id: SectionType;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const sections: SectionInfo[] = [
  {
    id: 'original',
    name: 'Original',
    description: 'Design simple et efficace',
    icon: AdjustmentsHorizontalIcon,
    color: 'from-gray-500 to-gray-600'
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Design sophistiqué avec glassmorphism',
    icon: SparklesIcon,
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Design noir élégant et moderne',
    icon: StarIcon,
    color: 'from-purple-600 to-pink-600'
  }
];

const TestimonialsSectionShowcase = () => {
  const [selectedSection, setSelectedSection] = useState<SectionType>('premium');

  const renderSection = () => {
    switch (selectedSection) {
      case 'original':
        return <OriginalTestimonialsSection />;
      case 'premium':
        return <PremiumTestimonialsSection />;
      case 'luxury':
        return <LuxuryTestimonialsSection />;
      default:
        return <PremiumTestimonialsSection />;
    }
  };

  return (
    <div>
      {/* Selector */}
      <div className="bg-gray-50 py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Choisissez votre style de témoignages</h3>
            <p className="text-gray-600 mt-2">Sélectionnez le design qui correspond le mieux à votre marque</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sections.map((section) => {
              const Icon = section.icon;
              const isSelected = selectedSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`relative p-6 rounded-xl transition-all duration-300 ${
                    isSelected 
                      ? 'bg-white shadow-xl scale-105 border-2 border-violet-500' 
                      : 'bg-white shadow-md hover:shadow-lg border-2 border-transparent'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
                        Actif
                      </span>
                    </div>
                  )}
                  
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${section.color} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{section.name}</h4>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Section */}
      <div className="relative">
        {renderSection()}
      </div>
    </div>
  );
};

export default TestimonialsSectionShowcase;