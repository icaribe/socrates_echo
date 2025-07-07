import React from 'react';
import Icon from '../../../components/AppIcon';

const JourneyProgress = ({ 
  currentProgress, 
  journeyPath, 
  achievements = [], 
  className = '' 
}) => {
  const {
    currentConcept = 'Introdução à Filosofia',
    conceptsCompleted = 0,
    totalConcepts = 12,
    experienceGained = 0,
    level = 1,
    streak = 0,
    timeSpent = 0
  } = currentProgress;

  const progressPercentage = Math.min((conceptsCompleted / totalConcepts) * 100, 100);
  const nextLevelXP = level * 100;
  const currentXP = experienceGained % nextLevelXP;
  const xpPercentage = (currentXP / nextLevelXP) * 100;

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const getConceptIcon = (concept) => {
    const icons = {
      'Introdução à Filosofia': 'BookOpen',
      'Pré-Socráticos': 'Zap',
      'Sócrates': 'MessageCircle',
      'Platão': 'Eye',
      'Aristóteles': 'Target',
      'Ética': 'Heart',
      'Política': 'Users',
      'Metafísica': 'Infinity',
      'Epistemologia': 'Search',
      'Lógica': 'GitBranch',
      'Estética': 'Palette',
      'Filosofia Moderna': 'Compass'
    };
    return icons[concept] || 'Circle';
  };

  const recentAchievements = achievements.slice(-3);

  return (
    <div className={`bg-surface rounded-soft shadow-soft ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-semibold text-text-primary">
              Progresso da Jornada
            </h3>
            <p className="text-sm text-text-secondary">
              {journeyPath?.title || 'Jornada Filosófica'}
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-data font-bold text-primary">
              Nível {level}
            </div>
            <div className="text-xs text-text-secondary">
              {currentXP}/{nextLevelXP} XP
            </div>
          </div>
        </div>
      </div>

      {/* Current Concept */}
      <div className="p-4 border-b border-border-muted">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name={getConceptIcon(currentConcept)} size={20} className="text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-text-primary">{currentConcept}</h4>
            <p className="text-sm text-text-secondary">Conceito atual</p>
          </div>
        </div>
        
        {/* Concept Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Progresso do conceito</span>
            <span className="text-text-primary font-data">
              {conceptsCompleted}/{totalConcepts}
            </span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Experience Progress */}
      <div className="p-4 border-b border-border-muted">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text-primary">Experiência</span>
          <span className="text-sm text-text-secondary font-data">
            {currentXP}/{nextLevelXP} XP
          </span>
        </div>
        <div className="w-full h-3 bg-border rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-accent to-warning transition-all duration-300"
            style={{ width: `${xpPercentage}%` }}
          />
        </div>
        <p className="text-xs text-text-secondary mt-1">
          {nextLevelXP - currentXP} XP para o próximo nível
        </p>
      </div>

      {/* Stats Grid */}
      <div className="p-4 border-b border-border-muted">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-warning/10 rounded-full mx-auto mb-1">
              <Icon name="Flame" size={16} className="text-warning" />
            </div>
            <div className="text-lg font-data font-bold text-text-primary">{streak}</div>
            <div className="text-xs text-text-secondary">Dias seguidos</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-full mx-auto mb-1">
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
            <div className="text-lg font-data font-bold text-text-primary">{conceptsCompleted}</div>
            <div className="text-xs text-text-secondary">Conceitos</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full mx-auto mb-1">
              <Icon name="Clock" size={16} className="text-primary" />
            </div>
            <div className="text-lg font-data font-bold text-text-primary">{formatTime(timeSpent)}</div>
            <div className="text-xs text-text-secondary">Tempo total</div>
          </div>
        </div>
      </div>

      {/* Journey Path Overview */}
      <div className="p-4 border-b border-border-muted">
        <h4 className="text-sm font-medium text-text-primary mb-3">Trilha da Jornada</h4>
        <div className="space-y-2">
          {journeyPath?.startingConcepts?.map((concept, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${
                index < conceptsCompleted 
                  ? 'bg-success' 
                  : index === conceptsCompleted 
                    ? 'bg-primary animate-pulse' :'bg-border'
              }`} />
              <span className={`text-sm ${
                index <= conceptsCompleted ? 'text-text-primary' : 'text-text-secondary'
              }`}>
                {concept}
              </span>
              {index < conceptsCompleted && (
                <Icon name="Check" size={14} className="text-success" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <div className="p-4">
          <h4 className="text-sm font-medium text-text-primary mb-3">Conquistas Recentes</h4>
          <div className="space-y-2">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-accent/5 rounded-soft">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name={achievement.icon || "Trophy"} size={16} className="text-accent" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">{achievement.name}</div>
                  <div className="text-xs text-text-secondary">{achievement.description}</div>
                </div>
                <div className="text-xs text-text-secondary">
                  +{achievement.xp || 0} XP
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JourneyProgress;