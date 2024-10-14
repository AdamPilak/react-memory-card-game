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
        {games.map((game) => (
          <li>
            <div>
              <span className="time">{formatTime(game.time)}</span>
              <span className="difficulty-level">{game.difficultyLevel}</span>
            </div>
            <div>
              <span className="date">{formatDate(game.date)}</span>
              <span className="attempts">{game.attempts}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default History;
