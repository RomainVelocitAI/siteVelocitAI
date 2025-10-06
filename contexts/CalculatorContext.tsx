import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Liste des tâches suggérées
export const SUGGESTED_TASKS = [
  'Gérer mes réseaux sociaux (planifier, publier, répondre aux messages)',
  'Répondre à mes emails (tri automatique, réponses types, suivi)',
  'Créer et envoyer des devis ou factures (génération, envoi, relance)',
  'Relancer mes clients ou prospects (emails, WhatsApp, rappels)',
  'Gérer mes rendez-vous (prise de RDV, rappels automatiques, synchronisation d\'agenda)',
  'Suivre mes commandes ou ventes (notifications, mises à jour client, suivi logistique)',
  'Classer mes documents ou factures (reconnaissance automatique, tri dans Google Drive, Dropbox...)',
  'Mettre à jour mon fichier client (CRM, contacts, statut, notes, suivi)',
  'Suivre l\'activité de mon équipe (heures, tâches, communication interne)',
  'Générer des rapports ou tableaux de bord (ventes, leads, compta, RH, perf...)',
  'Répondre à mes leads automatiquement (qualification, orientation vers une offre, collecte d\'infos)',
  'Faire le lien entre mes outils (ex : Google Sheets + WhatsApp + Airtable + Stripe...)'
];

interface Task {
  id: string;
  name: string;
  timeSpent: number;
  frequency: number;
  employeeCount: number;
  employeeCost: number;
}

interface Forfait {
  id: string;
  nom: string;
  nombreAutomatisations: number;
  prixMensuel: number;
  description: string;
}

interface CalculationResult {
  totalHoursPerYear: number;
  totalWorkDaysPerYear: number;
  totalYearlyCost: number;
  totalMonthlySavings: number;
  totalYearlySavings: number;
  emergencyLevel: number;
  forfaitRecommandation?: {
    forfait: Forfait;
    economieMensuelle: number;
    economieAnnuelle: number;
    roiMensuel: number; // en pourcentage
    tempsRetourInvestissement: number; // en mois
  };
}

interface CalculatorContextType {
  tasks: Task[];
  result: CalculationResult;
  addTask: (taskData?: Partial<Task>) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, field: keyof Task, value: any) => void;
  calculateSavings: () => void;
  generateWhatsAppMessage: () => string;
  generateFormMessage: () => string;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

const FORFAITS: Forfait[] = [
  {
    id: 'declencheur',
    nom: 'Déclencheur',
    nombreAutomatisations: 3,
    prixMensuel: 199,
    description: 'Parfait pour commencer avec les bases de l\'automatisation.'
  },
  {
    id: 'propulseur',
    nom: 'Propulseur',
    nombreAutomatisations: 6,
    prixMensuel: 299,
    description: 'Idéal pour accélérer votre productivité avec plus d\'automatisations.'
  },
  {
    id: 'accelerateur',
    nom: 'Accélérateur',
    nombreAutomatisations: 9,
    prixMensuel: 399,
    description: 'Pour les entreprises en pleine croissance avec des besoins avancés.'
  },
  {
    id: 'velocite',
    nom: 'Vélocité',
    nombreAutomatisations: 12,
    prixMensuel: 499,
    description: 'La solution complète pour une automatisation maximale de vos processus.'
  }
];

// SSR-safe UUID generator (fallback for server-side)
const generateId = (): string => {
  if (typeof window !== 'undefined' && typeof window.crypto?.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback for SSR (simple timestamp-based ID)
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const CalculatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isClient, setIsClient] = useState(false);

  const [result, setResult] = useState<CalculationResult>({
    totalHoursPerYear: 0,
    totalWorkDaysPerYear: 0,
    totalYearlyCost: 0,
    totalMonthlySavings: 0,
    totalYearlySavings: 0,
    emergencyLevel: 0,
  });

  // SSR guard: Only run client-side code after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const addTask = (taskData?: Partial<Task>) => {
    const newTask = {
      id: generateId(), // SSR-safe ID generation
      name: taskData?.name || `Tâche ${tasks.length + 1}`,
      timeSpent: taskData?.timeSpent || 1,
      frequency: taskData?.frequency || 5,
      employeeCount: taskData?.employeeCount || 1,
      employeeCost: taskData?.employeeCost || 15,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const removeTask = (id: string) => {
    if (tasks.length > 1) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const updateTask = (id: string, field: keyof Task, value: any) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, [field]: value } : task
      )
    );
  };

  const calculerForfaitRecommandation = (nbTaches: number, coutAnnuel: number) => {
    // Trier les forfaits par nombre d'automatisations croissant
    const forfaitsTries = [...FORFAITS].sort((a, b) => a.nombreAutomatisations - b.nombreAutomatisations);
    
    // Trouver le forfait le plus adapté (le premier qui peut couvrir le nombre de tâches)
    let forfaitRecommandation = forfaitsTries[forfaitsTries.length - 1]; // Par défaut, le forfait le plus élevé
    
    for (const forfait of forfaitsTries) {
      if (nbTaches <= forfait.nombreAutomatisations) {
        forfaitRecommandation = forfait;
        break;
      }
    }
    
    // Calculer les économies brutes (90% du coût actuel)
    const economieBruteAnnuelle = coutAnnuel * 0.9;
    const economieBruteMensuelle = economieBruteAnnuelle / 12;
    
    // Coût du forfait annuel
    const coutForfaitAnnuel = forfaitRecommandation.prixMensuel * 12;
    
    // Économies réelles après déduction du coût du forfait
    const economieReelleAnnuelle = Math.max(0, economieBruteAnnuelle - coutForfaitAnnuel);
    const economieReelleMensuelle = economieReelleAnnuelle / 12;
    
    // Calcul du ROI mensuel (économies / coût du forfait)
    const roiMensuel = forfaitRecommandation.prixMensuel > 0 
      ? (economieReelleMensuelle / forfaitRecommandation.prixMensuel) * 100 
      : 0;
      
    // Temps de retour sur investissement (en mois)
    const tempsRetourInvestissement = economieReelleMensuelle > 0 
      ? forfaitRecommandation.prixMensuel / economieReelleMensuelle 
      : 0;
    
    return {
      forfait: forfaitRecommandation,
      economieMensuelle: Math.max(0, economieReelleMensuelle),
      economieAnnuelle: Math.max(0, economieReelleAnnuelle),
      roiMensuel: Math.round(roiMensuel * 10) / 10,
      tempsRetourInvestissement: Math.ceil(tempsRetourInvestissement * 10) / 10
    };
  };

  const calculateSavings = () => {
    if (tasks.length === 0) {
      setResult({
        totalHoursPerYear: 0,
        totalWorkDaysPerYear: 0,
        totalYearlyCost: 0,
        totalMonthlySavings: 0,
        totalYearlySavings: 0,
        emergencyLevel: 0,
      });
      return;
    }

    // Calcul des économies annuelles
    const totalHoursPerYear = tasks.reduce(
      (sum, task) => sum + task.timeSpent * task.frequency * 4.33 * 12 * task.employeeCount,
      0
    );

    const totalWorkDaysPerYear = totalHoursPerYear / 8; // En supposant 8h par jour
    
    // Coût annuel actuel
    const totalYearlyCost = tasks.reduce(
      (sum, task) => sum + task.timeSpent * task.frequency * 4.33 * 12 * task.employeeCount * task.employeeCost,
      0
    );

    // Calculer le forfait recommandé et les économies potentielles
    const forfaitRecommandation = calculerForfaitRecommandation(tasks.length, totalYearlyCost);

    // Économies brutes avant déduction du coût du forfait (90% du coût actuel)
    const totalYearlySavingsBrutes = totalYearlyCost * 0.9;
    
    // Économies réelles après déduction du coût du forfait
    const totalYearlySavings = forfaitRecommandation.economieAnnuelle;
    const totalMonthlySavings = forfaitRecommandation.economieMensuelle;

    // Niveau d'urgence basé sur les économies annuelles et le temps passé
    let emergencyLevel = 0;
    
    // Valeurs de référence : 250h ou 3897€ = 25%
    const REF_HOURS = 250;     // 250h = 25%
    const REF_COST = 3897;      // 3897€ = 25%
    
    // Calculer le niveau basé sur le temps (250h = 25%)
    const hoursLevel = Math.min(100, Math.round((totalHoursPerYear / REF_HOURS) * 25));
    
    // Calculer le niveau basé sur le coût (3897€ = 25%)
    const costLevel = Math.min(100, Math.round((totalYearlyCost / REF_COST) * 25));
    
    // Prendre le maximum entre les deux niveaux (temps ou coût)
    emergencyLevel = Math.max(hoursLevel, costLevel);
    
    // Définir les seuils pour les couleurs et messages
    const SEUIL_FAIBLE = 25;    // 0-25%
    const SEUIL_MOYEN = 50;     // 25-50%
    const SEUIL_ELEVE = 75;     // 50-75%
    // Plus de 75% = critique
    
    // S'assurer que le niveau est compris entre 0 et 100
    emergencyLevel = Math.max(0, Math.min(100, emergencyLevel));
    
    // Stocker le niveau d'urgence dans l'état pour utilisation dans l'interface
    // (la logique de couleur et de message est gérée dans le composant)
    
    setResult({
      totalHoursPerYear: Math.round(totalHoursPerYear * 10) / 10,
      totalWorkDaysPerYear: Math.round(totalWorkDaysPerYear * 10) / 10,
      totalYearlyCost: Math.round(totalYearlyCost * 10) / 10,
      totalMonthlySavings: Math.round(totalMonthlySavings * 10) / 10,
      totalYearlySavings: Math.round(totalYearlySavings * 10) / 10,
      emergencyLevel,
      forfaitRecommandation
    });
  };

  const generateWhatsAppMessage = () => {
    const message = `Bonjour, je viens d'analyser ${tasks.length} tâche${tasks.length > 1 ? 's' : ''} que je fais régulièrement :\n\n` +
      tasks.map((task, index) => 
        `- ${task.name} — environ ${task.timeSpent}h/jour, ${task.frequency} jours par semaine, à ${task.employeeCost}€/h`
      ).join('\n\n') +
      `\n\nD'après votre calculateur, j'y consacre environ ${result.totalHoursPerYear} heures par an, soit ${result.totalYearlyCost.toLocaleString('fr-FR')}€ de coût estimé.\n\n` +
      `Est-ce que vous pourriez m'aider à automatiser ça ?`;

    return encodeURIComponent(message);
  };

  const generateFormMessage = () => {
    return `Bonjour,

Je souhaite automatiser ${tasks.length} tâche${tasks.length > 1 ? 's' : ''} récurrente${tasks.length > 1 ? 's' : ''} dans mon entreprise :

` +
    tasks.map((task, index) => 
      `- ${task.name} : ${task.timeSpent}h/jour, ${task.frequency}j/semaine, ${task.employeeCount} personne${task.employeeCount > 1 ? 's' : ''} à ${task.employeeCost}€/h`
    ).join('\n') +
    `\n\nD'après votre calculateur, cela représente :\n` +
    `- ${result.totalHoursPerYear} heures par an\n` +
    `- Un coût annuel de ${result.totalYearlyCost.toLocaleString('fr-FR')}€\n` +
    `- Des économies potentielles de ${result.totalYearlySavings.toLocaleString('fr-FR')}€/an\n\n` +
    `Je suis intéressé(e) par une solution d'automatisation. Pourriez-vous me recontacter pour en discuter ?\n\n` +
    `Cordialement,`;
  };

  // Recalculer les économies à chaque changement de tâches
  React.useEffect(() => {
    calculateSavings();
  }, [tasks]);

  return (
    <CalculatorContext.Provider
      value={{
        tasks,
        result,
        addTask,
        removeTask,
        updateTask,
        calculateSavings,
        generateWhatsAppMessage,
        generateFormMessage,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};