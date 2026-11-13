import { GraduationCap, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Input, Segmented } from 'antd';
import SkillCard from '../components/SkillCard';
import { useSkillUpStore } from '../store/useSkillUpStore';
import { getProgress } from '../utils/progress';

export default function MyLearningPage() {
  const allSkills = useSkillUpStore((state) => state.skills);

const skills = useMemo(
  () => allSkills.filter((skill) => skill.enrolled),
  [allSkills]
);
  const [status, setStatus] = useState<string>('All');
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => skills.filter((skill) => (status === 'All' || (status === 'In progress' ? getProgress(skill) > 0 && getProgress(skill) < 100 : status === 'Completed' ? getProgress(skill) === 100 : getProgress(skill) === 0)) && skill.title.toLowerCase().includes(search.toLowerCase())), [skills, status, search]);
  return <div className="space-y-6"><section><span className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-violet-600 dark:text-violet-300"><GraduationCap size={14}/> Your workspace</span><h2 className="mb-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">My learning</h2><p className="m-0 text-sm text-slate-500 dark:text-slate-400">All your active and completed learning journeys in one place.</p></section>
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 dark:border-[#292c42] dark:bg-[#191c2e] sm:flex-row sm:items-center sm:justify-between"><Input prefix={<Search size={15} className="text-slate-400"/>} placeholder="Find your learning path..." value={search} onChange={(event) => setSearch(event.target.value)} className="sm:max-w-xs"/><Segmented options={['All', 'In progress', 'Not started', 'Completed']} value={status} onChange={(value) => setStatus(String(value))}/></div>
    {filtered.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((skill) => <SkillCard key={skill.id} skill={skill}/>)}</div> : <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-sm text-slate-500 dark:border-[#34374d]">No learning paths match this filter yet. Explore the skill library to get started.</div>}
  </div>;
}
