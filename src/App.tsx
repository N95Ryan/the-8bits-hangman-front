import { GameBoard } from "./components/game/GameBoard";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <header className="mb-6">
        <h1 className="text-4xl md:text-6xl font-pixel text-center text-cyan-400 tracking-wider animate-pulse">
          8bit <span className="text-pink-500">Hangman</span>
        </h1>
      </header>

      <main className="w-full max-w-lg mx-auto bg-gray-800 border-2 border-cyan-400 p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.8)] flex-1 flex items-center justify-center">
        <GameBoard />
      </main>

      <footer className="mt-6 text-sm text-gray-400">
        <p className="font-pixel">Pixel Art Hangman &copy; 2025</p>
      </footer>
    </div>
  );
}

export default App;
