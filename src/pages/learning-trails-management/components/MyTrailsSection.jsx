import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MyTrailsSection = ({ enrolledTrails, onContinueTrail, onViewProgress }) => {
  const [sortBy, setSortBy] = useState('progress'); // 'progress', 'recent', 'alphabetical'

  const sortedTrails = [...enrolledTrails].sort((a, b) => {
    switch (sortBy) {
      case 'progress':
        return b.progress - a.progress;
      case 'recent':
        return new Date(b.lastAccessed) - new Date(a.lastAccessed);
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-success bg-success';
    if (progress >= 50) return 'text-accent bg-accent';
    if (progress >= 25) return 'text-warning bg-warning';
    return 'text-text-secondary bg-text-secondary';
  };

  const formatLastAccessed = (date) => {
    const now = new Date();
    const accessDate = new Date(date);
    const diffInDays = Math.floor((now - accessDate) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Hoje';
    if (diffInDays === 1) return 'Ontem';
    if (diffInDays < 7) return `${diffInDays} dias atrás`;
    return accessDate.toLocaleDateString('pt-BR');
  };

  if (enrolledTrails.length === 0) {
    return (
      <div className="bg-surface rounded-soft shadow-soft p-8 text-center">
        <Icon name="BookOpen" size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
          Nenhuma trilha inscrita
        </h3>
        <p className="text-text-secondary mb-4">
          Explore as trilhas disponíveis e comece sua jornada filosófica!
        </p>
        <Button
          variant="primary"
          iconName="Search"
          iconPosition="left"
          onClick={() => document.getElementById('available-trails')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Explorar Trilhas
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-soft shadow-soft p-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-xl font-semibold text-text-primary">
            Minhas Trilhas
          </h2>
          <p className="text-sm text-text-secondary">
            {enrolledTrails.length} trilha{enrolledTrails.length !== 1 ? 's' : ''} inscrita{enrolledTrails.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 bg-background border border-border rounded-soft text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="progress">Progresso</option>
            <option value="recent">Recente</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </div>

      {/* Trails Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedTrails.map((trail) => (
          <div
            key={trail.id}
            className="bg-background rounded-soft p-4 border border-border hover:border-primary transition-smooth"
          >
            {/* Trail Header */}
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-12 h-12 rounded-soft overflow-hidden flex-shrink-0">
                <Image
                  src={trail.imageUrl}
                  alt={trail.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-text-primary line-clamp-1">
                  {trail.title}
                </h3>
                <p className="text-xs text-text-secondary">
                  Prof. {trail.teacher.name}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-text-secondary">Progresso</span>
                <span className="text-sm font-data text-text-primary">
                  {trail.progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${getProgressColor(trail.progress).split(' ')[1]}`}
                  style={{ width: `${trail.progress}%` }}
                />
              </div>
            </div>

            {/* Trail Stats */}
            <div className="grid grid-cols-2 gap-3 mb-3 text-xs text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="BookOpen" size={12} />
                <span>{trail.completedLessons}/{trail.totalLessons} lições</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>{formatLastAccessed(trail.lastAccessed)}</span>
              </div>
            </div>

            {/* Next Assignment */}
            {trail.nextAssignment && (
              <div className="mb-3 p-2 bg-accent/10 rounded-soft">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={12} className="text-accent" />
                  <span className="text-xs text-accent font-medium">
                    Próxima atividade: {trail.nextAssignment.title}
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  Prazo: {new Date(trail.nextAssignment.dueDate).toLocaleDateString('pt-BR')}
                </p>
              </div>
            )}

            {/* Teacher Feedback */}
            {trail.latestFeedback && (
              <div className="mb-3 p-2 bg-success/10 rounded-soft">
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={12} className="text-success" />
                  <span className="text-xs text-success font-medium">
                    Feedback recente
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                  {trail.latestFeedback}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={() => onContinueTrail(trail)}
                iconName="Play"
                iconPosition="left"
              >
                Continuar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewProgress(trail)}
                iconName="BarChart3"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Summary */}
      <div className="mt-6 pt-6 border-t border-border-muted">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-data font-bold text-primary">
              {enrolledTrails.reduce((sum, trail) => sum + trail.completedLessons, 0)}
            </p>
            <p className="text-xs text-text-secondary">Lições Completas</p>
          </div>
          <div>
            <p className="text-2xl font-data font-bold text-accent">
              {Math.round(enrolledTrails.reduce((sum, trail) => sum + trail.progress, 0) / enrolledTrails.length)}%
            </p>
            <p className="text-xs text-text-secondary">Progresso Médio</p>
          </div>
          <div>
            <p className="text-2xl font-data font-bold text-success">
              {enrolledTrails.filter(trail => trail.progress === 100).length}
            </p>
            <p className="text-xs text-text-secondary">Trilhas Concluídas</p>
          </div>
          <div>
            <p className="text-2xl font-data font-bold text-warning">
              {enrolledTrails.filter(trail => trail.nextAssignment).length}
            </p>
            <p className="text-xs text-text-secondary">Atividades Pendentes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTrailsSection;