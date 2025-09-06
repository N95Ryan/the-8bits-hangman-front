import { GameBoard } from "./components/game/GameBoard";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 relative">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <main className="w-full max-w-lg mx-auto bg-gray-800 border-2 border-cyan-400 p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.8)] flex items-center justify-center min-h-[500px]">
          <GameBoard />
        </main>

        <footer className="w-full text-center mt-8 text-sm text-gray-400">
          <p className="font-pixel">&copy; 2025 The 8bits Hangman</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
