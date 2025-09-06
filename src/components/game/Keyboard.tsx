import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface KeyboardProps {
  onKeyPress: (letter: string) => void;
  guessedLetters: string[];
  disabled?: boolean;
  className?: string;
}

export function Keyboard({
  onKeyPress,
  guessedLetters,
  disabled = false,
  className,
}: KeyboardProps) {
  const rows = [
    ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
    ["W", "X", "C", "V", "B", "N"],
  ];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 w-full",
        className
      )}
    >
      {rows.map((row, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="flex justify-center gap-3 w-full"
        >
          {row.map((letter) => {
            const isGuessed = guessedLetters.includes(letter.toLowerCase());
            return (
              <Button
                key={letter}
                variant={isGuessed ? "outline" : "secondary"}
                size="sm"
                className={cn(
                  "w-16 h-16 font-pixel text-2xl rounded-none bg-[#f4a45d] hover:bg-[#f4a45d]/80 text-black",
                  isGuessed && "opacity-50 cursor-not-allowed"
                )}
                disabled={isGuessed || disabled}
                onClick={() => onKeyPress(letter.toLowerCase())}
              >
                {letter}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
