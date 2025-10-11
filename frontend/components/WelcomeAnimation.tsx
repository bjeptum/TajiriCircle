import { useState, useEffect } from 'react';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

export function WelcomeAnimation({ onComplete }: WelcomeAnimationProps) {
  const [stage, setStage] = useState<'letters' | 'falling' | 'fadeout'>('letters');
  const [visibleLetters, setVisibleLetters] = useState<string[]>([]);
  
  const words = ['WELCOME', 'TO', 'TAJIRI', 'CIRCLE'];
  const allLetters = words.join(' ').split('');

  useEffect(() => {
    // Stage 1: Show letters one by one (2 seconds)
    let letterIndex = 0;
    const letterInterval = setInterval(() => {
      if (letterIndex < allLetters.length) {
        setVisibleLetters(prev => [...prev, allLetters[letterIndex]]);
        letterIndex++;
      } else {
        clearInterval(letterInterval);
        // Wait a moment before falling
        setTimeout(() => setStage('falling'), 500);
      }
    }, 80); // Show each letter every 80ms

    return () => clearInterval(letterInterval);
  }, []);

  useEffect(() => {
    if (stage === 'falling') {
      // Stage 2: Letters fall into place (3 seconds)
      setTimeout(() => setStage('fadeout'), 3000);
    } else if (stage === 'fadeout') {
      // Stage 3: Fade out and complete (1.5 seconds)
      setTimeout(() => onComplete(), 1500);
    }
  }, [stage, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-red-900 via-red-700 to-amber-600 flex items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Letters display */}
      <div className="relative z-10">
        {stage === 'letters' && (
          <div className="text-center">
            <div className="text-6xl md:text-8xl font-bold text-white tracking-wider">
              {visibleLetters.map((letter, index) => (
                <span
                  key={index}
                  className="inline-block animate-bounce"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    animationDuration: '0.6s',
                    animationIterationCount: '1'
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </div>
          </div>
        )}

        {stage === 'falling' && (
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* CIRCLE falls first and lands at bottom */}
            <div 
              className="text-5xl md:text-7xl font-bold text-white tracking-widest animate-fall-1"
              style={{ animationDelay: '0s' }}
            >
              CIRCLE
            </div>
            
            {/* TAJIRI falls second and lands above CIRCLE */}
            <div 
              className="text-5xl md:text-7xl font-bold text-amber-300 tracking-widest animate-fall-2"
              style={{ animationDelay: '0.5s' }}
            >
              TAJIRI
            </div>
            
            {/* TO falls third */}
            <div 
              className="text-3xl md:text-5xl font-semibold text-white/90 tracking-wider animate-fall-3"
              style={{ animationDelay: '1s' }}
            >
              TO
            </div>
            
            {/* WELCOME falls last and lands on top */}
            <div 
              className="text-4xl md:text-6xl font-bold text-white tracking-wide animate-fall-4"
              style={{ animationDelay: '1.5s' }}
            >
              WELCOME
            </div>
          </div>
        )}

        {stage === 'fadeout' && (
          <div className="flex flex-col items-center justify-center space-y-4 animate-fadeout">
            <div className="text-4xl md:text-6xl font-bold text-white tracking-wide">
              WELCOME
            </div>
            <div className="text-3xl md:text-5xl font-semibold text-white/90 tracking-wider">
              TO
            </div>
            <div className="text-5xl md:text-7xl font-bold text-amber-300 tracking-widest">
              TAJIRI
            </div>
            <div className="text-5xl md:text-7xl font-bold text-white tracking-widest">
              CIRCLE
            </div>
          </div>
        )}
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes fall-1 {
          0% {
            opacity: 0;
            transform: translateY(-100vh) rotate(-10deg);
          }
          60% {
            transform: translateY(10px) rotate(2deg);
          }
          80% {
            transform: translateY(-5px) rotate(-1deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
        }

        @keyframes fall-2 {
          0% {
            opacity: 0;
            transform: translateY(-100vh) rotate(10deg);
          }
          60% {
            transform: translateY(10px) rotate(-2deg);
          }
          80% {
            transform: translateY(-5px) rotate(1deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
        }

        @keyframes fall-3 {
          0% {
            opacity: 0;
            transform: translateY(-100vh) rotate(-5deg) scale(0.8);
          }
          60% {
            transform: translateY(8px) rotate(1deg) scale(1.05);
          }
          80% {
            transform: translateY(-3px) rotate(-0.5deg) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
        }

        @keyframes fall-4 {
          0% {
            opacity: 0;
            transform: translateY(-100vh) rotate(5deg) scale(0.9);
          }
          60% {
            transform: translateY(12px) rotate(-1deg) scale(1.05);
          }
          80% {
            transform: translateY(-4px) rotate(0.5deg) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
        }

        @keyframes fadeout {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.95);
          }
        }

        .animate-fall-1 {
          animation: fall-1 1s ease-out forwards;
          opacity: 0;
        }

        .animate-fall-2 {
          animation: fall-2 1s ease-out forwards;
          opacity: 0;
        }

        .animate-fall-3 {
          animation: fall-3 1s ease-out forwards;
          opacity: 0;
        }

        .animate-fall-4 {
          animation: fall-4 1s ease-out forwards;
          opacity: 0;
        }

        .animate-fadeout {
          animation: fadeout 1.5s ease-in forwards;
        }
      `}</style>
    </div>
  );
}
