import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityFeed = ({ activities = [], notifications = [] }) => {
  const [activeTab, setActiveTab] = useState('activities');

  const mockActivities = [
    {
      id: 1,
      type: 'assignment_completed',
      student: 'Ana Silva',
      class: 'Filosofia Antiga - 1º Ano A',
      activity: 'Completou a trilha "Os Pré-Socráticos"',
      timestamp: new Date(Date.now() - 1800000),
      score: 85,
      icon: 'CheckCircle',
      color: 'text-success'
    },
    {
      id: 2,
      type: 'question_asked',
      student: 'Carlos Santos',
      class: 'Ética e Moral - 2º Ano B',
      activity: 'Fez uma pergunta sobre "O Imperativo Categórico de Kant"',
      timestamp: new Date(Date.now() - 3600000),
      icon: 'MessageCircle',
      color: 'text-primary'
    },
    {
      id: 3,
      type: 'discussion_started',
      student: 'Maria Oliveira',
      class: 'Filosofia Moderna - 3º Ano A',
      activity: 'Iniciou discussão sobre "Dualismo Cartesiano"',
      timestamp: new Date(Date.now() - 7200000),
      participants: 8,
      icon: 'Users',
      color: 'text-accent'
    },
    {
      id: 4,
      type: 'quiz_completed',
      student: 'João Costa',
      class: 'Lógica e Argumentação - 1º Ano C',
      activity: 'Completou quiz sobre "Falácias Lógicas"',
      timestamp: new Date(Date.now() - 10800000),
      score: 92,
      icon: 'Award',
      color: 'text-warning'
    },
    {
      id: 5,
      type: 'achievement_unlocked',
      student: 'Lucia Ferreira',
      class: 'Filosofia Antiga - 1º Ano A',
      activity: 'Desbloqueou conquista "Pensador Crítico"',
      timestamp: new Date(Date.now() - 14400000),
      icon: 'Trophy',
      color: 'text-accent'
    }
  ];

  const mockNotifications = [
    {
      id: 1,
      type: 'pending_approval',
      title: 'Solicitação de Entrada',
      message: 'Novo estudante solicitou entrada na turma "Filosofia Antiga - 1º Ano A"',
      timestamp: new Date(Date.now() - 900000),
      priority: 'high',
      icon: 'UserPlus',
      color: 'text-warning'
    },
    {
      id: 2,
      type: 'assignment_due',
      title: 'Prazo Próximo',
      message: 'Trilha "Ética Aristotélica" vence em 2 dias para 3º Ano A',
      timestamp: new Date(Date.now() - 1800000),
      priority: 'medium',
      icon: 'Clock',
      color: 'text-accent'
    },
    {
      id: 3,
      type: 'system_update',
      title: 'Atualização do Sistema',
      message: 'Nova funcionalidade de relatórios avançados disponível',
      timestamp: new Date(Date.now() - 3600000),
      priority: 'low',
      icon: 'Bell',
      color: 'text-primary'
    }
  ];

  const activityData = activities.length > 0 ? activities : mockActivities;
  const notificationData = notifications.length > 0 ? notifications : mockNotifications;

  const formatTime = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora';
    if (diffInMinutes < 60) return `${diffInMinutes}m atrás`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`;
    return `${Math.floor(diffInMinutes / 1440)}d atrás`;
  };

  const getActivityDescription = (activity) => {
    switch (activity.type) {
      case 'assignment_completed':
        return `${activity.student} completou uma atividade com ${activity.score}% de aproveitamento`;
      case 'question_asked':
        return `${activity.student} fez uma pergunta na discussão`;
      case 'discussion_started':
        return `${activity.student} iniciou uma discussão com ${activity.participants} participantes`;
      case 'quiz_completed':
        return `${activity.student} completou um quiz com ${activity.score}% de acerto`;
      case 'achievement_unlocked':
        return `${activity.student} desbloqueou uma nova conquista`;
      default:
        return activity.activity;
    }
  };

  return (
    <div className="bg-surface rounded-soft p-4 shadow-soft h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Atividades Recentes
        </h3>
        <div className="flex bg-background rounded-soft p-1">
          <button
            onClick={() => setActiveTab('activities')}
            className={`px-3 py-1 text-xs font-medium rounded-soft transition-smooth ${
              activeTab === 'activities' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-primary'
            }`}
          >
            Atividades
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-3 py-1 text-xs font-medium rounded-soft transition-smooth relative ${
              activeTab === 'notifications'
                ? 'bg-primary text-primary-foreground' :'text-text-secondary hover:text-primary'
            }`}
          >
            Notificações
            {notificationData.filter(n => n.priority === 'high').length > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activeTab === 'activities' ? (
          activityData.map((activity) => (
            <div
              key={activity.id}
              className="p-3 bg-background rounded-soft border border-border-muted hover:border-primary/30 transition-smooth"
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center ${activity.color}`}>
                  <Icon name={activity.icon} size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary line-clamp-2">
                        {getActivityDescription(activity)}
                      </p>
                      <p className="text-xs text-text-secondary mt-1">
                        {activity.class}
                      </p>
                    </div>
                    <span className="text-xs text-text-secondary whitespace-nowrap ml-2">
                      {formatTime(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          notificationData.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 bg-background rounded-soft border transition-smooth ${
                notification.priority === 'high' ?'border-warning bg-warning/5' :'border-border-muted hover:border-primary/30'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center ${notification.color}`}>
                  <Icon name={notification.icon} size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">
                        {notification.title}
                      </p>
                      <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                    </div>
                    <span className="text-xs text-text-secondary whitespace-nowrap ml-2">
                      {formatTime(notification.timestamp)}
                    </span>
                  </div>
                  {notification.priority === 'high' && (
                    <div className="mt-2 flex space-x-2">
                      <Button variant="primary" size="xs">
                        Aprovar
                      </Button>
                      <Button variant="ghost" size="xs">
                        Revisar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {(activeTab === 'activities' ? activityData : notificationData).length === 0 && (
        <div className="text-center py-8">
          <Icon 
            name={activeTab === 'activities' ? 'Activity' : 'Bell'} 
            size={32} 
            className="mx-auto mb-3 text-text-secondary opacity-50" 
          />
          <p className="text-sm text-text-secondary">
            {activeTab === 'activities' ? 'Nenhuma atividade recente' : 'Nenhuma notificação'}
          </p>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-border-muted">
        <Button
          variant="ghost"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
          className="w-full"
        >
          Ver todas as {activeTab === 'activities' ? 'atividades' : 'notificações'}
        </Button>
      </div>
    </div>
  );
};

export default RecentActivityFeed;