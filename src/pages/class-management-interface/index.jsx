import React, { useState, useEffect } from 'react';
import AdaptiveHeader from '../../components/ui/AdaptiveHeader';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import ClassOverview from './components/ClassOverview';
import StudentManagement from './components/StudentManagement';
import TrailAssignment from './components/TrailAssignment';
import ClassSettings from './components/ClassSettings';
import Icon from '../../components/AppIcon';

const ClassManagementInterface = () => {
  const [currentView, setCurrentView] = useState('/class-management-interface');
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Prof. João Silva",
    email: "joao.silva@escola.edu.br",
    role: "teacher",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
  };

  // Mock class data
  const mockClassData = {
    id: 1,
    className: "Filosofia Moderna",
    description: "Explorando pensadores dos séculos XVII-XVIII",
    createdDate: "2024-01-15",
    inviteCode: "FIL2024",
    totalStudents: 28,
    activeStudents: 24,
    completedAssignments: 156,
    averageProgress: 72,
    maxStudents: 30,
    allowSelfEnrollment: true,
    requireApproval: false,
    enableChat: true,
    enableNotifications: true,
    autoAssignTrails: false,
    gradePassingScore: 70,
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo'
  };

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      title: "Nova inscrição",
      message: "Ana Silva se inscreveu na turma",
      timestamp: new Date(Date.now() - 300000),
      read: false,
      type: "system"
    },
    {
      id: 2,
      title: "Trilha concluída",
      message: "Carlos Santos completou \'Descartes e o Racionalismo'",
      timestamp: new Date(Date.now() - 900000),
      read: false,
      type: "achievement"
    },
    {
      id: 3,
      title: "Discussão iniciada",
      message: "Nova discussão sobre \'O Cogito Cartesiano'",
      timestamp: new Date(Date.now() - 1800000),
      read: true,
      type: "message"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setUser(mockUser);
      setClassData(mockClassData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleViewChange = (newView) => {
    setCurrentView(newView);
  };

  const handleStudentAction = (action, data) => {
    console.log('Student action:', action, data);
    // Handle student management actions
    switch (action) {
      case 'invite':
        // Open invite modal
        break;
      case 'view':
        // Navigate to student profile
        break;
      case 'message':
        // Open messaging interface
        break;
      case 'export':
        // Export student data
        break;
      default:
        break;
    }
  };

  const handleTrailAction = (action, data) => {
    console.log('Trail action:', action, data);
    // Handle trail assignment actions
    switch (action) {
      case 'create':
        // Navigate to trail creation
        break;
      case 'assign':
        // Assign trails to students
        break;
      case 'preview':
        // Show trail preview
        break;
      case 'edit':
        // Navigate to trail editor
        break;
      default:
        break;
    }
  };

  const handleSettingsUpdate = (newSettings) => {
    console.log('Settings updated:', newSettings);
    setClassData(prev => ({ ...prev, ...newSettings }));
  };

  const handleDeleteClass = () => {
    console.log('Class deleted');
    // Navigate back to teacher dashboard
    setCurrentView('/teacher-dashboard');
  };

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: 'BarChart3' },
    { id: 'students', label: 'Estudantes', icon: 'Users' },
    { id: 'trails', label: 'Trilhas', icon: 'BookOpen' },
    { id: 'settings', label: 'Configurações', icon: 'Settings' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AdaptiveHeader 
          user={mockUser}
          currentView={currentView}
          onViewChange={handleViewChange}
          notifications={mockNotifications}
        />
        <RoleBasedNavigation
          user={mockUser}
          currentView={currentView}
          onViewChange={handleViewChange}
        />
        
        <main className="pt-16 lg:pl-64">
          <div className="p-6">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Icon name="Loader2" size={32} className="text-primary animate-spin" />
                </div>
                <p className="text-text-secondary">Carregando dados da turma...</p>
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
        user={user}
        currentView={currentView}
        onViewChange={handleViewChange}
        notifications={mockNotifications}
      />
      
      <RoleBasedNavigation
        user={user}
        currentView={currentView}
        onViewChange={handleViewChange}
      />
      
      <main className="pt-16 lg:pl-64 pb-20 lg:pb-0">
        <div className="p-4 lg:p-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
            <button 
              onClick={() => handleViewChange('/teacher-dashboard')}
              className="hover:text-primary transition-smooth"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={16} />
            <span className="text-text-primary">Gerenciamento de Turma</span>
            <Icon name="ChevronRight" size={16} />
            <span className="text-text-primary">{classData?.className}</span>
          </div>

          {/* Tab Navigation */}
          <div className="bg-surface rounded-soft shadow-soft mb-6 overflow-hidden">
            <div className="border-b border-border">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-smooth ${
                      activeTab === tab.id
                        ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-primary hover:bg-background'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <ClassOverview
                classData={classData}
                enrollmentStats={{
                  newEnrollments: 3,
                  activeThisWeek: 22,
                  completionRate: 68
                }}
                performanceData={[
                  { name: 'Jan', progress: 45 },
                  { name: 'Fev', progress: 52 },
                  { name: 'Mar', progress: 61 },
                  { name: 'Abr', progress: 72 }
                ]}
              />
            )}

            {activeTab === 'students' && (
              <StudentManagement
                students={[]}
                onStudentAction={handleStudentAction}
              />
            )}

            {activeTab === 'trails' && (
              <TrailAssignment
                availableTrails={[]}
                assignedTrails={[]}
                onAssignTrail={handleTrailAction}
                onUnassignTrail={handleTrailAction}
              />
            )}

            {activeTab === 'settings' && (
              <ClassSettings
                classData={classData}
                onUpdateSettings={handleSettingsUpdate}
                onDeleteClass={handleDeleteClass}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClassManagementInterface;