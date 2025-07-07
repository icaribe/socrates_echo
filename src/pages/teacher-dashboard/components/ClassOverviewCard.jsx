import React from 'react';
import Icon from '../../../components/AppIcon';

const ClassOverviewCard = ({ classData = {} }) => {
  const {
    totalClasses = 0,
    totalStudents = 0,
    activeTrails = 0,
    completionRate = 0,
    engagementScore = 0
  } = classData;

  const stats = [
    {
      label: 'Turmas Ativas',
      value: totalClasses,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Estudantes',
      value: totalStudents,
      icon: 'GraduationCap',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Trilhas Ativas',
      value: activeTrails,
      icon: 'Map',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      label: 'Taxa de Conclusão',
      value: `${completionRate}%`,
      icon: 'Target',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="bg-surface rounded-soft p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Visão Geral das Turmas
        </h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm text-text-secondary">Engajamento: {engagementScore}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-background rounded-soft p-4 border border-border-muted">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-heading font-bold text-text-primary">
                  {stat.value}
                </p>
                <p className="text-sm text-text-secondary mt-1">
                  {stat.label}
                </p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-soft flex items-center justify-center`}>
                <Icon name={stat.icon} size={24} className={stat.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-accent/5 rounded-soft border border-accent/20">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="TrendingUp" size={16} className="text-accent" />
          <span className="text-sm font-medium text-text-primary">Desempenho Semanal</span>
        </div>
        <p className="text-sm text-text-secondary">
          Suas turmas apresentaram um aumento de 12% no engajamento esta semana. 
          Continue incentivando a participação nas discussões filosóficas!
        </p>
      </div>
    </div>
  );
};

export default ClassOverviewCard;