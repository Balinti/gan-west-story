type BackgroundProps = {
  width?: number;
  height?: number;
};

function Classroom({ width = 800, height = 400 }: BackgroundProps) {
  return (
    <svg viewBox="0 0 800 400" width={width} height={height} className="scene-bg">
      {/* Wall */}
      <rect width={800} height={400} fill="#FFF8E7" />
      {/* Floor */}
      <rect y={280} width={800} height={120} fill="#DEB887" />
      <line x1={0} y1={280} x2={800} y2={280} stroke="#C4A56A" strokeWidth={2} />
      {/* Window */}
      <rect x={50} y={40} width={120} height={100} rx={8} fill="#87CEEB" stroke="#8B7355" strokeWidth={4} />
      <line x1={110} y1={40} x2={110} y2={140} stroke="#8B7355" strokeWidth={2} />
      <line x1={50} y1={90} x2={170} y2={90} stroke="#8B7355" strokeWidth={2} />
      {/* Sun in window */}
      <circle cx={90} cy={65} r={15} fill="#FFD700" />
      {/* Bulletin board */}
      <rect x={250} y={30} width={200} height={120} rx={4} fill="#CD853F" stroke="#8B7355" strokeWidth={3} />
      <rect x={260} y={40} width={50} height={40} rx={2} fill="#FF6B6B" />
      <rect x={320} y={45} width={50} height={35} rx={2} fill="#4ECDC4" />
      <rect x={380} y={38} width={55} height={45} rx={2} fill="#FFE66D" />
      <rect x={270} y={90} width={80} height={30} rx={2} fill="#A8E6CF" />
      <rect x={360} y={95} width={70} height={25} rx={2} fill="#FF8C94" />
      {/* Bookshelf */}
      <rect x={550} y={60} width={180} height={160} fill="#8B7355" stroke="#6B4226" strokeWidth={3} />
      <line x1={550} y1={120} x2={730} y2={120} stroke="#6B4226" strokeWidth={2} />
      <line x1={550} y1={160} x2={730} y2={160} stroke="#6B4226" strokeWidth={2} />
      <rect x={560} y={65} width={15} height={50} rx={2} fill="#E74C3C" />
      <rect x={580} y={70} width={12} height={45} rx={2} fill="#3498DB" />
      <rect x={597} y={68} width={14} height={47} rx={2} fill="#2ECC71" />
      <rect x={616} y={72} width={11} height={43} rx={2} fill="#F39C12" />
      {/* Small table */}
      <ellipse cx={400} cy={330} rx={120} ry={30} fill="#DEB887" stroke="#C4A56A" strokeWidth={2} />
      {/* Rug */}
      <ellipse cx={400} cy={350} rx={180} ry={35} fill="#E74C3C" opacity={0.3} />
      <ellipse cx={400} cy={350} rx={160} ry={28} fill="#3498DB" opacity={0.2} />
    </svg>
  );
}

function Entrance({ width = 800, height = 400 }: BackgroundProps) {
  return (
    <svg viewBox="0 0 800 400" width={width} height={height} className="scene-bg">
      {/* Exterior wall */}
      <rect width={800} height={400} fill="#F0E6D3" />
      {/* Sky */}
      <rect width={800} height={180} fill="#87CEEB" />
      {/* Clouds */}
      <ellipse cx={150} cy={60} rx={50} ry={25} fill="#FFF" opacity={0.8} />
      <ellipse cx={190} cy={50} rx={35} ry={20} fill="#FFF" opacity={0.8} />
      <ellipse cx={600} cy={80} rx={45} ry={22} fill="#FFF" opacity={0.8} />
      {/* Building */}
      <rect x={100} y={100} width={600} height={300} fill="#FFF8DC" stroke="#C4A56A" strokeWidth={3} />
      {/* Door */}
      <rect x={330} y={180} width={140} height={220} rx={70} fill="#4A90D9" stroke="#2C3E50" strokeWidth={4} />
      <circle cx={440} cy={300} r={8} fill="#FFD700" />
      {/* Sign */}
      <rect x={280} y={110} width={240} height={55} rx={10} fill="#4A90D9" />
      <text x={400} y={145} textAnchor="middle" fill="#FFF" fontSize={24} fontFamily="Georgia, serif" fontWeight="bold">
        Gan West
      </text>
      {/* Windows */}
      <rect x={150} y={200} width={80} height={60} rx={6} fill="#87CEEB" stroke="#8B7355" strokeWidth={3} />
      <line x1={190} y1={200} x2={190} y2={260} stroke="#8B7355" strokeWidth={2} />
      <rect x={570} y={200} width={80} height={60} rx={6} fill="#87CEEB" stroke="#8B7355" strokeWidth={3} />
      <line x1={610} y1={200} x2={610} y2={260} stroke="#8B7355" strokeWidth={2} />
      {/* Path */}
      <path d="M 350 400 L 330 400 Q 380 350 400 320 Q 420 350 470 400 L 450 400 Z" fill="#D4C5A9" />
      {/* Flowers */}
      <circle cx={140} cy={370} r={6} fill="#FF69B4" />
      <circle cx={160} cy={375} r={5} fill="#FFD700" />
      <circle cx={650} cy={368} r={6} fill="#FF6B6B" />
      <circle cx={670} cy={374} r={5} fill="#9B59B6" />
    </svg>
  );
}

function CircleRug({ width = 800, height = 400 }: BackgroundProps) {
  return (
    <svg viewBox="0 0 800 400" width={width} height={height} className="scene-bg">
      <rect width={800} height={400} fill="#FFF8E7" />
      <rect y={250} width={800} height={150} fill="#DEB887" />
      {/* Big colorful rug */}
      <ellipse cx={400} cy={320} rx={280} ry={70} fill="#E74C3C" />
      <ellipse cx={400} cy={320} rx={240} ry={58} fill="#F39C12" />
      <ellipse cx={400} cy={320} rx={200} ry={48} fill="#2ECC71" />
      <ellipse cx={400} cy={320} rx={160} ry={38} fill="#3498DB" />
      <ellipse cx={400} cy={320} rx={120} ry={28} fill="#9B59B6" />
      {/* Guitar on wall */}
      <ellipse cx={680} cy={120} rx={20} ry={28} fill="#DEB887" stroke="#8B7355" strokeWidth={2} />
      <rect x={676} y={60} width={8} height={60} fill="#8B7355" />
      <line x1={677} y1={100} x2={677} y2={148} stroke="#333" strokeWidth={0.5} />
      <line x1={680} y1={100} x2={680} y2={148} stroke="#333" strokeWidth={0.5} />
      <line x1={683} y1={100} x2={683} y2={148} stroke="#333" strokeWidth={0.5} />
      {/* Hebrew alphabet poster */}
      <rect x={80} y={30} width={160} height={100} rx={5} fill="#FFF" stroke="#4A90D9" strokeWidth={3} />
      <text x={160} y={60} textAnchor="middle" fill="#E74C3C" fontSize={18} fontFamily="serif">אבגדה</text>
      <text x={160} y={90} textAnchor="middle" fill="#4A90D9" fontSize={18} fontFamily="serif">וזחטי</text>
      <text x={160} y={115} textAnchor="middle" fill="#2ECC71" fontSize={18} fontFamily="serif">כלמנס</text>
    </svg>
  );
}

function Playground({ width = 800, height = 400 }: BackgroundProps) {
  return (
    <svg viewBox="0 0 800 400" width={width} height={height} className="scene-bg">
      {/* Sky */}
      <rect width={800} height={250} fill="#87CEEB" />
      {/* Sun */}
      <circle cx={700} cy={60} r={40} fill="#FFD700" />
      {/* Grass */}
      <rect y={250} width={800} height={150} fill="#7BC67E" />
      {/* Slide */}
      <rect x={100} y={120} width={8} height={160} fill="#E74C3C" />
      <rect x={200} y={120} width={8} height={160} fill="#E74C3C" />
      <rect x={95} y={115} width={120} height={10} rx={3} fill="#E74C3C" />
      <path d="M 210 125 Q 260 125 290 280" stroke="#FFD700" strokeWidth={8} fill="none" strokeLinecap="round" />
      {/* Platform */}
      <rect x={95} y={125} width={120} height={5} fill="#CD853F" />
      {/* Ladder */}
      <line x1={115} y1={130} x2={115} y2={280} stroke="#8B7355" strokeWidth={4} />
      <line x1={140} y1={130} x2={140} y2={280} stroke="#8B7355" strokeWidth={4} />
      <line x1={115} y1={160} x2={140} y2={160} stroke="#8B7355" strokeWidth={3} />
      <line x1={115} y1={190} x2={140} y2={190} stroke="#8B7355" strokeWidth={3} />
      <line x1={115} y1={220} x2={140} y2={220} stroke="#8B7355" strokeWidth={3} />
      <line x1={115} y1={250} x2={140} y2={250} stroke="#8B7355" strokeWidth={3} />
      {/* Swings */}
      <rect x={420} y={100} width={200} height={8} fill="#8B7355" />
      <rect x={420} y={100} width={8} height={180} fill="#8B7355" />
      <rect x={612} y={100} width={8} height={180} fill="#8B7355" />
      <line x1={470} y1={108} x2={460} y2={240} stroke="#333" strokeWidth={2} />
      <line x1={510} y1={108} x2={500} y2={240} stroke="#333" strokeWidth={2} />
      <rect x={455} y={238} width={50} height={6} rx={3} fill="#E74C3C" />
      <line x1={560} y1={108} x2={555} y2={235} stroke="#333" strokeWidth={2} />
      <line x1={600} y1={108} x2={595} y2={235} stroke="#333" strokeWidth={2} />
      <rect x={550} y={233} width={50} height={6} rx={3} fill="#3498DB" />
      {/* Sandbox */}
      <rect x={350} y={310} width={120} height={50} rx={8} fill="#F4D03F" stroke="#DAA520" strokeWidth={3} />
      {/* Flowers */}
      <circle cx={50} cy={280} r={5} fill="#FF69B4" />
      <line x1={50} y1={285} x2={50} y2={300} stroke="#2ECC71" strokeWidth={2} />
      <circle cx={750} cy={275} r={5} fill="#E74C3C" />
      <line x1={750} y1={280} x2={750} y2={295} stroke="#2ECC71" strokeWidth={2} />
    </svg>
  );
}

