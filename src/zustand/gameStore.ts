import { create } from "zustand";
import { CARD_IMAGES, DIFFICULTY_LEVELS } from "../config/gameConfig";
import { useHistoryStore } from "./historyStore";

type GameStore = {
  cards: GameCard[];
  attempts: number;
  difficultyLevel: typeof DIFFICULTY_LEVELS;
  pairsMatched: number;
  selectedPair: GameCard[];
  timeInterval?: number;
  time?: Date;
  addAttempts: () => void;
  setDifficultyLevel: (level: typeof DIFFICULTY_LEVELS) => void;
  incrementPairsMatched: () => void;
  incrementTime: () => void;
  startTime: () => void;
  stopTime: () => void;
  flipCard: (index: number) => void;
  generateCards: (numberOfCards: number) => GameCard[];
  startGame: () => void;
  resetGame: () => void;
};

type GameCard = {
  value: string;
  imgSrc: string;
  matched: boolean;
  flipped: boolean;
};

export const useGameStore = create<GameStore>((set) => ({
  cards: [],
  attempts: 0,
  difficultyLevel: "unset",
  selectedPair: [],
  pairsMatched: 0,
  timeInterval: undefined,
  time: undefined,
  addAttempts: () => {
    set((state) => ({ attempts: state.attempts + 1 }));
  },
  setDifficultyLevel: (level: typeof DIFFICULTY_LEVELS) => {
    set(() => ({ difficultyLevel: level }));
  },
  incrementPairsMatched: () => {
    set((state) => ({ pairsMatched: state.pairsMatched + 1 }));
  },
  incrementTime: () => {
    set((state) => {
      if (state.time) {
        const seconds = state.time.getSeconds();
        state.time.setSeconds(seconds + 1);
      }

      setInterval;

      return { time: state.time };
    });
  },
  startTime: () => {
    set((state) => {
      state.timeInterval = setInterval(() => {
        state.incrementTime();
      }, 1000);

      return { timeInterval: state.timeInterval };
    });
  },
  stopTime: () => {
    set((state) => {
      clearInterval(state.timeInterval);

      state.timeInterval = undefined;

      return { timeInterval: state.timeInterval };
    });
  },
  flipCard: async (index: number) => {
    set((state) => {
      const card = state.cards[index];
      card.flipped = !card.flipped;

      let selectedPairRef = state.selectedPair;
      selectedPairRef.push(card);

      if (selectedPairRef.length === 2) {
        state.addAttempts();
      }

      return { cards: state.cards, selectedPair: selectedPairRef };
    });

    let state = useGameStore.getState();

    if (state.selectedPair.length === 2) {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve("");
        }, 800)
      );

      //Checking for match
      set((state) => {
        let selectedPairRef = state.selectedPair;

        if (selectedPairRef.length === 2) {
          const match = selectedPairRef[0].value === selectedPairRef[1].value;

          if (match) {
            selectedPairRef[0].matched = true;
            selectedPairRef[1].matched = true;
            state.incrementPairsMatched();
          } else {
            selectedPairRef[0].flipped = false;
            selectedPairRef[1].flipped = false;
          }

          selectedPairRef = [];
        }

        return { cards: state.cards, selectedPair: selectedPairRef };
      });

      //Checking for win
      state = useGameStore.getState();

      if (state.pairsMatched === state.cards.length / 2) {
        state.stopTime();

        const saveGame = useHistoryStore.getState().saveGame;
        saveGame({
          attempts: state.attempts,
          date: new Date(),
          time: state.time!,
          difficultyLevel: state.difficultyLevel,
        });
      }
    }
  },
  generateCards: (numberOfCards: number) => {
    const generatedCards: GameCard[] = [];
    const randomNumbers: number[] = [];

    for (let i = 0; i < numberOfCards / 2; i++) {
      let randomNumber = Math.floor(Math.random() * CARD_IMAGES.length);
      while (randomNumbers.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * CARD_IMAGES.length);
      }

      randomNumbers.push(randomNumber);

      const selectedImageSrc = CARD_IMAGES[randomNumber];

      const generatedPair = {
        value: selectedImageSrc.split(".")[0],
        imgSrc: selectedImageSrc,
        matched: false,
        flipped: false,
      };

      generatedCards.push({ ...generatedPair });
      generatedCards.push({ ...generatedPair });
    }

    let currentIndex = generatedCards.length;

    //Shuffle array
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [generatedCards[currentIndex], generatedCards[randomIndex]] = [
        generatedCards[randomIndex],
        generatedCards[currentIndex],
      ];
    }

    return generatedCards;
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

      const generatedCards = state.generateCards(numberOfCards);

      return {
        cards: generatedCards,
        attempts: 0,
        time: new Date(0),
        pairsMatched: 0,
        selectedPair: [],
      };
    });
  },
  resetGame: () => {
    set(() => ({
      difficultyLevel: "unset",
    }));
  },
}));
