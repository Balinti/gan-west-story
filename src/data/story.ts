export type Choice = {
  label: string;
  nextScene: string;
};

export type Scene = {
  id: string;
  text: string;
  characters: string[];
  background: string;
  choices?: Choice[];
  next?: string;
};

export const scenes: Record<string, Scene> = {
  opening: {
    id: "opening",
    text: "Good morning! The sun is shining over Gan West preschool in Los Angeles. Morah Sarah, the school director, opens the big blue doors with a warm smile. Inside, the classroom is bright and cheerful — Teacher Elizabeth, Teacher Virginia, and Teacher Joselyn are busy setting up for a wonderful day!",
    characters: ["sarah", "elizabeth", "virginia", "joselyn"],
    background: "classroom",
    next: "arrivals-1",
  },
  "arrivals-1": {
    id: "arrivals-1",
    text: "The first kids arrive! Crew runs in with his favorite dinosaur backpack. Right behind him, Mia Alma skips through the door singing a little song. Mason gives Teacher Elizabeth a big hug! Ayla walks in holding her teddy bear.",
    characters: ["crew", "mia-alma", "mason", "ayla", "elizabeth"],
    background: "entrance",
    next: "arrivals-2",
  },
  "arrivals-2": {
    id: "arrivals-2",
    text: "More friends are here! Shay zooms past like an airplane — whoooosh! Chaya waves goodbye to her mommy and runs to the toy kitchen. Desi and Mia Alexandra arrive together, ready to play!",
    characters: ["shay", "chaya", "desi", "mia-alexandra"],
    background: "entrance",
    next: "first-choice",
  },
  "first-choice": {
    id: "first-choice",
    text: "Everyone is here! Morah Sarah claps her hands and says, \"Boker tov, yeladim! Good morning, children! What should we do first?\"",
    characters: ["sarah"],
    background: "classroom",
    choices: [
      { label: "\ud83c\udfb5 Circle Time!", nextScene: "circle-time" },
      { label: "\ud83e\uddf8 Free Play!", nextScene: "free-play" },
    ],
  },
  "circle-time": {
    id: "circle-time",
    text: "Everyone gathers on the colorful rug for circle time! Teacher Virginia starts playing guitar and they all sing \"Shalom Chaverim\" together. Crew claps along, and Mia Alma dances in her spot. They sing the days of the week in Hebrew — Yom Rishon, Yom Sheni, Yom Shlishi!",
    characters: ["virginia", "crew", "mia-alma", "mason", "ayla", "shay", "chaya", "desi", "mia-alexandra"],
    background: "circle-rug",
    next: "snack-time",
  },
  "free-play": {
    id: "free-play",
    text: "Time to play! Shay and Desi build a tall tower with blocks — it almost reaches the ceiling! Ayla and Mia Alexandra are playing in the toy kitchen, making pretend challah. Chaya is drawing a rainbow, and Mason reads a book with Teacher Joselyn. So many fun things to do!",
    characters: ["shay", "desi", "ayla", "mia-alexandra", "chaya", "mason", "joselyn"],
    background: "playroom",
    next: "snack-time",
  },
  "snack-time": {
    id: "snack-time",
    text: "Snack time! Everyone washes their hands and sits at the little tables. Teacher Elizabeth passes out apple slices and crackers. Together they say the bracha: \"Baruch Atah Adonai... borei pri ha'etz!\" Yum yum yum!",
    characters: ["elizabeth", "crew", "mia-alma", "mason", "ayla", "shay", "chaya"],
    background: "snack-table",
    next: "mystery",
  },
  mystery: {
    id: "mystery",
    text: "Oh no! After snack time, Teacher Virginia notices something — Sparkle the class hamster is not in her cage! The little door is open! \"Where did Sparkle go?\" asks Teacher Virginia. Can you help find her?",
    characters: ["virginia"],
    background: "classroom",
    choices: [
      { label: "\ud83c\udf33 Check the playground!", nextScene: "search-playground" },
      { label: "\ud83c\udfa8 Check the art room!", nextScene: "search-art" },
      { label: "\ud83d\udc69\u200d\ud83c\udfeb Ask Morah Sarah!", nextScene: "search-sarah" },
    ],
  },
  "search-playground": {
    id: "search-playground",
    text: "Everyone runs outside to the playground! Crew looks under the slide, Mason checks behind the sandbox, and Mia Alma peeks inside the little playhouse. \"I see something fuzzy!\" shouts Shay, pointing at the garden. There's Sparkle, nibbling on a leaf!",
    characters: ["crew", "mason", "mia-alma", "shay"],
    background: "playground",
    next: "found-sparkle",
  },
  "search-art": {
    id: "search-art",
    text: "The kids tiptoe into the art room. Mia Alexandra checks under the easels, Desi looks behind the paint jars, and Chaya peeks in the crayon box. \"Look!\" whispers Ayla, pointing at the paper shelf. Sparkle is sitting there, cuddled up in a pile of tissue paper!",
    characters: ["mia-alexandra", "desi", "chaya", "ayla"],
    background: "art-room",
    next: "found-sparkle",
  },
  "search-sarah": {
    id: "search-sarah",
    text: "The kids go to Morah Sarah's office. \"Morah Sarah, Sparkle is missing!\" says Desi. Morah Sarah smiles and says, \"I think I saw her near the book corner!\" They all rush over, and sure enough — Sparkle is snuggled up inside a big storybook! She wanted to read a story too!",
    characters: ["sarah", "desi", "mia-alexandra"],
    background: "office",
    next: "found-sparkle",
  },
  "found-sparkle": {
    id: "found-sparkle",
    text: "Hooray! Sparkle is found! Everyone cheers and claps. Teacher Virginia gently picks up Sparkle and puts her back in her cozy cage. \"Good job, detectives!\" she says. Sparkle wiggles her little nose and everyone giggles.",
    characters: ["virginia", "crew", "mia-alma", "ayla", "shay"],
    background: "classroom",
    next: "art-choice",
  },
  "art-choice": {
    id: "art-choice",
    text: "Now it's time for an art project! Teacher Joselyn sets out the supplies on the big craft table. \"What should we make today?\" she asks with a big smile.",
    characters: ["joselyn"],
    background: "art-room",
    choices: [
      { label: "\ud83c\udf5e Shabbat Challah Craft!", nextScene: "art-challah" },
      { label: "\ud83c\udfe0 Mezuzah Decoration!", nextScene: "art-mezuzah" },
    ],
  },
  "art-challah": {
    id: "art-challah",
    text: "Time to make challah! But not the kind you eat — the kind you make with playdough! Everyone rolls and braids their dough, just like real challah. Mason makes a tiny one, and Chaya makes a GIANT one. Teacher Joselyn helps Desi braid his, and they all paint their challahs golden brown. Beautiful!",
    characters: ["joselyn", "mason", "chaya", "desi"],
    background: "art-room",
    next: "outdoor-play",
  },
  "art-mezuzah": {
    id: "art-mezuzah",
    text: "Everyone gets a little wooden mezuzah to decorate! They use glitter, stickers, and paint to make them sparkly and special. Mia Alma covers hers in purple glitter, Desi paints stars on his, and Ayla adds tiny heart stickers. \"These are for your front doors at home!\" says Teacher Joselyn.",
    characters: ["joselyn", "mia-alma", "desi", "ayla"],
    background: "art-room",
    next: "outdoor-play",
  },
  "outdoor-play": {
    id: "outdoor-play",
    text: "Playground time! Everyone runs outside into the sunshine. Shay goes down the big slide — wheee! Crew and Desi play on the swings, Mia Alexandra and Ayla dig in the sandbox, and Mia Alma plays tag with Mason. The teachers watch and clap and laugh. What a perfect day!",
    characters: ["shay", "crew", "desi", "mia-alexandra", "ayla", "mia-alma", "mason"],
    background: "playground",
    next: "shabbat-prep",
  },
  "shabbat-prep": {
    id: "shabbat-prep",
    text: "It's Friday — that means Shabbat! Everyone helps set the special Shabbat table. Chaya places the candlesticks, Desi puts out the challah cover, and Mia Alexandra pours the grape juice into little cups. Teacher Elizabeth lights the candles, and everyone covers their eyes. \"Baruch Atah Adonai... l'hadlik ner shel Shabbat!\" Shabbat Shalom!",
    characters: ["elizabeth", "chaya", "desi", "mia-alexandra"],
    background: "shabbat-table",
    next: "closing",
  },
  closing: {
    id: "closing",
    text: "What a wonderful day at Gan West! Now it's time to go home. The parents arrive one by one, and each kid gets a big hug from the teachers. \"See you next week!\" everyone says. Crew waves, Mia Alma blows a kiss, and little Ayla gives one last hug to Morah Sarah.",
    characters: ["sarah", "elizabeth", "virginia", "joselyn", "crew", "mia-alma", "ayla"],
    background: "entrance",
    next: "end",
  },
  end: {
    id: "end",
    text: "Shabbat Shalom from Gan West! Thank you for spending the day with us. We can't wait to see you again!",
    characters: ["sarah", "elizabeth", "virginia", "joselyn", "mia-alma", "mia-alexandra", "ayla", "chaya", "crew", "mason", "shay", "desi"],
    background: "classroom",
  },
};

// Scene order for progress tracking (main path)
export const sceneOrder: string[] = [
  "opening",
  "arrivals-1",
  "arrivals-2",
  "first-choice",
  "circle-time",
  "free-play",
  "snack-time",
  "mystery",
  "search-playground",
  "search-art",
  "search-sarah",
  "found-sparkle",
  "art-choice",
  "art-challah",
  "art-mezuzah",
  "outdoor-play",
  "shabbat-prep",
  "closing",
  "end",
];

// Main path scenes for progress calculation
export const mainPathScenes: string[] = [
  "opening",
  "arrivals-1",
  "arrivals-2",
  "first-choice",
  "snack-time",
  "mystery",
  "found-sparkle",
  "art-choice",
  "outdoor-play",
  "shabbat-prep",
  "closing",
  "end",
];