function Playroom({ width = 800, height = 400 }: BackgroundProps) {
  return (
    <svg viewBox="0 0 800 400" width={width} height={height} className="scene-bg">
      <rect width={800} height={400} fill="#FFF8E7" />
      <rect y={280} width={800} height={120} fill="#DEB887" />
      {/* Block tower */}
      <rect x={100} y={220} width={40} height={30} fill="#E74C3C" />
      <rect x={105} y={190} width={30} height={30} fill="#3498DB" />
      <rect x={110} y={165} width={25} height={25} fill="#2ECC71" />
      <rect x={113} y={145} width={20} height={20} fill="#F39C12" />
      {/* Toy kitchen */}
      <rect x={550} y={160} width={150} height={120} rx={5} fill="#FF8C94" stroke="#C0392B" strokeWidth={2} />
      <circle cx={590} cy={200} r={12} fill="#333" stroke="#555" strokeWidth={2} />
      <circle cx={640} cy={200} r={12} fill="#333" stroke="#555" strokeWidth={2} />
      <rect x={560} y={240} width={60} height={30} rx={3} fill="#C0392B" />
      {/* Art easel */}
      <rect x={350} y={130} width={80} height={100} fill="#FFF" stroke="#8B7355" strokeWidth={3} />
      <circle cx={370} cy={160} r={8} fill="#FF6B6B" />
      <rect x={385} y={170} width={20} height={15} fill="#4ECDC4" />
      <path d="M 395 155 L 410 180 L 380 180 Z" fill="#FFE66D" />
      {/* Toy shelf */}
      <rect x={30} y={80} width={120} height={140} fill="#8B7355" stroke="#6B4226" strokeWidth={2} />
      <line x1={30} y1={120} x2={150} y2={120} stroke="#6B4226" strokeWidth={2} />
      <line x1={30} y1={160} x2={150} y2={160} stroke="#6B4226" strokeWidth={2} />
      <circle cx={60} cy={100} r={10} fill="#FF69B4" />
      <rect x={90} y={90} width={20} height={20} fill="#3498DB" />
      <circle cx={70} cy={140} r={8} fill="#F39C12" />
    </svg>
  );
}

