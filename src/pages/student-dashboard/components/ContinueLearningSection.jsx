import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContinueLearningSection = ({ activeTrails, onContinueTrail, onStartJourney }) => {
  if (!activeTrails || activeTrails.length === 0) {
    return (
      <div className="bg-surface rounded-soft p-6 shadow-soft border border-border">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Compass" size={24} className="text-primary" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
            Comece sua Jornada Filosófica
          </h3>
          <p className="text-text-secondary mb-4">
            Descubra os mistérios da filosofia através de diálogos socráticos interativos
          </p>
          <Button
            variant="primary"
            onClick={onStartJourney}
            iconName="Play"
            iconPosition="left"
          >
            Iniciar Jornada
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-soft p-6 shadow-soft border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Continue Aprendendo
        </h3>
        <Button
          variant="ghost"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => onContinueTrail('all')}
        >
          Ver Todas
        </Button>
      </div>

      <div className="space-y-4">
        {activeTrails.slice(0, 3).map((trail) => (
          <div
            key={trail.id}
            className="bg-background rounded-soft p-4 border border-border-muted hover:border-primary/30 transition-smooth"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name={trail.icon || "BookOpen"} size={16} className="text-primary" />
                  <h4 className="font-medium text-text-primary">{trail.title}</h4>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                    {trail.difficulty}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                  {trail.description}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-text-secondary">Progresso</span>
                    <span className="font-data text-text-primary">
                      {trail.completedLessons}/{trail.totalLessons} lições
                    </span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                      style={{ width: `${(trail.completedLessons / trail.totalLessons) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Next Lesson Info */}
                {trail.nextLesson && (
                  <div className="mt-3 p-2 bg-primary/5 rounded-soft border-l-2 border-primary">
                    <p className="text-xs text-text-secondary">Próxima lição:</p>
                    <p className="text-sm font-medium text-text-primary">
                      {trail.nextLesson.title}
                    </p>
                  </div>
                )}
              </div>

              <div className="ml-4 flex flex-col space-y-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onContinueTrail(trail.id)}
                  iconName="Play"
                >
                  Continuar
                </Button>
                {trail.estimatedTime && (
                  <div className="flex items-center space-x-1 text-xs text-text-secondary">
                    <Icon name="Clock" size={12} />
                    <span>{trail.estimatedTime}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Start Journey Button */}
      <div className="mt-6 pt-4 border-t border-border-muted">
        <Button
          variant="outline"
          fullWidth
          onClick={onStartJourney}
          iconName="Compass"
          iconPosition="left"
        >
          Iniciar Nova Jornada Socrática
        </Button>
      </div>
    </div>
  );
};

export default ContinueLearningSection;