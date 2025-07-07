import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const StudentProgressChart = ({ progressData = [], chartType = 'bar' }) => {
  const mockProgressData = [
    { name: 'Ana Silva', progress: 85, engagement: 92, assignments: 8 },
    { name: 'Carlos Santos', progress: 72, engagement: 78, assignments: 6 },
    { name: 'Maria Oliveira', progress: 94, engagement: 88, assignments: 9 },
    { name: 'João Costa', progress: 68, engagement: 65, assignments: 5 },
    { name: 'Lucia Ferreira', progress: 89, engagement: 91, assignments: 8 },
    { name: 'Pedro Alves', progress: 76, engagement: 82, assignments: 7 }
  ];

  const data = progressData.length > 0 ? progressData : mockProgressData;

  const averageProgress = Math.round(data.reduce((acc, student) => acc + student.progress, 0) / data.length);
  const averageEngagement = Math.round(data.reduce((acc, student) => acc + student.engagement, 0) / data.length);

  return (
    <div className="bg-surface rounded-soft p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Progresso dos Estudantes
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Análise de desempenho e engajamento
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-text-secondary">Progresso</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-sm text-text-secondary">Engajamento</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-background rounded-soft p-4 border border-border-muted">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">Progresso Médio</span>
          </div>
          <p className="text-2xl font-heading font-bold text-primary">{averageProgress}%</p>
        </div>
        <div className="bg-background rounded-soft p-4 border border-border-muted">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Heart" size={16} className="text-accent" />
            <span className="text-sm font-medium text-text-primary">Engajamento Médio</span>
          </div>
          <p className="text-2xl font-heading font-bold text-accent">{averageEngagement}%</p>
        </div>
        <div className="bg-background rounded-soft p-4 border border-border-muted">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-text-primary">Total de Alunos</span>
          </div>
          <p className="text-2xl font-heading font-bold text-secondary">{data.length}</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="var(--color-text-secondary)" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-text-primary)'
                }}
              />
              <Bar dataKey="progress" fill="var(--color-primary)" name="Progresso (%)" />
              <Bar dataKey="engagement" fill="var(--color-accent)" name="Engajamento (%)" />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="var(--color-text-secondary)" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-text-primary)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="progress" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                name="Progresso (%)"
              />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                name="Engajamento (%)"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentProgressChart;