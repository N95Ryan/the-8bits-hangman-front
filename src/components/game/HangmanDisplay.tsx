import { cn } from "@/lib/utils";

interface HangmanDisplayProps {
  mistakes: number;
  className?: string;
}

export function HangmanDisplay({ mistakes, className }: HangmanDisplayProps) {
  return (
    <div className={cn("relative w-40 h-40 mx-auto", className)}>
      {/* Base */}
      <div className="absolute bottom-0 left-0 w-32 h-2 bg-cyan-400"></div>

      {/* Poteau */}
      <div className="absolute bottom-0 left-4 w-2 h-36 bg-cyan-400"></div>

      {/* Poutre supérieure */}
      <div className="absolute top-4 left-4 w-24 h-2 bg-cyan-400"></div>

      {/* Corde */}
      <div className="absolute top-4 right-12 w-2 h-6 bg-cyan-400"></div>

      {/* Tête */}
      {mistakes >= 1 && (
        <div className="absolute top-10 right-10 w-6 h-6 border-2 border-pink-500 bg-gray-900"></div>
      )}

      {/* Corps */}
      {mistakes >= 2 && (
        <div className="absolute top-16 right-12 w-2 h-10 bg-pink-500"></div>
      )}

      {/* Bras gauche */}
      {mistakes >= 3 && (
        <div className="absolute top-18 right-14 w-6 h-2 bg-pink-500 transform rotate-45"></div>
      )}

      {/* Bras droit */}
      {mistakes >= 4 && (
        <div className="absolute top-18 right-6 w-6 h-2 bg-pink-500 transform -rotate-45"></div>
      )}

      {/* Jambe gauche */}
      {mistakes >= 5 && (
        <div className="absolute top-26 right-14 w-6 h-2 bg-pink-500 transform rotate-45"></div>
      )}

      {/* Jambe droite */}
      {mistakes >= 6 && (
        <div className="absolute top-26 right-6 w-6 h-2 bg-pink-500 transform -rotate-45"></div>
      )}
    </div>
  );
}
