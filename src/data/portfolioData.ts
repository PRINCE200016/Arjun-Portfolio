export interface Metric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  liveDemo?: string;
  aiHint?: string;
  featured?: boolean;
  purpose: string;
  problemSolved: string;
  keyFeatures: string[];
  architecture: string;
  metrics?: Metric[];
  details?: string[];
  role: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  tech: string[];
  responsibilities: string[];
}

export interface JourneyItem {
  id: string;
  title: string;
  institution: string;
  year: string;
  type: 'Work' | 'Training' | 'Education';
  details: string;
  tags?: string[];
  certificate?: string;
  actionLink?: {
    label: string;
    href: string;
  };
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: string[];
  featured?: boolean;
}

export const personalInfo = {
  name: "Arjun Rajawat",
  alias: "Prince Rajawat",
  age: "26-year-old developer",
  role: "Apps Script Developer | Java Full Stack Developer",
  currentLocation: "Bhopal, Madhya Pradesh, India",
  hometown: "Bhind, Madhya Pradesh, India",
  email: "arjunrajawat28@gmail.com",
  phone: "+91-7509245769",
  linkedin: "https://www.linkedin.com/in/arjunrajawat16",
  github: "https://github.com/PRINCE200016",
  summary: "26-year-old developer based in Bhopal with expertise in enterprise automation, Google Apps Script, Java Full Stack, Spring Boot, and high-performance financial & distributed systems."
};

export const journeyData: JourneyItem[] = [
  {
    id: "d-table-experience",
    title: "Apps Script Developer",
    institution: "D-Table Analytics, Bhopal",
    year: "July 2026 – Present",
    type: "Work",
    details: "Building and maintaining enterprise business applications with Google Apps Script, JavaScript, HTML, CSS, and Google Sheets APIs, including HRMS, Attendance Management, Order-to-Dispatch (O2D), Purchase FMS, Inventory Management, Sales FMS, ERP dashboards, and an Enterprise Task Consolidator & Automated Scheduling Engine.",
    tags: ["Google Apps Script", "JavaScript", "Google Sheets API", "ERP", "Workflow Automation"],
    actionLink: {
      label: "View full experience",
      href: "#experience"
    }
  },
  {
    id: "full-stack-java-course",
    title: "Full Stack Java Development Course",
    institution: "Online Platform",
    year: "2025",
    type: "Training",
    details: "Comprehensive course on full-stack Java development covering enterprise Spring Boot, REST APIs, and modern frontend integration.",
    certificate: "https://drive.google.com/file/d/1YPB0Sr2KnE_FMWs9aZn1iMfDSqhUzqTQ/view?usp=drive_link"
  },
  {
    id: "itrainu-training",
    title: "Java Full Stack Development Training",
    institution: "iTrainU Technologies, Indore",
    year: "Dec 2024",
    type: "Training",
    details: "Intensive training program focused on practical, hands-on project development with Java, Spring Boot, and databases. Awarded the Best Project Award among 80+ trainees.",
    certificate: "https://drive.google.com/file/d/1YPt7cdXp62X-8fw9hGuIVQtA45CAmSgg/view?usp=drive_link"
  },
  {
    id: "bsc-degree",
    title: "B.Sc. Computer Science",
    institution: "Jiwaji University, Gwalior",
    year: "2025",
    type: "Education",
    details: "Completed Bachelor's degree with a solid foundation in computer science fundamentals, data structures, algorithms, and database systems."
  },
  {
    id: "12th-grade",
    title: "12th Grade",
    institution: "Sadhana Vidya Niketan, Bhind, M.P",
    year: "2019",
    type: "Education",
    details: "Achieved 66% in senior secondary education with physics, chemistry, and mathematics."
  },
  {
    id: "10th-grade",
    title: "10th Grade",
    institution: "Scholars Public School, Bhind, M.P",
    year: "2017",
    type: "Education",
    details: "Secured a 7.0 CGPA in secondary school examinations."
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "d-table-analytics",
    role: "Apps Script Developer",
    company: "D-Table Analytics",
    duration: "July 2026 – Present",
    location: "Bhopal, Madhya Pradesh",
    tech: ["Google Apps Script", "JavaScript", "HTML", "CSS", "Google Sheets API"],
    responsibilities: [
      "Developed and maintained enterprise business applications using Google Apps Script, JavaScript, HTML, CSS, and Google Sheets APIs, implementing backend logic, frontend interfaces, workflow automation, and data-driven business processes.",
      "Designed and enhanced multiple enterprise systems including HRMS, Attendance Management, Order-to-Dispatch (O2D), Purchase FMS, Inventory Management System (IMS), Sales FMS, ERP Dashboards, and task automation platforms.",
      "Developed scalable backend workflows for data processing, CRUD operations, automated calculations, approval processes, scheduled tasks, notifications, reporting, and cross-system data synchronization.",
      "Implemented role-based authentication, authorization, session management, secure SSO, automatic login, and module-level access control across integrated enterprise applications.",
      "Built and optimized complex business workflows such as Purchase Orders, QC, inwarding, dispatch planning, inventory consumption, stock management, leave management, attendance processing, regularisation, and approval workflows.",
      "Integrated multiple applications and Google Sheets databases through API-based communication, automated data synchronization, triggers, and centralized ERP dashboards.",
      "Improved application performance by implementing batch data processing, caching, deferred loading, client-side pagination, search optimization, reduced server calls, and optimized spreadsheet operations.",
      "Developed responsive and user-friendly interfaces with dynamic dashboards, analytical tables, filters, search, pagination, skeleton loaders, responsive layouts, KPI cards, and real-time status indicators.",
      "Implemented automated PDF, Excel, CSV, and business report generation, including document storage, logging, filtering, and download/view functionality.",
      "Designed and implemented data migration and transformation processes, including multi-month attendance migration, data validation, historical data reconciliation, and database/sheet integrity checks.",
      "Diagnosed and resolved production issues involving authentication, session handling, data synchronization, workflow failures, UI rendering, incorrect calculations, data loss, performance bottlenecks, and integration errors.",
      "Implemented robust data validation and error-handling mechanisms to maintain data integrity and reliable transaction processing across business workflows.",
      "Worked closely with clients and internal stakeholders to understand business requirements, analyze existing workflows, translate requirements into technical solutions, conduct review meetings, perform testing, and deliver production-ready enhancements.",
      "Conducted end-to-end testing and debugging of enterprise applications, validating business logic, user access, workflow transitions, data accuracy, performance, and frontend/backend integration.",
      "Contributed to the development of an Enterprise Task Consolidator and Automated Scheduling Engine, consolidating operational data from multiple spreadsheets and automating recurring Daily, Weekly, and Monthly task schedules.",
      "Followed structured development practices for modular backend/frontend implementation, code optimization, reusable functions, security controls, maintainability, and production support."
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Java & Backend Engineering",
    description: "Core language and enterprise framework stack powering high-throughput, fault-tolerant systems.",
    iconName: "Coffee",
    featured: true,
    skills: [
      "Java 21",
      "Spring Boot",
      "Spring MVC",
      "Hibernate / JPA",
      "REST API Design",
      "ACID Transactions",
      "Idempotency",
      "Double-Entry Ledger Design",
      "Transactional Outbox Pattern",
      "Event-Driven Architecture",
      "Role-Based Access Control (RBAC)",
      "SSO & Session Management"
    ]
  },
  {
    title: "Google Apps Script & Enterprise Dev",
    description: "Full-stack enterprise automation using Google's ecosystem for ERP, HRMS, and workflow systems.",
    iconName: "Workflow",
    skills: [
      "Google Apps Script",
      "Google Sheets API",
      "Apps Script Web Apps",
      "Triggers & Scheduled Tasks",
      "HTML Service",
      "ERP / MIS Dashboards",
      "Workflow & Approval Automation",
      "HRMS / O2D / FMS / IMS Systems",
      "Batch Processing",
      "Data Migration & Reconciliation"
    ]
  },
  {
    title: "Databases & Messaging",
    description: "Relational, in-memory, and event-streaming data layers for scalable distributed systems.",
    iconName: "Database",
    skills: [
      "PostgreSQL 16",
      "MySQL",
      "Redis",
      "Apache Kafka",
      "HikariCP Connection Pooling",
      "Google Sheets as Database",
      "Query & Index Optimization",
      "Data Validation & Integrity"
    ]
  },
  {
    title: "Performance & Testing",
    description: "Load testing, concurrency benchmarking, and end-to-end quality assurance pipelines.",
    iconName: "Gauge",
    skills: [
      "K6 Load Testing",
      "Query & Index Optimization",
      "Connection Pooling",
      "Client-side Pagination",
      "Caching Strategies",
      "End-to-End Testing & Debugging",
      "Postman API Testing",
      "Production Debugging"
    ]
  },
  {
    title: "Frontend & Reporting",
    description: "Modern reactive UIs, dynamic dashboards, and automated business report generation.",
    iconName: "Layout",
    skills: [
      "React.js",
      "JavaScript (ES2022+)",
      "HTML5 & CSS3",
      "Responsive UI Design",
      "Dynamic Dashboards",
      "KPI Cards & Data Tables",
      "Skeleton Loaders",
      "PDF / Excel / CSV Report Generation"
    ]
  },
  {
    title: "Professional & Soft Skills",
    description: "Cross-functional collaboration, structured problem solving, and production ownership.",
    iconName: "Briefcase",
    skills: [
      "Requirement Analysis",
      "Client Communication",
      "Production Support",
      "Problem Solving",
      "Data Structures & Algorithms",
      "Git & GitHub",
      "Code Review & Maintainability",
      "Agile / Iterative Delivery"
    ]
  }
];

export const featuredSkills = [
  { name: "Java 21", icon: "Coffee" },
  { name: "Spring Boot", icon: "Leaf" },
  { name: "Google Apps Script", icon: "Workflow" },
  { name: "React.js", icon: "ReactIcon" },
  { name: "PostgreSQL 16", icon: "Database" },
  { name: "Apache Kafka", icon: "GitBranch" },
  { name: "Redis", icon: "Database" },
  { name: "REST APIs", icon: "Workflow" },
  { name: "JavaScript", icon: "JavascriptIcon" },
  { name: "Git & GitHub", icon: "GitBranch" },
  { name: "MySQL", icon: "Database" },
  { name: "Problem Solving", icon: "Bug" },
];

export const projectsData: ProjectItem[] = [
  {
    id: "hydrapay",
    title: "HydraPay — High-Throughput Financial Settlement & Double-Entry Ledger Engine",
    shortTitle: "HydraPay",
    description: "Fault-tolerant financial settlement engine with strict double-entry bookkeeping, 2-tier distributed idempotency, and a Transactional Outbox + Kafka pipeline — load-tested to 10,482 TPS at 13.4 ms P99 latency.",
    image: "/images/hydrapay.png",
    tech: ["Java 21", "Spring Boot", "PostgreSQL 16", "Redis", "Apache Kafka", "HikariCP", "K6"],
    github: "https://github.com/PRINCE200016/HydraPay.git",
    aiHint: "financial ledger architecture",
    featured: true,
    role: "Lead Architect & Backend Engineer",
    purpose: "Provide a zero-data-loss, high-concurrency financial ledger and settlement pipeline capable of safely handling thousands of simultaneous payments without double debits or race conditions.",
    problemSolved: "Eliminates race conditions, duplicate transactions during network timeouts, database deadlocks under high transfer loads, and out-of-order event publishing in distributed payment microservices.",
    keyFeatures: [
      "Strict double-entry bookkeeping ensuring debits equal credits on every transaction",
      "2-tier distributed idempotency layer (Redis SETNX + PostgreSQL unique constraints)",
      "Transactional Outbox pattern with Debezium/Kafka integration for zero-loss message publishing",
      "Deterministic pessimistic locking (SELECT FOR UPDATE) ordered by account ID to prevent deadlocks",
      "Automated K6 distributed load testing suite benchmarking real-world concurrency"
    ],
    architecture: "Spring Boot service layer with transactional boundaries, HikariCP connection pooling, PostgreSQL 16 schema with check constraints, Redis cache for millisecond lock checks, and Apache Kafka for asynchronous downstream settlement.",
    metrics: [
      { label: "Throughput", value: "10,482 TPS" },
      { label: "P99 Latency", value: "13.4 ms" },
      { label: "Double Debits", value: "0 Failures" },
      { label: "DB Deadlocks", value: "0 Deadlocks" },
    ],
    details: [
      "Engineered a fault-tolerant financial settlement engine using ACID transactions, strict double-entry bookkeeping, and deterministic SELECT FOR UPDATE account locking, preventing balance inconsistencies and database deadlocks under concurrent transfers.",
      "Implemented 2-tier distributed idempotency with Redis SETNX fast-locking and PostgreSQL unique constraints, protecting against duplicate client retries and double-debit scenarios during network failures and cache outages.",
      "Built a Transactional Outbox + Kafka event pipeline for reliable asynchronous settlement events; optimized PostgreSQL indexing and connection pooling and validated the architecture with simulated load tests reaching 10,482 TPS, 13.4 ms P99 latency, 0 double-debit failures, and 0 database deadlocks."
    ]
  },
  {
    id: "ai-chatbot",
    title: "AI Chatbot",
    shortTitle: "AI Chatbot",
    description: "A full-stack application featuring text and voice input, using REST APIs for smooth communication with OpenAI.",
    image: "/images/AI-chatbot.png",
    tech: ["Spring Boot", "Supabase", "Database", "React.js", "OpenAI API"],
    github: "https://github.com/PRINCE200016/chatbot-avis.git",
    liveDemo: "https://huggingface.co/spaces/Arjunrajawat/Jarvis",
    aiHint: "AI robot",
    role: "Full Stack Developer",
    purpose: "Offer a multimodal interactive AI assistant with natural language understanding and voice interaction capabilities.",
    problemSolved: "Enables hands-free voice search and seamless conversation streaming with low response latency.",
    keyFeatures: [
      "Voice and text dual-mode input and response streaming",
      "Spring Boot backend gateway with rate limiting and secure API proxying",
      "Supabase database integration for conversation logging and history persistence",
      "Modern React UI with real-time audio wave feedback"
    ],
    architecture: "React.js frontend communicating via REST endpoints to a Spring Boot service layer, backed by Supabase and OpenAI API."
  },
  {
    id: "ai-travel-planner",
    title: "AI-Powered Travel Planner",
    shortTitle: "TripMind AI",
    description: "An intelligent travel planning web application that generates personalized trip recommendations based on budget, duration, and user preferences. Includes smart constraint validation, cost estimation, and dynamic destination filtering for accurate results.",
    image: "/images/AI-travel-Planner.png",
    tech: ["Java", "Spring Boot", "Supabase", "Database", "REST APIs", "JavaScript", "HTML", "CSS"],
    github: "https://github.com/PRINCE200016/travelai.git",
    liveDemo: "https://tripmind-ai.vercel.app",
    aiHint: "travel planning AI",
    role: "Full Stack Developer",
    purpose: "Help travelers generate end-to-end customized itineraries with realistic cost breakdowns and activity scheduling.",
    problemSolved: "Solves the cognitive overload of vacation planning by automating budget calculations, travel schedules, and lodging recommendations according to user constraints.",
    keyFeatures: [
      "Constraint-aware itinerary generation tailored to exact budgets",
      "Dynamic destination filtering with geographical clustering",
      "Interactive cost breakdown and timeline visualization",
      "Responsive user interface built with clean mobile-first ergonomics"
    ],
    architecture: "Java & Spring Boot backend logic managing destination catalogs, Supabase for trip storage, and responsive client frontend."
  },
  {
    id: "weather-web",
    title: "Weather Web Application",
    shortTitle: "Weather Web",
    description: "A web app that provides real-time weather data, featuring asynchronous data fetching and error handling.",
    image: "/images/Weather web.png",
    tech: ["JavaScript", "OpenWeather API"],
    github: "https://github.com/PRINCE200016/Weather-web.git",
    liveDemo: "https://weather-web-theta-mocha.vercel.app/",
    aiHint: "weather forecast",
    role: "Frontend Developer",
    purpose: "Deliver live weather forecasts, temperature trends, humidity metrics, and atmospheric conditions globally.",
    problemSolved: "Provides fast, lightweight weather lookup without bulky page loads, featuring resilient error handling for bad inputs or network failures.",
    keyFeatures: [
      "Live city-based search with real-time temperature and condition reports",
      "Asynchronous fetch with promise-based network recovery",
      "Visual indicators representing temperature, wind speed, and humidity",
      "Fast response time with client-side caching"
    ],
    architecture: "Lightweight Vanilla JavaScript application with asynchronous API integration with OpenWeather."
  },
  {
    id: "garden-view-resort",
    title: "Garden View Resort Website",
    shortTitle: "Garden View Resort",
    description: "A responsive and visually appealing resort website showcasing amenities, services, and booking details. Designed with modern UI principles and smooth navigation for an engaging user experience.",
    image: "/images/Garden view Resort.png",
    tech: ["Java", "React", "Supabase", "Database", "JavaScript", "Spring Boot", "HTML", "CSS", "Bootstrap"],
    github: "https://github.com/PRINCE200016/Garden-View.git",
    liveDemo: "https://garden-view-resort.vercel.app",
    aiHint: "resort website",
    role: "Full Stack Developer",
    purpose: "Provide an attractive hospitality portal for guests to explore resort suites, banquet amenities, and submit booking requests.",
    problemSolved: "Enhances customer conversion and booking inquiry workflows for hospitality businesses with a high-fidelity visual experience.",
    keyFeatures: [
      "Interactive room catalog with gallery views and amenity lists",
      "Booking inquiry submission with validation and backend notification",
      "Dynamic pricing display and seasonal discount highlights",
      "Fully responsive across smartphones, tablets, and desktops"
    ],
    architecture: "React frontend integrated with Spring Boot services and Supabase database for inquiry management."
  }
];

export const suggestedQuestions = [
  "What does Arjun do at D-Table Analytics?",
  "Tell me about HydraPay",
  "What are Arjun's top skills?",
  "Show me his projects",
  "What is his educational background?",
  "How can I contact Arjun?"
];

export const getContextForChatbot = (): string => {
  return `
You are the official AI Assistant for Arjun Rajawat (also known as Prince Rajawat).
Arjun is a 26-year-old software developer based in Bhopal, Madhya Pradesh, India.

## Professional Profile
- Name: ${personalInfo.name} (${personalInfo.alias})
- Age & Location: 26-year-old developer based in Bhopal, Madhya Pradesh, India (Hometown: Bhind, MP)
- Current Position: Apps Script Developer at D-Table Analytics, Bhopal (July 2026 – Present)
- Core Specialization: Enterprise business applications, Google Apps Script, Java Full Stack, Spring Boot, high-throughput distributed systems, databases & APIs.
- Contact: Email: ${personalInfo.email} | Phone: ${personalInfo.phone} | LinkedIn: ${personalInfo.linkedin} | GitHub: ${personalInfo.github}

## My Journey (Career & Academics)
1. Apps Script Developer at D-Table Analytics, Bhopal (July 2026 – Present) [Work Experience]
   - Building and maintaining enterprise applications: HRMS, Attendance, Order-to-Dispatch (O2D), Purchase FMS, Inventory Management, Sales FMS, ERP Dashboards, and Task Consolidator Engine.
2. Full Stack Java Development Course – Online Platform (2025) [Training]
3. Java Full Stack Development Training – iTrainU Technologies, Indore (Dec 2024) [Training]
   - Awarded the "Best Project Award" among 80+ trainees!
4. B.Sc. Computer Science – Jiwaji University, Gwalior (2025) [Education]
5. 12th Grade – Sadhana Vidya Niketan, Bhind, M.P (2019) – 66% [Education]
6. 10th Grade – Scholars Public School, Bhind, M.P (2017) – 7.0 CGPA [Education]

## Experience at D-Table Analytics (Bhopal, July 2026 – Present)
- Role: Apps Script Developer
- Key Systems: HRMS, Attendance Management, Order-to-Dispatch (O2D), Purchase FMS, Inventory Management System (IMS), Sales FMS, ERP Dashboards, Task Consolidator & Automated Scheduling Engine.
- Key Contributions:
  - Scalable backend workflows for automated calculations, approval processes, scheduled tasks, and cross-system data synchronization.
  - Role-based authentication (RBAC), SSO, and module access control.
  - Performance tuning with batch processing, caching, deferred loading, client-side pagination, and spreadsheet operation optimization.
  - Automated PDF/Excel/CSV business report generation.
  - Multi-month attendance data migration, reconciliation, and integrity checks.
  - Production debugging, client communication, and requirement analysis.

## Key Projects
1. HydraPay — High-Throughput Financial Settlement & Double-Entry Ledger Engine
   - Role: Lead Architect & Backend Engineer
   - Tech: Java 21, Spring Boot, PostgreSQL 16, Redis, Apache Kafka, HikariCP, K6
   - Metrics: 10,482 TPS, 13.4 ms P99 latency, 0 double-debit failures, 0 database deadlocks under high concurrency.
   - Purpose & Problem: Prevents balance inconsistencies, double-debits, and database deadlocks in concurrent money transfers.
   - Architecture: ACID transactions, strict double-entry ledger, deterministic SELECT FOR UPDATE account locking, 2-tier distributed idempotency (Redis SETNX + PostgreSQL unique constraints), and Transactional Outbox pattern with Kafka.
   - GitHub: https://github.com/PRINCE200016/HydraPay.git

2. AI Chatbot
   - Tech: Spring Boot, Supabase, React.js, OpenAI API
   - Features: Multimodal text and voice input with real-time response streaming.
   - GitHub: https://github.com/PRINCE200016/chatbot-avis.git | Live: https://huggingface.co/spaces/Arjunrajawat/Jarvis

3. AI-Powered Travel Planner (TripMind AI)
   - Tech: Java, Spring Boot, Supabase, React, REST APIs
   - Features: Personalized trip itineraries with budget constraint validation and cost estimation.
   - GitHub: https://github.com/PRINCE200016/travelai.git | Live: https://tripmind-ai.vercel.app

4. Weather Web Application
   - Tech: JavaScript, OpenWeather API
   - Features: Asynchronous weather forecasting and real-time updates.
   - GitHub: https://github.com/PRINCE200016/Weather-web.git | Live: https://weather-web-theta-mocha.vercel.app/

5. Garden View Resort Website
   - Tech: Java, React, Spring Boot, Supabase, Bootstrap
   - Features: Resort showcase and suite booking inquiry management.
   - GitHub: https://github.com/PRINCE200016/Garden-View.git | Live: https://garden-view-resort.vercel.app

## Skills Overview
- Java & Backend Engineering (Core Stack): Java 21, Spring Boot, Spring MVC, Hibernate / JPA, REST API Design, ACID Transactions, Idempotency, Double-Entry Ledger Design, Transactional Outbox Pattern, Event-Driven Architecture, RBAC, SSO & Session Management.
- Google Apps Script & Enterprise Dev: Google Apps Script, Google Sheets API, Apps Script Web Apps, Triggers & Scheduled Tasks, HTML Service, ERP / MIS Dashboards, Workflow & Approval Automation, HRMS / O2D / FMS / IMS Systems, Batch Processing, Data Migration & Reconciliation.
- Databases & Messaging: PostgreSQL 16, MySQL, Redis, Apache Kafka, HikariCP Connection Pooling, Google Sheets as Database, Query & Index Optimization, Data Validation & Integrity.
- Performance & Testing: K6 Load Testing, Connection Pooling, Client-side Pagination, Caching Strategies, End-to-End Testing & Debugging, Postman API Testing, Production Debugging.
- Frontend & Reporting: React.js, JavaScript (ES2022+), HTML5 & CSS3, Responsive UI Design, Dynamic Dashboards, KPI Cards & Data Tables, Skeleton Loaders, PDF / Excel / CSV Report Generation.
- Professional & Soft Skills: Requirement Analysis, Client Communication, Production Support, Problem Solving, Data Structures & Algorithms, Git & GitHub, Code Review & Maintainability, Agile / Iterative Delivery.

## Behavior Rules
1. Answer conversationally and accurately in the user's language (English, Hindi, or Hinglish).
2. Never invent facts. If something is unknown, politely suggest contacting Arjun directly at arjunrajawat28@gmail.com or via the Contact section.
3. Provide GitHub and live demo links when discussing projects.
4. Keep answers concise by default, and provide detailed technical depth when asked.
`;
};
