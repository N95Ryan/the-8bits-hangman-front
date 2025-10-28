import { cn } from "@/lib/utils";
import { LIVES_BY_DIFFICULTY } from "@/constants/lives";
import type { Difficulty } from "@/constants/lives";

interface LivesDisplayProps {
  lives: number;
  difficulty: Difficulty;
  className?: string;
}

export function LivesDisplay({
  lives,
  difficulty,
  className,
}: LivesDisplayProps) {
  const maxLives = LIVES_BY_DIFFICULTY[difficulty];
  const heartImage = (filled: boolean) => (
    <img
      src="/heart.png"
      alt="Cœur"
      className={cn(
        "w-8 h-8 transition-opacity duration-200",
        filled ? "opacity-100" : "opacity-20"
      )}
    />
  );

  return (
    <div
      className={cn(
        "fixed top-6 right-6 z-50 flex flex-col items-end gap-2",
        className
      )}
    >
      {/* Affichage des cœurs */}
      <div className="flex gap-1">
        {Array.from({ length: maxLives }).map((_, index) => (
          <div key={`heart-${index}`}>{heartImage(index < lives)}</div>
        ))}
      </div>
    </div>
  );
}
