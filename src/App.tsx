/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CareerExploration } from './components/CareerExploration';
import { SkillAnalyzer } from './components/SkillAnalyzer';
import { CareerRoadmap } from './components/CareerRoadmap';
import { ProjectRecommendations } from './components/ProjectRecommendations';
import { ResumeAnalyzer } from './components/ResumeAnalyzer';
import { InterviewPractice } from './components/InterviewPractice';
import { LearningResources } from './components/LearningResources';
import { JobBoard } from './components/JobBoard';
import { StudentDashboard } from './components/StudentDashboard';
import { TestimonialsFaq } from './components/TestimonialsFaq';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { INITIAL_ROADMAP } from './data/mockData';
import { CareerTrack, RoadmapPhase, StudentProfile } from './types';

export default function App() {
  const [user, setUser] = useState<StudentProfile>({
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
        feedback: 'Good grasp of the loss surface concept and learning rate nuances.',
      },
    ],
  });

  const [targetRole, setTargetRole] = useState('AI Engineer');
  const [roadmapPhases, setRoadmapPhases] = useState<RoadmapPhase[]>(INITIAL_ROADMAP);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Fetch initial profile from server
  useEffect(() => {
    fetch('/api/user/profile')
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setUser(data.profile);
          if (data.profile.targetRole) {
            setTargetRole(data.profile.targetRole);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Sync targetRole when changed
  const handleSelectTrack = (track: CareerTrack) => {
    setTargetRole(track.title);
    setUser((prev) => ({ ...prev, targetRole: track.title }));

    // smooth scroll to Skill Analyzer
    const elem = document.getElementById('skill-analyzer');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateTargetRole = (role: string) => {
    setTargetRole(role);
    setUser((prev) => ({ ...prev, targetRole: role }));
  };

  const handleUpdateUserSkills = (newSkills: string[]) => {
    setUser((prev) => ({ ...prev, currentSkills: newSkills }));
    fetch('/api/user/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentSkills: newSkills }),
    }).catch(() => {});
  };

  // Toggle milestone on backend
  const handleToggleMilestone = async (milestoneId: string) => {
    try {
      const res = await fetch('/api/user/toggle-milestone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ milestoneId }),
      });
      const data = await res.json();
      if (data.success) {
        setUser((prev) => ({
          ...prev,
          completedMilestones: data.completedMilestones,
          careerReadinessScore: data.readinessScore,
        }));
      }
    } catch {
      // Local fallback
      setUser((prev) => {
        const isDone = prev.completedMilestones.includes(milestoneId);
        const nextMilestones = isDone
          ? prev.completedMilestones.filter((id) => id !== milestoneId)
          : [...prev.completedMilestones, milestoneId];
        const nextScore = isDone ? Math.max(50, prev.careerReadinessScore - 6) : Math.min(98, prev.careerReadinessScore + 6);
        return {
          ...prev,
          completedMilestones: nextMilestones,
          careerReadinessScore: nextScore,
        };
      });
    }
  };

  // Toggle weekly goal
  const handleToggleGoal = async (goalId: string) => {
    try {
      const res = await fetch('/api/user/toggle-goal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goalId }),
      });
      const data = await res.json();
      if (data.success) {
        setUser((prev) => ({ ...prev, weeklyGoals: data.weeklyGoals }));
      }
    } catch {
      setUser((prev) => ({
        ...prev,
        weeklyGoals: prev.weeklyGoals.map((g) => (g.id === goalId ? { ...g, done: !g.done } : g)),
      }));
    }
  };

  // Add weekly goal
  const handleAddGoal = async (text: string) => {
    try {
      const res = await fetch('/api/user/add-goal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.success) {
        setUser((prev) => ({ ...prev, weeklyGoals: data.weeklyGoals }));
      }
    } catch {
      setUser((prev) => ({
        ...prev,
        weeklyGoals: [...prev.weeklyGoals, { id: 'g-' + Date.now(), text, done: false }],
      }));
    }
  };

  // AI Roadmap Refresh
  const handleRefreshRoadmap = async (pace: string, focus: string) => {
    try {
      const res = await fetch('/api/ai/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRole, pace, focusArea: focus }),
      });
      const data = await res.json();
      if (data.success && data.phases?.length > 0) {
        setRoadmapPhases(data.phases);
      }
    } catch (err) {
      console.error('Failed to regenerate roadmap', err);
    }
  };

  const handleUpdateUser = (updated: Partial<StudentProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    if (updated.targetRole) {
      setTargetRole(updated.targetRole);
    }
    fetch('/api/user/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch(() => {});
  };

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-cyan-100 selection:text-cyan-900">
      
      {/* 1. Navigation Bar */}
      <Navbar
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onStartJourney={() => scrollToSection('skill-analyzer')}
          onExploreCareers={() => scrollToSection('careers')}
        />

        {/* 3. Career Exploration */}
        <CareerExploration
          onSelectTrack={handleSelectTrack}
          selectedTrackTitle={targetRole}
        />

        {/* 4. AI Skill Gap Analyzer */}
        <SkillAnalyzer
          user={user}
          targetRole={targetRole}
          onUpdateTargetRole={handleUpdateTargetRole}
          onUpdateUserSkills={handleUpdateUserSkills}
          onJumpToRoadmap={() => scrollToSection('roadmap')}
        />

        {/* 5. Career Roadmap */}
        <CareerRoadmap
          user={user}
          targetRole={targetRole}
          phases={roadmapPhases}
          onToggleMilestone={handleToggleMilestone}
          onRefreshRoadmap={handleRefreshRoadmap}
        />

        {/* 6. Project Recommendations */}
        <ProjectRecommendations targetRole={targetRole} />

        {/* 7. AI Resume Analyzer */}
        <ResumeAnalyzer targetRole={targetRole} />

        {/* 8. AI Interview Practice */}
        <InterviewPractice
          targetRole={targetRole}
          onAnswerEvaluated={(score) => {
            setUser((prev) => ({
              ...prev,
              careerReadinessScore: Math.min(98, prev.careerReadinessScore + (score >= 8 ? 2 : 1)),
            }));
          }}
        />

        {/* 9. Learning Resources */}
        <LearningResources />

        {/* 10. Internship & Job Opportunities */}
        <JobBoard user={user} targetRole={targetRole} />

        {/* 11. Student Dashboard Preview */}
        <StudentDashboard
          user={user}
          targetRole={targetRole}
          onToggleGoal={handleToggleGoal}
          onAddGoal={handleAddGoal}
          onJumpToSection={scrollToSection}
        />

        {/* 12. Testimonials and FAQs */}
        <TestimonialsFaq />
      </main>

      {/* 13. Footer */}
      <Footer />

      {/* Profile & Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={user}
        onUpdateUser={handleUpdateUser}
      />

    </div>
  );
}
