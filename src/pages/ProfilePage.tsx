
import { useState } from 'react';
import { Monitor, Moon, Sun, UserRound } from 'lucide-react';
import { Button, Input, Tag } from 'antd';
import { useSkillUpStore } from '../store/useSkillUpStore';

export default function ProfilePage() {
  const { user, theme, setTheme, updateProfile } = useSkillUpStore();

  const [name, setName] = useState(user?.name ?? '');
  const [saved, setSaved] = useState(false);

  const initials = (user?.name ?? 'P')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section>
        <span className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-violet-600 dark:text-violet-300">
          <UserRound size={14} /> Pengaturan Akun
        </span>

        <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Profil Saya
        </h2>

        <p className="m-0 text-sm text-slate-500 dark:text-slate-400">
          Kelola profil demo dan preferensi aplikasi SkillUp.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-6 dark:border-[#292c42] dark:bg-[#191c2e]">
        <div className="mb-6 flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-lg font-extrabold text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">
            {initials}
          </span>

          <div>
            <h3 className="mb-1 text-base font-bold text-slate-800 dark:text-white">
              {user?.name}
            </h3>

            <p className="m-0 text-xs text-slate-400">
              {user?.email}
            </p>

            <Tag color="purple" bordered={false} className="mt-2">
              Akun Demo
            </Tag>
          </div>
        </div>

        <div className="max-w-md">
          <label
            htmlFor="profileName"
            className="mb-2 block text-xs font-bold text-slate-600 dark:text-slate-300"
          >
            Nama Tampilan
          </label>

          <Input
            id="profileName"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setSaved(false);
            }}
            placeholder="Masukkan nama kamu"
            className="!h-11 !rounded-xl"
          />

          <Button
            type="primary"
            disabled={!name.trim()}
            onClick={() => {
              updateProfile(name.trim());
              setSaved(true);
            }}
            className="!mt-3 !rounded-lg !bg-violet-600"
          >
            Simpan Profil
          </Button>

          {saved && (
            <span className="ml-3 text-xs font-semibold text-emerald-600">
              Profil berhasil disimpan!
            </span>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-6 dark:border-[#292c42] dark:bg-[#191c2e]">
        <div className="mb-4 flex items-center gap-2">
          <Monitor size={17} className="text-violet-600" />

          <h3 className="m-0 text-sm font-bold text-slate-800 dark:text-white">
            Tampilan Aplikasi
          </h3>
        </div>

        <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
          Pilih tampilan SkillUp sesuai kenyamananmu.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => setTheme('light')}
            aria-pressed={theme === 'light'}
            className={`flex items-center gap-3 rounded-xl border p-4 text-left ${
              theme === 'light'
                ? 'border-violet-400 bg-violet-50 dark:bg-violet-500/10'
                : 'border-slate-200 dark:border-[#34374d]'
            }`}
          >
            <Sun size={19} className="text-amber-500" />

            <span>
              <strong className="block text-xs text-slate-700 dark:text-slate-200">
                Mode Terang
              </strong>
              <span className="text-[11px] text-slate-400">
                Tampilan cerah dan jelas
              </span>
            </span>
          </button>

          <button
            onClick={() => setTheme('dark')}
            aria-pressed={theme === 'dark'}
            className={`flex items-center gap-3 rounded-xl border p-4 text-left ${
              theme === 'dark'
                ? 'border-violet-400 bg-violet-50 dark:bg-violet-500/10'
                : 'border-slate-200 dark:border-[#34374d]'
            }`}
          >
            <Moon size={19} className="text-indigo-500" />

            <span>
              <strong className="block text-xs text-slate-700 dark:text-slate-200">
                Mode Gelap
              </strong>
              <span className="text-[11px] text-slate-400">
                Tampilan nyaman untuk mata
              </span>
            </span>
          </button>
        </div>
      </section>

      <div className="rounded-xl bg-amber-50 p-4 text-xs leading-5 text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
        Informasi: Profil dan preferensi tersimpan di browser pada perangkat ini.
        Akun demo tidak terhubung ke server dan tidak disinkronkan antarperangkat.
      </div>
    </div>
  );
}
