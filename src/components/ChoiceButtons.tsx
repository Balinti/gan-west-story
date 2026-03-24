import type { Choice } from "../data/story";

const base = import.meta.env.BASE_URL;

type Props = {
  choices: Choice[];
  onChoose: (choice: Choice) => void;
  visible: boolean;
};

export default function ChoiceButtons({ choices, onChoose, visible }: Props) {
  if (!visible) return null;

  const hasImages = choices.some((c) => c.image);

  if (!hasImages) {
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

  return (
    <div className="choices-image-container">
      {choices.map((choice, i) => (
        <button
          key={choice.nextScene}
          className="choice-image-card"
          onClick={() => onChoose(choice)}
          style={{ animationDelay: `${i * 0.12}s` }}
        >
          {choice.image && (
            <img
              src={`${base}${choice.image}`}
              alt={choice.label}
              className="choice-image"
            />
          )}
          <span className="choice-image-label">{choice.label}</span>
        </button>
      ))}
    </div>
  );
}
