import React from 'react';
import Image from '../../../components/AppImage';

const BackgroundArt = () => {
  return (
    <div className="fixed inset-0 z-background overflow-hidden">
      {/* Main Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop&crop=center"
          alt="Renaissance philosophical scene with dramatic lighting"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-text-primary/40" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-500" />

      {/* Philosophical Quotes Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center max-w-2xl px-8">
          <blockquote className="text-2xl md:text-3xl font-heading font-light text-text-primary/30 italic leading-relaxed">
            "A vida não examinada não vale a pena ser vivida"
          </blockquote>
          <cite className="block mt-4 text-sm font-caption text-text-secondary/50">
            — Sócrates
          </cite>
        </div>
      </div>

      {/* Geometric Patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Chiaroscuro Light Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-accent/20 via-accent/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-radial from-primary/15 via-primary/5 to-transparent rounded-full blur-3xl" />
    </div>
  );
};

export default BackgroundArt;