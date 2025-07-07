import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingNavigation = ({ 
  onNavigate, 
  currentView, 
  user,
  onToggleSettings,
  onToggleProgress,
  onToggleHistory,
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);

  const navigationItems = [
    {
      id: 'dashboard',
      icon: 'Home',
      label: 'Dashboard',
      route: user?.role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard',
      color: 'text-primary'
    },
    {
      id: 'trails',
      icon: 'Map',
      label: 'Trilhas',
      route: '/learning-trails-management',
      color: 'text-secondary'
    },
    {
      id: 'classes',
      icon: 'Users',
      label: user?.role === 'teacher' ? 'Turmas' : 'Comunidade',
      route: '/class-management-interface',
      color: 'text-accent'
    }
  ];

  const actionItems = [
    {
      id: 'progress',
      icon: 'BarChart3',
      label: 'Progresso',
      action: onToggleProgress,
      color: 'text-success'
    },
    {
      id: 'history',
      icon: 'History',
      label: 'Histórico',
      action: onToggleHistory,
      color: 'text-warning'
    },
    {
      id: 'settings',
      icon: 'Settings',
      label: 'Configurações',
      action: onToggleSettings,
      color: 'text-text-secondary'
    }
  ];

  const handleItemClick = (item) => {
    if (item.route) {
      onNavigate(item.route);
    } else if (item.action) {
      item.action();
    }
    setIsExpanded(false);
  };

  const handleMouseEnter = (itemId) => {
    if (!isExpanded) {
      setShowTooltip(itemId);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(null);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-navigation ${className}`}>
      {/* Expanded Menu Items */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-2 animate-fade-in">
          {/* Navigation Items */}
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => handleItemClick(item)}
                  className="flex items-center space-x-3 bg-surface hover:bg-background border border-border rounded-soft p-3 shadow-soft transition-all duration-200 hover:shadow-elevated"
                >
                  <Icon name={item.icon} size={18} className={item.color} />
                  <span className="text-sm font-medium text-text-primary whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-border my-2" />

          {/* Action Items */}
          <div className="space-y-2">
            {actionItems.map((item) => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => handleItemClick(item)}
                  className="flex items-center space-x-3 bg-surface hover:bg-background border border-border rounded-soft p-3 shadow-soft transition-all duration-200 hover:shadow-elevated"
                >
                  <Icon name={item.icon} size={18} className={item.color} />
                  <span className="text-sm font-medium text-text-primary whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collapsed Quick Actions */}
      {!isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-2">
          {/* Quick Progress Button */}
          <div className="relative">
            <button
              onClick={onToggleProgress}
              onMouseEnter={() => handleMouseEnter('progress')}
              onMouseLeave={handleMouseLeave}
              className="w-12 h-12 bg-surface hover:bg-background border border-border rounded-full shadow-soft hover:shadow-elevated transition-all duration-200 flex items-center justify-center"
            >
              <Icon name="BarChart3" size={20} className="text-success" />
            </button>
            
            {showTooltip === 'progress' && (
              <div className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-text-primary text-primary-foreground px-2 py-1 rounded text-xs whitespace-nowrap">
                Progresso
              </div>
            )}
          </div>

          {/* Quick History Button */}
          <div className="relative">
            <button
              onClick={onToggleHistory}
              onMouseEnter={() => handleMouseEnter('history')}
              onMouseLeave={handleMouseLeave}
              className="w-12 h-12 bg-surface hover:bg-background border border-border rounded-full shadow-soft hover:shadow-elevated transition-all duration-200 flex items-center justify-center"
            >
              <Icon name="History" size={20} className="text-warning" />
            </button>
            
            {showTooltip === 'history' && (
              <div className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-text-primary text-primary-foreground px-2 py-1 rounded text-xs whitespace-nowrap">
                Histórico
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full shadow-elevated transition-all duration-300 flex items-center justify-center ${
          isExpanded 
            ? 'bg-error hover:bg-error/80 text-error-foreground rotate-45' 
            : 'bg-primary hover:bg-primary/80 text-primary-foreground'
        }`}
      >
        <Icon 
          name={isExpanded ? "X" : "Menu"} 
          size={24} 
          className="transition-transform duration-300"
        />
      </button>

      {/* Background Overlay for Mobile */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-text-primary/20 backdrop-blur-sm -z-10 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Journey Mode Indicator */}
      <div className="absolute -top-2 -left-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
        <Icon name="Compass" size={12} className="text-accent-foreground" />
      </div>
    </div>
  );
};

export default FloatingNavigation;