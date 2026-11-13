
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Flame,
  GraduationCap,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from 'antd';
import { useSkillUpStore } from '../store/useSkillUpStore';
import SkillCard from '../components/SkillCard';
import { getProgress, getTotalCompleted } from '../utils/progress';

function StatCard({
  label,
  value,
  caption,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  caption: string;
  icon: typeof Target;
  tone: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_5px_25px_rgba(35,35,65,.035)] dark:border-[#292c42] dark:bg-[#191c2e]">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {label}
        </span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone}`}>
          <Icon size={17} />
        </span>
      </div>
      <p className="mb-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {value}
      </p>
      <p className="m-0 text-[11px] text-slate-400">{caption}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { user, skills } = useSkillUpStore();

  const enrolled = skills.filter((skill) => skill.enrolled);
  const active = enrolled.filter((skill) => getProgress(skill) < 100);
  const completed = enrolled.filter((skill) => getProgress(skill) === 100).length;
  const completedMilestones = getTotalCompleted(enrolled);

  const average = enrolled.length
    ? Math.round(
        enrolled.reduce((sum, skill) => sum + getProgress(skill), 0) /
          enrolled.length,
      )
    : 0;

  const firstName = user?.name.split(' ')[0] ?? 'Pembelajar';

  return (
    <div className="space-y-7">
      {/* Sambutan utama */}
      <section className="relative overflow-hidden rounded-[26px] bg-gradient-to-r from-[#5145bd] via-[#6759db] to-[#8174ed] px-6 py-7 text-white shadow-[0_15px_40px_rgba(92,78,204,.18)] sm:px-8 sm:py-8">
        <div className="absolute -right-10 -top-24 h-72 w-72 rounded-full border-[42px] border-white/10" />
        <div className="absolute right-36 top-24 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

        <div className="relative max-w-2xl">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold">
            <Sparkles size={13} />
            Perjalanan belajarmu terus berlanjut
          </span>

          <h2 className="mb-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Terus berkembang, {firstName} <span>✦</span>
          </h2>

          <p className="mb-5 max-w-lg text-sm leading-6 text-indigo-100">
            Setiap langkah kecil membawamu lebih maju. Lanjutkan perjalananmu
            dan terus kembangkan keterampilan yang kamu miliki.
          </p>

          <Link
            to="/learning"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-violet-700 no-underline shadow-sm transition hover:bg-violet-50"
          >
            Lanjutkan Belajar <ArrowRight size={15} />
          </Link>
        </div>

        <div className="absolute bottom-0 right-8 hidden h-36 w-36 items-center justify-center rounded-t-full border border-white/20 bg-white/10 sm:flex">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10">
            <GraduationCap size={44} strokeWidth={1.3} />
          </div>
        </div>
      </section>

      {/* Statistik pembelajaran */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Keterampilan Diikuti"
          value={String(enrolled.length).padStart(2, '0')}
          caption="Keterampilan dalam ruang belajarmu"
          icon={GraduationCap}
          tone="bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300"
        />

        <StatCard
          label="Tahapan Selesai"
          value={String(completedMilestones).padStart(2, '0')}
          caption="Setiap pencapaian berarti"
          icon={Target}
          tone="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300"
        />

        <StatCard
          label="Konsistensi Belajar"
          value="3 hari"
          caption="Terus pertahankan semangatmu"
          icon={Flame}
          tone="bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300"
        />

        <StatCard
          label="Jalur Belajar Selesai"
          value={String(completed).padStart(2, '0')}
          caption="Perjalanan belajar yang diselesaikan"
          icon={Trophy}
          tone="bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300"
        />
      </section>

      {/* Pembelajaran yang sedang berlangsung dan progres */}
      <section className="grid gap-5 xl:grid-cols-[1.55fr_.85fr]">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_5px_25px_rgba(35,35,65,.035)] dark:border-[#292c42] dark:bg-[#191c2e] sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="mb-1 text-base font-bold text-slate-800 dark:text-white">
                Lanjutkan Pembelajaran
              </h3>
              <p className="m-0 text-xs text-slate-400">
                Jalur pembelajaran yang sedang kamu ikuti
              </p>
            </div>

            <Link
              to="/learning"
              className="text-xs font-bold text-violet-600 no-underline hover:text-violet-700 dark:text-violet-300"
            >
              Lihat Semua <ArrowUpRight size={13} className="inline" />
            </Link>
          </div>

          {active.length ? (
            <div className="grid gap-3 md:grid-cols-2">
              {active.slice(0, 2).map((skill) => (
                <SkillCard key={skill.id} skill={skill} compact />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500 dark:bg-[#202338]">
              Pilih keterampilan untuk memulai perjalanan belajarmu.
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_5px_25px_rgba(35,35,65,.035)] dark:border-[#292c42] dark:bg-[#191c2e] sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="mb-1 text-base font-bold text-slate-800 dark:text-white">
                Progres Belajarmu
              </h3>
              <p className="m-0 text-xs text-slate-400">
                Dari seluruh keterampilan yang diikuti
              </p>
            </div>

            <span className="rounded-lg bg-violet-50 p-2 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
              <Target size={17} />
            </span>
          </div>

          <div className="flex items-center justify-center py-3">
            <Progress
              type="circle"
              percent={average}
              size={142}
              strokeColor="#7568ee"
              trailColor="#efedf8"
              strokeWidth={9}
              format={(percent) => (
                <div>
                  <strong className="text-2xl font-extrabold text-slate-800 dark:text-white">
                    {percent}%
                  </strong>
                  <span className="mt-1 block text-[10px] font-semibold text-slate-400">
                    RATA-RATA
                  </span>
                </div>
              )}
            />
          </div>

          <p className="mb-0 mt-2 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
            Kamu terus berkembang. Selesaikan tahapan pembelajaran untuk
            meningkatkan kemampuanmu.
          </p>
        </div>
      </section>

      {/* Rekomendasi keterampilan */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h3 className="mb-1 text-base font-bold text-slate-800 dark:text-white">
              Temukan Hal Baru
            </h3>
            <p className="m-0 text-xs text-slate-400">
              Jelajahi keterampilan sesuai minatmu
            </p>
          </div>

          <Link
            to="/explore"
            className="text-xs font-bold text-violet-600 no-underline dark:text-violet-300"
          >
            Jelajahi Katalog <ArrowRight size={13} className="inline" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skills
            .filter((skill) => !skill.enrolled)
            .slice(0, 3)
            .map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
        </div>
      </section>

      <p className="flex items-center gap-2 text-[11px] text-slate-400">
        <Clock3 size={13} />
        Data demo tersimpan secara lokal di browser ini.
      </p>
    </div>
  );
}
