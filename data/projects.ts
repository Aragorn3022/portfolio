export type Project = {
  name: string;
  description: string;
  tech: string[];
  dot: string;
  href?: string;
};

export const projects: Project[] = [
  {
    name: "OpenRGB-Custom",
    description:
      "Custom build of OpenRGB — one app to control RGB lighting hardware from every vendor, on Windows, Linux and macOS, no manufacturer software required.",
    tech: ["C++", "Qt", "Cross-platform"],
    dot: "#f34b7d",
    href: "https://github.com/Aragorn3022/OpenRGB-Custom",
  },
  {
    name: "Thread.AI",
    description:
      "AI-native Revenue Operating System. Classifies inbound email, updates the CRM, and queues follow-ups automatically — Stripe and HubSpot wired in.",
    tech: ["Django REST", "React", "TypeScript"],
    dot: "#3178c6",
    href: "https://github.com/Aragorn3022/Thread.AI",
  },
  {
    name: "RaziqBot",
    description:
      "WhatsApp-first AI finance assistant for an industrial ERP. Answers questions on sales, OPEX, P&L and receivables in plain language, and generates PDF reports and payment reminders on demand.",
    tech: ["Django", "WhatsApp API", "RAG"],
    dot: "#3572A5",
    href: "https://github.com/Aragorn3022/RaziqBot",
  },
  {
    name: "Break Records",
    description:
      "Finds a movie or drama clip, writes short dialogue captions with Claude, and renders a ready-to-post vertical MP4 with FFmpeg — uploads straight to Google Drive.",
    tech: ["Python", "Claude API", "FFmpeg"],
    dot: "#3572A5",
    href: "https://github.com/Aragorn3022/BreakRecords---PoC",
  },
  {
    name: "bp-modshield",
    description:
      "Moderation bot for a subreddit built on Reddit's Devvit framework: blacklist filtering, auto spam restoration, an escalating warning/ban system, rumor-flair detection.",
    tech: ["TypeScript", "Devvit", "Reddit API"],
    dot: "#3178c6",
    href: "https://github.com/Aragorn3022/bp-modshield",
  },
  {
    name: "BarcodeScanner",
    description:
      "Barcode-based attendance tracking system — scan a badge, mark attendance, done. Deployed on Render.",
    tech: ["Python", "Attendance", "Render"],
    dot: "#3572A5",
    href: "https://github.com/Aragorn3022/BarcodeScanner",
  },
  {
    name: "Hackathon Starter (Django)",
    description:
      "Django + WebSocket starter kit built specifically to bootstrap hackathon projects fast — reused as the base for multiple hackathon builds.",
    tech: ["Django", "WebSockets", "Template"],
    dot: "#3572A5",
    href: "https://github.com/Aragorn3022/HackathonStarterTemplateInDjango",
  },
  {
    name: "YTAppBackEnd",
    description: "Django backend for a YouTube search & download app, built on yt-dlp.",
    tech: ["Django", "yt-dlp"],
    dot: "#3572A5",
    href: "https://github.com/Aragorn3022/YTAppBackEnd",
  },
  {
    name: "Ecommerce-API",
    description:
      "REST API for an e-commerce platform — JWT auth, product catalog, cart, checkout, order tracking.",
    tech: ["Django REST", "JWT", "MySQL"],
    dot: "#3572A5",
    href: "https://github.com/Aragorn3022/Ecommerce-API",
  },
  {
    name: "Ecommerce-Frontend",
    description: "Next.js storefront that talks to Ecommerce-API — browsing, cart, checkout.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    dot: "#3178c6",
    href: "https://github.com/Aragorn3022/Ecommerce-Frontend",
  },
  {
    name: "Java Spring Chat",
    description: "Real-time chat application over WebSocket, built with Java Spring.",
    tech: ["Java", "Spring", "WebSocket"],
    dot: "#b07219",
    href: "https://github.com/Aragorn3022/Java-Spting-Chat-Apllication-via-Web-Socket",
  },
  {
    name: "Carbon",
    description:
      "Carbon-credit marketplace POC for Punjab: persona-based flows for owners, developers, aggregators, reviewers, government and buyers, an interactive district map, and a review workflow with a full audit trail.",
    tech: ["Django REST", "React", "Recharts"],
    dot: "#3572A5",
  },
  {
    name: "WhatsApp-Bot-Kohat-Cement",
    description: "WhatsApp bot that pushes live cement price/rate updates to customers automatically.",
    tech: ["React", "Node.js", "WhatsApp API"],
    dot: "#3178c6",
  },
];
