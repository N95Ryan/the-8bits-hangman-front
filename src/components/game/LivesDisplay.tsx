import { cn } from "@/lib/utils";

interface LivesDisplayProps {
  lives: number;
  maxLives: number;
  className?: string;
}

export function LivesDisplay({
  lives,
  maxLives,
  className,
}: LivesDisplayProps) {
  const heartImage = (filled: boolean) => (
    <img
      src="/heart.png"
      alt="Cœur"
      className={cn("w-10 h-10", filled ? "opacity-100" : "opacity-30")}
    />
  );

  return (
    <div
      className={cn(
        "fixed top-6 right-6 z-50 flex items-center justify-end",
        className
      )}
    >
      <div className="flex gap-2">
        {Array.from({ length: maxLives }).map((_, index) => (
          <div key={`heart-${index}`}>{heartImage(index < lives)}</div>
        ))}
      </div>
    </div>
  );
}