function ArtRoom({ width = 800, height = 400 }: BackgroundProps) {
  return (
    <svg viewBox="0 0 800 400" width={width} height={height} className="scene-bg">
      <rect width={800} height={400} fill="#FFF5EE" />
      <rect y={280} width={800} height={120} fill="#DEB887" />
      {/* Art table */}
      <rect x={150} y={250} width={500} height={10} rx={3} fill="#CD853F" />
      <rect x={180} y={260} width={8} height={60} fill="#8B7355" />
      <rect x={612} y={260} width={8} height={60} fill="#8B7355" />
      {/* Paint jars on table */}
      <rect x={200} y={230} width={20} height={25} rx={3} fill="#E74C3C" />
      <rect x={230} y={232} width={20} height={23} rx={3} fill="#3498DB" />
      <rect x={260} y={228} width={20} height={27} rx={3} fill="#2ECC71" />
      <rect x={290} y={231} width={20} height={24} rx={3} fill="#F39C12" />
      <rect x={320} y={229} width={20} height={26} rx={3} fill="#9B59B6" />
      {/* Easels */}
      <rect x={500} y={100} width={70} height={90} fill="#FFF" stroke="#8B7355" strokeWidth={3} />
      <rect x={600} y={110} width={70} height={80} fill="#FFF" stroke="#8B7355" strokeWidth={3} />
      {/* Paintings on wall */}
      <rect x={50} y={40} width={80} height={60} rx={3} fill="#FFE66D" stroke="#DAA520" strokeWidth={2} />
      <circle cx={90} cy={60} r={15} fill="#FF6B6B" />
      <rect x={180} y={50} width={70} height={55} rx={3} fill="#A8E6CF" stroke="#2ECC71" strokeWidth={2} />
      <rect x={700} y={45} width={75} height={60} rx={3} fill="#C4E1FF" stroke="#4A90D9" strokeWidth={2} />
      {/* Glitter/sticker supplies */}
      <circle cx={420} cy={240} r={8} fill="#FFD700" opacity={0.6} />
      <circle cx={450} cy={238} r={6} fill="#FF69B4" opacity={0.6} />
      <circle cx={480} cy={242} r={7} fill="#87CEEB" opacity={0.6} />
    </svg>
  );
}

function SnackTable({ width = 800, height = 400 }: BackgroundProps) {
  return (
    <svg viewBox="0 0 800 400" width={width} height={height} className="scene-bg">
      <rect width={800} height={400} fill="#FFF8E7" />
      <rect y={280} width={800} height={120} fill="#DEB887" />
      {/* Table */}
      <ellipse cx={400} cy={260} rx={250} ry={40} fill="#CD853F" stroke="#8B7355" strokeWidth={3} />
      {/* Plates */}
      <ellipse cx={280} cy={250} rx={25} ry={8} fill="#FFF" stroke="#DDD" strokeWidth={1} />
      <ellipse cx={360} cy={245} rx={25} ry={8} fill="#FFF" stroke="#DDD" strokeWidth={1} />
      <ellipse cx={440} cy={245} rx={25} ry={8} fill="#FFF" stroke="#DDD" strokeWidth={1} />
      <ellipse cx={520} cy={250} rx={25} ry={8} fill="#FFF" stroke="#DDD" strokeWidth={1} />
      {/* Apple slices on plates */}
      <path d="M 270 248 Q 280 240 290 248" fill="#E74C3C" />
      <path d="M 350 243 Q 360 235 370 243" fill="#E74C3C" />
      <path d="M 430 243 Q 440 235 450 243" fill="#2ECC71" />
      <path d="M 510 248 Q 520 240 530 248" fill="#E74C3C" />
      {/* Cups */}
      <rect x={310} y={225} width={14} height={20} rx={2} fill="#4A90D9" />
      <rect x={470} y={225} width={14} height={20} rx={2} fill="#E74C3C" />
      {/* Window */}
      <rect x={600} y={40} width={120} height={90} rx={6} fill="#87CEEB" stroke="#8B7355" strokeWidth={3} />
      <line x1={660} y1={40} x2={660} y2={130} stroke="#8B7355" strokeWidth={2} />
      {/* Small chairs (implied) */}
      <rect x={260} y={290} width={30} height={25} rx={5} fill="#E74C3C" opacity={0.6} />
      <rect x={380} y={288} width={30} height={25} rx={5} fill="#3498DB" opacity={0.6} />
      <rect x={500} y={290} width={30} height={25} rx={5} fill="#2ECC71" opacity={0.6} />
    </svg>
  );
}

function Office({ width = 800, height = 400 }: BackgroundProps) {
  return (
    <svg viewBox="0 0 800 400" width={width} height={height} className="scene-bg">
      <rect width={800} height={400} fill="#FFF8E7" />
      <rect y={290} width={800} height={110} fill="#DEB887" />
      {/* Desk */}
      <rect x={200} y={220} width={400} height={15} rx={3} fill="#8B7355" />
      <rect x={220} y={235} width={10} height={70} fill="#6B4226" />
      <rect x={570} y={235} width={10} height={70} fill="#6B4226" />
      {/* Computer */}
      <rect x={340} y={160} width={120} height={60} rx={5} fill="#333" />
      <rect x={345} y={165} width={110} height={50} rx={3} fill="#87CEEB" />
      <rect x={385} y={220} width={30} height={5} fill="#333" />
      {/* Books on desk */}
      <rect x={240} y={200} width={40} height={20} rx={2} fill="#E74C3C" />
      <rect x={245} y={192} width={35} height={20} rx={2} fill="#3498DB" />
      {/* Bookshelf behind */}
      <rect x={50} y={60} width={120} height={160} fill="#8B7355" stroke="#6B4226" strokeWidth={2} />
      <line x1={50} y1={110} x2={170} y2={110} stroke="#6B4226" strokeWidth={2} />
      <line x1={50} y1={160} x2={170} y2={160} stroke="#6B4226" strokeWidth={2} />
      <rect x={60} y={65} width={12} height={40} rx={1} fill="#E74C3C" />
      <rect x={77} y={70} width={10} height={35} rx={1} fill="#2ECC71" />
      <rect x={92} y={67} width={14} height={38} rx={1} fill="#FFD700" />
      {/* Photo frames */}
      <rect x={650} y={80} width={60} height={50} rx={3} fill="#FFF" stroke="#DAA520" strokeWidth={2} />
      <rect x={630} y={150} width={50} height={40} rx={3} fill="#FFF" stroke="#DAA520" strokeWidth={2} />
    </svg>
  );
}

function ShabbatTable({ width = 800, height = 400 }: BackgroundProps) {
  return (
    <svg viewBox="0 0 800 400" width={width} height={height} className="scene-bg">
      <rect width={800} height={400} fill="#FFF8E7" />
      <rect y={280} width={800} height={120} fill="#DEB887" />
      {/* Table with white cloth */}
      <rect x={100} y={230} width={600} height={15} rx={4} fill="#FFF" stroke="#E0E0E0" strokeWidth={2} />
      <rect x={95} y={245} width={610} height={8} fill="#FFF" stroke="#E0E0E0" strokeWidth={1} />
      {/* Table legs */}
      <rect x={130} y={253} width={8} height={50} fill="#8B7355" />
      <rect x={662} y={253} width={8} height={50} fill="#8B7355" />
      {/* Candlesticks */}
      <rect x={300} y={195} width={8} height={35} rx={2} fill="#C0C0C0" />
      <rect x={296} y={225} width={16} height={5} rx={2} fill="#C0C0C0" />
      <ellipse cx={304} cy={193} rx={5} ry={7} fill="#FFD700" opacity={0.8} />
      <ellipse cx={304} cy={188} rx={3} ry={5} fill="#FF6B00" opacity={0.7} />
      <rect x={490} y={195} width={8} height={35} rx={2} fill="#C0C0C0" />
      <rect x={486} y={225} width={16} height={5} rx={2} fill="#C0C0C0" />
      <ellipse cx={494} cy={193} rx={5} ry={7} fill="#FFD700" opacity={0.8} />
      <ellipse cx={494} cy={188} rx={3} ry={5} fill="#FF6B00" opacity={0.7} />
      {/* Challah */}
      <ellipse cx={400} cy={222} rx={40} ry={12} fill="#DAA520" />
      <path d="M 365 222 Q 380 214 395 222 Q 410 214 420 222" fill="none" stroke="#C8960C" strokeWidth={2} />
      {/* Challah cover */}
      <rect x={370} y={225} width={60} height={5} rx={2} fill="#FFF" />
      <text x={400} y={229} textAnchor="middle" fill="#4A90D9" fontSize={3} fontFamily="serif">שבת</text>
      {/* Grape juice */}
      <rect x={250} y={210} width={12} height={18} rx={2} fill="#4A0082" opacity={0.7} />
      <rect x={540} y={210} width={12} height={18} rx={2} fill="#4A0082" opacity={0.7} />
      {/* Kiddush cup */}
      <rect x={440} y={205} width={14} height={22} rx={3} fill="#C0C0C0" stroke="#A0A0A0" strokeWidth={1} />
      <rect x={443} y={227} width={8} height={3} fill="#C0C0C0" />
      <rect x={440} y={230} width={14} height={2} rx={1} fill="#C0C0C0" />
      {/* Stars decoration on wall */}
      <polygon points="200,60 206,78 225,78 210,88 215,106 200,96 185,106 190,88 175,78 194,78" fill="#FFD700" opacity={0.3} />
      <polygon points="600,50 605,63 620,63 608,71 612,84 600,76 588,84 592,71 580,63 595,63" fill="#FFD700" opacity={0.3} />
    </svg>
  );
}

export const backgroundComponents: Record<string, React.FC<BackgroundProps>> = {
  classroom: Classroom,
  entrance: Entrance,
  "circle-rug": CircleRug,
  playground: Playground,
  playroom: Playroom,
  "art-room": ArtRoom,
  "snack-table": SnackTable,
  office: Office,
  "shabbat-table": ShabbatTable,
};
