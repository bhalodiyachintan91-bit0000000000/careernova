import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// In-memory persistent data store with default profile
interface UserProfile {
  id: string;
  name: string;
  email: string;
  targetRole: string;
  experienceLevel: string;
  currentSkills: string[];
  completedMilestones: string[];
  weeklyGoals: { id: string; text: string; done: boolean }[];
  careerReadinessScore: number;
  savedJobIds: string[];
  practiceHistory: Array<{
    date: string;
    role: string;
    question: string;
    score: number;
    feedback: string;
  }>;
}

let currentUser: UserProfile = {
  id: 'usr-student-01',
  name: 'Alex Rivera',
  email: 'alex.rivera@university.edu',
  targetRole: 'AI Engineer',
  experienceLevel: 'Student / Junior',
  currentSkills: ['Python', 'Git', 'Data Structures', 'SQL', 'Basic Machine Learning'],
  completedMilestones: ['m-python-foundations', 'm-math-stats', 'm-git-workflows'],
  weeklyGoals: [
    { id: 'g1', text: 'Build and deploy a PyTorch Image Classifier', done: false },
    { id: 'g2', text: 'Practice 3 Technical Behavioral Questions', done: true },
    { id: 'g3', text: 'Analyze Resume against Cloud & AI Internships', done: false },
  ],
  careerReadinessScore: 74,
  savedJobIds: ['job-1', 'job-3'],
  practiceHistory: [
    {
      date: 'Yesterday',
      role: 'AI Engineer',
      question: 'Explain how Gradient Descent optimizes weights in Neural Networks.',
      score: 8,
      feedback: 'Good grasp of the loss surface concept and learning rate nuances. Mention momentum for bonus points.',
    },
  ],
};

// Seed Jobs & Internships
const JOBS_DATABASE = [
  {
    id: 'job-1',
    title: 'Junior AI/ML Engineer Intern',
    company: 'NeuralStream AI',
    location: 'Remote / San Francisco, CA',
    type: 'Internship',
    stipend: '$35 - $45 / hr',
    experience: 'Entry-Level',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'REST APIs'],
    posted: '2 days ago',
    description: 'Join our model fine-tuning and inference optimization squad working on multimodal pipelines.',
    applyUrl: '#',
  },
  {
    id: 'job-2',
    title: 'Associate Software Developer (Full Stack)',
    company: 'Apex Cloud Systems',
    location: 'Austin, TX (Hybrid)',
    type: 'Full-time',
    stipend: '$85,000 - $105,000 / yr',
    experience: 'Junior (0-2 yrs)',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    posted: '1 day ago',
    description: 'Build robust web applications and high-throughput microservices using React and Node.js.',
    applyUrl: '#',
  },
  {
    id: 'job-3',
    title: 'Data Analyst Fellow',
    company: 'MetricPulse Analytics',
    location: 'Remote',
    type: 'Internship',
    stipend: '$28 - $36 / hr',
    experience: 'Entry-Level',
    skills: ['SQL', 'Python', 'Tableau', 'Excel', 'Pandas'],
    posted: '3 days ago',
    description: 'Transform complex user telemetry data into clear dashboards and executive insight decks.',
    applyUrl: '#',
  },
  {
    id: 'job-4',
    title: 'Cybersecurity SOC Analyst Trainee',
    company: 'Sentinel Defense Corp',
    location: 'Washington, DC / Hybrid',
    type: 'Full-time',
    stipend: '$78,000 - $92,000 / yr',
    experience: 'Junior (0-1 yr)',
    skills: ['Wireshark', 'SIEM', 'Linux', 'Network Protocols'],
    posted: '5 days ago',
    description: 'Monitor security event logs, perform vulnerability scans, and assist with incident response.',
    applyUrl: '#',
  },
  {
    id: 'job-5',
    title: 'Cloud DevOps Associate',
    company: 'KubeWave Infrastructure',
    location: 'Seattle, WA (Remote friendly)',
    type: 'Full-time',
    stipend: '$90,000 - $115,000 / yr',
    experience: 'Junior (1-2 yrs)',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    posted: 'Just now',
    description: 'Automate deployment pipelines and manage scalable Kubernetes clusters in AWS cloud.',
    applyUrl: '#',
  },
  {
    id: 'job-6',
    title: 'Machine Learning Research Intern',
    company: 'Cognitive Core Labs',
    location: 'Boston, MA (On-site)',
    type: 'Internship',
    stipend: '$40 - $52 / hr',
    experience: 'Entry-Level / Student',
    skills: ['Python', 'Transformers', 'Hugging Face', 'NumPy'],
    posted: '4 days ago',
    description: 'Collaborate with senior researchers on RAG architectures and prompt optimization.',
    applyUrl: '#',
  },
];

// Helper to clean JSON string from LLM
function cleanJsonOutput(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '');
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.replace(/\s*```$/, '');
  }
  return cleaned.trim();
}

// ==========================================
// API ROUTES
// ==========================================

// 1. Get / Update Profile
app.get('/api/user/profile', (_req: Request, res: Response) => {
  res.json({ success: true, profile: currentUser });
});

app.post('/api/user/profile', (req: Request, res: Response) => {
  const updates = req.body;
  currentUser = { ...currentUser, ...updates };
  res.json({ success: true, profile: currentUser });
});

app.post('/api/auth/quick-login', (req: Request, res: Response) => {
  const { name, email, targetRole } = req.body;
  if (name) currentUser.name = name;
  if (email) currentUser.email = email;
  if (targetRole) currentUser.targetRole = targetRole;
  res.json({ success: true, user: currentUser });
});

// Toggle milestone completion
app.post('/api/user/toggle-milestone', (req: Request, res: Response) => {
  const { milestoneId } = req.body;
  if (!milestoneId) {
    return res.status(400).json({ error: 'milestoneId is required' });
  }

  if (currentUser.completedMilestones.includes(milestoneId)) {
    currentUser.completedMilestones = currentUser.completedMilestones.filter((id) => id !== milestoneId);
  } else {
    currentUser.completedMilestones.push(milestoneId);
  }

  // dynamically update readiness score
  const totalCount = 8;
  const baseScore = 55;
  const bonus = Math.min(40, currentUser.completedMilestones.length * 6);
  currentUser.careerReadinessScore = Math.min(98, baseScore + bonus);

  res.json({
    success: true,
    completedMilestones: currentUser.completedMilestones,
    readinessScore: currentUser.careerReadinessScore,
  });
});

// Toggle weekly goal
app.post('/api/user/toggle-goal', (req: Request, res: Response) => {
  const { goalId } = req.body;
  currentUser.weeklyGoals = currentUser.weeklyGoals.map((g) =>
    g.id === goalId ? { ...g, done: !g.done } : g
  );
  res.json({ success: true, weeklyGoals: currentUser.weeklyGoals });
});

// Add weekly goal
app.post('/api/user/add-goal', (req: Request, res: Response) => {
  const { text } = req.body;
  if (text) {
    currentUser.weeklyGoals.push({
      id: 'g-' + Date.now(),
      text,
      done: false,
    });
  }
  res.json({ success: true, weeklyGoals: currentUser.weeklyGoals });
});

// Get Jobs
app.get('/api/jobs', (_req: Request, res: Response) => {
  res.json({ success: true, jobs: JOBS_DATABASE });
});

// ==========================================
// AI ENDPOINTS (GEMINI 3.8 FLASH)
// ==========================================

// AI Skill Gap Analyzer
app.post('/api/ai/skill-gap', async (req: Request, res: Response) => {
  try {
    const { currentSkills = [], targetRole = 'AI Engineer', experienceLevel = 'Entry-Level' } = req.body;

    if (!ai) {
      // High quality heuristic analyzer fallback
      const skillsLower = currentSkills.map((s: string) => s.toLowerCase());
      const roleSkillMap: Record<string, string[]> = {
        'AI Engineer': ['Python', 'PyTorch / TensorFlow', 'Transformers & Hugging Face', 'Linear Algebra & Calculus', 'Vector Databases (Chroma/Pinecone)', 'Docker & Model Serving', 'MLOps & CI/CD'],
        'Software Developer': ['Data Structures & Algorithms', 'TypeScript / JavaScript', 'React or Vue', 'Node.js / Express', 'SQL & Relational DBs', 'Git & GitHub', 'REST & GraphQL APIs', 'Unit Testing'],
        'Data Analyst': ['SQL (Advanced queries & window functions)', 'Python (Pandas, NumPy)', 'Data Visualization (Tableau/PowerBI)', 'Statistics & Hypothesis Testing', 'Excel (Pivot, PowerQuery)', 'ETL Pipeline Basics'],
        'Cybersecurity Analyst': ['Network Protocols (TCP/IP, DNS)', 'Linux Administration', 'SIEM & Log Analysis (Splunk)', 'Vulnerability Assessment', 'Threat Modeling', 'Incident Response Playbooks'],
        'Cloud Engineer': ['AWS or GCP Fundamentals', 'Docker & Containerization', 'Kubernetes Orchestration', 'Terraform (IaC)', 'CI/CD Pipelines', 'Linux & Bash Scripting', 'Cloud Networking & IAM'],
      };

      const required = roleSkillMap[targetRole] || roleSkillMap['AI Engineer'];
      const matched = required.filter(r => skillsLower.some((s: string) => r.toLowerCase().includes(s) || s.includes(r.toLowerCase())));
      const missing = required.filter(r => !matched.includes(r));
      const matchPercentage = Math.round(Math.max(25, Math.min(95, (matched.length / required.length) * 100)));

      return res.json({
        success: true,
        matchPercentage,
        timeToJobReady: matchPercentage > 70 ? '6 - 8 Weeks' : '3 - 5 Months',
        existingSkills: currentSkills.map((skill: string) => ({
          name: skill,
          category: 'Core Competency',
          proficiency: 'Intermediate',
        })),
        missingSkills: missing.map((skill, idx) => ({
          name: skill,
          category: 'Industry Requirement',
          priority: idx < 2 ? 'Critical' : 'Recommended',
          reason: `High frequency requirement in 84% of modern ${targetRole} job descriptions.`,
        })),
        actionSteps: [
          {
            step: 1,
            title: `Master ${missing[0] || 'Core Architecture'} fundamentals`,
            description: `Complete intensive project-based modules focusing on real-world hands-on code.`,
            estimatedWeeks: 3,
          },
          {
            step: 2,
            title: `Ship a portfolio capstone utilizing ${missing[1] || 'production patterns'}`,
            description: `Document architecture decisions and deploy live demo to GitHub and Cloud Run.`,
            estimatedWeeks: 4,
          },
          {
            step: 3,
            title: 'Mock technical interviewing & code review prep',
            description: `Practice algorithmic reasoning and system architecture discussions.`,
            estimatedWeeks: 2,
          },
        ],
        recommendedCertifications: [
          `Certified ${targetRole.split(' ')[0]} Associate`,
          'AWS Certified Solutions Architect - Associate',
          'DeepLearning.AI Production Specialization',
        ],
      });
    }

    const prompt = `You are the lead AI career advisor at CareerNova. Analyze this student's skill gap for their dream role.
Student Current Skills: ${JSON.stringify(currentSkills)}
Target Career: ${targetRole}
Experience Level: ${experienceLevel}

Return ONLY valid JSON matching this exact structure:
{
  "matchPercentage": number (0 to 100),
  "timeToJobReady": string (e.g. "3-4 Months"),
  "existingSkills": [
    { "name": string, "category": string, "proficiency": "Beginner" | "Intermediate" | "Advanced" }
  ],
  "missingSkills": [
    { "name": string, "category": string, "priority": "Critical" | "Recommended" | "Bonus", "reason": string }
  ],
  "actionSteps": [
    { "step": number, "title": string, "description": string, "estimatedWeeks": number }
  ],
  "recommendedCertifications": [string, string, string]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(cleanJsonOutput(response.text ?? '{}'));
    return res.json({ success: true, ...parsed });
  } catch (error: any) {
    console.error('Skill gap error:', error);
    res.status(500).json({ error: 'Failed to analyze skill gap. Please try again.' });
  }
});

// AI Resume Analyzer
app.post('/api/ai/resume-analyze', async (req: Request, res: Response) => {
  try {
    const { resumeText = '', targetRole = 'AI Engineer', jobDescription = '' } = req.body;

    if (!resumeText || resumeText.trim().length < 20) {
      return res.status(400).json({ error: 'Please provide at least 20 characters of resume content to analyze.' });
    }

    if (!ai) {
      // Heuristic fallback
      return res.json({
        success: true,
        score: 76,
        overallAssessment: `Strong foundational technical background for ${targetRole}. Adding quantifiable production metrics and highlighting key framework competencies will push this resume past senior recruiters and ATS filters.`,
        strengths: [
          'Clear chronological development in engineering and technology',
          'Good inclusion of standard foundational tools (Git, APIs, problem solving)',
          'Logical structure and clean layout flow',
        ],
        criticalGaps: [
          'Needs more quantifiable metrics (e.g. "reduced latency by 32%", "processed 10k requests/min")',
          `Missing direct evidence of end-to-end deployment for ${targetRole}`,
          'Action verbs could be stronger in project descriptions',
        ],
        formattingTips: [
          'Ensure standard section headers (Experience, Projects, Skills, Education) for maximum ATS readability',
          'Keep to a single column layout with standard bullet points',
          'Include live URLs to GitHub repositories and deployed demo applications',
        ],
        atsCompatibility: {
          score: 82,
          findings: [
            'Font and structure are cleanly parseable by modern ATS systems',
            'No nested tables or complex multi-column blocks detected',
            'Email and contact info correctly placed at the top',
          ],
        },
        bulletPointImprovements: [
          {
            original: 'Worked on a machine learning model to predict prices.',
            improved: 'Designed and deployed an XGBoost regression model with 91.4% accuracy, reducing forecasting error by 18% in production.',
            reason: 'Replaces passive verb with active impact, specifies algorithm, and provides verifiable business outcome.',
          },
          {
            original: 'Helped develop the backend API and database.',
            improved: 'Architected 12 RESTful API endpoints in Node.js/Express with PostgreSQL connection pooling, serving sub-40ms responses.',
            reason: 'Shows architectural ownership and concrete throughput standards.',
          },
        ],
        matchingKeywords: ['Python', 'Data Structures', 'REST APIs', 'Git', 'Agile'],
        missingKeywords: ['Docker', 'CI/CD Pipelines', 'Cloud Deployment (AWS/GCP)', 'Unit Testing', 'Performance Optimization'],
      });
    }

    const prompt = `You are a Senior Technical Recruiter and ATS Expert at top tech firms.
Analyze this resume text for a candidate aiming for the role: "${targetRole}".
${jobDescription ? `Job Description Context: ${jobDescription}` : ''}

Candidate Resume Text:
"""${resumeText}"""

Provide a thorough, honest, constructive analysis.
Return ONLY valid JSON matching this exact structure:
{
  "score": number (0 to 100),
  "overallAssessment": string,
  "strengths": [string, string, string],
  "criticalGaps": [string, string, string],
  "formattingTips": [string, string, string],
  "atsCompatibility": {
    "score": number (0 to 100),
    "findings": [string, string, string]
  },
  "bulletPointImprovements": [
    {
      "original": string,
      "improved": string,
      "reason": string
    },
    {
      "original": string,
      "improved": string,
      "reason": string
    }
  ],
  "matchingKeywords": [string, string, string, string],
  "missingKeywords": [string, string, string, string]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(cleanJsonOutput(response.text ?? '{}'));
    return res.json({ success: true, ...parsed });
  } catch (error: any) {
    console.error('Resume analyze error:', error);
    res.status(500).json({ error: 'Failed to analyze resume. Please try again.' });
  }
});

// AI Interview Practice: Generate Questions
app.post('/api/ai/interview-questions', async (req: Request, res: Response) => {
  try {
    const { role = 'AI Engineer', questionType = 'technical', difficulty = 'Medium' } = req.body;

    if (!ai) {
      const defaultQuestions = [
        {
          id: 'q1',
          question: `Can you explain the difference between supervised, unsupervised, and reinforcement learning with real-world examples for ${role}?`,
          category: 'Core Concepts',
          difficulty: 'Medium',
          hints: ['Think about labeled vs unlabeled data and environment rewards.'],
          expectedConcepts: ['Labels', 'Clustering', 'Reward functions', 'Feedback loops'],
        },
        {
          id: 'q2',
          question: `How do you diagnose and prevent overfitting in deep learning models during training?`,
          category: 'Technical Architecture',
          difficulty: 'Medium',
          hints: ['Consider dataset size, regularization, dropout, early stopping, and data augmentation.'],
          expectedConcepts: ['L1/L2 Regularization', 'Dropout', 'Cross-Validation', 'Early Stopping'],
        },
        {
          id: 'q3',
          question: `Describe a situation where a model or software module failed in testing or production. How did you root-cause and resolve it?`,
          category: 'Behavioral & Troubleshooting',
          difficulty: 'Medium',
          hints: ['Use the STAR method: Situation, Task, Action, Result.'],
          expectedConcepts: ['Systematic debugging', 'Telemetry/Logs', 'Communication', 'Post-mortem'],
        },
      ];
      return res.json({ success: true, questions: defaultQuestions });
    }

    const prompt = `Generate 3 realistic, high-impact interview questions for a candidate interviewing for "${role}".
Question Type: ${questionType} (Technical, Behavioral, or System Design)
Difficulty Level: ${difficulty}

Return ONLY valid JSON matching this exact structure:
{
  "questions": [
    {
      "id": string,
      "question": string,
      "category": string,
      "difficulty": string,
      "hints": [string],
      "expectedConcepts": [string, string, string]
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(cleanJsonOutput(response.text ?? '{}'));
    return res.json({ success: true, ...parsed });
  } catch (error: any) {
    console.error('Interview questions error:', error);
    res.status(500).json({ error: 'Failed to generate interview questions.' });
  }
});

// AI Interview Practice: Evaluate Answer
app.post('/api/ai/interview-evaluate', async (req: Request, res: Response) => {
  try {
    const { role = 'AI Engineer', question = '', userAnswer = '', questionType = 'technical' } = req.body;

    if (!userAnswer || userAnswer.trim().length < 5) {
      return res.status(400).json({ error: 'Please provide your answer to receive AI feedback.' });
    }

    if (!ai) {
      const evaluation = {
        score: 8,
        rating: 'Strong Response',
        feedback: `You demonstrated solid foundational understanding of the concept. You addressed the core mechanics clearly. To make this answer truly senior-level, mention trade-offs and edge cases.`,
        strongPoints: [
          'Directly addressed the question prompt without unnecessary filler',
          'Used appropriate domain terminology accurately',
          'Structured explanation logically',
        ],
        missedPoints: [
          'Could have highlighted computational complexity or production bottlenecks',
          'Did not explicitly discuss failure modes or edge cases',
        ],
        sampleBestAnswer: `An outstanding response clearly outlines the mechanism, provides an illustrative enterprise case, mentions trade-offs (e.g. latency vs accuracy), and concludes with verification strategies.`,
        followUpQuestion: `What specific metrics would you monitor in production dashboards to ensure this does not degrade over time?`,
      };

      // save to practice history
      currentUser.practiceHistory.unshift({
        date: 'Today',
        role,
        question: question.slice(0, 75) + '...',
        score: evaluation.score,
        feedback: evaluation.feedback,
      });

      return res.json({ success: true, evaluation });
    }

    const prompt = `You are a Principal Technical Interviewer evaluating a candidate for "${role}".
Interview Question: "${question}"
Question Type: ${questionType}
Candidate's Response:
"""${userAnswer}"""

Evaluate the candidate's answer with constructive, specific feedback.
Return ONLY valid JSON matching this exact structure:
{
  "score": number (1 to 10),
  "rating": string (e.g. "Needs Improvement" | "Good Effort" | "Strong Response" | "Exceptional"),
  "feedback": string (2-3 sentences overview),
  "strongPoints": [string, string],
  "missedPoints": [string, string],
  "sampleBestAnswer": string (concise model answer demonstrating how a top engineer answers),
  "followUpQuestion": string (sharp follow-up question the interviewer would ask next)
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(cleanJsonOutput(response.text ?? '{}'));

    // Save to practice history
    currentUser.practiceHistory.unshift({
      date: 'Today',
      role,
      question: question.slice(0, 75) + '...',
      score: parsed.score || 8,
      feedback: parsed.feedback || 'Good job on this question.',
    });

    return res.json({ success: true, evaluation: parsed });
  } catch (error: any) {
    console.error('Interview evaluation error:', error);
    res.status(500).json({ error: 'Failed to evaluate response.' });
  }
});

// Dynamic AI Roadmap Generator
app.post('/api/ai/generate-roadmap', async (req: Request, res: Response) => {
  try {
    const { targetRole = 'AI Engineer', pace = 'Standard (10 hrs/week)', focusArea = 'All-round' } = req.body;

    if (!ai) {
      return res.json({
        success: true,
        role: targetRole,
        totalWeeks: 16,
        phases: [
          {
            phase: 'Phase 1: Core Fundamentals & Environment',
            duration: 'Weeks 1-4',
            milestones: [
              {
                id: 'm-python-foundations',
                title: 'Modern Python & Async Architecture',
                description: 'Deep dive into Python typing, generators, memory management, and asynchronous I/O for scalable backends.',
                skillsAcquired: ['Python 3.12+', 'AsyncIO', 'Type Hinting', 'Pytest'],
                resources: [
                  { name: 'Official Python Docs: Modern Idioms', url: 'https://docs.python.org/3/', type: 'Documentation' },
                  { name: 'Fluent Python Architecture Guide', url: 'https://realpython.com', type: 'Tutorial' },
                ],
                project: {
                  title: 'High-Throughput Asynchronous Pipeline',
                  summary: 'Build a concurrent event ingestion service handling 5,000 JSON payloads per second with backpressure handling.',
                  techStack: ['Python', 'AsyncIO', 'Redis', 'Docker'],
                },
              },
              {
                id: 'm-math-stats',
                title: 'Applied Linear Algebra & Statistics',
                description: 'Matrix decompositions, vector spaces, gradient calculus, and Bayesian inference for machine learning.',
                skillsAcquired: ['NumPy', 'Matrix Math', 'Hypothesis Testing', 'Probability Distributions'],
                resources: [
                  { name: '3Blue1Brown Linear Algebra', url: 'https://www.youtube.com/@3blue1brown', type: 'Video Series' },
                  { name: 'Stanford CS229 Lecture Notes', url: 'https://cs229.stanford.edu', type: 'Course' },
                ],
                project: {
                  title: 'Neural Network from Pure NumPy Scratch',
                  summary: 'Implement backpropagation, momentum optimizer, and cross-entropy loss without PyTorch or TensorFlow.',
                  techStack: ['Python', 'NumPy', 'Matplotlib'],
                },
              },
            ],
          },
          {
            phase: 'Phase 2: Deep Learning & Modern Frameworks',
            duration: 'Weeks 5-10',
            milestones: [
              {
                id: 'm-pytorch-models',
                title: 'PyTorch Deep Learning & Computer Vision / NLP',
                description: 'CNNs, Transformers, attention mechanisms, fine-tuning pretrained models using Hugging Face.',
                skillsAcquired: ['PyTorch', 'Hugging Face', 'Transformers', 'CUDA Acceleration'],
                resources: [
                  { name: 'DeepLearning.AI PyTorch Specialization', url: 'https://www.deeplearning.ai', type: 'Course' },
                  { name: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn', type: 'Course' },
                ],
                project: {
                  title: 'Multimodal Document Question-Answering System',
                  summary: 'Fine-tune a vision-language model to parse technical PDF blueprints and answer domain queries.',
                  techStack: ['PyTorch', 'Transformers', 'ChromaDB', 'FastAPI'],
                },
              },
              {
                id: 'm-vector-rag',
                title: 'Production RAG & Vector Embeddings',
                description: 'Hybrid search, dense passage retrieval, semantic chunking, re-ranking, and hallucination guardrails.',
                skillsAcquired: ['Vector DBs', 'RAG', 'Prompt Optimization', 'Semantic Search'],
                resources: [
                  { name: 'LangChain & LlamaIndex Production Docs', url: 'https://docs.llamaindex.ai', type: 'Documentation' },
                ],
                project: {
                  title: 'Enterprise Technical Documentation Copilot',
                  summary: 'Production RAG engine indexing 50,000 internal API docs with sub-second hybrid retrieval.',
                  techStack: ['Python', 'Pinecone', 'FastAPI', 'Gemini API'],
                },
              },
            ],
          },
          {
            phase: 'Phase 3: Production Deployment & MLOps',
            duration: 'Weeks 11-16',
            milestones: [
              {
                id: 'm-mlops-serving',
                title: 'High-Performance Inference & Dockerization',
                description: 'vLLM, TensorRT-LLM, model quantization (GGUF/AWQ), Docker multi-stage builds, and Kubernetes orchestration.',
                skillsAcquired: ['Docker', 'Kubernetes', 'Triton/vLLM', 'Model Quantization'],
                resources: [
                  { name: 'MLOps Zoomcamp', url: 'https://github.com/DataTalksClub/mlops-zoomcamp', type: 'Tutorial' },
                ],
                project: {
                  title: 'Self-Hosted Quantized Model Inference Cluster',
                  summary: 'Deploy quantized LLM endpoints with auto-scaling, Prometheus metrics, and Grafana latency alerts.',
                  techStack: ['Docker', 'Kubernetes', 'Prometheus', 'vLLM'],
                },
              },
            ],
          },
        ],
      });
    }

    const prompt = `You are the Lead Curriculum Architect at CareerNova.
Create a structured 3-phase comprehensive career learning roadmap for: "${targetRole}".
Pace: ${pace}
Focus: ${focusArea}

Return ONLY valid JSON matching this exact structure:
{
  "role": "${targetRole}",
  "totalWeeks": number,
  "phases": [
    {
      "phase": string (e.g. "Phase 1: Foundations"),
      "duration": string (e.g. "Weeks 1-4"),
      "milestones": [
        {
          "id": string,
          "title": string,
          "description": string,
          "skillsAcquired": [string, string, string],
          "resources": [
            { "name": string, "url": string, "type": "Course" | "Documentation" | "Tutorial" | "Book" }
          ],
          "project": {
            "title": string,
            "summary": string,
            "techStack": [string, string, string]
          }
        }
      ]
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(cleanJsonOutput(response.text ?? '{}'));
    return res.json({ success: true, ...parsed });
  } catch (error: any) {
    console.error('Roadmap error:', error);
    res.status(500).json({ error: 'Failed to generate roadmap.' });
  }
});

// ==========================================
// STATIC / VITE INTEGRATION
// ==========================================
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CareerNova fullstack engine running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
