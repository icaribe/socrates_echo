import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HeroSection = ({ user, progress }) => {
  const {
    level = 1,
    experience = 0,
    experienceToNext = 100,
    currentStreak = 0,
    recentAchievements = []
  } = progress;

  const progressPercentage = Math.min((experience / experienceToNext) * 100, 100);

  const getLevelTitle = (level) => {
    const titles = {
      1: 'Aprendiz da Sabedoria',
      2: 'Questionador Curioso',
      3: 'Pensador Reflexivo',
      4: 'Filósofo Emergente',
      5: 'Sábio Contemplativo'
    };
    return titles[Math.min(level, 5)] || 'Mestre da Filosofia';
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 via-surface to-accent/5 rounded-soft p-6 shadow-elevated border border-border">
      <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Character Avatar */}
        <div className="relative">
          <div className="w-20 h-20 lg:w-24 lg:h-24 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/30">
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <Icon name="User" size={32} className="text-primary" />
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center border-2 border-surface">
            <span className="text-sm font-data font-bold">{level}</span>
          </div>
        </div>

        {/* User Info and Progress */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-xl lg:text-2xl font-heading font-bold text-text-primary mb-1">
            Olá, {user?.name || 'Filósofo'}!
          </h2>
          <p className="text-text-secondary font-caption mb-3">
            {getLevelTitle(level)}
          </p>

          {/* Experience Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Experiência</span>
              <span className="font-data text-text-primary">
                {experience}/{experienceToNext} XP
              </span>
            </div>
            <div className="w-full h-3 bg-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 spring-animation"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-text-secondary">
              {experienceToNext - experience} XP para o próximo nível
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex space-x-4 lg:space-x-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-full mb-2">
              <Icon name="Flame" size={20} className="text-warning" />
            </div>
            <p className="text-lg font-data font-bold text-text-primary">{currentStreak}</p>
            <p className="text-xs text-text-secondary">Dias seguidos</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-2">
              <Icon name="Trophy" size={20} className="text-accent" />
            </div>
            <p className="text-lg font-data font-bold text-text-primary">{recentAchievements.length}</p>
            <p className="text-xs text-text-secondary">Conquistas</p>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border-muted">
          <h3 className="text-sm font-medium text-text-primary mb-3">
            Conquistas Recentes
          </h3>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {recentAchievements.slice(0, 5).map((achievement, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center space-x-2 bg-accent/10 px-3 py-2 rounded-soft border border-accent/20"
              >
                <Icon name={achievement.icon || "Award"} size={16} className="text-accent" />
                <span className="text-sm text-text-primary whitespace-nowrap">
                  {achievement.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;