import React, { useState } from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';

const AdaptiveHeader = ({ user, currentView, onViewChange, notifications = [] }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationToggle = () => {
    setNotificationOpen(!notificationOpen);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleViewChange = (view) => {
    onViewChange(view);
    setMobileMenuOpen(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const studentQuickActions = [
    { icon: 'BookOpen', label: 'Continuar Jornada', action: () => handleViewChange('/philosophy-journey-mode') },
    { icon: 'Target', label: 'Trilhas', action: () => handleViewChange('/learning-trails-management') },
    { icon: 'Award', label: 'Conquistas', action: () => {} },
  ];

  const teacherQuickActions = [
    { icon: 'Users', label: 'Turmas', action: () => handleViewChange('/class-management-interface') },
    { icon: 'BarChart3', label: 'Relatórios', action: () => {} },
    { icon: 'Settings', label: 'Configurações', action: () => {} },
  ];

  const quickActions = user?.role === 'teacher' ? teacherQuickActions : studentQuickActions;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-header">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-soft flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground">
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  />
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-heading font-semibold text-primary">
                  Socrates Echo
                </h1>
                <p className="text-xs text-text-secondary font-caption">
                  Filosofia Interativa
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - Quick Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-background rounded-soft transition-smooth"
              >
                <Icon name={action.icon} size={16} />
                <span>{action.label}</span>
              </button>
            ))}
          </div>

          {/* User Info and Actions */}
          <div className="flex items-center space-x-3">
            {/* Greeting - Hidden on mobile */}
            <div className="hidden md:block text-right">
              <p className="text-sm text-text-secondary">
                {getGreeting()}, {user?.name || 'Usuário'}
              </p>
              <p className="text-xs text-text-secondary font-caption">
                {user?.role === 'teacher' ? 'Professor' : 'Estudante'}
              </p>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={handleNotificationToggle}
                className="relative p-2 text-text-secondary hover:text-primary hover:bg-background rounded-soft transition-smooth"
              >
                <Icon name="Bell" size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-data">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notificationOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-soft shadow-elevated z-modal">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-heading font-semibold text-text-primary">
                      Notificações
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.slice(0, 5).map((notification, index) => (
                        <div
                          key={index}
                          className={`p-4 border-b border-border-muted hover:bg-background transition-smooth ${
                            !notification.read ? 'bg-accent/5' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              !notification.read ? 'bg-accent' : 'bg-border'
                            }`} />
                            <div className="flex-1">
                              <p className="text-sm text-text-primary">
                                {notification.message}
                              </p>
                              <p className="text-xs text-text-secondary mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-text-secondary">
                        <Icon name="Bell" size={24} className="mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Nenhuma notificação</p>
                      </div>
                    )}
                  </div>
                  {notifications.length > 5 && (
                    <div className="p-3 border-t border-border">
                      <button className="w-full text-sm text-primary hover:text-accent transition-smooth">
                        Ver todas as notificações
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Avatar */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <Icon name="User" size={16} className="text-primary" />
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={handleMobileMenuToggle}
              className="lg:hidden p-2 text-text-secondary hover:text-primary hover:bg-background rounded-soft transition-smooth"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface border-t border-border">
            <div className="px-4 py-3 space-y-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="flex items-center space-x-3 w-full px-3 py-2 text-left text-text-secondary hover:text-primary hover:bg-background rounded-soft transition-smooth"
                >
                  <Icon name={action.icon} size={18} />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Notification Overlay for Mobile */}
      {notificationOpen && (
        <div
          className="fixed inset-0 bg-text-primary/20 z-navigation lg:hidden"
          onClick={() => setNotificationOpen(false)}
        />
      )}

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-text-primary/20 z-navigation lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default AdaptiveHeader;