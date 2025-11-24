export type Video = {
  id: string;
  title: string;
  thumbnailId: string;
  duration: string;
  channelName: string;
  channelId: string;
  views: string;
  uploadedAt: string;
  description: string;
  category: string;
};

export type Channel = {
  id: string;
  name: string;
  avatarId: string;
  subscribers: string;
};

export const channels: Channel[] = [
  { id: 'dev-ed', name: 'Dev Ed', avatarId: 'avatar-dev-ed', subscribers: '800K' },
  { id: 'fireship', name: 'Fireship', avatarId: 'avatar-fireship', subscribers: '2.5M' },
  { id: 'web-dev-simplified', name: 'Web Dev Simplified', avatarId: 'avatar-wds', subscribers: '1.4M' },
  { id: 'freecodecamp', name: 'freeCodeCamp.org', avatarId: 'avatar-fcc', subscribers: '9M' },
  { id: 'mkbhd', name: 'Marques Brownlee', avatarId: 'avatar-mkbhd', subscribers: '18M' },
];

export const videos: Video[] = [
  {
    id: 'nextjs-15-crash-course',
    title: 'Next.js 15 Crash Course for Beginners 2024',
    thumbnailId: 'thumbnail-nextjs-15-crash-course',
    duration: '1:30:25',
    channelName: 'Fireship',
    channelId: 'fireship',
    views: '250K views',
    uploadedAt: '2 weeks ago',
    description: 'Learn the fundamentals of Next.js 15 and the App Router in this full tutorial for beginners. Get up and running with the worlds most popular React framework to build server-rendered applications.',
    category: 'Film',
  },
  {
    id: 'react-in-100-seconds',
    title: 'React in 100 Seconds',
    thumbnailId: 'thumbnail-react-in-100-seconds',
    duration: '2:10',
    channelName: 'Fireship',
    channelId: 'fireship',
    views: '3.1M views',
    uploadedAt: '1 year ago',
    description: 'React is a JavaScript library for building user interfaces. It enables developers to create reusable UI components and build complex, fast, and scalable single-page applications.',
    category: 'Film',
  },
  {
    id: 'full-react-course-2024',
    title: 'Full React Course 2024 - Beginner to Advanced',
    thumbnailId: 'thumbnail-full-react-course-2024',
    duration: '24:50:11',
    channelName: 'freeCodeCamp.org',
    channelId: 'freecodecamp',
    views: '8M views',
    uploadedAt: '5 months ago',
    description: 'Become a master of React in this comprehensive course. You will learn all about components, hooks, context, reducers, and more.',
    category: 'Film',
  },
  {
    id: 'css-for-js-devs',
    title: 'CSS for JS Devs - Full Course',
    thumbnailId: 'thumbnail-css-for-js-devs',
    duration: '8:45:00',
    channelName: 'Dev Ed',
    channelId: 'dev-ed',
    views: '750K views',
    uploadedAt: '1 year ago',
    description: 'CSS can be tricky. This course is designed to make it intuitive and fun for JavaScript developers. Learn about flexbox, grid, animations, and more.',
    category: 'Film',
  },
  {
    id: 'the-perfect-api',
    title: 'I Built The Perfect API. Here\'s How.',
    thumbnailId: 'thumbnail-the-perfect-api',
    duration: '15:32',
    channelName: 'Web Dev Simplified',
    channelId: 'web-dev-simplified',
    views: '1.2M views',
    uploadedAt: '9 months ago',
    description: 'APIs are the backbone of modern web development. In this video, I will show you my process for designing and building robust, scalable, and easy-to-use APIs.',
    category: 'Film',
  },
  {
    id: 'ai-phone-review',
    title: 'The AI Phone is Here. And it\'s... Weird.',
    thumbnailId: 'thumbnail-ai-phone-review',
    duration: '22:18',
    channelName: 'Marques Brownlee',
    channelId: 'mkbhd',
    views: '5.6M views',
    uploadedAt: '3 weeks ago',
    description: 'A review of the latest AI-powered smartphone that promises to change everything. Does it live up to the hype? Let\'s find out.',
    category: 'Berita',
  },
  {
    id: 'genkit-tutorial',
    title: 'Build AI Apps with Genkit & Next.js',
    thumbnailId: 'thumbnail-genkit-tutorial',
    duration: '12:45',
    channelName: 'Fireship',
    channelId: 'fireship',
    views: '98K views',
    uploadedAt: '1 day ago',
    description: 'Firebase Genkit is a new open-source framework for building AI-powered apps. Let\'s build a RAG application with it.',
    category: 'Film',
  },
  {
    id: 'advanced-typescript',
    title: 'Advanced TypeScript Full Course',
    thumbnailId: 'thumbnail-advanced-typescript',
    duration: '5:10:30',
    channelName: 'freeCodeCamp.org',
    channelId: 'freecodecamp',
    views: '2.1M views',
    uploadedAt: '11 months ago',
    description: 'Take your TypeScript skills to the next level. Learn about generics, decorators, mapped types, and other advanced features.',
    category: 'Film',
  },
];
