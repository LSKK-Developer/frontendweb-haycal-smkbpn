
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Compass,
  GraduationCap,
  LayoutDashboard,
  Moon,
  NotebookPen,
  Sun,
  Trophy,
  UserRound,
  Sparkles,
  LogOut,
} from 'lucide-react';
import { useSkillUpStore } from '../store/useSkillUpStore';

const navItems = [
  { to: '/', label: 'Ringkasan', icon: LayoutDashboard, end: true },
  { to: '/explore', label: 'Jelajahi Keterampilan', icon: Compass },
  { to: '/learning', label: 'Pembelajaran Saya', icon: GraduationCap },
  { to: '/notes', label: 'Catatan Saya', icon: NotebookPen },
  { to: '/achievements', label: 'Pencapaian', icon: Trophy },
  { to: '/profile', label: 'Profil', icon: UserRound },
];

const titles: Record<string, string> = {
  '/': 'Ringkasan',
  '/explore': 'Jelajahi Keterampilan',
  '/learning': 'Pembelajaran Saya',
  '/notes': 'Catatan Saya',
  '/achievements': 'Pencapaian',
  '/profile': 'Profil',
};

export default function AppLayout() {
  const { user, theme, toggleTheme, logout } = useSkillUpStore();
  const location = useLocation();

  const title = location.pathname.startsWith('/skills/')
    ? 'Peta Pembelajaran'
    : (titles[location.pathname] ?? 'SkillUp');

  const initials = (user?.name ?? 'Pembelajar')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#f7f7fb] text-[#24243a] dark:bg-[#111321] dark:text-[#eef0ff]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col border-r border-[#ececf3] bg-white px-5 py-6 dark:border-[#282b40] dark:bg-[#171929] lg:flex">
        <NavLink to="/" className="mb-10 flex items-center gap-3 px-2 no-underline">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-200 dark:shadow-none">
            <Sparkles size={21} />
          </span>
          <span>
            <strong className="block text-[19px] font-extrabold tracking-tight text-[#25243a] dark:text-white">
              SkillUp
            </strong>
            <span className="text-[11px] font-medium tracking-wide text-slate-400">
              RUANG BELAJAR
            </span>
          </span>
        </NavLink>

        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">
          MENU UTAMA
        </p>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-semibold no-underline transition ${
                  isActive
                    ? 'bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
                }`
              }
            >
              <Icon size={18} strokeWidth={1.9} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl bg-gradient-to-br from-[#f0edff] to-[#f8f5ff] p-4 dark:from-[#292447] dark:to-[#20213a]">
          <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm dark:bg-white/10 dark:text-violet-200">
            <BookOpen size={16} />
          </span>
          <p className="mb-1 text-sm font-bold text-slate-800 dark:text-white">
            Langkah kecil berarti.
          </p>
          <p className="m-0 text-xs leading-5 text-slate-500 dark:text-slate-300">
            Kemajuan kecil setiap hari akan membawa hasil besar.
          </p>
        </div>

        <button
          onClick={logout}
          className="mt-4 flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-500/10"
        >
          <LogOut size={17} />
          Keluar
        </button>
      </aside>

      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-[#ececf3] bg-white/90 px-5 backdrop-blur-xl dark:border-[#282b40] dark:bg-[#171929]/90 sm:px-8">
          <div>
            <p className="mb-1 text-[11px] font-medium text-slate-400">
              Menu / <span className="text-violet-500">{title}</span>
            </p>
            <h1 className="m-0 text-lg font-bold tracking-tight text-slate-800 dark:text-white">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Ganti tema tampilan"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-violet-200 hover:text-violet-600 dark:border-[#34374d] dark:bg-[#202338] dark:text-slate-300"
            >
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>

            <div className="hidden items-center gap-3 border-l border-slate-200 pl-4 dark:border-[#34374d] sm:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700 dark:bg-violet-500/20 dark:text-violet-200">
                {initials}
              </span>
              <span className="max-w-[130px] truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                {user?.name}
              </span>
            </div>
          </div>
        </header>

        <main className="page-shell min-h-[calc(100vh-76px)] px-5 pb-28 pt-7 sm:px-8 lg:px-10 lg:pb-10">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-slate-200 bg-white/95 px-2 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl dark:border-[#282b40] dark:bg-[#171929]/95 lg:hidden">
        {navItems.slice(0, 5).map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex min-w-0 flex-col items-center gap-1 px-2 py-1 text-[10px] font-semibold no-underline ${
                isActive
                  ? 'text-violet-600 dark:text-violet-300'
                  : 'text-slate-400'
              }`
            }
          >
            <Icon size={19} />
            <span className="max-w-[75px] truncate">
              {label === 'Ringkasan'
                ? 'Beranda'
                : label === 'Jelajahi Keterampilan'
                  ? 'Jelajahi'
                  : label === 'Pembelajaran Saya'
                    ? 'Belajar'
                    : label === 'Catatan Saya'
                      ? 'Catatan'
                      : label}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
