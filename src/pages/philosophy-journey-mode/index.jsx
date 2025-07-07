import React, { useState, useEffect } from 'react';
import PhilosophyAssessment from './components/PhilosophyAssessment';
import SceneDisplay from './components/SceneDisplay';
import InteractiveDialogue from './components/InteractiveDialogue';
import JourneyProgress from './components/JourneyProgress';
import FloatingNavigation from './components/FloatingNavigation';
import ConversationHistory from './components/ConversationHistory';
import Icon from '../../components/AppIcon';

const PhilosophyJourneyMode = ({ onNavigate, user }) => {
  const [gameState, setGameState] = useState('assessment'); // 'assessment', 'journey', 'dialogue'
  const [showAssessment, setShowAssessment] = useState(true);
  const [showProgress, setShowProgress] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSceneLoading, setIsSceneLoading] = useState(false);
  const [isAIResponding, setIsAIResponding] = useState(false);

  // Mock user data
  const mockUser = user || {
    id: 1,
    name: "Ana Silva",
    role: "student",
    level: 3,
    experience: 245,
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  };

  // Journey state
  const [journeyProfile, setJourneyProfile] = useState(null);
  const [currentScene, setCurrentScene] = useState(null);
  const [currentDialogue, setCurrentDialogue] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [journeyProgress, setJourneyProgress] = useState({
    currentConcept: 'Introdução à Filosofia',
    conceptsCompleted: 2,
    totalConcepts: 12,
    experienceGained: 245,
    level: 3,
    streak: 7,
    timeSpent: 180
  });

  // Mock scenes data
  const mockScenes = {
    existentialism: {
      title: "O Café da Existência",
      description: "Você se encontra em um café parisiense dos anos 1940, onde grandes pensadores existencialistas debatiam o sentido da vida. O ambiente é carregado de fumaça de cigarro e conversas intensas sobre liberdade e autenticidade.",
      imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
      philosophicalContext: "Existencialismo Francês",
      era: "Século XX",
      philosopher: "Jean-Paul Sartre"
    },
    ethics: {
      title: "O Tribunal da Moral",
      description: "Uma antiga corte grega onde filósofos debatem questões de justiça e virtude. Colunas de mármore se erguem majestosamente enquanto sábios ponderam sobre o bem e o mal.",
      imageUrl: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=800&h=600&fit=crop",
      philosophicalContext: "Ética Clássica",
      era: "Antiguidade",
      philosopher: "Aristóteles"
    },
    epistemology: {
      title: "A Caverna do Conhecimento",
      description: "Uma caverna misteriosa onde sombras dançam nas paredes, representando a alegoria platônica do conhecimento. A luz da verdade filtra através da entrada, convidando à reflexão sobre a natureza da realidade.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      philosophicalContext: "Teoria do Conhecimento",
      era: "Antiguidade",
      philosopher: "Platão"
    }
  };

  // Mock dialogues
  const mockDialogues = {
    existentialism: {
      philosopher: "Jean-Paul Sartre",
      message: `Bem-vindo ao café da existência, jovem pensador. Aqui, onde a fumaça se mistura com as ideias, pergunto-lhe: **você acredita que nascemos com um propósito predefinido?**\n\nOu será que, como eu defendo, *"a existência precede a essência"* - que primeiro existimos, e só depois criamos nosso próprio significado?`,
      concept: "Existência e Essência",
      choices: [
        { text: "Acredito que nascemos com um propósito divino ou natural", value: "essentialist" },
        { text: "Concordo que criamos nosso próprio significado", value: "existentialist" },
        { text: "Não tenho certeza, preciso pensar mais sobre isso", value: "uncertain" },
        { text: "Acho que é uma combinação de ambos", value: "mixed" }
      ],
      timestamp: new Date()
    },
    ethics: {
      philosopher: "Aristóteles",
      message: `Jovem discípulo, observe estas colunas que nos cercam. Cada uma foi construída com **virtude** - força, beleza e propósito. Assim deve ser o caráter humano.\n\nDiga-me: *o que torna uma ação verdadeiramente boa?* É o resultado que ela produz, ou há algo mais profundo?`,
      concept: "Virtude e Caráter",
      choices: [
        { text: "Uma ação é boa pelos seus resultados positivos", value: "consequentialist" },
        { text: "A bondade está no caráter de quem age", value: "virtue_ethics" },
        { text: "Depende das intenções por trás da ação", value: "deontological" },
        { text: "Não existe bem ou mal absoluto", value: "relativist" }
      ],
      timestamp: new Date()
    },
    epistemology: {
      philosopher: "Platão",
      message: `Meu caro aprendiz, veja estas sombras que dançam na parede da caverna. Para muitos, elas representam toda a realidade que conhecem.\n\nMas e se eu lhe dissesse que existe um **mundo de formas perfeitas** além dessas sombras? Como você distinguiria entre *conhecimento verdadeiro* e mera opinião?`,
      concept: "Teoria das Formas",
      choices: [
        { text: "Através da razão e contemplação filosófica", value: "rationalist" },
        { text: "Pela experiência e observação do mundo", value: "empiricist" },
        { text: "Combinando razão e experiência", value: "mixed" },
        { text: "Não podemos ter certeza absoluta de nada", value: "skeptical" }
      ],
      timestamp: new Date()
    }
  };

  // Mock conversation history
  const mockConversationHistory = [
    {
      id: 1,
      title: "Primeira Conversa com Sócrates",
      philosopher: "Sócrates",
      concept: "Conhecimento de Si",
      timestamp: new Date(Date.now() - 86400000),
      messageCount: 12,
      duration: "25min",
      xpGained: 50,
      preview: "Uma discussão sobre o famoso \'conhece-te a ti mesmo\' e a importância da auto-reflexão..."
    },
    {
      id: 2,
      title: "Debate sobre Justiça",
      philosopher: "Platão",
      concept: "República",
      timestamp: new Date(Date.now() - 172800000),
      messageCount: 18,
      duration: "35min",
      xpGained: 75,
      preview: "Exploramos a natureza da justiça na alma e na cidade ideal..."
    },
    {
      id: 3,
      title: "Ética e Felicidade",
      philosopher: "Aristóteles",
      concept: "Eudaimonia",
      timestamp: new Date(Date.now() - 259200000),
      messageCount: 15,
      duration: "30min",
      xpGained: 60,
      preview: "Uma conversa sobre o que constitui uma vida plena e virtuosa..."
    }
  ];

  // Mock achievements
  const mockAchievements = [
    {
      id: 1,
      name: "Primeiro Diálogo",
      description: "Completou sua primeira conversa socrática",
      icon: "MessageCircle",
      xp: 25
    },
    {
      id: 2,
      name: "Questionador Persistente",
      description: "Fez 10 perguntas profundas",
      icon: "HelpCircle",
      xp: 50
    },
    {
      id: 3,
      name: "Semana Filosófica",
      description: "Manteve uma sequência de 7 dias",
      icon: "Flame",
      xp: 100
    }
  ];

  useEffect(() => {
    // Initialize journey if user has completed assessment
    if (journeyProfile && gameState === 'assessment') {
      setGameState('journey');
      initializeJourney();
    }
  }, [journeyProfile, gameState]);

  const initializeJourney = async () => {
    setIsSceneLoading(true);
    
    // Simulate scene generation delay
    setTimeout(() => {
      const sceneKey = journeyProfile.dominantPhilosophy;
      const scene = mockScenes[sceneKey] || mockScenes.epistemology;
      const dialogue = mockDialogues[sceneKey] || mockDialogues.epistemology;
      
      setCurrentScene(scene);
      setCurrentDialogue(dialogue);
      setIsSceneLoading(false);
      setGameState('dialogue');
    }, 2000);
  };

  const handleAssessmentComplete = (profile) => {
    setJourneyProfile(profile);
    setShowAssessment(false);
  };

  const handleDialogueResponse = async (response) => {
    setIsAIResponding(true);
    
    // Add user response to conversation history
    const userMessage = {
      sender: 'user',
      content: response,
      timestamp: new Date()
    };
    
    setConversationHistory(prev => [...prev, userMessage]);
    
    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(response);
      const aiMessage = {
        sender: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setConversationHistory(prev => [...prev, aiMessage]);
      
      // Update dialogue with new AI response
      setCurrentDialogue(prev => ({
        ...prev,
        message: aiResponse,
        choices: generateNewChoices(response)
      }));
      
      setIsAIResponding(false);
      
      // Update progress
      updateProgress(25);
    }, 3000);
  };

  const handleChoiceSelect = (choice) => {
    handleDialogueResponse(choice.text);
  };

  const generateAIResponse = (userResponse) => {
    const responses = [
      `Interessante perspectiva! Você disse: "${userResponse}". Isso me lembra de quando Heráclito afirmou que *"não se pode pisar duas vezes no mesmo rio"*.\n\nMas me diga: **como essa sua visão se relaciona com a ideia de que tudo está em constante mudança?**`,
      `Sua reflexão é profunda. Percebo que você está **questionando as bases** do que consideramos verdadeiro.\n\nIsso me faz pensar: *será que nossas certezas são realmente tão sólidas quanto imaginamos?*`,
      `Excelente! Você está aplicando o **método socrático** - questionando suas próprias crenças.\n\nAgora, vamos um pouco mais fundo: *que evidências você tem para sustentar essa posição?*`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateNewChoices = (previousResponse) => {
    return [
      { text: "Preciso refletir mais sobre essa questão", value: "reflect" },
      { text: "Isso contradiz o que eu pensava antes", value: "contradiction" },
      { text: "Posso dar um exemplo pessoal", value: "example" },
      { text: "Qual seria a visão oposta a essa?", value: "opposite" }
    ];
  };

  const updateProgress = (xpGained) => {
    setJourneyProgress(prev => ({
      ...prev,
      experienceGained: prev.experienceGained + xpGained,
      level: Math.floor((prev.experienceGained + xpGained) / 100) + 1
    }));
  };

  const handleConversationSelect = (conversation) => {
    // Load selected conversation
    console.log('Loading conversation:', conversation);
    setShowHistory(false);
  };

  const handleConversationDelete = (conversationId) => {
    // Delete conversation logic
    console.log('Deleting conversation:', conversationId);
  };

  const handleExportHistory = (conversations) => {
    // Export conversations logic
    console.log('Exporting conversations:', conversations);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-primary/10">
      {/* Assessment Modal */}
      <PhilosophyAssessment
        onAssessmentComplete={handleAssessmentComplete}
        isVisible={showAssessment}
      />

      {/* Main Journey Interface */}
      {!showAssessment && (
        <div className="relative w-full h-screen overflow-hidden">
          {/* Scene Display - Full Screen */}
          <div className="absolute inset-0">
            <SceneDisplay
              currentScene={currentScene}
              isLoading={isSceneLoading}
              className="w-full h-full"
            />
          </div>

          {/* Interactive Dialogue - Bottom Overlay */}
          {gameState === 'dialogue' && currentDialogue && (
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <div className="max-w-4xl mx-auto">
                <InteractiveDialogue
                  currentDialogue={currentDialogue}
                  onResponseSubmit={handleDialogueResponse}
                  onChoiceSelect={handleChoiceSelect}
                  isAIResponding={isAIResponding}
                  conversationHistory={conversationHistory}
                  className="backdrop-blur-md bg-surface/95 border border-border/50"
                />
              </div>
            </div>
          )}

          {/* Progress Sidebar - Desktop */}
          {showProgress && (
            <div className="absolute top-0 right-0 w-80 h-full bg-surface/95 backdrop-blur-md border-l border-border/50 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  Progresso
                </h3>
                <button
                  onClick={() => setShowProgress(false)}
                  className="p-2 text-text-secondary hover:text-primary rounded-soft transition-smooth"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              
              <JourneyProgress
                currentProgress={journeyProgress}
                journeyPath={journeyProfile}
                achievements={mockAchievements}
              />
            </div>
          )}

          {/* Progress Modal - Mobile */}
          {showProgress && (
            <div className="md:hidden fixed inset-0 bg-text-primary/50 backdrop-blur-sm z-modal flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-surface rounded-soft shadow-elevated max-h-[80vh] overflow-y-auto">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Progresso da Jornada
                  </h3>
                  <button
                    onClick={() => setShowProgress(false)}
                    className="p-2 text-text-secondary hover:text-primary rounded-soft transition-smooth"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
                
                <div className="p-4">
                  <JourneyProgress
                    currentProgress={journeyProgress}
                    journeyPath={journeyProfile}
                    achievements={mockAchievements}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Conversation History Modal */}
          <ConversationHistory
            conversations={mockConversationHistory}
            onConversationSelect={handleConversationSelect}
            onConversationDelete={handleConversationDelete}
            onExportHistory={handleExportHistory}
            isVisible={showHistory}
            onClose={() => setShowHistory(false)}
          />

          {/* Floating Navigation */}
          <FloatingNavigation
            onNavigate={onNavigate}
            currentView="/philosophy-journey-mode"
            user={mockUser}
            onToggleSettings={() => setShowSettings(!showSettings)}
            onToggleProgress={() => setShowProgress(!showProgress)}
            onToggleHistory={() => setShowHistory(!showHistory)}
          />

          {/* Loading Overlay */}
          {isSceneLoading && (
            <div className="absolute inset-0 bg-text-primary/30 backdrop-blur-sm flex items-center justify-center z-modal">
              <div className="bg-surface rounded-soft p-8 text-center shadow-elevated">
                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                  Preparando sua Jornada
                </h3>
                <p className="text-text-secondary">
                  Gerando cena filosófica personalizada...
                </p>
              </div>
            </div>
          )}

          {/* Journey Introduction - First Time */}
          {gameState === 'journey' && !currentScene && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
              <div className="max-w-2xl mx-auto text-center p-8 bg-surface/90 rounded-soft shadow-elevated">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Compass" size={32} className="text-primary" />
                </div>
                
                <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
                  Bem-vindo à sua Jornada Filosófica!
                </h2>
                
                <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                  Com base em suas respostas, preparamos uma experiência personalizada 
                  explorando <strong className="text-primary">{journeyProfile?.recommendedPath?.title}</strong>.
                </p>
                
                <div className="bg-accent/10 rounded-soft p-4 mb-6">
                  <p className="text-text-primary">
                    {journeyProfile?.recommendedPath?.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-text-secondary">
                  <Icon name="Sparkles" size={16} />
                  <span className="text-sm">Preparando sua primeira cena...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhilosophyJourneyMode;