import CharacterAvatar from "../characters/CharacterAvatar";
import { characters } from "../characters/characterData";
import type { Expression } from "../characters/characterData";

type Props = {
  characterIds: string[];
  maxDisplay?: number;
};

export default function CharacterGroup({ characterIds, maxDisplay = 7 }: Props) {
  const displayIds = characterIds.slice(0, maxDisplay);
  const overflow = characterIds.length - maxDisplay;

  // Assign expressions based on position for variety
  const expressions: Expression[] = ["happy", "surprised", "happy", "thinking", "happy", "surprised", "happy"];

  return (
    <div className="character-group">
      {displayIds.map((id, i) => {
        const char = characters[id];
        if (!char) return null;

        const isChild = char.role === "child";
        const size = isChild ? 65 : 80;

        return (
          <div
            key={id}
            className={`character-slot character-enter`}
            style={{
              animationDelay: `${i * 0.12}s`,
            }}
            title={char.displayName}
          >
            <CharacterAvatar
              character={char}
              expression={expressions[i % expressions.length]}
              size={size}
            />
            <span className="character-name">{char.displayName}</span>
          </div>
        );
      })}
      {overflow > 0 && (
        <div className="character-overflow">+{overflow} more</div>
      )}
    </div>
  );
}
