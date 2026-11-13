import type { Skill } from '../types';

export function getProgress(skill: Skill): number {
  if (!skill.milestones.length) return 0;
  const completed = skill.milestones.filter((item) => item.completed).length;
  return Math.round((completed / skill.milestones.length) * 100);
}

export function getTotalCompleted(skills: Skill[]): number {
  return skills.reduce((total, skill) => total + skill.milestones.filter((item) => item.completed).length, 0);
}
