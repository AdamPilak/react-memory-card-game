import { useEffect } from "react";
import DifficultyLevels from "../components/DifficultyLevels";
import GameScreen from "../components/GameScreen";
import { useGameStore } from "../zustand/gameStore";

const Play = () => {
  const { difficultyLevel, setDifficultyLevel } = useGameStore();

  useEffect(() => {
    return () => setDifficultyLevel("unset");
  }, []);

  return (
    <section className="play">
      <div className="game-board">
        {difficultyLevel === "unset" ? <DifficultyLevels /> : <GameScreen />}
      </div>
    </section>
  );
};

export default Play;
