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
  // Pixel art heart SVG
  const heartPixelArt = (filled: boolean) => (
    <div
      className={cn(
        "w-6 h-6 relative",
        filled ? "text-red-600" : "text-gray-700"
      )}
    >
      {/* Top left pixel */}
      <div
        className={cn(
          "absolute w-2 h-2 top-0 left-1",
          filled ? "bg-red-600" : "bg-gray-700"
        )}
      ></div>
      {/* Top right pixel */}
      <div
        className={cn(
          "absolute w-2 h-2 top-0 right-1",
          filled ? "bg-red-600" : "bg-gray-700"
        )}
      ></div>

      {/* Middle top row */}
      <div
        className={cn(
          "absolute w-6 h-2 top-2 left-0",
          filled ? "bg-red-600" : "bg-gray-700"
        )}
      ></div>

      {/* Middle row */}
      <div
        className={cn(
          "absolute w-4 h-2 top-4 left-1",
          filled ? "bg-red-600" : "bg-gray-700"
        )}
      ></div>

      {/* Bottom pixel */}
      <div
        className={cn(
          "absolute w-2 h-2 bottom-0 left-2",
          filled ? "bg-red-600" : "bg-gray-700"
        )}
      ></div>
    </div>
  );

  return (
    <div className={cn("flex items-center justify-end gap-1", className)}>
      <div className="flex gap-1">
        {Array.from({ length: maxLives }).map((_, index) => (
          <div key={`heart-${index}`}>{heartPixelArt(index < lives)}</div>
        ))}
      </div>
    </div>
  );
}
