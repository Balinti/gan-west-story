import { type CharacterConfig, type Expression } from "./characterData";

type Props = {
  character: CharacterConfig;
  expression?: Expression;
  size?: number;
};

function getHairPath(style: CharacterConfig["hairStyle"], isChild: boolean) {
  const headTop = isChild ? 12 : 8;
  switch (style) {
    case "short":
      return `M 18 ${headTop} Q 15 ${headTop - 4} 25 ${headTop - 5} Q 35 ${headTop - 4} 32 ${headTop} Z`;
    case "long":
      return `M 15 ${headTop} Q 14 ${headTop - 5} 25 ${headTop - 6} Q 36 ${headTop - 5} 35 ${headTop} L 36 35 Q 37 38 35 40 L 35 38 L 15 38 L 15 40 Q 13 38 14 35 Z`;
    case "curly":
      return `M 16 ${headTop} Q 13 ${headTop - 3} 18 ${headTop - 6} Q 22 ${headTop - 8} 25 ${headTop - 7} Q 28 ${headTop - 8} 32 ${headTop - 6} Q 37 ${headTop - 3} 34 ${headTop} Q 36 ${headTop + 2} 35 ${headTop + 4} Q 37 ${headTop + 6} 36 ${headTop + 8} L 14 ${headTop + 8} Q 13 ${headTop + 6} 15 ${headTop + 4} Q 14 ${headTop + 2} 16 ${headTop} Z`;
    case "ponytail":
      return `M 16 ${headTop} Q 15 ${headTop - 5} 25 ${headTop - 6} Q 35 ${headTop - 5} 34 ${headTop} L 34 ${headTop + 2} L 38 ${headTop + 4} Q 40 ${headTop + 10} 38 ${headTop + 20} Q 37 ${headTop + 24} 36 ${headTop + 22} Q 37 ${headTop + 14} 35 ${headTop + 6} L 34 ${headTop + 4} L 16 ${headTop + 4} Z`;
    case "pigtails":
      return `M 16 ${headTop} Q 15 ${headTop - 5} 25 ${headTop - 6} Q 35 ${headTop - 5} 34 ${headTop} L 34 ${headTop + 4} L 36 ${headTop + 6} Q 39 ${headTop + 10} 37 ${headTop + 18} Q 36 ${headTop + 20} 35 ${headTop + 16} Q 36 ${headTop + 10} 34 ${headTop + 6} L 16 ${headTop + 6} L 14 ${headTop + 8} Q 11 ${headTop + 12} 13 ${headTop + 20} Q 14 ${headTop + 22} 15 ${headTop + 18} Q 14 ${headTop + 12} 16 ${headTop + 8} Z`;
    case "bob":
      return `M 15 ${headTop} Q 14 ${headTop - 5} 25 ${headTop - 6} Q 36 ${headTop - 5} 35 ${headTop} L 36 28 Q 37 32 34 34 L 16 34 Q 13 32 14 28 Z`;
    default:
      return "";
  }
}

function getEyes(expression: Expression, isChild: boolean) {
  const y = isChild ? 22 : 20;
  const eyeSize = isChild ? 2.5 : 2;

  switch (expression) {
    case "surprised":
      return (
        <>
          <ellipse cx={21} cy={y} rx={eyeSize} ry={eyeSize + 1} fill="#2C1810" />
          <ellipse cx={29} cy={y} rx={eyeSize} ry={eyeSize + 1} fill="#2C1810" />
          <circle cx={21.5} cy={y - 0.5} r={0.8} fill="#FFF" />
          <circle cx={29.5} cy={y - 0.5} r={0.8} fill="#FFF" />
        </>
      );
    case "thinking":
      return (
        <>
          <ellipse cx={21} cy={y} rx={eyeSize} ry={1} fill="#2C1810" />
          <ellipse cx={29} cy={y} rx={eyeSize} ry={eyeSize} fill="#2C1810" />
          <circle cx={29.5} cy={y - 0.5} r={0.8} fill="#FFF" />
        </>
      );
    case "happy":
    default:
      return (
        <>
          <ellipse cx={21} cy={y} rx={eyeSize} ry={eyeSize} fill="#2C1810" />
          <ellipse cx={29} cy={y} rx={eyeSize} ry={eyeSize} fill="#2C1810" />
          <circle cx={21.8} cy={y - 0.5} r={0.8} fill="#FFF" />
          <circle cx={29.8} cy={y - 0.5} r={0.8} fill="#FFF" />
        </>
      );
  }
}

function getMouth(expression: Expression, isChild: boolean) {
  const y = isChild ? 28 : 27;
  switch (expression) {
    case "surprised":
      return <ellipse cx={25} cy={y} rx={2} ry={2.5} fill="#C0392B" />;
    case "thinking":
      return (
        <path
          d={`M 22 ${y} Q 25 ${y - 1} 28 ${y}`}
          fill="none"
          stroke="#C0392B"
          strokeWidth={1.2}
          strokeLinecap="round"
        />
      );
    case "happy":
    default:
      return (
        <path
          d={`M 21 ${y} Q 25 ${y + 4} 29 ${y}`}
          fill="#C0392B"
          stroke="none"
        />
      );
  }
}

function getBlush(isChild: boolean) {
  const y = isChild ? 25 : 24;
  return (
    <>
      <ellipse cx={17} cy={y} rx={3} ry={1.5} fill="#FFB6C1" opacity={0.4} />
      <ellipse cx={33} cy={y} rx={3} ry={1.5} fill="#FFB6C1" opacity={0.4} />
    </>
  );
}

export default function CharacterAvatar({
  character,
  expression = "happy",
  size = 80,
}: Props) {
  const isChild = character.role === "child";
  const bodyY = isChild ? 36 : 34;
  const headRadius = isChild ? 14 : 13;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 60"
      style={{ overflow: "visible" }}
    >
      {/* Body */}
      <ellipse
        cx={25}
        cy={bodyY + 14}
        rx={isChild ? 12 : 14}
        ry={isChild ? 10 : 12}
        fill={character.outfitColor}
      />
      {/* Outfit accent (collar/stripe) */}
      <ellipse
        cx={25}
        cy={bodyY + 6}
        rx={isChild ? 8 : 9}
        ry={3}
        fill={character.outfitAccent}
      />

      {/* Arms */}
      <ellipse cx={11} cy={bodyY + 12} rx={4} ry={6} fill={character.outfitColor} transform="rotate(-15 11 48)" />
      <ellipse cx={39} cy={bodyY + 12} rx={4} ry={6} fill={character.outfitColor} transform="rotate(15 39 48)" />

      {/* Hands */}
      <circle cx={9} cy={bodyY + 17} r={2.5} fill={character.skinTone} />
      <circle cx={41} cy={bodyY + 17} r={2.5} fill={character.skinTone} />

      {/* Head */}
      <circle cx={25} cy={isChild ? 20 : 18} r={headRadius} fill={character.skinTone} />

      {/* Hair */}
      <path d={getHairPath(character.hairStyle, isChild)} fill={character.hairColor} />

      {/* Eyes */}
      {getEyes(expression, isChild)}

      {/* Blush */}
      {getBlush(isChild)}

      {/* Mouth */}
      {getMouth(expression, isChild)}

      {/* Accessory */}
      {character.accessory === "star-necklace" && (
        <polygon
          points="25,36 26,38 28,38 27,39.5 27.5,41.5 25,40.5 22.5,41.5 23,39.5 22,38 24,38"
          fill="#FFD700"
        />
      )}
    </svg>
  );
}
