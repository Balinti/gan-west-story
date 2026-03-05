import type { Choice } from "../data/story";

type Props = {
  choices: Choice[];
  onChoose: (choice: Choice) => void;
  visible: boolean;
};

export default function ChoiceButtons({ choices, onChoose, visible }: Props) {
  if (!visible) return null;

  return (
    <div className="choices-container">
      {choices.map((choice, i) => (
        <button
          key={choice.nextScene}
          className="choice-button"
          onClick={() => onChoose(choice)}
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          {choice.label}
        </button>
      ))}
    </div>
  );
}
