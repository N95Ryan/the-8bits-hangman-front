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

const MAX_LIVES = 6;

export function GameBoard() {
  const [gameId, setGameId] = useState<string>("");
  const [maskedWord, setMaskedWord] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [lives, setLives] = useState(MAX_LIVES);
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
      const newGame = await createNewGame();

      setGameId(newGame.id);
      setMaskedWord(newGame.maskedWord);
      setGuessedLetters(newGame.lettersGuessed);
      setLives(newGame.attemptsLeft);
      setGameStatus(newGame.status);
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

      const updatedGame = await makeGuess(gameId, letter, {
        id: gameId,
        maskedWord,
        lettersGuessed: guessedLetters,
        attemptsLeft: lives,
        status: gameStatus,
      });

      setMaskedWord(updatedGame.maskedWord);
      setGuessedLetters(updatedGame.lettersGuessed);
      setLives(updatedGame.attemptsLeft);
      setGameStatus(updatedGame.status);

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
      {!showWelcome && <LivesDisplay lives={lives} maxLives={MAX_LIVES} />}
      {showWelcome ? (
        <WelcomePage onStartGame={startNewGame} />
      ) : (
        <>
          <div className="flex justify-start w-full">
            <Button
              variant="primary"
              onClick={startNewGame}
              disabled={isLoading}
            >
              New Game
            </Button>
          </div>

          <HangmanDisplay mistakes={MAX_LIVES - lives} className="my-4" />

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
