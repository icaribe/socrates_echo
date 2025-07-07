import React from 'react';
import Icon from '../../../components/AppIcon';

const ClassOverview = ({ classData, enrollmentStats, performanceData }) => {
  const {
    className = "Filosofia Moderna",
    description = "Explorando pensadores dos séculos XVII-XVIII",
    createdDate = "2024-01-15",
    totalStudents = 28,
    activeStudents = 24,
    completedAssignments = 156,
    averageProgress = 72
  } = classData || {};

  const {
    newEnrollments = 3,
    activeThisWeek = 22,
    completionRate = 68
  } = enrollmentStats || {};

  const chartData = performanceData || [
    { name: 'Jan', progress: 45 },
    { name: 'Fev', progress: 52 },
    { name: 'Mar', progress: 61 },
    { name: 'Abr', progress: 72 }
  ];

  const recentActivities = [
    {
      id: 1,
      student: "Ana Silva",
      action: "Completou trilha \'Descartes e o Racionalismo'",
      timestamp: "2 horas atrás",
      type: "completion"
    },
    {
      id: 2,
      student: "Carlos Santos",
      action: "Iniciou discussão sobre \'O Cogito Cartesiano'",
      timestamp: "4 horas atrás",
      type: "discussion"
    },
    {
      id: 3,
      student: "Maria Oliveira",
      action: "Submeteu ensaio sobre Spinoza",
      timestamp: "1 dia atrás",
      type: "submission"
    }
  ];

  const getActivityIcon = (type) => {
    const icons = {
      completion: 'CheckCircle',
      discussion: 'MessageCircle',
      submission: 'FileText'
    };
    return icons[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      completion: 'text-success',
      discussion: 'text-accent',
      submission: 'text-primary'
    };
    return colors[type] || 'text-text-secondary';
  };

  return (
    <div className="space-y-6">
      {/* Class Header */}
      <div className="bg-surface rounded-soft p-6 shadow-soft">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
              {className}
            </h2>
            <p className="text-text-secondary mb-4 lg:mb-0">
              {description}
            </p>
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={16} />
                <span>Criada em {new Date(createdDate).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={16} />
                <span>{totalStudents} estudantes</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-soft hover:bg-primary/90 transition-smooth">
              <Icon name="UserPlus" size={16} />
              <span>Convidar Estudantes</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-background border border-border text-text-primary rounded-soft hover:bg-surface transition-smooth">
              <Icon name="Settings" size={16} />
              <span>Configurações</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface rounded-soft p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total de Estudantes</p>
              <p className="text-2xl font-data font-semibold text-text-primary">{totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-soft flex items-center justify-center">
              <Icon name="Users" size={24} className="text-primary" />
            </div>
          </div>
          <div className="mt-2 flex items-center space-x-1">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span className="text-xs text-success">+{newEnrollments} novos</span>
          </div>
        </div>

        <div className="bg-surface rounded-soft p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Ativos Esta Semana</p>
              <p className="text-2xl font-data font-semibold text-text-primary">{activeThisWeek}</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-soft flex items-center justify-center">
              <Icon name="Activity" size={24} className="text-accent" />
            </div>
          </div>
          <div className="mt-2 flex items-center space-x-1">
            <span className="text-xs text-text-secondary">
              {Math.round((activeThisWeek / totalStudents) * 100)}% do total
            </span>
          </div>
        </div>

        <div className="bg-surface rounded-soft p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Progresso Médio</p>
              <p className="text-2xl font-data font-semibold text-text-primary">{averageProgress}%</p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-soft flex items-center justify-center">
              <Icon name="Target" size={24} className="text-success" />
            </div>
          </div>
          <div className="mt-2 w-full bg-border rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-all duration-300"
              style={{ width: `${averageProgress}%` }}
            />
          </div>
        </div>

        <div className="bg-surface rounded-soft p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Taxa de Conclusão</p>
              <p className="text-2xl font-data font-semibold text-text-primary">{completionRate}%</p>
            </div>
            <div className="w-12 h-12 bg-warning/10 rounded-soft flex items-center justify-center">
              <Icon name="Award" size={24} className="text-warning" />
            </div>
          </div>
          <div className="mt-2 flex items-center space-x-1">
            <span className="text-xs text-text-secondary">
              {completedAssignments} atividades completas
            </span>
          </div>
        </div>
      </div>

      {/* Progress Chart and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <div className="bg-surface rounded-soft p-6 shadow-soft">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Progresso da Turma
          </h3>
          <div className="space-y-4">
            {chartData.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-text-secondary w-12">{month.name}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                      style={{ width: `${month.progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-data text-text-primary w-12 text-right">
                  {month.progress}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-surface rounded-soft p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Atividade Recente
            </h3>
            <button className="text-sm text-primary hover:text-accent transition-smooth">
              Ver todas
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`flex-shrink-0 ${getActivityColor(activity.type)}`}>
                  <Icon name={getActivityIcon(activity.type)} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary">
                    <span className="font-medium">{activity.student}</span> {activity.action}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassOverview;