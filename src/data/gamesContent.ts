export interface GameDetailContent {
  id: string;
  title: string;
  tagline: string;
  category: 'arcade' | 'puzzle' | 'casual' | 'words';
  categoryName: string;
  path: string;
  isNative?: boolean;
  color: string;
  icon: string;
  rating: string;
  votes: string;
  plays: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  avgTime: string;
  releaseDate: string;
  metaDescription: string;
  searchedKeywords: string[];
  overview: string[];
  controls: {
    desktop: string[];
    mobile: string[];
  };
  howToPlay: string[];
  rulesAndScoring: string[];
  proStrategies: string[];
  keyFeatures: string[];
  systemRequirements: {
    browser: string;
    ram: string;
    storage: string;
    network: string;
    platforms: string;
  };
  faqs: {
    q: string;
    a: string;
  }[];
}

export const GAMES_DETAILED_DATA: Record<string, GameDetailContent> = {
  "bubble-mania": {
    id: "bubble-mania",
    title: "Bubble Pop Mania",
    tagline: "The Ultimate Free Online Bubble Shooter Puzzle Arcade Game",
    category: "casual",
    categoryName: "Casual & Reflex",
    path: "#bubble-mania",
    isNative: true,
    color: "from-indigo-500 to-purple-800",
    icon: "🫧",
    rating: "4.9 / 5.0",
    votes: "4,820",
    plays: "520k+",
    difficulty: "Easy",
    avgTime: "3-5 mins",
    releaseDate: "2026",
    metaDescription: "Play Bubble Pop Mania free online with no download or signup. Aim your bubble cannon, match 3 colors, pop chains, and clear levels in this instant browser bubble shooter.",
    searchedKeywords: [
      "bubble shooter online free",
      "play bubble pop mania no download",
      "bubble shooter unblocked games",
      "free match 3 bubble game for chromebook",
      "instant bubble puzzle browser game"
    ],
    overview: [
      "Bubble Pop Mania is a modern, high-performance HTML5 adaptation of the beloved classic bubble shooter arcade genre. Designed for instant web play without downloads, installations, or app store delays, this game challenges your geometric calculation, color recognition, and quick-reflex timing.",
      "Players control a precision bubble launcher positioned at the bottom of the board, aiming upward to form clusters of three or more identical colored bubbles. Watch the chain reactions erupt in satisfying visual bursts with custom spatial audio sound effects. With cascading ceilings that descend after missed shots, every angle and bank shot off the sidewalls counts toward your survival."
    ],
    controls: {
      desktop: [
        "Mouse Cursor / Trackpad: Move to aim the bubble trajectory guide line.",
        "Left Mouse Click: Launch bubble along the projected path.",
        "Spacebar / Right Click: Swap current launcher bubble with the next queued bubble."
      ],
      mobile: [
        "Touch & Drag: Slide finger across touchscreen to position the laser aiming sight.",
        "Release Finger: Fire bubble instantly toward the target coordinate.",
        "Tap Bubble Queue: Tap the ammo preview sphere to switch upcoming colors."
      ]
    },
    howToPlay: [
      "Observe the color of the bubble loaded inside your bottom cannon.",
      "Inspect the bubble cluster formation on the ceiling to locate groups of 2 or more identical colors.",
      "Align your trajectory sightline directly at the target cluster or bounce the shot off the left/right arena borders.",
      "Release your shot to trigger an explosive match-3 pop. Drop floating disconnected bubbles to earn massive avalanche bonuses!",
      "Clear all bubbles before the descending ceiling crosses the bottom danger threshold."
    ],
    rulesAndScoring: [
      "Match-3 Rule: Connecting 3 or more bubbles of identical hue instantly bursts them from the playing field.",
      "Avalanche Drop Multiplier: Any bubbles anchored solely to popped clusters lose their connection and fall, granting 500 bonus points per dropped bubble.",
      "Foul Counter: Missing a match increments the foul meter. After 5 fouls, a new row of bubbles descends from the ceiling.",
      "Wall Bank Shots: Bouncing shots off the left and right borders awards a 1.5x Trick Shot combo modifier."
    ],
    proStrategies: [
      "Master Bank Angles: The shortest direct path is rarely the most efficient. Bounce shots off the sidewalls to squeeze behind frontline obstacles and detonate ceiling clusters.",
      "Target Structural Roots: Instead of picking off isolated bottom bubbles, search for the narrow 'necks' supporting large hanging clusters. Severing the root causes the entire structure to fall at once.",
      "Plan Your Color Queue: Always check the secondary queued bubble before firing. If the active color has no clean match, use it to set up an upcoming shot or swap ammo.",
      "Keep the Sidewalls Clear: Jamming the outer columns prevents you from making precision bank shots later in the round."
    ],
    keyFeatures: [
      "Zero Downloads & No Signup: Play directly in any modern web browser.",
      "60 FPS Native Canvas Physics: Ultra-responsive trajectory tracking with smooth bounce mechanics.",
      "Cross-Platform Compatibility: Seamlessly responsive on iOS, Android, Chromebook, PC, and Mac.",
      "Local High-Score Persistence: Automatically caches personal bests and level progress."
    ],
    systemRequirements: {
      browser: "Chrome, Safari, Edge, Firefox, or Opera (Latest 2 versions)",
      ram: "Less than 40 MB",
      storage: "0 MB (Runs in browser cache)",
      network: "Lightweight HTTPS (< 500 KB asset transfer)",
      platforms: "Windows, macOS, ChromeOS, iOS, Android, Linux"
    },
    faqs: [
      {
        q: "Is Bubble Pop Mania completely free to play without in-game purchases?",
        a: "Yes! There are zero paywalls, no coin microtransactions, and no energy timers. You can play unlimited levels for free."
      },
      {
        q: "Can I play Bubble Pop Mania unblocked at school or on work Chromebooks?",
        a: "Yes. Because Bubble Pop Mania runs entirely in the client's browser over clean HTTPS without executable files or plugins, it is unblocked and compatible with school Chromebooks."
      },
      {
        q: "Does Bubble Pop Mania work on smartphones without installing an app?",
        a: "Absolutely. The game features full touch gesture controls, automatic viewport scaling, and runs directly in Safari, Chrome, and mobile browsers."
      },
      {
        q: "How do I swap bubbles in the launcher?",
        a: "On desktop, press the Spacebar or right-click. On touchscreen mobile devices, tap directly on the bubble indicator beside your launcher."
      }
    ]
  },

  "chess-ai": {
    id: "chess-ai",
    title: "Chess AI Master",
    tagline: "Play Free Online Chess Against Computer AI Bots - No Download",
    category: "puzzle",
    categoryName: "Brain & Strategy",
    path: "/games/chess-ai/index.html",
    color: "from-slate-600 to-slate-800",
    icon: "♟️",
    rating: "4.9 / 5.0",
    votes: "3,150",
    plays: "210k+",
    difficulty: "Challenging",
    avgTime: "10-25 mins",
    releaseDate: "2026",
    metaDescription: "Play Chess AI Master free online against computer bots. No download or signup required. Practice chess openings, calculate endgame tactics, and master your strategy in browser.",
    searchedKeywords: [
      "play chess against computer free online",
      "free online chess ai no download",
      "chess bot game browser unblocked",
      "play chess against computer easy medium hard",
      "single player chess game html5"
    ],
    overview: [
      "Chess AI Master brings the timeless game of kings into your browser with zero latency. Powered by an on-device minimax chess calculation engine with alpha-beta pruning, this game allows you to sharpen your analytical depth, opening theory, and endgame execution without registration or software downloads.",
      "Whether you are a newcomer learning piece values and fundamental pawn structures or an experienced player refining the Sicilian Defense or Queen's Gambit, Chess AI Master offers an intelligent, responsive digital sparring partner accessible 24/7 on any device."
    ],
    controls: {
      desktop: [
        "Left Mouse Click: Click any piece to illuminate valid legal move squares.",
        "Click Target Square: Move selected piece to highlighted destination.",
        "Drag and Drop: Click, hold, and drag pieces across the 64-square chessboard."
      ],
      mobile: [
        "Tap to Select: Touch your piece to display legal movement rings.",
        "Tap to Move: Tap the destination tile to execute your move instantly."
      ]
    },
    howToPlay: [
      "Select your preferred side (White moves first; Black responds).",
      "Control the central squares (d4, d5, e4, e5) during the opening phase using pawns and minor pieces.",
      "Develop your Knights and Bishops off their starting ranks before launching attacks.",
      "Castle your King to safeguard your monarch and connect your Rooks.",
      "Calculate piece trades, anticipate the AI's counter-tactics, and deliver checkmate to the opposing King."
    ],
    rulesAndScoring: [
      "Standard FIDE Chess Rules: Complies with official international rules including En Passant, Castling, and Pawn Promotion (Queen, Rook, Bishop, Knight).",
      "Check & Checkmate: The game ends in victory when the opposing King is placed under attack (check) with no legal escape moves available.",
      "Draw Conditions: Stalemate (no legal moves while not in check), Threefold Repetition, and Insufficient Mating Material trigger an automatic draw."
    ],
    proStrategies: [
      "Prioritize Central Domination: Placing pawns on e4/d4 establishes territory and restricts the computer AI's knight mobility.",
      "Knights Before Bishops: Knights need central outposts early; bishops maintain long-range influence from flank diagonals.",
      "Don't Move the Same Piece Twice: In the opening phase, develop all pieces before spending tempos repositioning active units.",
      "Watch for Outposts & Pins: Look for pinned enemy pieces to apply pressure with pawns."
    ],
    keyFeatures: [
      "Instant In-Browser Minimax AI: Evaluates positional balance without external server lag.",
      "Move Validation & Visual Assist: Highlights all legal destination squares and capture possibilities.",
      "Undo Move & Board Reset: Practice alternative variations with instant tactical takebacks.",
      "Chromebook & Low-End PC Friendly: Minimal CPU utilization ensures quiet laptop fans and 60 FPS rendering."
    ],
    systemRequirements: {
      browser: "Chrome, Safari, Edge, Firefox (Evergreen versions)",
      ram: "Less than 30 MB",
      storage: "0 MB",
      network: "HTTPS Client-side execution",
      platforms: "Windows, macOS, ChromeOS, iOS, Android, Linux"
    },
    faqs: [
      {
        q: "Can I play chess against this AI offline without internet connection?",
        a: "Yes! Once loaded into your browser cache, the chess engine runs 100% locally on your machine."
      },
      {
        q: "Does Chess AI Master support castling and en passant?",
        a: "Yes, full international FIDE tournament rules including both kingside/queenside castling and en passant pawn captures are supported."
      },
      {
        q: "Can I play as Black or White?",
        a: "Yes, you can toggle board orientation and side selection directly from the game controls."
      }
    ]
  },

  "neon-snake": {
    id: "neon-snake",
    title: "Neon Snake Retro",
    tagline: "Modern Glow Aesthetic Nokia Classic Snake Arcade Game",
    category: "arcade",
    categoryName: "Retro & Arcade",
    path: "/games/neon-snake/index.html",
    color: "from-lime-400 to-green-500",
    icon: "🐍",
    rating: "4.8 / 5.0",
    votes: "2,980",
    plays: "112k+",
    difficulty: "Medium",
    avgTime: "3-8 mins",
    releaseDate: "2026",
    metaDescription: "Play Neon Snake Retro free online with no download. The classic vintage Nokia snake game rebuilt with glowing neon synthwave graphics and smooth responsive controls.",
    searchedKeywords: [
      "neon snake game online free",
      "classic snake game no download",
      "retro nokia snake unblocked",
      "google snake game alternative",
      "free arcade snake browser game"
    ],
    overview: [
      "Neon Snake Retro revitalizes the legendary 1990s Nokia mobile arcade sensation with striking neon graphics, smooth 60 FPS interpolation, and instantaneous keyboard/touch controls. Guide your luminous cyber serpent through a grid arena, consuming energy pellets to increase in length and multiplier score.",
      "As your snake grows longer with every consumed orb, the available maneuvering area contracts. Every turn requires foresight, spatial calculation, and razor-sharp reflexes to avoid colliding with perimeter boundaries or your own luminous body."
    ],
    controls: {
      desktop: [
        "Arrow Keys (Up, Down, Left, Right): Direct snake heading.",
        "W, A, S, D Keys: Alternative classic PC directional movement.",
        "P Key / Spacebar: Pause and resume current round."
      ],
      mobile: [
        "Touch Swipe: Swipe in any of the 4 cardinal directions to change trajectory.",
        "Virtual D-Pad: Tap the on-screen responsive direction buttons."
      ]
    },
    howToPlay: [
      "Start the game by pressing any directional key.",
      "Steer the neon snake toward glowing energy food pellets.",
      "Each consumed pellet increases your length by one segment and raises your score.",
      "Prevent your snake's head from crashing into arena walls or your own trailing tail.",
      "Survive as long as possible to set world-class high score records."
    ],
    rulesAndScoring: [
      "Base Score: 10 points per standard energy pellet.",
      "Velocity Scaling: The snake's speed incrementally increases every 5 pellets consumed.",
      "Collision Penalties: Hitting any obstacle or your own tail results in an immediate Game Over."
    ],
    proStrategies: [
      "The Perimeter S-Pattern: When your snake reaches 25+ segments, avoid traversing the open center. Travel along outer edges and fold into an S-curve to maximize grid space.",
      "Leave a Two-Block Escape Hatch: Never coil tightly into a single-block dead end. Always preserve a double-width path to escape safely.",
      "Don't Rush the Next Pellet: High scores are won through patience. Take a safe detour around your tail rather than making a high-risk dash."
    ],
    keyFeatures: [
      "Vibrant Synthwave Glow Theme: Clean contrast and retro aesthetic.",
      "Zero Input Lag: Direct event binding ensures your commands register with sub-millisecond latency.",
      "High Score Tracker: Preserves your personal records in local storage.",
      "Unblocked for School & Work: Runs on any browser with zero installation."
    ],
    systemRequirements: {
      browser: "Any modern web browser with HTML5 Canvas",
      ram: "Less than 20 MB",
      storage: "0 MB",
      network: "Instant cached load",
      platforms: "PC, Mac, Chromebook, Android, iOS"
    },
    faqs: [
      {
        q: "Can I play Neon Snake on a school Chromebook?",
        a: "Yes! Neon Snake uses under 20MB of RAM and does not trigger filter restrictions because it is a lightweight client-side HTML5 game."
      },
      {
        q: "What happens when the snake fills the entire screen?",
        a: "If you manage the legendary feat of filling every grid cell, you achieve the theoretical maximum score!"
      }
    ]
  },

  "minesweeper": {
    id: "minesweeper",
    title: "Minesweeper Classic",
    tagline: "Pure Logic Deduction & Mine Detection Puzzle Game",
    category: "puzzle",
    categoryName: "Brain & Strategy",
    path: "/games/minesweeper/index.html",
    color: "from-gray-500 to-gray-700",
    icon: "💣",
    rating: "4.8 / 5.0",
    votes: "1,940",
    plays: "78k+",
    difficulty: "Medium",
    avgTime: "5-10 mins",
    releaseDate: "2026",
    metaDescription: "Play Minesweeper Classic free online without download or signup. Uncover tiles, read logic numbers, and flag hidden explosive mines with zero guesswork.",
    searchedKeywords: [
      "minesweeper online free no download",
      "classic windows minesweeper browser",
      "how to play minesweeper 1 2 1 strategy",
      "minesweeper unblocked for school",
      "google minesweeper online alternative"
    ],
    overview: [
      "Minesweeper Classic faithfully recreates the iconic Windows logic puzzle that entertained millions worldwide. Your mission is simple yet intellectually demanding: uncover every safe square on a concealed minefield without detonating a single subterranean explosive.",
      "Every revealed tile reveals a number indicating exactly how many mines are hiding in the adjacent 8 neighboring squares. Through rigorous deductive reasoning, pattern recognition, and careful flag placement, you can methodically conquer the board."
    ],
    controls: {
      desktop: [
        "Left Mouse Click: Dig / uncover a covered tile.",
        "Right Mouse Click: Plant or remove a danger flag on a suspected mine.",
        "Both Mouse Clicks (Chording): Click a revealed number touching correct flags to instantly reveal all remaining adjacent tiles."
      ],
      mobile: [
        "Single Tap: Uncover tile / explore square.",
        "Long Press (0.3s): Toggle mine flag marker.",
        "Flag Mode Button: Tap the bottom flag toggle to switch between digging and flagging."
      ]
    },
    howToPlay: [
      "Click any random tile to begin. The first click is guaranteed to be safe and will open an initial cluster.",
      "Examine revealed numbers: a '1' means exactly one of its eight neighboring tiles contains a mine.",
      "If a '1' only has one unopened tile touching it, that unopened tile must be a mine. Flag it!",
      "Continue deducing safe tiles until all non-mine squares are revealed."
    ],
    rulesAndScoring: [
      "Win Condition: Reveal 100% of all safe squares across the minefield.",
      "Lose Condition: Clicking any unflagged mine causes an explosion and ends the round.",
      "Timer: Tracks total clearing seconds to measure speedrun performance."
    ],
    proStrategies: [
      "The 1-2-1 Flat Wall Pattern: When numbers read 1-2-1 along an unopened wall, the mines are located under the two 1s, and the tile under the 2 is safe.",
      "The 1-2-2-1 Pattern: In this configuration, mines are located under the two 2s.",
      "Look for Corners First: Numbers located on outside corners have fewer neighboring tiles, making deductions easier."
    ],
    keyFeatures: [
      "Guaranteed Safe First Click: Never lose on your initial move.",
      "Chording Support: Double-click or middle-click numbered tiles to speed up clearing.",
      "Clean Retro Theme: Easy on the eyes with crisp numerical legibility.",
      "Zero Downloads: Instant play across all devices."
    ],
    systemRequirements: {
      browser: "Any modern browser",
      ram: "Less than 25 MB",
      storage: "0 MB",
      network: "HTTPS Client-side",
      platforms: "PC, Mac, Chromebook, Android, iOS"
    },
    faqs: [
      {
        q: "Is Minesweeper entirely based on logic, or is guessing required?",
        a: "Over 95% of standard boards can be solved purely through deductive logic without guessing."
      },
      {
        q: "How do I flag a mine on a mobile phone without a mouse?",
        a: "Simply long-press on any unopened tile, or tap the on-screen Flag Mode toggle icon."
      }
    ]
  },

  "sudoku-master": {
    id: "sudoku-master",
    title: "Sudoku Master",
    tagline: "Daily Brain-Training Number Placement Logic Puzzle",
    category: "puzzle",
    categoryName: "Brain & Strategy",
    path: "/games/sudoku-master/index.html",
    color: "from-sky-400 to-blue-600",
    icon: "📝",
    rating: "4.9 / 5.0",
    votes: "1,870",
    plays: "40k+",
    difficulty: "Challenging",
    avgTime: "10-15 mins",
    releaseDate: "2026",
    metaDescription: "Play Sudoku Master free online with no download. Sharpen your logic with daily 9x9 grids, candidate notes, error detection, and multiple difficulty levels.",
    searchedKeywords: [
      "sudoku online free no download",
      "play sudoku master browser game",
      "daily sudoku puzzle for chromebook",
      "sudoku techniques naked singles tutorial",
      "free brain puzzle games without download"
    ],
    overview: [
      "Sudoku Master is a sophisticated number-placement puzzle designed to stimulate neuroplasticity, enhance logical reasoning, and provide a calming mental workout. Each 9x9 grid is divided into nine 3x3 subgrids, pre-populated with clue digits.",
      "Your objective is to fill all remaining empty cells with digits from 1 through 9 so that each row, column, and 3x3 square contains every number exactly once without repetition. With candidate pencil notes, smart conflict validation, and clean touch-friendly keypads, Sudoku Master is the ultimate daily puzzle companion."
    ],
    controls: {
      desktop: [
        "Mouse Click: Select any cell in the 9x9 grid.",
        "Number Keys (1-9): Input digit into selected cell.",
        "Backspace / Delete: Erase digit from selected cell.",
        "Arrow Keys: Navigate grid cursor between adjacent cells."
      ],
      mobile: [
        "Tap Cell: Highlight target cell.",
        "Tap On-Screen Keypad (1-9): Enter numbers or toggle pencil marks."
      ]
    },
    howToPlay: [
      "Select an empty cell on the board.",
      "Verify that your candidate number does not already appear in the same horizontal row.",
      "Verify that the number does not appear in the same vertical column.",
      "Verify that the number does not appear in the surrounding 3x3 subgrid.",
      "Fill all 81 squares to achieve victory!"
    ],
    rulesAndScoring: [
      "No Repetition Rule: Every number 1 through 9 must occur exactly once per row, column, and 3x3 block.",
      "Mistake Threshold: Keep errors under 3 to maintain a clean record.",
      "Timer & Score: Faster completion times award higher brain training ratings."
    ],
    proStrategies: [
      "Scan for Naked Singles: A cell that has 8 of the 9 digits already present in its row, column, or block can only hold the remaining 9th digit.",
      "Target Nearly Full Rows: Always solve rows and columns that already contain 6 or 7 digits first.",
      "Use Candidate Pencil Notes: Mark 2 possible candidates in cells to easily identify hidden pairs later."
    ],
    keyFeatures: [
      "Pencil Notes Mode: Take scratch notes directly inside cells.",
      "Instant Conflict Highlighting: Immediately flags duplicate digits.",
      "Adaptive Difficulty Modes: Choose from Easy, Medium, and Expert.",
      "100% Free & No Registration: Play directly in browser."
    ],
    systemRequirements: {
      browser: "Chrome, Safari, Firefox, Edge",
      ram: "Less than 25 MB",
      storage: "0 MB",
      network: "Client-side cached",
      platforms: "Mobile, Tablet, Desktop, Chromebook"
    },
    faqs: [
      {
        q: "Do I need math skills to play Sudoku?",
        a: "Not at all! Sudoku involves zero arithmetic. Numbers could easily be replaced with letters, colors, or symbols; it is purely a puzzle of logical elimination."
      },
      {
        q: "Does Sudoku Master save my progress if I close the browser?",
        a: "Yes, your active board state is automatically saved in your browser's local cache so you can resume anytime."
      }
    ]
  },

  "flappy-bird": {
    id: "flappy-bird",
    title: "Flappy Bird Tap",
    tagline: "The Viral Airborne Tap Reflex Arcade Phenomenon",
    category: "arcade",
    categoryName: "Retro & Arcade",
    path: "/games/flappy-bird/index.html",
    color: "from-yellow-400 to-orange-500",
    icon: "🐦",
    rating: "4.7 / 5.0",
    votes: "5,400",
    plays: "340k+",
    difficulty: "Challenging",
    avgTime: "2-4 mins",
    releaseDate: "2026",
    metaDescription: "Play Flappy Bird Tap free online with no download. Tap to flap, maneuver through retro pipe gaps, and test your patience and reflexes in this instant browser remake.",
    searchedKeywords: [
      "flappy bird online free no download",
      "play flappy bird on chromebook unblocked",
      "flappy bird tap browser game",
      "original flappy bird remake free",
      "tap reflex arcade games"
    ],
    overview: [
      "Flappy Bird Tap brings back the legendary viral tap arcade sensation that captivated the world. Re-engineered in lightweight HTML5 canvas, this title delivers pixel-perfect collision physics and instantaneous click/tap responsiveness.",
      "Guide a charming pixelated bird through pairs of towering retro green pipe obstacles. With gravity constantly pulling your bird downward, maintaining a steady altitude requires rhythm, anticipation, and supreme patience."
    ],
    controls: {
      desktop: [
        "Spacebar / Up Arrow: Flap wings upward.",
        "Left Mouse Click: Flap wings upward."
      ],
      mobile: [
        "Screen Tap: Tap anywhere on display to produce upward lift."
      ]
    },
    howToPlay: [
      "Click or tap the screen to initiate your bird's flight.",
      "Tap rhythmically to maintain altitude against continuous gravity.",
      "Guide your bird cleanly through pipe openings without grazing edges.",
      "Earn 1 point for every pipe pair passed successfully."
    ],
    rulesAndScoring: [
      "One Hit Game Over: Contact with any pipe or the ground ends the run.",
      "1 Point Per Obstacle: Every cleared pipe column increments your score.",
      "Medal Trophies: Bronze (10 pts), Silver (20 pts), Gold (30 pts), Platinum (50+ pts)."
    ],
    proStrategies: [
      "Tap at the Base of the Gap: Aim to enter pipe gaps near the lower lip, as upward flaps provide quick elevation.",
      "Find the Rhythm: Establish a steady cadence rather than frantic double-taps.",
      "Stay Calm After 10 Points: The physics don't change as score climbs; maintain your breathing and focus on one pipe at a time."
    ],
    keyFeatures: [
      "Instant Restarts: Zero delay between attempts.",
      "Authentic Retro Audio: Crisp retro sound effects.",
      "Smooth 60 FPS Physics: Clean rendering with no dropped frames.",
      "Unblocked for Chromebooks: Instant fun during breaks."
    ],
    systemRequirements: {
      browser: "All modern HTML5 browsers",
      ram: "Less than 15 MB",
      storage: "0 MB",
      network: "Lightweight HTTPS",
      platforms: "PC, Mac, Chromebook, iOS, Android"
    },
    faqs: [
      {
        q: "Why is Flappy Bird so challenging?",
        a: "The game features precise collision hitboxes and fast gravity acceleration, requiring consistent timing."
      },
      {
        q: "Can I play this game without ads interrupting every death?",
        a: "Yes! Medhastone provides instant restarts with zero invasive full-screen video ads."
      }
    ]
  },

  "space-shooter": {
    id: "space-shooter",
    title: "Space Shooter Galaxy",
    tagline: "Intense Retro Top-Down Galactic Alien Starfighter Arcade",
    category: "arcade",
    categoryName: "Retro & Arcade",
    path: "/games/space-shooter/index.html",
    color: "from-violet-600 to-purple-900",
    icon: "🚀",
    rating: "4.8 / 5.0",
    votes: "2,650",
    plays: "200k+",
    difficulty: "Medium",
    avgTime: "5-8 mins",
    releaseDate: "2026",
    metaDescription: "Play Space Shooter Galaxy free online with no download. Pilot your starfighter, dodge alien laser fire, collect weapon power-ups, and blast through asteroid waves.",
    searchedKeywords: [
      "space shooter game online free",
      "retro galaxy shooter no download",
      "arcade space invader game unblocked",
      "top down spaceship arcade browser",
      "free alien shooter html5 game"
    ],
    overview: [
      "Space Shooter Galaxy pays homage to classic 1980s coin-op space shooters like Galaga and Space Invaders. Pilot an advanced starfighter navigating through hostile cosmic sectors packed with alien fleets, plasma cannons, and kinetic asteroid storms.",
      "Collect weapon upgrades like spread shots, laser beams, and shields while dodging enemy barrages. With responsive controls and vibrant retro particle explosions, Space Shooter Galaxy delivers non-stop arcade action."
    ],
    controls: {
      desktop: [
        "Arrow Keys / WASD: Maneuver spaceship across 2D plane.",
        "Spacebar / Left Click: Fire continuous plasma lasers."
      ],
      mobile: [
        "Touch & Drag: Move spaceship directly beneath your finger (auto-fire active)."
      ]
    },
    howToPlay: [
      "Dodge incoming enemy laser projectiles and asteroid debris.",
      "Destroy alien starships before they descend past your defense line.",
      "Collect glowing power-up orbs to upgrade laser spread and defense shields.",
      "Defeat powerful mothership bosses at the climax of each sector."
    ],
    rulesAndScoring: [
      "Score Multipliers: Destroying consecutive enemy waves without taking damage builds your combo multiplier.",
      "Shield Integrity: Three shield hits before starfighter destruction.",
      "Boss Bonuses: Major score rewards for rapid boss defeats."
    ],
    proStrategies: [
      "Stay in the Lower Third: Positioning your starfighter near the bottom of the screen provides maximum reaction time against incoming lasers.",
      "Focus on Dodging Over Aiming: When projectile density increases, prioritize survival pathfinding; auto-firing weapons will handle targets.",
      "Target Formation Leaders: Destroying command ships at the center often scatters flank escorts."
    ],
    keyFeatures: [
      "Spectacular Particle Explosions: Rich visual effects rendered in WebGL.",
      "Multiple Power-Up Types: Spread shots, plasma lasers, and kinetic shields.",
      "Boss Battles: Challenging mothership encounters.",
      "Instant Play: Zero download or account setup."
    ],
    systemRequirements: {
      browser: "All modern browsers",
      ram: "Less than 35 MB",
      storage: "0 MB",
      network: "Instant load",
      platforms: "Windows, Mac, Chromebook, iOS, Android"
    },
    faqs: [
      {
        q: "Does Space Shooter Galaxy support keyboard and mouse?",
        a: "Yes, you can navigate using either WASD, Arrow keys, or direct mouse steering."
      },
      {
        q: "Are there different weapons to unlock?",
        a: "Yes, destroying glowing enemy commanders drops Weapon Upgrades that transform your cannon into spread shots, lasers, and missiles."
      }
    ]
  },

  "typing-speed": {
    id: "typing-speed",
    title: "Typing Speed Test",
    tagline: "Test & Train Your Words Per Minute (WPM) & Keystroke Accuracy",
    category: "words",
    categoryName: "Words & Typing",
    path: "/games/typing-speed/index.html",
    color: "from-fuchsia-500 to-pink-600",
    icon: "⌨️",
    rating: "4.9 / 5.0",
    votes: "1,220",
    plays: "15k+",
    difficulty: "Medium",
    avgTime: "1-3 mins",
    releaseDate: "2026",
    metaDescription: "Test your Words Per Minute (WPM) and typing accuracy with our free online Typing Speed Test. Real-time metrics, error correction, and instant feedback without signups.",
    searchedKeywords: [
      "typing speed test free online",
      "wpm test no download",
      "test my words per minute online free",
      "typing accuracy test for school chromebook",
      "keyboard speed training game"
    ],
    overview: [
      "Typing Speed Test is an interactive benchmark and training tool designed for students, programmers, professionals, and gamers looking to boost their keyboard efficiency. The tool measures your typing velocity in Words Per Minute (WPM), net accuracy percentage, and raw keystrokes per minute in real time.",
      "With instant error highlighting and diverse passage libraries, you can pinpoint tricky letter transitions and build lasting muscle memory."
    ],
    controls: {
      desktop: [
        "Physical Keyboard: Type the highlighted text prompt as quickly and accurately as possible.",
        "Backspace: Correct misspelled words before proceeding.",
        "Spacebar: Submit current word and advance cursor."
      ],
      mobile: [
        "On-Screen Keyboard: Type on your mobile device to test touch typing speed."
      ]
    },
    howToPlay: [
      "Position your fingers on the home row keys (ASDF - JKL;).",
      "Type the first letter of the on-screen prompt to start the 60-second timer.",
      "Green text indicates correct keystrokes; red highlights typographical errors.",
      "Finish the passage to view your final WPM, CPM, and accuracy breakdown."
    ],
    rulesAndScoring: [
      "WPM Calculation: (Total Correct Characters / 5) divided by Elapsed Minutes.",
      "Accuracy Score: (Correct Keystrokes / Total Keystrokes) × 100%.",
      "Net WPM: Deducts penalties for uncorrected errors to reflect true productivity."
    ],
    proStrategies: [
      "Accuracy Precedes Speed: Never rush ahead if your accuracy drops below 95%. Speed naturally follows once error rates decline.",
      "Keep Eyes on Screen: Avoid looking down at your hands; train your fingertips to find keys by touch.",
      "Maintain Home-Row Discipline: Always anchor index fingers on the tactile bumps of F and J."
    ],
    keyFeatures: [
      "Real-Time Telemetry: Instant WPM and error tracking.",
      "Clean Minimalist Interface: Distraction-free training environment.",
      "Multiple Test Durations: Choose 1-minute sprints or extended endurance tests.",
      "Unblocked in Classrooms: Ideal for computer lab exercises."
    ],
    systemRequirements: {
      browser: "Any browser with keyboard support",
      ram: "Less than 20 MB",
      storage: "0 MB",
      network: "Instant load",
      platforms: "Desktop, Laptop, Chromebook, Tablet"
    },
    faqs: [
      {
        q: "What is considered a good typing speed for beginners and pros?",
        a: "Average typing speed is roughly 40 WPM. Professional typists typically achieve 65-85 WPM, while competitive speed typists exceed 100+ WPM."
      },
      {
        q: "How many times a day should I practice?",
        a: "Practicing 2 to 3 tests (around 5-10 minutes daily) produces significant improvements in muscle memory within two weeks."
      }
    ]
  },

  "wordverse": {
    id: "wordverse",
    title: "Wordverse Vocabulary",
    tagline: "Anagram Word Search & Lexical Vocabulary Puzzle Game",
    category: "words",
    categoryName: "Words & Typing",
    path: "/games/wordverse/index.html",
    color: "from-amber-400 to-orange-500",
    icon: "📚",
    rating: "4.8 / 5.0",
    votes: "1,540",
    plays: "90k+",
    difficulty: "Medium",
    avgTime: "5-10 mins",
    releaseDate: "2026",
    metaDescription: "Play Wordverse Vocabulary free online with no download. Connect letter tiles, uncover hidden anagrams, and expand your vocabulary in this addictive word puzzle.",
    searchedKeywords: [
      "word search game online free",
      "word scramble anagram puzzle no download",
      "word puzzle games unblocked for school",
      "wordle and boggle alternative online",
      "vocabulary builder games free"
    ],
    overview: [
      "Wordverse is a captivating word puzzle game designed to test your lexical breadth, anagram recognition, and lateral thinking. Players are presented with a circular ring of letters and must link tiles together to reveal all valid English words that fit into the crossword grid above.",
      "With progressive difficulty and thousands of curated words, Wordverse is both an engaging casual diversion and an excellent tool for vocabulary building."
    ],
    controls: {
      desktop: [
        "Mouse Click & Drag: Connect letters in sequence to form a word.",
        "Keyboard Typing: Type letters directly using your physical keyboard."
      ],
      mobile: [
        "Touch & Drag: Trace your finger across the letter circle to link tiles."
      ]
    },
    howToPlay: [
      "Examine the letter wheel at the bottom of the screen.",
      "Swipe or drag across letters to form an English word with 3 or more letters.",
      "Release your mouse or finger to submit.",
      "If the word is in the puzzle, it fills into the corresponding crossword boxes.",
      "Find all hidden words to advance to the next level."
    ],
    rulesAndScoring: [
      "Valid Dictionary Check: Only recognized English words count toward board progress.",
      "Bonus Words: Finding valid words that aren't on the main grid rewards bonus coins.",
      "Hints: Spend collected coins to reveal letters when stuck."
    ],
    proStrategies: [
      "Search for Common Prefixes and Suffixes: Look for combinations like RE-, UN-, -ED, -ING, and -ER.",
      "Start with Shorter Words: Finding 3-letter combinations first helps clarify the remaining letters.",
      "Shuffle the Wheel: When experiencing mental blocks, hit the Shuffle button to view the letters from a fresh angle."
    ],
    keyFeatures: [
      "Rich English Lexicon: Thousands of verified valid words.",
      "Bonus Word Vault: Rewards exploratory vocabulary discoveries.",
      "No Time Limit Pressure: Relax and solve at your own pace.",
      "100% Free: Play in browser with zero downloads."
    ],
    systemRequirements: {
      browser: "All modern web browsers",
      ram: "Less than 25 MB",
      storage: "0 MB",
      network: "Instant load",
      platforms: "Mobile, Tablet, Desktop, Chromebook"
    },
    faqs: [
      {
        q: "Are plurals accepted in Wordverse?",
        a: "Yes, standard plural forms ending in -S or -ES are fully recognized where applicable."
      },
      {
        q: "Can children play Wordverse to improve English spelling?",
        a: "Yes! Wordverse is family-friendly and popular among educators for spelling and vocabulary reinforcement."
      }
    ]
  },

  "block-stack": {
    id: "block-stack",
    title: "Block Stack Tower",
    tagline: "Precision Timing & Isometric Skyscraper Building Game",
    category: "casual",
    categoryName: "Casual & Reflex",
    path: "/games/block-stack/index.html",
    color: "from-orange-500 to-red-500",
    icon: "🧱",
    rating: "4.7 / 5.0",
    votes: "1,110",
    plays: "89k+",
    difficulty: "Easy",
    avgTime: "3-5 mins",
    releaseDate: "2026",
    metaDescription: "Play Block Stack Tower free online with no download. Time your taps to stack sliding blocks and construct the tallest skyscraper without slicing overhangs.",
    searchedKeywords: [
      "block stack game online free",
      "stack tower browser game no download",
      "isometric tower building game unblocked",
      "timing reflex games for chromebook",
      "free stack arcade game"
    ],
    overview: [
      "Block Stack Tower is a captivating visual test of rhythm and spatial timing. Blocks slide continuously across an isometric base platform; your objective is to tap at the exact moment the sliding slab aligns with the tower below.",
      "Any overhanging portion is sliced off, shrinking your foundation for subsequent levels. Stacking blocks with flawless precision triggers harmonic chord chimes and expands your tower's dimensions!"
    ],
    controls: {
      desktop: [
        "Spacebar / Left Mouse Click: Drop the sliding block onto the tower."
      ],
      mobile: [
        "Screen Tap: Tap anywhere on the screen to place the block."
      ]
    },
    howToPlay: [
      "Watch the block slide back and forth over the tower foundation.",
      "Tap when the moving block aligns with the tower.",
      "Achieve 'Perfect' alignments to hear ascending musical notes and grow your block size.",
      "Survive as long as possible before the platform shrinks to zero."
    ],
    rulesAndScoring: [
      "Overhang Slicing: Misaligned sections fall away into the abyss.",
      "Combo Expansion: Scoring 5 consecutive Perfect placements enlarges your block.",
      "Tower Height Score: 1 point per successfully placed block layer."
    ],
    proStrategies: [
      "Anticipate the Return Swing: It is easier to time a block on its return trajectory when velocity is predictable.",
      "Listen to the Audio Cues: The ascending musical notes confirm consecutive Perfect placements.",
      "Don't Panic on Small Slabs: When your block shrinks, slow your breath and focus purely on center alignment."
    ],
    keyFeatures: [
      "Clean Isometric Aesthetic: Minimalist styling with vibrant color shifts.",
      "Harmonic Audio Feedback: Musical chimes reward accurate timing.",
      "Instant Play: Zero download or registration required.",
      "Universal Device Support: Optimized for desktop, mobile, and Chromebooks."
    ],
    systemRequirements: {
      browser: "All modern browsers",
      ram: "Less than 20 MB",
      storage: "0 MB",
      network: "Instant load",
      platforms: "PC, Mac, Chromebook, iOS, Android"
    },
    faqs: [
      {
        q: "What is the secret to building tall towers in Block Stack?",
        a: "Consistency over speed! Focus on matching the rhythmic beat of the sliding block."
      },
      {
        q: "Can I play Block Stack on my phone in portrait mode?",
        a: "Yes, Block Stack is fully responsive and plays smoothly in vertical portrait orientation on mobile devices."
      }
    ]
  },

  "pong-classic": {
    id: "pong-classic",
    title: "Pong Classic 1972",
    tagline: "The Legendary Vintage Video Table Tennis Arcade Duel",
    category: "arcade",
    categoryName: "Retro & Arcade",
    path: "/games/pong-classic/index.html",
    color: "from-zinc-700 to-black",
    icon: "🏓",
    rating: "4.7 / 5.0",
    votes: "980",
    plays: "67k+",
    difficulty: "Easy",
    avgTime: "3-6 mins",
    releaseDate: "2026",
    metaDescription: "Play Pong Classic 1972 free online without download. Defend your goal and deflect high-speed rallies past the computer paddle in this vintage video table tennis duel.",
    searchedKeywords: [
      "pong classic 1972 online free",
      "retro pong game no download",
      "table tennis arcade game unblocked",
      "original pong game browser",
      "vintage video games 1970s free"
    ],
    overview: [
      "Pong Classic 1972 recreates the genesis of commercial video games. First released in the early 1970s, this digital table tennis duel set the foundation for the entire interactive entertainment industry.",
      "Take control of your paddle, rally a bouncing square pixel ball across the court, and outmaneuver the responsive computer AI opponent. With each successive volley, ball speed increases, testing your reflexes."
    ],
    controls: {
      desktop: [
        "Up / Down Arrow Keys: Move paddle vertically.",
        "W / S Keys: Alternative paddle movement.",
        "Mouse Movement: Guide paddle directly along the vertical axis."
      ],
      mobile: [
        "Touch & Drag: Slide finger vertically on the left side of the screen to move paddle."
      ]
    },
    howToPlay: [
      "Position your paddle in the path of the incoming ball.",
      "Deflect the ball back across the center net divider.",
      "Angle your returns by striking the ball with the paddle's upper or lower corners.",
      "Score a point whenever your opponent fails to return the volley.",
      "First player to reach 11 points wins the match."
    ],
    rulesAndScoring: [
      "Point Scoring: Missed balls award 1 point to the opposing side.",
      "Speed Acceleration: Ball velocity increments with every successful paddle contact.",
      "English Deflection: Striking near paddle edges creates steeper deflection angles."
    ],
    proStrategies: [
      "Use Paddle Edges: Hitting the ball with the outer tips of your paddle sends it slicing diagonally across the screen, making it difficult for the AI to react in time.",
      "Anchor Near the Center: Return to the vertical midpoint after every shot so you are equidistant from top and bottom walls."
    ],
    keyFeatures: [
      "Authentic Monochromatic Aesthetic: Faithful retro display with scanline effects.",
      "Classic Bip Sound Effects: Vintage audio feedback.",
      "Adaptive AI: Competitive matches for both beginners and veterans.",
      "Unblocked for Chromebooks: Zero plugins or downloads needed."
    ],
    systemRequirements: {
      browser: "All modern web browsers",
      ram: "Less than 10 MB",
      storage: "0 MB",
      network: "Instant load",
      platforms: "PC, Mac, Chromebook, iOS, Android"
    },
    faqs: [
      {
        q: "Who invented Pong?",
        a: "Pong was originally developed by Allan Alcorn and released by Atari in 1972, kickstarting the video arcade industry."
      },
      {
        q: "Can I play Pong with a touch screen on an iPad or phone?",
        a: "Yes! The mobile version allows direct vertical finger dragging for intuitive paddle control."
      }
    ]
  },

  "memory-match": {
    id: "memory-match",
    title: "Memory Match Cards",
    tagline: "Visual Pattern Recall & Concentration Brain Training Game",
    category: "puzzle",
    categoryName: "Brain & Strategy",
    path: "/games/memory-match/index.html",
    color: "from-pink-400 to-rose-500",
    icon: "🧠",
    rating: "4.8 / 5.0",
    votes: "890",
    plays: "56k+",
    difficulty: "Easy",
    avgTime: "3-5 mins",
    releaseDate: "2026",
    metaDescription: "Play Memory Match Cards free online with no download. Flip hidden cards, match matching pairs, and sharpen visual concentration in this instant brain trainer.",
    searchedKeywords: [
      "memory card matching game free online",
      "concentration memory game no download",
      "brain training games for memory unblocked",
      "flip card matching puzzle for chromebook",
      "free kids memory games browser"
    ],
    overview: [
      "Memory Match Cards is an engaging cognitive exercise designed to improve short-term visual memory, spatial retention, and focus. Cards are laid face-down across a grid; players flip pairs to find matching symbols.",
      "With smooth 3D flip card animations and multiple board sizes, Memory Match provides a delightful and effective memory training experience for players of all ages."
    ],
    controls: {
      desktop: [
        "Left Mouse Click: Click any card to reveal its face icon."
      ],
      mobile: [
        "Tap Card: Tap directly on any card to flip it over."
      ]
    },
    howToPlay: [
      "Click any card to reveal its hidden icon.",
      "Click a second card to see if it matches the first.",
      "If the cards match, they remain face up.",
      "If they differ, both cards flip face down after a brief pause.",
      "Clear the entire board in the fewest moves and fastest time possible!"
    ],
    rulesAndScoring: [
      "Pairs Required: Match all pairs on the board to complete the round.",
      "Move Counter: Tracks total flips; fewer flips indicate sharper memory.",
      "Star Rating: 3 stars awarded for low move counts and quick clears."
    ],
    proStrategies: [
      "Systematic Scanning: Flip cards in a structured sequence (e.g., top-to-bottom, left-to-right) rather than picking randomly.",
      "Verbal Associations: Mentally name the icon and location (e.g., 'Star top-left, Moon center') to strengthen recall."
    ],
    keyFeatures: [
      "Satisfying 3D Card Flips: Smooth CSS transitions.",
      "Multiple Difficulty Grids: 4x4, 6x6, and custom layouts.",
      "Cognitive Benefits: Enhances working memory and spatial awareness.",
      "Zero Downloads: Play instantly in browser."
    ],
    systemRequirements: {
      browser: "All modern browsers",
      ram: "Less than 20 MB",
      storage: "0 MB",
      network: "Instant load",
      platforms: "PC, Mac, Chromebook, iOS, Android"
    },
    faqs: [
      {
        q: "Does playing memory games actually improve memory?",
        a: "Studies show that consistent visual memory training strengthens working memory capacity and pattern recognition."
      },
      {
        q: "Is this game suitable for children?",
        a: "Yes! Memory Match is family-safe and widely used by educators and parents."
      }
    ]
  },

  "mathgenius": {
    id: "mathgenius",
    title: "Math Genius Quiz",
    tagline: "Rapid Mental Arithmetic Calculation & Reflex Quiz Game",
    category: "puzzle",
    categoryName: "Brain & Strategy",
    path: "/games/mathgenius/index.html",
    color: "from-indigo-500 to-blue-600",
    icon: "🔢",
    rating: "4.7 / 5.0",
    votes: "720",
    plays: "22k+",
    difficulty: "Medium",
    avgTime: "2-5 mins",
    releaseDate: "2026",
    metaDescription: "Play Math Genius Quiz free online with no download. Solve rapid mental arithmetic equations (addition, subtraction, multiplication, division) against the clock.",
    searchedKeywords: [
      "math quiz game online free",
      "speed math arithmetic training no download",
      "mental math games unblocked for school chromebook",
      "multiplication and division practice games",
      "educational brain games online"
    ],
    overview: [
      "Math Genius Quiz is a high-speed arithmetic speed test designed to sharpen mental math skills under time pressure. Players solve equations spanning addition, subtraction, multiplication, and division before the countdown bar depletes.",
      "Speed, accuracy, and quick number sense will determine how high you climb on the leaderboards."
    ],
    controls: {
      desktop: [
        "Number Keys (0-9) / Numpad: Type answers directly.",
        "Mouse Click: Click the correct answer choice from multiple options."
      ],
      mobile: [
        "Tap Answer: Tap the correct numeric button on screen."
      ]
    },
    howToPlay: [
      "Read the arithmetic equation displayed in the center of the screen.",
      "Calculate the result in your head before the timer runs out.",
      "Select the correct answer from the choices provided.",
      "Maintain your streak to earn combo multipliers and bonus seconds."
    ],
    rulesAndScoring: [
      "Time Bonus: Answering within 2 seconds awards speed points.",
      "Streak Multiplier: Consecutive correct answers multiply your score up to 5x.",
      "Wrong Answer Penalty: Incorrect answers deduct seconds from your clock."
    ],
    proStrategies: [
      "Look at the Last Digit: In multiplication, checking the units digit often rules out three of the four answer choices instantly.",
      "Round and Adjust: For tricky additions (like 47 + 38), round to 50 + 35 for faster mental arithmetic."
    ],
    keyFeatures: [
      "Rapid Mental Calculation: Keeps arithmetic skills sharp.",
      "Streak Multipliers: Rewards consecutive correct answers.",
      "Great for Students & Adults: Suitable for all age groups.",
      "No Download or Account Required: Play instantly in any browser."
    ],
    systemRequirements: {
      browser: "All modern web browsers",
      ram: "Less than 15 MB",
      storage: "0 MB",
      network: "Instant load",
      platforms: "Desktop, Chromebook, iOS, Android"
    },
    faqs: [
      {
        q: "What types of math questions are included?",
        a: "Addition, subtraction, multiplication, and division problems with scaling difficulty."
      },
      {
        q: "Can teachers use this in math classes on Chromebooks?",
        a: "Yes! Math Genius is unblocked, educational, and runs smoothly on school Chromebooks."
      }
    ]
  },

  "racing-2d": {
    id: "racing-2d",
    title: "Racing 2D Highway",
    tagline: "Top-Down High-Speed Highway Traffic Overtake Arcade Racer",
    category: "arcade",
    categoryName: "Retro & Arcade",
    path: "/games/racing-2d/index.html",
    color: "from-red-500 to-rose-700",
    icon: "🏎️",
    rating: "4.7 / 5.0",
    votes: "1,450",
    plays: "150k+",
    difficulty: "Medium",
    avgTime: "3-6 mins",
    releaseDate: "2026",
    metaDescription: "Play Racing 2D Highway free online with no download. Steer through dense highway traffic, collect turbo fuel boosts, and push top velocity in this retro top-down racer.",
    searchedKeywords: [
      "2d racing game online free",
      "retro highway traffic racer no download",
      "car racing games unblocked for chromebook",
      "top down pixel car racing html5",
      "arcade speed driving games"
    ],
    overview: [
      "Racing 2D Highway brings the rush of vintage top-down arcade racers directly to your web browser. Put the pedal to the metal, weave through multi-lane rush hour highway traffic, and grab turbo nitrous canisters to outrun the competition.",
      "With increasing vehicle density and tight overtaking windows, quick lane changes and razor-sharp reflexes are your only defense against high-speed collisions."
    ],
    controls: {
      desktop: [
        "Left / Right Arrow Keys: Steer car between lanes.",
        "Up Arrow / W: Accelerate turbo nitrous boost.",
        "Down Arrow / S: Brake / decelerate."
      ],
      mobile: [
        "Tilt Device / On-Screen Arrows: Steer between lanes.",
        "Tap Boost Button: Engage nitrous acceleration."
      ]
    },
    howToPlay: [
      "Navigate down the bustling multi-lane highway without colliding with civilian traffic.",
      "Collect green fuel pods and blue turbo nitrous canisters.",
      "Perform near-miss overtakes to score drift bonus multipliers.",
      "Cover the greatest distance before your fuel runs dry or a crash occurs."
    ],
    rulesAndScoring: [
      "Overtake Bonuses: Passing close to other vehicles awards Close Call points.",
      "Fuel Meter: Fuel gradually drains; collect gas cans to extend your drive.",
      "Collision: Any direct collision results in an instant crash."
    ],
    proStrategies: [
      "Keep to the Center Lane: Staying in the middle lanes gives you two escape routes when sudden brake lights appear.",
      "Don't Overuse Boost in Heavy Traffic: Reserve your nitrous for open stretches of highway."
    ],
    keyFeatures: [
      "Retro Pixel Graphics: Nostalgic arcade driving vibes.",
      "Dynamic Traffic AI: Civilian vehicles switch lanes dynamically.",
      "Smooth 60 FPS Scrolling: High-speed illusion without jitter.",
      "Instant Play: No installation or storage requirements."
    ],
    systemRequirements: {
      browser: "All modern browsers",
      ram: "Less than 25 MB",
      storage: "0 MB",
      network: "Instant load",
      platforms: "PC, Mac, Chromebook, iOS, Android"
    },
    faqs: [
      {
        q: "Can I play Racing 2D Highway with touch controls?",
        a: "Yes! The mobile version features large, responsive on-screen steering and boost buttons."
      },
      {
        q: "Does the game get faster over time?",
        a: "Yes, overall traffic speed and congestion increase steadily the further you drive."
      }
    ]
  },

  "arrow-scape": {
    id: "arrow-scape",
    title: "Arrow Scape Dodge",
    tagline: "Kinetic Labyrinth Runner & Precision Reflex Obstacle Game",
    category: "arcade",
    categoryName: "Retro & Arcade",
    path: "/games/arrow-scape/index.html",
    color: "from-blue-500 to-indigo-600",
    icon: "🏹",
    rating: "4.8 / 5.0",
    votes: "1,310",
    plays: "120k+",
    difficulty: "Challenging",
    avgTime: "2-5 mins",
    releaseDate: "2026",
    metaDescription: "Play Arrow Scape Dodge free online with no download. Navigate high-speed arrow trajectories through tight labyrinth obstacles and kinetic hazards.",
    searchedKeywords: [
      "arrow reflex game online free",
      "dodge obstacle game no download",
      "arrow scape unblocked for school chromebook",
      "kinetic runner browser games",
      "free skill reaction games"
    ],
    overview: [
      "Arrow Scape Dodge is an adrenaline-fueled reflex test where you guide a high-speed aerodynamic arrow through a labyrinth of moving laser barriers, rotating geometric spikes, and narrowing corridors.",
      "A single millisecond of hesitation or over-correction can end your run. Perfect for players who thrive on precise micro-adjustments and challenging gameplay."
    ],
    controls: {
      desktop: [
        "Arrow Keys / WASD: Adjust arrow steering trajectory.",
        "Spacebar: Temporary micro-dash burst."
      ],
      mobile: [
        "Touch & Hold: Drag left/right to steer through barriers."
      ]
    },
    howToPlay: [
      "Launch your arrow down the kinetic corridor.",
      "Steer smoothly through narrow gaps in rotating geometric obstacles.",
      "Collect glowing chronos gems to slow down time briefly.",
      "Survive as many obstacle gates as possible to set high scores."
    ],
    rulesAndScoring: [
      "1 Hit Crash: Any contact with barrier walls destroys the arrow.",
      "Gate Clearance: Points awarded per obstacle gate safely navigated.",
      "Near-Miss Bonus: Squeezing through tight gaps awards extra bonus multipliers."
    ],
    proStrategies: [
      "Make Small Micro-Adjustments: Large erratic steering inputs cause oscillations that lead to crashes.",
      "Look Ahead: Keep your eyes focused two obstacles ahead rather than staring directly at your arrow."
    ],
    keyFeatures: [
      "Ultra-Tight Control Latency: Responsive inputs designed for competitive play.",
      "Futuristic Minimalist Neon Design: Clean visuals with high contrast.",
      "Fast Restarts: Jump back into the action in less than a second.",
      "Unblocked Web Game: Play anytime on school or work devices."
    ],
    systemRequirements: {
      browser: "All modern HTML5 browsers",
      ram: "Less than 20 MB",
      storage: "0 MB",
      network: "Instant load",
      platforms: "PC, Mac, Chromebook, iOS, Android"
    },
    faqs: [
      {
        q: "Why is Arrow Scape so fast?",
        a: "It is designed as an elite reflex benchmark, demanding rapid visual-motor coordination."
      },
      {
        q: "Does Arrow Scape run smoothly on 60Hz and 120Hz displays?",
        a: "Yes! The game uses requestAnimationFrame for fluid frame rates across all refresh rates."
      }
    ]
  },

  "tic-tac-toe": {
    id: "tic-tac-toe",
    title: "Tic Tac Toe AI",
    tagline: "Classic Noughts and Crosses Casual Minimax Strategy Duel",
    category: "casual",
    categoryName: "Casual & Reflex",
    path: "/games/tic-tac-toe/index.html",
    color: "from-teal-400 to-emerald-500",
    icon: "❌",
    rating: "4.7 / 5.0",
    votes: "610",
    plays: "34k+",
    difficulty: "Easy",
    avgTime: "1-2 mins",
    releaseDate: "2026",
    metaDescription: "Play Tic Tac Toe AI free online with no download. Challenge an intelligent Minimax computer bot or play with a friend in classic 3x3 Xs and Os.",
    searchedKeywords: [
      "tic tac toe online free no download",
      "play noughts and crosses against computer",
      "tic tac toe unblocked games for school",
      "impossible tic tac toe ai browser",
      "free 2 player games online without download"
    ],
    overview: [
      "Tic Tac Toe AI delivers the classic 3x3 pencil-and-paper game directly into your browser. Play as Xs or Os against an unbeatable Minimax AI opponent, or pass-and-play with a friend beside you.",
      "Simple to learn yet mathematically profound, Tic Tac Toe is the perfect 1-minute brain break to test pattern recognition and tactical traps."
    ],
    controls: {
      desktop: [
        "Left Mouse Click: Place your mark (X or O) on any empty grid square."
      ],
      mobile: [
        "Screen Tap: Tap an empty cell to place your symbol."
      ]
    },
    howToPlay: [
      "Select your marker (X goes first, O goes second).",
      "Take turns placing your symbol in empty 3x3 grid cells.",
      "Form a horizontal, vertical, or diagonal line of 3 marks to claim victory.",
      "If all 9 cells are filled with no 3-in-a-row, the round ends in a Draw (Cat's Game)."
    ],
    rulesAndScoring: [
      "Win: 3 of your marks aligned consecutively.",
      "Draw: Full grid without a 3-mark sequence.",
      "Score Tracker: Tracks overall wins, losses, and draws across session."
    ],
    proStrategies: [
      "Take the Center First: Holding the middle tile gives you 4 possible winning lines.",
      "The Corner Fork Trap: If you hold two opposite corners, your opponent must be careful not to walk into a double-threat trap."
    ],
    keyFeatures: [
      "Minimax AI Engine: Choose between Easy, Medium, and Impossible bots.",
      "Local 2-Player Pass & Play: Play together on a shared keyboard or screen.",
      "Instant Clean Rounds: Zero ads or loading screens.",
      "Zero Downloads: Runs directly in web browser."
    ],
    systemRequirements: {
      browser: "All web browsers",
      ram: "Less than 10 MB",
      storage: "0 MB",
      network: "Instant load",
      platforms: "Every device with a browser"
    },
    faqs: [
      {
        q: "Can the AI ever be beaten on Impossible mode?",
        a: "Mathematically, two perfect Tic Tac Toe players will always result in a draw! On Impossible mode, the Minimax engine never makes an error."
      },
      {
        q: "Can I play against my friend on the same computer?",
        a: "Yes, you can toggle 2-Player mode to play locally with a friend."
      }
    ]
  },

  "color-dash": {
    id: "color-dash",
    title: "Color Dash Match",
    tagline: "Rapid Color Perception & Chromatic Reflex Reaction Game",
    category: "casual",
    categoryName: "Casual & Reflex",
    path: "/games/color-dash/index.html",
    color: "from-green-400 to-emerald-600",
    icon: "🎨",
    rating: "4.7 / 5.0",
    votes: "520",
    plays: "12k+",
    difficulty: "Easy",
    avgTime: "2-4 mins",
    releaseDate: "2026",
    metaDescription: "Play Color Dash Match free online with no download. Tap to match shifting chromatic gate colors before the rapid timer depletes.",
    searchedKeywords: [
      "color match game online free",
      "color reflex reaction game no download",
      "chromatic puzzle unblocked for chromebook",
      "quick 2 minute casual games",
      "free tap reflex web games"
    ],
    overview: [
      "Color Dash Match is an engaging test of chromatic perception and instantaneous reaction speed. Colored shapes descend toward shifting color gates; your task is to tap the matching color button before the collision happens.",
      "As your combo chain builds, speeds accelerate and hues shift subtly, providing a vibrant, addictive reflex challenge."
    ],
    controls: {
      desktop: [
        "1, 2, 3, 4 Number Keys: Select corresponding color gates.",
        "Left Mouse Click: Click matching color button on screen."
      ],
      mobile: [
        "Screen Tap: Tap the matching color quadrant button."
      ]
    },
    howToPlay: [
      "Observe the color of the incoming falling orb.",
      "Tap the corresponding color button at the bottom of the screen.",
      "Clear orbs before they pass the lower threshold.",
      "Build continuous combos to earn score multipliers."
    ],
    rulesAndScoring: [
      "Correct Match: Awards 100 base points multiplied by active combo multiplier.",
      "Color Mismatch: Breaks combo and deducts a life point.",
      "3 Lives: Run ends when all 3 lives are exhausted."
    ],
    proStrategies: [
      "Focus on the Shape Rather than Text: Avoid Stroop effect confusion by looking directly at the chromatic pigment rather than written labels.",
      "Anchor Fingers Over Buttons: Keep your fingers resting directly over all 4 color quadrants on touchscreen devices."
    ],
    keyFeatures: [
      "Vibrant Color Palette: Crisp, cheerful visual styling.",
      "Rhythmic Gameplay: Upbeat sound effects enhance the flow state.",
      "Immediate Restarts: Play again with one click.",
      "100% Free & No Registration: Instant access."
    ],
    systemRequirements: {
      browser: "All modern browsers",
      ram: "Less than 15 MB",
      storage: "0 MB",
      network: "Instant load",
      platforms: "PC, Mac, Chromebook, iOS, Android"
    },
    faqs: [
      {
        q: "Is Color Dash Match suitable for quick breaks?",
        a: "Yes! A complete session takes only 1 to 3 minutes, making it ideal for quick breaks between tasks."
      },
      {
        q: "Is there a colorblind friendly mode?",
        a: "Yes, shapes also feature distinct geometric patterns (circle, triangle, square, star) to ensure accessibility."
      }
    ]
  }
};
