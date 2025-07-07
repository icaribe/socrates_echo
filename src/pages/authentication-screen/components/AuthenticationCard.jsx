import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AuthenticationCard = ({ onAuthenticate, onJoinClass, onCreateClass }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: 'student',
    rememberMe: false
  });

  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    schoolAffiliation: ''
  });

  const [joinClassCode, setJoinClassCode] = useState('');

  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.email) newErrors.email = 'Email é obrigatório';
    if (!loginData.password) newErrors.password = 'Senha é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors = {};
    if (!registerData.fullName) newErrors.fullName = 'Nome completo é obrigatório';
    if (!registerData.email) newErrors.email = 'Email é obrigatório';
    if (!registerData.password) newErrors.password = 'Senha é obrigatória';
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }
    if (registerData.role === 'teacher' && !registerData.schoolAffiliation) {
      newErrors.schoolAffiliation = 'Afiliação escolar é obrigatória para professores';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setLoading(true);
    try {
      // Mock authentication - in real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock credentials for testing
      const mockCredentials = {
        student: { email: 'aluno@teste.com', password: '123456' },
        teacher: { email: 'professor@teste.com', password: '123456' }
      };

      if (loginData.email === mockCredentials[loginData.role].email && 
          loginData.password === mockCredentials[loginData.role].password) {
        onAuthenticate({
          id: 1,
          name: loginData.role === 'student' ? 'Ana Silva' : 'Prof. Carlos Santos',
          email: loginData.email,
          role: loginData.role,
          avatar: null
        });
      } else {
        setErrors({ general: 'Credenciais inválidas. Use aluno@teste.com/123456 ou professor@teste.com/123456' });
      }
    } catch (error) {
      setErrors({ general: 'Erro ao fazer login. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateRegister()) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onAuthenticate({
        id: 2,
        name: registerData.fullName,
        email: registerData.email,
        role: registerData.role,
        avatar: null
      });
    } catch (error) {
      setErrors({ general: 'Erro ao criar conta. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClass = () => {
    if (joinClassCode.length === 6) {
      onJoinClass(joinClassCode);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-surface rounded-soft shadow-elevated border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-heading font-bold text-primary mb-2">
          Socrates Echo
        </h1>
        <p className="text-sm text-text-secondary font-caption">
          Filosofia Interativa
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-border-muted">
        <button
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-smooth ${
            activeTab === 'login' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-primary hover:bg-background'
          }`}
        >
          Entrar
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-smooth ${
            activeTab === 'register' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-primary hover:bg-background'
          }`}
        >
          Registrar
        </button>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {errors.general && (
          <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-soft">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm text-error">{errors.general}</span>
            </div>
          </div>
        )}

        {activeTab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email ou nome de usuário"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className={errors.email ? 'border-error' : ''}
              />
              {errors.email && (
                <p className="text-xs text-error mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className={errors.password ? 'border-error' : ''}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-primary"
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
              </button>
              {errors.password && (
                <p className="text-xs text-error mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Tipo de usuário
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={loginData.role === 'student'}
                    onChange={(e) => setLoginData({ ...loginData, role: e.target.value })}
                    className="mr-2"
                  />
                  <span className="text-sm text-text-primary">Estudante</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="teacher"
                    checked={loginData.role === 'teacher'}
                    onChange={(e) => setLoginData({ ...loginData, role: e.target.value })}
                    className="mr-2"
                  />
                  <span className="text-sm text-text-primary">Professor</span>
                </label>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={loginData.rememberMe}
                onChange={(e) => setLoginData({ ...loginData, rememberMe: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm text-text-secondary">
                Lembrar de mim
              </label>
            </div>

            <Button
              variant="primary"
              type="submit"
              loading={loading}
              fullWidth
              className="mt-6"
            >
              Entrar
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Nome completo"
                value={registerData.fullName}
                onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                className={errors.fullName ? 'border-error' : ''}
              />
              {errors.fullName && (
                <p className="text-xs text-error mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                className={errors.email ? 'border-error' : ''}
              />
              {errors.email && (
                <p className="text-xs text-error mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                className={errors.password ? 'border-error' : ''}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-primary"
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
              </button>
              {errors.password && (
                <p className="text-xs text-error mt-1">{errors.password}</p>
              )}
            </div>

            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmar senha"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                className={errors.confirmPassword ? 'border-error' : ''}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-primary"
              >
                <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
              </button>
              {errors.confirmPassword && (
                <p className="text-xs text-error mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Tipo de usuário
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="registerRole"
                    value="student"
                    checked={registerData.role === 'student'}
                    onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
                    className="mr-2"
                  />
                  <span className="text-sm text-text-primary">Estudante</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="registerRole"
                    value="teacher"
                    checked={registerData.role === 'teacher'}
                    onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
                    className="mr-2"
                  />
                  <span className="text-sm text-text-primary">Professor</span>
                </label>
              </div>
            </div>

            {registerData.role === 'teacher' && (
              <div>
                <Input
                  type="text"
                  placeholder="Escola/Instituição"
                  value={registerData.schoolAffiliation}
                  onChange={(e) => setRegisterData({ ...registerData, schoolAffiliation: e.target.value })}
                  className={errors.schoolAffiliation ? 'border-error' : ''}
                />
                {errors.schoolAffiliation && (
                  <p className="text-xs text-error mt-1">{errors.schoolAffiliation}</p>
                )}
              </div>
            )}

            <Button
              variant="primary"
              type="submit"
              loading={loading}
              fullWidth
              className="mt-6"
            >
              Criar Conta
            </Button>
          </form>
        )}

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-border-muted">
          {activeTab === 'login' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Estudantes: Entrar em uma turma
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Código da turma (6 dígitos)"
                    value={joinClassCode}
                    onChange={(e) => setJoinClassCode(e.target.value.toUpperCase().slice(0, 6))}
                    maxLength={6}
                    className="flex-1"
                  />
                  <Button
                    variant="secondary"
                    onClick={handleJoinClass}
                    disabled={joinClassCode.length !== 6}
                  >
                    Entrar
                  </Button>
                </div>
              </div>

              <button
                onClick={onCreateClass}
                className="w-full text-sm text-primary hover:text-accent transition-smooth"
              >
                Professores: Criar nova turma
              </button>
            </>
          )}
        </div>

        {/* Forgot Password */}
        <div className="mt-4 text-center">
          <button className="text-sm text-text-secondary hover:text-primary transition-smooth">
            Esqueceu sua senha?
          </button>
        </div>

        {/* Social Authentication */}
        <div className="mt-6 pt-6 border-t border-border-muted">
          <p className="text-xs text-text-secondary text-center mb-4">
            Ou continue com
          </p>
          <div className="space-y-2">
            <Button variant="outline" fullWidth iconName="Mail">
              Continuar com Google
            </Button>
            <Button variant="outline" fullWidth iconName="Facebook">
              Continuar com Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationCard;