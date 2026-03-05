export type Expression = "happy" | "surprised" | "thinking";

export type CharacterConfig = {
  name: string;
  displayName: string;
  role: "teacher" | "director" | "child";
  hairColor: string;
  hairStyle: "short" | "long" | "curly" | "ponytail" | "pigtails" | "bob";
  skinTone: string;
  outfitColor: string;
  outfitAccent: string;
  accessory?: string;
};

export const characters: Record<string, CharacterConfig> = {
  // Staff
  sarah: {
    name: "sarah",
    displayName: "Morah Sarah",
    role: "director",
    hairColor: "#5C3317",
    hairStyle: "long",
    skinTone: "#F5D0A9",
    outfitColor: "#4A90D9",
    outfitAccent: "#FFD700",
    accessory: "star-necklace",
  },
  elizabeth: {
    name: "elizabeth",
    displayName: "Morah Elizabeth",
    role: "teacher",
    hairColor: "#2C1810",
    hairStyle: "curly",
    skinTone: "#8D5524",
    outfitColor: "#E74C3C",
    outfitAccent: "#FFF",
  },
  virginia: {
    name: "virginia",
    displayName: "Morah Virginia",
    role: "teacher",
    hairColor: "#1A1A2E",
    hairStyle: "ponytail",
    skinTone: "#C68642",
    outfitColor: "#27AE60",
    outfitAccent: "#FFF",
  },
  joselyn: {
    name: "joselyn",
    displayName: "Morah Joselyn",
    role: "teacher",
    hairColor: "#3D2B1F",
    hairStyle: "bob",
    skinTone: "#D2A67B",
    outfitColor: "#9B59B6",
    outfitAccent: "#FFF",
  },
  // Kids
  levi: {
    name: "levi",
    displayName: "Levi",
    role: "child",
    hairColor: "#4A3728",
    hairStyle: "short",
    skinTone: "#FDDCB1",
    outfitColor: "#3498DB",
    outfitAccent: "#E67E22",
  },
  ariella: {
    name: "ariella",
    displayName: "Ariella",
    role: "child",
    hairColor: "#8B4513",
    hairStyle: "pigtails",
    skinTone: "#F5D0A9",
    outfitColor: "#E91E90",
    outfitAccent: "#FFD700",
  },
  micah: {
    name: "micah",
    displayName: "Micah",
    role: "child",
    hairColor: "#2C1810",
    hairStyle: "curly",
    skinTone: "#8D5524",
    outfitColor: "#E67E22",
    outfitAccent: "#FFF",
  },
  noa: {
    name: "noa",
    displayName: "Noa",
    role: "child",
    hairColor: "#5C3317",
    hairStyle: "long",
    skinTone: "#FDDCB1",
    outfitColor: "#FF69B4",
    outfitAccent: "#9B59B6",
  },
  ezra: {
    name: "ezra",
    displayName: "Ezra",
    role: "child",
    hairColor: "#D4A76A",
    hairStyle: "short",
    skinTone: "#F5D0A9",
    outfitColor: "#2ECC71",
    outfitAccent: "#3498DB",
  },
  talia: {
    name: "talia",
    displayName: "Talia",
    role: "child",
    hairColor: "#1A1A2E",
    hairStyle: "bob",
    skinTone: "#C68642",
    outfitColor: "#F39C12",
    outfitAccent: "#E74C3C",
  },
  jonah: {
    name: "jonah",
    displayName: "Jonah",
    role: "child",
    hairColor: "#8B4513",
    hairStyle: "short",
    skinTone: "#D2A67B",
    outfitColor: "#1ABC9C",
    outfitAccent: "#2C3E50",
  },
  shira: {
    name: "shira",
    displayName: "Shira",
    role: "child",
    hairColor: "#D4A76A",
    hairStyle: "ponytail",
    skinTone: "#FDDCB1",
    outfitColor: "#9B59B6",
    outfitAccent: "#E91E90",
  },
  rafi: {
    name: "rafi",
    displayName: "Rafi",
    role: "child",
    hairColor: "#2C1810",
    hairStyle: "curly",
    skinTone: "#F5D0A9",
    outfitColor: "#E74C3C",
    outfitAccent: "#F39C12",
  },
};
