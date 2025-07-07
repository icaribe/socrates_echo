import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InteractiveDialogue = ({ 
  currentDialogue, 
  onResponseSubmit, 
  onChoiceSelect, 
  isAIResponding = false,
  conversationHistory = [],
  className = '' 
}) => {
  const [textInput, setTextInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'pt-BR';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTextInput(transcript);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory, currentDialogue]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVoiceInput = () => {
    if (recognition && !isListening) {
      setIsListening(true);
      recognition.start();
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      onResponseSubmit(textInput.trim());
      setTextInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTextSubmit();
    }
  };

  const formatMessage = (message) => {
    // Simple markdown-like formatting
    return message
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-border px-1 rounded text-sm">$1</code>');
  };

  return (
    <div className={`bg-surface rounded-soft shadow-soft ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="MessageCircle" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-text-primary">
              Diálogo Socrático
            </h3>
            <p className="text-xs text-text-secondary">
              {currentDialogue?.philosopher || 'Sócrates'} - Método Maiêutico
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 text-text-secondary hover:text-primary hover:bg-background rounded-soft transition-smooth"
            title="Histórico da conversa"
          >
            <Icon name="History" size={16} />
          </button>
          
          <div className="flex items-center space-x-1 text-xs text-text-secondary">
            <div className={`w-2 h-2 rounded-full ${isAIResponding ? 'bg-accent animate-pulse' : 'bg-success'}`} />
            <span>{isAIResponding ? 'Pensando...' : 'Ativo'}</span>
          </div>
        </div>
      </div>

      {/* Conversation Area */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {/* Conversation History */}
        {showHistory && conversationHistory.length > 0 && (
          <div className="space-y-3 pb-4 border-b border-border-muted">
            <h4 className="text-sm font-medium text-text-secondary flex items-center space-x-2">
              <Icon name="History" size={14} />
              <span>Histórico da Conversa</span>
            </h4>
            {conversationHistory.slice(-5).map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-soft text-sm ${
                  message.sender === 'user' ?'bg-primary text-primary-foreground' :'bg-background text-text-primary border border-border'
                }`}>
                  <div dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }} />
                  <div className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Current Dialogue */}
        {currentDialogue && (
          <div className="space-y-4">
            {/* AI Message */}
            <div className="flex justify-start">
              <div className="flex space-x-3 max-w-4xl">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={16} className="text-primary" />
                </div>
                <div className="bg-background border border-border rounded-soft p-4 flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-text-primary">
                      {currentDialogue.philosopher || 'Sócrates'}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {currentDialogue.timestamp && new Date(currentDialogue.timestamp).toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  <div 
                    className="text-text-primary leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formatMessage(currentDialogue.message) }}
                  />
                  
                  {/* Philosophical Context */}
                  {currentDialogue.concept && (
                    <div className="mt-3 p-2 bg-accent/10 rounded-soft">
                      <div className="flex items-center space-x-2 text-xs text-accent">
                        <Icon name="Lightbulb" size={12} />
                        <span className="font-medium">Conceito: {currentDialogue.concept}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Multiple Choice Options */}
            {currentDialogue.choices && currentDialogue.choices.length > 0 && (
              <div className="space-y-2 ml-11">
                <p className="text-sm text-text-secondary mb-3">Escolha sua resposta:</p>
                {currentDialogue.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => onChoiceSelect(choice)}
                    disabled={isAIResponding}
                    className="w-full text-left p-3 rounded-soft border border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center text-xs font-data mt-0.5">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-text-primary">{choice.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* AI Thinking Indicator */}
        {isAIResponding && (
          <div className="flex justify-start">
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              <div className="bg-background border border-border rounded-soft p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                  </div>
                  <span className="text-sm text-text-secondary">Refletindo sobre sua resposta...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-3">
          <div className="flex-1">
            <Input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua resposta ou reflexão..."
              disabled={isAIResponding}
              className="w-full"
            />
          </div>
          
          <div className="flex space-x-2">
            {recognition && (
              <Button
                variant={isListening ? "warning" : "ghost"}
                onClick={handleVoiceInput}
                disabled={isAIResponding || isListening}
                iconName={isListening ? "Square" : "Mic"}
                className="w-10 h-10"
              />
            )}
            
            <Button
              variant="primary"
              onClick={handleTextSubmit}
              disabled={!textInput.trim() || isAIResponding}
              iconName="Send"
              className="w-10 h-10"
            />
          </div>
        </div>
        
        {isListening && (
          <div className="flex items-center justify-center mt-2 text-accent">
            <Icon name="Mic" size={16} className="mr-2" />
            <span className="text-sm">Ouvindo... Fale agora</span>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-2 text-xs text-text-secondary">
          <span>Pressione Enter para enviar, Shift+Enter para nova linha</span>
          <span>{textInput.length}/500</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDialogue;