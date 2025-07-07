import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrailDetailsModal = ({ trail, isOpen, onClose, userRole, onEnroll, onEdit }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !trail) return null;

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: 'Info' },
    { id: 'lessons', label: 'Lições', icon: 'BookOpen' },
    { id: 'resources', label: 'Recursos', icon: 'Library' },
    ...(userRole === 'teacher' ? [{ id: 'analytics', label: 'Análises', icon: 'BarChart3' }] : [])
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Iniciante': return 'text-success bg-success/10';
      case 'Intermediário': return 'text-warning bg-warning/10';
      case 'Avançado': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-border';
    }
  };

  const getLessonTypeIcon = (type) => {
    switch (type) {
      case 'theory': return 'Book';
      case 'practice': return 'PenTool';
      case 'discussion': return 'MessageCircle';
      case 'assessment': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const getLessonTypeColor = (type) => {
    switch (type) {
      case 'theory': return 'text-primary bg-primary/10';
      case 'practice': return 'text-accent bg-accent/10';
      case 'discussion': return 'text-secondary bg-secondary/10';
      case 'assessment': return 'text-warning bg-warning/10';
      default: return 'text-text-secondary bg-border';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Trail Header */}
            <div className="flex items-start space-x-4">
              <div className="w-24 h-24 rounded-soft overflow-hidden flex-shrink-0">
                <Image
                  src={trail.imageUrl}
                  alt={trail.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
                  {trail.title}
                </h3>
                <p className="text-text-secondary mb-3">
                  {trail.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2 py-1 rounded-soft text-xs font-medium ${getDifficultyColor(trail.difficulty)}`}>
                    {trail.difficulty}
                  </span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-soft">
                    {trail.philosophyPeriod}
                  </span>
                  {trail.bnccAlignment && (
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-soft">
                      BNCC Alinhado
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Trail Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-background rounded-soft">
                <Icon name="Clock" size={20} className="text-primary mx-auto mb-1" />
                <p className="text-lg font-data font-semibold text-text-primary">
                  {trail.estimatedHours}h
                </p>
                <p className="text-xs text-text-secondary">Duração</p>
              </div>
              <div className="text-center p-3 bg-background rounded-soft">
                <Icon name="BookOpen" size={20} className="text-accent mx-auto mb-1" />
                <p className="text-lg font-data font-semibold text-text-primary">
                  {trail.lessonsCount}
                </p>
                <p className="text-xs text-text-secondary">Lições</p>
              </div>
              <div className="text-center p-3 bg-background rounded-soft">
                <Icon name="Users" size={20} className="text-secondary mx-auto mb-1" />
                <p className="text-lg font-data font-semibold text-text-primary">
                  {trail.studentsCount}
                </p>
                <p className="text-xs text-text-secondary">Estudantes</p>
              </div>
              <div className="text-center p-3 bg-background rounded-soft">
                <Icon name="Star" size={20} className="text-warning mx-auto mb-1" />
                <p className="text-lg font-data font-semibold text-text-primary">
                  {trail.rating || 'N/A'}
                </p>
                <p className="text-xs text-text-secondary">Avaliação</p>
              </div>
            </div>

            {/* Teacher Info */}
            {trail.teacher && (
              <div className="bg-background rounded-soft p-4">
                <h4 className="font-medium text-text-primary mb-3">Professor</h4>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{trail.teacher.name}</p>
                    <p className="text-sm text-text-secondary">{trail.teacher.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* BNCC Competencies */}
            {trail.bnccAlignment && trail.bnccCompetencies?.length > 0 && (
              <div className="bg-background rounded-soft p-4">
                <h4 className="font-medium text-text-primary mb-3">Competências BNCC</h4>
                <ul className="space-y-2">
                  {trail.bnccCompetencies.map((competency, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{competency}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Methodology */}
            {trail.methodology && (
              <div className="bg-background rounded-soft p-4">
                <h4 className="font-medium text-text-primary mb-3">Metodologia</h4>
                <p className="text-sm text-text-secondary">{trail.methodology}</p>
              </div>
            )}
          </div>
        );

      case 'lessons':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-text-primary">
                Lições ({trail.lessons?.length || 0})
              </h4>
              {trail.isEnrolled && (
                <div className="text-sm text-text-secondary">
                  Progresso: {trail.completedLessons || 0}/{trail.lessons?.length || 0}
                </div>
              )}
            </div>

            {trail.lessons?.length > 0 ? (
              <div className="space-y-3">
                {trail.lessons
                  .sort((a, b) => a.order - b.order)
                  .map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`bg-background border rounded-soft p-4 ${
                        trail.isEnrolled && index < (trail.completedLessons || 0)
                          ? 'border-success bg-success/5' :'border-border'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-border rounded-full text-sm font-data text-text-secondary">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h5 className="font-medium text-text-primary">
                                {lesson.title}
                              </h5>
                              <span className={`px-2 py-0.5 rounded-soft text-xs ${getLessonTypeColor(lesson.type)}`}>
                                <Icon name={getLessonTypeIcon(lesson.type)} size={12} className="inline mr-1" />
                                {lesson.type === 'theory' ? 'Teoria' :
                                 lesson.type === 'practice' ? 'Prática' :
                                 lesson.type === 'discussion' ? 'Discussão' : 'Avaliação'}
                              </span>
                            </div>
                            <p className="text-sm text-text-secondary mb-2">
                              {lesson.description}
                            </p>
                            <div className="flex items-center space-x-3 text-xs text-text-secondary">
                              <div className="flex items-center space-x-1">
                                <Icon name="Clock" size={12} />
                                <span>{lesson.duration}min</span>
                              </div>
                              {trail.isEnrolled && index < (trail.completedLessons || 0) && (
                                <div className="flex items-center space-x-1 text-success">
                                  <Icon name="CheckCircle" size={12} />
                                  <span>Concluída</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="BookOpen" size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
                <p className="text-text-secondary">Nenhuma lição disponível</p>
              </div>
            )}
          </div>
        );

      case 'resources':
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">
              Bibliografia e Recursos
            </h4>

            {trail.bibliography?.length > 0 ? (
              <div className="space-y-3">
                {trail.bibliography.map((resource, index) => (
                  <div key={resource.id || index} className="bg-background border border-border rounded-soft p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h5 className="font-medium text-text-primary">
                            {resource.title}
                          </h5>
                          {resource.required && (
                            <span className="px-2 py-0.5 bg-error/10 text-error text-xs rounded-soft">
                              Obrigatório
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-text-secondary mb-2">
                          {resource.author}
                        </p>
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-text-secondary capitalize">
                            {resource.type === 'book' ? 'Livro' :
                             resource.type === 'article' ? 'Artigo' :
                             resource.type === 'video' ? 'Vídeo' : 'Website'}
                          </span>
                          {resource.url && (
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:text-accent"
                            >
                              Acessar recurso
                            </a>
                          )}
                        </div>
                      </div>
                      <Icon 
                        name={resource.type === 'book' ? 'Book' :
                              resource.type === 'article' ? 'FileText' :
                              resource.type === 'video' ? 'Play' : 'Globe'} 
                        size={20} 
                        className="text-text-secondary" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="Library" size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
                <p className="text-text-secondary">Nenhum recurso disponível</p>
              </div>
            )}

            {/* Assessment Criteria */}
            {trail.assessmentCriteria?.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium text-text-primary mb-3">
                  Critérios de Avaliação
                </h4>
                <div className="space-y-2">
                  {trail.assessmentCriteria.map((criterion, index) => (
                    <div key={criterion.id || index} className="bg-background border border-border rounded-soft p-3">
                      <h5 className="font-medium text-text-primary mb-1">
                        {criterion.title}
                      </h5>
                      <p className="text-sm text-text-secondary">
                        {criterion.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <h4 className="font-medium text-text-primary">Análises da Trilha</h4>
            
            {/* Student Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-background rounded-soft p-4 text-center">
                <Icon name="Users" size={24} className="text-primary mx-auto mb-2" />
                <p className="text-2xl font-data font-bold text-text-primary">
                  {trail.studentsCount}
                </p>
                <p className="text-sm text-text-secondary">Estudantes Inscritos</p>
              </div>
              <div className="bg-background rounded-soft p-4 text-center">
                <Icon name="TrendingUp" size={24} className="text-success mx-auto mb-2" />
                <p className="text-2xl font-data font-bold text-text-primary">
                  {Math.round((trail.completedStudents || 0) / trail.studentsCount * 100)}%
                </p>
                <p className="text-sm text-text-secondary">Taxa de Conclusão</p>
              </div>
              <div className="bg-background rounded-soft p-4 text-center">
                <Icon name="Clock" size={24} className="text-accent mx-auto mb-2" />
                <p className="text-2xl font-data font-bold text-text-primary">
                  {trail.averageCompletionTime || 'N/A'}
                </p>
                <p className="text-sm text-text-secondary">Tempo Médio</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-background rounded-soft p-4">
              <h5 className="font-medium text-text-primary mb-3">Atividade Recente</h5>
              <div className="space-y-2">
                {trail.recentActivity?.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 py-2">
                    <Icon name="User" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">{activity.studentName}</span>
                    <span className="text-sm text-text-secondary">{activity.action}</span>
                    <span className="text-xs text-text-secondary ml-auto">
                      {new Date(activity.timestamp).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                )) || (
                  <p className="text-sm text-text-secondary">Nenhuma atividade recente</p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-text-primary/50 backdrop-blur-sm z-modal flex items-center justify-center p-4">
      <div className="bg-surface rounded-soft shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading text-xl font-semibold text-text-primary">
            Detalhes da Trilha
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Tabs */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex space-x-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-soft whitespace-nowrap transition-smooth ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-primary hover:bg-background'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Calendar" size={16} />
            <span>
              Criada em {new Date(trail.createdAt || Date.now()).toLocaleDateString('pt-BR')}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Fechar
            </Button>
            {userRole === 'student' && !trail.isEnrolled && (
              <Button
                variant="primary"
                onClick={() => onEnroll(trail)}
                iconName="Plus"
                iconPosition="left"
              >
                Inscrever-se
              </Button>
            )}
            {userRole === 'teacher' && (
              <Button
                variant="primary"
                onClick={() => onEdit(trail)}
                iconName="Edit"
                iconPosition="left"
              >
                Editar Trilha
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailDetailsModal;