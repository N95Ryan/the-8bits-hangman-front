import { Button } from "@/components/ui/button";

interface WelcomePageProps {
  onStartGame: () => void;
}

export function WelcomePage({ onStartGame }: WelcomePageProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="text-center flex flex-col items-center">
        <div className="mb-12 flex items-center justify-center">
          <img
            src="/src/assets/logo.png"
            alt="The 8bits Hangman"
            className="w-48 h-auto mx-auto"
          />
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
    </div>
  );
}
