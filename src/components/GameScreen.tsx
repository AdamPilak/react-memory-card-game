import { useEffect } from "react";
import { useGameStore } from "../zustand/gameStore";
import GameCard from "./GameCard";

const GameScreen = () => {
  const { attempts, time, startGame, cards, difficultyLevel } = useGameStore();

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="game-screen">
      <div className="game-header">
        <span className="time">
          <img className="clock" src="/clock.png" alt="clock" />
          <span>1:43</span>
        </span>
        <span className="attempts">{attempts} attempts</span>
      </div>
      <div className={`game-grid ${difficultyLevel}`}>
        {cards.map((card) => (
          <GameCard />
        ))}
      </div>
      <div className="game-footer">
        <button className="btn">Exit</button>
        <button className="btn">Reset</button>
      </div>
    </div>
  );
};

export default GameScreen;
