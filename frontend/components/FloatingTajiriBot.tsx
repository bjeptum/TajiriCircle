import { useState } from 'react';
import { Button } from './ui/button';
import { TajiriBotChat } from './TajiriBotChat';
import { MessageCircle, Sparkles } from 'lucide-react';

interface FloatingTajiriBotProps {
  context?: 'client' | 'bank' | 'chama' | 'login';
}

export function FloatingTajiriBot({ context = 'client' }: FloatingTajiriBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Context-aware tooltip messages
  const getTooltipMessage = () => {
    switch (context) {
      case 'bank':
        return 'Ask about customer analytics';
      case 'chama':
        return 'Ask about your chama groups';
      case 'login':
        return 'Need help logging in?';
      default:
        return 'Chat with TajiriBot';
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 shadow-2xl hover:shadow-3xl z-50 transform hover:scale-110 transition-all duration-300 group"
        >
          <div className="relative">
            <MessageCircle className="w-7 h-7 text-white" />
            {/* Pulsing ring animation */}
            <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
            {/* Sparkle effect on hover */}
            {isHovered && (
              <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-red-300 animate-pulse" />
            )}
          </div>
          {/* Tooltip */}
          <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {getTooltipMessage()}
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900" />
          </div>
        </Button>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:justify-end p-0 md:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Chat Container */}
          <div className="relative w-full md:w-[450px] h-full md:h-[700px] md:rounded-2xl overflow-hidden shadow-2xl animate-slide-up">
            <TajiriBotChat onClose={() => setIsOpen(false)} context={context} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
