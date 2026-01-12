import React from 'react';
import { Link } from 'react-router';

const SidebarLogo = ({ size = 'normal', className = '' }) => {
  const getSizeClasses = () => {
    switch(size) {
      case 'small':
        return 'w-8 h-8';
      case 'large':
        return 'w-16 h-16';
      case 'extra-large':
        return 'w-24 h-24';
      default:
        return 'w-12 h-12';
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Link to="/" className="flex items-center">
        <div className={`${getSizeClasses()} relative`}>
          {/* Main circular background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full shadow-lg"></div>
          
          {/* Inner circle with pattern */}
          <div className="absolute inset-1 bg-white/20 rounded-full backdrop-blur-sm"></div>
          
          {/* Central sphere with connected dots */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Central sphere */}
              <circle 
                cx="50" 
                cy="50" 
                r="25" 
                fill="url(#sphereGradient)" 
                className="drop-shadow-sm"
              />
              
              {/* Connection lines */}
              <line x1="50" y1="25" x2="50" y2="15" stroke="white" strokeWidth="2" opacity="0.8"/>
              <line x1="50" y1="75" x2="50" y2="85" stroke="white" strokeWidth="2" opacity="0.8"/>
              <line x1="25" y1="50" x2="15" y2="50" stroke="white" strokeWidth="2" opacity="0.8"/>
              <line x1="75" y1="50" x2="85" y2="50" stroke="white" strokeWidth="2" opacity="0.8"/>
              
              {/* Outer circles representing community connections */}
              <circle cx="20" cy="20" r="8" fill="rgba(255,255,255,0.7)" className="animate-pulse" style={{animationDelay: '0s'}}/>
              <circle cx="80" cy="20" r="8" fill="rgba(255,255,255,0.7)" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
              <circle cx="20" cy="80" r="8" fill="rgba(255,255,255,0.7)" className="animate-pulse" style={{animationDelay: '1s'}}/>
              <circle cx="80" cy="80" r="8" fill="rgba(255,255,255,0.7)" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
              
              <defs>
                <radialGradient id="sphereGradient" cx="0.3" cy="0.3" r="0.8">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0.6"/>
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SidebarLogo;