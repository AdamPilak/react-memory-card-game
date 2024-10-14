import { useEffect } from "react";
import { useHistoryStore } from "../zustand/historyStore";
import { formatTime } from "../utils/formatTime";
import { formatDate } from "../utils/formatDate";

const History = () => {
  const { games, loadGames } = useHistoryStore();

  useEffect(() => {
    loadGames();
  }, []);

  return (
    <section className="history">
      <ul className="games">
        {games.map((game, idx) => (
          <li key={idx}>
            <div className="field">
              <div className="label">Time</div>
              <div className="value">{formatTime(game.time)}</div>
            </div>
            <div className="field">
              <div className="label">Date</div>
              <div className="value">{formatDate(game.date)}</div>
            </div>
            <div className="field">
              <div className="label">Difficulty</div>
              <div className="value">{game.difficultyLevel.toUpperCase()}</div>
            </div>
            <div className="field">
              <div className="label">Attempts</div>
              <div className="value">{game.attempts}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default History;
