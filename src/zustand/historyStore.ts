import { create } from "zustand";
import { DIFFICULTY_LEVELS } from "../config/gameConfig";
import { STORAGE_LABEL } from "../config/historyConfig";

type HisotryStore = {
  games: HistoryGame[];
  loadGames: () => void;
  saveGame: (game: HistoryGame) => void;
};

type HistoryGame = {
  time: Date;
  attempts: number;
  difficultyLevel: typeof DIFFICULTY_LEVELS;
  date: Date;
};

export const useHistoryStore = create<HisotryStore>((set) => ({
  games: [],
  loadGames: () => {
    const loadedGames = localStorage.getItem(STORAGE_LABEL);

    !loadedGames
      ? set(() => ({ games: [] }))
      : set(() => ({ games: JSON.parse(loadedGames) }));
  },
  saveGame: (game: HistoryGame) => {
    const loadedGames = localStorage.getItem(STORAGE_LABEL);

    if (loadedGames) {
      const loadedGamesJson = JSON.parse(loadedGames);
      loadedGamesJson.unshift(game);

      localStorage.setItem(STORAGE_LABEL, JSON.stringify(loadedGamesJson));
    } else {
      localStorage.setItem(STORAGE_LABEL, JSON.stringify([game]));
    }
  },
}));
