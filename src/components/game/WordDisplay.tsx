import { cn } from "@/lib/utils";

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
  className?: string;
}

export function WordDisplay({
  word,
  // guessedLetters est utilisé pour la validation mais pas encore implémenté
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  guessedLetters,
  className,
}: WordDisplayProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-center gap-3 my-6 w-full",
        className
      )}
    >
      {word.split("").map((letter, index) => {
        // If the character is an underscore, it's a letter not yet guessed
        const isUnderscore = letter === "_";

        return (
          <div
            key={`letter-${index}`}
            className="flex items-center justify-center w-12 h-14 border-b-4 border-cyan-400"
          >
            <span
              className={cn(
                "text-3xl font-pixel uppercase",
                isUnderscore ? "invisible" : "text-green-400"
              )}
            >
              {isUnderscore ? "X" : letter}
            </span>
          </div>
        );
      })}
    </div>
  );
}
