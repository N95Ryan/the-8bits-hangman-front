import { NewGameButton } from "@/components/ui/newGameButton";

interface WelcomePageProps {
  onStartGame: () => void;
}

export function WelcomePage({ onStartGame }: WelcomePageProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="text-center">
        <img src="/logo.png" alt="The 8bits Hangman" className="logo" />
      </div>

      <div>
        <NewGameButton onClick={onStartGame}>New Game</NewGameButton>
      </div>
    </div>
  );
}
