import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AdaptiveHeader from '../../components/ui/AdaptiveHeader';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import ProgressIndicator from '../../components/ui/ProgressIndicator';


// Import components
import TrailCard from './components/TrailCard';
import TrailFilters from './components/TrailFilters';
import MyTrailsSection from './components/MyTrailsSection';
import TrailBuilder from './components/TrailBuilder';
import TrailDetailsModal from './components/TrailDetailsModal';

const LearningTrailsManagement = ({ user, onViewChange }) => {
  const [filters, setFilters] = useState({
    period: 'Todos os Períodos',
    difficulty: 'Todos os Níveis',
    status: 'Todos os Status'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isTrailBuilderOpen, setIsTrailBuilderOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [editingTrail, setEditingTrail] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock data for available trails
  const [availableTrails] = useState([
    {
      id: 1,
      title: "Introdução à Ética Aristotélica",
      description: "Explore os fundamentos da ética aristotélica através de diálogos interativos e análises de casos práticos. Compreenda os conceitos de virtude, felicidade e o meio-termo.",
      difficulty: "Iniciante",
      philosophyPeriod: "Filosofia Clássica",
      estimatedHours: 8,
      lessonsCount: 12,
      studentsCount: 156,
      imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      bnccAlignment: true,
      bnccCompetencies: [
        "Investigar e analisar diferentes formas de expressão que envolvam a experiência humana",
        "Problematizar questões filosóficas fundamentais"
      ],
      teacher: {
        name: "Dr. Maria Santos",
        bio: "Doutora em Filosofia pela USP, especialista em Filosofia Antiga"
      },
      isEnrolled: user?.role === 'student',
      progress: user?.role === 'student' ? 65 : undefined,
      completedLessons: user?.role === 'student' ? 8 : undefined,
      lastAccessed: new Date(Date.now() - 86400000),
      nextAssignment: user?.role === 'student' ? {
        title: "Análise do conceito de virtude",
        dueDate: new Date(Date.now() + 604800000)
      } : undefined,
      latestFeedback: user?.role === 'student' ? "Excelente análise sobre o conceito de eudaimonia. Continue explorando as aplicações práticas." : undefined,
      lessons: [
        {
          id: 1,
          title: "Introdução à Ética",
          description: "Conceitos fundamentais da ética aristotélica",
          type: "theory",
          duration: 45,
          order: 0
        },
        {
          id: 2,
          title: "O Conceito de Virtude",
          description: "Análise detalhada das virtudes morais e intelectuais",
          type: "theory",
          duration: 60,
          order: 1
        }
      ],
      bibliography: [
        {
          id: 1,
          title: "Ética a Nicômaco",
          author: "Aristóteles",
          type: "book",
          required: true
        }
      ],
      methodology: "Metodologia baseada em diálogos socráticos e análise de casos práticos",
      assessmentCriteria: [
        {
          id: 1,
          title: "Compreensão conceitual",
          description: "Demonstração de entendimento dos conceitos fundamentais"
        }
      ],
      createdAt: new Date(Date.now() - 2592000000),
      rating: 4.8,
      completedStudents: 89,
      averageCompletionTime: "6.5h",
      recentActivity: [
        {
          studentName: "João Silva",
          action: "completou a lição 'O Conceito de Virtude'",
          timestamp: new Date(Date.now() - 3600000)
        }
      ]
    },
    {
      id: 2,
      title: "Filosofia Medieval: Tomás de Aquino",
      description: "Mergulhe na síntese tomista entre filosofia aristotélica e teologia cristã. Explore as cinco vias para demonstrar a existência de Deus.",
      difficulty: "Intermediário",
      philosophyPeriod: "Filosofia Medieval",
      estimatedHours: 12,
      lessonsCount: 18,
      studentsCount: 89,
      imageUrl: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?w=400&h=300&fit=crop",
      bnccAlignment: true,
      teacher: {
        name: "Prof. Carlos Oliveira",
        bio: "Mestre em Filosofia Medieval, especialista em Escolástica"
      },
      isEnrolled: false,
      lessons: [],
      bibliography: [],
      createdAt: new Date(Date.now() - 1296000000)
    },
    {
      id: 3,
      title: "Existencialismo: Sartre e Camus",
      description: "Analise as principais correntes existencialistas do século XX. Explore temas como liberdade, angústia, absurdo e autenticidade.",
      difficulty: "Avançado",
      philosophyPeriod: "Filosofia Contemporânea",
      estimatedHours: 15,
      lessonsCount: 20,
      studentsCount: 67,
      imageUrl: "https://images.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg?w=400&h=300&fit=crop",
      bnccAlignment: false,
      teacher: {
        name: "Dra. Ana Costa",
        bio: "Doutora em Filosofia Contemporânea, pesquisadora em Existencialismo"
      },
      isEnrolled: user?.role === 'student',
      progress: user?.role === 'student' ? 25 : undefined,
      completedLessons: user?.role === 'student' ? 5 : undefined,
      lastAccessed: new Date(Date.now() - 172800000),
      lessons: [],
      bibliography: [],
      createdAt: new Date(Date.now() - 864000000)
    }
  ]);

  // Mock enrolled trails for students
  const enrolledTrails = user?.role === 'student' 
    ? availableTrails.filter(trail => trail.isEnrolled)
    : [];

  // Mock notifications
  const [notifications] = useState([
    {
      id: 1,
      type: 'assignment',
      title: 'Nova atividade disponível',
      message: 'A atividade "Análise do conceito de virtude" foi adicionada à trilha de Ética Aristotélica.',
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Conquista desbloqueada!',
      message: 'Você completou 50% da trilha de Ética Aristotélica.',
      timestamp: new Date(Date.now() - 7200000),
      read: false
    }
  ]);

  // Mock user progress
  const userProgress = {
    level: 3,
    experience: 750,
    experienceToNext: 1000,
    currentStreak: 7,
    completedLessons: 23,
    totalLessons: 50,
    weeklyGoal: 5,
    weeklyProgress: 3,
    achievements: [
      { name: 'Primeiro Passo', icon: 'Star' },
      { name: 'Pensador Dedicado', icon: 'Trophy' }
    ]
  };

  // Filter trails based on current filters and search
  const filteredTrails = availableTrails.filter(trail => {
    const matchesPeriod = filters.period === 'Todos os Períodos' || trail.philosophyPeriod === filters.period;
    const matchesDifficulty = filters.difficulty === 'Todos os Níveis' || trail.difficulty === filters.difficulty;
    const matchesStatus = filters.status === 'Todos os Status' || 
      (filters.status === 'Não Iniciado' && !trail.isEnrolled) ||
      (filters.status === 'Em Progresso' && trail.isEnrolled && trail.progress < 100) ||
      (filters.status === 'Concluído' && trail.isEnrolled && trail.progress === 100);
    
    const matchesSearch = searchQuery === '' || 
      trail.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trail.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trail.teacher?.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPeriod && matchesDifficulty && matchesStatus && matchesSearch;
  });

  const handleEnrollTrail = (trail) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Enrolled in trail:', trail.title);
      setLoading(false);
    }, 1000);
  };

  const handleViewProgress = (trail) => {
    console.log('Viewing progress for:', trail.title);
    onViewChange('/philosophy-journey-mode');
  };

  const handleContinueTrail = (trail) => {
    console.log('Continuing trail:', trail.title);
    onViewChange('/philosophy-journey-mode');
  };

  const handleEditTrail = (trail) => {
    setEditingTrail(trail);
    setIsTrailBuilderOpen(true);
  };

  const handleViewDetails = (trail) => {
    setSelectedTrail(trail);
    setIsDetailsModalOpen(true);
  };

  const handleSaveTrail = (trailData) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Saved trail:', trailData);
      setLoading(false);
      setEditingTrail(null);
    }, 1000);
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    console.log('Marking notification as read:', notificationId);
  };

  const handleMarkAllNotificationsAsRead = () => {
    console.log('Marking all notifications as read');
  };

  const handleNotificationClick = (notification) => {
    console.log('Clicked notification:', notification);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AdaptiveHeader
        user={user}
        currentView="/learning-trails-management"
        onViewChange={onViewChange}
        notifications={notifications}
      />

      {/* Navigation */}
      <RoleBasedNavigation
        user={user}
        currentView="/learning-trails-management"
        onViewChange={onViewChange}
      />

      {/* Main Content */}
      <main className={`pt-16 ${
        user?.role === 'student' ? 'pb-20 md:pb-4 md:pl-64' : 'md:pl-64'
      }`}>
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-heading text-2xl lg:text-3xl font-bold text-text-primary">
                  Trilhas de Aprendizado
                </h1>
                <p className="text-text-secondary mt-1">
                  {user?.role === 'student' ?'Explore e participe de trilhas filosóficas estruturadas' :'Crie e gerencie trilhas de aprendizado para seus alunos'
                  }
                </p>
              </div>
              
              {user?.role === 'teacher' && (
                <Button
                  variant="primary"
                  onClick={() => setIsTrailBuilderOpen(true)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Nova Trilha
                </Button>
              )}
            </div>

            {/* Progress Indicator for Students */}
            {user?.role === 'student' && (
              <ProgressIndicator
                user={user}
                currentProgress={userProgress}
                variant="default"
                className="mb-6"
              />
            )}
          </div>

          {/* My Trails Section for Students */}
          {user?.role === 'student' && enrolledTrails.length > 0 && (
            <div className="mb-8">
              <MyTrailsSection
                enrolledTrails={enrolledTrails}
                onContinueTrail={handleContinueTrail}
                onViewProgress={handleViewProgress}
              />
            </div>
          )}

          {/* Filters */}
          <TrailFilters
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={setSearchQuery}
            userRole={user?.role}
          />

          {/* Available Trails Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-semibold text-text-primary" id="available-trails">
                {user?.role === 'student' ? 'Trilhas Disponíveis' : 'Minhas Trilhas'}
              </h2>
              <div className="text-sm text-text-secondary">
                {filteredTrails.length} trilha{filteredTrails.length !== 1 ? 's' : ''} encontrada{filteredTrails.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Trails Grid */}
            {filteredTrails.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrails.map((trail) => (
                  <TrailCard
                    key={trail.id}
                    trail={trail}
                    userRole={user?.role}
                    onEnroll={handleEnrollTrail}
                    onViewProgress={handleViewProgress}
                    onEdit={handleEditTrail}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
                <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                  Nenhuma trilha encontrada
                </h3>
                <p className="text-text-secondary mb-4">
                  Tente ajustar os filtros ou termos de busca
                </p>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFilters({
                      period: 'Todos os Períodos',
                      difficulty: 'Todos os Níveis',
                      status: 'Todos os Status'
                    });
                    setSearchQuery('');
                  }}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>

          {/* Quick Stats for Teachers */}
          {user?.role === 'teacher' && (
            <div className="bg-surface rounded-soft shadow-soft p-6">
              <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">
                Estatísticas Rápidas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-data font-bold text-primary">
                    {availableTrails.length}
                  </p>
                  <p className="text-sm text-text-secondary">Trilhas Criadas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-data font-bold text-accent">
                    {availableTrails.reduce((sum, trail) => sum + trail.studentsCount, 0)}
                  </p>
                  <p className="text-sm text-text-secondary">Estudantes Inscritos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-data font-bold text-success">
                    {availableTrails.reduce((sum, trail) => sum + (trail.completedStudents || 0), 0)}
                  </p>
                  <p className="text-sm text-text-secondary">Conclusões</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-data font-bold text-warning">
                    {(availableTrails.reduce((sum, trail) => sum + (trail.rating || 0), 0) / availableTrails.length).toFixed(1)}
                  </p>
                  <p className="text-sm text-text-secondary">Avaliação Média</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Trail Builder Modal */}
      <TrailBuilder
        isOpen={isTrailBuilderOpen}
        onClose={() => {
          setIsTrailBuilderOpen(false);
          setEditingTrail(null);
        }}
        onSave={handleSaveTrail}
        editingTrail={editingTrail}
      />

      {/* Trail Details Modal */}
      <TrailDetailsModal
        trail={selectedTrail}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedTrail(null);
        }}
        userRole={user?.role}
        onEnroll={handleEnrollTrail}
        onEdit={handleEditTrail}
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-text-primary/20 backdrop-blur-sm z-modal flex items-center justify-center">
          <div className="bg-surface rounded-soft shadow-elevated p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
            <span className="text-text-primary">Processando...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningTrailsManagement;