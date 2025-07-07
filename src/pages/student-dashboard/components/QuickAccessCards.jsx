import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickAccessCards = ({ onJoinClass, onBrowseTopics, onViewConversations }) => {
  const [joinCode, setJoinCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinClass = async () => {
    if (joinCode.length !== 6) return;
    
    setIsJoining(true);
    try {
      await onJoinClass(joinCode.toUpperCase());
      setJoinCode('');
    } catch (error) {
      console.error('Erro ao entrar na turma:', error);
    } finally {
      setIsJoining(false);
    }
  };

  const quickAccessItems = [
    {
      id: 'browse-topics',
      title: 'Explorar Tópicos',
      description: 'Descubra novos conceitos filosóficos e pensadores',
      icon: 'Search',
      color: 'primary',
      action: onBrowseTopics
    },
    {
      id: 'conversations',
      title: 'Conversas Recentes',
      description: 'Continue seus diálogos socráticos com a IA',
      icon: 'MessageCircle',
      color: 'secondary',
      action: onViewConversations
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Join Class Card */}
      <div className="bg-surface rounded-soft p-6 shadow-soft border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
            <Icon name="Users" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-text-primary">
              Entrar em Turma
            </h3>
            <p className="text-sm text-text-secondary">
              Use o código de 6 dígitos
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Input
            type="text"
            placeholder="ABC123"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase().slice(0, 6))}
            className="text-center font-data text-lg tracking-widest"
            maxLength={6}
          />
          <Button
            variant="accent"
            fullWidth
            onClick={handleJoinClass}
            disabled={joinCode.length !== 6 || isJoining}
            loading={isJoining}
            iconName="UserPlus"
          >
            {isJoining ? 'Entrando...' : 'Entrar na Turma'}
          </Button>
        </div>

        <div className="mt-4 p-3 bg-accent/5 rounded-soft border border-accent/20">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-accent mt-0.5" />
            <p className="text-xs text-text-secondary">
              Peça o código para seu professor ou encontre-o no quadro da sala
            </p>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      {quickAccessItems.map((item) => (
        <div
          key={item.id}
          className="bg-surface rounded-soft p-6 shadow-soft border border-border hover:border-primary/30 transition-smooth cursor-pointer group"
          onClick={item.action}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 bg-${item.color}/10 rounded-full flex items-center justify-center group-hover:bg-${item.color}/20 transition-smooth`}>
              <Icon name={item.icon} size={20} className={`text-${item.color}`} />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-text-primary group-hover:text-primary transition-smooth">
                {item.title}
              </h3>
            </div>
          </div>

          <p className="text-sm text-text-secondary mb-4">
            {item.description}
          </p>

          <div className="flex items-center text-primary group-hover:text-accent transition-smooth">
            <span className="text-sm font-medium">Acessar</span>
            <Icon name="ArrowRight" size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickAccessCards;