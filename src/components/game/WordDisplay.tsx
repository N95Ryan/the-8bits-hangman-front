import { cn } from "@/lib/utils";

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
  className?: string;
}

export function WordDisplay({ word, className }: WordDisplayProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-center gap-4 my-8 w-full",
        className
      )}
    >
      {word.split("").map((letter, index) => {
        // If the character is an underscore, it's a letter not yet guessed
        const isUnderscore = letter === "_";

        return (
          <div
            key={`letter-${index}`}
            className="flex items-center justify-center w-16 h-20 border-b-4 border-[#f4a45d]"
          >
            <span
              className={cn(
                "text-4xl font-pressstart uppercase",
                isUnderscore ? "invisible" : "text-[#f4a45d]"
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
