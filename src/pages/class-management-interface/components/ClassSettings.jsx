import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ClassSettings = ({ classData, onUpdateSettings, onDeleteClass }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    className: classData?.className || "Filosofia Moderna",
    description: classData?.description || "Explorando pensadores dos séculos XVII-XVIII",
    inviteCode: classData?.inviteCode || "FIL2024",
    maxStudents: classData?.maxStudents || 30,
    allowSelfEnrollment: classData?.allowSelfEnrollment || true,
    requireApproval: classData?.requireApproval || false,
    enableChat: classData?.enableChat || true,
    enableNotifications: classData?.enableNotifications || true,
    autoAssignTrails: classData?.autoAssignTrails || false,
    gradePassingScore: classData?.gradePassingScore || 70,
    language: classData?.language || 'pt-BR',
    timezone: classData?.timezone || 'America/Sao_Paulo'
  });

  const [coModerators, setCoModerators] = useState([
    {
      id: 1,
      name: "Prof. Maria Santos",
      email: "maria.santos@escola.edu.br",
      role: "co-moderator",
      permissions: ["view_students", "assign_trails", "grade_assignments"],
      joinDate: "2024-02-15"
    }
  ]);

  const [newModeratorEmail, setNewModeratorEmail] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    onUpdateSettings?.(settings);
  };

  const handleInviteModerator = () => {
    if (!newModeratorEmail.trim()) return;
    
    // Mock invitation logic
    const newModerator = {
      id: Date.now(),
      email: newModeratorEmail,
      role: "co-moderator",
      permissions: ["view_students"],
      status: "pending",
      inviteDate: new Date().toISOString()
    };
    
    setCoModerators(prev => [...prev, newModerator]);
    setNewModeratorEmail('');
  };

  const handleRemoveModerator = (moderatorId) => {
    setCoModerators(prev => prev.filter(mod => mod.id !== moderatorId));
  };

  const generateNewInviteCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    handleSettingChange('inviteCode', result);
  };

  const tabs = [
    { id: 'general', label: 'Geral', icon: 'Settings' },
    { id: 'enrollment', label: 'Inscrições', icon: 'UserPlus' },
    { id: 'moderators', label: 'Co-moderadores', icon: 'Users' },
    { id: 'notifications', label: 'Notificações', icon: 'Bell' },
    { id: 'advanced', label: 'Avançado', icon: 'Cog' }
  ];

  const permissions = [
    { id: 'view_students', label: 'Visualizar estudantes', description: 'Ver lista e perfis dos estudantes' },
    { id: 'assign_trails', label: 'Atribuir trilhas', description: 'Criar e atribuir trilhas de aprendizado' },
    { id: 'grade_assignments', label: 'Avaliar atividades', description: 'Corrigir e dar notas às atividades' },
    { id: 'manage_chat', label: 'Gerenciar chat', description: 'Moderar conversas e discussões' },
    { id: 'view_analytics', label: 'Ver relatórios', description: 'Acessar relatórios e análises' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-surface rounded-soft p-6 shadow-soft">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Configurações da Turma
            </h2>
            <p className="text-text-secondary">
              Gerencie as configurações e permissões da sua turma
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Download"
              onClick={() => onUpdateSettings?.('export')}
            >
              Exportar Dados
            </Button>
            <Button
              variant="primary"
              iconName="Save"
              onClick={handleSaveSettings}
            >
              Salvar Alterações
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-surface rounded-soft shadow-soft overflow-hidden">
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-smooth ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-primary hover:bg-background'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Nome da Turma
                  </label>
                  <Input
                    type="text"
                    value={settings.className}
                    onChange={(e) => handleSettingChange('className', e.target.value)}
                    placeholder="Digite o nome da turma"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Máximo de Estudantes
                  </label>
                  <Input
                    type="number"
                    value={settings.maxStudents}
                    onChange={(e) => handleSettingChange('maxStudents', parseInt(e.target.value))}
                    min="1"
                    max="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Descrição
                </label>
                <textarea
                  value={settings.description}
                  onChange={(e) => handleSettingChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-background border border-border rounded-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth resize-none"
                  placeholder="Descreva o objetivo e conteúdo da turma"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Idioma
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Fuso Horário
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleSettingChange('timezone', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
                  >
                    <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                    <option value="America/New_York">New York (GMT-5)</option>
                    <option value="Europe/London">London (GMT+0)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Enrollment Settings */}
          {activeTab === 'enrollment' && (
            <div className="space-y-6">
              <div className="bg-background rounded-soft p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-text-primary">
                      Código de Convite
                    </h3>
                    <p className="text-sm text-text-secondary">
                      Estudantes podem usar este código para se inscrever na turma
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RefreshCw"
                    onClick={generateNewInviteCode}
                  >
                    Gerar Novo
                  </Button>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      value={settings.inviteCode}
                      readOnly
                      className="font-data text-lg text-center"
                    />
                  </div>
                  <Button
                    variant="outline"
                    iconName="Copy"
                    onClick={() => navigator.clipboard.writeText(settings.inviteCode)}
                  >
                    Copiar
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">
                      Permitir Auto-inscrição
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Estudantes podem se inscrever automaticamente com o código
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.allowSelfEnrollment}
                      onChange={(e) => handleSettingChange('allowSelfEnrollment', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">
                      Requer Aprovação
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Novas inscrições precisam ser aprovadas pelo professor
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.requireApproval}
                      onChange={(e) => handleSettingChange('requireApproval', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Co-moderators */}
          {activeTab === 'moderators' && (
            <div className="space-y-6">
              <div className="bg-background rounded-soft p-4">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Convidar Co-moderador
                </h3>
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <Input
                      type="email"
                      value={newModeratorEmail}
                      onChange={(e) => setNewModeratorEmail(e.target.value)}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <Button
                    variant="primary"
                    iconName="Send"
                    onClick={handleInviteModerator}
                    disabled={!newModeratorEmail.trim()}
                  >
                    Convidar
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  Co-moderadores Atuais
                </h3>
                
                {coModerators.map((moderator) => (
                  <div key={moderator.id} className="bg-background rounded-soft p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon name="User" size={18} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary">
                            {moderator.name || moderator.email}
                          </h4>
                          <p className="text-sm text-text-secondary">{moderator.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-soft text-xs font-medium ${
                          moderator.status === 'pending' ?'bg-warning/10 text-warning' :'bg-success/10 text-success'
                        }`}>
                          {moderator.status === 'pending' ? 'Pendente' : 'Ativo'}
                        </span>
                        <Button
                          variant="danger"
                          size="sm"
                          iconName="X"
                          onClick={() => handleRemoveModerator(moderator.id)}
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-text-primary mb-2">Permissões:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {permissions.map((permission) => (
                          <label key={permission.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={moderator.permissions?.includes(permission.id)}
                              onChange={(e) => {
                                const updatedModerators = coModerators.map(mod => {
                                  if (mod.id === moderator.id) {
                                    const permissions = mod.permissions || [];
                                    return {
                                      ...mod,
                                      permissions: e.target.checked
                                        ? [...permissions, permission.id]
                                        : permissions.filter(p => p !== permission.id)
                                    };
                                  }
                                  return mod;
                                });
                                setCoModerators(updatedModerators);
                              }}
                              className="rounded border-border focus:ring-primary"
                            />
                            <div>
                              <span className="text-sm text-text-primary">{permission.label}</span>
                              <p className="text-xs text-text-secondary">{permission.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                {coModerators.length === 0 && (
                  <div className="text-center py-8">
                    <Icon name="Users" size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
                    <p className="text-text-secondary">Nenhum co-moderador convidado ainda</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">
                      Notificações Gerais
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Receber notificações sobre atividades da turma
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableNotifications}
                      onChange={(e) => handleSettingChange('enableNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">
                      Chat da Turma
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Permitir conversas entre estudantes e professores
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableChat}
                      onChange={(e) => handleSettingChange('enableChat', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">
                      Auto-atribuir Trilhas
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Atribuir automaticamente trilhas para novos estudantes
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoAssignTrails}
                      onChange={(e) => handleSettingChange('autoAssignTrails', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Settings */}
          {activeTab === 'advanced' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Nota Mínima para Aprovação (%)
                </label>
                <Input
                  type="number"
                  value={settings.gradePassingScore}
                  onChange={(e) => handleSettingChange('gradePassingScore', parseInt(e.target.value))}
                  min="0"
                  max="100"
                />
              </div>

              <div className="bg-error/10 border border-error/20 rounded-soft p-4">
                <h3 className="text-lg font-heading font-semibold text-error mb-2">
                  Zona de Perigo
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Estas ações são irreversíveis. Proceda com cuidado.
                </p>
                
                <Button
                  variant="danger"
                  iconName="Trash2"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  Excluir Turma
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-text-primary/50 flex items-center justify-center z-modal">
          <div className="bg-surface rounded-soft p-6 max-w-md w-full mx-4 shadow-elevated">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={24} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  Confirmar Exclusão
                </h3>
                <p className="text-sm text-text-secondary">
                  Esta ação não pode ser desfeita
                </p>
              </div>
            </div>
            
            <p className="text-sm text-text-secondary mb-6">
              Tem certeza que deseja excluir a turma "{settings.className}"? 
              Todos os dados dos estudantes e progresso serão perdidos permanentemente.
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  onDeleteClass?.();
                  setShowDeleteConfirm(false);
                }}
                className="flex-1"
              >
                Excluir Turma
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassSettings;