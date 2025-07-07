import React, { useState, useEffect } from 'react';
import AdaptiveHeader from '../../components/ui/AdaptiveHeader';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import ClassOverviewCard from './components/ClassOverviewCard';
import StudentProgressChart from './components/StudentProgressChart';
import ClassNavigationSidebar from './components/ClassNavigationSidebar';
import RecentActivityFeed from './components/RecentActivityFeed';
import QuickActionsPanel from './components/QuickActionsPanel';
import AssignmentTrackingTable from './components/AssignmentTrackingTable';

const TeacherDashboard = ({ onViewChange }) => {
  const [activeClassId, setActiveClassId] = useState(1);
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);

  // Mock user data
  const mockUser = {
    id: 1,
    name: 'Prof. Maria Santos',
    email: 'maria.santos@escola.edu.br',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  };

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      message: 'Novo estudante solicitou entrada na turma "Filosofia Antiga"',
      time: '5 min atrás',
      read: false,
      type: 'student_request'
    },
    {
      id: 2,
      message: 'Ana Silva completou a trilha "Os Pré-Socráticos"',
      time: '1 hora atrás',
      read: false,
      type: 'assignment_completed'
    },
    {
      id: 3,
      message: 'Prazo da atividade "Imperativo Categórico" se aproxima',
      time: '2 horas atrás',
      read: true,
      type: 'deadline_reminder'
    }
  ];

  // Mock dashboard data
  const mockDashboardData = {
    classOverview: {
      totalClasses: 4,
      totalStudents: 115,
      activeTrails: 12,
      completionRate: 78,
      engagementScore: 85
    },
    progressData: [
      { name: 'Ana Silva', progress: 85, engagement: 92, assignments: 8 },
      { name: 'Carlos Santos', progress: 72, engagement: 78, assignments: 6 },
      { name: 'Maria Oliveira', progress: 94, engagement: 88, assignments: 9 },
      { name: 'João Costa', progress: 68, engagement: 65, assignments: 5 },
      { name: 'Lucia Ferreira', progress: 89, engagement: 91, assignments: 8 },
      { name: 'Pedro Alves', progress: 76, engagement: 82, assignments: 7 }
    ],
    recentActivities: [
      {
        id: 1,
        type: 'assignment_completed',
        student: 'Ana Silva',
        class: 'Filosofia Antiga - 1º Ano A',
        activity: 'Completou a trilha "Os Pré-Socráticos"',
        timestamp: new Date(Date.now() - 1800000),
        score: 85,
        icon: 'CheckCircle',
        color: 'text-success'
      },
      {
        id: 2,
        type: 'question_asked',
        student: 'Carlos Santos',
        class: 'Ética e Moral - 2º Ano B',
        activity: 'Fez uma pergunta sobre "O Imperativo Categórico de Kant"',
        timestamp: new Date(Date.now() - 3600000),
        icon: 'MessageCircle',
        color: 'text-primary'
      }
    ]
  };

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDashboardData(mockDashboardData);
      setLoading(false);
    };

    loadDashboardData();
  }, []);

  const handleClassSelect = (classId) => {
    setActiveClassId(classId);
    // Here you would typically fetch data for the selected class
  };

  const handleCreateClass = () => {
    if (onViewChange) {
      onViewChange('/class-management-interface');
    }
  };

  const handleQuickAction = (action, data) => {
    switch (action) {
      case 'create_class': onViewChange('/class-management-interface');
        break;
      case 'create_trail': onViewChange('/learning-trails-management');
        break;
      case 'view_reports':
        // Navigate to reports page
        break;
      case 'generate_invite': console.log('Generated invite code:', data.code);
        break;
      default:
        console.log('Action:', action, data);
    }
  };

  const handleViewAssignmentDetails = (assignmentId) => {
    console.log('View assignment details:', assignmentId);
    // Navigate to assignment details page
  };

  const handleExportData = () => {
    console.log('Exporting assignment data...');
    // Implement export functionality
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AdaptiveHeader 
          user={mockUser}
          currentView="/teacher-dashboard"
          onViewChange={onViewChange}
          notifications={mockNotifications}
        />
        <RoleBasedNavigation
          user={mockUser}
          currentView="/teacher-dashboard"
          onViewChange={onViewChange}
          className="hidden md:block"
        />
        <main className="pt-16 md:pl-64">
          <div className="p-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-border rounded-soft w-1/3"></div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-3 space-y-4">
                  <div className="h-64 bg-border rounded-soft"></div>
                  <div className="h-96 bg-border rounded-soft"></div>
                </div>
                <div className="lg:col-span-6 space-y-6">
                  <div className="h-48 bg-border rounded-soft"></div>
                  <div className="h-96 bg-border rounded-soft"></div>
                </div>
                <div className="lg:col-span-3 space-y-4">
                  <div className="h-96 bg-border rounded-soft"></div>
                  <div className="h-64 bg-border rounded-soft"></div>
                </div>
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
        currentView="/teacher-dashboard"
        onViewChange={onViewChange}
        notifications={mockNotifications}
      />
      
      <RoleBasedNavigation
        user={mockUser}
        currentView="/teacher-dashboard"
        onViewChange={onViewChange}
        className="hidden md:block"
      />

      <main className="pt-16 md:pl-64">
        <div className="p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
              Dashboard do Professor
            </h1>
            <p className="text-text-secondary mt-2">
              Gerencie suas turmas, monitore o progresso dos estudantes e acompanhe as atividades em tempo real.
            </p>
          </div>

          {/* Main Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Class Navigation */}
            <div className="lg:col-span-3 space-y-6">
              <ClassNavigationSidebar
                activeClassId={activeClassId}
                onClassSelect={handleClassSelect}
                onCreateClass={handleCreateClass}
              />
              
              <div className="hidden lg:block">
                <QuickActionsPanel onAction={handleQuickAction} />
              </div>
            </div>

            {/* Center Content - Main Analytics */}
            <div className="lg:col-span-6 space-y-6">
              <ClassOverviewCard classData={dashboardData.classOverview} />
              
              <StudentProgressChart 
                progressData={dashboardData.progressData}
                chartType="bar"
              />
              
              <AssignmentTrackingTable
                onViewDetails={handleViewAssignmentDetails}
                onExport={handleExportData}
              />
            </div>

            {/* Right Sidebar - Activity Feed */}
            <div className="lg:col-span-3 space-y-6">
              <RecentActivityFeed 
                activities={dashboardData.recentActivities}
                notifications={mockNotifications}
              />
              
              <div className="lg:hidden">
                <QuickActionsPanel onAction={handleQuickAction} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <RoleBasedNavigation
        user={mockUser}
        currentView="/teacher-dashboard"
        onViewChange={onViewChange}
        className="md:hidden"
      />
    </div>
  );
};

export default TeacherDashboard;