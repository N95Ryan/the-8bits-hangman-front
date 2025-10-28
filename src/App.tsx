import { useState } from "react";
import { GameBoard } from "./components/game/GameBoard";
import { WelcomePage } from "./components/game/WelcomePage";
import "./index.css";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("Player");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );

  const handleStartGame = (
    name: string,
    selectedDifficulty: "easy" | "medium" | "hard"
  ) => {
    setPlayerName(name);
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
  };

  const handleBackToWelcome = () => {
    setGameStarted(false);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center p-0 m-0">
      <div className="flex items-center justify-center w-full h-full">
        {!gameStarted ? (
          <WelcomePage onStartGame={handleStartGame} />
        ) : (
          <GameBoard
            initialPlayerName={playerName}
            initialDifficulty={difficulty}
            onBackToWelcome={handleBackToWelcome}
          />
        )}
      </div>
    </div>
  );
}

export default App;
