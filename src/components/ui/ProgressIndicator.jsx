import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  user, 
  currentProgress = {}, 
  className = '',
  variant = 'default' // 'default', 'compact', 'detailed'
}) => {
  const {
    level = 1,
    experience = 0,
    experienceToNext = 100,
    totalExperience = 0,
    achievements = [],
    currentStreak = 0,
    completedLessons = 0,
    totalLessons = 10,
    weeklyGoal = 5,
    weeklyProgress = 2
  } = currentProgress;

  const progressPercentage = Math.min((experience / experienceToNext) * 100, 100);
  const weeklyPercentage = Math.min((weeklyProgress / weeklyGoal) * 100, 100);
  const lessonPercentage = Math.min((completedLessons / totalLessons) * 100, 100);

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'text-success bg-success';
    if (percentage >= 50) return 'text-accent bg-accent';
    if (percentage >= 25) return 'text-warning bg-warning';
    return 'text-text-secondary bg-text-secondary';
  };

  const getLevelTitle = (level) => {
    const titles = {
      1: 'Aprendiz',
      2: 'Questionador',
      3: 'Pensador',
      4: 'Filósofo',
      5: 'Sábio'
    };
    return titles[Math.min(level, 5)] || 'Mestre';
  };

  // Compact version for navigation integration
  if (variant === 'compact') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="flex items-center space-x-1">
          <Icon name="Star" size={14} className="text-accent" />
          <span className="text-xs font-data text-text-primary">{level}</span>
        </div>
        <div className="w-12 h-1.5 bg-border rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className="text-xs text-text-secondary">{experience}/{experienceToNext}</span>
      </div>
    );
  }

  // Detailed version for dashboard
  if (variant === 'detailed') {
    return (
      <div className={`bg-surface rounded-soft p-6 shadow-soft ${className}`}>
        <div className="space-y-6">
          {/* Level and Title */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-3">
              <Icon name="Award" size={24} className="text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-text-primary">
              Nível {level}
            </h3>
            <p className="text-sm text-text-secondary font-caption">
              {getLevelTitle(level)}
            </p>
          </div>

          {/* Experience Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-text-primary">Experiência</span>
              <span className="text-sm text-text-secondary font-data">
                {experience}/{experienceToNext} XP
              </span>
            </div>
            <div className="w-full h-3 bg-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 spring-animation"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-text-secondary mt-1">
              {experienceToNext - experience} XP para o próximo nível
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-background rounded-soft">
              <Icon name="Flame" size={20} className="text-warning mx-auto mb-1" />
              <p className="text-lg font-data font-semibold text-text-primary">{currentStreak}</p>
              <p className="text-xs text-text-secondary">Dias seguidos</p>
            </div>
            <div className="text-center p-3 bg-background rounded-soft">
              <Icon name="BookOpen" size={20} className="text-primary mx-auto mb-1" />
              <p className="text-lg font-data font-semibold text-text-primary">{completedLessons}</p>
              <p className="text-xs text-text-secondary">Lições completas</p>
            </div>
          </div>

          {/* Weekly Goal */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-text-primary">Meta Semanal</span>
              <span className="text-sm text-text-secondary font-data">
                {weeklyProgress}/{weeklyGoal}
              </span>
            </div>
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  weeklyPercentage >= 100 ? 'bg-success' : 'bg-accent'
                }`}
                style={{ width: `${weeklyPercentage}%` }}
              />
            </div>
          </div>

          {/* Recent Achievements */}
          {achievements.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">
                Conquistas Recentes
              </h4>
              <div className="flex space-x-2">
                {achievements.slice(0, 3).map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-full"
                    title={achievement.name}
                  >
                    <Icon name={achievement.icon || "Trophy"} size={14} className="text-accent" />
                  </div>
                ))}
                {achievements.length > 3 && (
                  <div className="flex items-center justify-center w-8 h-8 bg-border rounded-full">
                    <span className="text-xs text-text-secondary font-data">
                      +{achievements.length - 3}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default version
  return (
    <div className={`bg-surface rounded-soft p-4 shadow-soft ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Star" size={18} className="text-accent" />
          <span className="font-heading font-semibold text-text-primary">
            Nível {level}
          </span>
          <span className="text-sm text-text-secondary font-caption">
            {getLevelTitle(level)}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Icon name="Flame" size={14} className="text-warning" />
            <span className="text-sm font-data text-text-primary">{currentStreak}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="BookOpen" size={14} className="text-primary" />
            <span className="text-sm font-data text-text-primary">
              {completedLessons}/{totalLessons}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Experiência</span>
          <span className="text-sm font-data text-text-primary">
            {experience}/{experienceToNext} XP
          </span>
        </div>
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {weeklyGoal > 0 && (
        <div className="mt-3 pt-3 border-t border-border-muted">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-text-secondary">Meta Semanal</span>
            <span className="text-xs font-data text-text-primary">
              {weeklyProgress}/{weeklyGoal}
            </span>
          </div>
          <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                weeklyPercentage >= 100 ? 'bg-success' : 'bg-accent'
              }`}
              style={{ width: `${weeklyPercentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;