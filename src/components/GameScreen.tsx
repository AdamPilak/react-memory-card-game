import { useEffect, useState } from "react";
import { useGameStore } from "../zustand/gameStore";
import GameCard from "./GameCard";

const GameScreen = () => {
  const {
    attempts,
    startGame,
    resetGame,
    startTime,
    stopTime,
    cards,
    time,
    difficultyLevel,
    selectedPair,
    pairsMatched,
  } = useGameStore();

  const [render, setRender] = useState(false);

  useEffect(() => {
    startGame();
    setRender(true);
    startTime();

    return () => stopTime();
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

  if (!render) return <></>;

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
        <h2 className="congratulations">
          Congratulations!
          <br />
          You Won!
        </h2>
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
        <button className="btn" onClick={() => resetGame()}>
          Back
        </button>
        <button className="btn" onClick={() => startGame()}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default GameScreen;
