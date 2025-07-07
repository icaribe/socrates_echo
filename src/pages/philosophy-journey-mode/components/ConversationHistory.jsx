import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConversationHistory = ({ 
  conversations = [], 
  onConversationSelect,
  onConversationDelete,
  onExportHistory,
  isVisible,
  onClose,
  className = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all'); // 'all', 'today', 'week', 'month'
  const [selectedConversations, setSelectedConversations] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  const filterConversations = () => {
    let filtered = conversations;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(conv => 
        conv.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.philosopher?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.concept?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    switch (filterBy) {
      case 'today':
        filtered = filtered.filter(conv => new Date(conv.timestamp) >= today);
        break;
      case 'week':
        filtered = filtered.filter(conv => new Date(conv.timestamp) >= weekAgo);
        break;
      case 'month':
        filtered = filtered.filter(conv => new Date(conv.timestamp) >= monthAgo);
        break;
      default:
        break;
    }

    return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Agora mesmo';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h atrás`;
    } else if (diffInHours < 48) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit',
        year: '2-digit'
      });
    }
  };

  const getPhilosopherIcon = (philosopher) => {
    const icons = {
      'Sócrates': 'MessageCircle',
      'Platão': 'Eye',
      'Aristóteles': 'Target',
      'Descartes': 'Search',
      'Kant': 'Brain',
      'Nietzsche': 'Zap'
    };
    return icons[philosopher] || 'User';
  };

  const handleConversationToggle = (conversationId) => {
    setSelectedConversations(prev => 
      prev.includes(conversationId)
        ? prev.filter(id => id !== conversationId)
        : [...prev, conversationId]
    );
  };

  const handleBulkDelete = () => {
    selectedConversations.forEach(id => {
      onConversationDelete(id);
    });
    setSelectedConversations([]);
  };

  const handleExport = () => {
    const conversationsToExport = selectedConversations.length > 0 
      ? conversations.filter(conv => selectedConversations.includes(conv.id))
      : filteredConversations;
    
    onExportHistory(conversationsToExport);
  };

  const filteredConversations = filterConversations();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-text-primary/50 backdrop-blur-sm z-modal flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className={`w-full max-w-4xl h-[80vh] bg-surface rounded-soft shadow-elevated flex flex-col ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-heading font-semibold text-text-primary">
              Histórico de Conversas
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              {filteredConversations.length} conversas encontradas
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {selectedConversations.length > 0 && (
              <>
                <Button
                  variant="ghost"
                  onClick={handleExport}
                  iconName="Download"
                  size="sm"
                >
                  Exportar ({selectedConversations.length})
                </Button>
                <Button
                  variant="danger"
                  onClick={handleBulkDelete}
                  iconName="Trash2"
                  size="sm"
                >
                  Excluir ({selectedConversations.length})
                </Button>
              </>
            )}
            
            <Button
              variant="ghost"
              onClick={onClose}
              iconName="X"
              size="sm"
            />
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-6 border-b border-border-muted space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Buscar por título, filósofo ou conceito..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex space-x-2">
              {['all', 'today', 'week', 'month'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setFilterBy(filter)}
                  className={`px-3 py-2 text-sm rounded-soft transition-smooth ${
                    filterBy === filter
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-text-secondary hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  {filter === 'all' ? 'Todas' : 
                   filter === 'today' ? 'Hoje' :
                   filter === 'week' ? 'Semana' : 'Mês'}
                </button>
              ))}
            </div>
          </div>

          {selectedConversations.length > 0 && (
            <div className="flex items-center justify-between bg-accent/10 rounded-soft p-3">
              <span className="text-sm text-accent">
                {selectedConversations.length} conversas selecionadas
              </span>
              <button
                onClick={() => setSelectedConversations([])}
                className="text-sm text-accent hover:text-accent/80"
              >
                Limpar seleção
              </button>
            </div>
          )}
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredConversations.length > 0 ? (
            <div className="space-y-3">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`border border-border rounded-soft p-4 hover:bg-background transition-smooth ${
                    selectedConversations.includes(conversation.id) ? 'bg-primary/5 border-primary' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedConversations.includes(conversation.id)}
                      onChange={() => handleConversationToggle(conversation.id)}
                      className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary/50"
                    />
                    
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon 
                        name={getPhilosopherIcon(conversation.philosopher)} 
                        size={18} 
                        className="text-primary" 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-text-primary truncate">
                            {conversation.title || `Conversa com ${conversation.philosopher}`}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-text-secondary">
                              {conversation.philosopher}
                            </span>
                            {conversation.concept && (
                              <>
                                <span className="text-text-secondary">•</span>
                                <span className="text-sm text-accent">
                                  {conversation.concept}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <span className="text-xs text-text-secondary whitespace-nowrap">
                            {formatDate(conversation.timestamp)}
                          </span>
                          
                          <div className="flex space-x-1">
                            <button
                              onClick={() => onConversationSelect(conversation)}
                              className="p-1 text-text-secondary hover:text-primary rounded transition-smooth"
                              title="Abrir conversa"
                            >
                              <Icon name="Eye" size={14} />
                            </button>
                            
                            <button
                              onClick={() => onConversationDelete(conversation.id)}
                              className="p-1 text-text-secondary hover:text-error rounded transition-smooth"
                              title="Excluir conversa"
                            >
                              <Icon name="Trash2" size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {conversation.preview && (
                        <p className="text-sm text-text-secondary mt-2 line-clamp-2">
                          {conversation.preview}
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-4 mt-3 text-xs text-text-secondary">
                        <div className="flex items-center space-x-1">
                          <Icon name="MessageCircle" size={12} />
                          <span>{conversation.messageCount || 0} mensagens</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{conversation.duration || '0min'}</span>
                        </div>
                        
                        {conversation.xpGained && (
                          <div className="flex items-center space-x-1">
                            <Icon name="Star" size={12} />
                            <span>+{conversation.xpGained} XP</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Nenhuma conversa encontrada
              </h3>
              <p className="text-text-secondary">
                {searchTerm || filterBy !== 'all' ?'Tente ajustar os filtros de busca' :'Suas conversas filosóficas aparecerão aqui'
                }
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Total de {conversations.length} conversas salvas
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={handleExport}
              iconName="Download"
              size="sm"
            >
              Exportar Todas
            </Button>
            
            <Button
              variant="primary"
              onClick={onClose}
              size="sm"
            >
              Fechar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationHistory;