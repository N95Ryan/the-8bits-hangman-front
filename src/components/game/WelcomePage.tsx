import { useState } from "react";
import { NewGameButton } from "@/components/ui/newGameButton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WelcomePageProps {
  onStartGame: (
    playerName: string,
    difficulty: "easy" | "medium" | "hard"
  ) => void;
}

export function WelcomePage({ onStartGame }: WelcomePageProps) {
  const [playerName, setPlayerName] = useState<string>("Player");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );

  // Définition des vies par difficulté
  const livesByDifficulty = {
    easy: 8,
    medium: 6,
    hard: 5,
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="text-center mb-8">
        <img src="/logo.png" alt="The 8bits Hangman" className="logo" />
      </div>

      <div className="w-full max-w-md bg-gray-800/50 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium text-white mb-1">
            Your Name
          </label>
          <Input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            className="w-full"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-1">
            Difficulty
          </label>
          <Select
            value={difficulty}
            onValueChange={(value) =>
              setDifficulty(value as "easy" | "medium" | "hard")
            }
          >
            <SelectTrigger className="w-full text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <NewGameButton
          onClick={() => onStartGame(playerName, difficulty)}
          className="w-full"
        >
          Start Game
        </NewGameButton>
      </div>
    </div>
  );
}
