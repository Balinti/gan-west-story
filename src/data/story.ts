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
    text: "Good morning! The sun is shining over Gan West preschool in Los Angeles. Morah Sarah, the school director, opens the big blue doors with a warm smile. Inside, the classroom is bright and cheerful — the teachers are busy setting up for a wonderful day!",
    characters: ["sarah", "elizabeth", "virginia", "joselyn"],
    background: "classroom",
    next: "arrivals-1",
  },
  "arrivals-1": {
    id: "arrivals-1",
    text: "The first kids arrive! Levi runs in with his favorite dinosaur backpack. Right behind him, Ariella skips through the door singing a little song. Micah gives one of the teachers a big hug!",
    characters: ["levi", "ariella", "micah", "elizabeth"],
    background: "entrance",
    next: "arrivals-2",
  },
  "arrivals-2": {
    id: "arrivals-2",
    text: "More friends are here! Noa walks in holding her teddy bear, and Ezra zooms past like an airplane — whoooosh! Talia waves goodbye to her mommy and runs to the toy kitchen. Jonah, Shira, and Rafi arrive together, ready to play!",
    characters: ["noa", "ezra", "talia", "jonah", "shira", "rafi"],
    background: "entrance",
    next: "first-choice",
  },
  "first-choice": {
    id: "first-choice",
    text: "Everyone is here! Morah Sarah claps her hands and says, \"Boker tov, yeladim! Good morning, children! What should we do first?\"",
    characters: ["sarah"],
    background: "classroom",
    choices: [
      { label: "🎵 Circle Time!", nextScene: "circle-time" },
      { label: "🧸 Free Play!", nextScene: "free-play" },
    ],
  },
  "circle-time": {
    id: "circle-time",
    text: "Everyone gathers on the colorful rug for circle time! One of the teachers starts playing guitar and they all sing \"Shalom Chaverim\" together. Levi claps along, and Ariella dances in her spot. They sing the days of the week in Hebrew — Yom Rishon, Yom Sheni, Yom Shlishi!",
    characters: ["virginia", "levi", "ariella", "micah", "noa", "ezra", "talia", "jonah", "shira", "rafi"],
    background: "circle-rug",
    next: "snack-time",
  },
  "free-play": {
    id: "free-play",
    text: "Time to play! Ezra and Jonah build a tall tower with blocks — it almost reaches the ceiling! Noa and Shira are playing in the toy kitchen, making pretend challah. Rafi is drawing a rainbow, and Talia reads a book with one of the teachers. So many fun things to do!",
    characters: ["ezra", "jonah", "noa", "shira", "rafi", "talia", "joselyn"],
    background: "playroom",
    next: "snack-time",
  },
  "snack-time": {
    id: "snack-time",
    text: "Snack time! Everyone washes their hands and sits at the little tables. The teachers pass out apple slices and crackers. Together they say the bracha: \"Baruch Atah Adonai... borei pri ha'etz!\" Yum yum yum!",
    characters: ["elizabeth", "levi", "ariella", "micah", "noa", "ezra", "talia"],
    background: "snack-table",
    next: "mystery",
  },
  mystery: {
    id: "mystery",
    text: "Oh no! After snack time, one of the teachers notices something — Sparkle the class hamster is not in her cage! The little door is open! \"Where did Sparkle go?\" she asks. Can you help find her?",
    characters: ["virginia"],
    background: "classroom",
    choices: [
      { label: "🌳 Check the playground!", nextScene: "search-playground" },
      { label: "🎨 Check the art room!", nextScene: "search-art" },
      { label: "👩‍🏫 Ask Morah Sarah!", nextScene: "search-sarah" },
    ],
  },
  "search-playground": {
    id: "search-playground",
    text: "Everyone runs outside to the playground! Levi looks under the slide, Micah checks behind the sandbox, and Ariella peeks inside the little playhouse. \"I see something fuzzy!\" shouts Ezra, pointing at the garden. There's Sparkle, nibbling on a leaf!",
    characters: ["levi", "micah", "ariella", "ezra"],
    background: "playground",
    next: "found-sparkle",
  },
  "search-art": {
    id: "search-art",
    text: "The kids tiptoe into the art room. Shira checks under the easels, Rafi looks behind the paint jars, and Talia peeks in the crayon box. \"Look!\" whispers Noa, pointing at the paper shelf. Sparkle is sitting there, cuddled up in a pile of tissue paper!",
    characters: ["shira", "rafi", "talia", "noa"],
    background: "art-room",
    next: "found-sparkle",
  },
  "search-sarah": {
    id: "search-sarah",
    text: "The kids go to Morah Sarah's office. \"Morah Sarah, Sparkle is missing!\" says Jonah. Morah Sarah smiles and says, \"I think I saw her near the book corner!\" They all rush over, and sure enough — Sparkle is snuggled up inside a big storybook! She wanted to read a story too!",
    characters: ["sarah", "jonah", "shira"],
    background: "office",
    next: "found-sparkle",
  },
  "found-sparkle": {
    id: "found-sparkle",
    text: "Hooray! Sparkle is found! Everyone cheers and claps. The teacher gently picks up Sparkle and puts her back in her cozy cage. \"Good job, detectives!\" she says. Sparkle wiggles her little nose and everyone giggles.",
    characters: ["virginia", "levi", "ariella", "noa", "ezra"],
    background: "classroom",
    next: "art-choice",
  },
  "art-choice": {
    id: "art-choice",
    text: "Now it's time for an art project! The teacher sets out the supplies on the big craft table. \"What should we make today?\" she asks with a big smile.",
    characters: ["joselyn"],
    background: "art-room",
    choices: [
      { label: "🍞 Shabbat Challah Craft!", nextScene: "art-challah" },
      { label: "🏠 Mezuzah Decoration!", nextScene: "art-mezuzah" },
    ],
  },
  "art-challah": {
    id: "art-challah",
    text: "Time to make challah! But not the kind you eat — the kind you make with playdough! Everyone rolls and braids their dough, just like real challah. Micah makes a tiny one, and Talia makes a GIANT one. The teacher helps Rafi braid his, and they all paint their challahs golden brown. Beautiful!",
    characters: ["joselyn", "micah", "talia", "rafi"],
    background: "art-room",
    next: "outdoor-play",
  },
  "art-mezuzah": {
    id: "art-mezuzah",
    text: "Everyone gets a little wooden mezuzah to decorate! They use glitter, stickers, and paint to make them sparkly and special. Ariella covers hers in purple glitter, Jonah paints stars on his, and Noa adds tiny heart stickers. \"These are for your front doors at home!\" says the teacher.",
    characters: ["joselyn", "ariella", "jonah", "noa"],
    background: "art-room",
    next: "outdoor-play",
  },
  "outdoor-play": {
    id: "outdoor-play",
    text: "Playground time! Everyone runs outside into the sunshine. Ezra goes down the big slide — wheee! Levi and Jonah play on the swings, Shira and Noa dig in the sandbox, and Ariella plays tag with Micah. The teachers watch and clap and laugh. What a perfect day!",
    characters: ["ezra", "levi", "jonah", "shira", "noa", "ariella", "micah"],
    background: "playground",
    next: "shabbat-prep",
  },
  "shabbat-prep": {
    id: "shabbat-prep",
    text: "It's Friday — that means Shabbat! Everyone helps set the special Shabbat table. Talia places the candlesticks, Rafi puts out the challah cover, and Shira pours the grape juice into little cups. The teacher lights the candles, and everyone covers their eyes. \"Baruch Atah Adonai... l'hadlik ner shel Shabbat!\" Shabbat Shalom!",
    characters: ["elizabeth", "talia", "rafi", "shira"],
    background: "shabbat-table",
    next: "closing",
  },
  closing: {
    id: "closing",
    text: "What a wonderful day at Gan West! Now it's time to go home. The parents arrive one by one, and each kid gets a big hug from the morot. \"See you next week!\" everyone says. Levi waves, Ariella blows a kiss, and little Noa gives one last hug to Morah Sarah.",
    characters: ["sarah", "elizabeth", "virginia", "joselyn", "levi", "ariella", "noa"],
    background: "entrance",
    next: "end",
  },
  end: {
    id: "end",
    text: "Shabbat Shalom from Gan West! Thank you for spending the day with us. We can't wait to see you again!",
    characters: ["sarah", "elizabeth", "virginia", "joselyn", "levi", "ariella", "micah", "noa", "ezra", "talia", "jonah", "shira", "rafi"],
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
