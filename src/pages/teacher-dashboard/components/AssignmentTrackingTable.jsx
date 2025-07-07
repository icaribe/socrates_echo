import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssignmentTrackingTable = ({ assignments = [], onViewDetails, onExport }) => {
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');

  const mockAssignments = [
    {
      id: 1,
      title: 'Os Pré-Socráticos',
      class: 'Filosofia Antiga - 1º Ano A',
      type: 'trail',
      dueDate: new Date(Date.now() + 86400000 * 2),
      totalStudents: 28,
      completed: 22,
      inProgress: 4,
      notStarted: 2,
      averageScore: 78,
      status: 'active'
    },
    {
      id: 2,
      title: 'Imperativo Categórico',
      class: 'Ética e Moral - 2º Ano B',
      type: 'quiz',
      dueDate: new Date(Date.now() + 86400000 * 5),
      totalStudents: 32,
      completed: 15,
      inProgress: 12,
      notStarted: 5,
      averageScore: 85,
      status: 'active'
    },
    {
      id: 3,
      title: 'Dualismo Cartesiano',
      class: 'Filosofia Moderna - 3º Ano A',
      type: 'discussion',
      dueDate: new Date(Date.now() + 86400000 * 1),
      totalStudents: 25,
      completed: 25,
      inProgress: 0,
      notStarted: 0,
      averageScore: 92,
      status: 'completed'
    },
    {
      id: 4,
      title: 'Falácias Lógicas',
      class: 'Lógica e Argumentação - 1º Ano C',
      type: 'trail',
      dueDate: new Date(Date.now() - 86400000 * 1),
      totalStudents: 30,
      completed: 18,
      inProgress: 8,
      notStarted: 4,
      averageScore: 72,
      status: 'overdue'
    }
  ];

  const assignmentData = assignments.length > 0 ? assignments : mockAssignments;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10 border-success/20';
      case 'active':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'overdue':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-text-secondary bg-background border-border';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'active':
        return 'Ativa';
      case 'overdue':
        return 'Atrasada';
      default:
        return 'Desconhecido';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'trail':
        return 'Map';
      case 'quiz':
        return 'FileQuestion';
      case 'discussion':
        return 'MessageCircle';
      default:
        return 'BookOpen';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'trail':
        return 'Trilha';
      case 'quiz':
        return 'Quiz';
      case 'discussion':
        return 'Discussão';
      default:
        return 'Atividade';
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate) => {
    const now = new Date();
    const diffTime = dueDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} dias atrás`;
    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Amanhã';
    return `${diffDays} dias`;
  };

  const getCompletionPercentage = (assignment) => {
    return Math.round((assignment.completed / assignment.totalStudents) * 100);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedAssignments = assignmentData
    .filter(assignment => filterStatus === 'all' || assignment.status === filterStatus)
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'dueDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  return (
    <div className="bg-surface rounded-soft p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Acompanhamento de Atividades
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Monitore o progresso das atividades em todas as turmas
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-soft text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="all">Todas</option>
            <option value="active">Ativas</option>
            <option value="completed">Concluídas</option>
            <option value="overdue">Atrasadas</option>
          </select>
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            onClick={onExport}
          >
            Exportar
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Atividade</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-text-primary">Turma</span>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-text-primary">Tipo</span>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('dueDate')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Prazo</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-text-primary">Progresso</span>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('averageScore')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Média</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-text-primary">Status</span>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-text-primary">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedAssignments.map((assignment) => (
              <tr key={assignment.id} className="border-b border-border-muted hover:bg-background/50 transition-smooth">
                <td className="py-4 px-4">
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">
                      {assignment.title}
                    </h4>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-text-secondary">
                    {assignment.class}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Icon name={getTypeIcon(assignment.type)} size={14} className="text-text-secondary" />
                    <span className="text-sm text-text-secondary">
                      {getTypeLabel(assignment.type)}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <span className="text-sm text-text-primary">
                      {formatDate(assignment.dueDate)}
                    </span>
                    <p className="text-xs text-text-secondary">
                      {getDaysUntilDue(assignment.dueDate)}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-primary">
                        {assignment.completed}/{assignment.totalStudents}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {getCompletionPercentage(assignment)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${getCompletionPercentage(assignment)}%` }}
                      />
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-text-secondary">
                      <span>Em andamento: {assignment.inProgress}</span>
                      <span>Não iniciado: {assignment.notStarted}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-data font-semibold text-text-primary">
                    {assignment.averageScore}%
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(assignment.status)}`}>
                    {getStatusLabel(assignment.status)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Eye"
                      onClick={() => onViewDetails && onViewDetails(assignment.id)}
                    >
                      Ver
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="MoreHorizontal"
                    >
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedAssignments.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileQuestion" size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
          <h4 className="text-lg font-heading font-semibold text-text-primary mb-2">
            Nenhuma atividade encontrada
          </h4>
          <p className="text-sm text-text-secondary">
            {filterStatus === 'all' ?'Crie sua primeira atividade para começar a acompanhar o progresso dos estudantes.'
              : `Nenhuma atividade ${getStatusLabel(filterStatus).toLowerCase()} encontrada.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default AssignmentTrackingTable;