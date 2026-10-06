const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '..', 'src', 'i18n');

// 1. English
const en = {
  loading: {
    title: "ARJUN RAJAWAT",
    status: ["INITIALIZING ENVIRONMENT", "LOADING ASSETS", "BUILDING SCENE", "CONNECTING SYSTEMS", "READY"]
  },
  entry: {
    name: "ARJUN RAJAWAT",
    role: "JAVA FULL STACK DEVELOPER",
    status: "SYSTEM READY",
    enter: "ENTER PORTFOLIO",
    soundOn: "◉ SOUND ON",
    soundOff: "◎ ENABLE SOUND",
    chooseLang: "CHOOSE LANGUAGE",
    selectLang: "Select your preferred language",
    continue: "CONTINUE →",
    change: "change"
  },
  privacy: {
    message: "By continuing to use this site, you agree to our",
    policy: "Privacy Policy",
    accept: "ACCEPT"
  },
  nav: {
    home: "HOME",
    about: "ABOUT",
    skills: "SERVICES",
    experience: "EXPERIENCE",
    projects: "PROJECTS",
    contact: "CONTACT",
    engineerBadge: "ENGINEER"
  },
  home: {
    greeting: "JAVA FULL STACK DEVELOPER",
    roles: ["JAVA FULL STACK DEVELOPER", "BACKEND ENGINEER", "SOFTWARE ENGINEER", "ENTERPRISE AUTOMATION"],
    viewProjects: "VIEW PROJECTS",
    downloadResume: "DOWNLOAD RESUME",
    contactMe: "LET'S BUILD SOMETHING"
  },
  about: {
    station: "02 — ABOUT",
    heading: "ABOUT ME",
    intellectLabel: "INTELLECT & ARCHITECTURE",
    bio: "Hello, I am Arjun Rajawat, a Java Full Stack Developer and enterprise automation engineer. I specialize in building fault-tolerant architectures, Google Apps Script systems, Spring Boot microservices, and robust database layers with zero data loss. Explore my projects in this portfolio or on my GitHub. If you are looking for an experienced developer, connect with me via email, phone, or LinkedIn.",
    tabTimeline: "EDUCATION & TIMELINE",
    tabSkills: "SKILLS & EXPERTISE",
    howIBuild: "HOW I BUILD",
    viewFullExperience: "View full experience",
    verifiedCertificate: "Verified Certificate",
    principles: [
      "Fault-tolerant systems with zero data loss",
      "ACID transactions and strict double-entry bookkeeping",
      "Event-driven architectures for scalability",
      "Production debugging and performance tuning",
      "Clean, modular, maintainable code"
    ],
    journey: [
      {
        id: "d-table-experience",
        year: "July 2026 – Present",
        title: "Apps Script Developer",
        institution: "D-Table Analytics, Bhopal",
        type: "Work",
        details: "Building and maintaining enterprise business applications with Google Apps Script, JavaScript, HTML, CSS, and Google Sheets APIs, including HRMS, Attendance Management, Order-to-Dispatch (O2D), Purchase FMS, Inventory Management, Sales FMS, ERP dashboards, and an Enterprise Task Consolidator & Automated Scheduling Engine."
      },
      {
        id: "full-stack-java-course",
        year: "2025",
        title: "Full Stack Java Development Course",
        institution: "Online Platform",
        type: "Training",
        details: "Comprehensive course on full-stack Java development covering enterprise Spring Boot, REST APIs, and modern frontend integration."
      },
      {
        id: "itrainu-training",
        year: "Dec 2024",
        title: "Java Full Stack Development Training",
        institution: "iTrainU Technologies, Indore",
        type: "Training",
        details: "Enterprise Java, Spring Boot, microservices architecture, and awarded the 'Best Project Award' among 80+ trainees."
      },
      {
        id: "jiwaji-bsc",
        year: "2025",
        title: "B.Sc. in Computer Science",
        institution: "Jiwaji University, Gwalior",
        type: "Education",
        details: "Bachelor of Science in Computer Science focusing on data structures, algorithms, operating systems, and database systems."
      },
      {
        id: "12th-grade",
        year: "2019",
        title: "Higher Secondary (12th Grade)",
        institution: "Sadhana Vidya Niketan, Bhind, M.P.",
        type: "Education",
        details: "Completed higher secondary education in Mathematics and Science with 66%."
      },
      {
        id: "10th-grade",
        year: "2017",
        title: "Secondary School (10th Grade)",
        institution: "Scholars Public School, Bhind, M.P.",
        type: "Education",
        details: "Secured 7.0 CGPA in secondary school examinations."
      }
    ],
    skillCategories: [
      {
        title: "Java & Backend Engineering",
        description: "Core language and enterprise framework stack powering high-throughput, fault-tolerant systems.",
        skills: ["Java 21", "Spring Boot", "Spring MVC", "Hibernate / JPA", "REST API Design", "ACID Transactions", "Idempotency", "Double-Entry Ledger Design", "Transactional Outbox Pattern", "Event-Driven Architecture", "Role-Based Access Control (RBAC)", "SSO & Session Management"]
      },
      {
        title: "Google Apps Script & Enterprise Dev",
        description: "Full-stack enterprise automation using Google's ecosystem for ERP, HRMS, and workflow systems.",
        skills: ["Google Apps Script", "Google Sheets API", "Apps Script Web Apps", "Triggers & Scheduled Tasks", "HTML Service", "ERP / MIS Dashboards", "Workflow & Approval Automation", "HRMS / O2D / FMS / IMS Systems", "Batch Processing", "Data Migration & Reconciliation"]
      },
      {
        title: "Databases & Messaging",
        description: "Relational, in-memory, and event-streaming data layers for scalable distributed systems.",
        skills: ["PostgreSQL 16", "MySQL", "Redis", "Apache Kafka", "HikariCP Connection Pooling", "Google Sheets as Database", "Query & Index Optimization", "Data Validation & Integrity"]
      },
      {
        title: "Performance & Testing",
        description: "Load testing, concurrency benchmarking, and end-to-end quality assurance pipelines.",
        skills: ["K6 Load Testing", "Query & Index Optimization", "Connection Pooling", "Client-side Pagination", "Caching Strategies", "End-to-End Testing & Debugging", "Postman API Testing", "Production Debugging"]
      },
      {
        title: "Frontend & Reporting",
        description: "Modern reactive UIs, dynamic dashboards, and automated business report generation.",
        skills: ["React.js", "JavaScript (ES2022+)", "HTML5 & CSS3", "Responsive UI Design", "Dynamic Dashboards", "KPI Cards & Data Tables", "Skeleton Loaders", "PDF / Excel / CSV Report Generation"]
      },
      {
        title: "Professional & Soft Skills",
        description: "Cross-functional collaboration, structured problem solving, and production ownership.",
        skills: ["Requirement Analysis", "Client Communication", "Production Support", "Problem Solving", "Data Structures & Algorithms", "Git & GitHub", "Code Review & Maintainability", "Agile / Iterative Delivery"]
      }
    ]
  },
  skills: {
    station: "03 — SERVICES",
    heading: "SERVICES & SKILLS",
    intro: "How will I assist you? As a developer, I turn complex specifications into high-reliability systems using battle-tested technologies in both frontend and backend. Whether it is enterprise automation, full-stack applications, or scalable APIs, I build solutions that deliver value.",
    logicLabel: "LOGIC & MECHANICAL PRECISION",
    services: [
      { title: "API Development", desc: "Robust RESTful microservices, Spring Boot endpoints, authentication, and secure transactional pipelines." },
      { title: "Web Applications", desc: "High-performance interactive web portals with Next.js, React, Tailwind CSS, and resilient state machines." },
      { title: "Enterprise Automation", desc: "Google Apps Script, ERP consolidators, automated scheduling engines, and zero-loss business workflows." },
      { title: "DevOps & CI/CD", desc: "Git version control, containerized deployments, automated pipelines, and continuous integration." },
      { title: "Database Architecture", desc: "MySQL, PostgreSQL, schema modeling, ACID transactions, and double-entry consistency for critical financial operations." },
      { title: "Cloud & Distributed Systems", desc: "Fault-tolerant cloud compute, Google Cloud Platform infrastructure, microservices orchestration, and high availability." }
    ]
  },
  experience: {
    station: "04 — EXPERIENCE",
    heading: "JOURNEY",
    bgText: "JOURNEY"
  },
  projects: {
    station: "05 — PROJECTS",
    heading: "ENGINEERING PROJECTS",
    intro: "Check out some of my core engineering projects. They reflect my experience and dedication to development, built with high focus on resilience and user value.",
    detailsBadge: "DETAILS",
    projectDetail: "PROJECT DETAIL",
    purposeProblem: "PURPOSE & PROBLEM SOLVED",
    architectureLabel: "ARCHITECTURE",
    keyCapabilities: "KEY CAPABILITIES",
    metricsLabel: "PERFORMANCE METRICS",
    liveDemo: "LIVE DEMO",
    viewCode: "VIEW CODE",
    close: "CLOSE",
    items: [
      {
        id: "hydrapay",
        title: "HydraPay — Financial Settlement & Double-Entry Ledger Engine",
        shortTitle: "HydraPay",
        description: "Fault-tolerant financial settlement engine with strict double-entry bookkeeping, 2-tier distributed idempotency, and a Transactional Outbox + Kafka pipeline — load-tested to 10,482 TPS at 13.4 ms P99 latency.",
        purpose: "Provide a zero-data-loss, high-concurrency financial ledger and settlement pipeline capable of safely handling thousands of simultaneous payments without double debits or race conditions.",
        problemSolved: "Eliminates race conditions, duplicate transactions during network timeouts, database deadlocks under high transfer loads, and out-of-order event publishing in distributed payment microservices.",
        architecture: "Spring Boot service layer with transactional boundaries, HikariCP connection pooling, PostgreSQL 16 schema with check constraints, Redis cache for millisecond lock checks, and Apache Kafka for asynchronous downstream settlement.",
        keyFeatures: [
          "Strict double-entry bookkeeping ensuring debits equal credits on every transaction",
          "2-tier distributed idempotency layer (Redis SETNX + PostgreSQL unique constraints)",
          "Transactional Outbox pattern with Debezium/Kafka integration for zero-loss message publishing",
          "Deterministic pessimistic locking (SELECT FOR UPDATE) ordered by account ID to prevent deadlocks",
          "Automated K6 distributed load testing suite benchmarking real-world concurrency"
        ],
        metrics: [
          { label: "Throughput", value: "10,482 TPS" },
          { label: "P99 Latency", value: "13.4 ms" },
          { label: "Double Debits", value: "0 Failures" },
          { label: "DB Deadlocks", value: "0 Deadlocks" }
        ]
      },
      {
        id: "ai-chatbot",
        title: "AI Chatbot",
        shortTitle: "AI Chatbot",
        description: "A full-stack application featuring text and voice input, using REST APIs for smooth communication with OpenAI.",
        purpose: "Offer a multimodal interactive AI assistant with natural language understanding and voice interaction capabilities.",
        problemSolved: "Enables hands-free voice search and seamless conversation streaming with low response latency.",
        architecture: "React.js frontend communicating via REST endpoints to a Spring Boot service layer, backed by Supabase and OpenAI API.",
        keyFeatures: [
          "Voice and text dual-mode input and response streaming",
          "Spring Boot backend gateway with rate limiting and secure API proxying",
          "Supabase database integration for conversation logging and history persistence",
          "Modern React UI with real-time audio wave feedback"
        ]
      },
      {
        id: "ai-travel-planner",
        title: "AI-Powered Travel Planner",
        shortTitle: "TripMind AI",
        description: "An intelligent travel planning web application that generates personalized trip recommendations based on budget, duration, and user preferences. Includes smart constraint validation, cost estimation, and dynamic destination filtering.",
        purpose: "Help travelers generate end-to-end customized itineraries with realistic cost breakdowns and activity scheduling.",
        problemSolved: "Solves the cognitive overload of vacation planning by automating budget calculations, travel schedules, and lodging recommendations according to user constraints.",
        architecture: "Java & Spring Boot backend logic managing destination catalogs, Supabase for trip storage, and responsive client frontend.",
        keyFeatures: [
          "Constraint-aware itinerary generation tailored to exact budgets",
          "Dynamic destination filtering with geographical clustering",
          "Interactive cost breakdown and timeline visualization",
          "Responsive user interface built with clean mobile-first ergonomics"
        ]
      },
      {
        id: "weather-web",
        title: "Weather Web Application",
        shortTitle: "Weather Web",
        description: "A web app that provides real-time weather data, featuring asynchronous data fetching and error handling.",
        purpose: "Deliver live weather forecasts, temperature trends, humidity metrics, and atmospheric conditions globally.",
        problemSolved: "Provides fast, lightweight weather lookup without bulky page loads, featuring resilient error handling for bad inputs or network failures.",
        architecture: "Lightweight Vanilla JavaScript application with asynchronous API integration with OpenWeather.",
        keyFeatures: [
          "Live city-based search with real-time temperature and condition reports",
          "Asynchronous fetch with promise-based network recovery",
          "Visual indicators representing temperature, wind speed, and humidity",
          "Fast response time with client-side caching"
        ]
      },
      {
        id: "garden-view-resort",
        title: "Garden View Resort Website",
        shortTitle: "Garden View Resort",
        description: "A responsive and visually appealing resort website showcasing amenities, services, and booking details. Designed with modern UI principles and smooth navigation for an engaging user experience.",
        purpose: "Provide an attractive hospitality portal for guests to explore resort suites, banquet amenities, and submit booking requests.",
        problemSolved: "Enhances customer conversion and booking inquiry workflows for hospitality businesses with a high-fidelity visual experience.",
        architecture: "React frontend integrated with Spring Boot services and Supabase database for inquiry management.",
        keyFeatures: [
          "Interactive room catalog with gallery views and amenity lists",
          "Booking inquiry submission with validation and backend notification",
          "Dynamic pricing display and seasonal discount highlights",
          "Fully responsive across smartphones, tablets, and desktops"
        ]
      }
    ]
  },
  contact: {
    station: "06 — CONTACT",
    heading: "LET'S BUILD SOMETHING.",
    intro: "Have a question or a project in mind? Reach out directly via WhatsApp, Email, or LinkedIn. I am always open to new opportunities.",
    name: "NAME",
    namePlaceholder: "Your name",
    email: "EMAIL",
    emailPlaceholder: "your.email@example.com",
    message: "MESSAGE",
    messagePlaceholder: "Describe your project or message...",
    send: "SEND MESSAGE",
    sending: "TRANSMITTING...",
    sent: "TRANSMISSION COMPLETE",
    success: "MESSAGE SENT SUCCESSFULLY",
    error: "FAILED TO SEND. PLEASE TRY AGAIN.",
    whatsappLabel: "WHATSAPP DIRECT",
    resumeLabel: "DOWNLOAD RESUME",
    directChannels: "DIRECT CHANNELS"
  },
  chatbot: {
    title: "ASK ARJUN",
    subtitle: "AI Portfolio Assistant",
    placeholder: "Ask about HydraPay, D-Table, skills..."
  }
};

// 2. Hindi (हिन्दी)
const hi = {
  loading: {
    title: "अर्जुन राजावत",
    status: ["पर्यावरण आरंभ हो रहा है", "सामग्री लोड हो रही है", "दृश्य का निर्माण", "सिस्टम कनेक्शन", "तैयार"]
  },
  entry: {
    name: "अर्जुन राजावत",
    role: "जावा फुल स्टैक डेवलपर",
    status: "सिस्टम तैयार",
    enter: "पोर्टफोलियो देखें",
    soundOn: "◉ ध्वनि चालू",
    soundOff: "◎ ध्वनि सक्षम करें",
    chooseLang: "भाषा चुनें",
    selectLang: "अपनी पसंदीदा भाषा चुनें",
    continue: "आगे बढ़ें →",
    change: "बदलें"
  },
  privacy: {
    message: "इस साइट का उपयोग जारी रखकर, आप हमारी सहमति देते हैं",
    policy: "गोपनीयता नीति",
    accept: "स्वीकार करें"
  },
  nav: {
    home: "होम",
    about: "परिचय",
    skills: "सेवाएं",
    experience: "अनुभव",
    projects: "प्रोजेक्ट्स",
    contact: "संपर्क",
    engineerBadge: "इंजीनियर"
  },
  home: {
    greeting: "जावा फुल स्टैक डेवलपर",
    roles: ["जावा फुल स्टैक डेवलपर", "बैकएंड इंजीनियर", "सॉफ्टवेयर इंजीनियर", "एंटरप्राइज ऑटोमेशन"],
    viewProjects: "प्रोजेक्ट्स देखें",
    downloadResume: "रिज्यूमे डाउनलोड करें",
    contactMe: "आइए कुछ नया बनाएं"
  },
  about: {
    station: "02 — परिचय",
    heading: "मेरे बारे में",
    intellectLabel: "बुद्धि और वास्तुकला",
    bio: "नमस्ते, मैं अर्जुन राजावत हूं, जावा फुल स्टैक डेवलपर और एंटरप्राइज ऑटोमेशन इंजीनियर। मैं शून्य डेटा हानि के साथ फॉल्ट-टॉलरेंट आर्किटेक्चर, गूगल ऐप्स स्क्रिप्ट सिस्टम, स्प्रिंग बूट माइक्रोसर्विसेज और मजबूत डेटाबेस लेयर्स बनाने में माहिर हूं। मेरे प्रोजेक्ट्स देखें या गिटहब पर जुड़ें। यदि आप एक अनुभवी डेवलपर की तलाश में हैं, तो ईमेल, फोन या लिंक्डइन के माध्यम से मुझसे संपर्क करें।",
    tabTimeline: "शिक्षा और अनुभव",
    tabSkills: "कौशल और विशेषज्ञता",
    howIBuild: "मैं कैसे निर्माण करता हूं",
    viewFullExperience: "पूरा अनुभव देखें",
    verifiedCertificate: "सत्यापित प्रमाण पत्र",
    principles: [
      "शून्य डेटा हानि के साथ फॉल्ट-टॉलरेंट सिस्टम",
      "ACID लेनदेन और सख्त डबल-एंट्री बहीखाता",
      "स्केलेबिलिटी के लिए इवेंट-संचालित आर्किटेक्चर",
      "प्रोडक्शन डिबगिंग और प्रदर्शन अनुकूलन",
      "स्वच्छ, मॉड्यूलर और रखरखाव योग्य कोड"
    ],
    journey: [
      {
        id: "d-table-experience",
        year: "जुलाई 2026 – वर्तमान",
        title: "ऐप्स स्क्रिप्ट डेवलपर",
        institution: "डी-टेबल एनालिटिक्स, भोपाल",
        type: "कार्य",
        details: "गूगल ऐप्स स्क्रिप्ट, जावास्क्रिप्ट, एचटीएमएल, सीएसएस और गूगल शीट्स एपीआई के साथ एंटरप्राइज बिजनेस एप्लिकेशन का निर्माण और रखरखाव, जिसमें एचआरएमएस, उपस्थिति प्रबंधन, ओ2डी, खरीद एफएमएस, इन्वेंट्री और ईआरपी डैशबोर्ड शामिल हैं।"
      },
      {
        id: "full-stack-java-course",
        year: "2025",
        title: "फुल स्टैक जावा डेवलपमेंट कोर्स",
        institution: "ऑनलाइन प्लेटफॉर्म",
        type: "प्रशिक्षण",
        details: "एंटरप्राइज स्प्रिंग बूट, रेस्ट एपीआई और आधुनिक फ्रंटएंड इंटीग्रेशन को कवर करने वाला व्यापक जावा कोर्स।"
      },
      {
        id: "itrainu-training",
        year: "दिसंबर 2024",
        title: "जावा फुल स्टैक डेवलपमेंट प्रशिक्षण",
        institution: "आई-ट्रेन-यू टेक्नोलॉजीज, इंदौर",
        type: "प्रशिक्षण",
        details: "एंटरप्राइज जावा, स्प्रिंग बूट, माइक्रोसर्विसेज आर्किटेक्चर, और 80+ प्रशिक्षुओं में 'सर्वश्रेष्ठ प्रोजेक्ट पुरस्कार' प्राप्त किया।"
      },
      {
        id: "jiwaji-bsc",
        year: "2025",
        title: "बी.एससी. कंप्यूटर साइंस",
        institution: "जीवाजी विश्वविद्यालय, ग्वालियर",
        type: "शिक्षा",
        details: "डेटा संरचनाओं, एल्गोरिदम, ऑपरेटिंग सिस्टम और डेटाबेस सिस्टम पर केंद्रित बैचलर ऑफ साइंस डिग्री।"
      },
      {
        id: "12th-grade",
        year: "2019",
        title: "उच्चतर माध्यमिक (12वीं कक्षा)",
        institution: "साधना विद्या निकेतन, भिंड, म.प्र.",
        type: "शिक्षा",
        details: "गणित और विज्ञान में 66% के साथ उच्चतर माध्यमिक शिक्षा पूरी की।"
      },
      {
        id: "10th-grade",
        year: "2017",
        title: "माध्यमिक विद्यालय (10वीं कक्षा)",
        institution: "स्कॉलर्स पब्लिक स्कूल, भिंड, म.प्र.",
        type: "शिक्षा",
        details: "माध्यमिक परीक्षा में 7.0 सीजीपीए प्राप्त किया।"
      }
    ],
    skillCategories: [
      {
        title: "जावा और बैकएंड इंजीनियरिंग",
        description: "उच्च थ्रूपुट और फॉल्ट-टॉलरेंट सिस्टम के लिए कोर जावा और एंटरप्राइज फ्रेमवर्क।",
        skills: ["Java 21", "Spring Boot", "Spring MVC", "Hibernate / JPA", "REST API Design", "ACID Transactions", "Idempotency", "Double-Entry Ledger Design", "Transactional Outbox Pattern", "Event-Driven Architecture", "Role-Based Access Control (RBAC)", "SSO & Session Management"]
      },
      {
        title: "गूगल ऐप्स स्क्रिप्ट और एंटरप्राइज ऑटोमेशन",
        description: "ईआरपी, एचआरएमएस और वर्कफ़्लो ऑटोमेशन के लिए गूगल इकोसिस्टम का उपयोग।",
        skills: ["Google Apps Script", "Google Sheets API", "Apps Script Web Apps", "Triggers & Scheduled Tasks", "HTML Service", "ERP / MIS Dashboards", "Workflow & Approval Automation", "HRMS / O2D / FMS / IMS Systems", "Batch Processing", "Data Migration & Reconciliation"]
      },
      {
        title: "डेटाबेस और मैसेजिंग",
        description: "स्केलेबल वितरित सिस्टम के लिए रिलेशनल और इवेंट-स्ट्रीमिंग डेटा लेयर्स।",
        skills: ["PostgreSQL 16", "MySQL", "Redis", "Apache Kafka", "HikariCP Connection Pooling", "Google Sheets as Database", "Query & Index Optimization", "Data Validation & Integrity"]
      },
      {
        title: "प्रदर्शन और परीक्षण",
        description: "लोड टेस्टिंग, समवर्ती बेंचमार्किंग और संपूर्ण गुणवत्ता आश्वासन।",
        skills: ["K6 Load Testing", "Query & Index Optimization", "Connection Pooling", "Client-side Pagination", "Caching Strategies", "End-to-End Testing & Debugging", "Postman API Testing", "Production Debugging"]
      },
      {
        title: "फ्रंटएंड और रिपोर्टिंग",
        description: "आधुनिक रिएक्टिव यूआई, डायनामिक डैशबोर्ड और स्वचालित रिपोर्ट निर्माण।",
        skills: ["React.js", "JavaScript (ES2022+)", "HTML5 & CSS3", "Responsive UI Design", "Dynamic Dashboards", "KPI Cards & Data Tables", "Skeleton Loaders", "PDF / Excel / CSV Report Generation"]
      },
      {
        title: "पेशेवर और व्यक्तिगत कौशल",
        description: "समस्या समाधान, स्पष्ट संचार और तकनीकी नेतृत्व।",
        skills: ["Requirement Analysis", "Client Communication", "Production Support", "Problem Solving", "Data Structures & Algorithms", "Git & GitHub", "Code Review & Maintainability", "Agile / Iterative Delivery"]
      }
    ]
  },
  skills: {
    station: "03 — सेवाएं",
    heading: "सेवाएं एवं कौशल",
    intro: "मैं आपकी किस प्रकार सहायता कर सकता हूं? एक डेवलपर के रूप में, मैं जटिल आवश्यकताओं को विश्वसनीय और स्केलेबल सिस्टम में बदलता हूं। चाहे वह एंटरप्राइज ऑटोमेशन हो या स्केलेबल एपीआई, मैं उच्च मूल्य देने वाले समाधान बनाता हूं।",
    logicLabel: "तर्क और यांत्रिक सटीकता",
    services: [
      { title: "एपीआई विकास", desc: "मजबूत रेस्टफुल माइक्रोसर्विसेज, स्प्रिंग बूट एंडपॉइंट्स, प्रमाणीकरण और सुरक्षित लेन-देन पाइपलाइन।" },
      { title: "वेब एप्लिकेशन", desc: "नेक्स्ट.जेएस, रिएक्ट, टेलविंड सीएसएस के साथ उच्च प्रदर्शन वाले इंटरैक्टिव वेब पोर्टल।" },
      { title: "एंटरप्राइज ऑटोमेशन", desc: "गूगल ऐप्स स्क्रिप्ट, ईआरपी कंसोलिडेटर, स्वचालित शेड्यूलिंग इंजन और शून्य-हानि वर्कफ़्लो।" },
      { title: "डेवऑप्स और सीआई/सीडी", desc: "गिट वर्जन कंट्रोल, कंटेनरीकृत डिप्लॉयमेंट, स्वचालित पाइपलाइन और निरंतर एकीकरण।" },
      { title: "डेटाबेस आर्किटेक्चर", desc: "माईएसक्यूएल, पोस्टग्रेएसक्यूएल, स्कीमा मॉडलिंग, एसीआईडी लेनदेन और वित्तीय बहीखाता स्थिरता।" },
      { title: "क्लाउड और वितरित सिस्टम", desc: "फॉल्ट-टॉलरेंट क्लाउड कंप्यूट, गूगल क्लाउड प्लेटफॉर्म इंफ्रास्ट्रक्चर और माइक्रोसर्विसेज ऑर्केस्ट्रेशन।" }
    ]
  },
  experience: {
    station: "04 — अनुभव",
    heading: "सफरनामा",
    bgText: "सफरनामा"
  },
  projects: {
    station: "05 — प्रोजेक्ट्स",
    heading: "इंजीनियरिंग प्रोजेक्ट्स",
    intro: "मेरे मुख्य इंजीनियरिंग प्रोजेक्ट्स देखें। वे पूर्ण-स्टैक विकास, वित्तीय प्रणालियों और आधुनिक वेब प्रौद्योगिकियों में मेरे अनुभव को दर्शाते हैं।",
    detailsBadge: "विवरण",
    projectDetail: "प्रोजेक्ट विवरण",
    purposeProblem: "उद्देश्य और हल की गई समस्या",
    architectureLabel: "आर्किटेक्चर",
    keyCapabilities: "मुख्य क्षमताएं",
    metricsLabel: "प्रदर्शन मेट्रिक्स",
    liveDemo: "लाइव डेमो",
    viewCode: "कोड देखें",
    close: "बंद करें",
    items: [
      {
        id: "hydrapay",
        title: "HydraPay — वित्तीय निपटान और डबल-एंट्री लेजर इंजन",
        shortTitle: "HydraPay",
        description: "सख्त डबल-एंट्री बहीखाता, 2-स्तरीय वितरित आइडम्पोटेंसी, और आउटबॉक्स + काफ्का पाइपलाइन के साथ फॉल्ट-टॉलरेंट वित्तीय निपटान इंजन — 10,482 टीपीएस तक लोड-परीक्षित।",
        purpose: "डबल डेबिट या रेस स्थितियों के बिना एक साथ हजारों भुगतानों को संभालने में सक्षम शून्य-डेटा-हानि वित्तीय खाता प्रदान करना।",
        problemSolved: "नेटवर्क टाइमआउट के दौरान डुप्लिकेट लेनदेन, उच्च लोड पर डेटाबेस डेडलॉक, और वितरित भुगतान प्रणालियों में असंगति को समाप्त करता है।",
        architecture: "स्प्रिंग बूट सर्विस लेयर, हिकारीसीपी कनेक्शन पूलिंग, पोस्टग्रेएसक्यूएल 16 स्कीमा, रेडिस कैश, और अपाचे काफ्का के साथ अतुल्यकालिक निपटान।",
        keyFeatures: [
          "सख्त डबल-एंट्री बहीखाता यह सुनिश्चित करता है कि प्रत्येक लेनदेन पर डेबिट क्रेडिट के बराबर हो",
          "2-स्तरीय वितरित आइडम्पोटेंसी लेयर (रेडिस SETNX + पोस्टग्रेएसक्यूएल विशिष्ट बाधाएं)",
          "शून्य-हानि संदेश प्रकाशन के लिए ट्रांजैक्शनल आउटबॉक्स पैटर्न और काफ्का एकीकरण",
          "डेडलॉक को रोकने के लिए खाता आईडी द्वारा ऑर्डर की गई नियतात्मक लॉकिंग (SELECT FOR UPDATE)",
          "वास्तविक समय समवर्ती परीक्षण के लिए स्वचालित K6 लोड टेस्टिंग सूट"
        ],
        metrics: [
          { label: "थ्रूपुट", value: "10,482 TPS" },
          { label: "P99 लेटेंसी", value: "13.4 ms" },
          { label: "डबल डेबिट", value: "0 विफलता" },
          { label: "डीबी डेडलॉक", value: "0 डेडलॉक" }
        ]
      },
      {
        id: "ai-chatbot",
        title: "एआई चैटबॉट",
        shortTitle: "AI Chatbot",
        description: "टेक्स्ट और वॉइस इनपुट की सुविधा वाला फुल-स्टैक एप्लिकेशन, ओपनएआई के साथ सहज संचार के लिए रेस्ट एपीआई का उपयोग।",
        purpose: "प्राकृतिक भाषा समझ और आवाज इंटरैक्शन क्षमताओं के साथ एक मल्टीमॉडल इंटरैक्टिव एआई सहायक प्रदान करना।",
        problemSolved: "हैंड्स-फ्री वॉयस सर्च और कम प्रतिक्रिया विलंबता के साथ निरंतर बातचीत को सक्षम बनाता है।",
        architecture: "रिएक्ट.जेएस फ्रंटएंड, स्प्रिंग बूट सर्विस लेयर, सुपाबेस डेटाबेस और ओपनएआई एपीआई।",
        keyFeatures: [
          "आवाज और पाठ दोहरे मोड इनपुट और प्रतिक्रिया स्ट्रीमिंग",
          "दर सीमित करने और सुरक्षित एपीआई प्रॉक्सी के साथ स्प्रिंग बूट बैकएंड गेटवे",
          "बातचीत लॉगिंग और इतिहास के लिए सुपाबेस डेटाबेस एकीकरण",
          "रीयल-टाइम ऑडियो वेव फीडबैक के साथ आधुनिक रिएक्ट यूआई"
        ]
      },
      {
        id: "ai-travel-planner",
        title: "एआई संचालित यात्रा योजनाकार",
        shortTitle: "TripMind AI",
        description: "एक बुद्धिमान यात्रा योजना वेब ऐप जो बजट, अवधि और प्राथमिकताओं के आधार पर व्यक्तिगत यात्रा सिफारिशें तैयार करता है।",
        purpose: "यात्रियों को वास्तविक लागत और गतिविधि शेड्यूलिंग के साथ अनुकूलित यात्रा कार्यक्रम तैयार करने में मदद करना।",
        problemSolved: "उपयोगकर्ता की प्राथमिकताओं के अनुसार बजट गणना, यात्रा कार्यक्रम और होटल सिफारिशों को स्वचालित करके योजना के तनाव को दूर करता है।",
        architecture: "जावा और स्प्रिंग बूट बैकएंड, सुपाबेस स्टोरेज, और रेस्पॉन्सिव क्लाइंट फ्रंटएंड।",
        keyFeatures: [
          "सटीक बजट के अनुसार अनुकूलित यात्रा कार्यक्रम निर्माण",
          "भौगोलिक क्लस्टरिंग के साथ गतिशील गंतव्य फ़िल्टरिंग",
          "इंटरैक्टिव लागत विवरण और समयरेखा विज़ुअलाइज़ेशन",
          "मोबाइल-अनुकूल आधुनिक यूजर इंटरफेस"
        ]
      },
      {
        id: "weather-web",
        title: "मौसम वेब एप्लिकेशन",
        shortTitle: "Weather Web",
        description: "एक वेब ऐप जो वास्तविक समय मौसम डेटा, अतुल्यकालिक डेटा फेचिंग और त्रुटि प्रबंधन प्रदान करता है।",
        purpose: "विश्व स्तर पर लाइव मौसम पूर्वानुमान, तापमान के रुझान और वायुमंडलीय स्थिति प्रदान करना।",
        problemSolved: "भारी पेज लोड के बिना तेज, हल्का मौसम खोज प्रदान करता है, जिसमें नेटवर्क विफलताओं के लिए लचीला प्रबंधन है।",
        architecture: "ओपनवेदर एपीआई के साथ अतुल्यकालिक एकीकरण वाला हल्का वैनिला जावास्क्रिप्ट ऐप।",
        keyFeatures: [
          "वास्तविक समय तापमान और मौसम रिपोर्ट के साथ लाइव शहर खोज",
          "प्रॉमिस-आधारित नेटवर्क रिकवरी के साथ एसिंक्रोनस फेचिंग",
          "तापमान, हवा की गति और आर्द्रता के दृश्य संकेतक",
          "क्लाइंट-साइड कैशिंग के साथ तेज़ प्रतिक्रिया समय"
        ]
      },
      {
        id: "garden-view-resort",
        title: "गार्डन व्यू रिज़ॉर्ट वेबसाइट",
        shortTitle: "Garden View Resort",
        description: "सुविधाओं, सेवाओं और बुकिंग विवरणों को प्रदर्शित करने वाली एक आकर्षक रिज़ॉर्ट वेबसाइट।",
        purpose: "अतिथियों के लिए सुइट्स और बैंक्वेट सुविधाओं का पता लगाने और बुकिंग अनुरोध सबमिट करने के लिए एक आधुनिक पोर्टल प्रदान करना।",
        problemSolved: "आतिथ्य व्यवसायों के लिए ग्राहक रूपांतरण और बुकिंग पूछताछ वर्कफ़्लो को बेहतर बनाता है।",
        architecture: "पूछताछ प्रबंधन के लिए स्प्रिंग बूट सेवाओं और सुपाबेस डेटाबेस के साथ एकीकृत रिएक्ट फ्रंटएंड।",
        keyFeatures: [
          "गैलरी दृश्यों और सुविधा सूचियों के साथ इंटरैक्टिव कमरा कैटलॉग",
          "सत्यापन और बैकएंड अधिसूचना के साथ बुकिंग पूछताछ सबमिशन",
          "गतिशील मूल्य निर्धारण और मौसमी छूट हाइलाइट्स",
          "स्मार्टफोन, टैबलेट और डेस्कटॉप पर पूरी तरह से अनुकूल"
        ]
      }
    ]
  },
  contact: {
    station: "06 — संपर्क",
    heading: "आइए कुछ नया बनाएं।",
    intro: "कोई प्रश्न है या किसी प्रोजेक्ट पर चर्चा करनी है? मुझसे सीधे व्हाट्सएप, ईमेल या लिंक्डइन के माध्यम से संपर्क करें। मैं हमेशा नए अवसरों के लिए तैयार हूं।",
    name: "नाम",
    namePlaceholder: "आपका नाम",
    email: "ईमेल",
    emailPlaceholder: "your.email@example.com",
    message: "संदेश",
    messagePlaceholder: "अपने प्रोजेक्ट या संदेश का विवरण लिखें...",
    send: "संदेश भेजें",
    sending: "भेजा जा रहा है...",
    sent: "संचरण पूरा हुआ",
    success: "संदेश सफलतापूर्वक भेजा गया",
    error: "भेजने में विफल। कृपया पुनः प्रयास करें।",
    whatsappLabel: "व्हाट्सएप डायरेक्ट",
    resumeLabel: "रिज्यूमे डाउनलोड करें",
    directChannels: "सीधे संपर्क माध्यम"
  },
  chatbot: {
    title: "अर्जुन से पूछें",
    subtitle: "एआई पोर्टफोलियो सहायक",
    placeholder: "HydraPay, जावा, कौशल के बारे में पूछें..."
  }
};

// 3. French (Français)
const fr = {
  loading: {
    title: "ARJUN RAJAWAT",
    status: ["INITIALISATION DE L'ENVIRONNEMENT", "CHARGEMENT DES RESSOURCES", "CONSTRUCTION DU DÉCOR", "CONNEXION DES SYSTÈMES", "PRÊT"]
  },
  entry: {
    name: "ARJUN RAJAWAT",
    role: "DÉVELOPPEUR JAVA FULL STACK",
    status: "SYSTÈME PRÊT",
    enter: "ENTRER DANS LE PORTFOLIO",
    soundOn: "◉ SON ACTIVÉ",
    soundOff: "◎ ACTIVER LE SON",
    chooseLang: "CHOISIR LA LANGUE",
    selectLang: "Sélectionnez votre langue préférée",
    continue: "CONTINUER →",
    change: "changer"
  },
  privacy: {
    message: "En poursuivant votre navigation, vous acceptez notre",
    policy: "Politique de Confidentialité",
    accept: "ACCEPTER"
  },
  nav: {
    home: "ACCUEIL",
    about: "À PROPOS",
    skills: "SERVICES",
    experience: "EXPÉRIENCE",
    projects: "PROJETS",
    contact: "CONTACT",
    engineerBadge: "INGÉNIEUR"
  },
  home: {
    greeting: "DÉVELOPPEUR JAVA FULL STACK",
    roles: ["DÉVELOPPEUR JAVA FULL STACK", "INGÉNIEUR BACKEND", "INGÉNIEUR LOGICIEL", "EXPERT EN AUTOMATISATION"],
    viewProjects: "VOIR LES PROJETS",
    downloadResume: "TÉLÉCHARGER LE CV",
    contactMe: "CONSTRUISONS ENSEMBLE"
  },
  about: {
    station: "02 — À PROPOS",
    heading: "À PROPOS DE MOI",
    intellectLabel: "INTELLECT & ARCHITECTURE",
    bio: "Bonjour, je suis Arjun Rajawat, développeur Java Full Stack et ingénieur en automatisation d'entreprise. Je me spécialise dans la création d'architectures tolérantes aux pannes, de systèmes Google Apps Script, de microservices Spring Boot et de couches de bases de données fiables avec zéro perte de données. Explorez mes réalisations dans ce portfolio ou sur mon profil GitHub.",
    tabTimeline: "FORMATION & PARCOURS",
    tabSkills: "COMPÉTENCES & EXPERTISE",
    howIBuild: "MA MÉTHODE DE CONCEPTION",
    viewFullExperience: "Voir tout le parcours",
    verifiedCertificate: "Certificat vérifié",
    principles: [
      "Systèmes tolérants aux pannes avec zéro perte de données",
      "Transactions ACID et comptabilité rigoureuse en partie double",
      "Architectures événementielles pour une grande évolutivité",
      "Débogage en production et optimisation des performances",
      "Code propre, modulaire et hautement maintenable"
    ],
    journey: [
      {
        id: "d-table-experience",
        year: "Juillet 2026 – Présent",
        title: "Développeur Apps Script",
        institution: "D-Table Analytics, Bhopal",
        type: "Travail",
        details: "Conception et maintenance d'applications métier avec Google Apps Script, JavaScript, HTML, CSS et l'API Google Sheets, incluant les modules SIRH, gestion des présences, O2D, FMS d'achat, inventaire et tableaux de bord ERP."
      },
      {
        id: "full-stack-java-course",
        year: "2025",
        title: "Formation Développeur Java Full Stack",
        institution: "Plateforme en ligne",
        type: "Formation",
        details: "Formation approfondie en développement Java couvrant Spring Boot d'entreprise, les API RESTful et l'intégration moderne de frontend."
      },
      {
        id: "itrainu-training",
        year: "Déc 2024",
        title: "Formation Java Full Stack & Microservices",
        institution: "iTrainU Technologies, Indore",
        type: "Formation",
        details: "Java entreprise, Spring Boot, architectures microservices, récompensé par le « Prix du Meilleur Projet » parmi plus de 80 candidats."
      },
      {
        id: "jiwaji-bsc",
        year: "2025",
        title: "Licence en Informatique (B.Sc.)",
        institution: "Université Jiwaji, Gwalior",
        type: "Éducation",
        details: "Licence scientifique axée sur les structures de données, l'algorithmique, les systèmes d'exploitation et les bases de données."
      },
      {
        id: "12th-grade",
        year: "2019",
        title: "Baccalauréat Scientifique (12e Année)",
        institution: "Sadhana Vidya Niketan, Bhind, M.P.",
        type: "Éducation",
        details: "Diplôme de fin d'études secondaires avec spécialisation en Mathématiques et Sciences Physiques (66%)."
      },
      {
        id: "10th-grade",
        year: "2017",
        title: "Brevet des Collèges (10e Année)",
        institution: "Scholars Public School, Bhind, M.P.",
        type: "Éducation",
        details: "Obtention du certificat avec mention 7.0 CGPA."
      }
    ],
    skillCategories: [
      {
        title: "Java & Ingénierie Backend",
        description: "Stack fondamentale et frameworks d'entreprise alimentant des systèmes distribués à fort débit.",
        skills: ["Java 21", "Spring Boot", "Spring MVC", "Hibernate / JPA", "REST API Design", "ACID Transactions", "Idempotency", "Double-Entry Ledger Design", "Transactional Outbox Pattern", "Event-Driven Architecture", "Role-Based Access Control (RBAC)", "SSO & Session Management"]
      },
      {
        title: "Google Apps Script & Automatisation",
        description: "Automatisation d'entreprise complète via l'écosystème Google pour ERP, SIRH et workflows.",
        skills: ["Google Apps Script", "Google Sheets API", "Apps Script Web Apps", "Triggers & Scheduled Tasks", "HTML Service", "ERP / MIS Dashboards", "Workflow & Approval Automation", "HRMS / O2D / FMS / IMS Systems", "Batch Processing", "Data Migration & Reconciliation"]
      },
      {
        title: "Bases de Données & Messagerie",
        description: "Couches de données relationnelles, en mémoire et flux d'événements pour systèmes scalables.",
        skills: ["PostgreSQL 16", "MySQL", "Redis", "Apache Kafka", "HikariCP Connection Pooling", "Google Sheets as Database", "Query & Index Optimization", "Data Validation & Integrity"]
      },
      {
        title: "Performance & Tests",
        description: "Tests de charge, étalonnage de concurrence et assurance qualité de bout en bout.",
        skills: ["K6 Load Testing", "Query & Index Optimization", "Connection Pooling", "Client-side Pagination", "Caching Strategies", "End-to-End Testing & Debugging", "Postman API Testing", "Production Debugging"]
      },
      {
        title: "Frontend & Tableaux de Bord",
        description: "Interfaces réactives modernes, tableaux de bord interactifs et génération de rapports.",
        skills: ["React.js", "JavaScript (ES2022+)", "HTML5 & CSS3", "Responsive UI Design", "Dynamic Dashboards", "KPI Cards & Data Tables", "Skeleton Loaders", "PDF / Excel / CSV Report Generation"]
      },
      {
        title: "Compétences Professionnelles",
        description: "Résolution méthodique de problèmes, communication client et support de production.",
        skills: ["Requirement Analysis", "Client Communication", "Production Support", "Problem Solving", "Data Structures & Algorithms", "Git & GitHub", "Code Review & Maintainability", "Agile / Iterative Delivery"]
      }
    ]
  },
  skills: {
    station: "03 — SERVICES",
    heading: "SERVICES & EXPERTISE",
    intro: "Comment puis-je vous aider ? En tant que développeur, je transforme des spécifications complexes en systèmes fiables, qu'il s'agisse d'automatisation d'entreprise, d'applications web full-stack ou d'APIs résilientes.",
    logicLabel: "LOGIQUE & PRÉCISION MÉCANIQUE",
    services: [
      { title: "Développement d'APIs", desc: "Microservices RESTful robustes, endpoints Spring Boot, authentification sécurisée et pipelines transactionnels." },
      { title: "Applications Web", desc: "Portails web interactifs haute performance avec Next.js, React, Tailwind CSS et machines à états résilientes." },
      { title: "Automatisation d'Entreprise", desc: "Google Apps Script, consolidateurs ERP, moteurs de planification automatisés et flux sans perte de données." },
      { title: "DevOps & CI/CD", desc: "Gestion de versions Git, conteneurisation, pipelines de déploiement continu et intégration automatisée." },
      { title: "Architecture de Données", desc: "MySQL, PostgreSQL, modélisation relationnelle, transactions ACID et intégrité comptable stricte." },
      { title: "Cloud & Systèmes Distribués", desc: "Cloud computing résilient, infrastructure Google Cloud Platform, orchestration de services et haute disponibilité." }
    ]
  },
  experience: {
    station: "04 — EXPÉRIENCE",
    heading: "PARCOURS",
    bgText: "PARCOURS"
  },
  projects: {
    station: "05 — PROJETS",
    heading: "PROJETS D'INGÉNIERIE",
    intro: "Découvrez une sélection de mes principaux projets techniques. Ils illustrent mon expertise en développement logiciel, systèmes financiers et architectures modernes.",
    detailsBadge: "DÉTAILS",
    projectDetail: "DÉTAIL DU PROJET",
    purposeProblem: "OBJECTIF ET PROBLÈME RÉSOLU",
    architectureLabel: "ARCHITECTURE",
    keyCapabilities: "CAPACITÉS CLÉS",
    metricsLabel: "MÉTRIQUES DE PERFORMANCE",
    liveDemo: "DÉMO EN DIRECT",
    viewCode: "VOIR LE CODE",
    close: "FERMER",
    items: [
      {
        id: "hydrapay",
        title: "HydraPay — Moteur de Règlement Financier & Grand Livre en Partie Double",
        shortTitle: "HydraPay",
        description: "Moteur de règlement financier tolérant aux pannes avec comptabilité stricte en partie double, idempotence distribuée à 2 niveaux et pipeline Outbox + Kafka — testé jusqu'à 10 482 TPS à 13,4 ms de latence P99.",
        purpose: "Fournir un registre financier hautement simultané sans aucune perte de données, capable de traiter des milliers de transactions sans double débit.",
        problemSolved: "Supprime les conflits d'accès concurrents, les doublons lors des pertes de réseau et les interblocages de base de données.",
        architecture: "Spring Boot, pool HikariCP, PostgreSQL 16 avec contraintes strictes, Redis pour verrous instantanés et Apache Kafka pour le règlement asynchrone.",
        keyFeatures: [
          "Comptabilité stricte en partie double assurant l'équilibre débits/crédits à chaque transaction",
          "Idempotence distribuée à deux niveaux (verrous Redis SETNX + contraintes uniques PostgreSQL)",
          "Pattern Transactional Outbox avec intégration Kafka pour publication garantie sans perte",
          "Verrouillage pessimiste déterministe (SELECT FOR UPDATE) ordonné par ID de compte pour prévenir tout blocage",
          "Suite de tests de charge distribuée K6 validant les performances en conditions réelles"
        ],
        metrics: [
          { label: "Débit", value: "10 482 TPS" },
          { label: "Latence P99", value: "13,4 ms" },
          { label: "Doubles Débits", value: "0 Erreur" },
          { label: "Interblocages DB", value: "0 Blocage" }
        ]
      },
      {
        id: "ai-chatbot",
        title: "Chatbot IA Multimodal",
        shortTitle: "AI Chatbot",
        description: "Application full-stack intégrant saisie vocale et textuelle, exploitant des API RESTful pour une interaction fluide avec OpenAI.",
        purpose: "Offrir un assistant conversationnel interactif avec compréhension du langage naturel et reconnaissance vocale.",
        problemSolved: "Permet des échanges vocaux instantanés et un streaming de réponses ultra-rapide sans délai perçu.",
        architecture: "Frontend React.js communiquant via endpoints REST avec Spring Boot, sauvegardé dans Supabase et propulsé par OpenAI.",
        keyFeatures: [
          "Mode double voix et texte avec streaming en temps réel des réponses",
          "Passerelle Spring Boot avec limitation de débit et proxy d'API sécurisé",
          "Intégration de la base Supabase pour la persistance de l'historique de discussion",
          "Interface React moderne avec visualisation d'ondes sonores en direct"
        ]
      },
      {
        id: "ai-travel-planner",
        title: "Planificateur de Voyage Intelligent",
        shortTitle: "TripMind AI",
        description: "Application web intelligente générant des itinéraires sur mesure selon le budget, la durée et les préférences. Comprend l'estimation dynamique des coûts.",
        purpose: "Aider les voyageurs à concevoir des itinéraires complets avec répartition budgétaire réaliste et planning d'activités.",
        problemSolved: "Élimine la surcharge mentale de planification en automatisant les calculs budgétaires et le choix d'hébergements adaptés.",
        architecture: "Backend Java & Spring Boot gérant les catalogues d'attractions, Supabase pour le stockage et frontend client réactif.",
        keyFeatures: [
          "Génération d'itinéraires respectant scrupuleusement les contraintes budgétaires",
          "Filtrage dynamique des destinations par regroupement géographique",
          "Visualisation interactive des coûts et calendrier d'activités",
          "Interface utilisateur moderne optimisée pour les terminaux mobiles"
        ]
      },
      {
        id: "weather-web",
        title: "Portail Météo en Temps Réel",
        shortTitle: "Weather Web",
        description: "Application météo fournissant des données climatiques en direct, avec requêtes asynchrones résilientes aux coupures réseau.",
        purpose: "Fournir des prévisions météorologiques, températures et métriques atmosphériques précises dans le monde entier.",
        problemSolved: "Offre une consultation météorologique légère et instantanée sans rechargement de page lourd.",
        architecture: "Application Vanilla JavaScript légère avec intégration asynchrone à l'API OpenWeather.",
        keyFeatures: [
          "Recherche par ville avec relevé instantané de température et conditions actuelles",
          "Récupération asynchrone avec gestion intelligente des erreurs de connexion",
          "Indicateurs graphiques pour l'humidité, la vitesse du vent et la pression",
          "Mise en cache côté client pour un temps de réponse immédiat"
        ]
      },
      {
        id: "garden-view-resort",
        title: "Site Web Resort Garden View",
        shortTitle: "Garden View Resort",
        description: "Portail web haut de gamme mettant en valeur les suites, prestations et réservations d'un domaine hôtelier.",
        purpose: "Offrir une vitrine digitale élégante permettant aux clients de découvrir les chambres et de formuler des demandes de réservation.",
        problemSolved: "Améliore la conversion client et fluidifie le traitement des réservations pour les établissements d'accueil.",
        architecture: "Frontend React connecté aux services Spring Boot et base de données Supabase.",
        keyFeatures: [
          "Catalogue interactif des chambres avec galeries et inventaire des équipements",
          "Formulaire de réservation avec validation de données et notification backend",
          "Affichage des offres saisonnières et des tarifs actualisés",
          "Ergonomie parfaitement adaptée aux smartphones, tablettes et ordinateurs"
        ]
      }
    ]
  },
  contact: {
    station: "06 — CONTACT",
    heading: "CONSTRUISONS ENSEMBLE.",
    intro: "Vous avez une question ou un projet à développer ? Contactez-moi directement via WhatsApp, Email ou LinkedIn. Je suis toujours ouvert aux nouvelles opportunités.",
    name: "NOM",
    namePlaceholder: "Votre nom complet",
    email: "E-MAIL",
    emailPlaceholder: "votre.email@exemple.com",
    message: "MESSAGE",
    messagePlaceholder: "Décrivez votre projet ou votre message...",
    send: "ENVOYER LE MESSAGE",
    sending: "ENVOI EN COURS...",
    sent: "TRANSMISSION RÉUSSIE",
    success: "MESSAGE ENVOYÉ AVEC SUCCÈS",
    error: "ÉCHEC DE L'ENVOI. VEUILLEZ RÉESSAYER.",
    whatsappLabel: "WHATSAPP DIRECT",
    resumeLabel: "TÉLÉCHARGER LE CV",
    directChannels: "CANAUX DIRECTS"
  },
  chatbot: {
    title: "DEMANDER À ARJUN",
    subtitle: "Assistant IA du Portfolio",
    placeholder: "Posez vos questions sur HydraPay, Java, compétences..."
  }
};

// 4. Spanish (Español)
const es = {
  loading: {
    title: "ARJUN RAJAWAT",
    status: ["INICIALIZANDO ENTORNO", "CARGANDO RECURSOS", "CONSTRUYENDO ESCENA", "CONECTANDO SISTEMAS", "LISTO"]
  },
  entry: {
    name: "ARJUN RAJAWAT",
    role: "DESARROLLADOR JAVA FULL STACK",
    status: "SISTEMA LISTO",
    enter: "ENTRAR AL PORTAFOLIO",
    soundOn: "◉ SONIDO ACTIVADO",
    soundOff: "◎ ACTIVAR SONIDO",
    chooseLang: "ELEGIR IDIOMA",
    selectLang: "Selecciona tu idioma preferido",
    continue: "CONTINUAR →",
    change: "cambiar"
  },
  privacy: {
    message: "Al continuar navegando en este sitio, aceptas nuestra",
    policy: "Política de Privacidad",
    accept: "ACEPTAR"
  },
  nav: {
    home: "INICIO",
    about: "SOBRE MÍ",
    skills: "SERVICIOS",
    experience: "EXPERIENCIA",
    projects: "PROYECTOS",
    contact: "CONTACTO",
    engineerBadge: "INGENIERO"
  },
  home: {
    greeting: "DESARROLLADOR JAVA FULL STACK",
    roles: ["DESARROLLADOR JAVA FULL STACK", "INGENIERO BACKEND", "INGENIERO DE SOFTWARE", "AUTOMATIZACIÓN EMPRESARIAL"],
    viewProjects: "VER PROYECTOS",
    downloadResume: "DESCARGAR CV",
    contactMe: "CONSTRUYAMOS ALGO JUNTOS"
  },
  about: {
    station: "02 — SOBRE MÍ",
    heading: "SOBRE MÍ",
    intellectLabel: "INTELECTO Y ARQUITECTURA",
    bio: "Hola, soy Arjun Rajawat, desarrollador Java Full Stack e ingeniero de automatización empresarial. Me especializo en construir arquitecturas tolerantes a fallos, sistemas en Google Apps Script, microservicios con Spring Boot y capas de bases de datos sólidas con cero pérdida de datos. Explora mis proyectos en este portafolio o en mi GitHub.",
    tabTimeline: "EDUCACIÓN Y TRAYECTORIA",
    tabSkills: "HABILIDADES Y EXPERIENCIA",
    howIBuild: "CÓMO CONSTRUYO",
    viewFullExperience: "Ver trayectoria completa",
    verifiedCertificate: "Certificado Verificado",
    principles: [
      "Sistemas tolerantes a fallos con cero pérdida de datos",
      "Transacciones ACID y contabilidad estricta de partida doble",
      "Arquitecturas orientadas a eventos para alta escalabilidad",
      "Depuración en entornos de producción y optimización de rendimiento",
      "Código limpio, modular y mantenible"
    ],
    journey: [
      {
        id: "d-table-experience",
        year: "Julio 2026 – Presente",
        title: "Desarrollador Apps Script",
        institution: "D-Table Analytics, Bhopal",
        type: "Trabajo",
        details: "Construcción y mantenimiento de aplicaciones comerciales empresariales con Google Apps Script, JavaScript, HTML, CSS y APIs de Google Sheets, incluidos sistemas RRHH, control de asistencia, O2D, compras FMS e inventario."
      },
      {
        id: "full-stack-java-course",
        year: "2025",
        title: "Curso Desarrollador Java Full Stack",
        institution: "Plataforma en línea",
        type: "Formación",
        details: "Curso integral en desarrollo Java que abarca Spring Boot empresarial, APIs RESTful y conexión moderna con frontend."
      },
      {
        id: "itrainu-training",
        year: "Dic 2024",
        title: "Formación Java Full Stack & Microservicios",
        institution: "iTrainU Technologies, Indore",
        type: "Formación",
        details: "Java empresarial, Spring Boot, microservicios, galardonado con el 'Premio al Mejor Proyecto' entre más de 80 participantes."
      },
      {
        id: "jiwaji-bsc",
        year: "2025",
        title: "Licenciatura en Informática (B.Sc.)",
        institution: "Universidad Jiwaji, Gwalior",
        type: "Educación",
        details: "Licenciatura en Ciencias de la Computación con énfasis en estructuras de datos, algoritmos, sistemas operativos y bases de datos."
      },
      {
        id: "12th-grade",
        year: "2019",
        title: "Educación Secundaria Superior (Grado 12)",
        institution: "Sadhana Vidya Niketan, Bhind, M.P.",
        type: "Educación",
        details: "Graduado de secundaria con especialización en Matemáticas y Ciencias (66%)."
      },
      {
        id: "10th-grade",
        year: "2017",
        title: "Educación Secundaria (Grado 10)",
        institution: "Scholars Public School, Bhind, M.P.",
        type: "Educación",
        details: "Calificación de 7.0 CGPA en exámenes escolares."
      }
    ],
    skillCategories: [
      {
        title: "Java e Ingeniería Backend",
        description: "Tecnologías centrales y frameworks empresariales para sistemas de alto rendimiento y tolerancia a fallos.",
        skills: ["Java 21", "Spring Boot", "Spring MVC", "Hibernate / JPA", "REST API Design", "ACID Transactions", "Idempotency", "Double-Entry Ledger Design", "Transactional Outbox Pattern", "Event-Driven Architecture", "Role-Based Access Control (RBAC)", "SSO & Session Management"]
      },
      {
        title: "Google Apps Script y Automatización",
        description: "Automatización empresarial integral utilizando el ecosistema de Google para ERP y flujos de trabajo.",
        skills: ["Google Apps Script", "Google Sheets API", "Apps Script Web Apps", "Triggers & Scheduled Tasks", "HTML Service", "ERP / MIS Dashboards", "Workflow & Approval Automation", "HRMS / O2D / FMS / IMS Systems", "Batch Processing", "Data Migration & Reconciliation"]
      },
      {
        title: "Bases de Datos y Mensajería",
        description: "Capas de datos relacionales, en memoria y transmisión de eventos para sistemas distribuidos.",
        skills: ["PostgreSQL 16", "MySQL", "Redis", "Apache Kafka", "HikariCP Connection Pooling", "Google Sheets as Database", "Query & Index Optimization", "Data Validation & Integrity"]
      },
      {
        title: "Rendimiento y Pruebas",
        description: "Pruebas de carga, evaluación de concurrencia y aseguramiento de calidad de extremo a extremo.",
        skills: ["K6 Load Testing", "Query & Index Optimization", "Connection Pooling", "Client-side Pagination", "Caching Strategies", "End-to-End Testing & Debugging", "Postman API Testing", "Production Debugging"]
      },
      {
        title: "Frontend y Paneles de Control",
        description: "Interfaces reactivas modernas, paneles dinámicos y generación automatizada de informes.",
        skills: ["React.js", "JavaScript (ES2022+)", "HTML5 & CSS3", "Responsive UI Design", "Dynamic Dashboards", "KPI Cards & Data Tables", "Skeleton Loaders", "PDF / Excel / CSV Report Generation"]
      },
      {
        title: "Habilidades Profesionales",
        description: "Resolución analítica de problemas, comunicación clara y soporte en producción.",
        skills: ["Requirement Analysis", "Client Communication", "Production Support", "Problem Solving", "Data Structures & Algorithms", "Git & GitHub", "Code Review & Maintainability", "Agile / Iterative Delivery"]
      }
    ]
  },
  skills: {
    station: "03 — SERVICIOS",
    heading: "SERVICIOS Y HABILIDADES",
    intro: "¿Cómo puedo ayudarte? Como desarrollador, transformo especificaciones complejas en sistemas altamente confiables mediante tecnologías probadas en frontend y backend.",
    logicLabel: "LÓGICA Y PRECISIÓN MECÁNICA",
    services: [
      { title: "Desarrollo de APIs", desc: "Microservicios RESTful robustos, endpoints con Spring Boot, autenticación y flujos transaccionales seguros." },
      { title: "Aplicaciones Web", desc: "Portales web interactivos de alto rendimiento construidos con Next.js, React, Tailwind CSS y arquitecturas resistentes." },
      { title: "Automatización Empresarial", desc: "Google Apps Script, consolidadores ERP, motores de programación automática y flujos de trabajo sin pérdidas." },
      { title: "DevOps y CI/CD", desc: "Control de versiones Git, despliegues en contenedores, tuberías automáticas e integración continua." },
      { title: "Arquitectura de Datos", desc: "MySQL, PostgreSQL, modelado relacional, transacciones ACID y consistencia contable estricta." },
      { title: "Nube y Sistemas Distribuidos", desc: "Cómputo en la nube tolerante a fallos, infraestructura Google Cloud Platform y orquestación de servicios." }
    ]
  },
  experience: {
    station: "04 — EXPERIENCIA",
    heading: "TRAYECTORIA",
    bgText: "TRAYECTORIA"
  },
  projects: {
    station: "05 — PROYECTOS",
    heading: "PROYECTOS DE INGENIERÍA",
    intro: "Conoce algunos de mis proyectos de ingeniería principales. Reflejan mi experiencia en desarrollo full stack, sistemas financieros y tecnologías web modernas.",
    detailsBadge: "DETALLES",
    projectDetail: "DETALLE DEL PROYECTO",
    purposeProblem: "PROPÓSITO Y PROBLEMA RESUELTO",
    architectureLabel: "ARQUITECTURA",
    keyCapabilities: "CAPACIDADES CLAVE",
    metricsLabel: "MÉTRICAS DE RENDIMIENTO",
    liveDemo: "DEMO EN VIVO",
    viewCode: "VER CÓDIGO",
    close: "CERRAR",
    items: [
      {
        id: "hydrapay",
        title: "HydraPay — Motor de Liquidación Financiera y Libro Mayor de Partida Doble",
        shortTitle: "HydraPay",
        description: "Motor de liquidación financiera tolerante a fallos con contabilidad estricta de partida doble, idempotencia distribuida de 2 niveles y canalización Outbox + Kafka: probado hasta 10,482 TPS a 13.4 ms de latencia P99.",
        purpose: "Proporcionar un libro mayor financiero de alta concurrencia y sin pérdida de datos capaz de manejar miles de pagos simultáneos sin débitos duplicados.",
        problemSolved: "Elimina condiciones de carrera, transacciones duplicadas por caídas de red y bloqueos mutuos en bases de datos bajo alta carga.",
        architecture: "Capa de servicio Spring Boot, agrupación HikariCP, PostgreSQL 16 con restricciones de verificación, Redis y Apache Kafka.",
        keyFeatures: [
          "Contabilidad estricta de partida doble que garantiza débitos iguales a créditos en cada transacción",
          "Capa de idempotencia distribuida de dos niveles (bloqueos rápidos Redis SETNX + restricciones únicas PostgreSQL)",
          "Patrón Transactional Outbox con Kafka para publicación garantizada de mensajes sin pérdidas",
          "Bloqueo pesimista determinista (SELECT FOR UPDATE) ordenado por ID de cuenta para evitar interbloqueos",
          "Batería de pruebas de carga distribuida K6 que valida la concurrencia en escenarios reales"
        ],
        metrics: [
          { label: "Rendimiento", value: "10,482 TPS" },
          { label: "Latencia P99", value: "13.4 ms" },
          { label: "Débitos Duplicados", value: "0 Fallos" },
          { label: "Bloqueos Mutuos", value: "0 Bloqueos" }
        ]
      },
      {
        id: "ai-chatbot",
        title: "Chatbot de Inteligencia Artificial",
        shortTitle: "AI Chatbot",
        description: "Aplicación full-stack con entrada de voz y texto, conectada mediante APIs RESTful para una comunicación fluida con OpenAI.",
        purpose: "Ofrecer un asistente interactivo inteligente con comprensión de lenguaje natural y respuestas por voz.",
        problemSolved: "Permite búsquedas por voz con manos libres y conversación continua con latencia mínima de respuesta.",
        architecture: "Frontend en React.js, capa de servicios Spring Boot, base de datos Supabase y API de OpenAI.",
        keyFeatures: [
          "Modo dual de voz y texto con transmisión de respuestas en tiempo real",
          "Pasarela Spring Boot con límite de peticiones y proxy seguro de APIs",
          "Persistencia y registro histórico de conversaciones en base de datos Supabase",
          "Interfaz moderna en React con animación interactiva de ondas de audio"
        ]
      },
      {
        id: "ai-travel-planner",
        title: "Planificador de Viajes con IA",
        shortTitle: "TripMind AI",
        description: "Aplicación web que genera itinerarios de viaje personalizados según presupuesto, duración y preferencias, con desglose de costos.",
        purpose: "Facilitar la planificación de viajes completos con cronogramas realistas y estimaciones de gastos precisas.",
        problemSolved: "Elimina el estrés de planificar vacaciones al automatizar el cálculo de presupuestos y reservas según las restricciones del usuario.",
        architecture: "Lógica backend en Java y Spring Boot, almacenamiento en Supabase y cliente web interactivo.",
        keyFeatures: [
          "Generación de itinerarios ajustados exactamente al presupuesto del viajero",
          "Filtrado inteligente de destinos por proximidad geográfica",
          "Visualización interactiva de presupuestos y cronograma por días",
          "Diseño responsivo optimizado para navegación en teléfonos móviles"
        ]
      },
      {
        id: "weather-web",
        title: "Aplicación Web del Clima",
        shortTitle: "Weather Web",
        description: "Aplicación web que ofrece pronósticos meteorológicos en tiempo real, consultas asíncronas y recuperación de errores.",
        purpose: "Proveer información del clima, tendencias de temperatura y humedad para ciudades de todo el mundo.",
        problemSolved: "Permite consultas instantáneas sin recargas pesadas de página, con gestión de errores ante desconexiones.",
        architecture: "Aplicación en JavaScript nativo ligero con integración asíncrona a la API de OpenWeather.",
        keyFeatures: [
          "Búsqueda por ciudad con reporte en vivo de temperatura y estado climático",
          "Peticiones asíncronas con reintentos automáticos ante cortes de red",
          "Indicadores gráficos de velocidad del viento, presión y humedad",
          "Respuestas instantáneas mediante almacenamiento en caché en el cliente"
        ]
      },
      {
        id: "garden-view-resort",
        title: "Sitio Web Resort Garden View",
        shortTitle: "Garden View Resort",
        description: "Página web de hostelería que exhibe habitaciones, comodidades y reservas con un diseño elegante y moderno.",
        purpose: "Brindar a los huéspedes un portal atractivo para explorar suites y enviar solicitudes de reserva en línea.",
        problemSolved: "Mejora las reservas directas de clientes y optimiza los flujos de contacto para establecimientos hoteleros.",
        architecture: "Frontend en React conectado a microservicios Spring Boot y base de datos Supabase.",
        keyFeatures: [
          "Catálogo interactivo de habitaciones con galerías y lista de servicios",
          "Formulario de reserva con validación de datos y notificación al backend",
          "Visualización de precios dinámicos y promociones vigentes",
          "Compatibilidad total con computadoras, tabletas y teléfonos inteligentes"
        ]
      }
    ]
  },
  contact: {
    station: "06 — CONTACTO",
    heading: "CONSTRUYAMOS ALGO JUNTOS.",
    intro: "¿Tienes una pregunta o un proyecto en mente? Contáctame directamente a través de WhatsApp, Correo electrónico o LinkedIn. Siempre estoy abierto a nuevas oportunidades.",
    name: "NOMBRE",
    namePlaceholder: "Tu nombre completo",
    email: "CORREO ELECTRÓNICO",
    emailPlaceholder: "tu.correo@ejemplo.com",
    message: "MENSAJE",
    messagePlaceholder: "Describe tu proyecto o déjame un mensaje...",
    send: "ENVIAR MENSAJE",
    sending: "TRANSMITIENDO...",
    sent: "TRANSMISIÓN COMPLETADA",
    success: "MENSAJE ENVIADO CON ÉXITO",
    error: "ERROR AL ENVIAR. POR FAVOR, INTÉNTALO DE NUEVO.",
    whatsappLabel: "WHATSAPP DIRECTO",
    resumeLabel: "DESCARGAR CV",
    directChannels: "CANALES DIRECTOS"
  },
  chatbot: {
    title: "PREGUNTAR A ARJUN",
    subtitle: "Asistente de IA del Portafolio",
    placeholder: "Pregunta sobre HydraPay, Java, proyectos..."
  }
};

// 5. Portuguese (Português)
const pt = {
  loading: {
    title: "ARJUN RAJAWAT",
    status: ["INICIALIZANDO AMBIENTE", "CARREGANDO RECURSOS", "CONSTRUINDO CENA", "CONECTANDO SISTEMAS", "PRONTO"]
  },
  entry: {
    name: "ARJUN RAJAWAT",
    role: "DESENVOLVEDOR JAVA FULL STACK",
    status: "SISTEMA PRONTO",
    enter: "ENTRAR NO PORTFÓLIO",
    soundOn: "◉ SOM ATIVADO",
    soundOff: "◎ ATIVAR SOM",
    chooseLang: "ESCOLHER IDIOMA",
    selectLang: "Selecione seu idioma preferido",
    continue: "CONTINUAR →",
    change: "alterar"
  },
  privacy: {
    message: "Ao continuar a usar este site, você concorda com a nossa",
    policy: "Política de Privacidade",
    accept: "ACEITAR"
  },
  nav: {
    home: "INÍCIO",
    about: "SOBRE",
    skills: "SERVIÇOS",
    experience: "EXPERIÊNCIA",
    projects: "PROJETOS",
    contact: "CONTATO",
    engineerBadge: "ENGENHEIRO"
  },
  home: {
    greeting: "DESENVOLVEDOR JAVA FULL STACK",
    roles: ["DESENVOLVEDOR JAVA FULL STACK", "ENGENHEIRO BACKEND", "ENGENHEIRO DE SOFTWARE", "AUTOMAÇÃO EMPRESARIAL"],
    viewProjects: "VER PROJETOS",
    downloadResume: "BAIXAR CURRÍCULO",
    contactMe: "VAMOS CONSTRUIR ALGO"
  },
  about: {
    station: "02 — SOBRE",
    heading: "SOBRE MIM",
    intellectLabel: "INTELECTO E ARQUITETURA",
    bio: "Olá, sou Arjun Rajawat, desenvolvedor Java Full Stack e engenheiro de automação corporativa. Sou especialista na construção de arquiteturas tolerantes a falhas, sistemas no Google Apps Script, microsserviços Spring Boot e camadas de banco de dados robustas com zero perda de dados. Conheça meus projetos neste portfólio ou no meu GitHub.",
    tabTimeline: "FORMAÇÃO E JORNADA",
    tabSkills: "HABILIDADES E EXPERTISE",
    howIBuild: "COMO EU CONSTRUO",
    viewFullExperience: "Ver jornada completa",
    verifiedCertificate: "Certificado Verificado",
    principles: [
      "Sistemas tolerantes a falhas com zero perda de dados",
      "Transações ACID e escrituração contábil rigorosa por partidas dobradas",
      "Arquiteturas orientadas a eventos para alta escalabilidade",
      "Depuração em produção e otimização contínua de performance",
      "Código limpo, modular e de fácil manutenção"
    ],
    journey: [
      {
        id: "d-table-experience",
        year: "Julho 2026 – Presente",
        title: "Desenvolvedor Apps Script",
        institution: "D-Table Analytics, Bhopal",
        type: "Trabalho",
        details: "Construção e manutenção de sistemas corporativos com Google Apps Script, JavaScript, HTML, CSS e APIs do Google Sheets, incluindo RH, controle de ponto, O2D, compras FMS e estoques."
      },
      {
        id: "full-stack-java-course",
        year: "2025",
        title: "Curso Desenvolvedor Java Full Stack",
        institution: "Plataforma Online",
        type: "Treinamento",
        details: "Curso completo em desenvolvimento Java corporativo, abordando Spring Boot, APIs REST e integração moderna com frontend."
      },
      {
        id: "itrainu-training",
        year: "Dez 2024",
        title: "Treinamento Java Full Stack & Microsserviços",
        institution: "iTrainU Technologies, Indore",
        type: "Treinamento",
        details: "Java corporativo, Spring Boot e microsserviços, premiado com o 'Melhor Projeto' entre mais de 80 participantes."
      },
      {
        id: "jiwaji-bsc",
        year: "2025",
        title: "Bacharelado em Ciência da Computação",
        institution: "Universidade Jiwaji, Gwalior",
        type: "Educação",
        details: "Graduação com foco em estruturas de dados, algoritmos, sistemas operacionais e bancos de dados relacionais."
      },
      {
        id: "12th-grade",
        year: "2019",
        title: "Ensino Médio (12º Ano)",
        institution: "Sadhana Vidya Niketan, Bhind, M.P.",
        type: "Educação",
        details: "Conclusão do ensino médio com ênfase em Matemática e Ciências (66%)."
      },
      {
        id: "10th-grade",
        year: "2017",
        title: "Ensino Fundamental (10º Ano)",
        institution: "Scholars Public School, Bhind, M.P.",
        type: "Educação",
        details: "Desempenho com 7.0 CGPA em exames escolares."
      }
    ],
    skillCategories: [
      {
        title: "Java e Engenharia Backend",
        description: "Stack corporativa e frameworks modernos para processamento de alto volume e estabilidade.",
        skills: ["Java 21", "Spring Boot", "Spring MVC", "Hibernate / JPA", "REST API Design", "ACID Transactions", "Idempotency", "Double-Entry Ledger Design", "Transactional Outbox Pattern", "Event-Driven Architecture", "Role-Based Access Control (RBAC)", "SSO & Session Management"]
      },
      {
        title: "Google Apps Script e Automação",
        description: "Soluções corporativas completas no ecossistema Google para ERPs e processos automatizados.",
        skills: ["Google Apps Script", "Google Sheets API", "Apps Script Web Apps", "Triggers & Scheduled Tasks", "HTML Service", "ERP / MIS Dashboards", "Workflow & Approval Automation", "HRMS / O2D / FMS / IMS Systems", "Batch Processing", "Data Migration & Reconciliation"]
      },
      {
        title: "Bancos de Dados e Mensageria",
        description: "Camadas de persistência relacional, em memória e fluxo contínuo de eventos distribuídos.",
        skills: ["PostgreSQL 16", "MySQL", "Redis", "Apache Kafka", "HikariCP Connection Pooling", "Google Sheets as Database", "Query & Index Optimization", "Data Validation & Integrity"]
      },
      {
        title: "Performance e Testes",
        description: "Testes de estresse, benchmarks de concorrência e garantia de qualidade de ponta a ponta.",
        skills: ["K6 Load Testing", "Query & Index Optimization", "Connection Pooling", "Client-side Pagination", "Caching Strategies", "End-to-End Testing & Debugging", "Postman API Testing", "Production Debugging"]
      },
      {
        title: "Frontend e Dashboards",
        description: "Interfaces reativas elegantes, painéis com métricas dinâmicas e geração de relatórios.",
        skills: ["React.js", "JavaScript (ES2022+)", "HTML5 & CSS3", "Responsive UI Design", "Dynamic Dashboards", "KPI Cards & Data Tables", "Skeleton Loaders", "PDF / Excel / CSV Report Generation"]
      },
      {
        title: "Competências Profissionais",
        description: "Resolução metódica de desafios de engenharia, clareza técnica e entrega contínua.",
        skills: ["Requirement Analysis", "Client Communication", "Production Support", "Problem Solving", "Data Structures & Algorithms", "Git & GitHub", "Code Review & Maintainability", "Agile / Iterative Delivery"]
      }
    ]
  },
  skills: {
    station: "03 — SERVIÇOS",
    heading: "SERVIÇOS E CAPACIDADES",
    intro: "Como posso agregar valor ao seu projeto? Transformo requisitos técnicos complexos em sistemas seguros e de altíssimo desempenho, seja no backend transacional ou em portais interativos.",
    logicLabel: "LÓGICA E PRECISÃO MECÂNICA",
    services: [
      { title: "Desenvolvimento de APIs", desc: "Microsserviços RESTful robustos, endpoints Spring Boot, autenticação e fluxos transacionais seguros." },
      { title: "Aplicações Web", desc: "Portais web modernos desenvolvidos com Next.js, React, Tailwind CSS e alta responsividade." },
      { title: "Automação Corporativa", desc: "Google Apps Script, consolidação de ERPs, rotinas automáticas e fluxos sem falhas." },
      { title: "DevOps & CI/CD", desc: "Controle de versão com Git, conteinerização, esteiras automáticas de entrega contínua." },
      { title: "Arquitetura de Dados", desc: "MySQL, PostgreSQL, modelagem relacional, transações ACID e rigor contábil." },
      { title: "Computação em Nuvem", desc: "Infraestrutura escalável no Google Cloud Platform, microsserviços e alta disponibilidade." }
    ]
  },
  experience: {
    station: "04 — EXPERIÊNCIA",
    heading: "JORNADA",
    bgText: "JORNADA"
  },
  projects: {
    station: "05 — PROJETOS",
    heading: "PROJETOS DE ENGENHARIA",
    intro: "Explore meus principais projetos de software. Eles refletem dedicação técnica, segurança em operações financeiras e padrões avançados de desenvolvimento web.",
    detailsBadge: "DETALHES",
    projectDetail: "DETALHES DO PROJETO",
    purposeProblem: "OBJETIVO E PROBLEMA RESOLVIDO",
    architectureLabel: "ARQUITETURA",
    keyCapabilities: "PRINCIPAIS CAPACIDADES",
    metricsLabel: "MÉTRICAS DE DESEMPENHO",
    liveDemo: "DEMONSTRAÇÃO AO VIVO",
    viewCode: "VER CÓDIGO",
    close: "FECHAR",
    items: [
      {
        id: "hydrapay",
        title: "HydraPay — Motor de Liquidação Financeira e Razão por Partidas Dobradas",
        shortTitle: "HydraPay",
        description: "Motor financeiro tolerante a falhas com escrituração estrita por partidas dobradas, idempotência distribuída em 2 níveis e pipeline Outbox + Kafka — testado até 10.482 TPS com 13,4 ms de latência P99.",
        purpose: "Prover um livro-razão financeiro com consistência absoluta e zero perda de dados, processando milhares de pagamentos concorrentes sem débitos duplicados.",
        problemSolved: "Elimina concorrência desordenada, transações repetidas por instabilidade de rede e deadlocks em bancos de dados sob alta demanda.",
        architecture: "Spring Boot, HikariCP, PostgreSQL 16 com restrições de integridade, Redis e mensageria distribuída com Apache Kafka.",
        keyFeatures: [
          "Contabilidade por partidas dobradas garantindo igualdade exata de débitos e créditos",
          "Idempotência distribuída de 2 camadas (bloqueios Redis SETNX + restrições únicas PostgreSQL)",
          "Padrão Transactional Outbox integrado ao Kafka para publicação confiável sem perdas",
          "Bloqueio determinístico pessimista (SELECT FOR UPDATE) ordenado por conta para anular deadlocks",
          "Bateria de testes distribuídos K6 certificando estabilidade em estresse real"
        ],
        metrics: [
          { label: "Vazão", value: "10.482 TPS" },
          { label: "Latência P99", value: "13,4 ms" },
          { label: "Débitos Duplicados", value: "0 Falhas" },
          { label: "Deadlocks em DB", value: "0 Travamentos" }
        ]
      },
      {
        id: "ai-chatbot",
        title: "Chatbot com Inteligência Artificial",
        shortTitle: "AI Chatbot",
        description: "Aplicação completa com comando de voz e texto, integrada a APIs REST para conversação natural com a OpenAI.",
        purpose: "Oferecer um assistente conversacional inteligente com suporte a áudio e compreensão contextual.",
        problemSolved: "Possibilita consultas por voz com as mãos livres e respostas contínuas de baixa latência.",
        architecture: "Frontend em React.js, camada de serviços Spring Boot, banco de dados Supabase e modelo OpenAI.",
        keyFeatures: [
          "Interação dual por voz e texto com fluxo de resposta instantâneo",
          "Gateway Spring Boot com controle de taxa e proxy protegido de API",
          "Histórico de conversas persistido com segurança no Supabase",
          "Interface moderna em React com animação de ondas sonoras em tempo real"
        ]
      },
      {
        id: "ai-travel-planner",
        title: "Planejador de Viagens Inteligente",
        shortTitle: "TripMind AI",
        description: "Plataforma web que cria roteiros turísticos personalizados baseados em orçamento, calendário e preferências do usuário.",
        purpose: "Ajudar viajantes a elaborarem cronogramas de passeios com projeção orçamentária realista.",
        problemSolved: "Reduz o cansaço do planejamento de viagens ao automatizar despesas, estadias e roteiros conforme limitações financeiras.",
        architecture: "Serviços em Java e Spring Boot, catálogo persistido no Supabase e interface ágil no cliente.",
        keyFeatures: [
          "Geração de roteiros customizados aos limites exatos de orçamento",
          "Filtro inteligente de pontos turísticos por localização geográfica",
          "Detalhamento interativo de custos diários e cronograma",
          "Design limpo e adaptado perfeitamente para navegação em celulares"
        ]
      },
      {
        id: "weather-web",
        title: "Aplicativo Web de Previsão do Tempo",
        shortTitle: "Weather Web",
        description: "Portal meteorológico que fornece informações climáticas em tempo real com carregamento assíncrono e tolerância a erros.",
        purpose: "Entregar previsões do tempo, variações de temperatura e índices atmosféricos globais instantaneamente.",
        problemSolved: "Permite consultas rápidas sem páginas lentas, tratando falhas de conexão de forma transparente.",
        architecture: "Aplicação em JavaScript nativo com integração assíncrona aos dados da OpenWeather.",
        keyFeatures: [
          "Busca por cidades com atualização climática em tempo real",
          "Consultas assíncronas com tratamento para reconexão automática",
          "Indicadores visuais de vento, temperatura e umidade",
          "Respostas ágeis com aproveitamento de cache no navegador"
        ]
      },
      {
        id: "garden-view-resort",
        title: "Website Garden View Resort",
        shortTitle: "Garden View Resort",
        description: "Portal de hospitalidade que exibe chalés, acomodações e solicitações de reserva com layout moderno e envolvente.",
        purpose: "Oferecer aos hóspedes um canal visual para conhecer suítes e enviar pedidos de hospedagem com facilidade.",
        problemSolved: "Aumenta a captação de clientes e organiza o recebimento de contatos para empreendimentos de lazer.",
        architecture: "Frontend em React conectado a serviços Spring Boot e banco Supabase.",
        keyFeatures: [
          "Catálogo visual de quartos com galerias e lista de comodidades",
          "Formulário de reserva com verificação e aviso imediato no backend",
          "Apresentação de valores vigentes e descontos especiais",
          "Compatibilidade ampla com smartphones, tablets e computadores"
        ]
      }
    ]
  },
  contact: {
    station: "06 — CONTATO",
    heading: "VAMOS CONSTRUIR ALGO.",
    intro: "Tem uma pergunta ou ideia de projeto? Fale diretamente comigo via WhatsApp, E-mail ou LinkedIn. Estou sempre aberto a novas oportunidades.",
    name: "NOME",
    namePlaceholder: "Seu nome completo",
    email: "E-MAIL",
    emailPlaceholder: "seu.email@exemplo.com",
    message: "MENSAGEM",
    messagePlaceholder: "Descreva seu projeto ou sua dúvida...",
    send: "ENVIAR MENSAGEM",
    sending: "TRANSMITINDO...",
    sent: "TRANSMISSÃO CONCLUÍDA",
    success: "MENSAGEM ENVIADA COM SUCESSO",
    error: "FALHA NO ENVIO. POR FAVOR, TENTE NOVAMENTE.",
    whatsappLabel: "WHATSAPP DIRETO",
    resumeLabel: "BAIXAR CURRÍCULO",
    directChannels: "CANAIS DIRETOS"
  },
  chatbot: {
    title: "PERGUNTAR A ARJUN",
    subtitle: "Assistente de IA do Portfólio",
    placeholder: "Pergunte sobre HydraPay, Java, projetos..."
  }
};

// 6. German (Deutsch)
const de = {
  loading: {
    title: "ARJUN RAJAWAT",
    status: ["UMGEBUNG INITIALISIEREN", "ASSETS LADEN", "SZENE AUFBAUEN", "SYSTEME VERBINDEN", "BEREIT"]
  },
  entry: {
    name: "ARJUN RAJAWAT",
    role: "JAVA FULL-STACK-ENTWICKLER",
    status: "SYSTEM BEREIT",
    enter: "PORTFOLIO ÖFFNEN",
    soundOn: "◉ TON AN",
    soundOff: "◎ TON AKTIVIEREN",
    chooseLang: "SPRACHE WÄHLEN",
    selectLang: "Wählen Sie Ihre bevorzugte Sprache",
    continue: "WEITER →",
    change: "ändern"
  },
  privacy: {
    message: "Durch die weitere Nutzung dieser Website stimmen Sie unserer",
    policy: "Datenschutzerklärung zu",
    accept: "AKZEPTIEREN"
  },
  nav: {
    home: "START",
    about: "ÜBER MICH",
    skills: "LEISTUNGEN",
    experience: "WERDEGANG",
    projects: "PROJEKTE",
    contact: "KONTAKT",
    engineerBadge: "INGENIEUR"
  },
  home: {
    greeting: "JAVA FULL-STACK-ENTWICKLER",
    roles: ["JAVA FULL-STACK-ENTWICKLER", "BACKEND-INGENIEUR", "SOFTWARE-ENTWICKLER", "UNTERNEHMENSAUTOMATISIERUNG"],
    viewProjects: "PROJEKTE ANSEHEN",
    downloadResume: "LEBENSLAUF HERUNTERLADEN",
    contactMe: "GEMEINSAM ETWAS ERSCHAFFEN"
  },
  about: {
    station: "02 — ÜBER MICH",
    heading: "ÜBER MICH",
    intellectLabel: "VERSTAND & ARCHITEKTUR",
    bio: "Hallo, ich bin Arjun Rajawat, Java Full-Stack-Entwickler und Ingenieur für Unternehmensautomatisierung. Ich bin spezialisiert auf den Aufbau fehlertoleranter Architekturen, Google Apps Script-Systeme, Spring Boot-Microservices und robuste Datenbankebenen mit null Datenverlust. Entdecken Sie meine Projekte in diesem Portfolio oder auf meinem GitHub.",
    tabTimeline: "AUSBILDUNG & WERDEGANG",
    tabSkills: "FÄHIGKEITEN & EXPERTISE",
    howIBuild: "WIE ICH ENTWICKLE",
    viewFullExperience: "Vollständigen Werdegang ansehen",
    verifiedCertificate: "Verifiziertes Zertifikat",
    principles: [
      "Fehlertolerante Systeme ohne Datenverlust",
      "ACID-Transaktionen und strikte doppelte Buchführung",
      "Ereignisgesteuerte Architekturen für hohe Skalierbarkeit",
      "Produktions-Debugging und Leistungsoptimierung",
      "Sauberer, modularer und wartungsfreundlicher Quellcode"
    ],
    journey: [
      {
        id: "d-table-experience",
        year: "Juli 2026 – Heute",
        title: "Apps Script-Entwickler",
        institution: "D-Table Analytics, Bhopal",
        type: "Beruf",
        details: "Entwicklung und Betreuung von Unternehmensanwendungen mit Google Apps Script, JavaScript, HTML, CSS und Google Sheets APIs, darunter Personalverwaltung, Zeiterfassung, O2D, Einkaufs-FMS und ERP-Dashboards."
      },
      {
        id: "full-stack-java-course",
        year: "2025",
        title: "Full-Stack Java-Entwicklungskurs",
        institution: "Online-Plattform",
        type: "Weiterbildung",
        details: "Umfassender Kurs über Enterprise Java mit Spring Boot, REST-APIs und moderne Frontend-Architekturen."
      },
      {
        id: "itrainu-training",
        year: "Dez 2024",
        title: "Java Full-Stack- & Microservices-Training",
        institution: "iTrainU Technologies, Indore",
        type: "Weiterbildung",
        details: "Enterprise Java, Spring Boot, Microservices-Architekturen, ausgezeichnet mit dem 'Best Project Award' unter mehr als 80 Teilnehmern."
      },
      {
        id: "jiwaji-bsc",
        year: "2025",
        title: "Bachelor in Informatik (B.Sc.)",
        institution: "Jiwaji-Universität, Gwalior",
        type: "Ausbildung",
        details: "Informatik-Studium mit Schwerpunkten auf Datenstrukturen, Algorithmen, Betriebssystemen und Datenbanken."
      },
      {
        id: "12th-grade",
        year: "2019",
        title: "Höhere Sekundarstufe (12. Klasse)",
        institution: "Sadhana Vidya Niketan, Bhind, M.P.",
        type: "Ausbildung",
        details: "Abschluss mit Schwerpunkt in Mathematik und Naturwissenschaften (66%)."
      },
      {
        id: "10th-grade",
        year: "2017",
        title: "Mittlere Reife (10. Klasse)",
        institution: "Scholars Public School, Bhind, M.P.",
        type: "Ausbildung",
        details: "Abschlussprüfung mit 7.0 CGPA bestanden."
      }
    ],
    skillCategories: [
      {
        title: "Java & Backend-Entwicklung",
        description: "Enterprise-Frameworks und Kernsprachen für hochperformante, ausfallsichere Systeme.",
        skills: ["Java 21", "Spring Boot", "Spring MVC", "Hibernate / JPA", "REST API Design", "ACID Transactions", "Idempotency", "Double-Entry Ledger Design", "Transactional Outbox Pattern", "Event-Driven Architecture", "Role-Based Access Control (RBAC)", "SSO & Session Management"]
      },
      {
        title: "Google Apps Script & Automatisierung",
        description: "Vollständige Unternehmensautomatisierung im Google-Ökosystem für ERP, HR und Workflows.",
        skills: ["Google Apps Script", "Google Sheets API", "Apps Script Web Apps", "Triggers & Scheduled Tasks", "HTML Service", "ERP / MIS Dashboards", "Workflow & Approval Automation", "HRMS / O2D / FMS / IMS Systems", "Batch Processing", "Data Migration & Reconciliation"]
      },
      {
        title: "Datenbanken & Messaging",
        description: "Relationale, In-Memory- und Event-Streaming-Datenschichten für verteilte Systeme.",
        skills: ["PostgreSQL 16", "MySQL", "Redis", "Apache Kafka", "HikariCP Connection Pooling", "Google Sheets as Database", "Query & Index Optimization", "Data Validation & Integrity"]
      },
      {
        title: "Performance & Qualitätssicherung",
        description: "Lasttests, Nebenläufigkeits-Benchmarks und ganzheitliche Qualitätssicherung.",
        skills: ["K6 Load Testing", "Query & Index Optimization", "Connection Pooling", "Client-side Pagination", "Caching Strategies", "End-to-End Testing & Debugging", "Postman API Testing", "Production Debugging"]
      },
      {
        title: "Frontend & Dashboards",
        description: "Moderne reaktive Benutzeroberflächen, dynamische Dashboards und automatisierte Berichte.",
        skills: ["React.js", "JavaScript (ES2022+)", "HTML5 & CSS3", "Responsive UI Design", "Dynamic Dashboards", "KPI Cards & Data Tables", "Skeleton Loaders", "PDF / Excel / CSV Report Generation"]
      },
      {
        title: "Fachliche & Soziale Kompetenzen",
        description: "Strukturierte Problemlösung, Kundenkommunikation und Verantwortung im Produktivbetrieb.",
        skills: ["Requirement Analysis", "Client Communication", "Production Support", "Problem Solving", "Data Structures & Algorithms", "Git & GitHub", "Code Review & Maintainability", "Agile / Iterative Delivery"]
      }
    ]
  },
  skills: {
    station: "03 — LEISTUNGEN",
    heading: "LEISTUNGEN & FÄHIGKEITEN",
    intro: "Wie kann ich Ihnen helfen? Als Entwickler verwandle ich komplexe Anforderungen in verlässliche Systeme mit praxiserprobten Technologien im Frontend und Backend.",
    logicLabel: "LOGIK & PRÄZISION",
    services: [
      { title: "API-Entwicklung", desc: "Robuste RESTful-Microservices, Spring Boot-Endpunkte, Authentifizierung und sichere Transaktionspipelines." },
      { title: "Webanwendungen", desc: "Interaktive Hochleistungs-Webportale mit Next.js, React, Tailwind CSS und stabiler Zustandsverwaltung." },
      { title: "Unternehmensautomatisierung", desc: "Google Apps Script, ERP-Konsolidierer, automatisierte Zeitpläne und verlustfreie Workflows." },
      { title: "DevOps & CI/CD", desc: "Git-Versionskontrolle, containerisierte Deployments, automatisierte Pipelines und Continuous Integration." },
      { title: "Datenbankarchitektur", desc: "MySQL, PostgreSQL, Schemamodellierung, ACID-Transaktionen und strikte Konsistenzprüfung." },
      { title: "Cloud & Verteilte Systeme", desc: "Fehlertolerantes Cloud Computing, Google Cloud Platform-Infrastruktur und Microservice-Orchestrierung." }
    ]
  },
  experience: {
    station: "04 — ERFAHRUNG",
    heading: "WERDEGANG",
    bgText: "WERDEGANG"
  },
  projects: {
    station: "05 — PROJEKTE",
    heading: "ENGINEERING-PROJEKTE",
    intro: "Entdecken Sie meine wichtigsten Ingenieurprojekte. Sie spiegeln fundierte Erfahrung in der Full-Stack-Entwicklung, in Finanzsystemen und modernen Webtechnologien wider.",
    detailsBadge: "DETAILS",
    projectDetail: "PROJEKTDETAILS",
    purposeProblem: "ZWECK & GELÖSTES PROBLEM",
    architectureLabel: "ARCHITEKTUR",
    keyCapabilities: "HAUPTMERKMALE",
    metricsLabel: "LEISTUNGSMETRIKEN",
    liveDemo: "LIVE-DEMO",
    viewCode: "CODE ANSEHEN",
    close: "SCHLIESSEN",
    items: [
      {
        id: "hydrapay",
        title: "HydraPay — Finanzabrechnung & Doppelte Buchführungs-Engine",
        shortTitle: "HydraPay",
        description: "Fehlertolerante Finanzabrechnungs-Engine mit doppelter Buchführung, 2-stufiger verteilter Idempotenz und Outbox + Kafka-Pipeline — getestet bis 10.482 TPS bei 13,4 ms P99-Latenz.",
        purpose: "Bereitstellung eines Finanz-Ledgers ohne Datenverlust für tausende gleichzeitige Zahlungen ohne Doppelabbuchungen.",
        problemSolved: "Beseitigt Race Conditions, Transaktionsduplikate bei Netzwerk-Timeouts und Datenbank-Deadlocks unter hoher Last.",
        architecture: "Spring Boot-Serviceschicht, HikariCP-Connection-Pooling, PostgreSQL 16 mit Integritätsprüfungen, Redis und Apache Kafka.",
        keyFeatures: [
          "Strikte doppelte Buchführung stellt sicher, dass Soll und Haben bei jeder Transaktion übereinstimmen",
          "2-stufige verteilte Idempotenzebene (Redis SETNX-Sperren + PostgreSQL Unique Constraints)",
          "Transactional Outbox Pattern mit Kafka für garantierte verlustfreie Nachrichtenübermittlung",
          "Deterministisches pessimistisches Locking (SELECT FOR UPDATE) nach Konto-ID geordnet",
          "Automatisierte verteilte K6-Lasttestsuite zur realitätsnahen Validierung"
        ],
        metrics: [
          { label: "Durchsatz", value: "10.482 TPS" },
          { label: "P99-Latenz", value: "13,4 ms" },
          { label: "Doppelabbuchungen", value: "0 Fehler" },
          { label: "DB-Deadlocks", value: "0 Deadlocks" }
        ]
      },
      {
        id: "ai-chatbot",
        title: "KI-Chatbot",
        shortTitle: "AI Chatbot",
        description: "Full-Stack-Anwendung mit Sprach- und Texteingabe, angebunden über REST-APIs für natürliche Interaktion mit OpenAI.",
        purpose: "Bereitstellung eines multimodalen interaktiven KI-Assistenten mit Sprachverarbeitung und Sprachausgabe.",
        problemSolved: "Ermöglicht freihändige Sprachsuche und unterbrechungsfreie Konversationen mit minimaler Antwortverzögerung.",
        architecture: "React.js-Frontend über REST-Schnittstellen mit Spring Boot verbunden, Supabase-Datenbank und OpenAI API.",
        keyFeatures: [
          "Duale Sprach- und Texteingabe mit Echtzeit-Streaming der Antworten",
          "Spring Boot-Gateway mit Ratenbegrenzung und geschütztem API-Proxy",
          "Supabase-Integration zur Speicherung des Konversationsverlaufs",
          "Moderne React-Oberfläche mit dynamischer Audiowellen-Visualisierung"
        ]
      },
      {
        id: "ai-travel-planner",
        title: "KI-Gestützter Reiseplaner",
        shortTitle: "TripMind AI",
        description: "Intelligente Web-App, die maßgeschneiderte Reisepläne anhand von Budget, Reisedauer und Präferenzen generiert.",
        purpose: "Unterstützt Reisende bei der Erstellung realistischer Tagesabläufe mit genauen Kostenvoranschlägen.",
        problemSolved: "Befreit von langwieriger Reiseplanung durch automatische Budgetberechnung und passende Hotelvorschläge.",
        architecture: "Java & Spring Boot-Backend zur Verwaltung der Reisedaten, Supabase-Speicher und responsiver Client.",
        keyFeatures: [
          "Budgetgenaue Erstellung von Tagesabläufen und Reiseaktivitäten",
          "Dynamische Filterung von Reisezielen durch geografische Gruppierung",
          "Interaktive Kostenaufstellung und Zeitleisten-Visualisierung",
          "Für Smartphones optimierte, moderne Benutzeroberfläche"
        ]
      },
      {
        id: "weather-web",
        title: "Echtzeit-Wetter-Webanwendung",
        shortTitle: "Weather Web",
        description: "Webanwendung für weltweite Wetterdaten in Echtzeit mit asynchronem Laden und Ausfallsicherheit.",
        purpose: "Liefert weltweite Wetterberichte, Temperaturtrends und Luftfeuchtigkeitswerte auf einen Klick.",
        problemSolved: "Schnelle Wetterabfrage ohne schwere Seitenladezeiten und mit stabiler Fehlerbehandlung bei Netzausfällen.",
        architecture: "Schlanke Vanilla JavaScript-Anwendung mit asynchroner OpenWeather-API-Anbindung.",
        keyFeatures: [
          "Städtebasierte Suche mit sofortigem Wetter- und Temperaturbericht",
          "Asynchrones Abrufen mit automatischer Wiederherstellung bei Verbindungsabbrüchen",
          "Grafische Anzeigen für Temperatur, Windstärke und Luftfeuchtigkeit",
          "Schnelle Reaktionszeiten dank clientseitiger Zwischenspeicherung"
        ]
      },
      {
        id: "garden-view-resort",
        title: "Garden View Resort Website",
        shortTitle: "Garden View Resort",
        description: "Elegante Website für ein Urlaubshotel zur Präsentation von Suiten, Angeboten und direkten Buchungsanfragen.",
        purpose: "Bietet Gästen ein ansprechendes Portal zur Buchungsanfrage und Einsicht aller Hotelannehmlichkeiten.",
        problemSolved: "Steigert direkte Buchungsanfragen und vereinfacht den Kontakt für Hotelbetriebe.",
        architecture: "React-Frontend gekoppelt an Spring Boot-Dienste und Supabase-Datenbank.",
        keyFeatures: [
          "Interaktiver Zimmerkatalog mit Bildergalerien und Ausstattungslisten",
          "Buchungsformular mit automatischer Datenvalidierung und Backend-Benachrichtigung",
          "Anzeige saisonaler Angebote und aktueller Zimmerpreise",
          "Vollkommen responsives Design auf Smartphones, Tablets und Desktop-PCs"
        ]
      }
    ]
  },
  contact: {
    station: "06 — KONTAKT",
    heading: "GEMEINSAM ETWAS ERSCHAFFEN.",
    intro: "Haben Sie eine Frage oder möchten Sie ein Projekt besprechen? Kontaktieren Sie mich direkt über WhatsApp, E-Mail oder LinkedIn. Ich freue mich auf neue Herausforderungen.",
    name: "NAME",
    namePlaceholder: "Ihr vollständiger Name",
    email: "E-MAIL",
    emailPlaceholder: "ihre.email@beispiel.de",
    message: "NACHRICHT",
    messagePlaceholder: "Beschreiben Sie Ihr Anliegen oder Projekt...",
    send: "NACHRICHT SENDEN",
    sending: "WIRD GESENDET...",
    sent: "ÜBERTRAGUNG ABGESCHLOSSEN",
    success: "NACHRICHT ERFOLGREICH GESENDET",
    error: "FEHLER BEIM SENDEN. BITTE VERSUCHEN SIE ES ERNEUT.",
    whatsappLabel: "DIREKT PER WHATSAPP",
    resumeLabel: "LEBENSLAUF HERUNTERLADEN",
    directChannels: "DIREKTE KANÄLE"
  },
  chatbot: {
    title: "ARJUN FRAGEN",
    subtitle: "KI-Portfolio-Assistent",
    placeholder: "Fragen Sie nach HydraPay, Java, Fähigkeiten..."
  }
};

// 7. Japanese (日本語)
const ja = {
  loading: {
    title: "アルジュン・ラジャワット",
    status: ["環境を初期化中", "リソースをロード中", "シーンを構築中", "システムを接続中", "準備完了"]
  },
  entry: {
    name: "アルジュン・ラジャワット",
    role: "Java フルスタック開発者",
    status: "システム準備完了",
    enter: "ポートフォリオを見る",
    soundOn: "◉ 音声オン",
    soundOff: "◎ 音声を有効化",
    chooseLang: "言語を選択",
    selectLang: "希望する言語を選択してください",
    continue: "次へ進む →",
    change: "変更"
  },
  privacy: {
    message: "本サイトの利用を継続することにより、利用規約および",
    policy: "プライバシーポリシーに同意したものとみなされます",
    accept: "同意する"
  },
  nav: {
    home: "ホーム",
    about: "経歴・概要",
    skills: "サービス",
    experience: "経歴",
    projects: "プロジェクト",
    contact: "お問い合わせ",
    engineerBadge: "エンジニア"
  },
  home: {
    greeting: "Java フルスタック開発者",
    roles: ["Java フルスタック開発者", "バックエンドエンジニア", "ソフトウェアエンジニア", "エンタープライズ自動化"],
    viewProjects: "プロジェクトを見る",
    downloadResume: "履歴書をダウンロード",
    contactMe: "プロジェクトを始めましょう"
  },
  about: {
    station: "02 — 経歴・概要",
    heading: "自己紹介",
    intellectLabel: "知性とアーキテクチャ",
    bio: "こんにちは。Javaフルスタック開発者およびエンタープライズ自動化エンジニアのアルジュン・ラジャワットです。データ損失ゼロの耐障害性アーキテクチャ、Google Apps Scriptシステム、Spring Bootマイクロサービス、堅牢なデータベース層の構築を専門としています。このポートフォリオまたはGitHubで開発プロジェクトをご覧ください。",
    tabTimeline: "学歴と経歴",
    tabSkills: "スキルと専門知識",
    howIBuild: "開発理念",
    viewFullExperience: "すべての経歴を見る",
    verifiedCertificate: "認定証明書",
    principles: [
      "データ損失ゼロを実現する耐障害性システム",
      "ACIDトランザクションと厳格な複式簿記管理",
      "スケーラビリティのためのイベント駆動型設計",
      "本番運用のデバッグとパフォーマンス最適化",
      "クリーンでモジュール化された保守性の高いコード"
    ],
    journey: [
      {
        id: "d-table-experience",
        year: "2026年7月 – 現在",
        title: "Apps Script 開発者",
        institution: "D-Table Analytics, Bhopal",
        type: "実務経験",
        details: "Google Apps Script、JavaScript、HTML、CSS、Google Sheets APIを活用したエンタープライズ業務アプリの構築と保守。勤怠管理、受注配送管理、購買管理、在庫管理、ERPダッシュボードの開発を担当。"
      },
      {
        id: "full-stack-java-course",
        year: "2025年",
        title: "フルスタック Java 開発コース",
        institution: "オンライン学習プラットフォーム",
        type: "トレーニング",
        details: "エンタープライズSpring Boot、REST API設計、最新フロントエンド統合を網羅した包括的な実践コース。"
      },
      {
        id: "itrainu-training",
        year: "2024年12月",
        title: "Java フルスタック＆マイクロサービス研修",
        institution: "iTrainU Technologies, Indore",
        type: "トレーニング",
        details: "エンタープライズJava、Spring Boot、マイクロサービス設計の習得。受講生80名以上の中で「最優秀プロジェクト賞」を受賞。"
      },
      {
        id: "jiwaji-bsc",
        year: "2025年",
        title: "コンピュータサイエンス学士（B.Sc.）",
        institution: "Jiwaji 大学, Gwalior",
        type: "学歴",
        details: "データ構造、アルゴリズム、OS、データベース理論を中心としたコンピュータサイエンスの学士号取得。"
      },
      {
        id: "12th-grade",
        year: "2019年",
        title: "高等中等教育（高校課程）",
        institution: "Sadhana Vidya Niketan, Bhind, M.P.",
        type: "学歴",
        details: "数学・理科専攻で修了（成績66%）。"
      },
      {
        id: "10th-grade",
        year: "2017年",
        title: "中等教育（中学校課程）",
        institution: "Scholars Public School, Bhind, M.P.",
        type: "学歴",
        details: "中等教育修了試験にて7.0 CGPAを取得。"
      }
    ],
    skillCategories: [
      {
        title: "Java ＆ バックエンド開発",
        description: "高スループットと耐障害性を支えるエンタープライズ標準スタック。",
        skills: ["Java 21", "Spring Boot", "Spring MVC", "Hibernate / JPA", "REST API Design", "ACID Transactions", "Idempotency", "Double-Entry Ledger Design", "Transactional Outbox Pattern", "Event-Driven Architecture", "Role-Based Access Control (RBAC)", "SSO & Session Management"]
      },
      {
        title: "Google Apps Script ＆ 業務自動化",
        description: "Googleエコシステムを活用したERP、勤怠、承認フローの全自動化開発。",
        skills: ["Google Apps Script", "Google Sheets API", "Apps Script Web Apps", "Triggers & Scheduled Tasks", "HTML Service", "ERP / MIS Dashboards", "Workflow & Approval Automation", "HRMS / O2D / FMS / IMS Systems", "Batch Processing", "Data Migration & Reconciliation"]
      },
      {
        title: "データベース ＆ メッセージング",
        description: "分散システムのためのRDB、インメモリキャッシュ、イベントストリーム。",
        skills: ["PostgreSQL 16", "MySQL", "Redis", "Apache Kafka", "HikariCP Connection Pooling", "Google Sheets as Database", "Query & Index Optimization", "Data Validation & Integrity"]
      },
      {
        title: "パフォーマンス ＆ 品質テスト",
        description: "負荷テスト、並行性検証、エンドツーエンドの品質保証。",
        skills: ["K6 Load Testing", "Query & Index Optimization", "Connection Pooling", "Client-side Pagination", "Caching Strategies", "End-to-End Testing & Debugging", "Postman API Testing", "Production Debugging"]
      },
      {
        title: "フロントエンド ＆ レポーティング",
        description: "モダンなUI、動的分析ダッシュボード、自動帳票レポート生成。",
        skills: ["React.js", "JavaScript (ES2022+)", "HTML5 & CSS3", "Responsive UI Design", "Dynamic Dashboards", "KPI Cards & Data Tables", "Skeleton Loaders", "PDF / Excel / CSV Report Generation"]
      },
      {
        title: "専門スキル ＆ 協調性",
        description: "要件分析、論理的課題解決、本番システム保守運用。",
        skills: ["Requirement Analysis", "Client Communication", "Production Support", "Problem Solving", "Data Structures & Algorithms", "Git & GitHub", "Code Review & Maintainability", "Agile / Iterative Delivery"]
      }
    ]
  },
  skills: {
    station: "03 — サービス",
    heading: "提供サービスとスキル",
    intro: "どのようなサポートが可能か？開発者として、複雑な要件を信頼性の高いシステムへと具現化します。業務自動化からスケーラブルなAPI設計まで、確かな価値をお届けします。",
    logicLabel: "論理と機械的精度",
    services: [
      { title: "API 開発", desc: "堅牢なRESTfulマイクロサービス、Spring Bootエンドポイント、認証機能、安全なトランザクション。" },
      { title: "Web アプリケーション", desc: "Next.js、React、Tailwind CSSを用いた高性能でインタラクティブなWebポータル開発。" },
      { title: "エンタープライズ自動化", desc: "Google Apps Script、ERP統合、自動スケジューリングエンジン、データ損失ゼロのワークフロー。" },
      { title: "DevOps ＆ CI/CD", desc: "Gitバージョン管理、コンテナ化デプロイ、パイプライン自動化、継続的インテグレーション。" },
      { title: "データベース設計", desc: "MySQL、PostgreSQL、スキーマ最適化、ACIDトランザクション、厳格なデータ整合性維持。" },
      { title: "クラウド ＆ 分散システム", desc: "耐障害性の高いクラウド運用、Google Cloud Platform、マイクロサービスオーケストレーション。" }
    ]
  },
  experience: {
    station: "04 — 経歴",
    heading: "経歴・軌跡",
    bgText: "経歴・軌跡"
  },
  projects: {
    station: "05 — プロジェクト",
    heading: "開発プロジェクト",
    intro: "主要なエンジニアリングプロジェクトをご覧ください。フルスタック開発、金融システム、モダンWeb技術への取り組みと実績を反映しています。",
    detailsBadge: "詳細を見る",
    projectDetail: "プロジェクト詳細",
    purposeProblem: "開発目的と解決した課題",
    architectureLabel: "アーキテクチャ",
    keyCapabilities: "主要機能・特徴",
    metricsLabel: "パフォーマンス実績",
    liveDemo: "ライブデモ",
    viewCode: "コードを見る",
    close: "閉じる",
    items: [
      {
        id: "hydrapay",
        title: "HydraPay — 高スループット金融決済＆複式簿記エンジン",
        shortTitle: "HydraPay",
        description: "厳格な複式簿記、2層分散べき等性、Outbox + Kafkaパイプラインを備えた耐障害性金融決済エンジン。10,482 TPS、P99レイテンシ13.4msで負荷テスト検証済み。",
        purpose: "重複引き落としや競合状態を起こさずに、毎秒数千件の同時決済を安全に処理できるデータ損失ゼロの金融元帳を提供。",
        problemSolved: "ネットワーク切断時の二重決済、高負荷時のデッドロック、分散サービス間の通知不整合を完全に排除。",
        architecture: "Spring Boot、HikariCP接続プール、PostgreSQL 16整合性制約、Redis高速ロック、Apache Kafka非同期決済。",
        keyFeatures: [
          "毎回のトランザクションで借方と貸方が厳密に一致する複式簿記台帳",
          "2層分散べき等性レイヤー（Redis SETNX + PostgreSQL一意制約）",
          "データ損失ゼロのイベント配信を行うTransactional OutboxパターンとKafka統合",
          "デッドロックを防止する口座ID順の決定論的排他ロック（SELECT FOR UPDATE）",
          "実環境の並行アクセスを再現した自動K6負荷テストスイート"
        ],
        metrics: [
          { label: "スループット", value: "10,482 TPS" },
          { label: "P99 レイテンシ", value: "13.4 ms" },
          { label: "二重引き落とし", value: "0 件（完全防止）" },
          { label: "DB デッドロック", value: "0 件" }
        ]
      },
      {
        id: "ai-chatbot",
        title: "マルチモーダル AI チャットボット",
        shortTitle: "AI Chatbot",
        description: "音声およびテキスト入力に対応し、REST APIを介してOpenAIとシームレスに対話できるフルスタックアプリ。",
        purpose: "自然言語処理と音声認識を備えたインタラクティブなAIアシスタントの提供。",
        problemSolved: "ハンズフリーの音声検索と高速ストリーミング応答により待ち時間のない自然な会話を実現。",
        architecture: "React.jsフロントエンド、Spring Bootバックエンドゲートウェイ、Supabase、OpenAI API。",
        keyFeatures: [
          "音声とテキストのデュアル入力およびリアルタイムストリーミング応答",
          "レート制限と安全なAPIプロキシを備えたSpring Bootゲートウェイ",
          "会話履歴の保持とログ管理のためのSupabaseデータベース統合",
          "リアルタイム音声波形アニメーションを備えた最新React UI"
        ]
      },
      {
        id: "ai-travel-planner",
        title: "AI 搭載トラベルプランナー",
        shortTitle: "TripMind AI",
        description: "予算、日数、ユーザーの好みに基づいてパーソナライズされた旅行日程を生成するWebアプリケーション。",
        purpose: "旅行者が現実的な費用試算とスケジュールを含む旅程を瞬時に計画できるよう支援。",
        problemSolved: "予算計算や宿泊先の選定を自動化し、旅行計画にかかる手間とストレスを大幅に軽減。",
        architecture: "観光地データを管理するJava & Spring Boot、Supabaseストレージ、快適なWebフロントエンド。",
        keyFeatures: [
          "指定予算に合わせた最適な旅行プランの自動生成",
          "地理的クラスタリングによる効率的な観光地フィルタリング",
          "インタラクティブな費用内訳とタイムラインの視覚化",
          "スマートフォンでの操作に最適化された直感的なデザイン"
        ]
      },
      {
        id: "weather-web",
        title: "リアルタイム気象情報アプリ",
        shortTitle: "Weather Web",
        description: "世界中の最新気象データを取得し、非同期通信と確実なエラー処理を備えた軽量Webアプリケーション。",
        purpose: "世界各地の天候、気温、湿度、気圧データを即座に提供。",
        problemSolved: "重いページ更新なしで高速に天気を取得し、通信障害時もスムーズに自動回復。",
        architecture: "OpenWeather APIと非同期連携する軽量Vanilla JavaScriptアプリケーション。",
        keyFeatures: [
          "都市名入力によるリアルタイム気象および気温レポート",
          "ネットワークエラーからの自動リカバリを備えた非同期フェッチ",
          "気温、風速、湿度を分かりやすく表すビジュアルインジケーター",
          "クライアント側キャッシュによる瞬時の応答性"
        ]
      },
      {
        id: "garden-view-resort",
        title: "Garden View リゾート公式サイト",
        shortTitle: "Garden View Resort",
        description: "客室、サービス、予約リクエストを美しく紹介するリゾートホテルのWebサイト。",
        purpose: "宿泊客がスイートルームや館内施設を確認し、オンラインで手軽に予約申込を行えるポータルの提供。",
        problemSolved: "洗練されたデザインで宿泊客の成約率を高め、予約問い合わせの受付を円滑化。",
        architecture: "Reactフロントエンド、Spring Bootバックエンド、Supabaseデータベース連携。",
        keyFeatures: [
          "ギャラリーと設備一覧を備えたインタラクティブな客室カタログ",
          "入力検証と管理者通知を備えた宿泊予約リクエスト機能",
          "季節限定プランや最新料金のわかりやすい表示",
          "PC、タブレット、スマートフォンに完全対応したレスポンシブ設計"
        ]
      }
    ]
  },
  contact: {
    station: "06 — お問い合わせ",
    heading: "新しいプロジェクトを始めましょう。",
    intro: "ご質問や開発のご相談がございましたら、WhatsApp、メール、またはLinkedInからお気軽にご連絡ください。新しい機会を歓迎しています。",
    name: "お名前",
    namePlaceholder: "お名前を入力",
    email: "メールアドレス",
    emailPlaceholder: "your.email@example.com",
    message: "メッセージ",
    messagePlaceholder: "ご相談内容やプロジェクトの詳細をご記入ください...",
    send: "メッセージを送信",
    sending: "送信中...",
    sent: "送信完了",
    success: "メッセージが正常に送信されました",
    error: "送信に失敗しました。もう一度お試しください。",
    whatsappLabel: "WhatsApp で直接連絡",
    resumeLabel: "履歴書をダウンロード",
    directChannels: "直接連絡先"
  },
  chatbot: {
    title: "アルジュンに質問",
    subtitle: "AI ポートフォリオアシスタント",
    placeholder: "HydraPay、Java、開発スキルについて質問..."
  }
};

const allLangs = { en, hi, fr, es, pt, de, ja };

for (const [code, data] of Object.entries(allLangs)) {
  const filePath = path.join(i18nDir, `${code}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Generated ${code}.json (${(JSON.stringify(data).length / 1024).toFixed(1)} KB)`);
}

console.log('All 7 translation files successfully created with 100% complete content!');
