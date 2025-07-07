import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityFeed = ({ activities, onViewActivity }) => {
  const getActivityIcon = (type) => {
    const icons = {
      lesson_completed: 'CheckCircle',
      quiz_completed: 'Award',
      achievement_earned: 'Trophy',
      conversation_started: 'MessageCircle',
      trail_joined: 'Map',
      class_joined: 'Users',
      concept_unlocked: 'Lightbulb',
      streak_milestone: 'Flame'
    };
    return icons[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      lesson_completed: 'text-success',
      quiz_completed: 'text-accent',
      achievement_earned: 'text-warning',
      conversation_started: 'text-secondary',
      trail_joined: 'text-primary',
      class_joined: 'text-primary',
      concept_unlocked: 'text-accent',
      streak_milestone: 'text-warning'
    };
    return colors[type] || 'text-text-secondary';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora';
    if (diffInMinutes < 60) return `${diffInMinutes}m atrás`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`;
    return `${Math.floor(diffInMinutes / 1440)}d atrás`;
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-surface rounded-soft p-6 shadow-soft border border-border">
        <div className="text-center">
          <div className="w-16 h-16 bg-text-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Activity" size={24} className="text-text-secondary" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
            Nenhuma Atividade Recente
          </h3>
          <p className="text-text-secondary">
            Suas atividades de aprendizado aparecerão aqui
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-soft p-6 shadow-soft border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Atividade Recente
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
        >
          Ver Histórico
        </Button>
      </div>

      <div className="space-y-3">
        {activities.slice(0, 8).map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-3 bg-background rounded-soft border border-border-muted hover:border-primary/30 transition-smooth cursor-pointer"
            onClick={() => onViewActivity && onViewActivity(activity)}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-background border ${getActivityColor(activity.type)}`}>
              <Icon name={getActivityIcon(activity.type)} size={16} className={getActivityColor(activity.type)} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">
                    {activity.title}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    {activity.description}
                  </p>
                  
                  {/* Additional Info */}
                  {activity.metadata && (
                    <div className="flex items-center space-x-3 mt-2">
                      {activity.metadata.score && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={12} className="text-accent" />
                          <span className="text-xs text-text-secondary">
                            {activity.metadata.score}%
                          </span>
                        </div>
                      )}
                      {activity.metadata.xpGained && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Zap" size={12} className="text-primary" />
                          <span className="text-xs text-text-secondary">
                            +{activity.metadata.xpGained} XP
                          </span>
                        </div>
                      )}
                      {activity.metadata.duration && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} className="text-text-secondary" />
                          <span className="text-xs text-text-secondary">
                            {activity.metadata.duration}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end space-y-1">
                  <span className="text-xs text-text-secondary">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                  {activity.isNew && (
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                      Novo
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Summary */}
      <div className="mt-6 pt-4 border-t border-border-muted">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-lg font-data font-bold text-success">
              {activities.filter(a => a.type === 'lesson_completed').length}
            </p>
            <p className="text-xs text-text-secondary">Lições</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-data font-bold text-accent">
              {activities.filter(a => a.type === 'quiz_completed').length}
            </p>
            <p className="text-xs text-text-secondary">Quizzes</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-data font-bold text-warning">
              {activities.filter(a => a.type === 'achievement_earned').length}
            </p>
            <p className="text-xs text-text-secondary">Conquistas</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-data font-bold text-secondary">
              {activities.filter(a => a.type === 'conversation_started').length}
            </p>
            <p className="text-xs text-text-secondary">Conversas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityFeed;