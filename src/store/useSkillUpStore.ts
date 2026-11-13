
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { seedSkills } from '../data/seed';
import type { DemoUser, LearningNote, Skill } from '../types';

interface SkillUpState {
  user: DemoUser | null;
  theme: 'light' | 'dark';
  skills: Skill[];
  notes: LearningNote[];
  login: (user: DemoUser) => void;
  logout: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  enrollSkill: (skillId: string) => void;
  addSkill: (skill: Skill) => void;
  toggleMilestone: (skillId: string, milestoneId: string) => void;
  addNote: (note: LearningNote) => void;
  updateNote: (noteId: string, changes: Partial<LearningNote>) => void;
  deleteNote: (noteId: string) => void;
  updateProfile: (name: string) => void;
}

const initialNotes: LearningNote[] = [
  {
    id: 'note-welcome',
    title: 'Target Belajarku',
    content:
      'Mulai dari langkah kecil, tetap konsisten, dan buat satu proyek setiap tahapnya.\n\nFokus pertamaku adalah memahami komponen React dan pengelolaan state.',
    skillId: 'frontend-developer',
    updatedAt: new Date().toISOString(),
  },
];

// Memperbarui data bawaan tanpa menghapus progres pengguna.
function migrateSkills(storedSkills: Skill[]): Skill[] {
  const updatedSeedSkills = seedSkills.map((seedSkill) => {
    const savedSkill = storedSkills.find(
      (skill) => skill.id === seedSkill.id,
    );

    if (!savedSkill) {
      return seedSkill;
    }

    return {
      ...seedSkill,
      enrolled: savedSkill.enrolled,
      milestones: seedSkill.milestones.map((seedMilestone) => {
        const savedMilestone = savedSkill.milestones.find(
          (milestone) => milestone.id === seedMilestone.id,
        );

        return {
          ...seedMilestone,
          completed: savedMilestone?.completed ?? seedMilestone.completed,
        };
      }),
    };
  });

  // Mempertahankan keterampilan yang dibuat sendiri oleh pengguna.
  const customSkills = storedSkills.filter(
    (skill) => skill.custom === true || skill.id.startsWith('custom-'),
  );

  return [...customSkills, ...updatedSeedSkills];
}

export const useSkillUpStore = create<SkillUpState>()(
  persist(
    (set) => ({
      user: null,
      theme: 'light',
      skills: seedSkills,
      notes: initialNotes,

      login: (user) => set({ user }),

      logout: () => set({ user: null }),

      setTheme: (theme) => set({ theme }),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      enrollSkill: (skillId) =>
        set((state) => ({
          skills: state.skills.map((skill) =>
            skill.id === skillId
              ? { ...skill, enrolled: !skill.enrolled }
              : skill,
          ),
        })),

      addSkill: (skill) =>
        set((state) => ({
          skills: [skill, ...state.skills],
        })),

      toggleMilestone: (skillId, milestoneId) =>
        set((state) => ({
          skills: state.skills.map((skill) =>
            skill.id !== skillId
              ? skill
              : {
                  ...skill,
                  milestones: skill.milestones.map((milestone) =>
                    milestone.id === milestoneId
                      ? {
                          ...milestone,
                          completed: !milestone.completed,
                        }
                      : milestone,
                  ),
                },
          ),
        })),

      addNote: (note) =>
        set((state) => ({
          notes: [note, ...state.notes],
        })),

      updateNote: (noteId, changes) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === noteId
              ? {
                  ...note,
                  ...changes,
                  updatedAt: new Date().toISOString(),
                }
              : note,
          ),
        })),

      deleteNote: (noteId) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== noteId),
        })),

      updateProfile: (name) =>
        set((state) => ({
          user: state.user ? { ...state.user, name } : null,
        })),
    }),
    {
      name: 'skillup-storage',
      version: 2,

      // Migrasi dari penyimpanan versi sebelumnya.
      migrate: (persistedState, version) => {
        const state = persistedState as Partial<SkillUpState>;

        if (version < 2) {
          const storedSkills = Array.isArray(state.skills)
            ? state.skills
            : [];

          const storedNotes = Array.isArray(state.notes)
            ? state.notes
            : initialNotes;

          return {
            ...state,
            skills: migrateSkills(storedSkills),
            notes: storedNotes.map((note) =>
              note.id === 'note-welcome'
                ? {
                    ...note,
                    title: initialNotes[0].title,
                    content: initialNotes[0].content,
                  }
                : note,
            ),
          };
        }

        return state;
      },
    },
  ),
);
