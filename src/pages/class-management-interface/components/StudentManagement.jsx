import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StudentManagement = ({ students = [], onStudentAction }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'

  const mockStudents = students.length > 0 ? students : [
    {
      id: 1,
      name: "Ana Silva",
      email: "ana.silva@email.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      joinDate: "2024-01-15",
      lastActivity: "2024-03-15T10:30:00",
      progress: 85,
      completedTrails: 12,
      totalTrails: 15,
      level: 4,
      status: "active",
      achievements: 8
    },
    {
      id: 2,
      name: "Carlos Santos",
      email: "carlos.santos@email.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      joinDate: "2024-01-20",
      lastActivity: "2024-03-14T15:45:00",
      progress: 72,
      completedTrails: 9,
      totalTrails: 15,
      level: 3,
      status: "active",
      achievements: 5
    },
    {
      id: 3,
      name: "Maria Oliveira",
      email: "maria.oliveira@email.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      joinDate: "2024-02-01",
      lastActivity: "2024-03-10T09:20:00",
      progress: 45,
      completedTrails: 6,
      totalTrails: 15,
      level: 2,
      status: "inactive",
      achievements: 3
    },
    {
      id: 4,
      name: "João Pereira",
      email: "joao.pereira@email.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      joinDate: "2024-02-10",
      lastActivity: "2024-03-15T14:10:00",
      progress: 91,
      completedTrails: 14,
      totalTrails: 15,
      level: 5,
      status: "active",
      achievements: 12
    }
  ];

  const filteredStudents = mockStudents
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === 'all' || student.status === filterBy;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'progress':
          return b.progress - a.progress;
        case 'lastActivity':
          return new Date(b.lastActivity) - new Date(a.lastActivity);
        case 'level':
          return b.level - a.level;
        default:
          return 0;
      }
    });

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id));
    }
  };

  const formatLastActivity = (timestamp) => {
    const now = new Date();
    const activity = new Date(timestamp);
    const diffInHours = Math.floor((now - activity) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    return `${Math.floor(diffInHours / 24)}d atrás`;
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-success' : 'text-warning';
  };

  const getStatusLabel = (status) => {
    return status === 'active' ? 'Ativo' : 'Inativo';
  };

  const bulkActions = [
    { id: 'assign-trail', label: 'Atribuir Trilha', icon: 'BookOpen' },
    { id: 'send-message', label: 'Enviar Mensagem', icon: 'MessageCircle' },
    { id: 'generate-report', label: 'Gerar Relatório', icon: 'FileText' },
    { id: 'remove-students', label: 'Remover da Turma', icon: 'UserMinus', variant: 'danger' }
  ];

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="bg-surface rounded-soft p-6 shadow-soft">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Gerenciamento de Estudantes
            </h2>
            <p className="text-text-secondary">
              {filteredStudents.length} de {mockStudents.length} estudantes
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="primary"
              iconName="UserPlus"
              onClick={() => onStudentAction?.('invite')}
            >
              Convidar Estudante
            </Button>
            <Button
              variant="outline"
              iconName="Download"
              onClick={() => onStudentAction?.('export')}
            >
              Exportar
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-6 flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Buscar estudantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
          >
            <option value="name">Ordenar por Nome</option>
            <option value="progress">Ordenar por Progresso</option>
            <option value="lastActivity">Ordenar por Atividade</option>
            <option value="level">Ordenar por Nível</option>
          </select>
          
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-soft transition-smooth ${
                viewMode === 'table' ? 'bg-primary text-primary-foreground' : 'bg-background text-text-secondary hover:text-primary'
              }`}
            >
              <Icon name="Table" size={18} />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-soft transition-smooth ${
                viewMode === 'cards' ? 'bg-primary text-primary-foreground' : 'bg-background text-text-secondary hover:text-primary'
              }`}
            >
              <Icon name="Grid3X3" size={18} />
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedStudents.length > 0 && (
          <div className="mt-4 p-4 bg-accent/10 rounded-soft">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
              <p className="text-sm text-text-primary">
                {selectedStudents.length} estudante(s) selecionado(s)
              </p>
              <div className="flex flex-wrap gap-2">
                {bulkActions.map((action) => (
                  <Button
                    key={action.id}
                    variant={action.variant || 'outline'}
                    size="sm"
                    iconName={action.icon}
                    onClick={() => onStudentAction?.(action.id, selectedStudents)}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Students Display */}
      {viewMode === 'table' ? (
        /* Table View */
        <div className="bg-surface rounded-soft shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-border focus:ring-primary"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Estudante
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Progresso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Nível
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Última Atividade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-background transition-smooth">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                        className="rounded border-border focus:ring-primary"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={student.avatar}
                          alt={student.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-text-primary">{student.name}</p>
                          <p className="text-xs text-text-secondary">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-border rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-data text-text-primary">{student.progress}%</span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">
                        {student.completedTrails}/{student.totalTrails} trilhas
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={16} className="text-accent" />
                        <span className="text-sm font-data text-text-primary">{student.level}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-secondary">
                        {formatLastActivity(student.lastActivity)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${getStatusColor(student.status)}`}>
                        {getStatusLabel(student.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onStudentAction?.('view', student.id)}
                          className="p-1 text-text-secondary hover:text-primary transition-smooth"
                          title="Ver Perfil"
                        >
                          <Icon name="Eye" size={16} />
                        </button>
                        <button
                          onClick={() => onStudentAction?.('message', student.id)}
                          className="p-1 text-text-secondary hover:text-primary transition-smooth"
                          title="Enviar Mensagem"
                        >
                          <Icon name="MessageCircle" size={16} />
                        </button>
                        <button
                          onClick={() => onStudentAction?.('more', student.id)}
                          className="p-1 text-text-secondary hover:text-primary transition-smooth"
                          title="Mais Opções"
                        >
                          <Icon name="MoreHorizontal" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-surface rounded-soft p-6 shadow-soft">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleSelectStudent(student.id)}
                    className="rounded border-border focus:ring-primary"
                  />
                  <Image
                    src={student.avatar}
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-text-primary">{student.name}</h3>
                    <p className="text-sm text-text-secondary">{student.email}</p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${getStatusColor(student.status)}`}>
                  {getStatusLabel(student.status)}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-text-secondary">Progresso</span>
                    <span className="text-sm font-data text-text-primary">{student.progress}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={16} className="text-accent" />
                    <span className="text-sm text-text-primary">Nível {student.level}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Award" size={16} className="text-warning" />
                    <span className="text-sm text-text-primary">{student.achievements}</span>
                  </div>
                </div>

                <div className="text-xs text-text-secondary">
                  <p>Última atividade: {formatLastActivity(student.lastActivity)}</p>
                  <p>{student.completedTrails}/{student.totalTrails} trilhas completas</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-border-muted">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  onClick={() => onStudentAction?.('view', student.id)}
                >
                  Ver Perfil
                </Button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onStudentAction?.('message', student.id)}
                    className="p-2 text-text-secondary hover:text-primary transition-smooth"
                    title="Enviar Mensagem"
                  >
                    <Icon name="MessageCircle" size={16} />
                  </button>
                  <button
                    onClick={() => onStudentAction?.('more', student.id)}
                    className="p-2 text-text-secondary hover:text-primary transition-smooth"
                    title="Mais Opções"
                  >
                    <Icon name="MoreHorizontal" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredStudents.length === 0 && (
        <div className="bg-surface rounded-soft p-12 text-center shadow-soft">
          <Icon name="Users" size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
            Nenhum estudante encontrado
          </h3>
          <p className="text-text-secondary mb-6">
            {searchTerm ? 'Tente ajustar os filtros de busca.' : 'Comece convidando estudantes para sua turma.'}
          </p>
          <Button
            variant="primary"
            iconName="UserPlus"
            onClick={() => onStudentAction?.('invite')}
          >
            Convidar Primeiro Estudante
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;