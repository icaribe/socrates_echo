import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email é obrigatório');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSent(true);
    } catch (err) {
      setError('Erro ao enviar email. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setSent(false);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-text-primary/50 flex items-center justify-center z-modal p-4">
      <div className="bg-surface rounded-soft shadow-elevated border border-border w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Recuperar Senha
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-text-secondary hover:text-primary hover:bg-background rounded-soft transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-text-secondary mb-4">
                Digite seu email para receber instruções de recuperação de senha.
              </p>

              <div>
                <Input
                  type="email"
                  placeholder="Seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={error ? 'border-error' : ''}
                />
                {error && (
                  <p className="text-xs text-error mt-1">{error}</p>
                )}
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  fullWidth
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  loading={loading}
                  fullWidth
                >
                  Enviar
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Mail" size={24} className="text-success" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                Email Enviado!
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
              </p>
              <Button
                variant="primary"
                onClick={handleClose}
                fullWidth
              >
                Entendi
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;