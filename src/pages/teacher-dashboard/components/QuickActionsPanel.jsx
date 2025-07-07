import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ onAction }) => {
  const [showInviteCode, setShowInviteCode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const generateInviteCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCode(code);
    setShowInviteCode(true);
    if (onAction) {
      onAction('generate_invite', { code });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here
    });
  };

  const quickActions = [
    {
      id: 'create_class',
      title: 'Criar Nova Turma',
      description: 'Configure uma nova turma com trilhas personalizadas',
      icon: 'Plus',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      action: () => onAction && onAction('create_class')
    },
    {
      id: 'invite_students',
      title: 'Convidar Estudantes',
      description: 'Gere códigos de convite para novos alunos',
      icon: 'UserPlus',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      action: generateInviteCode
    },
    {
      id: 'create_trail',
      title: 'Nova Trilha',
      description: 'Crie trilhas de aprendizado personalizadas',
      icon: 'Map',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      action: () => onAction && onAction('create_trail')
    },
    {
      id: 'view_reports',
      title: 'Relatórios',
      description: 'Analise o desempenho das suas turmas',
      icon: 'BarChart3',
      color: 'text-success',
      bgColor: 'bg-success/10',
      action: () => onAction && onAction('view_reports')
    }
  ];

  const recentActions = [
    {
      id: 1,
      title: 'Configurar API Key',
      description: 'Configure sua chave de API para IA personalizada',
      icon: 'Key',
      color: 'text-warning',
      action: () => onAction && onAction('configure_api')
    },
    {
      id: 2,
      title: 'Colaboradores',
      description: 'Convide outros professores para co-moderar',
      icon: 'Users',
      color: 'text-primary',
      action: () => onAction && onAction('manage_collaborators')
    },
    {
      id: 3,
      title: 'Backup de Dados',
      description: 'Exporte dados das suas turmas',
      icon: 'Download',
      color: 'text-secondary',
      action: () => onAction && onAction('export_data')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Quick Actions */}
      <div className="bg-surface rounded-soft p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Ações Rápidas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="p-4 bg-background rounded-soft border border-border-muted hover:border-primary/30 hover:shadow-soft transition-smooth text-left group"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 ${action.bgColor} rounded-soft flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon name={action.icon} size={20} className={action.color} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-text-primary group-hover:text-primary transition-smooth">
                    {action.title}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Invite Code Modal */}
      {showInviteCode && (
        <div className="bg-surface rounded-soft p-6 shadow-soft border border-accent/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-heading font-semibold text-text-primary">
              Código de Convite Gerado
            </h4>
            <button
              onClick={() => setShowInviteCode(false)}
              className="p-1 text-text-secondary hover:text-primary rounded-soft transition-smooth"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
              <Icon name="UserPlus" size={24} className="text-accent" />
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Compartilhe este código com seus estudantes para que possam entrar na turma:
            </p>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="px-4 py-2 bg-background border border-border rounded-soft">
                <span className="text-2xl font-data font-bold text-primary tracking-wider">
                  {generatedCode}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="Copy"
                onClick={() => copyToClipboard(generatedCode)}
              >
                Copiar
              </Button>
            </div>
            <p className="text-xs text-text-secondary">
              Este código é válido por 7 dias e pode ser usado por até 50 estudantes.
            </p>
          </div>
        </div>
      )}

      {/* Additional Actions */}
      <div className="bg-surface rounded-soft p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Configurações Avançadas
        </h3>
        <div className="space-y-3">
          {recentActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="w-full p-3 bg-background rounded-soft border border-border-muted hover:border-primary/30 transition-smooth text-left group"
            >
              <div className="flex items-center space-x-3">
                <Icon name={action.icon} size={16} className={`${action.color} group-hover:scale-110 transition-transform`} />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-text-primary group-hover:text-primary transition-smooth">
                    {action.title}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {action.description}
                  </p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-text-secondary group-hover:text-primary transition-smooth" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-soft p-6 border border-primary/10">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="HelpCircle" size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-text-primary mb-2">
              Precisa de Ajuda?
            </h4>
            <p className="text-xs text-text-secondary mb-3">
              Explore nossos guias e tutoriais para aproveitar ao máximo a plataforma Socrates Echo.
            </p>
            <div className="flex space-x-2">
              <Button variant="primary" size="xs">
                Ver Guias
              </Button>
              <Button variant="ghost" size="xs">
                Contato
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;