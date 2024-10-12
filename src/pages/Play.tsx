import DifficultyLevels from "../components/DifficultyLevels";
import GameScreen from "../components/GameScreen";
import { useGameStore } from "../zustand/gameStore";

const Play = () => {
  const { difficultyLevel } = useGameStore();

  return (
    <section className="play">
      <img className="fruit" src="/cherries.png" />
      <div className="game-board">
        {difficultyLevel === "unset" ? <DifficultyLevels /> : <GameScreen />}
      </div>
    </section>
  );
};

export default Play;
