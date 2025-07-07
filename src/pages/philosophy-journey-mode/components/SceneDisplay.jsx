import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const SceneDisplay = ({ currentScene, isLoading, className = '' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (currentScene?.imageUrl) {
      setImageLoaded(false);
      setImageError(false);
    }
  }, [currentScene?.imageUrl]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // Loading skeleton
  if (isLoading || !currentScene) {
    return (
      <div className={`relative w-full h-full bg-gradient-to-br from-secondary/20 to-primary/20 rounded-soft overflow-hidden ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
            <div className="space-y-2">
              <div className="h-4 bg-border rounded w-48 mx-auto animate-pulse" />
              <div className="h-3 bg-border rounded w-32 mx-auto animate-pulse" />
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-accent rounded-full animate-pulse delay-1000" />
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-secondary rounded-full animate-pulse delay-500" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full rounded-soft overflow-hidden shadow-elevated ${className}`}>
      {/* Scene Image */}
      <div className="relative w-full h-full">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
            <div className="text-center space-y-3">
              <Icon name="Image" size={32} className="text-text-secondary mx-auto animate-pulse" />
              <p className="text-sm text-text-secondary">Carregando cena...</p>
            </div>
          </div>
        )}
        
        <Image
          src={currentScene.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center"}
          alt={currentScene.description || "Cena filosófica"}
          className="w-full h-full object-cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-text-primary/80 via-transparent to-transparent" />
      </div>

      {/* Scene Information Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
        <div className="space-y-3">
          {/* Scene Title */}
          {currentScene.title && (
            <h2 className="text-2xl md:text-3xl font-heading font-bold leading-tight">
              {currentScene.title}
            </h2>
          )}
          
          {/* Scene Description */}
          {currentScene.description && (
            <p className="text-sm md:text-base opacity-90 leading-relaxed max-w-2xl">
              {currentScene.description}
            </p>
          )}
          
          {/* Philosophical Context */}
          {currentScene.philosophicalContext && (
            <div className="flex items-center space-x-2 text-xs md:text-sm opacity-80">
              <Icon name="BookOpen" size={16} />
              <span>{currentScene.philosophicalContext}</span>
            </div>
          )}
          
          {/* Scene Metadata */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs opacity-70">
              {currentScene.era && (
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{currentScene.era}</span>
                </div>
              )}
              
              {currentScene.philosopher && (
                <div className="flex items-center space-x-1">
                  <Icon name="User" size={14} />
                  <span>{currentScene.philosopher}</span>
                </div>
              )}
            </div>
            
            {/* Scene Quality Indicator */}
            <div className="flex items-center space-x-1">
              <Icon name="Sparkles" size={14} className="text-accent" />
              <span className="text-xs opacity-70">IA Gerada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State for Image Generation */}
      {isLoading && (
        <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm rounded-soft p-3 flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-xs text-text-primary">Gerando cena...</span>
        </div>
      )}

      {/* Error State */}
      {imageError && (
        <div className="absolute top-4 left-4 bg-error/90 backdrop-blur-sm rounded-soft p-3 flex items-center space-x-2">
          <Icon name="AlertCircle" size={16} className="text-error-foreground" />
          <span className="text-xs text-error-foreground">Erro ao carregar imagem</span>
        </div>
      )}

      {/* Renaissance-style decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-4 left-4 w-8 h-8 border-2 border-primary-foreground/30 rounded-full" />
        <div className="absolute top-4 right-4 w-6 h-6 border border-primary-foreground/20 rotate-45" />
        <div className="absolute bottom-4 left-4 w-4 h-4 bg-accent/30 rounded-full" />
      </div>
    </div>
  );
};

export default SceneDisplay;