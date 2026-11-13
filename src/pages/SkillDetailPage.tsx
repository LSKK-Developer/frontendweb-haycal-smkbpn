
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock3,
  LockKeyhole,
  Play,
  Sparkles,
} from 'lucide-react';
import { Button, Progress, Tag } from 'antd';
import { useSkillUpStore } from '../store/useSkillUpStore';
import { getProgress } from '../utils/progress';

const categoryLabels: Record<string, string> = {
  Technology: 'Teknologi',
  Design: 'Desain',
  Data: 'Data',
  Language: 'Bahasa',
  Business: 'Bisnis',
  'Personal Growth': 'Pengembangan Diri',
};

const levelLabels: Record<string, string> = {
  Beginner: 'Pemula',
  Intermediate: 'Menengah',
  Advanced: 'Lanjutan',
};

export default function SkillDetailPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();

  const skill = useSkillUpStore((state) =>
    state.skills.find((item) => item.id === id),
  );

  const enrollSkill = useSkillUpStore((state) => state.enrollSkill);
  const toggleMilestone = useSkillUpStore((state) => state.toggleMilestone);

  if (!skill) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center dark:bg-[#191c2e]">
        Keterampilan tidak ditemukan.

        <button
          onClick={() => navigate('/explore')}
          className="ml-2 text-violet-600"
        >
          Kembali ke Jelajahi Keterampilan
        </button>
      </div>
    );
  }

  const progress = getProgress(skill);
  const done = skill.milestones.filter((item) => item.completed).length;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-violet-600"
      >
        <ArrowLeft size={15} /> Kembali
      </button>

      <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white dark:border-[#292c42] dark:bg-[#191c2e]">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#5145bd] to-[#8174ed] px-6 py-8 text-white sm:px-9">
          <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full border-[35px] border-white/10" />

          <div className="relative max-w-2xl">
            <Tag color="purple" bordered={false}>
              {categoryLabels[skill.category] ?? skill.category}
            </Tag>

            <h2 className="mb-3 mt-3 text-3xl font-extrabold tracking-tight">
              {skill.title}
            </h2>

            <p className="mb-5 max-w-xl text-sm leading-6 text-indigo-100">
              {skill.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-indigo-100">
              <span className="flex items-center gap-1">
                <Clock3 size={14} />
                {skill.estimatedWeeks} minggu
              </span>

              <span>
                {levelLabels[skill.level] ?? skill.level}
              </span>

              <span>
                {skill.milestones.length} tahapan pembelajaran
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:px-9">
          <div>
            <div className="mb-2 flex justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-300">
                Progres Pembelajaranmu
              </span>

              <strong className="text-violet-600 dark:text-violet-300">
                {progress}%
              </strong>
            </div>

            <Progress
              percent={progress}
              strokeColor="#7568ee"
              trailColor="#efedf8"
              showInfo={false}
            />

            <p className="mb-0 mt-2 text-[11px] text-slate-400">
              {done} dari {skill.milestones.length} tahapan telah diselesaikan
            </p>
          </div>

          {skill.enrolled ? (
            <Button
              onClick={() =>
                document
                  .getElementById('roadmap')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              type="primary"
              icon={<Play size={14} />}
              className="!h-10 !rounded-xl !bg-violet-600"
            >
              Lanjutkan Belajar
            </Button>
          ) : (
            <Button
              onClick={() => enrollSkill(skill.id)}
              type="primary"
              icon={<Sparkles size={14} />}
              className="!h-10 !rounded-xl !bg-violet-600"
            >
              Ikuti Pembelajaran
            </Button>
          )}
        </div>
      </section>

      <section
        id="roadmap"
        className="rounded-3xl border border-slate-100 bg-white p-6 dark:border-[#292c42] dark:bg-[#191c2e] sm:p-8"
      >
        <div className="mb-6">
          <h3 className="mb-1 text-lg font-extrabold text-slate-900 dark:text-white">
            Tahapan Pembelajaran
          </h3>

          <p className="m-0 text-xs text-slate-400">
            Pelajari setiap tahapan secara berurutan sesuai kemampuanmu.
          </p>
        </div>

        <div className="space-y-4">
          {skill.milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className={`flex gap-4 rounded-2xl border p-4 transition ${
                milestone.completed
                  ? 'border-emerald-100 bg-emerald-50/50 dark:border-emerald-500/20 dark:bg-emerald-500/5'
                  : 'border-slate-100 bg-white dark:border-[#292c42] dark:bg-[#1c2033]'
              }`}
            >
              <span
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  milestone.completed
                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300'
                    : 'bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300'
                }`}
              >
                {milestone.completed ? (
                  <CheckCircle2 size={18} />
                ) : skill.enrolled ? (
                  <span className="text-xs font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                ) : (
                  <LockKeyhole size={16} />
                )}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="m-0 text-sm font-bold text-slate-800 dark:text-white">
                    {milestone.title}
                  </h4>

                  {milestone.completed && (
                    <Tag color="success" bordered={false}>
                      Selesai
                    </Tag>
                  )}
                </div>

                <p className="mb-2 mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {milestone.description}
                </p>

                <span className="text-[11px] text-slate-400">
                  <Clock3 size={12} className="mr-1 inline" />
                  {milestone.durationMinutes} menit
                </span>
              </div>

              {skill.enrolled && (
                <button
                  onClick={() => toggleMilestone(skill.id, milestone.id)}
                  aria-label={
                    milestone.completed
                      ? 'Tandai sebagai belum selesai'
                      : 'Tandai sebagai selesai'
                  }
                  className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    milestone.completed
                      ? 'text-emerald-600 hover:bg-emerald-100 dark:text-emerald-300'
                      : 'text-slate-300 hover:bg-violet-50 hover:text-violet-600 dark:text-slate-500 dark:hover:bg-violet-500/10'
                  }`}
                >
                  {milestone.completed ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <Circle size={20} />
                  )}
                </button>
              )}
            </div>
          ))}
        </div>

        {!skill.enrolled && (
          <p className="mb-0 mt-5 flex items-center gap-2 text-xs text-slate-400">
            <LockKeyhole size={14} />
            Ikuti keterampilan ini untuk mulai menyelesaikan tahapan pembelajaran.
          </p>
        )}
      </section>
    </div>
  );
}
