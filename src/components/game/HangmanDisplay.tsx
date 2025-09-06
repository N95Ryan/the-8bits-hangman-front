import { cn } from "@/lib/utils";

interface HangmanDisplayProps {
  mistakes: number;
  className?: string;
}

export function HangmanDisplay({ mistakes, className }: HangmanDisplayProps) {
  return (
    <div className={cn("relative w-60 h-60 mx-auto", className)}>
      {/* Structure du gibet */}
      <div className="flex flex-col items-center">
        {/* Base */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-3 bg-white"></div>

        {/* Poteau vertical */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-16 w-3 h-52 bg-white"></div>

        {/* Poutre horizontale */}
        <div className="absolute top-6 left-1/2 transform -translate-x-16 w-36 h-3 bg-white"></div>

        {/* Corde */}
        <div className="absolute top-6 left-1/2 transform translate-x-14 w-2 h-8 bg-white"></div>
      </div>

      {/* Personnage du pendu - centré sous la corde */}
      <div className="absolute left-1/2 transform translate-x-14">
        {/* Tête */}
        {mistakes >= 1 && (
          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-10 h-10 border-2 border-white bg-gray-900"></div>
        )}

        {/* Corps */}
        {mistakes >= 2 && (
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-2 h-16 bg-white"></div>
        )}

        {/* Bras gauche */}
        {mistakes >= 3 && (
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-2 h-10 bg-white origin-top rotate-[30deg]"></div>
        )}

        {/* Bras droit */}
        {mistakes >= 4 && (
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-2 h-10 bg-white origin-top -rotate-[30deg]"></div>
        )}

        {/* Jambe gauche */}
        {mistakes >= 5 && (
          <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-2 h-12 bg-white origin-top rotate-[30deg]"></div>
        )}

        {/* Jambe droite */}
        {mistakes >= 6 && (
          <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-2 h-12 bg-white origin-top -rotate-[30deg]"></div>
        )}
      </div>
    </div>
  );
}
