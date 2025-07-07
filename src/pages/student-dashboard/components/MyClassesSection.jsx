import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MyClassesSection = ({ classes, onViewClass, onViewAssignment }) => {
  if (!classes || classes.length === 0) {
    return (
      <div className="bg-surface rounded-soft p-6 shadow-soft border border-border">
        <div className="text-center">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="GraduationCap" size={24} className="text-secondary" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
            Nenhuma Turma Encontrada
          </h3>
          <p className="text-text-secondary mb-4">
            Entre em uma turma usando o código fornecido pelo seu professor
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-soft p-6 shadow-soft border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Minhas Turmas
        </h3>
        <span className="text-sm text-text-secondary">
          {classes.length} turma{classes.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-4">
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-background rounded-soft p-4 border border-border-muted hover:border-primary/30 transition-smooth"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Users" size={16} className="text-primary" />
                  <h4 className="font-medium text-text-primary">{classItem.name}</h4>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {classItem.code}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-2">
                  Professor: {classItem.teacher}
                </p>
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{classItem.studentCount} alunos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="BookOpen" size={12} />
                    <span>{classItem.trailCount} trilhas</span>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewClass(classItem.id)}
                iconName="ExternalLink"
              >
                Abrir
              </Button>
            </div>

            {/* Pending Assignments */}
            {classItem.pendingAssignments && classItem.pendingAssignments.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-text-primary">
                  Atividades Pendentes
                </h5>
                {classItem.pendingAssignments.slice(0, 2).map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between p-2 bg-warning/5 rounded-soft border border-warning/20"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={14} className="text-warning" />
                      <span className="text-sm text-text-primary">
                        {assignment.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-text-secondary">
                        Prazo: {assignment.dueDate}
                      </span>
                      <Button
                        variant="warning"
                        size="xs"
                        onClick={() => onViewAssignment(assignment.id)}
                      >
                        Ver
                      </Button>
                    </div>
                  </div>
                ))}
                {classItem.pendingAssignments.length > 2 && (
                  <p className="text-xs text-text-secondary">
                    +{classItem.pendingAssignments.length - 2} atividades pendentes
                  </p>
                )}
              </div>
            )}

            {/* Recent Activity */}
            {classItem.recentActivity && (
              <div className="mt-3 pt-3 border-t border-border-muted">
                <div className="flex items-center space-x-2">
                  <Icon name="Activity" size={14} className="text-accent" />
                  <span className="text-xs text-text-secondary">
                    Última atividade: {classItem.recentActivity}
                  </span>
                </div>
              </div>
            )}

            {/* Chat Notifications */}
            {classItem.unreadMessages > 0 && (
              <div className="mt-2 flex items-center space-x-2">
                <Icon name="MessageCircle" size={14} className="text-secondary" />
                <span className="text-xs text-secondary">
                  {classItem.unreadMessages} mensagem{classItem.unreadMessages !== 1 ? 's' : ''} não lida{classItem.unreadMessages !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClassesSection;