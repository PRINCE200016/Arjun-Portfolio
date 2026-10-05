import {
  personalInfo,
  journeyData,
  experienceData,
  skillCategories,
  featuredSkills,
  projectsData,
  suggestedQuestions,
} from '@/data/portfolioData';

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

/**
 * Intelligent conversation engine built directly on the portfolioData single source of truth.
 * Handles English, Hindi, and Hinglish queries, project deep-dives, experience, skills,
 * education, and polite out-of-scope boundaries.
 */
export function getBotResponse(userMessage: string, chatHistory: ChatMessage[] = []): string {
  const query = userMessage.toLowerCase().trim();

  // Normalize Hindi / Hinglish and common question phrases
  const isHindi =
    query.includes('kya') ||
    query.includes('kaun') ||
    query.includes('batao') ||
    query.includes('kaise') ||
    query.includes('kahan') ||
    query.includes('baray') ||
    query.includes('bare') ||
    query.includes('karta');

  // 1. OUT OF SCOPE / UNKNOWN TOPIC CHECK
  // Keywords related to Arjun, portfolio, tech, career
  const relevantKeywords = [
    'arjun', 'rajawat', 'prince', 'he', 'his', 'him', 'developer', 'you', 'who', 'about',
    'hydrapay', 'hydra', 'ledger', 'settlement', 'tps', 'kafka', 'k6', 'idempotency', 'outbox',
    'd-table', 'dtable', 'analytics', 'apps script', 'google sheets', 'sheets', 'hrms', 'o2d', 'fms', 'ims', 'erp',
    'experience', 'work', 'job', 'company', 'career', 'intern', 'role',
    'project', 'projects', 'chatbot', 'travel', 'tripmind', 'weather', 'resort', 'garden',
    'skill', 'skills', 'tech', 'technology', 'technologies', 'stack', 'java', 'spring', 'react',
    'postgres', 'postgresql', 'redis', 'mysql', 'hibernate', 'api', 'rest', 'git', 'github',
    'education', 'college', 'university', 'degree', 'bsc', 'b.sc', 'school', '12th', '10th',
    'training', 'itrainu', 'course', 'certificate', 'award', 'journey',
    'contact', 'email', 'gmail', 'mail', 'phone', 'mobile', 'call', 'number', 'linkedin', 'address', 'location', 'live', 'bhopal', 'bhind', 'indore',
    'age', 'old', 'resume', 'cv', 'hire', 'salary', 'hobbies', 'interests'
  ];

  const hasRelevantKeyword = relevantKeywords.some((kw) => query.includes(kw));

  // If query is long (>3 words) and matches zero relevant keywords, politely decline
  const wordCount = query.split(/\s+/).length;
  if (!hasRelevantKeyword && wordCount >= 3) {
    if (isHindi) {
      return "Main sirf Arjun Rajawat ke professional portfolio, projects, skills, education aur experience ke baare me jankari de sakta hoon. Agar aap kisi aur vishay par charcha karna chahte hain, toh aap Arjun se seedhe Contact section ya arjunrajawat28@gmail.com par sampark kar sakte hain!";
    }
    return "I specialize specifically in providing information about Arjun Rajawat's professional portfolio, engineering projects, skills, and work experience. For any inquiries outside his portfolio or for professional collaborations, please feel free to reach out to Arjun directly via the Contact section or at arjunrajawat28@gmail.com!";
  }

  // 2. HYDRAPAY PROJECT (Deep-dive, Architecture, Benchmarks, Links)
  if (
    query.includes('hydrapay') ||
    query.includes('hydra') ||
    (query.includes('ledger') && (query.includes('project') || query.includes('engine') || query.includes('settlement'))) ||
    query.includes('10482') ||
    query.includes('10,482') ||
    query.includes('double-entry') ||
    query.includes('double entry')
  ) {
    const hp = projectsData[0]; // HydraPay
    const metricsStr = hp.metrics?.map((m) => `${m.value} (${m.label})`).join(', ');

    if (
      query.includes('architecture') ||
      query.includes('explain') ||
      query.includes('how') ||
      query.includes('deep') ||
      query.includes('detail')
    ) {
      return `**HydraPay Architecture Deep-Dive:**
HydraPay is a high-throughput financial settlement and double-entry ledger engine built with **Java 21, Spring Boot, PostgreSQL 16, Redis, Apache Kafka, HikariCP, and K6**.

Key architectural pillars:
• **Double-Entry Bookkeeping:** Every transaction maintains strict balance invariants (Debits = Credits) wrapped in ACID transactions.
• **Concurrency & Deadlock Prevention:** Uses deterministic \`SELECT FOR UPDATE\` pessimistic locking ordered by Account ID to prevent balance drift and database deadlocks.
• **2-Tier Distributed Idempotency:** Redis \`SETNX\` provides fast sub-millisecond locking, backed by PostgreSQL unique constraints to eliminate duplicate debits during network timeouts.
• **Transactional Outbox + Kafka:** Emits settlement events asynchronously without distributed transaction overhead.
• **Performance Metrics:** Validated via K6 load tests to **10,482 TPS** at **13.4 ms P99 latency** with **0 double-debits** and **0 deadlocks**.

🔗 **GitHub Repository:** [HydraPay on GitHub](${hp.github})`;
    }

    return `**${hp.title}**
• **What it is:** ${hp.description}
• **Tech Stack:** ${hp.tech.join(', ')}
• **Verified Benchmarks:** ${metricsStr}
• **Key Innovations:** Strict double-entry ledger, 2-tier idempotency (Redis SETNX + PostgreSQL constraints), and Transactional Outbox pattern with Kafka.
• **GitHub:** [${hp.github}](${hp.github})`;
  }

  // 3. D-TABLE ANALYTICS & CURRENT WORK EXPERIENCE
  if (
    query.includes('d-table') ||
    query.includes('dtable') ||
    query.includes('apps script') ||
    query.includes('current role') ||
    (query.includes('what') && query.includes('do') && (query.includes('work') || query.includes('job') || query.includes('company'))) ||
    (query.includes('kya') && query.includes('karta') && (query.includes('arjun') || query.includes('kaam')))
  ) {
    const exp = experienceData[0];
    return `Arjun works as an **${exp.role}** at **${exp.company}** (${exp.location}, ${exp.duration}).

**Key Work & Enterprise Systems:**
• **Enterprise Business Applications:** Builds and enhances HRMS, Attendance Management, Order-to-Dispatch (O2D), Purchase FMS, Inventory Management System (IMS), Sales FMS, and centralized ERP dashboards.
• **Backend & Automation:** Develops automated workflows using Google Apps Script, JavaScript, Google Sheets APIs, automated approval pipelines, and scheduled tasks.
• **Security & Access Control:** Implements Role-Based Access Control (RBAC), secure SSO, and session management.
• **Performance Optimization:** Achieved faster response times via batch processing, caching, deferred loading, client-side pagination, and spreadsheet operation tuning.
• **Enterprise Task Engine:** Contributed to the Enterprise Task Consolidator and Automated Scheduling Engine for recurring task automation.`;
  }

  // 4. MY JOURNEY / EDUCATION / ACADEMICS / TRAINING / AWARDS
  if (
    query.includes('education') ||
    query.includes('degree') ||
    query.includes('college') ||
    query.includes('university') ||
    query.includes('jiwaji') ||
    query.includes('itrainu') ||
    query.includes('journey') ||
    query.includes('academic') ||
    query.includes('training') ||
    query.includes('award') ||
    query.includes('school') ||
    query.includes('10th') ||
    query.includes('12th') ||
    query.includes('b.sc') ||
    query.includes('bsc')
  ) {
    return `**Arjun Rajawat's Journey (Career & Academics):**
1. **Apps Script Developer** – D-Table Analytics, Bhopal (*July 2026 – Present*) [Work]
2. **Full Stack Java Development Course** – Online Platform (*2025*) [Training]
3. **Java Full Stack Development Training** – iTrainU Technologies, Indore (*Dec 2024*) [Training]  
   🏆 *Awarded the Best Project Award among 80+ trainees!*
4. **B.Sc. Computer Science** – Jiwaji University, Gwalior (*2025*) [Education]
5. **12th Grade** – Sadhana Vidya Niketan, Bhind (*2019*) – 66% [Education]
6. **10th Grade** – Scholars Public School, Bhind (*2017*) – 7.0 CGPA [Education]`;
  }

  // 5. PROJECTS (All projects, or specific other projects)
  if (
    query.includes('all project') ||
    query.includes('show me his project') ||
    query.includes('show me projects') ||
    query.includes('list project') ||
    (query.includes('project') && !query.includes('chatbot') && !query.includes('travel') && !query.includes('weather') && !query.includes('resort'))
  ) {
    return `Arjun has built high-performance enterprise and web applications:

1. **HydraPay** (Featured) – High-Throughput Financial Settlement & Double-Entry Ledger Engine (Java 21, Spring Boot, PostgreSQL 16, Redis, Kafka, K6)  
   Load-tested to **10,482 TPS** at 13.4 ms P99.  
   🔗 [GitHub](${projectsData[0].github})

2. **AI Chatbot** – Full-stack multimodal chatbot with voice & text input (Spring Boot, Supabase, React, OpenAI)  
   🔗 [GitHub](${projectsData[1].github}) | [Live Demo](${projectsData[1].liveDemo})

3. **AI-Powered Travel Planner (TripMind AI)** – Intelligent itinerary builder with constraint validation (Spring Boot, Java, Supabase, React)  
   🔗 [GitHub](${projectsData[2].github}) | [Live Demo](${projectsData[2].liveDemo})

4. **Weather Web Application** – Live weather forecast app with asynchronous fetching (JavaScript, OpenWeather API)  
   🔗 [GitHub](${projectsData[3].github}) | [Live Demo](${projectsData[3].liveDemo})

5. **Garden View Resort Website** – Modern hospitality suite showcase and booking portal (Java, React, Spring Boot, Supabase)  
   🔗 [GitHub](${projectsData[4].github}) | [Live Demo](${projectsData[4].liveDemo})`;
  }

  // Specific project queries:
  if (query.includes('travel') || query.includes('tripmind')) {
    const p = projectsData[2];
    return `**${p.title}** (${p.shortTitle}):
• **Description:** ${p.description}
• **Tech Stack:** ${p.tech.join(', ')}
• **Key Features:** Constraint-aware itinerary generation, cost calculation, and dynamic destination filtering.
• **GitHub:** [${p.github}](${p.github})
• **Live Demo:** [${p.liveDemo}](${p.liveDemo})`;
  }

  if (query.includes('weather')) {
    const p = projectsData[3];
    return `**${p.title}**:
• **Description:** ${p.description}
• **Tech Stack:** ${p.tech.join(', ')}
• **Key Features:** Real-time city search, asynchronous weather metrics, temperature & humidity indicators.
• **GitHub:** [${p.github}](${p.github})
• **Live Demo:** [${p.liveDemo}](${p.liveDemo})`;
  }

  if (query.includes('resort') || query.includes('garden view')) {
    const p = projectsData[4];
    return `**${p.title}**:
• **Description:** ${p.description}
• **Tech Stack:** ${p.tech.join(', ')}
• **Key Features:** Interactive suite catalog, booking inquiry submissions, and dynamic pricing highlights.
• **GitHub:** [${p.github}](${p.github})
• **Live Demo:** [${p.liveDemo}](${p.liveDemo})`;
  }

  // 6. SKILLS & TECHNICAL STACK
  if (
    query.includes('skill') ||
    query.includes('tech') ||
    query.includes('stack') ||
    query.includes('tools') ||
    query.includes('programming') ||
    query.includes('language')
  ) {
    if (query.includes('top') || query.includes('best') || query.includes('core')) {
      return `Arjun's core technical proficiencies include:
• **Backend & Distributed Systems:** Java 21, Spring Boot, REST APIs, Microservices, Hibernate
• **Enterprise Automation:** Google Apps Script, Google Sheets API, ERP/MIS Dashboards, Web Apps
• **Databases & Caching:** PostgreSQL 16, Redis, MySQL, Google Sheets as Database
• **Messaging & Streaming:** Apache Kafka, Transactional Outbox Pattern
• **Performance & Testing:** K6 Load Testing, HikariCP Connection Pooling, Query Optimization
• **Frontend:** React.js, JavaScript, Tailwind CSS, Dynamic Dashboards, HTML/CSS`;
    }

    return `Arjun has a rich technical stack categorized across:
1. **Google Apps Script & Enterprise Development:** Google Apps Script, Google Sheets API, Apps Script Web Apps, Scheduled Triggers, ERP/MIS Dashboards, Approval Workflows.
2. **Backend & Architecture:** RBAC, SSO & Session Management, ACID Transactions, Idempotency, Double-Entry Ledger Design, Transactional Outbox Pattern, Event-Driven Architecture.
3. **Java Stack:** Java 21, Spring Boot, Hibernate.
4. **Databases & Messaging:** PostgreSQL 16, Redis, Apache Kafka, HikariCP, MySQL.
5. **Performance & Testing:** K6 Load Testing, Index Optimization, Connection Pooling, Client-side Pagination, Postman.
6. **Frontend & Reporting:** React.js, JavaScript, Responsive UI, Dynamic Dashboards, PDF/Excel/CSV generation.`;
  }

  // 7. CONTACT & PROFILE
  if (
    query.includes('contact') ||
    query.includes('email') ||
    query.includes('gmail') ||
    query.includes('phone') ||
    query.includes('call') ||
    query.includes('number') ||
    query.includes('linkedin') ||
    query.includes('github') ||
    query.includes('reach') ||
    query.includes('sampark')
  ) {
    return `You can reach Arjun Rajawat directly through:
• **Email:** [${personalInfo.email}](mailto:${personalInfo.email})
• **Phone:** [${personalInfo.phone}](tel:${personalInfo.phone})
• **LinkedIn:** [${personalInfo.linkedin}](${personalInfo.linkedin})
• **GitHub:** [${personalInfo.github}](${personalInfo.github})
• **Location:** Bhopal, Madhya Pradesh, India`;
  }

  // 8. ABOUT ARJUN / WHO IS ARJUN / LOCATION / AGE
  if (
    query.includes('about') ||
    query.includes('who is') ||
    query.includes('profile') ||
    query.includes('arjun') ||
    query.includes('background') ||
    query.includes('age') ||
    query.includes('location') ||
    query.includes('bhopal') ||
    query.includes('bhind')
  ) {
    return `**Arjun Rajawat** (also known as Prince Rajawat) is a **26-year-old software developer** based in **Bhopal, Madhya Pradesh, India** (hometown: Bhind, MP).

He currently works as an **Apps Script Developer at D-Table Analytics**, engineering enterprise automation platforms (HRMS, Attendance, O2D, FMS, ERP Dashboards). He is also an expert in **Java Full Stack development (Java 21, Spring Boot)** and high-concurrency systems, having architected **HydraPay** (10,482 TPS settlement engine).

He holds a B.Sc. in Computer Science from Jiwaji University Gwalior and earned the **Best Project Award among 80+ trainees** during his Java Full Stack training at iTrainU Technologies Indore.`;
  }

  // 9. DEFAULT HELPFUL FALLBACK
  return `Arjun Rajawat is a 26-year-old Apps Script Developer at D-Table Analytics and Java Full Stack Engineer based in Bhopal. He specializes in enterprise workflow automation, Spring Boot, high-throughput architectures (like HydraPay at 10,482 TPS), and React.

Would you like to know more about:
• **HydraPay** architecture and benchmarks
• His work at **D-Table Analytics**
• His technical **skills**
• His **educational background** and training award
• How to **contact** him?`;
}
