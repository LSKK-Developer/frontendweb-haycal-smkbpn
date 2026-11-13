
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Sparkles } from 'lucide-react';
import { useSkillUpStore } from '../store/useSkillUpStore';

export default function LoginPage() {
  const login = useSkillUpStore((state) => state.login);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const enterDemo = () => {
    login({
      name: name.trim() || 'Pembelajar',
      email: 'learner@skillup.demo',
    });
    navigate('/');
  };

  return (
    <div className="grid min-h-screen bg-white dark:bg-[#111321] lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden bg-[#17152f] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-violet-500/25 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500">
            <Sparkles size={22} />
          </span>
          <span className="text-xl font-extrabold tracking-tight">SkillUp</span>
        </div>

        <div className="relative max-w-xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-violet-200">
            <Sparkles size={13} /> Ruang belajarmu
          </p>

          <h1 className="mb-6 text-5xl font-extrabold leading-[1.12] tracking-tight xl:text-6xl">
            Terus berkembang.
            <br />
            <span className="text-violet-300">Satu keterampilan setiap saat.</span>
          </h1>

          <p className="max-w-md text-base leading-7 text-indigo-100/70">
            Ubah rasa ingin tahumu menjadi perjalanan belajar. Tetapkan tujuan,
            ikuti rencana belajarmu, dan rayakan setiap pencapaian.
          </p>

          <div className="mt-10 flex flex-wrap gap-5 text-sm text-indigo-100/80">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-300" />
              Jalur belajar yang jelas
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-300" />
              Progres belajar yang nyata
            </span>
          </div>
        </div>

        <p className="relative text-xs text-indigo-100/40">
          © 2026 SkillUp. Dibuat untuk para pembelajar.
        </p>
      </section>

      <section className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-600 text-white">
              <Sparkles size={20} />
            </span>
            <strong className="text-xl text-slate-900 dark:text-white">
              SkillUp
            </strong>
          </div>

          <span className="mb-4 inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
            PRATINJAU DEMO
          </span>

          <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Selamat Datang di SkillUp
          </h2>

          <p className="mb-8 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Masukkan nama tampilan untuk menjelajahi halaman pembelajaran.
            Tidak diperlukan kata sandi atau akun sungguhan.
          </p>

          <label
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
            htmlFor="displayName"
          >
            Nama tampilanmu
          </label>

          <input
            id="displayName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') enterDemo();
            }}
            className="mb-5 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 dark:border-[#34374d] dark:bg-[#191c2e] dark:text-white dark:focus:ring-violet-500/10"
            placeholder="Masukkan namamu"
          />

          <button
            onClick={enterDemo}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 dark:shadow-none"
          >
            Masuk ke Akun Demo <ArrowRight size={17} />
          </button>

          <div className="my-7 flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-100 dark:bg-[#292c42]" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Lingkungan Demo
            </span>
            <span className="h-px flex-1 bg-slate-100 dark:bg-[#292c42]" />
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-[#292c42] dark:bg-[#191c2e]">
            <div className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm dark:bg-[#252941]">
                <BookOpen size={17} />
              </span>

              <div>
                <p className="mb-1 text-sm font-bold text-slate-800 dark:text-white">
                  Progres belajarmu tersimpan di perangkat ini
                </p>
                <p className="m-0 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Prototipe ini menggunakan Local Storage. Aplikasi tidak
                  membuat akun pengguna sungguhan atau menyinkronkan data
                  ke server.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
