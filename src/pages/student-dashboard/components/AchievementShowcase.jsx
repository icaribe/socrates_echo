import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementShowcase = ({ achievements, unlockedConcepts }) => {
  const [activeTab, setActiveTab] = useState('achievements');

  const recentAchievements = achievements?.filter(a => a.isRecent) || [];
  const allAchievements = achievements || [];
  const concepts = unlockedConcepts || [];

  const getAchievementColor = (rarity) => {
    const colors = {
      common: 'text-text-secondary bg-text-secondary/10',
      rare: 'text-primary bg-primary/10',
      epic: 'text-accent bg-accent/10',
      legendary: 'text-warning bg-warning/10'
    };
    return colors[rarity] || colors.common;
  };

  const getConceptIcon = (category) => {
    const icons = {
      'pre-socratic': 'Zap',
      'classical': 'Crown',
      'medieval': 'Castle',
      'modern': 'Lightbulb',
      'contemporary': 'Rocket'
    };
    return icons[category] || 'BookOpen';
  };

  return (
    <div className="bg-surface rounded-soft p-6 shadow-soft border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Conquistas & Conceitos
        </h3>
        <div className="flex bg-background rounded-soft p-1">
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-3 py-1 text-sm rounded-soft transition-smooth ${
              activeTab === 'achievements' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-primary'
            }`}
          >
            Conquistas
          </button>
          <button
            onClick={() => setActiveTab('concepts')}
            className={`px-3 py-1 text-sm rounded-soft transition-smooth ${
              activeTab === 'concepts' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-primary'
            }`}
          >
            Conceitos
          </button>
        </div>
      </div>

      {activeTab === 'achievements' && (
        <div className="space-y-4">
          {/* Recent Achievements */}
          {recentAchievements.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center space-x-2">
                <Icon name="Sparkles" size={16} className="text-accent" />
                <span>Conquistas Recentes</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recentAchievements.slice(0, 4).map((achievement) => (
                  <div
                    key={achievement.id}
                    className="bg-background rounded-soft p-4 border border-border-muted hover:border-accent/30 transition-smooth"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getAchievementColor(achievement.rarity)}`}>
                        <Icon name={achievement.icon || "Trophy"} size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-text-primary text-sm">
                          {achievement.name}
                        </h5>
                        <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                          {achievement.description}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${getAchievementColor(achievement.rarity)}`}>
                            {achievement.rarity}
                          </span>
                          <span className="text-xs text-text-secondary">
                            +{achievement.xpReward} XP
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievement Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-background rounded-soft">
              <p className="text-2xl font-data font-bold text-text-primary">
                {allAchievements.length}
              </p>
              <p className="text-xs text-text-secondary">Total</p>
            </div>
            <div className="text-center p-3 bg-background rounded-soft">
              <p className="text-2xl font-data font-bold text-accent">
                {allAchievements.filter(a => a.rarity === 'rare' || a.rarity === 'epic').length}
              </p>
              <p className="text-xs text-text-secondary">Raras</p>
            </div>
            <div className="text-center p-3 bg-background rounded-soft">
              <p className="text-2xl font-data font-bold text-warning">
                {allAchievements.filter(a => a.rarity === 'legendary').length}
              </p>
              <p className="text-xs text-text-secondary">Lendárias</p>
            </div>
          </div>

          {allAchievements.length > 4 && (
            <Button
              variant="outline"
              fullWidth
              iconName="Trophy"
              iconPosition="left"
            >
              Ver Todas as Conquistas ({allAchievements.length})
            </Button>
          )}
        </div>
      )}

      {activeTab === 'concepts' && (
        <div className="space-y-4">
          {concepts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {concepts.slice(0, 6).map((concept) => (
                  <div
                    key={concept.id}
                    className="bg-background rounded-soft p-4 border border-border-muted hover:border-primary/30 transition-smooth"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name={getConceptIcon(concept.category)} size={18} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-text-primary text-sm">
                          {concept.name}
                        </h5>
                        <p className="text-xs text-text-secondary mt-1">
                          {concept.philosopher}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {concept.period}
                          </span>
                          {concept.isNew && (
                            <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                              Novo
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {concepts.length > 6 && (
                <Button
                  variant="outline"
                  fullWidth
                  iconName="BookOpen"
                  iconPosition="left"
                >
                  Explorar Todos os Conceitos ({concepts.length})
                </Button>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="BookOpen" size={24} className="text-primary" />
              </div>
              <h4 className="font-medium text-text-primary mb-2">
                Nenhum Conceito Desbloqueado
              </h4>
              <p className="text-sm text-text-secondary">
                Complete lições para desbloquear conceitos filosóficos
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AchievementShowcase;