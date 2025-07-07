import React, { useState, useEffect } from 'react';
import AuthenticationCard from './components/AuthenticationCard';
import LanguageSelector from './components/LanguageSelector';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import BackgroundArt from './components/BackgroundArt';

const AuthenticationScreen = ({ onNavigate }) => {
  const [currentLanguage, setCurrentLanguage] = useState('pt');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
  };

  const handleAuthenticate = (user) => {
    // Save user data to localStorage for persistence
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Navigate to appropriate dashboard based on role
    if (user.role === 'teacher') {
      onNavigate('/teacher-dashboard');
    } else {
      onNavigate('/student-dashboard');
    }
  };

  const handleJoinClass = (classCode) => {
    // Mock join class functionality
    console.log('Joining class with code:', classCode);
    // In real app, this would validate the code and join the class
    // For now, just navigate to student dashboard
    const mockStudent = {
      id: 3,
      name: 'Estudante Convidado',
      email: 'convidado@teste.com',
      role: 'student',
      avatar: null,
      joinedClass: classCode
    };
    localStorage.setItem('currentUser', JSON.stringify(mockStudent));
    onNavigate('/student-dashboard');
  };

  const handleCreateClass = () => {
    // Navigate to class creation
    onNavigate('/class-management-interface');
  };

  const translations = {
    pt: {
      title: 'Socrates Echo',
      subtitle: 'Filosofia Interativa',
      forgotPassword: 'Esqueceu sua senha?'
    },
    en: {
      title: 'Socrates Echo',
      subtitle: 'Interactive Philosophy',
      forgotPassword: 'Forgot your password?'
    },
    es: {
      title: 'Socrates Echo',
      subtitle: 'Filosofía Interactiva',
      forgotPassword: '¿Olvidaste tu contraseña?'
    }
  };

  const t = translations[currentLanguage];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Art */}
      <BackgroundArt />

      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-header">
        <LanguageSelector
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-content min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AuthenticationCard
            onAuthenticate={handleAuthenticate}
            onJoinClass={handleJoinClass}
            onCreateClass={handleCreateClass}
          />
          
          {/* Forgot Password Link */}
          <div className="text-center mt-6">
            <button
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-text-secondary hover:text-primary transition-smooth"
            >
              {t.forgotPassword}
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />

      {/* Loading Overlay for Smooth Transitions */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-loading opacity-0 pointer-events-none transition-opacity duration-300" />
    </div>
  );
};

export default AuthenticationScreen;