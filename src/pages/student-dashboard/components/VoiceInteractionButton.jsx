import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceInteractionButton = ({ onStartVoiceInteraction, isListening = false }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState('prompt');
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    // Check if Web Speech API is supported
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!speechRecognition);

    // Check microphone permission
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'microphone' })
        .then(permissionStatus => {
          setPermission(permissionStatus.state);
          
          permissionStatus.onchange = () => {
            setPermission(permissionStatus.state);
          };
        })
        .catch(() => {
          setPermission('prompt');
        });
    }
  }, []);

  useEffect(() => {
    if (isListening) {
      setPulseAnimation(true);
      const interval = setInterval(() => {
        setPulseAnimation(prev => !prev);
      }, 1000);
      
      return () => clearInterval(interval);
    } else {
      setPulseAnimation(false);
    }
  }, [isListening]);

  const handleVoiceInteraction = async () => {
    if (!isSupported) {
      alert('Seu navegador não suporta reconhecimento de voz. Tente usar Chrome ou Edge.');
      return;
    }

    if (permission === 'denied') {
      alert('Permissão de microfone negada. Habilite nas configurações do navegador.');
      return;
    }

    try {
      if (permission === 'prompt') {
        // Request microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      
      onStartVoiceInteraction();
    } catch (error) {
      console.error('Erro ao acessar microfone:', error);
      alert('Não foi possível acessar o microfone. Verifique as permissões.');
    }
  };

  if (!isSupported) {
    return (
      <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50">
        <div className="bg-surface rounded-full p-3 shadow-elevated border border-border">
          <div className="flex items-center space-x-2">
            <Icon name="MicOff" size={20} className="text-text-secondary" />
            <span className="text-xs text-text-secondary hidden md:block">
              Voz não suportada
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50">
      <div className="relative">
        {/* Pulse Animation Ring */}
        {isListening && (
          <div className="absolute inset-0 rounded-full border-2 border-accent animate-ping opacity-75" />
        )}
        
        {/* Main Button */}
        <Button
          variant={isListening ? "accent" : "primary"}
          shape="circle"
          size="lg"
          onClick={handleVoiceInteraction}
          disabled={isListening}
          className={`shadow-elevated hover:shadow-soft transition-all duration-300 ${
            pulseAnimation ? 'scale-110' : 'scale-100'
          }`}
          title="Iniciar conversa por voz com Sócrates"
        >
          <Icon 
            name={isListening ? "Square" : "Mic"} 
            size={24} 
            className={isListening ? "text-accent-foreground" : "text-primary-foreground"}
          />
        </Button>

        {/* Status Indicator */}
        <div className="absolute -top-2 -right-2">
          <div className={`w-4 h-4 rounded-full border-2 border-surface ${
            isListening ? 'bg-accent animate-pulse' : 
            permission === 'granted' ? 'bg-success' : 
            permission === 'denied' ? 'bg-error' : 'bg-warning'
          }`} />
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-text-primary text-background text-xs px-3 py-2 rounded-soft whitespace-nowrap">
            {isListening ? 'Ouvindo... Clique para parar' : 'Conversar com Sócrates'}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-text-primary" />
          </div>
        </div>
      </div>

      {/* Voice Interaction Modal Overlay */}
      {isListening && (
        <div className="fixed inset-0 bg-text-primary/20 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="bg-surface rounded-soft p-8 shadow-elevated border border-border max-w-sm mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Mic" size={32} className="text-accent animate-pulse" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                Ouvindo...
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                Faça sua pergunta filosófica para Sócrates
              </p>
              <Button
                variant="outline"
                onClick={() => onStartVoiceInteraction(false)}
                iconName="Square"
                iconPosition="left"
              >
                Parar Gravação
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceInteractionButton;