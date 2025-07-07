import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import AdaptiveHeader from '../../components/ui/AdaptiveHeader';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import HeroSection from './components/HeroSection';
import ContinueLearningSection from './components/ContinueLearningSection';
import QuickAccessCards from './components/QuickAccessCards';
import MyClassesSection from './components/MyClassesSection';
import AchievementShowcase from './components/AchievementShowcase';
import RecentActivityFeed from './components/RecentActivityFeed';
import VoiceInteractionButton from './components/VoiceInteractionButton';

const StudentDashboard = ({ onViewChange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [voiceListening, setVoiceListening] = useState(false);

  // Mock user data
  const mockUser = {
    id: 'student_001',
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  };

  // Mock progress data
  const mockProgress = {
    level: 3,
    experience: 750,
    experienceToNext: 1000,
    totalExperience: 2750,
    currentStreak: 7,
    completedLessons: 24,
    totalLessons: 50,
    weeklyGoal: 5,
    weeklyProgress: 3,
    recentAchievements: [
      {
        id: 'ach_001',
        name: 'Questionador Persistente',
        description: 'Fez 10 perguntas profundas em uma única sessão',
        icon: 'HelpCircle',
        rarity: 'rare',
        xpReward: 100,
        isRecent: true
      },
      {
        id: 'ach_002',
        name: 'Pensador Socrático',
        description: 'Completou primeira jornada socrática',
        icon: 'Brain',
        rarity: 'epic',
        xpReward: 200,
        isRecent: true
      }
    ]
  };

  // Mock active trails
  const mockActiveTrails = [
    {
      id: 'trail_001',
      title: 'Filosofia Antiga: Os Pré-Socráticos',
      description: 'Explore as origens do pensamento filosófico com Tales, Heráclito e Parmênides',
      icon: 'Zap',
      difficulty: 'Iniciante',
      completedLessons: 3,
      totalLessons: 8,
      estimatedTime: '45 min',
      nextLesson: {
        id: 'lesson_004',
        title: 'Heráclito e o Logos'
      }
    },
    {
      id: 'trail_002',
      title: 'Ética Aristotélica',
      description: 'Compreenda os conceitos de virtude, felicidade e o meio-termo',
      icon: 'Scale',
      difficulty: 'Intermediário',
      completedLessons: 5,
      totalLessons: 12,
      estimatedTime: '1h 20min',
      nextLesson: {
        id: 'lesson_006',
        title: 'A Doutrina do Meio-Termo'
      }
    }
  ];

  // Mock classes
  const mockClasses = [
    {
      id: 'class_001',
      name: 'Filosofia 3º Ano A',
      teacher: 'Prof. Carlos Mendes',
      code: 'FIL3A1',
      studentCount: 28,
      trailCount: 5,
      pendingAssignments: [
        {
          id: 'assign_001',
          title: 'Ensaio sobre Platão',
          dueDate: '25/12/2024'
        },
        {
          id: 'assign_002',
          title: 'Quiz: Aristóteles',
          dueDate: '28/12/2024'
        }
      ],
      recentActivity: 'Nova trilha adicionada há 2 dias',
      unreadMessages: 3
    }
  ];

  // Mock achievements
  const mockAchievements = [
    {
      id: 'ach_001',
      name: 'Questionador Persistente',
      description: 'Fez 10 perguntas profundas em uma única sessão',
      icon: 'HelpCircle',
      rarity: 'rare',
      xpReward: 100,
      isRecent: true
    },
    {
      id: 'ach_002',
      name: 'Pensador Socrático',
      description: 'Completou primeira jornada socrática',
      icon: 'Brain',
      rarity: 'epic',
      xpReward: 200,
      isRecent: true
    },
    {
      id: 'ach_003',
      name: 'Estudante Dedicado',
      description: 'Manteve sequência de 7 dias consecutivos',
      icon: 'Flame',
      rarity: 'common',
      xpReward: 50,
      isRecent: false
    }
  ];

  // Mock unlocked concepts
  const mockUnlockedConcepts = [
    {
      id: 'concept_001',
      name: 'Logos',
      philosopher: 'Heráclito',
      category: 'pre-socratic',
      period: 'Pré-Socrático',
      isNew: true
    },
    {
      id: 'concept_002',
      name: 'Virtude',
      philosopher: 'Aristóteles',
      category: 'classical',
      period: 'Clássico',
      isNew: false
    }
  ];

  // Mock recent activities
  const mockRecentActivities = [
    {
      id: 'activity_001',
      type: 'lesson_completed',
      title: 'Lição Concluída',
      description: 'Heráclito e o Conceito de Logos',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      metadata: {
        score: 95,
        xpGained: 50,
        duration: '25 min'
      },
      isNew: true
    },
    {
      id: 'activity_002',
      type: 'achievement_earned',
      title: 'Nova Conquista',
      description: 'Questionador Persistente desbloqueada',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      metadata: {
        xpGained: 100
      },
      isNew: true
    },
    {
      id: 'activity_003',
      type: 'quiz_completed',
      title: 'Quiz Finalizado',
      description: 'Filosofia Pré-Socrática - Avaliação',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      metadata: {
        score: 88,
        xpGained: 75,
        duration: '15 min'
      },
      isNew: false
    }
  ];

  // Mock notifications
  const mockNotifications = [
    {
      id: 'notif_001',
      type: 'assignment',
      title: 'Nova Atividade',
      message: 'Prof. Carlos adicionou um novo ensaio sobre Platão',
      timestamp: new Date(Date.now() - 900000),
      read: false
    },
    {
      id: 'notif_002',
      type: 'achievement',
      title: 'Conquista Desbloqueada',
      message: 'Você ganhou a conquista "Questionador Persistente"',
      timestamp: new Date(Date.now() - 3600000),
      read: false
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleJoinClass = async (code) => {
    console.log('Joining class with code:', code);
    // Mock join class logic
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, className: 'Nova Turma' });
      }, 1000);
    });
  };

  const handleContinueTrail = (trailId) => {
    if (trailId === 'all') {
      onViewChange('/learning-trails-management');
    } else {
      onViewChange('/philosophy-journey-mode', { trailId });
    }
  };

  const handleStartJourney = () => {
    onViewChange('/philosophy-journey-mode');
  };

  const handleBrowseTopics = () => {
    onViewChange('/learning-trails-management');
  };

  const handleViewConversations = () => {
    onViewChange('/philosophy-journey-mode', { mode: 'conversations' });
  };

  const handleViewClass = (classId) => {
    onViewChange('/class-management-interface', { classId });
  };

  const handleViewAssignment = (assignmentId) => {
    console.log('Viewing assignment:', assignmentId);
  };

  const handleViewActivity = (activity) => {
    console.log('Viewing activity:', activity);
  };

  const handleStartVoiceInteraction = (start = true) => {
    setVoiceListening(start);
    if (start) {
      // Start voice interaction
      console.log('Starting voice interaction...');
      // Simulate voice interaction
      setTimeout(() => {
        setVoiceListening(false);
        onViewChange('/philosophy-journey-mode', { mode: 'voice' });
      }, 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdaptiveHeader user={mockUser} currentView="/student-dashboard" onViewChange={onViewChange} />
        <RoleBasedNavigation user={mockUser} currentView="/student-dashboard" onViewChange={onViewChange} />
        
        <main className="pt-16 pb-20 lg:pb-6 lg:pl-64">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
            {/* Loading Skeletons */}
            <div className="space-y-6">
              <div className="bg-surface rounded-soft p-6 shadow-soft animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-border rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-border rounded w-1/3" />
                    <div className="h-4 bg-border rounded w-1/2" />
                    <div className="h-3 bg-border rounded w-full" />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-surface rounded-soft p-6 shadow-soft animate-pulse">
                    <div className="space-y-3">
                      <div className="h-5 bg-border rounded w-1/3" />
                      <div className="h-4 bg-border rounded w-full" />
                      <div className="h-4 bg-border rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdaptiveHeader 
        user={mockUser} 
        currentView="/student-dashboard" 
        onViewChange={onViewChange}
        notifications={mockNotifications}
      />
      <RoleBasedNavigation 
        user={mockUser} 
        currentView="/student-dashboard" 
        onViewChange={onViewChange} 
      />
      
      <main className="pt-16 pb-20 lg:pb-6 lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Pull to Refresh Indicator */}
          {refreshing && (
            <div className="fixed top-16 left-0 right-0 bg-accent text-accent-foreground text-center py-2 z-50">
              <div className="flex items-center justify-center space-x-2">
                <Icon name="RefreshCw" size={16} className="animate-spin" />
                <span className="text-sm">Atualizando...</span>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Hero Section */}
            <HeroSection user={mockUser} progress={mockProgress} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Continue Learning */}
                <ContinueLearningSection
                  activeTrails={mockActiveTrails}
                  onContinueTrail={handleContinueTrail}
                  onStartJourney={handleStartJourney}
                />

                {/* Quick Access Cards */}
                <QuickAccessCards
                  onJoinClass={handleJoinClass}
                  onBrowseTopics={handleBrowseTopics}
                  onViewConversations={handleViewConversations}
                />

                {/* My Classes */}
                <MyClassesSection
                  classes={mockClasses}
                  onViewClass={handleViewClass}
                  onViewAssignment={handleViewAssignment}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Achievement Showcase */}
                <AchievementShowcase
                  achievements={mockAchievements}
                  unlockedConcepts={mockUnlockedConcepts}
                />

                {/* Recent Activity Feed */}
                <RecentActivityFeed
                  activities={mockRecentActivities}
                  onViewActivity={handleViewActivity}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Voice Interaction Button */}
      <VoiceInteractionButton
        onStartVoiceInteraction={handleStartVoiceInteraction}
        isListening={voiceListening}
      />
    </div>
  );
};

export default StudentDashboard;