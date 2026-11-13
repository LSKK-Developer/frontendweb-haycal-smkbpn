
import { ArrowUpRight, Clock3, Layers3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress, Tag } from 'antd';
import type { Skill } from '../types';
import { getProgress } from '../utils/progress';

const colorMap: Record<string, string> = {
  violet: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
  pink: 'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
};

const glyph: Record<string, string> = {
  code: '</>',
  palette: '✳',
  chart: '▥',
  messages: 'Aa',
  megaphone: '↗',
};

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

export default function SkillCard({
  skill,
  compact = false,
}: {
  skill: Skill;
  compact?: boolean;
}) {
  const progress = getProgress(skill);

  return (
    <Link
      to={`/skills/${skill.id}`}
      className="group block rounded-2xl border border-slate-100 bg-white p-5 no-underline shadow-[0_5px_25px_rgba(35,35,65,.035)] transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-soft dark:border-[#292c42] dark:bg-[#191c2e] dark:hover:border-violet-500/40"
    >
      <div className="mb-4 flex items-start justify-between">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-2xl text-[17px] font-bold ${
            colorMap[skill.color] ?? colorMap.violet
          }`}
        >
          {glyph[skill.icon] ?? '✦'}
        </span>

        <ArrowUpRight
          size={18}
          className="text-slate-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-500"
        />
      </div>

      <div className="mb-1 flex flex-wrap items-center gap-2">
        <h3 className="m-0 text-[15px] font-bold text-slate-800 dark:text-white">
          {skill.title}
        </h3>

        {skill.custom && (
          <Tag color="purple" bordered={false}>
            Kustom
          </Tag>
        )}
      </div>

      <p className="mb-4 line-clamp-2 min-h-[40px] text-xs leading-5 text-slate-500 dark:text-slate-400">
        {skill.description}
      </p>

      <div className="mb-3 flex items-center gap-3 text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <Layers3 size={13} />
          {categoryLabels[skill.category] ?? skill.category}
        </span>

        <span className="flex items-center gap-1">
          <Clock3 size={13} />
          {skill.estimatedWeeks} minggu
        </span>
      </div>

      {skill.enrolled ? (
        <>
          <div className="mb-1 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-500 dark:text-slate-400">
              Progres Belajarmu
            </span>

            <span className="font-bold text-violet-600 dark:text-violet-300">
              {progress}%
            </span>
          </div>

          <Progress
            percent={progress}
            showInfo={false}
            strokeColor="#7568ee"
            trailColor="#eeedf5"
            size="small"
          />
        </>
      ) : (
        <div className="text-xs font-semibold text-violet-600 dark:text-violet-300">
          Lihat Jalur Pembelajaran <span aria-hidden>→</span>
        </div>
      )}

      {!compact && (
        <div className="mt-3 flex items-center justify-between">
          <Tag
            bordered={false}
            color={
              skill.level === 'Beginner'
                ? 'green'
                : skill.level === 'Intermediate'
                  ? 'blue'
                  : 'volcano'
            }
          >
            {levelLabels[skill.level] ?? skill.level}
          </Tag>

          <span className="text-[11px] text-slate-400">
            {skill.milestones.length} tahapan
          </span>
        </div>
      )}
    </Link>
  );
}
