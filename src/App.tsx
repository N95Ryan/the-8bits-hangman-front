import { GameBoard } from "./components/game/GameBoard";
import "./App.css";

function App() {
  return (
    <div className="w-screen h-screen flex items-center justify-center p-0 m-0">
      <div className="flex items-center justify-center w-full h-full">
        <GameBoard />
      </div>
    </div>
  );
}

export default App;
