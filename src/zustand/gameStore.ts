import { create } from "zustand";
import { CARD_IMAGES, DIFFICULTY_LEVELS } from "../config/gameConfig";

type GameStore = {
  cards: GameCard[];
  attempts: number;
  difficultyLevel: typeof DIFFICULTY_LEVELS;
  time?: string;
  addAttempts: () => void;
  setDifficultyLevel: (level: typeof DIFFICULTY_LEVELS) => void;
  startGame: () => void;
};

type GameCard = {
  value: string;
  imgSrc: string;
  matched: boolean;
};

export const useGameStore = create<GameStore>((set) => ({
  cards: [],
  attempts: 0,
  difficultyLevel: "unset",
  addAttempts: () => {
    set((state) => ({ attempts: state.attempts + 1 }));
  },
  setDifficultyLevel: (level: typeof DIFFICULTY_LEVELS) => {
    set(() => ({ difficultyLevel: level }));
  },
  startGame: () => {
    set((state) => {
      let numberOfCards = 0;

      switch (state.difficultyLevel) {
        case "easy":
          numberOfCards = 12;
          break;
        case "medium":
          numberOfCards = 16;
          break;
        case "hard":
          numberOfCards = 20;
          break;
      }

      const generatedCards: GameCard[] = [];
      const randomNumbers: number[] = [];

      for (let i = 0; i < numberOfCards / 2; i++) {
        let randomNumber = Math.floor(Math.random() * CARD_IMAGES.length);
        while (randomNumbers.includes(randomNumber)) {
          randomNumber = Math.floor(Math.random() * CARD_IMAGES.length);
        }

        randomNumbers.push(randomNumber);
        console.log(randomNumbers);

        const selectedImageSrc = CARD_IMAGES[randomNumber];

        const generatedPair = {
          value: selectedImageSrc.split(".")[0],
          imgSrc: selectedImageSrc,
          matched: false,
        };

        generatedCards.push(generatedPair);
        generatedCards.push(generatedPair);
      }

      //   const generatedCards = CARD_IMAGES;

      return {
        cards: generatedCards,
        attempts: 0,
        time: undefined,
      };
    });
  },
}));
