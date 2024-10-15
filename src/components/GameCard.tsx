import ReactCardFlip from "react-card-flip";
import { useGameStore } from "../zustand/gameStore";

type Props = {
  flipped: boolean;
  index: number;
  imgSrc: string;
  selectedPairCount: number;
};

const GameCard = ({ flipped, index, imgSrc, selectedPairCount }: Props) => {
  const { flipCard } = useGameStore();

  return (
    <ReactCardFlip flipDirection="horizontal" isFlipped={flipped}>
      <button
        disabled={selectedPairCount === 2}
        className="game-card front"
        onClick={() => flipCard(index)}
      >
        <img draggable={false} src="/question-mark.png" alt="Question Mark" />
      </button>
      <button disabled={flipped} className="game-card back">
        <img draggable={false} src={imgSrc} alt="Fruit" />
      </button>
    </ReactCardFlip>
  );
};

export default GameCard;
