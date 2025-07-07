import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrailAssignment = ({ availableTrails = [], assignedTrails = [], onAssignTrail, onUnassignTrail }) => {
  const [selectedTrails, setSelectedTrails] = useState([]);
  const [assignmentMode, setAssignmentMode] = useState('class'); // 'class' or 'individual'
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mockTrails = availableTrails.length > 0 ? availableTrails : [
    {
      id: 1,
      title: "Filosofia Antiga: Pré-Socráticos",
      description: "Explore os primeiros filósofos gregos e suas contribuições para o pensamento ocidental.",
      difficulty: "beginner",
      estimatedTime: "2-3 semanas",
      lessons: 8,
      bnccAlignment: ["EM13CHS101", "EM13CHS102"],
      topics: ["Tales de Mileto", "Anaximandro", "Heráclito", "Parmênides"],
      prerequisites: [],
      isAssigned: false,
      assignedTo: 0,
      completionRate: 0
    },
    {
      id: 2,
      title: "Sócrates e o Método Socrático",
      description: "Compreenda a filosofia socrática e a importância do questionamento sistemático.",
      difficulty: "intermediate",
      estimatedTime: "3-4 semanas",
      lessons: 12,
      bnccAlignment: ["EM13CHS103", "EM13CHS201"],
      topics: ["Maiêutica", "Ironia Socrática", "Conhece-te a ti mesmo", "Virtude e Conhecimento"],
      prerequisites: ["Filosofia Antiga: Pré-Socráticos"],
      isAssigned: true,
      assignedTo: 28,
      completionRate: 65
    },
    {
      id: 3,
      title: "Platão: Mundo das Ideias",
      description: "Mergulhe na teoria das formas platônicas e sua influência no pensamento ocidental.",
      difficulty: "intermediate",
      estimatedTime: "4-5 semanas",
      lessons: 15,
      bnccAlignment: ["EM13CHS202", "EM13CHS301"],
      topics: ["Alegoria da Caverna", "Teoria das Formas", "República", "Conhecimento e Realidade"],
      prerequisites: ["Sócrates e o Método Socrático"],
      isAssigned: true,
      assignedTo: 24,
      completionRate: 42
    },
    {
      id: 4,
      title: "Aristóteles: Lógica e Ética",
      description: "Estude a lógica aristotélica e os fundamentos da ética das virtudes.",
      difficulty: "advanced",
      estimatedTime: "5-6 semanas",
      lessons: 18,
      bnccAlignment: ["EM13CHS302", "EM13CHS401"],
      topics: ["Silogismo", "Ética Nicomaqueia", "Virtudes Morais", "Meio-termo"],
      prerequisites: ["Platão: Mundo das Ideias"],
      isAssigned: false,
      assignedTo: 0,
      completionRate: 0
    },
    {
      id: 5,
      title: "Filosofia Medieval: Agostinho e Tomás",
      description: "Explore a síntese entre filosofia grega e pensamento cristão medieval.",
      difficulty: "advanced",
      estimatedTime: "4-5 semanas",
      lessons: 14,
      bnccAlignment: ["EM13CHS403", "EM13CHS501"],
      topics: ["Patrística", "Escolástica", "Fé e Razão", "Provas da Existência de Deus"],
      prerequisites: ["Aristóteles: Lógica e Ética"],
      isAssigned: false,
      assignedTo: 0,
      completionRate: 0
    }
  ];

  const mockStudents = [
    { id: 1, name: "Ana Silva", progress: 85 },
    { id: 2, name: "Carlos Santos", progress: 72 },
    { id: 3, name: "Maria Oliveira", progress: 45 },
    { id: 4, name: "João Pereira", progress: 91 }
  ];

  const filteredTrails = mockTrails.filter(trail => {
    const matchesSearch = trail.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trail.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || trail.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'text-success bg-success/10',
      intermediate: 'text-warning bg-warning/10',
      advanced: 'text-error bg-error/10'
    };
    return colors[difficulty] || 'text-text-secondary bg-background';
  };

  const getDifficultyLabel = (difficulty) => {
    const labels = {
      beginner: 'Iniciante',
      intermediate: 'Intermediário',
      advanced: 'Avançado'
    };
    return labels[difficulty] || difficulty;
  };

  const handleTrailSelection = (trailId) => {
    setSelectedTrails(prev => 
      prev.includes(trailId) 
        ? prev.filter(id => id !== trailId)
        : [...prev, trailId]
    );
  };

  const handleStudentSelection = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleAssignTrails = () => {
    if (selectedTrails.length === 0) return;
    
    const assignmentData = {
      trailIds: selectedTrails,
      mode: assignmentMode,
      studentIds: assignmentMode === 'individual' ? selectedStudents : [],
      deadline: null // Could be set via date picker
    };
    
    onAssignTrail?.(assignmentData);
    setSelectedTrails([]);
    setSelectedStudents([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-surface rounded-soft p-6 shadow-soft">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Atribuição de Trilhas
            </h2>
            <p className="text-text-secondary">
              Gerencie as trilhas de aprendizado da sua turma
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Plus"
              onClick={() => onAssignTrail?.('create')}
            >
              Criar Trilha
            </Button>
            <Button
              variant="primary"
              iconName="BookOpen"
              disabled={selectedTrails.length === 0}
              onClick={handleAssignTrails}
            >
              Atribuir Selecionadas
            </Button>
          </div>
        </div>

        {/* Assignment Mode Toggle */}
        <div className="mt-6 flex items-center space-x-4">
          <span className="text-sm font-medium text-text-primary">Modo de Atribuição:</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAssignmentMode('class')}
              className={`px-4 py-2 rounded-soft text-sm font-medium transition-smooth ${
                assignmentMode === 'class' ?'bg-primary text-primary-foreground' :'bg-background text-text-secondary hover:text-primary'
              }`}
            >
              Turma Inteira
            </button>
            <button
              onClick={() => setAssignmentMode('individual')}
              className={`px-4 py-2 rounded-soft text-sm font-medium transition-smooth ${
                assignmentMode === 'individual' ?'bg-primary text-primary-foreground' :'bg-background text-text-secondary hover:text-primary'
              }`}
            >
              Estudantes Específicos
            </button>
          </div>
        </div>

        {/* Individual Student Selection */}
        {assignmentMode === 'individual' && (
          <div className="mt-4 p-4 bg-background rounded-soft">
            <h3 className="text-sm font-medium text-text-primary mb-3">
              Selecionar Estudantes:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {mockStudents.map(student => (
                <label key={student.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleStudentSelection(student.id)}
                    className="rounded border-border focus:ring-primary"
                  />
                  <span className="text-sm text-text-primary">{student.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mt-6 flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Buscar trilhas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
            />
          </div>
          
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
          >
            <option value="all">Todas as Dificuldades</option>
            <option value="beginner">Iniciante</option>
            <option value="intermediate">Intermediário</option>
            <option value="advanced">Avançado</option>
          </select>
        </div>
      </div>

      {/* Selected Trails Summary */}
      {selectedTrails.length > 0 && (
        <div className="bg-accent/10 rounded-soft p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-primary">
              {selectedTrails.length} trilha(s) selecionada(s) para atribuição
            </p>
            <Button
              variant="text"
              size="sm"
              onClick={() => setSelectedTrails([])}
            >
              Limpar Seleção
            </Button>
          </div>
        </div>
      )}

      {/* Trails Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTrails.map((trail) => (
          <div
            key={trail.id}
            className={`bg-surface rounded-soft p-6 shadow-soft border-2 transition-all duration-200 ${
              selectedTrails.includes(trail.id)
                ? 'border-primary bg-primary/5' :'border-transparent hover:border-border-muted'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={selectedTrails.includes(trail.id)}
                  onChange={() => handleTrailSelection(trail.id)}
                  className="mt-1 rounded border-border focus:ring-primary"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                    {trail.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-3">
                    {trail.description}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-2 py-1 rounded-soft text-xs font-medium ${getDifficultyColor(trail.difficulty)}`}>
                  {getDifficultyLabel(trail.difficulty)}
                </span>
                {trail.isAssigned && (
                  <span className="px-2 py-1 bg-success/10 text-success rounded-soft text-xs font-medium">
                    Atribuída
                  </span>
                )}
              </div>
            </div>

            {/* Trail Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">{trail.estimatedTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="BookOpen" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">{trail.lessons} lições</span>
              </div>
              {trail.isAssigned && (
                <>
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-secondary">{trail.assignedTo} estudantes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Target" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-secondary">{trail.completionRate}% concluído</span>
                  </div>
                </>
              )}
            </div>

            {/* Progress Bar for Assigned Trails */}
            {trail.isAssigned && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-text-secondary">Progresso da Turma</span>
                  <span className="text-xs font-data text-text-primary">{trail.completionRate}%</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${trail.completionRate}%` }}
                  />
                </div>
              </div>
            )}

            {/* BNCC Alignment */}
            <div className="mb-4">
              <h4 className="text-xs font-medium text-text-primary mb-2">Alinhamento BNCC:</h4>
              <div className="flex flex-wrap gap-1">
                {trail.bnccAlignment.map((code, index) => (
                  <span key={index} className="px-2 py-1 bg-secondary/10 text-secondary rounded-soft text-xs font-data">
                    {code}
                  </span>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div className="mb-4">
              <h4 className="text-xs font-medium text-text-primary mb-2">Tópicos Principais:</h4>
              <div className="flex flex-wrap gap-1">
                {trail.topics.slice(0, 3).map((topic, index) => (
                  <span key={index} className="px-2 py-1 bg-background text-text-secondary rounded-soft text-xs">
                    {topic}
                  </span>
                ))}
                {trail.topics.length > 3 && (
                  <span className="px-2 py-1 bg-background text-text-secondary rounded-soft text-xs">
                    +{trail.topics.length - 3} mais
                  </span>
                )}
              </div>
            </div>

            {/* Prerequisites */}
            {trail.prerequisites.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-medium text-text-primary mb-2">Pré-requisitos:</h4>
                <div className="space-y-1">
                  {trail.prerequisites.map((prereq, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="ArrowRight" size={12} className="text-text-secondary" />
                      <span className="text-xs text-text-secondary">{prereq}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border-muted">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  onClick={() => onAssignTrail?.('preview', trail.id)}
                >
                  Visualizar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit"
                  onClick={() => onAssignTrail?.('edit', trail.id)}
                >
                  Editar
                </Button>
              </div>
              
              {trail.isAssigned ? (
                <Button
                  variant="danger"
                  size="sm"
                  iconName="X"
                  onClick={() => onUnassignTrail?.(trail.id)}
                >
                  Remover
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  iconName="Plus"
                  onClick={() => onAssignTrail?.('single', trail.id)}
                >
                  Atribuir
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredTrails.length === 0 && (
        <div className="bg-surface rounded-soft p-12 text-center shadow-soft">
          <Icon name="BookOpen" size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
            Nenhuma trilha encontrada
          </h3>
          <p className="text-text-secondary mb-6">
            {searchTerm ? 'Tente ajustar os filtros de busca.' : 'Comece criando sua primeira trilha de aprendizado.'}
          </p>
          <Button
            variant="primary"
            iconName="Plus"
            onClick={() => onAssignTrail?.('create')}
          >
            Criar Nova Trilha
          </Button>
        </div>
      )}
    </div>
  );
};

export default TrailAssignment;