import { CareerTrack, ProjectRecommendation, RoadmapPhase } from '../types';

export const CAREER_TRACKS: CareerTrack[] = [
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    tagline: 'Architect intelligent systems, LLM agents, and deep learning pipelines.',
    description: 'Design and deploy production-grade machine learning models, retrieval-augmented generation (RAG) engines, and fine-tuned neural networks for real-world enterprise applications.',
    averageSalary: '$135,000 - $185,000',
    jobGrowth: '+38% (Next 5 Years)',
    matchScore: 88,
    coreSkills: ['Python', 'PyTorch / TensorFlow', 'Hugging Face', 'Vector Databases', 'LangChain', 'Docker', 'REST / FastAPI'],
    recommendedTools: ['Weights & Biases', 'ChromaDB', 'vLLM', 'CUDA', 'AWS SageMaker'],
    dayInTheLife: 'Fine-tune transformer models, design embeddings pipelines, optimize GPU inference latency, and deploy models as secure microservices.',
  },
  {
    id: 'software-developer',
    title: 'Software Developer',
    tagline: 'Build resilient, scalable distributed web platforms and full-stack products.',
    description: 'Craft high-performance web applications, architect relational and NoSQL databases, build robust APIs, and collaborate on mission-critical product features.',
    averageSalary: '$110,000 - $155,000',
    jobGrowth: '+25% (Next 5 Years)',
    matchScore: 92,
    coreSkills: ['TypeScript / JavaScript', 'React / Next.js', 'Node.js', 'PostgreSQL', 'System Design', 'Git & CI/CD', 'REST / GraphQL'],
    recommendedTools: ['VS Code', 'Docker', 'Postman', 'GitHub Actions', 'Prisma / Drizzle'],
    dayInTheLife: 'Write clean modular TypeScript, review peer pull requests, architect database schemas, and optimize frontend render speeds.',
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    tagline: 'Transform raw data into strategic business intelligence and predictive insights.',
    description: 'Mine enterprise databases, execute complex SQL queries, build interactive executive dashboards, and translate quantitative metrics into actionable product growth.',
    averageSalary: '$85,000 - $125,000',
    jobGrowth: '+23% (Next 5 Years)',
    matchScore: 78,
    coreSkills: ['SQL (Advanced Windowing)', 'Python (Pandas, NumPy)', 'Tableau / PowerBI', 'Statistical Modeling', 'Excel / PowerQuery', 'Data Storytelling'],
    recommendedTools: ['Snowflake', 'BigQuery', 'dbt', 'Tableau Desktop', 'Jupyter Lab'],
    dayInTheLife: 'Analyze cohort retention metrics, automate ETL reporting pipelines, build executive KPI dashboards, and deliver weekly product insights.',
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    tagline: 'Protect critical infrastructure, defend against threats, and secure networks.',
    description: 'Monitor enterprise security operations centers (SOC), analyze threat vectors, conduct penetration testing and vulnerability assessments, and implement incident response plans.',
    averageSalary: '$105,000 - $150,000',
    jobGrowth: '+32% (Next 5 Years)',
    matchScore: 71,
    coreSkills: ['Network Security (TCP/IP, Wireshark)', 'SIEM (Splunk, Sentinel)', 'Linux Administration', 'Threat Intelligence', 'Cryptography', 'Ethical Hacking'],
    recommendedTools: ['Burp Suite', 'Metasploit', 'Nmap', 'Splunk Enterprise', 'Snort'],
    dayInTheLife: 'Investigate anomalous endpoint telemetry, patch zero-day vulnerabilities, audit IAM policies, and simulate phishing resilience drills.',
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    tagline: 'Automate scalable cloud infrastructure and high-availability systems.',
    description: 'Design multi-region cloud architectures on AWS/GCP/Azure, write Infrastructure as Code (Terraform), manage Kubernetes clusters, and build automated CI/CD release pipelines.',
    averageSalary: '$120,000 - $165,000',
    jobGrowth: '+29% (Next 5 Years)',
    matchScore: 84,
    coreSkills: ['AWS / GCP Architecture', 'Docker & Containerization', 'Kubernetes (K8s)', 'Terraform (IaC)', 'CI/CD Automation', 'Linux / Bash Scripting'],
    recommendedTools: ['Helm', 'ArgoCD', 'Terraform Cloud', 'Datadog', 'Prometheus'],
    dayInTheLife: 'Provision scalable VPC topologies, write Terraform modules, monitor cluster health, and orchestrate zero-downtime rolling deployments.',
  },
];

export const INITIAL_ROADMAP: RoadmapPhase[] = [
  {
    phase: 'Phase 1: Foundations & Core Architecture',
    duration: 'Weeks 1 - 4',
    milestones: [
      {
        id: 'm-python-foundations',
        title: 'Modern Python & Async Architecture',
        description: 'Master Python 3.12 syntax, generator pipelines, typing constructs, unit testing with Pytest, and asynchronous event loops.',
        skillsAcquired: ['Python 3.12', 'AsyncIO', 'Type Hinting', 'Pytest'],
        resources: [
          { name: 'Official Python 3 Documentation', url: 'https://docs.python.org/3/', type: 'Documentation' },
          { name: 'Real Python: Advanced Python Idioms', url: 'https://realpython.com', type: 'Tutorial' },
        ],
        project: {
          title: 'Asynchronous Data Ingestion Daemon',
          summary: 'Build an async worker pulling data from multiple external REST endpoints with rate limiting, retries, and SQLite caching.',
          techStack: ['Python', 'AsyncIO', 'AIOHTTP', 'SQLite'],
        },
      },
      {
        id: 'm-math-stats',
        title: 'Applied Mathematics, Linear Algebra & Probability',
        description: 'Understand vectors, matrix transformations, gradient calculus, eigenvalues, probability distributions, and hypothesis testing.',
        skillsAcquired: ['NumPy', 'Matrix Calculus', 'Probability', 'Descriptive Statistics'],
        resources: [
          { name: '3Blue1Brown: Essence of Linear Algebra', url: 'https://www.youtube.com/@3blue1brown', type: 'Course' },
          { name: 'Khan Academy: Multivariable Calculus', url: 'https://www.khanacademy.org/math/multivariable-calculus', type: 'Course' },
        ],
        project: {
          title: 'NumPy-Only Neural Network Engine',
          summary: 'Hand-code a multilayer perceptron with custom forward and backward passes without using deep learning libraries.',
          techStack: ['Python', 'NumPy', 'Matplotlib'],
        },
      },
    ],
  },
  {
    phase: 'Phase 2: Deep Learning & Framework Specialization',
    duration: 'Weeks 5 - 10',
    milestones: [
      {
        id: 'm-pytorch-models',
        title: 'PyTorch Model Engineering & Optimization',
        description: 'Build neural network architectures, write custom loss functions, train models with GPU acceleration, and fine-tune Vision/NLP models.',
        skillsAcquired: ['PyTorch', 'TorchVision', 'CUDA Acceleration', 'Model Checkpointing'],
        resources: [
          { name: 'DeepLearning.AI: PyTorch for Deep Learning', url: 'https://www.deeplearning.ai', type: 'Course' },
          { name: 'PyTorch Official Tutorials', url: 'https://pytorch.org/tutorials/', type: 'Documentation' },
        ],
        project: {
          title: 'Fine-Tuned Image Classifier with Explainability',
          summary: 'Fine-tune a ResNet/Vision Transformer on a domain dataset with Grad-CAM visual heatmaps explaining predictions.',
          techStack: ['PyTorch', 'Hugging Face', 'Gradio', 'CUDA'],
        },
      },
      {
        id: 'm-vector-rag',
        title: 'Vector Embeddings, RAG & LLM Application Engineering',
        description: 'Learn dense passage retrieval, semantic search, cosine similarity metrics, chunking strategies, and LangChain/LlamaIndex pipelines.',
        skillsAcquired: ['Vector Databases', 'RAG', 'Prompt Optimization', 'Semantic Search'],
        resources: [
          { name: 'Pinecone Vector Database Architecture Guide', url: 'https://www.pinecone.io/learn/', type: 'Documentation' },
          { name: 'LlamaIndex Production RAG Guide', url: 'https://docs.llamaindex.ai', type: 'Documentation' },
        ],
        project: {
          title: 'Autonomous Research Assistant with Citation Guardrails',
          summary: 'End-to-end question-answering tool that searches thousands of research papers, cites exact page numbers, and rejects hallucinations.',
          techStack: ['Python', 'ChromaDB', 'FastAPI', 'Gemini API'],
        },
      },
    ],
  },
  {
    phase: 'Phase 3: Production Deployment & Cloud MLOps',
    duration: 'Weeks 11 - 16',
    milestones: [
      {
        id: 'm-git-workflows',
        title: 'Containerization, CI/CD & Model Serving',
        description: 'Package inference workloads into lightweight Docker containers, write automated GitHub Action pipelines, and serve with FastAPI/vLLM.',
        skillsAcquired: ['Docker', 'FastAPI', 'GitHub Actions', 'Model Serving'],
        resources: [
          { name: 'Docker for Data Science & ML', url: 'https://docs.docker.com', type: 'Documentation' },
          { name: 'FastAPI Production Handbook', url: 'https://fastapi.tiangolo.com', type: 'Documentation' },
        ],
        project: {
          title: 'Scalable LLM Inference Microservice',
          summary: 'Deploy an auto-scaling API with request batching, health check probes, Prometheus latency metrics, and API key rate limiting.',
          techStack: ['Docker', 'FastAPI', 'Redis', 'Cloud Run'],
        },
      },
      {
        id: 'm-capstone-portfolio',
        title: 'Production Capstone & Portfolio Polish',
        description: 'Synthesize all skills into a flagship production capstone project with clean GitHub documentation, architecture diagrams, and a live demo.',
        skillsAcquired: ['System Design', 'Technical Writing', 'Cloud Deployment', 'Portfolio Presentation'],
        resources: [
          { name: 'High-Impact Engineering Portfolio Playbook', url: 'https://github.com', type: 'Tutorial' },
        ],
        project: {
          title: 'CareerNova Autonomous Career Companion',
          summary: 'Full-stack AI SaaS deployed with multi-tenant auth, asynchronous job queues, and real-time streaming feedback.',
          techStack: ['React', 'TypeScript', 'Node.js', 'Google GenAI', 'Docker'],
        },
      },
    ],
  },
];

export const PROJECT_RECOMMENDATIONS: ProjectRecommendation[] = [
  {
    id: 'proj-1',
    title: 'Interactive CLI Resume & Portfolio Builder',
    level: 'Beginner',
    role: 'Software Developer',
    duration: '1 - 2 Weeks',
    description: 'Build an interactive terminal command-line tool that prompts users for work history and compiles it into an elegant HTML/PDF output.',
    skills: ['Python / Node.js', 'File I/O', 'JSON Schema Validation', 'CLI UX'],
    deliverables: ['Published npm or pip package', 'Automated unit tests', 'Markdown export generator'],
    architectureSummary: 'Single modular script parsing CLI flags via Commander or Click, writing styled templates.',
  },
  {
    id: 'proj-2',
    title: 'Customer Churn Predictive Pipeline',
    level: 'Beginner',
    role: 'Data Analyst',
    duration: '2 Weeks',
    description: 'Analyze telecom customer churn data, perform exploratory data analysis (EDA), engineer features, and train a logistic regression baseline.',
    skills: ['Python', 'Pandas', 'Seaborn', 'Scikit-Learn'],
    deliverables: ['Jupyter Notebook with EDA graphs', 'Model accuracy report', 'Executive PDF summary'],
    architectureSummary: 'Pandas data cleaning pipeline with ROC-AUC curve visualizations and feature importance scoring.',
  },
  {
    id: 'proj-3',
    title: 'Real-Time Collaborative Code Editor',
    level: 'Intermediate',
    role: 'Software Developer',
    duration: '3 - 4 Weeks',
    description: 'Develop a web-based code editor with syntax highlighting, multi-user cursor tracking, and collaborative state syncing using WebSockets.',
    skills: ['React', 'TypeScript', 'WebSockets', 'Tailwind CSS', 'Node.js'],
    deliverables: ['Live deployed web app', 'Room invite link system', 'Syntax error validator'],
    architectureSummary: 'Frontend Monaco editor synced with backend WebSocket server using operational transform or CRDT logic.',
  },
  {
    id: 'proj-4',
    title: 'Multimodal RAG Technical Knowledge Base',
    level: 'Intermediate',
    role: 'AI Engineer',
    duration: '3 - 4 Weeks',
    description: 'Create an intelligent search engine that accepts technical user manuals, generates vector embeddings, and answers queries with exact page references.',
    skills: ['Python', 'Vector DB (Chroma/Pinecone)', 'Gemini API', 'FastAPI'],
    deliverables: ['FastAPI backend', 'Interactive React UI', 'Evaluation benchmark script'],
    architectureSummary: 'Document chunking engine -> embedding generator -> vector storage -> semantic reranking -> LLM response generator.',
  },
  {
    id: 'proj-5',
    title: 'Automated Multi-Cloud Zero-Trust Mesh',
    level: 'Advanced',
    role: 'Cloud Engineer',
    duration: '4 - 6 Weeks',
    description: 'Architect a secure multi-region Kubernetes infrastructure using Terraform, automated wireguard mesh networking, and automated vault secrets management.',
    skills: ['Terraform', 'Kubernetes', 'AWS VPC', 'HashiCorp Vault', 'CI/CD'],
    deliverables: ['Terraform IaC repo', 'GitOps deployment with ArgoCD', 'Security audit report'],
    architectureSummary: 'Modular Terraform definitions creating segregated public/private subnets with mutual TLS encryption across all node pods.',
  },
  {
    id: 'proj-6',
    title: 'Threat Detection SIEM Log Analyzer with ML',
    level: 'Advanced',
    role: 'Cybersecurity Analyst',
    duration: '4 - 5 Weeks',
    description: 'Build an automated network traffic analyzer that flags DDoS patterns, brute-force anomalies, and unauthorized data exfiltration in real time.',
    skills: ['Wireshark', 'Python (Scapy)', 'Splunk API', 'Isolation Forests (ML)'],
    deliverables: ['PCAP parser pipeline', 'Anomaly alert webhook system', 'Live incident response playbook'],
    architectureSummary: 'Streaming packet capture parser streaming into an unsupervised anomaly detection model with Discord/Slack webhooks.',
  },
];

export const LEARNING_RESOURCES = [
  {
    id: 'res-1',
    title: 'DeepLearning.AI: Machine Learning Specialization',
    provider: 'DeepLearning.AI & Stanford',
    role: 'AI Engineer',
    type: 'Course',
    duration: '3 Months (Self-paced)',
    cost: 'Free Audit / Paid Cert',
    link: 'https://www.deeplearning.ai/courses/machine-learning-specialization/',
    description: 'Foundational course by Andrew Ng covering regression, neural networks, decision trees, and production ML best practices.',
  },
  {
    id: 'res-2',
    title: 'Full Stack Open - University of Helsinki',
    provider: 'University of Helsinki',
    role: 'Software Developer',
    type: 'Course',
    duration: '8 - 12 Weeks',
    cost: 'Free',
    link: 'https://fullstackopen.com/en/',
    description: 'Renowned deep dive into modern JavaScript/TypeScript, React, Node.js, Express, PostgreSQL, GraphQL, and CI/CD.',
  },
  {
    id: 'res-3',
    title: 'AWS Certified Solutions Architect Associate Prep',
    provider: 'AWS Skill Builder',
    role: 'Cloud Engineer',
    type: 'Certification',
    duration: '6 Weeks',
    cost: 'Official Guide',
    link: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
    description: 'Comprehensive curriculum on compute, storage, networking, security, and high-availability architecture on AWS.',
  },
  {
    id: 'res-4',
    title: 'Google Data Analytics Professional Certificate',
    provider: 'Google Career Certificates',
    role: 'Data Analyst',
    type: 'Certification',
    duration: '4 - 6 Months',
    cost: 'Financial Aid Available',
    link: 'https://grow.google/certificates/data-analytics/',
    description: 'Hands-on training covering SQL queries, spreadsheet analysis, R programming, Tableau visualizations, and data ethics.',
  },
  {
    id: 'res-5',
    title: 'Practical Ethical Hacking & SOC Fundamentals',
    provider: 'TCM Security / Cybrary',
    role: 'Cybersecurity Analyst',
    type: 'Course',
    duration: '6 Weeks',
    cost: 'Self-paced',
    link: 'https://www.cybrary.it',
    description: 'Hands-on labs on network penetration testing, Linux command-line privilege escalation, OSINT, and SIEM monitoring.',
  },
  {
    id: 'res-6',
    title: 'FastAPI High-Performance Async Documentation',
    provider: 'FastAPI Official Documentation',
    role: 'Software Developer',
    type: 'Documentation',
    duration: 'Reference',
    cost: 'Free',
    link: 'https://fastapi.tiangolo.com',
    description: 'Production patterns for building typed, async web APIs with Pydantic validation, dependency injection, and OAuth2.',
  },
];

export const SAMPLE_RESUMES = [
  {
    label: 'Sample: Computer Science Student (Target: AI Engineer)',
    role: 'AI Engineer',
    text: `ALEX RIVERA
alex.rivera@university.edu | (555) 019-2834 | github.com/alexrivera-tech | linkedin.com/in/alexrivera

EDUCATION
State University — B.S. in Computer Science (Expected May 2026) | GPA: 3.75/4.0
Relevant Coursework: Data Structures, Algorithms, Linear Algebra, Probability & Statistics, Machine Learning, Database Systems.

TECHNICAL SKILLS
Languages: Python, JavaScript, C++, SQL
Frameworks & Libraries: PyTorch, NumPy, Pandas, Scikit-learn, React, Express.js
Tools: Git, Docker, Linux, VS Code, Postman

PROJECTS
• Multimodal Document QA Assistant (PyTorch, Hugging Face, ChromaDB, FastAPI)
  - Created a system that searches across 200+ technical PDF documents using vector embeddings.
  - Implemented retrieval-augmented generation (RAG) using cosine similarity.
  - Built a web UI for students to ask questions and view direct references.

• NumPy Neural Network Engine (Python, NumPy)
  - Programmed a 3-layer neural network from scratch using matrix calculus.
  - Achieved 94% test accuracy on the MNIST digit classification benchmark.
  - Implemented forward propagation, backpropagation with cross-entropy loss, and Adam optimizer.

• University Course Scheduler Web App (React, Node.js, SQLite)
  - Developed a full-stack scheduling app used by over 350 peers during fall registration.
  - Created REST API endpoints for course conflict detection.

EXPERIENCE
Undergraduate Research Assistant | CS Department (Sept 2025 – Present)
- Assisted graduate students with data pre-processing and tokenization for language models.
- Cleaned and organized tabular datasets containing 500,000+ records using Python Pandas.`,
  },
  {
    label: 'Sample: Junior Full-Stack Developer (Target: Software Developer)',
    role: 'Software Developer',
    text: `JORDAN CHEN
jordan.chen@email.com | (555) 342-9811 | github.com/jordanchen-dev

SUMMARY
Passionate junior software developer with strong foundations in TypeScript, React, and Node.js. Built 5+ production-grade web applications with modern database design and CI/CD pipelines.

SKILLS
• Languages: TypeScript, JavaScript, SQL, HTML5, CSS3
• Frontend: React 19, Next.js, Tailwind CSS, Redux Toolkit
• Backend & DB: Node.js, Express, PostgreSQL, Prisma ORM, Redis
• DevOps: Docker, GitHub Actions, AWS EC2 / S3, Linux

PROJECTS
• DevSprint - Team Agile Kanban Platform (React, Node.js, PostgreSQL, Socket.io)
  - Engineered a collaborative project management board with drag-and-drop task workflows.
  - Built real-time multi-user synchronization using WebSockets, reducing page refreshes.
  - Designed relational database schema with indexed foreign keys for rapid task queries.

• CloudStore E-Commerce API (TypeScript, Express, Stripe, PostgreSQL)
  - Developed secure RESTful API with JWT authentication and role-based access control.
  - Integrated Stripe payment webhooks with automated idempotency key verification.
  - Wrote 40+ unit and integration tests using Jest and Supertest achieving 85% test coverage.

EXPERIENCE
Web Development Intern | TechFlow Media (May 2025 - August 2025)
- Collaborated with 4 senior engineers on customer portal feature redesigns.
- Improved frontend Lighthouse accessibility scores from 72 to 96 across 15 landing pages.
- Refactored legacy jQuery components into clean React functional components.`,
  },
];

export const FAQ_ITEMS = [
  {
    question: 'How does CareerNova calculate my Skill Gap and Career Readiness Score?',
    answer: 'CareerNova analyzes your current skills against thousands of active industry job postings and curriculum standards for your chosen career track. Our engine categorizes what you already know, identifies critical missing tools or concepts, and weighs completed milestones to calculate a dynamic readiness percentage.',
  },
  {
    question: 'Can I switch my target career track at any time?',
    answer: 'Yes! CareerNova is designed for flexible career discovery. You can switch between AI Engineer, Software Developer, Data Analyst, Cybersecurity Analyst, and Cloud Engineer at any time. Your profile updates instantly, recalculating your customized roadmaps and skill gap analysis.',
  },
  {
    question: 'How does the AI Resume Analyzer optimize for Applicant Tracking Systems (ATS)?',
    answer: 'The Resume Analyzer checks your text for machine-readable formatting, section headers, critical keyword density, and quantifiable achievement metrics. It compares your resume directly with actual job descriptions to uncover missing keywords that human recruiters and automated parsers look for.',
  },
  {
    question: 'Are the interview practice questions realistic for actual technical screenings?',
    answer: 'Yes. Questions are generated based on actual technical screening rubrics from top tech companies, ranging from algorithmic theory and system architecture to behavioral STAR-method prompts. You receive instant grading, constructive critiques, and model answers.',
  },
  {
    question: 'Is CareerNova suitable for university student projects and career centers?',
    answer: 'Absolutely. CareerNova is purpose-built for students, graduates, and self-taught developers. It provides clear, practical milestones, verifiable portfolio projects, and structured preparation to make career transitions realistic and measurable.',
  },
];
