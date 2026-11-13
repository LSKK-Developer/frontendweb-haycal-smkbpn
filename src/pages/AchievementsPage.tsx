
import { useMemo } from 'react';
import {
  Award,
  Flame,
  Flag,
  GraduationCap,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react';
import { useSkillUpStore } from '../store/useSkillUpStore';
import { getProgress, getTotalCompleted } from '../utils/progress';

export default function AchievementsPage() {
  const allSkills = useSkillUpStore((state) => state.skills);

  const skills = useMemo(
    () => allSkills.filter((skill) => skill.enrolled),
    [allSkills],
  );

  const completed = getTotalCompleted(skills);

  const finishedPaths = skills.filter(
    (skill) => getProgress(skill) === 100,
  ).length;

  const badges = [
    {
      title: 'Langkah Pertama',
      description: 'Selesaikan tahapan pembelajaran pertamamu.',
      icon: Flag,
      earned: completed >= 1,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Mulai Konsisten',
      description: 'Selesaikan lima tahapan pembelajaran.',
      icon: Flame,
      earned: completed >= 5,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      title: 'Penyelesai Jalur',
      description: 'Selesaikan seluruh tahapan dalam satu jalur belajar.',
      icon: Trophy,
      earned: finishedPaths >= 1,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Rasa Ingin Tahu',
      description: 'Ikuti tiga keterampilan yang berbeda.',
      icon: Sparkles,
      earned: skills.length >= 3,
      color: 'bg-violet-50 text-violet-600',
    },
    {
      title: 'Pembelajar Tekun',
      description: 'Pertahankan aktivitas belajar selama tujuh hari berturut-turut.',
      icon: Zap,
      earned: false,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Kolektor Keterampilan',
      description: 'Selesaikan tiga jalur pembelajaran.',
      icon: Award,
      earned: finishedPaths >= 3,
      color: 'bg-pink-50 text-pink-600',
    },
  ];

  const earned = badges.filter((badge) => badge.earned).length;

  return (
    <div className="space-y-6">
      <section>
        <span className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-violet-600 dark:text-violet-300">
          <Trophy size={14} /> Rayakan Perkembanganmu
        </span>

        <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Pencapaian Saya
        </h2>

        <p className="m-0 text-sm text-slate-500 dark:text-slate-400">
          Setiap tahapan yang kamu selesaikan merupakan bukti perkembanganmu.
        </p>
      </section>

      <section className="flex flex-col gap-5 rounded-3xl bg-gradient-to-r from-[#5145bd] to-[#8174ed] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="mb-1 text-xs font-semibold text-violet-100">
            KOLEKSI LENCANA
          </p>

          <h3 className="mb-2 text-3xl font-extrabold">
            {earned}{' '}
            <span className="text-lg font-semibold text-violet-100">
              / {badges.length} diperoleh
            </span>
          </h3>

          <p className="m-0 text-xs text-violet-100">
            Terus belajar untuk mendapatkan pencapaian berikutnya.
          </p>
        </div>

        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10">
          <Trophy size={38} />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {badges.map(({ title, description, icon: Icon, earned: isEarned, color }) => (
          <div
            key={title}
            className={`rounded-2xl border bg-white p-5 dark:bg-[#191c2e] ${
              isEarned
                ? 'border-emerald-100 dark:border-emerald-500/20'
                : 'border-slate-100 opacity-75 dark:border-[#292c42]'
            }`}
          >
            <div className="mb-4 flex items-start justify-between">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color} dark:bg-white/5`}
              >
                <Icon size={22} />
              </span>

              {isEarned ? (
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                  Diperoleh
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-400 dark:bg-white/5">
                  Belum diperoleh
                </span>
              )}
            </div>

            <h3 className="mb-1 text-sm font-bold text-slate-800 dark:text-white">
              {title}
            </h3>

            <p className="m-0 text-xs leading-5 text-slate-500 dark:text-slate-400">
              {description}
            </p>

            {title === 'Pembelajar Tekun' && (
              <p className="mb-0 mt-3 text-[10px] leading-5 text-amber-600 dark:text-amber-300">
                Penghitungan konsistensi aktivitas akan diaktifkan pada tahap berikutnya.
              </p>
            )}
          </div>
        ))}
      </section>

      <p className="flex items-center gap-2 text-[11px] text-slate-400">
        <GraduationCap size={14} />
        Pencapaian dihitung berdasarkan keterampilan dan tahapan yang telah diselesaikan.
      </p>
    </div>
  );
}
