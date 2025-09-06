import { Button } from "@/components/ui/button";

interface WelcomePageProps {
  onStartGame: () => void;
}

export function WelcomePage({ onStartGame }: WelcomePageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12 h-full">
      <div className="text-center">
        <p className="text-gray-300 mb-8 font-pixel text-xl">
          Try to guess the word before the hangman is complete.
        </p>
      </div>

      <Button
        variant="primary"
        size="lg"
        onClick={onStartGame}
        className="font-pixel text-xl px-8 py-6"
      >
        New Game
      </Button>
    </div>
  );
}
