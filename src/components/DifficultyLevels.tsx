import { useGameStore } from "../zustand/gameStore";

const DifficultyLevels = () => {
  const { setDifficultyLevel } = useGameStore();

  return (
    <div className="difficulty-levels">
      <h2>Choose difficulty level</h2>
      <div className="container">
        <button className="btn" onClick={() => setDifficultyLevel("easy")}>
          Easy
        </button>
        <button className="btn" onClick={() => setDifficultyLevel("medium")}>
          Medium
        </button>
        <button className="btn" onClick={() => setDifficultyLevel("hard")}>
          Hard
        </button>
      </div>
    </div>
  );
};

export default DifficultyLevels;
