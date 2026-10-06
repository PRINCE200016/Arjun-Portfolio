// ─── Project Gallery Data ───────────────────────────────────────────
// Canonical source for the 3D Projects Gallery and Case Study Modals

export interface GalleryTag {
  label: string;
  color: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  image: string;
  tags: GalleryTag[];
  role?: string;
  purpose?: string;
  problemSolved?: string;
  architecture?: string;
  liveUrl?: string;
  githubUrl?: string;
  metrics?: { label: string; value: string }[];
  keyFeatures?: string[];
  details?: string[];
}

export const galleryProjects: GalleryProject[] = [
  {
    id: 'hydrapay',
    title: 'HydraPay — High-Throughput Financial Settlement & Double-Entry Ledger Engine',
    shortTitle: 'HydraPay',
    role: 'Lead Architect & Backend Engineer',
    purpose: 'Provide a zero-data-loss, high-concurrency financial ledger and settlement pipeline capable of safely handling thousands of simultaneous payments without double debits or race conditions.',
    problemSolved: 'Eliminates race conditions, duplicate transactions during network timeouts, database deadlocks under high transfer loads, and out-of-order event publishing in distributed payment microservices.',
    description: 'Fault-tolerant financial settlement engine with strict double-entry bookkeeping, 2-tier distributed idempotency, and a Transactional Outbox + Kafka pipeline — load-tested to 10,482 TPS at 13.4 ms P99 latency.',
    longDescription: 'HydraPay is a production-grade financial settlement engine engineered for zero data loss and extreme concurrency. It implements strict double-entry bookkeeping, 2-tier distributed idempotency (Redis SETNX + PostgreSQL unique constraints), deterministic pessimistic locking to prevent deadlocks, and a Transactional Outbox + Kafka pipeline for reliable async event publishing. Load-tested to 10,482 TPS at 13.4 ms P99 latency with 0 double-debit failures.',
    architecture: 'Spring Boot 3 service layer with strict transactional boundaries, HikariCP connection pooling, PostgreSQL 16 schema with check constraints and ACID guarantees, Redis cache for millisecond lock checks, and Apache Kafka for asynchronous downstream settlement events.',
    image: '/images/hydrapay.png',
    tags: [
      { label: 'Java 21', color: '#F8981D' },
      { label: 'Spring Boot', color: '#68BD45' },
      { label: 'PostgreSQL 16', color: '#336791' },
      { label: 'Redis', color: '#DC382D' },
      { label: 'Apache Kafka', color: '#FFFFFF' },
      { label: 'HikariCP', color: '#19C3B1' },
      { label: 'K6 Benchmarking', color: '#7D64FF' },
    ],
    githubUrl: 'https://github.com/PRINCE200016/HydraPay.git',
    metrics: [
      { label: 'Throughput', value: '10,482 TPS' },
      { label: 'P99 Latency', value: '13.4 ms' },
      { label: 'Double Debits', value: '0 Failures' },
      { label: 'DB Deadlocks', value: '0 Deadlocks' },
    ],
    keyFeatures: [
      'Strict double-entry bookkeeping ensuring debits equal credits on every transaction',
      '2-tier distributed idempotency layer (Redis SETNX + PostgreSQL unique constraints)',
      'Transactional Outbox pattern with Debezium/Kafka integration for zero-loss message publishing',
      'Deterministic pessimistic locking (SELECT FOR UPDATE) ordered by account ID to prevent deadlocks',
      'Automated K6 distributed load testing suite benchmarking real-world high concurrency',
    ],
    details: [
      'Engineered a fault-tolerant financial settlement engine using ACID transactions, strict double-entry bookkeeping, and deterministic SELECT FOR UPDATE account locking, preventing balance inconsistencies and database deadlocks under concurrent transfers.',
      'Implemented 2-tier distributed idempotency with Redis SETNX fast-locking and PostgreSQL unique constraints, protecting against duplicate client retries and double-debit scenarios during network failures and cache outages.',
      'Built a Transactional Outbox + Kafka event pipeline for reliable asynchronous settlement events; optimized PostgreSQL indexing and connection pooling and validated the architecture with simulated load tests reaching 10,482 TPS, 13.4 ms P99 latency, 0 double-debit failures, and 0 database deadlocks.',
    ],
  },
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot — Multimodal Voice & Text Assistant',
    shortTitle: 'AI Chatbot',
    role: 'Full Stack Developer',
    purpose: 'Offer a multimodal interactive AI assistant with natural language understanding, real-time voice streaming, and persistent conversation context.',
    problemSolved: 'Enables hands-free voice search and seamless conversation streaming with low response latency, rate-limited proxy security, and secure API key management.',
    description: 'Full-stack AI assistant featuring text and voice input, powered by OpenAI with a Spring Boot gateway and real-time audio wave feedback.',
    longDescription: 'A full-stack multimodal AI assistant with both text and voice input modes. Built a Spring Boot backend gateway with rate limiting and secure API proxying to OpenAI. Supabase stores conversation history and contextual threads. The React frontend renders real-time audio wave feedback during voice recognition. Streamed server responses for low perceived latency.',
    architecture: 'React.js frontend with Web Audio API for audio wave rendering, communicating via REST endpoints to a Spring Boot service layer, backed by Supabase PostgreSQL and OpenAI API streaming.',
    image: '/images/AI-chatbot.png',
    tags: [
      { label: 'Spring Boot', color: '#68BD45' },
      { label: 'React.js', color: '#61DAFB' },
      { label: 'OpenAI API', color: '#FFFFFF' },
      { label: 'Supabase', color: '#3ECF8E' },
      { label: 'Web Audio API', color: '#F7DF1E' },
    ],
    githubUrl: 'https://github.com/PRINCE200016/chatbot-avis.git',
    liveUrl: 'https://huggingface.co/spaces/Arjunrajawat/Jarvis',
    metrics: [
      { label: 'Input Modes', value: 'Voice + Text' },
      { label: 'Streaming', value: 'Real-Time' },
      { label: 'Gateway', value: 'Spring Boot' },
      { label: 'Context Storage', value: 'Supabase' },
    ],
    keyFeatures: [
      'Voice and text dual-mode input with streaming low-latency responses',
      'Spring Boot backend gateway with rate limiting and secure API proxying',
      'Supabase database integration for conversation logging and history persistence',
      'Modern React UI with real-time audio wave feedback visualization',
      'Token tracking and graceful error recovery on network drops',
    ],
    details: [
      'Architected a resilient proxy layer in Spring Boot to hide OpenAI credentials and enforce per-IP rate limits.',
      'Designed real-time audio visualizer in React using the Web Audio API for live acoustic feedback during voice dictation.',
      'Configured Supabase for fast JSON conversation storage and retrieval with indexing on user sessions.',
    ],
  },
  {
    id: 'ai-travel-planner',
    title: 'TripMind AI — Constraint-Aware Intelligent Itinerary Engine',
    shortTitle: 'TripMind AI',
    role: 'Full Stack Developer',
    purpose: 'Help travelers generate end-to-end customized itineraries with realistic cost breakdowns, constraint validations, and dynamic activity scheduling.',
    problemSolved: 'Solves the cognitive overload of vacation planning by automating budget calculations, travel schedules, and lodging recommendations tailored to strict user constraints.',
    description: 'Intelligent travel planning web app that generates personalized itineraries based on budget, duration, and user preferences with smart constraint validation.',
    longDescription: 'TripMind AI automates the cognitive overload of vacation planning. Users specify their budget, duration, and preferences; the system generates a constraint-aware, end-to-end itinerary with realistic cost breakdowns, activity scheduling, and dynamic destination filtering. Built with a Java/Spring Boot backend and responsive frontend.',
    architecture: 'Java & Spring Boot backend logic managing destination catalogs, Supabase for trip persistence, and a responsive client frontend with cost breakdown graphs.',
    image: '/images/AI-travel-Planner.png',
    tags: [
      { label: 'Java', color: '#F8981D' },
      { label: 'Spring Boot', color: '#68BD45' },
      { label: 'JavaScript', color: '#F7DF1E' },
      { label: 'Supabase', color: '#3ECF8E' },
      { label: 'HTML5 & CSS3', color: '#F16529' },
    ],
    githubUrl: 'https://github.com/PRINCE200016/travelai.git',
    liveUrl: 'https://tripmind-ai.vercel.app',
    metrics: [
      { label: 'Budget Precision', value: '100% Constrained' },
      { label: 'Generation Time', value: '< 2.5s' },
      { label: 'Device Support', value: 'Mobile First' },
      { label: 'Persistence', value: 'Supabase DB' },
    ],
    keyFeatures: [
      'Constraint-aware itinerary generation tailored to exact financial budgets',
      'Dynamic destination filtering with geographical clustering and weather awareness',
      'Interactive cost breakdown and timeline visualization',
      'Responsive user interface built with clean mobile-first ergonomics',
      'Shareable itinerary links and exportable trip summaries',
    ],
    details: [
      'Engineered constraint validation algorithms that eliminate impossible flight/hotel cost combinations.',
      'Built a database schema in Supabase with normalized destination and activity models.',
      'Designed a smooth timeline view allowing users to tweak stops with instant recalculation.',
    ],
  },
  {
    id: 'weather-web',
    title: 'SkyCast — Global Weather Intelligence & Forecasting Engine',
    shortTitle: 'SkyCast',
    role: 'Frontend Developer',
    purpose: 'Deliver live weather forecasts, temperature trends, humidity metrics, and atmospheric conditions globally with instant responsiveness.',
    problemSolved: 'Provides fast, lightweight weather lookup without bulky page loads, featuring resilient promise-based error handling for bad inputs or network failures.',
    description: 'Premium weather intelligence app delivering real-time data, forecasts, and atmospheric conditions globally with fast async fetching and resilient error handling.',
    longDescription: 'SkyCast is a fast, lightweight weather intelligence application. It fetches live weather data asynchronously from OpenWeather API with promise-based network recovery and client-side caching. Displays temperature, wind speed, humidity, and forecast data with visual indicators. Designed for speed, ergonomics, and resilience.',
    architecture: 'Lightweight JavaScript application utilizing modern asynchronous fetch pipelines, client-side caching, and responsive CSS UI.',
    image: '/images/Weather web.png',
    tags: [
      { label: 'JavaScript ES6+', color: '#F7DF1E' },
      { label: 'OpenWeather API', color: '#EB6E4B' },
      { label: 'HTML5 & CSS3', color: '#F16529' },
      { label: 'Async Caching', color: '#19C3B1' },
    ],
    githubUrl: 'https://github.com/PRINCE200016/Weather-web.git',
    liveUrl: 'https://weather-web-theta-mocha.vercel.app/',
    metrics: [
      { label: 'Global Cities', value: '200,000+' },
      { label: 'Fetch Latency', value: '< 250ms' },
      { label: 'Cache Strategy', value: 'Client Stored' },
      { label: 'Availability', value: '99.9%' },
    ],
    keyFeatures: [
      'Live city-based search with real-time temperature and condition reports',
      'Asynchronous fetch with promise-based network recovery and retry mechanisms',
      'Visual atmospheric indicators representing temperature, wind speed, UV, and humidity',
      'Fast response time with client-side caching of recent searches',
      'Geographical auto-detection with fallback search handling',
    ],
    details: [
      'Integrated OpenWeather API with optimized JSON payload parsing and dynamic weather icons.',
      'Implemented debounced city search inputs to avoid unnecessary API rate limit exhaustion.',
      'Crafted custom CSS atmospheric widgets matching day/night conditions dynamically.',
    ],
  },
  {
    id: 'garden-view-resort',
    title: 'Garden View Resort — Luxury Hospitality & Booking Portal',
    shortTitle: 'Garden View Resort',
    role: 'Full Stack Developer',
    purpose: 'Provide an attractive, high-converting hospitality portal for guests to explore resort suites, banquet amenities, and submit booking inquiries.',
    problemSolved: 'Enhances customer conversion and booking inquiry workflows for hospitality businesses with a high-fidelity visual experience and automated backend notifications.',
    description: 'Responsive resort website showcasing amenities, services, and booking details — designed with modern UI principles and smooth navigation.',
    longDescription: 'A high-fidelity hospitality portal for Garden View Resort. Features an interactive room catalog with gallery views, booking inquiry submission with backend validation and notification, dynamic pricing display, and seasonal discount highlights. Built with React, Spring Boot, and Supabase, fully responsive across all devices.',
    architecture: 'React frontend integrated with Spring Boot services and Supabase database for inquiry management and booking request processing.',
    image: '/images/Garden view Resort.png',
    tags: [
      { label: 'React.js', color: '#61DAFB' },
      { label: 'Spring Boot', color: '#68BD45' },
      { label: 'Java', color: '#F8981D' },
      { label: 'Supabase', color: '#3ECF8E' },
      { label: 'Bootstrap 5', color: '#7952B3' },
      { label: 'CSS3', color: '#379AD6' },
    ],
    githubUrl: 'https://github.com/PRINCE200016/Garden-View.git',
    liveUrl: 'https://garden-view-resort.vercel.app',
    metrics: [
      { label: 'Catalog Rooms', value: 'Interactive' },
      { label: 'Form Validation', value: 'Real-Time' },
      { label: 'Responsiveness', value: '100% Mobile' },
      { label: 'Notification', value: 'Instant Email' },
    ],
    keyFeatures: [
      'Interactive room catalog with high-resolution photo galleries and amenity checklists',
      'Booking inquiry submission with client-side validation and backend email notifications',
      'Dynamic pricing display and seasonal promotional discount highlights',
      'Fully responsive across smartphones, tablets, laptops, and ultra-wide desktops',
      'Location maps, banquet hall showcase, and customer testimonial sliders',
    ],
    details: [
      'Designed responsive UI cards with lightbox photo previewing for luxury suites.',
      'Created Spring Boot REST endpoints to capture and validate reservation leads.',
      'Connected Supabase tables with automated timestamps and inquiry tracking statuses.',
    ],
  },
];
