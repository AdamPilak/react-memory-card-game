import { useCallback, useEffect } from "react";
import { useGameStore } from "../zustand/gameStore";
import GameCard from "./GameCard";
import { formatTime } from "../utils/formatTime";
import Confetti from "react-dom-confetti";

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

  const handleStart = useCallback(() => {
    stopTime();
    startGame();
    startTime();
  }, []);

  useEffect(() => {
    handleStart();

    return () => stopTime();
  }, []);

  return (
    <div className="game-screen">
      <div className="confetti">
        <Confetti
          active={pairsMatched === cards.length / 2}
          config={{ elementCount: 200, spread: 90 }}
        />
      </div>

      <div className="game-header">
        <span className="time">
          <img className="clock" src="/clock.png" alt="clock" />
          <span>{formatTime(time)}</span>
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
        <button className="btn" onClick={() => handleStart()}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default GameScreen;
