import { useEffect } from "react";
import { useGameStore } from "../zustand/gameStore";
import GameCard from "./GameCard";

const GameScreen = () => {
  const {
    attempts,
    startGame,
    startTime,
    cards,
    time,
    difficultyLevel,
    selectedPair,
    pairsMatched,
  } = useGameStore();

  useEffect(() => {
    startGame();
    startTime();
  }, []);

  const formatTime = () => {
    if (time) {
      const minutes = time?.getMinutes();
      const seconds = time?.getSeconds();

      const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
      const formattedSeconds = (seconds < 10 ? "0" : "") + seconds;

      return `${formattedMinutes} : ${formattedSeconds}`;
    }
  };

  return (
    <div className="game-screen">
      <div className="game-header">
        <span className="time">
          <img className="clock" src="/clock.png" alt="clock" />
          <span>{formatTime()}</span>
        </span>
        <span className="attempts">{attempts} attempts</span>
      </div>
      {pairsMatched === cards.length / 2 ? (
        <p>XXXXXXXX</p>
      ) : (
        <div className={`game-grid ${difficultyLevel}`}>
          {cards.map((card, idx) => (
            <GameCard
              key={idx}
              flipped={card.flipped}
              index={idx}
              imgSrc={card.imgSrc}
              selectedPairCount={selectedPair.length}
            />
          ))}
        </div>
      )}
      <div className="game-footer">
        <button className="btn">Exit</button>
        <button className="btn">Reset</button>
      </div>
    </div>
  );
};

export default GameScreen;
