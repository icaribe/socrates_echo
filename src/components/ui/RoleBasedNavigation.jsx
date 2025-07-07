import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const RoleBasedNavigation = ({ user, currentView, onViewChange, className = '' }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const studentNavItems = [
    {
      path: '/student-dashboard',
      label: 'Dashboard',
      icon: 'Home',
      description: 'Visão geral do progresso'
    },
    {
      path: '/philosophy-journey-mode',
      label: 'Jornada',
      icon: 'Compass',
      description: 'Modo de aprendizado interativo'
    },
    {
      path: '/learning-trails-management',
      label: 'Trilhas',
      icon: 'Map',
      description: 'Gerenciar trilhas de aprendizado'
    }
  ];

  const teacherNavItems = [
    {
      path: '/teacher-dashboard',
      label: 'Dashboard',
      icon: 'BarChart3',
      description: 'Visão geral das turmas'
    },
    {
      path: '/class-management-interface',
      label: 'Turmas',
      icon: 'Users',
      description: 'Gerenciar turmas e alunos'
    },
    {
      path: '/learning-trails-management',
      label: 'Trilhas',
      icon: 'BookOpen',
      description: 'Criar e editar trilhas'
    }
  ];

  const navItems = user?.role === 'teacher' ? teacherNavItems : studentNavItems;

  const handleNavigation = (path) => {
    onViewChange(path);
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  // Mobile Bottom Navigation for Students
  if (isMobile && user?.role === 'student') {
    return (
      <nav className={`fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-navigation ${className}`}>
        <div className="flex items-center justify-around h-18 px-2">
          {navItems.map((item) => {
            const isActive = currentView === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-soft transition-smooth ${
                  isActive
                    ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-primary hover:bg-background'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={isActive ? 'text-primary' : 'text-current'} 
                />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
                {isActive && (
                  <div className="w-4 h-0.5 bg-primary rounded-full mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // Mobile Accordion Navigation for Teachers
  if (isMobile && user?.role === 'teacher') {
    return (
      <nav className={`bg-surface border-b border-border ${className}`}>
        <div className="px-4 py-3">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentView === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center space-x-3 w-full px-3 py-3 rounded-soft transition-smooth ${
                    isActive
                      ? 'text-primary bg-primary/10 border-l-2 border-primary' :'text-text-secondary hover:text-primary hover:bg-background'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-text-secondary">{item.description}</div>
                  </div>
                  {isActive && (
                    <Icon name="ChevronRight" size={16} className="text-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    );
  }

  // Desktop Sidebar Navigation
  return (
    <nav className={`fixed left-0 top-16 bottom-0 bg-surface border-r border-border z-navigation transition-all duration-300 ${
      sidebarExpanded ? 'w-64' : 'w-16'
    } ${className}`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {sidebarExpanded && (
          <div>
            <h2 className="font-heading font-semibold text-text-primary">
              {user?.role === 'teacher' ? 'Painel do Professor' : 'Painel do Estudante'}
            </h2>
            <p className="text-xs text-text-secondary font-caption">
              {user?.role === 'teacher' ? 'Ferramentas administrativas' : 'Jornada de aprendizado'}
            </p>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 text-text-secondary hover:text-primary hover:bg-background rounded-soft transition-smooth"
        >
          <Icon name={sidebarExpanded ? "ChevronLeft" : "ChevronRight"} size={16} />
        </button>
      </div>

      {/* Navigation Items */}
      <div className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = currentView === item.path;
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center w-full p-3 rounded-soft transition-smooth group ${
                isActive
                  ? 'text-primary bg-primary/10 border-l-2 border-primary' :'text-text-secondary hover:text-primary hover:bg-background'
              }`}
              title={!sidebarExpanded ? item.label : ''}
            >
              <Icon 
                name={item.icon} 
                size={20} 
                className={`${isActive ? 'text-primary' : 'text-current'} ${
                  sidebarExpanded ? 'mr-3' : 'mx-auto'
                }`} 
              />
              {sidebarExpanded && (
                <div className="flex-1 text-left">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-text-secondary group-hover:text-text-primary transition-smooth">
                    {item.description}
                  </div>
                </div>
              )}
              {isActive && sidebarExpanded && (
                <Icon name="ChevronRight" size={16} className="text-primary" />
              )}
            </button>
          );
        })}
      </div>

      {/* User Info Section */}
      {sidebarExpanded && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-background/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="User" size={18} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {user?.name || 'Usuário'}
              </p>
              <p className="text-xs text-text-secondary">
                {user?.role === 'teacher' ? 'Professor' : 'Estudante'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed User Indicator */}
      {!sidebarExpanded && (
        <div className="absolute bottom-4 left-0 right-0 px-2">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="User" size={18} className="text-primary" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default RoleBasedNavigation;