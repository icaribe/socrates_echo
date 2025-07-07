import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrailCard = ({ trail, userRole, onEnroll, onViewProgress, onEdit, onViewDetails }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Iniciante': return 'text-success bg-success/10';
      case 'Intermediário': return 'text-warning bg-warning/10';
      case 'Avançado': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-border';
    }
  };

  const formatDuration = (hours) => {
    if (hours < 1) return `${Math.round(hours * 60)}min`;
    return `${hours}h`;
  };

  return (
    <div className="bg-surface rounded-soft shadow-soft overflow-hidden hover:shadow-elevated transition-smooth">
      {/* Trail Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={trail.imageUrl}
          alt={trail.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-text-primary/60 to-transparent" />
        
        {/* Difficulty Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-soft text-xs font-medium ${getDifficultyColor(trail.difficulty)}`}>
            {trail.difficulty}
          </span>
        </div>

        {/* Progress Overlay for Enrolled Trails */}
        {trail.isEnrolled && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-surface/90 backdrop-blur-sm rounded-soft p-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-text-secondary">Progresso</span>
                <span className="text-xs font-data text-text-primary">
                  {trail.progress}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${trail.progress}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Trail Content */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-heading text-lg font-semibold text-text-primary mb-1 line-clamp-2">
            {trail.title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2">
            {trail.description}
          </p>
        </div>

        {/* Trail Metadata */}
        <div className="flex items-center justify-between mb-3 text-xs text-text-secondary">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{formatDuration(trail.estimatedHours)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="BookOpen" size={12} />
              <span>{trail.lessonsCount} lições</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={12} />
              <span>{trail.studentsCount}</span>
            </div>
          </div>
          {trail.bnccAlignment && (
            <div className="flex items-center space-x-1">
              <Icon name="Award" size={12} className="text-accent" />
              <span className="text-accent">BNCC</span>
            </div>
          )}
        </div>

        {/* Philosophy Period Tag */}
        <div className="mb-3">
          <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-soft">
            <Icon name="Scroll" size={12} className="mr-1" />
            {trail.philosophyPeriod}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {userRole === 'student' ? (
            <>
              {trail.isEnrolled ? (
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => onViewProgress(trail)}
                  iconName="Play"
                  iconPosition="left"
                >
                  Continuar
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => onEnroll(trail)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Inscrever-se
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(trail)}
                iconName="Eye"
              />
            </>
          ) : (
            <>
              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={() => onEdit(trail)}
                iconName="Edit"
                iconPosition="left"
              >
                Editar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(trail)}
                iconName="BarChart3"
              />
            </>
          )}
        </div>

        {/* Teacher Info */}
        {trail.teacher && userRole === 'student' && (
          <div className="mt-3 pt-3 border-t border-border-muted">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={12} className="text-primary" />
              </div>
              <span className="text-xs text-text-secondary">
                Prof. {trail.teacher.name}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrailCard;