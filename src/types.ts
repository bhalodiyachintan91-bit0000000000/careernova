export interface CareerTrack {
  id: string;
  title: string;
  tagline: string;
  description: string;
  averageSalary: string;
  jobGrowth: string;
  matchScore?: number;
  coreSkills: string[];
  recommendedTools: string[];
  dayInTheLife: string;
}

export interface SkillGapResult {
  matchPercentage: number;
  timeToJobReady: string;
  existingSkills: Array<{
    name: string;
    category: string;
    proficiency: 'Beginner' | 'Intermediate' | 'Advanced';
  }>;
  missingSkills: Array<{
    name: string;
    category: string;
    priority: 'Critical' | 'Recommended' | 'Bonus';
    reason: string;
  }>;
  actionSteps: Array<{
    step: number;
    title: string;
    description: string;
    estimatedWeeks: number;
  }>;
  recommendedCertifications: string[];
}

export interface ResumeAnalysisResult {
  score: number;
  overallAssessment: string;
  strengths: string[];
  criticalGaps: string[];
  formattingTips: string[];
  atsCompatibility: {
    score: number;
    findings: string[];
  };
  bulletPointImprovements: Array<{
    original: string;
    improved: string;
    reason: string;
  }>;
  matchingKeywords: string[];
  missingKeywords: string[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: string;
  hints: string[];
  expectedConcepts: string[];
}

export interface InterviewEvaluation {
  score: number;
  rating: string;
  feedback: string;
  strongPoints: string[];
  missedPoints: string[];
  sampleBestAnswer: string;
  followUpQuestion: string;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  skillsAcquired: string[];
  resources: Array<{ name: string; url: string; type: string }>;
  project: {
    title: string;
    summary: string;
    techStack: string[];
  };
}

export interface RoadmapPhase {
  phase: string;
  duration: string;
  milestones: RoadmapMilestone[];
}

export interface ProjectRecommendation {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  role: string;
  duration: string;
  description: string;
  skills: string[];
  deliverables: string[];
  architectureSummary: string;
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  stipend: string;
  experience: string;
  skills: string[];
  posted: string;
  description: string;
  applyUrl: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  targetRole: string;
  experienceLevel: string;
  currentSkills: string[];
  completedMilestones: string[];
  weeklyGoals: Array<{ id: string; text: string; done: boolean }>;
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
