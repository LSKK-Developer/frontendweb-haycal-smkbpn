export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  completed: boolean;
}

export interface Skill {
  id: string;
  title: string;
  category: string;
  description: string;
  level: SkillLevel;
  estimatedWeeks: number;
  icon: string;
  color: string;
  enrolled: boolean;
  custom?: boolean;
  milestones: Milestone[];
}

export interface LearningNote {
  id: string;
  title: string;
  content: string;
  skillId?: string;
  updatedAt: string;
}

export interface DemoUser {
  name: string;
  email: string;
}
