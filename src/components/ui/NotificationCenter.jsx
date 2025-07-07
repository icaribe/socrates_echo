import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';

const NotificationCenter = ({ 
  notifications = [], 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onNotificationClick,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'achievements', 'system'
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    const icons = {
      achievement: 'Trophy',
      system: 'Bell',
      message: 'MessageCircle',
      assignment: 'BookOpen',
      reminder: 'Clock',
      success: 'CheckCircle',
      warning: 'AlertTriangle',
      error: 'AlertCircle'
    };
    return icons[type] || 'Bell';
  };

  const getNotificationColor = (type, priority = 'normal') => {
    if (priority === 'high') return 'text-error';
    
    const colors = {
      achievement: 'text-accent',
      system: 'text-primary',
      message: 'text-secondary',
      assignment: 'text-primary',
      reminder: 'text-warning',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error'
    };
    return colors[type] || 'text-text-secondary';
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'achievements') return notification.type === 'achievement';
    if (filter === 'system') return ['system', 'assignment', 'reminder'].includes(notification.type);
    return true;
  });

  const formatTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora';
    if (diffInMinutes < 60) return `${diffInMinutes}m atrás`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`;
    return `${Math.floor(diffInMinutes / 1440)}d atrás`;
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={handleToggle}
        className="relative p-2 text-text-secondary hover:text-primary hover:bg-background rounded-soft transition-smooth"
        aria-label="Notificações"
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-data animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] bg-surface border border-border rounded-soft shadow-elevated z-modal animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-heading font-semibold text-text-primary">
              Notificações
            </h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="text-xs text-primary hover:text-accent transition-smooth"
                >
                  Marcar todas como lidas
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-text-secondary hover:text-primary rounded-soft transition-smooth"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-border-muted">
            {[
              { key: 'all', label: 'Todas', count: notifications.length },
              { key: 'unread', label: 'Não lidas', count: unreadCount },
              { key: 'achievements', label: 'Conquistas', count: notifications.filter(n => n.type === 'achievement').length },
              { key: 'system', label: 'Sistema', count: notifications.filter(n => ['system', 'assignment', 'reminder'].includes(n.type)).length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex-1 px-3 py-2 text-xs font-medium transition-smooth ${
                  filter === tab.key
                    ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-primary hover:bg-background'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-border text-text-secondary rounded-full text-xs font-data">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 border-b border-border-muted hover:bg-background transition-smooth cursor-pointer ${
                    !notification.read ? 'bg-accent/5 border-l-2 border-l-accent' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 ${getNotificationColor(notification.type, notification.priority)}`}>
                      <Icon name={getNotificationIcon(notification.type)} size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className={`text-sm font-medium ${
                          !notification.read ? 'text-text-primary' : 'text-text-secondary'
                        }`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-2 ml-2">
                          <span className="text-xs text-text-secondary whitespace-nowrap">
                            {formatTime(notification.timestamp)}
                          </span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      {notification.action && (
                        <button className="text-xs text-primary hover:text-accent mt-2 font-medium">
                          {notification.action.label}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Icon name="Bell" size={32} className="mx-auto mb-3 text-text-secondary opacity-50" />
                <p className="text-sm text-text-secondary">
                  {filter === 'unread' ? 'Nenhuma notificação não lida' : 
                   filter === 'achievements' ? 'Nenhuma conquista recente' :
                   filter === 'system' ? 'Nenhuma notificação do sistema' :
                   'Nenhuma notificação'}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {filteredNotifications.length > 5 && (
            <div className="p-3 border-t border-border text-center">
              <button className="text-sm text-primary hover:text-accent transition-smooth font-medium">
                Ver todas as notificações
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-text-primary/20 z-navigation md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default NotificationCenter;