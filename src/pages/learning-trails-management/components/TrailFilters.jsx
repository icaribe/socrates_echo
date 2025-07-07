import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const TrailFilters = ({ filters, onFiltersChange, onSearch, userRole }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const philosophyPeriods = [
    'Todos os Períodos',
    'Pré-Socráticos',
    'Filosofia Clássica',
    'Filosofia Medieval',
    'Renascimento',
    'Filosofia Moderna',
    'Iluminismo',
    'Filosofia Contemporânea'
  ];

  const difficultyLevels = [
    'Todos os Níveis',
    'Iniciante',
    'Intermediário',
    'Avançado'
  ];

  const completionStatus = [
    'Todos os Status',
    'Não Iniciado',
    'Em Progresso',
    'Concluído'
  ];

  const handleFilterChange = (filterType, value) => {
    onFiltersChange({
      ...filters,
      [filterType]: value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const clearFilters = () => {
    onFiltersChange({
      period: 'Todos os Períodos',
      difficulty: 'Todos os Níveis',
      status: 'Todos os Status'
    });
    setSearchQuery('');
    onSearch('');
  };

  const hasActiveFilters = 
    filters.period !== 'Todos os Períodos' ||
    filters.difficulty !== 'Todos os Níveis' ||
    filters.status !== 'Todos os Status' ||
    searchQuery.length > 0;

  return (
    <div className="bg-surface rounded-soft shadow-soft p-4 mb-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="Buscar trilhas por título, descrição ou professor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                onSearch('');
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-primary"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </form>

      {/* Filter Toggle for Mobile */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          Filtros
        </Button>
        {hasActiveFilters && (
          <Button
            variant="text"
            size="sm"
            onClick={clearFilters}
            iconName="X"
            iconPosition="left"
          >
            Limpar
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className={`space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-4 ${
        isExpanded ? 'block' : 'hidden md:grid'
      }`}>
        {/* Philosophy Period Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Período Filosófico
          </label>
          <select
            value={filters.period}
            onChange={(e) => handleFilterChange('period', e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-soft text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {philosophyPeriods.map(period => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Nível de Dificuldade
          </label>
          <select
            value={filters.difficulty}
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-soft text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {difficultyLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Status Filter (Students Only) */}
        {userRole === 'student' && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Status de Conclusão
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-soft text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {completionStatus.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Clear Filters Button for Desktop */}
      {hasActiveFilters && (
        <div className="hidden md:flex justify-end mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            iconName="X"
            iconPosition="left"
          >
            Limpar Filtros
          </Button>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border-muted">
          <div className="flex flex-wrap gap-2">
            {filters.period !== 'Todos os Períodos' && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-soft">
                {filters.period}
                <button
                  onClick={() => handleFilterChange('period', 'Todos os Períodos')}
                  className="ml-1 hover:text-accent"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters.difficulty !== 'Todos os Níveis' && (
              <span className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent text-xs rounded-soft">
                {filters.difficulty}
                <button
                  onClick={() => handleFilterChange('difficulty', 'Todos os Níveis')}
                  className="ml-1 hover:text-warning"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {userRole === 'student' && filters.status !== 'Todos os Status' && (
              <span className="inline-flex items-center px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-soft">
                {filters.status}
                <button
                  onClick={() => handleFilterChange('status', 'Todos os Status')}
                  className="ml-1 hover:text-text-primary"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrailFilters;