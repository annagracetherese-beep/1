// Portfolio Data - Accurately reflecting first-year student profile with 0 exaggeration

export interface LocationInfo {
  id: string;
  number: string;
  name: string;
  shortLabel: string;
  description: string;
  iconName: string;
  themeColor: string;
  pastelBg: string;
  mapCoordinates: { x: number; y: number }; // Percentage on map canvas
}

export const LOCATIONS: LocationInfo[] = [
  {
    id: 'my-world',
    number: '01',
    name: 'MY LITTLE WORLD',
    shortLabel: 'About Me & Story',
    description: 'A cozy house surrounded by flowers and greenery where my journey begins.',
    iconName: 'Home',
    themeColor: '#f4a6b2', // pastel pink
    pastelBg: '#fde8ec',
    mapCoordinates: { x: 22, y: 38 },
  },
  {
    id: 'learning-lab',
    number: '02',
    name: 'LEARNING LAB',
    shortLabel: 'Skills & Quests',
    description: 'A magical library and lab of books, code, and evolving knowledge.',
    iconName: 'BookOpen',
    themeColor: '#74c0fc', // pastel blue
    pastelBg: '#e7f5ff',
    mapCoordinates: { x: 48, y: 22 },
  },
  {
    id: 'project-arcade',
    number: '03',
    name: 'PROJECT ARCADE',
    shortLabel: 'My Little Creations',
    description: 'A colourful little retro arcade holding my actual programming creations.',
    iconName: 'Gamepad2',
    themeColor: '#ffe066', // butter yellow
    pastelBg: '#fff9db',
    mapCoordinates: { x: 76, y: 32 },
  },
  {
    id: 'creative-corner',
    number: '04',
    name: 'CREATIVE CORNER',
    shortLabel: 'Arts & Beyond Tech',
    description: 'An art studio filled with craft materials, collages, music, and inspiration.',
    iconName: 'Palette',
    themeColor: '#cbb2fe', // pastel lavender
    pastelBg: '#f3edff',
    mapCoordinates: { x: 28, y: 72 },
  },
  {
    id: 'exploration-forest',
    number: '05',
    name: 'EXPLORATION FOREST',
    shortLabel: 'Curiosity Map',
    description: 'A tranquil forest clearing containing paths toward areas I want to explore.',
    iconName: 'Compass',
    themeColor: '#8fa89b', // sage green
    pastelBg: '#e5ece7',
    mapCoordinates: { x: 55, y: 78 },
  },
  {
    id: 'contact-station',
    number: '06',
    name: 'CONTACT STATION',
    shortLabel: 'Post Office & Mailbox',
    description: 'A cozy little postal stop to send a friendly hello or chat about ideas.',
    iconName: 'Mail',
    themeColor: '#ffbe76', // soft peach
    pastelBg: '#ffeaa7',
    mapCoordinates: { x: 82, y: 68 },
  },
];

export const SKILL_INVENTORY = [
  {
    id: 'python',
    name: 'Python',
    status: 'Basic Knowledge',
    category: 'Programming',
    pixelIcon: '🐍',
    color: '#ffe066',
    description: 'Basic syntax, variables, conditionals, loops, functions, and writing scripts to interact with databases.',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    status: 'Basic Knowledge',
    category: 'Database',
    pixelIcon: '🐬',
    color: '#74c0fc',
    description: 'Relational tables, basic queries (SELECT, INSERT, UPDATE, DELETE), and connecting with Python.',
  },
  {
    id: 'c-lang',
    name: 'C Programming',
    status: 'Currently Learning',
    category: 'Programming',
    pixelIcon: '⚙️',
    color: '#cbb2fe',
    description: 'Learning fundamentals of memory, variables, pointers, and problem-solving through college coursework and CS50.',
  },
  {
    id: 'figma',
    name: 'Figma',
    status: 'Exploring',
    category: 'Design Tool',
    pixelIcon: '🎨',
    color: '#f4a6b2',
    description: 'Beginner experimenting with frames, shapes, typography, components, and layout composition.',
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Design',
    status: 'Exploring',
    category: 'Design Field',
    pixelIcon: '✨',
    color: '#ffbe76',
    description: 'Understanding visual hierarchy, user empathy, accessibility, wireframes, and intuitive navigation flows.',
  },
  {
    id: 'cs50',
    name: 'CS50',
    status: 'Currently Learning',
    category: 'Coursework',
    pixelIcon: '💡',
    color: '#8fa89b',
    description: 'Harvard’s Introduction to Computer Science — exploring algorithms, data structures, and computational thinking.',
  },
];

export const CURRENT_QUESTS = [
  {
    id: 'q1',
    title: 'Mastering C Programming Fundamentals',
    tag: 'Academic Quest',
    status: 'In Progress',
    detail: 'Building a strong algorithmic base through college classes and problem sets.',
  },
  {
    id: 'q2',
    title: 'Exploring CS50 Computer Science',
    tag: 'Exploration Quest',
    status: 'In Progress',
    detail: 'Diving deep into computational concepts, memory allocation, and problem solving.',
  },
  {
    id: 'q3',
    title: 'Discovering UI/UX Fundamentals',
    tag: 'Design Quest',
    status: 'In Progress',
    detail: 'Reading case studies, analyzing web aesthetics, and learning user-centric layout principles.',
  },
  {
    id: 'q4',
    title: 'Experimenting with Figma Layouts',
    tag: 'Creative Quest',
    status: 'In Progress',
    detail: 'Creating playful personal mockups, button designs, and scrapbook style wireframes.',
  },
];

// EXACTLY TWO PROJECTS ONLY
export const PROJECTS = [
  {
    id: 'train-booking',
    title: 'Train Ticket Booking System',
    technology: 'Python + MySQL',
    badge: 'School-Level Project',
    tagColor: '#74c0fc',
    description:
      'A school-level project created using Python and MySQL to explore database management and basic programming through a train ticket booking system.',
    interactiveType: 'terminal',
    features: [
      'Ticket reservation and train inquiry',
      'Passenger record insertion in MySQL database',
      'Seat availability checks and booking confirmation IDs',
      'Console-based menu interface',
    ],
  },
  {
    id: 'dino-game',
    title: 'Dinosaur Arrow Game',
    technology: 'Scratch',
    badge: 'Visual Interactive Game',
    tagColor: '#ffe066',
    description:
      'A simple interactive game created using Scratch, featuring a dinosaur, an arrow, scoring and game-over functionality.',
    interactiveType: 'game',
    features: [
      'Arrow navigation and target coordination',
      'Sprite animation and event-driven triggers',
      'Real-time score tracking counter',
      'Game over collision condition',
    ],
  },
];

export const CREATIVE_OUTLETS = [
  {
    title: 'Arts & Crafts',
    subtitle: 'Paper, Scissors & Clay',
    icon: '✂️',
    color: '#f4a6b2',
    description: 'Transforming everyday materials into tactile art, miniature objects, and handmade decorations.',
  },
  {
    title: 'Collages & Layouts',
    subtitle: 'Visual Composition',
    icon: '🖼️',
    color: '#ffe066',
    description: 'Layering paper scraps, typography, vintage textures, and colors to tell visual stories.',
  },
  {
    title: 'Singing & Music',
    subtitle: 'Vocal Expression',
    icon: '🎵',
    color: '#cbb2fe',
    description: 'Singing brings warmth and joy, letting melody connect emotions and clear the mind.',
  },
  {
    title: 'Dancing & Movement',
    subtitle: 'Rhythm & Energy',
    icon: '💃',
    color: '#74c0fc',
    description: 'Expressing rhythm, grace, and spontaneous joy through movement.',
  },
  {
    title: 'Organizing & Leadership',
    subtitle: 'Bringing Ideas to Life',
    icon: '📋',
    color: '#8fa89b',
    description: 'Loves structuring tasks, coordinating activities, and helping teams work harmoniously.',
  },
];

export const CURIOSITY_AREAS = [
  {
    id: 'curiosity-uiux',
    title: 'UI/UX Design',
    icon: '✨',
    color: '#f4a6b2',
    blurb: 'Designing human-centered interfaces that turn complex tech into welcoming spaces.',
    whyCurious: 'How visual beauty, typography, and clear workflows combine to make people feel at ease.',
  },
  {
    id: 'curiosity-web',
    title: 'Web Development',
    icon: '🌐',
    color: '#74c0fc',
    blurb: 'Crafting responsive, living websites that serve as playful interactive canvases.',
    whyCurious: 'The magic of seeing code turn instantly into visual, interactive worlds that anyone can visit.',
  },
  {
    id: 'curiosity-ai',
    title: 'AI & Machine Learning',
    icon: '🧠',
    color: '#ffe066',
    blurb: 'Exploring how models learn patterns and can augment human creative possibilities.',
    whyCurious: 'Fascinated by how intelligent systems can help artists, students, and thinkers explore faster.',
  },
  {
    id: 'curiosity-app',
    title: 'App Development',
    icon: '📱',
    color: '#cbb2fe',
    blurb: 'Building pocket-sized helpful tools that fit naturally into everyday life.',
    whyCurious: 'The tactile experience of interacting with software directly on mobile touchscreens.',
  },
  {
    id: 'curiosity-game',
    title: 'Game Development',
    icon: '🎮',
    color: '#ffbe76',
    blurb: 'Designing cozy game worlds with sprites, soundscapes, and gentle interactive quests.',
    whyCurious: 'Games are the ultimate blend of music, visual art, narrative, and computer science.',
  },
  {
    id: 'curiosity-creative-tech',
    title: 'Creative Technology',
    icon: '🔮',
    color: '#8fa89b',
    blurb: 'Merging physical crafts, generative code, sensors, and multimedia installations.',
    whyCurious: 'Where engineering meets pure imagination without being confined by traditional software boxes.',
  },
];
