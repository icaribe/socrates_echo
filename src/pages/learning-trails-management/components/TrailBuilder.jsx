import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const TrailBuilder = ({ isOpen, onClose, onSave, editingTrail = null }) => {
  const [trailData, setTrailData] = useState({
    title: editingTrail?.title || '',
    description: editingTrail?.description || '',
    difficulty: editingTrail?.difficulty || 'Iniciante',
    philosophyPeriod: editingTrail?.philosophyPeriod || 'Filosofia Clássica',
    estimatedHours: editingTrail?.estimatedHours || 1,
    bnccAlignment: editingTrail?.bnccAlignment || false,
    bnccCompetencies: editingTrail?.bnccCompetencies || [],
    lessons: editingTrail?.lessons || [],
    bibliography: editingTrail?.bibliography || [],
    methodology: editingTrail?.methodology || '',
    assessmentCriteria: editingTrail?.assessmentCriteria || []
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [draggedLesson, setDraggedLesson] = useState(null);

  const steps = [
    { id: 'basic', title: 'Informações Básicas', icon: 'Info' },
    { id: 'lessons', title: 'Lições', icon: 'BookOpen' },
    { id: 'bncc', title: 'Alinhamento BNCC', icon: 'Award' },
    { id: 'assessment', title: 'Avaliação', icon: 'CheckCircle' },
    { id: 'resources', title: 'Recursos', icon: 'Library' }
  ];

  const philosophyPeriods = [
    'Pré-Socráticos',
    'Filosofia Clássica',
    'Filosofia Medieval',
    'Renascimento',
    'Filosofia Moderna',
    'Iluminismo',
    'Filosofia Contemporânea'
  ];

  const bnccCompetencies = [
    'Investigar e analisar diferentes formas de expressão que envolvam a experiência humana',
    'Problematizar questões filosóficas fundamentais',
    'Elaborar hipóteses filosóficas consistentes',
    'Argumentar com base em diferentes referenciais teóricos',
    'Debater questões filosóficas de forma fundamentada'
  ];

  const handleInputChange = (field, value) => {
    setTrailData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addLesson = () => {
    const newLesson = {
      id: Date.now(),
      title: '',
      description: '',
      content: '',
      duration: 30,
      type: 'theory', // theory, practice, discussion, assessment
      order: trailData.lessons.length
    };
    
    setTrailData(prev => ({
      ...prev,
      lessons: [...prev.lessons, newLesson]
    }));
  };

  const updateLesson = (lessonId, field, value) => {
    setTrailData(prev => ({
      ...prev,
      lessons: prev.lessons.map(lesson =>
        lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
      )
    }));
  };

  const removeLesson = (lessonId) => {
    setTrailData(prev => ({
      ...prev,
      lessons: prev.lessons.filter(lesson => lesson.id !== lessonId)
    }));
  };

  const handleDragStart = (e, lesson) => {
    setDraggedLesson(lesson);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetLesson) => {
    e.preventDefault();
    if (!draggedLesson || draggedLesson.id === targetLesson.id) return;

    const lessons = [...trailData.lessons];
    const draggedIndex = lessons.findIndex(l => l.id === draggedLesson.id);
    const targetIndex = lessons.findIndex(l => l.id === targetLesson.id);

    lessons.splice(draggedIndex, 1);
    lessons.splice(targetIndex, 0, draggedLesson);

    // Update order
    lessons.forEach((lesson, index) => {
      lesson.order = index;
    });

    setTrailData(prev => ({
      ...prev,
      lessons
    }));
    setDraggedLesson(null);
  };

  const addBibliographyItem = () => {
    const newItem = {
      id: Date.now(),
      title: '',
      author: '',
      type: 'book', // book, article, video, website
      url: '',
      required: false
    };
    
    setTrailData(prev => ({
      ...prev,
      bibliography: [...prev.bibliography, newItem]
    }));
  };

  const updateBibliographyItem = (itemId, field, value) => {
    setTrailData(prev => ({
      ...prev,
      bibliography: prev.bibliography.map(item =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeBibliographyItem = (itemId) => {
    setTrailData(prev => ({
      ...prev,
      bibliography: prev.bibliography.filter(item => item.id !== itemId)
    }));
  };

  const addAssessmentCriterion = () => {
    const newCriterion = {
      id: Date.now(),
      title: '',
      description: '',
      weight: 1
    };
    
    setTrailData(prev => ({
      ...prev,
      assessmentCriteria: [...prev.assessmentCriteria, newCriterion]
    }));
  };

  const updateAssessmentCriterion = (criterionId, field, value) => {
    setTrailData(prev => ({
      ...prev,
      assessmentCriteria: prev.assessmentCriteria.map(criterion =>
        criterion.id === criterionId ? { ...criterion, [field]: value } : criterion
      )
    }));
  };

  const removeAssessmentCriterion = (criterionId) => {
    setTrailData(prev => ({
      ...prev,
      assessmentCriteria: prev.assessmentCriteria.filter(criterion => criterion.id !== criterionId)
    }));
  };

  const handleSave = () => {
    onSave(trailData);
    onClose();
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'basic':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Título da Trilha *
              </label>
              <Input
                type="text"
                value={trailData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Ex: Introdução à Ética Aristotélica"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Descrição *
              </label>
              <textarea
                value={trailData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descreva os objetivos e conteúdo da trilha..."
                rows={4}
                className="w-full px-3 py-2 bg-background border border-border rounded-soft text-text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Período Filosófico
                </label>
                <select
                  value={trailData.philosophyPeriod}
                  onChange={(e) => handleInputChange('philosophyPeriod', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-soft text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {philosophyPeriods.map(period => (
                    <option key={period} value={period}>{period}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Nível de Dificuldade
                </label>
                <select
                  value={trailData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-soft text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Duração Estimada (horas)
              </label>
              <Input
                type="number"
                value={trailData.estimatedHours}
                onChange={(e) => handleInputChange('estimatedHours', parseInt(e.target.value))}
                min="1"
                max="100"
              />
            </div>
          </div>
        );

      case 'lessons':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold text-text-primary">
                Lições da Trilha
              </h3>
              <Button
                variant="primary"
                size="sm"
                onClick={addLesson}
                iconName="Plus"
                iconPosition="left"
              >
                Adicionar Lição
              </Button>
            </div>

            {trailData.lessons.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="BookOpen" size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
                <p className="text-text-secondary">Nenhuma lição adicionada ainda</p>
              </div>
            ) : (
              <div className="space-y-3">
                {trailData.lessons
                  .sort((a, b) => a.order - b.order)
                  .map((lesson, index) => (
                    <div
                      key={lesson.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lesson)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, lesson)}
                      className="bg-background border border-border rounded-soft p-4 cursor-move hover:border-primary transition-smooth"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Icon name="GripVertical" size={16} className="text-text-secondary" />
                          <span className="text-sm font-data text-text-secondary">
                            Lição {index + 1}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLesson(lesson.id)}
                          iconName="Trash2"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input
                          type="text"
                          value={lesson.title}
                          onChange={(e) => updateLesson(lesson.id, 'title', e.target.value)}
                          placeholder="Título da lição"
                        />
                        <select
                          value={lesson.type}
                          onChange={(e) => updateLesson(lesson.id, 'type', e.target.value)}
                          className="px-3 py-2 bg-surface border border-border rounded-soft text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="theory">Teoria</option>
                          <option value="practice">Prática</option>
                          <option value="discussion">Discussão</option>
                          <option value="assessment">Avaliação</option>
                        </select>
                      </div>

                      <textarea
                        value={lesson.description}
                        onChange={(e) => updateLesson(lesson.id, 'description', e.target.value)}
                        placeholder="Descrição da lição..."
                        rows={2}
                        className="w-full mt-3 px-3 py-2 bg-surface border border-border rounded-soft text-text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        );

      case 'bncc':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="bncc-alignment"
                checked={trailData.bnccAlignment}
                onChange={(e) => handleInputChange('bnccAlignment', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
              />
              <label htmlFor="bncc-alignment" className="text-sm font-medium text-text-primary">
                Esta trilha está alinhada com a BNCC
              </label>
            </div>

            {trailData.bnccAlignment && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Competências BNCC Contempladas
                </label>
                <div className="space-y-2">
                  {bnccCompetencies.map((competency, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id={`competency-${index}`}
                        checked={trailData.bnccCompetencies.includes(competency)}
                        onChange={(e) => {
                          const updatedCompetencies = e.target.checked
                            ? [...trailData.bnccCompetencies, competency]
                            : trailData.bnccCompetencies.filter(c => c !== competency);
                          handleInputChange('bnccCompetencies', updatedCompetencies);
                        }}
                        className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary mt-0.5"
                      />
                      <label htmlFor={`competency-${index}`} className="text-sm text-text-primary">
                        {competency}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'assessment':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Metodologia de Ensino
              </label>
              <textarea
                value={trailData.methodology}
                onChange={(e) => handleInputChange('methodology', e.target.value)}
                placeholder="Descreva a metodologia que será utilizada na trilha..."
                rows={4}
                className="w-full px-3 py-2 bg-background border border-border rounded-soft text-text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-text-primary">Critérios de Avaliação</h4>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={addAssessmentCriterion}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Adicionar Critério
                </Button>
              </div>

              {trailData.assessmentCriteria.map((criterion) => (
                <div key={criterion.id} className="bg-background border border-border rounded-soft p-3 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Input
                      type="text"
                      value={criterion.title}
                      onChange={(e) => updateAssessmentCriterion(criterion.id, 'title', e.target.value)}
                      placeholder="Nome do critério"
                      className="flex-1 mr-3"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAssessmentCriterion(criterion.id)}
                      iconName="Trash2"
                    />
                  </div>
                  <textarea
                    value={criterion.description}
                    onChange={(e) => updateAssessmentCriterion(criterion.id, 'description', e.target.value)}
                    placeholder="Descrição do critério..."
                    rows={2}
                    className="w-full px-3 py-2 bg-surface border border-border rounded-soft text-text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'resources':
        return (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-text-primary">Bibliografia e Recursos</h4>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={addBibliographyItem}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Adicionar Recurso
                </Button>
              </div>

              {trailData.bibliography.map((item) => (
                <div key={item.id} className="bg-background border border-border rounded-soft p-3 mb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <Input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateBibliographyItem(item.id, 'title', e.target.value)}
                      placeholder="Título do recurso"
                    />
                    <Input
                      type="text"
                      value={item.author}
                      onChange={(e) => updateBibliographyItem(item.id, 'author', e.target.value)}
                      placeholder="Autor"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <select
                      value={item.type}
                      onChange={(e) => updateBibliographyItem(item.id, 'type', e.target.value)}
                      className="px-3 py-2 bg-surface border border-border rounded-soft text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="book">Livro</option>
                      <option value="article">Artigo</option>
                      <option value="video">Vídeo</option>
                      <option value="website">Website</option>
                    </select>
                    <Input
                      type="url"
                      value={item.url}
                      onChange={(e) => updateBibliographyItem(item.id, 'url', e.target.value)}
                      placeholder="URL (opcional)"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`required-${item.id}`}
                        checked={item.required}
                        onChange={(e) => updateBibliographyItem(item.id, 'required', e.target.checked)}
                        className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                      />
                      <label htmlFor={`required-${item.id}`} className="text-sm text-text-primary">
                        Leitura obrigatória
                      </label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBibliographyItem(item.id)}
                      iconName="Trash2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-text-primary/50 backdrop-blur-sm z-modal flex items-center justify-center p-4">
      <div className="bg-surface rounded-soft shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading text-xl font-semibold text-text-primary">
            {editingTrail ? 'Editar Trilha' : 'Criar Nova Trilha'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Step Navigation */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center space-x-4 overflow-x-auto">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-soft whitespace-nowrap transition-smooth ${
                  currentStep === index
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-primary hover:bg-background'
                }`}
              >
                <Icon name={step.icon} size={16} />
                <span className="text-sm font-medium">{step.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Anterior
            </Button>
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Próximo
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={!trailData.title || !trailData.description}
              iconName="Save"
              iconPosition="left"
            >
              {editingTrail ? 'Salvar Alterações' : 'Criar Trilha'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailBuilder;