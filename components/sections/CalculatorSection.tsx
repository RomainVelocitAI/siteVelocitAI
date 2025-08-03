import React, { useState } from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { SparklesIcon, ClockIcon, CalendarIcon, UsersIcon } from '@heroicons/react/24/outline';
import { MoneyIcon, RocketIcon, TargetIcon, ChartIcon, LightBulbIcon } from '@/components/ui/Icons';

// Composant Tooltip pour les infobulles explicatives
function Tooltip({ children, content, position = "top" }: { children: React.ReactNode; content: string; position?: string }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div
          className={`absolute z-50 px-6 py-4 text-sm text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-2xl max-w-sm min-w-[280px] transform transition-all duration-300 animate-in fade-in scale-in-95 ${
            position === "top"
              ? "-top-3 left-1/2 -translate-x-1/2 -translate-y-full"
              : position === "bottom"
              ? "-bottom-3 left-1/2 -translate-x-1/2 translate-y-full"
              : position === "left"
              ? "top-1/2 -left-3 -translate-y-1/2 -translate-x-full"
              : "top-1/2 -right-3 -translate-y-1/2 translate-x-full"
          }`}
        >
          {content}
          <div
            className={`absolute w-3 h-3 bg-gradient-to-r from-gray-900 to-gray-800 transform rotate-45 ${
              position === "top"
                ? "bottom-1 left-1/2 -translate-x-1/2"
                : position === "bottom"
                ? "top-1 left-1/2 -translate-x-1/2"
                : position === "left"
                ? "top-1/2 -right-1 -translate-y-1/2"
                : "top-1/2 -left-1 -translate-y-1/2"
            }`}
          />
        </div>
      )}
    </div>
  );
}

// Composant pour l'affichage holographique du pack recommandé
function HolographicPackCard({ forfaitRecommandation }: { forfaitRecommandation: any }) {
  const [isHovered, setIsHovered] = useState(false);
  
  if (!forfaitRecommandation) return null;
  
  const { forfait } = forfaitRecommandation;
  
  return (
    <div className="relative">
      <div 
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/80 via-violet-900/80 to-indigo-900/80 backdrop-blur-xl p-8 shadow-2xl border border-purple-500/30 transition-all duration-500 hover:scale-105 group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Effet holographique animé */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-indigo-500/20 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-2000 ease-out" />
        
        {/* Particules holographiques */}
        {isHovered && (
          <>
            <div className="absolute top-4 right-4 w-3 h-3 bg-purple-400/60 rounded-full animate-ping" />
            <div className="absolute top-8 left-8 w-2 h-2 bg-violet-400/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-6 right-6 w-2.5 h-2.5 bg-indigo-400/55 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          </>
        )}
        
        {/* Contenu 3D */}
        <div className="relative z-10 text-center">
          <div className="mb-6">
            <div className="text-sm font-bold text-purple-300 mb-2 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Pack Recommandé</span>
            </div>
            <h3 
              className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 mb-4 transform group-hover:scale-110 transition-transform duration-500"
              style={{ 
                textShadow: '0 0 20px rgba(147, 51, 234, 0.5)',
                filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.3))'
              }}
            >
              {forfait.nom}
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-black text-white">{forfait.prixMensuel}€</div>
                <div className="text-sm text-purple-300">par mois</div>
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
              <div className="text-center">
                <div className="text-3xl font-black text-white">{forfait.nombreAutomatisations}</div>
                <div className="text-sm text-purple-300">automatisations</div>
              </div>
            </div>
            
            <p className="text-purple-200 text-sm max-w-md mx-auto">
              {forfait.description}
            </p>
            
            <div className="bg-gradient-to-r from-purple-800/50 to-violet-800/50 rounded-2xl p-4 mt-6">
              <div className="text-sm text-purple-300 mb-2 flex items-center justify-center gap-2">
                <MoneyIcon className="w-5 h-5" />
                <span>Économies avec ce pack :</span>
              </div>
              <div className="text-2xl font-bold text-green-400">
                {forfaitRecommandation.economieMensuelle.toLocaleString('fr-FR')}€/mois
              </div>
              <div className="text-xs text-purple-300">
                ROI : {forfaitRecommandation.roiMensuel}% par mois
              </div>
            </div>
          </div>
        </div>
        
        {/* Bordure holographique animée */}
        <div className="absolute inset-0 rounded-3xl border-2 border-purple-500/30 group-hover:border-purple-400/50 transition-colors duration-500" />
        
        {/* Effet de glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-indigo-500/10 blur-xl group-hover:blur-2xl transition-all duration-500" />
      </div>
    </div>
  );
}

// Composant pour les cartes de résultats ultra-stylisées avec animations époustouflantes
function ResultCard({ title, value, subtitle, icon, color, gradient, trend }: { 
  title: string; 
  value: string; 
  subtitle?: string; 
  icon: React.ReactNode; 
  color: string; 
  gradient: string; 
  trend?: number 
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-8 shadow-2xl transition-all duration-500 hover:shadow-[0_20px_80px_rgba(0,0,0,0.3)] hover:scale-105 group cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Effet de brillance animée spectaculaire */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out" />
      
      {/* Particules flottantes animées */}
      {isHovered && (
        <>
          <div className="absolute top-4 right-4 w-2 h-2 bg-white/60 rounded-full animate-ping" />
          <div className="absolute top-8 right-8 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        </>
      )}
      
      {/* Icône avec effet glow spectaculaire */}
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/30 backdrop-blur-sm mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-2xl`}>
        <div className={`w-8 h-8 ${color} drop-shadow-lg`}>
          {icon}
        </div>
      </div>
      
      {/* Contenu avec animations */}
      <div className="relative z-10">
        <h3 className="text-white/90 text-base font-semibold mb-3 group-hover:text-white transition-colors duration-300">{title}</h3>
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl lg:text-4xl font-black text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300">{value}</span>
          {trend && (
            <span className={`text-base font-bold animate-pulse ${trend > 0 ? 'text-green-200' : 'text-red-200'}`}>
              {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
            </span>
          )}
        </div>
        {subtitle && <p className="text-white/70 text-sm mt-2 group-hover:text-white/90 transition-colors duration-300">{subtitle}</p>}
      </div>
      
      {/* Motif décoratif animé */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
        <div className="w-full h-full rounded-full bg-white/20 blur-2xl animate-pulse" />
      </div>
      
      {/* Bordure animée */}
      <div className="absolute inset-0 rounded-3xl border-2 border-white/20 group-hover:border-white/40 transition-colors duration-500" />
    </div>
  );
}

// Composant pour le menu d'ajout de tâche moderne avec effets WOW
function AddTaskModal({ isOpen, onClose, onAddTask }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onAddTask: (taskData?: any) => void 
}) {
  const [taskName, setTaskName] = useState('');

  const predefinedTasks = [
    { name: "Réponse aux emails", time: 2, frequency: 5, employees: 3, cost: 25 },
    { name: "Saisie de données", time: 1.5, frequency: 7, employees: 2, cost: 20 },
    { name: "Gestion des commandes", time: 3, frequency: 5, employees: 4, cost: 30 },
    { name: "Support client", time: 4, frequency: 5, employees: 2, cost: 28 },
    { name: "Facturation", time: 1, frequency: 2, employees: 1, cost: 35 },
    { name: "Reporting", time: 2, frequency: 1, employees: 1, cost: 40 }
  ];

  const handlePredefinedTask = (task: any) => {
    onAddTask(task);
    setTaskName('');
    onClose();
  };

  const handleCustomTask = () => {
    if (taskName.trim()) {
      onAddTask({ name: taskName, time: 1, frequency: 3, employees: 1, cost: 25 });
      setTaskName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-violet-400/35 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom-10 zoom-in-95 duration-500">
        {/* Header spectaculaire */}
        <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 p-8 text-white relative overflow-hidden">
          {/* Effet de vagues animées */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-violet-400/20 to-indigo-400/20 animate-pulse" />
          
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h3 className="text-2xl font-black mb-2 flex items-center gap-2">
                <SparklesIcon className="w-6 h-6" />
                <span>Ajouter une tâche</span>
              </h3>
              <p className="text-purple-100 text-sm">Choisissez un modèle ou créez une tâche personnalisée</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-200 hover:rotate-90"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8 max-h-96 overflow-y-auto">
          {/* Tâches prédéfinies avec effets wow */}
          <div>
            <h4 className="font-black text-gray-900 mb-4 text-lg flex items-center gap-2">
              <RocketIcon className="w-5 h-5 text-purple-600" />
              <span>Tâches courantes</span>
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {predefinedTasks.map((task, index) => (
                <button
                  key={index}
                  onClick={() => handlePredefinedTask(task)}
                  className="text-left p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-purple-50 hover:to-violet-50 border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 group hover:scale-105 hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">{task.name}</span>
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center text-white group-hover:rotate-12 transition-transform duration-300">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2 group-hover:text-purple-600 transition-colors duration-300">
                    <span className="flex items-center gap-1"><ClockIcon className="w-4 h-4" /> {task.time}h/jour</span> • 
                    <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" /> {task.frequency}x/semaine</span> • 
                    <span className="flex items-center gap-1"><UsersIcon className="w-4 h-4" /> {task.employees} pers.</span> • 
                    <span className="flex items-center gap-1"><MoneyIcon className="w-4 h-4" /> {task.cost}€/h</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tâche personnalisée */}
          <div>
            <h4 className="font-black text-gray-900 mb-4 text-lg flex items-center gap-2">
              <LightBulbIcon className="w-5 h-5 text-purple-600" />
              <span>Tâche personnalisée</span>
            </h4>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nom de votre tâche magique..."
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-lg font-medium placeholder-gray-400"
                onKeyPress={(e) => e.key === 'Enter' && handleCustomTask()}
              />
              <button
                onClick={handleCustomTask}
                disabled={!taskName.trim()}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-2xl font-black text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
              >
                <span className="flex items-center gap-2">
                  <SparklesIcon className="w-5 h-5" />
                  <span>Créer la tâche</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CalculatorSection() {
  const {
    tasks,
    result,
    addTask,
    removeTask,
    updateTask,
    generateWhatsAppMessage
  } = useCalculator();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleAddTask = (taskData: any = null) => {
    if (taskData) {
      // Convertir le format du modal vers le format de la tâche
      const taskFormatted = {
        name: taskData.name,
        timeSpent: taskData.time,
        frequency: taskData.frequency,
        employeeCount: taskData.employees,
        employeeCost: taskData.cost
      };
      addTask(taskFormatted);
    } else {
      addTask();
    }
  };

  const tooltips = {
    name: "Le nom de la tâche vous aide à l'identifier. Soyez spécifique (ex: 'Réponse aux emails clients' plutôt que 'Emails')",
    timeSpent: "Estimez le temps quotidien moyen consacré à cette tâche. Comptez les interruptions et le temps de concentration requis.",
    frequency: "Nombre de fois par semaine où cette tâche est effectuée. Une tâche quotidienne = 5-7 fois/semaine.",
    employeeCount: "Nombre total de personnes qui effectuent cette tâche dans votre entreprise.",
    employeeCost: "Coût horaire moyen incluant salaire + charges sociales + avantages. Utilisez environ 1.5x le salaire brut."
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden" id="calculateur">
      {/* Particules d'arrière-plan animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-400/20 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-indigo-400/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-violet-400/20 rounded-full animate-bounce" style={{ animationDelay: '4s' }} />
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-purple-300/30 rounded-full animate-ping" style={{ animationDelay: '6s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header époustouflant */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 mb-6 animate-in slide-in-from-top duration-1000">
            Calculez vos économies potentielles
          </h2>
          <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto font-medium animate-in slide-in-from-top duration-1000" style={{ animationDelay: '200ms' }}>
            <span className="flex items-center justify-center gap-2">
              <RocketIcon className="w-6 h-6" />
              <span>Découvrez combien vous pourriez économiser en automatisant vos tâches répétitives</span>
            </span>
          </p>
        </div>

        {tasks.length === 0 ? (
          /* État initial époustouflant */
          <div className="max-w-3xl mx-auto text-center animate-in zoom-in duration-1000">
            <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-16 border border-gray-700/50 relative overflow-hidden">
              {/* Effet de gradient animé en arrière-plan */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-violet-900/30 to-indigo-900/30 animate-pulse" />
              
              {/* Contenu */}
              <div className="relative z-10">
                <div className="mb-8">
                  <div className="text-6xl mb-6 animate-bounce flex justify-center">
                    <TargetIcon className="w-16 h-16 text-purple-600" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-6">
                    Commencez par ajouter une tâche
                  </h3>
                  <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                    Identifiez les tâches répétitives de votre entreprise pour découvrir votre potentiel d'économies
                  </p>
                </div>
                
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white font-black text-xl rounded-3xl shadow-2xl hover:shadow-[0_20px_80px_rgba(147,51,234,0.4)] transform hover:scale-105 transition-all duration-500 hover:-translate-y-2"
                >
                  <SparklesIcon className="w-8 h-8 mr-4 group-hover:animate-spin text-white" />
                  Ajouter ma première tâche
                  <svg className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Section des tâches avec effets spectaculaires */}
            <div className="bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-gray-700/50 animate-in slide-in-from-left duration-1000">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-3xl font-black flex items-center justify-center gap-3">
                  <TargetIcon className="w-10 h-10 text-purple-600" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">Vos tâches à automatiser</span>
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:-translate-y-1"
                >
                  <SparklesIcon className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-300" />
                  Ajouter une tâche
                </button>
              </div>
              
              <div className="space-y-8">
                {tasks.map((task, index) => (
                  <div 
                    key={task.id} 
                    className="bg-gradient-to-r from-gray-700/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-600/50 hover:shadow-xl transition-all duration-500 group hover:scale-[1.02] animate-in slide-in-from-right duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          {index + 1}
                        </div>
                        <h4 className="text-2xl font-black text-white">{task.name}</h4>
                      </div>
                      
                      {tasks.length > 1 && (
                        <button
                          onClick={() => removeTask(task.id)}
                          className="opacity-0 group-hover:opacity-100 w-10 h-10 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Nom de la tâche - pleine largeur */}
                    <div className="mb-6">
                      <Tooltip content={tooltips.name} position="top">
                        <label className="flex items-center space-x-2 text-sm font-bold text-gray-300 mb-3">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>Nom de la tâche</span>
                          <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </label>
                      </Tooltip>
                      <input
                        type="text"
                        className="w-full px-4 py-4 border-2 border-gray-600 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 font-medium text-white bg-gray-700/80 backdrop-blur-sm"
                        value={task.name}
                        onChange={(e) => updateTask(task.id, 'name', e.target.value)}
                        placeholder="Ex: Réponse aux emails"
                      />
                    </div>

                    {/* Champs numériques - 2x2 grille avec largeurs uniformes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* Temps par jour */}
                      <div>
                        <Tooltip content={tooltips.timeSpent} position="top">
                          <label className="flex items-center space-x-2 text-sm font-bold text-gray-300 mb-3">
                            <ClockIcon className="w-4 h-4" />
                            <span>Temps/jour (h)</span>
                            <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </label>
                        </Tooltip>
                        <div className="flex items-center bg-gray-700/90 rounded-2xl border-2 border-gray-600 overflow-hidden focus-within:ring-4 focus-within:ring-purple-500/20 focus-within:border-purple-500 transition-all duration-300 max-w-[200px] mx-auto">
                          <button
                            onClick={() => updateTask(task.id, 'timeSpent', Math.max(0.5, task.timeSpent - 0.5))}
                            className="w-12 h-12 bg-gradient-to-r from-red-800 to-red-700 hover:from-red-900 hover:to-red-800 text-red-300 hover:text-red-200 transition-all duration-300 font-bold text-lg hover:scale-110 flex items-center justify-center flex-shrink-0"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="0.5"
                            step="0.5"
                            className="flex-1 text-center py-3 border-0 focus:ring-0 font-bold text-lg text-white bg-gray-700 min-w-0"
                            value={task.timeSpent}
                            onChange={(e) => updateTask(task.id, 'timeSpent', Math.max(0.5, Number(e.target.value) || 0.5))}
                          />
                          <button
                            onClick={() => {
                              console.log('Bouton + timeSpent cliqué');
                              updateTask(task.id, 'timeSpent', task.timeSpent + 0.5);
                            }}
                            className="w-12 h-12 bg-gradient-to-r from-green-800 to-green-700 hover:from-green-900 hover:to-green-800 text-green-300 hover:text-green-200 transition-all duration-300 font-bold text-lg hover:scale-110 flex items-center justify-center flex-shrink-0"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Fréquence */}
                      <div>
                        <Tooltip content={tooltips.frequency} position="top">
                          <label className="flex items-center space-x-2 text-sm font-bold text-gray-300 mb-3">
                            <CalendarIcon className="w-4 h-4" />
                            <span>Fois/semaine</span>
                            <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </label>
                        </Tooltip>
                        <div className="flex items-center bg-gray-700/90 rounded-2xl border-2 border-gray-600 overflow-hidden focus-within:ring-4 focus-within:ring-purple-500/20 focus-within:border-purple-500 transition-all duration-300 max-w-[200px] mx-auto">
                          <button
                            onClick={() => updateTask(task.id, 'frequency', Math.max(1, task.frequency - 1))}
                            className="w-12 h-12 bg-gradient-to-r from-red-800 to-red-700 hover:from-red-900 hover:to-red-800 text-red-300 hover:text-red-200 transition-all duration-300 font-bold text-lg hover:scale-110 flex items-center justify-center flex-shrink-0"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="1"
                            max="7"
                            className="flex-1 text-center py-3 border-0 focus:ring-0 font-bold text-lg text-white bg-gray-700 min-w-0"
                            value={task.frequency}
                            onChange={(e) => updateTask(task.id, 'frequency', Math.max(1, Math.min(7, Number(e.target.value) || 1)))}
                          />
                          <button
                            onClick={() => {
                              console.log('Bouton + frequency cliqué');
                              updateTask(task.id, 'frequency', Math.min(7, task.frequency + 1));
                            }}
                            className="w-12 h-12 bg-gradient-to-r from-green-800 to-green-700 hover:from-green-900 hover:to-green-800 text-green-300 hover:text-green-200 transition-all duration-300 font-bold text-lg hover:scale-110 flex items-center justify-center flex-shrink-0"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Nombre de personnes */}
                      <div>
                        <Tooltip content={tooltips.employeeCount} position="top">
                          <label className="flex items-center space-x-2 text-sm font-bold text-gray-300 mb-3">
                            <UsersIcon className="w-4 h-4" />
                            <span>Personnes</span>
                            <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </label>
                        </Tooltip>
                        <div className="flex items-center bg-gray-700/90 rounded-2xl border-2 border-gray-600 overflow-hidden focus-within:ring-4 focus-within:ring-purple-500/20 focus-within:border-purple-500 transition-all duration-300 max-w-[200px] mx-auto">
                          <button
                            onClick={() => updateTask(task.id, 'employeeCount', Math.max(1, task.employeeCount - 1))}
                            className="w-12 h-12 bg-gradient-to-r from-red-800 to-red-700 hover:from-red-900 hover:to-red-800 text-red-300 hover:text-red-200 transition-all duration-300 font-bold text-lg hover:scale-110 flex items-center justify-center flex-shrink-0"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="1"
                            className="flex-1 text-center py-3 border-0 focus:ring-0 font-bold text-lg text-white bg-gray-700 min-w-0"
                            value={task.employeeCount}
                            onChange={(e) => updateTask(task.id, 'employeeCount', Math.max(1, Number(e.target.value) || 1))}
                          />
                          <button
                            onClick={() => {
                              console.log('Bouton + employeeCount cliqué');
                              updateTask(task.id, 'employeeCount', task.employeeCount + 1);
                            }}
                            className="w-12 h-12 bg-gradient-to-r from-green-800 to-green-700 hover:from-green-900 hover:to-green-800 text-green-300 hover:text-green-200 transition-all duration-300 font-bold text-lg hover:scale-110 flex items-center justify-center flex-shrink-0"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Coût horaire */}
                      <div>
                        <Tooltip content={tooltips.employeeCost} position="top">
                          <label className="flex items-center space-x-2 text-sm font-bold text-gray-300 mb-3">
                            <MoneyIcon className="w-4 h-4" />
                            <span>Coût/h (€)</span>
                            <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </label>
                        </Tooltip>
                        <div className="flex items-center bg-gray-700/90 rounded-2xl border-2 border-gray-600 overflow-hidden focus-within:ring-4 focus-within:ring-purple-500/20 focus-within:border-purple-500 transition-all duration-300 max-w-[200px] mx-auto">
                          <button
                            onClick={() => updateTask(task.id, 'employeeCost', Math.max(10, task.employeeCost - 5))}
                            className="w-12 h-12 bg-gradient-to-r from-red-800 to-red-700 hover:from-red-900 hover:to-red-800 text-red-300 hover:text-red-200 transition-all duration-300 font-bold text-lg hover:scale-110 flex items-center justify-center flex-shrink-0"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="10"
                            step="5"
                            className="flex-1 text-center py-3 border-0 focus:ring-0 font-bold text-lg text-white bg-gray-700 min-w-0"
                            value={task.employeeCost}
                            onChange={(e) => updateTask(task.id, 'employeeCost', Math.max(10, Number(e.target.value) || 10))}
                          />
                          <button
                            onClick={() => {
                              console.log('Bouton + employeeCost cliqué');
                              updateTask(task.id, 'employeeCost', task.employeeCost + 5);
                            }}
                            className="w-12 h-12 bg-gradient-to-r from-green-800 to-green-700 hover:from-green-900 hover:to-green-800 text-green-300 hover:text-green-200 transition-all duration-300 font-bold text-lg hover:scale-110 flex items-center justify-center flex-shrink-0"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section des résultats spectaculaire */}
            {result && (
              <div className="space-y-12 animate-in slide-in-from-bottom duration-1000">
                <h3 className="text-4xl font-black text-center mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">Vos résultats époustouflants</span>
                  <div className="mt-2 flex justify-center">
                    <svg className="w-16 h-16 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                </h3>
                
                {/* Cartes principales avec animations époustouflantes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <ResultCard
                    title="Temps économisé par an"
                    value={`${result.totalHoursPerYear}h`}
                    subtitle={`Soit ${result.totalWorkDaysPerYear} jours de travail`}
                    gradient="from-cyan-500 via-blue-500 to-indigo-600"
                    color="text-cyan-100"
                    icon={
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    }
                  />
                  
                  <ResultCard
                    title="Coût actuel par an"
                    value={`${result.totalYearlyCost.toLocaleString('fr-FR')}€`}
                    subtitle="Coût de la main d'œuvre"
                    gradient="from-orange-500 via-red-500 to-pink-600"
                    color="text-orange-100"
                    icon={
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                  />
                  
                  <ResultCard
                    title="Économies potentielles"
                    value={`${result.totalYearlySavings.toLocaleString('fr-FR')}€`}
                    subtitle={`${result.totalMonthlySavings.toLocaleString('fr-FR')}€ par mois`}
                    gradient="from-green-500 via-emerald-500 to-teal-600"
                    color="text-green-100"
                    trend={15}
                    icon={
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    }
                  />
                </div>

                {/* Pack recommandé holographique */}
                {result.forfaitRecommandation && (
                  <div className="animate-in slide-in-from-bottom duration-1000" style={{ animationDelay: '300ms' }}>
                    <HolographicPackCard forfaitRecommandation={result.forfaitRecommandation} />
                  </div>
                )}

                {/* Niveau d'urgence spectaculaire */}
                <div className="bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-gray-700/50">
                  <div className="text-center mb-8">
                    <h4 className="text-3xl font-black mb-4 flex items-center justify-center gap-3">
                      <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">Niveau d'urgence</span>
                    </h4>
                    <p className="text-lg text-gray-300 font-medium">Basé sur vos économies potentielles</p>
                  </div>
                  
                  <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-lg font-bold text-gray-300">Faible</span>
                      <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">
                        {result.emergencyLevel}%
                      </span>
                      <span className="text-lg font-bold text-gray-300">Critique</span>
                    </div>
                    
                    <div className="relative w-full bg-gray-300 rounded-full h-6 mb-8 overflow-hidden">
                      <div
                        className={`h-6 rounded-full transition-all duration-2000 ease-out relative overflow-hidden ${
                          result.emergencyLevel > 70
                            ? 'bg-gradient-to-r from-red-500 via-red-600 to-red-700'
                            : result.emergencyLevel > 40
                            ? 'bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600'
                            : 'bg-gradient-to-r from-green-500 via-emerald-500 to-green-600'
                        }`}
                        style={{ width: `${result.emergencyLevel}%` }}
                      >
                        {/* Effet de brillance animée */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-[slide_2s_ease-in-out_infinite]" />
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-2xl font-black text-white mb-4">
                        {result.emergencyLevel > 70
                          ? "Automatisation fortement recommandée"
                          : result.emergencyLevel > 40
                          ? "Pensez à automatiser bientôt"
                          : "À considérer pour l'avenir"}
                      </p>
                      <p className="text-lg text-gray-300 font-medium">
                        {result.emergencyLevel > 70
                          ? `Économisez jusqu'à ${result.totalYearlySavings.toLocaleString('fr-FR')}€ par an`
                          : result.emergencyLevel > 40
                          ? `Jusqu'à ${result.totalYearlySavings.toLocaleString('fr-FR')}€ d'économies potentielles`
                          : "Améliorez votre productivité dès maintenant"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bouton WhatsApp époustouflant */}
                <div className="text-center">
                  <a
                    href={`https://wa.me/33756827384?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 text-white font-black text-xl rounded-3xl shadow-2xl hover:shadow-[0_20px_80px_rgba(34,197,94,0.4)] transform hover:scale-105 transition-all duration-500 hover:-translate-y-2"
                  >
                    <svg className="w-8 h-8 mr-4 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                    Discuter de votre projet
                    <svg className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  <p className="text-gray-300 text-lg mt-4 font-medium flex items-center justify-center gap-2">
                    <SparklesIcon className="w-5 h-5" />
                    <span>Réponse garantie sous 24h</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal d'ajout de tâche */}
        <AddTaskModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddTask={handleAddTask}
        />
      </div>
    </div>
  );
}