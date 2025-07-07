import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClassNavigationSidebar = ({ classes = [], activeClassId, onClassSelect, onCreateClass }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockClasses = [
    {
      id: 1,
      name: 'Filosofia Antiga - 1º Ano A',
      students: 28,
      activeTrails: 3,
      code: 'FA1A23',
      status: 'active',
      lastActivity: '2 horas atrás'
    },
    {
      id: 2,
      name: 'Ética e Moral - 2º Ano B',
      students: 32,
      activeTrails: 2,
      code: 'EM2B23',
      status: 'active',
      lastActivity: '1 dia atrás'
    },
    {
      id: 3,
      name: 'Filosofia Moderna - 3º Ano A',
      students: 25,
      activeTrails: 4,
      code: 'FM3A23',
      status: 'active',
      lastActivity: '3 horas atrás'
    },
    {
      id: 4,
      name: 'Lógica e Argumentação - 1º Ano C',
      students: 30,
      activeTrails: 1,
      code: 'LA1C23',
      status: 'inactive',
      lastActivity: '1 semana atrás'
    }
  ];

  const classData = classes.length > 0 ? classes : mockClasses;
  
  const filteredClasses = classData.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeClasses = filteredClasses.filter(cls => cls.status === 'active');
  const inactiveClasses = filteredClasses.filter(cls => cls.status === 'inactive');

  const handleClassSelect = (classId) => {
    if (onClassSelect) {
      onClassSelect(classId);
    }
  };

  return (
    <div className="bg-surface rounded-soft p-4 shadow-soft h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Minhas Turmas
        </h3>
        <Button
          variant="primary"
          size="sm"
          iconName="Plus"
          onClick={onCreateClass}
          className="px-3"
        >
          Nova
        </Button>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <input
            type="text"
            placeholder="Buscar turmas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-soft text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
          />
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activeClasses.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-2 flex items-center">
              <Icon name="Circle" size={8} className="text-success mr-2" />
              Turmas Ativas ({activeClasses.length})
            </h4>
            <div className="space-y-2">
              {activeClasses.map((cls) => (
                <div
                  key={cls.id}
                  onClick={() => handleClassSelect(cls.id)}
                  className={`p-3 rounded-soft border cursor-pointer transition-smooth ${
                    activeClassId === cls.id
                      ? 'bg-primary/10 border-primary text-primary' :'bg-background border-border-muted hover:bg-primary/5 hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="text-sm font-medium text-text-primary line-clamp-2">
                      {cls.name}
                    </h5>
                    <span className="text-xs text-text-secondary bg-border px-2 py-1 rounded-full font-data">
                      {cls.code}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Icon name="Users" size={12} className="mr-1" />
                        {cls.students}
                      </span>
                      <span className="flex items-center">
                        <Icon name="Map" size={12} className="mr-1" />
                        {cls.activeTrails}
                      </span>
                    </div>
                    <span>{cls.lastActivity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {inactiveClasses.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-2 flex items-center">
              <Icon name="Circle" size={8} className="text-text-secondary mr-2" />
              Turmas Inativas ({inactiveClasses.length})
            </h4>
            <div className="space-y-2">
              {inactiveClasses.map((cls) => (
                <div
                  key={cls.id}
                  onClick={() => handleClassSelect(cls.id)}
                  className={`p-3 rounded-soft border cursor-pointer transition-smooth opacity-60 ${
                    activeClassId === cls.id
                      ? 'bg-primary/10 border-primary text-primary' :'bg-background border-border-muted hover:bg-primary/5 hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="text-sm font-medium text-text-primary line-clamp-2">
                      {cls.name}
                    </h5>
                    <span className="text-xs text-text-secondary bg-border px-2 py-1 rounded-full font-data">
                      {cls.code}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Icon name="Users" size={12} className="mr-1" />
                        {cls.students}
                      </span>
                      <span className="flex items-center">
                        <Icon name="Map" size={12} className="mr-1" />
                        {cls.activeTrails}
                      </span>
                    </div>
                    <span>{cls.lastActivity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredClasses.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Search" size={32} className="mx-auto mb-3 text-text-secondary opacity-50" />
            <p className="text-sm text-text-secondary">
              {searchTerm ? 'Nenhuma turma encontrada' : 'Nenhuma turma criada ainda'}
            </p>
            {!searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                iconName="Plus"
                onClick={onCreateClass}
                className="mt-2"
              >
                Criar primeira turma
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassNavigationSidebar;