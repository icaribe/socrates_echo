import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PhilosophyAssessment = ({ onAssessmentComplete, isVisible }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [voiceAnswer, setVoiceAnswer] = useState('');
  const [recognition, setRecognition] = useState(null);

  const assessmentQuestions = [
    {
      id: 1,
      question: "O que mais desperta sua curiosidade sobre a existência humana?",
      type: "multiple_choice",
      options: [
        { value: "meaning", label: "O sentido e propósito da vida", philosophy: "existentialism" },
        { value: "knowledge", label: "Como conhecemos a realidade", philosophy: "epistemology" },
        { value: "ethics", label: "O que é certo e errado", philosophy: "ethics" },
        { value: "beauty", label: "A natureza da beleza e arte", philosophy: "aesthetics" }
      ]
    },
    {
      id: 2,
      question: "Quando você enfrenta um dilema moral, qual é sua primeira reação?",
      type: "multiple_choice",
      options: [
        { value: "consequences", label: "Penso nas consequências das ações", philosophy: "utilitarianism" },
        { value: "duty", label: "Considero meus deveres e princípios", philosophy: "deontology" },
        { value: "character", label: "Reflito sobre que tipo de pessoa quero ser", philosophy: "virtue_ethics" },
        { value: "context", label: "Analiso o contexto e as circunstâncias", philosophy: "pragmatism" }
      ]
    },
    {
      id: 3,
      question: "Como você descreveria sua relação com o conhecimento?",
      type: "voice_text",
      placeholder: "Descreva em suas próprias palavras como você busca e valida o conhecimento..."
    },
    {
      id: 4,
      question: "Qual dessas questões filosóficas mais intriga você?",
      type: "multiple_choice",
      options: [
        { value: "consciousness", label: "O que é a consciência?", philosophy: "philosophy_of_mind" },
        { value: "free_will", label: "Temos livre arbítrio?", philosophy: "metaphysics" },
        { value: "justice", label: "O que constitui uma sociedade justa?", philosophy: "political_philosophy" },
        { value: "language", label: "Como a linguagem molda nosso pensamento?", philosophy: "philosophy_of_language" }
      ]
    },
    {
      id: 5,
      question: "Descreva uma experiência que mudou sua perspectiva sobre a vida:",
      type: "voice_text",
      placeholder: "Compartilhe uma experiência pessoal que influenciou sua visão de mundo..."
    }
  ];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'pt-BR';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setVoiceAnswer(transcript);
        setAnswers(prev => ({
          ...prev,
          [currentQuestion]: transcript
        }));
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [currentQuestion]);

  const handleVoiceInput = () => {
    if (recognition && !isListening) {
      setIsListening(true);
      recognition.start();
    }
  };

  const handleAnswerSelect = (value, philosophy) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: { value, philosophy }
    }));
  };

  const handleTextAnswer = (text) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: text
    }));
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setVoiceAnswer('');
    } else {
      completeAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setVoiceAnswer('');
    }
  };

  const completeAssessment = () => {
    const philosophicalProfile = analyzeAnswers(answers);
    onAssessmentComplete(philosophicalProfile);
  };

  const analyzeAnswers = (answers) => {
    const philosophies = {};
    
    Object.values(answers).forEach(answer => {
      if (answer && answer.philosophy) {
        philosophies[answer.philosophy] = (philosophies[answer.philosophy] || 0) + 1;
      }
    });

    const dominantPhilosophy = Object.keys(philosophies).reduce((a, b) => 
      philosophies[a] > philosophies[b] ? a : b, 'general'
    );

    return {
      dominantPhilosophy,
      interests: philosophies,
      personalReflections: Object.values(answers).filter(answer => typeof answer === 'string'),
      recommendedPath: getRecommendedPath(dominantPhilosophy),
      level: 'beginner'
    };
  };

  const getRecommendedPath = (philosophy) => {
    const paths = {
      existentialism: {
        title: "Jornada Existencialista",
        description: "Explore o sentido da existência com Sartre, Camus e Kierkegaard",
        startingConcepts: ["liberdade", "autenticidade", "angústia existencial"]
      },
      ethics: {
        title: "Trilha da Ética",
        description: "Descubra os fundamentos do bem e do mal com grandes pensadores morais",
        startingConcepts: ["virtude", "dever moral", "consequencialismo"]
      },
      epistemology: {
        title: "Caminho do Conhecimento",
        description: "Investigue como conhecemos a realidade com Platão, Descartes e Kant",
        startingConcepts: ["verdade", "ceticismo", "empirismo vs racionalismo"]
      },
      general: {
        title: "Jornada Filosófica Geral",
        description: "Uma introdução abrangente aos principais temas da filosofia",
        startingConcepts: ["ser", "conhecer", "agir"]
      }
    };
    return paths[philosophy] || paths.general;
  };

  const currentQ = assessmentQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-modal flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-surface rounded-soft shadow-elevated">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-heading font-semibold text-text-primary">
              Avaliação Filosófica
            </h2>
            <div className="text-sm text-text-secondary font-data">
              {currentQuestion + 1} de {assessmentQuestions.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-heading text-text-primary mb-2">
              {currentQ.question}
            </h3>
            <p className="text-sm text-text-secondary">
              Responda com sinceridade para receber uma jornada personalizada
            </p>
          </div>

          {/* Multiple Choice Questions */}
          {currentQ.type === 'multiple_choice' && (
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option.value, option.philosophy)}
                  className={`w-full p-4 text-left rounded-soft border-2 transition-all duration-200 ${
                    answers[currentQuestion]?.value === option.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-background text-text-primary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestion]?.value === option.value
                        ? 'border-primary bg-primary' :'border-border'
                    }`}>
                      {answers[currentQuestion]?.value === option.value && (
                        <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                      )}
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Voice/Text Questions */}
          {currentQ.type === 'voice_text' && (
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={voiceAnswer || answers[currentQuestion] || ''}
                  onChange={(e) => {
                    setVoiceAnswer(e.target.value);
                    handleTextAnswer(e.target.value);
                  }}
                  placeholder={currentQ.placeholder}
                  className="w-full h-32 p-4 border border-border rounded-soft bg-background text-text-primary placeholder-text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
                
                {recognition && (
                  <button
                    onClick={handleVoiceInput}
                    disabled={isListening}
                    className={`absolute bottom-3 right-3 p-2 rounded-soft transition-all duration-200 ${
                      isListening 
                        ? 'bg-accent text-accent-foreground animate-pulse' 
                        : 'bg-primary text-primary-foreground hover:bg-primary/80'
                    }`}
                  >
                    <Icon name={isListening ? "Square" : "Mic"} size={16} />
                  </button>
                )}
              </div>
              
              {isListening && (
                <div className="flex items-center justify-center space-x-2 text-accent">
                  <Icon name="Mic" size={16} />
                  <span className="text-sm font-medium">Ouvindo...</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="p-6 border-t border-border flex justify-between">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Anterior
          </Button>

          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
            iconName={currentQuestion === assessmentQuestions.length - 1 ? "Check" : "ChevronRight"}
            iconPosition="right"
          >
            {currentQuestion === assessmentQuestions.length - 1 ? 'Finalizar' : 'Próximo'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhilosophyAssessment;