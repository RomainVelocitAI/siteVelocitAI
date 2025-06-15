import React from 'react';
import { useCalculator, SUGGESTED_TASKS } from '@/contexts/CalculatorContext';

export default function CalculatorSection() {
  console.log('Rendering CalculatorSection');
  
  const context = useCalculator();
  
  // Vérifier si le contexte est défini
  if (!context) {
    console.error('Calculator context is not available');
    return <div>Erreur: Contexte du calculateur non disponible</div>;
  }
  
  const {
    tasks = [],
    result,
    addTask = () => {},
    removeTask = () => {},
    updateTask = () => {},
    generateWhatsAppMessage = () => ''
  } = context;
  
  console.log('Tasks:', tasks);
  console.log('Result:', result);

  if (tasks.length === 0) {
    return (
      <div className="py-12 bg-white" id="calculateur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Calculez vos économies potentielles
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Découvrez combien vous pourriez économiser en automatisant vos tâches répétitives
            </p>
          </div>
          
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Commencez par ajouter une tâche à automatiser
            </h3>
            <button
              type="button"
              onClick={addTask}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Ajouter une tâche
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white" id="calculateur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Calculez vos économies potentielles
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Découvrez combien vous pourriez économiser en automatisant vos tâches répétitives
          </p>
        </div>

        <div className="mt-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="space-y-6">
                  {tasks.map((task) => (
                    <div key={task.id} className="border border-gray-200 rounded-lg p-4 relative">
                      {tasks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTask(task.id)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                          aria-label="Supprimer la tâche"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}

                      <div className="space-y-2">
                        <label htmlFor={`task-select-${task.id}`} className="block text-sm font-medium text-gray-900 dark:text-white">
                          Sélectionnez une tâche à automatiser
                        </label>
                        <select
                          id={`task-select-${task.id}`}
                          value={task.name}
                          onChange={(e) => updateTask(task.id, 'name', e.target.value)}
                          className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                        >
                          <option value="" className="text-gray-500 dark:text-gray-400">Choisir une tâche dans la liste...</option>
                          {SUGGESTED_TASKS.map((suggestion, index) => (
                            <option 
                              key={index} 
                              value={suggestion}
                              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                              {suggestion}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          Choisissez une tâche courante à automatiser
                        </p>
                      </div>

                      <div className="mb-4">
                        <label htmlFor={`time-spent-${task.id}`} className="block text-sm font-medium text-gray-700">
                          Temps passé par jour (en heures)
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <button
                            type="button"
                            onClick={() => updateTask(task.id, 'timeSpent', Math.max(0.5, task.timeSpent - 0.5))}
                            className="absolute left-0 inset-y-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            id={`time-spent-${task.id}`}
                            min="0.5"
                            step="0.5"
                            className="block w-full text-center border border-gray-300 rounded-md py-2 px-10 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            value={task.timeSpent}
                            onChange={(e) => updateTask(task.id, 'timeSpent', Math.max(0.5, Number(e.target.value) || 0.5))}
                          />
                          <button
                            type="button"
                            onClick={() => updateTask(task.id, 'timeSpent', task.timeSpent + 0.5)}
                            className="absolute right-0 inset-y-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor={`frequency-${task.id}`} className="block text-sm font-medium text-gray-700">
                          Nombre de fois par semaine
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <button
                            type="button"
                            onClick={() => updateTask(task.id, 'frequency', Math.max(1, task.frequency - 1))}
                            className="absolute left-0 inset-y-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            id={`frequency-${task.id}`}
                            min="1"
                            max="7"
                            className="block w-full text-center border border-gray-300 rounded-md py-2 px-10 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            value={task.frequency}
                            onChange={(e) => updateTask(task.id, 'frequency', Math.max(1, Math.min(7, Number(e.target.value) || 1)))}
                          />
                          <button
                            type="button"
                            onClick={() => updateTask(task.id, 'frequency', Math.min(7, task.frequency + 1))}
                            className="absolute right-0 inset-y-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor={`employee-count-${task.id}`} className="block text-sm font-medium text-gray-700">
                          Nombre de personnes
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <button
                            type="button"
                            onClick={() => updateTask(task.id, 'employeeCount', Math.max(1, task.employeeCount - 1))}
                            className="absolute left-0 inset-y-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            id={`employee-count-${task.id}`}
                            min="1"
                            className="block w-full text-center border border-gray-300 rounded-md py-2 px-10 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            value={task.employeeCount}
                            onChange={(e) => updateTask(task.id, 'employeeCount', Math.max(1, Number(e.target.value) || 1))}
                          />
                          <button
                            type="button"
                            onClick={() => updateTask(task.id, 'employeeCount', task.employeeCount + 1)}
                            className="absolute right-0 inset-y-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div>
                        <label htmlFor={`employee-cost-${task.id}`} className="block text-sm font-medium text-gray-700">
                          Coût horaire moyen (€)
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <button
                            type="button"
                            onClick={() => updateTask(task.id, 'employeeCost', Math.max(10, task.employeeCost - 5))}
                            className="absolute left-0 inset-y-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            id={`employee-cost-${task.id}`}
                            min="10"
                            step="5"
                            className="block w-full text-center border border-gray-300 rounded-md py-2 px-10 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            value={task.employeeCost}
                            onChange={(e) => updateTask(task.id, 'employeeCost', Math.max(10, Number(e.target.value) || 10))}
                          />
                          <button
                            type="button"
                            onClick={() => updateTask(task.id, 'employeeCost', task.employeeCost + 5)}
                            className="absolute right-0 inset-y-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addTask}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Ajouter une tâche
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center">
                <a
                  href={`https://wa.me/33756827384?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
                >
                  <svg className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg font-semibold">Parlez-nous de votre projet</span>
                </a>
                <p className="mt-3 text-sm text-gray-500">Réponse sous 24h, 7j/7</p>
              </div>
            </div>
            
            <div className="mt-10 lg:mt-0 lg:col-span-7">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl shadow-sm h-full border border-gray-100">
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Votre Économie Annuelle
                    </h3>
                    <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                      Découvrez comment l'automatisation peut transformer votre productivité et votre rentabilité
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transform transition-all hover:scale-[1.02] hover:shadow-md">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Temps économisé</h4>
                          <p className="text-2xl font-bold text-gray-900">{result?.totalHoursPerYear || 0} heures</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Soit {result?.totalWorkDaysPerYear || 0} jours de travail
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transform transition-all hover:scale-[1.02] hover:shadow-md">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Coût annuel actuel</h4>
                          <p className="text-2xl font-bold text-purple-700">{result?.totalYearlyCost?.toLocaleString('fr-FR') || 0} €</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Coût total de la main d'œuvre
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-xl shadow-lg text-white transform transition-all hover:scale-[1.01] hover:shadow-xl">
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-semibold mb-1">Économies potentielles</h4>
                        <p className="text-purple-100 text-sm">Avec notre solution d'automatisation</p>
                      </div>
                      
                      {/* Section de recommandation de forfait */}
                      {result?.forfaitRecommandation && (
                        <div className="mb-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                          <h5 className="text-lg font-semibold mb-2">Notre recommandation</h5>
                          <p className="text-sm mb-3">
                            Notre forfait le plus adapté est le <span className="font-bold">Forfait {result.forfaitRecommandation.forfait.nom}</span> à {result.forfaitRecommandation.forfait.prixMensuel}€/mois
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-center mt-3">
                            <div className="bg-white/10 p-3 rounded-lg">
                              <div className="text-2xl font-bold">{result.forfaitRecommandation.roiMensuel}%</div>
                              <div className="text-xs opacity-80">ROI mensuel</div>
                            </div>
                            <div className="bg-white/10 p-3 rounded-lg">
                              <div className="text-2xl font-bold">{result.forfaitRecommandation.tempsRetourInvestissement} mois</div>
                              <div className="text-xs opacity-80">Retour sur investissement</div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold">{result?.totalMonthlySavings?.toLocaleString('fr-FR') || 0} €</div>
                          <div className="text-purple-100 text-sm mt-1">Économies mensuelles</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold">{result?.totalYearlySavings?.toLocaleString('fr-FR') || 0} €</div>
                          <div className="text-purple-100 text-sm mt-1">Économies annuelles</div>
                        </div>
                      </div>
                      {result && (
                        <div className="mt-6 pt-4 border-t border-white/10">
                          <div className="flex flex-col space-y-3">
                            <div className="flex justify-between items-center">
                              <h4 className="text-sm font-medium text-white">Niveau d'opportunité d'automatisation</h4>
                              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full" 
                                style={{
                                  backgroundColor: result.emergencyLevel > 70 
                                    ? 'rgba(220, 38, 38, 0.2)' 
                                    : result.emergencyLevel > 40 
                                      ? 'rgba(217, 119, 6, 0.2)'
                                      : 'rgba(5, 150, 105, 0.2)',
                                  color: result.emergencyLevel > 70 
                                    ? '#FECACA' 
                                    : result.emergencyLevel > 40 
                                      ? '#FDE68A'
                                      : '#A7F3D0',
                                }}>
                                {result.emergencyLevel}%
                              </span>
                            </div>
                            
                            {/* Barre de progression avec segments */}
                            <div className="relative pt-2">
                              <div className="flex justify-between text-xs text-purple-100 mb-1">
                                <span>Faible</span>
                                <span>Moyen</span>
                                <span>Élevé</span>
                              </div>
                              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                <div 
                                  className="h-full rounded-full transition-all duration-1000 ease-out"
                                  style={{
                                    width: `${result.emergencyLevel}%`,
                                    background: result.emergencyLevel > 70 
                                      ? 'linear-gradient(90deg, #EF4444, #DC2626)' 
                                      : result.emergencyLevel > 40 
                                        ? 'linear-gradient(90deg, #F59E0B, #D97706)'
                                        : 'linear-gradient(90deg, #10B981, #059669)'
                                  }}
                                ></div>
                              </div>
                              <div className="absolute top-0 h-2 w-full flex justify-between">
                                <div className="h-full w-[1px] bg-white/30"></div>
                                <div className="h-full w-[1px] bg-white/30"></div>
                                <div className="h-full w-[1px] bg-white/30"></div>
                              </div>
                            </div>
                            
                            {/* Message personnalisé */}
                            <div className="mt-3 p-3 rounded-lg text-center"
                              style={{
                                backgroundColor: result.emergencyLevel > 70 
                                  ? 'rgba(220, 38, 38, 0.1)' 
                                  : result.emergencyLevel > 40 
                                    ? 'rgba(217, 119, 6, 0.1)'
                                    : 'rgba(5, 150, 105, 0.1)',
                                borderLeft: result.emergencyLevel > 70 
                                  ? '3px solid #DC2626' 
                                  : result.emergencyLevel > 40 
                                    ? '3px solid #D97706'
                                    : '3px solid #059669',
                              }}>
                              <p className="text-sm font-medium text-white">
                                {result.emergencyLevel > 70 
                                  ? "🚀 Opportunité exceptionnelle" 
                                  : result.emergencyLevel > 40 
                                    ? "📈 Bonne opportunité" 
                                    : "💡 Opportunité intéressante"}
                              </p>
                              <p className="text-xs text-purple-100 mt-1">
                                {result.emergencyLevel > 70 
                                  ? `Économisez jusqu'à ${result.totalYearlySavings.toLocaleString('fr-FR')}€/an`
                                  : result.emergencyLevel > 40 
                                    ? `Jusqu'à ${result.totalYearlySavings.toLocaleString('fr-FR')}€ d'économies potentielles`
                                    : "Améliorez votre productivité dès maintenant"}
                              </p>
                              {result.emergencyLevel > 0 && (
                                <div className="mt-2 text-xs text-purple-100">
                                  <p>Plus le score est élevé, plus l'automatisation est avantageuse</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
