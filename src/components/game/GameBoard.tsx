import { useState } from "react";
import { WordDisplay } from "./WordDisplay";
import { Keyboard } from "./Keyboard";
import { LivesDisplay } from "./LivesDisplay";
import { HangmanDisplay } from "./HangmanDisplay";
import { WelcomePage } from "./WelcomePage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { createNewGame, makeGuess } from "@/services/gameService";

// Nombre de vies par difficulté
const LIVES_BY_DIFFICULTY = {
  easy: 5,
  medium: 3,
  hard: 2,
};

interface GameBoardProps {
  initialPlayerName?: string;
  initialDifficulty?: "easy" | "medium" | "hard";
  onBackToWelcome?: () => void;
}

export function GameBoard({
  initialPlayerName = "Player",
  initialDifficulty = "medium",
  onBackToWelcome = () => {},
}: GameBoardProps = {}) {
  const [gameId, setGameId] = useState<string>("");
  const [maskedWord, setMaskedWord] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    initialDifficulty
  );
  const [playerName, setPlayerName] = useState<string>(initialPlayerName);
  const [lives, setLives] = useState(LIVES_BY_DIFFICULTY[initialDifficulty]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Don't initialize game automatically, wait for user to click "New Game"

  // Start a new game
  const startNewGame = async () => {
    try {
      setIsLoading(true);
      console.log(
        `Creating new game with difficulty: ${difficulty}, player: ${playerName}...`
      );
      const newGame = await createNewGame(difficulty);
      console.log("New game created:", newGame);

      setGameId(newGame.id);
      setMaskedWord(newGame.maskedWord);
      // Adapter les propriétés du backend au format attendu par le composant
      setGuessedLetters(newGame.lettersGuessed || []);
      setLives(newGame.attemptsLeft || LIVES_BY_DIFFICULTY[difficulty]);
      // Convertir le status du backend au format attendu par le composant
      if (newGame.status === "in_progress") {
        setGameStatus("playing");
      } else if (newGame.status === "won" || newGame.status === "lost") {
        setGameStatus(newGame.status);
      }
      setShowDialog(false);
      setShowWelcome(false); // Hide welcome page
    } catch (error) {
      console.error("Error creating new game:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle letter guess
  const handleGuess = async (letter: string) => {
    if (gameStatus !== "playing" || isLoading) return;

    try {
      setIsLoading(true);
      console.log(`Making guess: ${letter} for game ${gameId}`);

      const currentGame = {
        id: gameId,
        maskedWord,
        lettersGuessed: guessedLetters,
        attemptsLeft: lives,
        status: gameStatus,
      };

      const updatedGame = await makeGuess(gameId, letter, currentGame);
      console.log("Guess result:", updatedGame);

      setMaskedWord(updatedGame.maskedWord);
      // Adapter les propriétés du backend au format attendu par le composant
      setGuessedLetters(updatedGame.lettersGuessed || []);
      setLives(updatedGame.attemptsLeft || LIVES_BY_DIFFICULTY[difficulty]);
      // Convertir le status du backend au format attendu par le composant
      if (updatedGame.status === "in_progress") {
        setGameStatus("playing");
      } else if (
        updatedGame.status === "won" ||
        updatedGame.status === "lost"
      ) {
        setGameStatus(updatedGame.status);
      }

      if (updatedGame.status !== "playing") {
        setShowDialog(true);
      }
    } catch (error) {
      console.error("Error making guess:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 w-full max-w-2xl">
      {!showWelcome && (
        <LivesDisplay
          lives={lives}
          maxLives={LIVES_BY_DIFFICULTY[difficulty]}
        />
      )}
      {showWelcome ? (
        <WelcomePage
          onStartGame={(name, selectedDifficulty) => {
            setPlayerName(name);
            setDifficulty(selectedDifficulty);
            setLives(LIVES_BY_DIFFICULTY[selectedDifficulty]);
            startNewGame();
          }}
        />
      ) : (
        <>
          <div className="flex justify-between w-full mb-4">
            <Button
              variant="outline"
              onClick={onBackToWelcome}
              disabled={isLoading}
              className="flex-1 ml-2 text-black bg-[#f4a45d] hover:bg-[#f4a45d]/80"
            >
              Back to menu
            </Button>
            <Button
              variant="primary"
              onClick={startNewGame}
              disabled={isLoading}
              className="flex-1 mr-2"
            >
              New Game
            </Button>
          </div>

          <HangmanDisplay
            mistakes={LIVES_BY_DIFFICULTY[difficulty] - lives}
            className="my-4"
          />

          <WordDisplay
            word={maskedWord}
            guessedLetters={[]}
            className="w-full my-4"
          />

          <Keyboard
            onKeyPress={handleGuess}
            guessedLetters={guessedLetters}
            disabled={gameStatus !== "playing" || isLoading}
            className="w-full mt-2"
          />
        </>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle
              className={
                gameStatus === "won" ? "text-green-400" : "text-pink-500"
              }
            >
              {gameStatus === "won" ? "You Won ! 🎉" : "Game Over ! 💀"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 font-pixel">
            {gameStatus === "lost" && (
              <p className="text-center text-white text-l">
                The word wasn't found...
              </p>
            )}
          </div>
          <DialogFooter className="flex justify-center">
            <Button
              variant="primary"
              onClick={startNewGame}
              disabled={isLoading}
              className="mx-auto"
            >
              Play Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
