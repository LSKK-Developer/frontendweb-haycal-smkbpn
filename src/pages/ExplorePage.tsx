
import { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Modal, Select, Tag } from 'antd';
import { Plus, Search, Sparkles } from 'lucide-react';
import SkillCard from '../components/SkillCard';
import { useSkillUpStore } from '../store/useSkillUpStore';
import type { Skill } from '../types';

const schema = z.object({
  title: z.string().trim().min(3, 'Nama keterampilan minimal 3 karakter.'),
  category: z.string().min(2, 'Silakan pilih kategori.'),
  description: z.string().trim().min(10, 'Deskripsi minimal 10 karakter.'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  milestones: z.string().trim().min(3, 'Tambahkan minimal satu tahapan.'),
});

type SkillForm = z.infer<typeof schema>;

const categories = [
  { label: 'Semua', value: 'All' },
  { label: 'Teknologi', value: 'Technology' },
  { label: 'Desain', value: 'Design' },
  { label: 'Data', value: 'Data' },
  { label: 'Bahasa', value: 'Language' },
  { label: 'Bisnis', value: 'Business' },
  { label: 'Pengembangan Diri', value: 'Personal Growth' },
];

const levels = [
  { label: 'Pemula', value: 'Beginner' },
  { label: 'Menengah', value: 'Intermediate' },
  { label: 'Lanjutan', value: 'Advanced' },
];

export default function ExplorePage() {
  const skills = useSkillUpStore((state) => state.skills);
  const addSkill = useSkillUpStore((state) => state.addSkill);
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [open, setOpen] = useState(false);

  const { data = [] } = useQuery({
    queryKey: ['skill-catalog', skills],
    queryFn: async () => skills,
    staleTime: 0,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillForm>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      category: 'Technology',
      description: '',
      level: 'Beginner',
      milestones:
        'Mengenal dasar-dasar\nBerlatih materi dasar\nMembuat proyek sederhana',
    },
  });

  const filtered = useMemo(
    () =>
      data.filter(
        (skill) =>
          (category === 'All' || skill.category === category) &&
          `${skill.title} ${skill.description} ${skill.category}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [data, category, search],
  );

  const closeModal = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (values: SkillForm) => {
    const id = `custom-${Date.now()}`;

    const milestones = values.milestones
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((title, index) => ({
        id: `${id}-${index + 1}`,
        title,
        description: 'Tahapan pembelajaran yang kamu buat sendiri.',
        durationMinutes: 60,
        completed: false,
      }));

    if (milestones.length === 0) return;

    const skill: Skill = {
      id,
      title: values.title.trim(),
      category: values.category,
      description: values.description.trim(),
      level: values.level,
      estimatedWeeks: Math.max(1, Math.ceil(milestones.length / 2)),
      icon: 'code',
      color: 'violet',
      enrolled: true,
      custom: true,
      milestones,
    };

    addSkill(skill);
    void queryClient.invalidateQueries({ queryKey: ['skill-catalog'] });
    closeModal();
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-violet-600 dark:text-violet-300">
            <Sparkles size={13} /> Katalog Keterampilan
          </span>

          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Temukan Keterampilan Baru
          </h2>

          <p className="m-0 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Jelajahi jalur pembelajaran yang tersedia atau buat jalur pembelajaran sesuai tujuanmu.
          </p>
        </div>

        <Button
          type="primary"
          size="large"
          icon={<Plus size={16} />}
          onClick={() => setOpen(true)}
          className="!h-11 !rounded-xl !bg-violet-600 !px-4 !text-xs !font-bold"
        >
          Buat Keterampilan Sendiri
        </Button>
      </section>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 dark:border-[#292c42] dark:bg-[#191c2e] sm:flex-row">
        <Input
          size="large"
          prefix={<Search size={16} className="text-slate-400" />}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Cari keterampilan, topik, atau kategori..."
          className="!rounded-xl"
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item.value}
              onClick={() => setCategory(item.value)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                category === item.value
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-50 text-slate-500 hover:bg-violet-50 hover:text-violet-700 dark:bg-[#25283d] dark:text-slate-300 dark:hover:bg-violet-500/15'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="m-0 text-xs text-slate-400">
          Menampilkan{' '}
          <strong className="text-slate-600 dark:text-slate-200">
            {filtered.length}
          </strong>{' '}
          keterampilan
        </p>

        <Tag bordered={false} color="purple">
          Pilihan + Buatanmu
        </Tag>
      </div>

      {filtered.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-sm text-slate-500 dark:border-[#34374d]">
          Keterampilan tidak ditemukan. Coba pencarian lain atau buat keterampilan baru.
        </div>
      )}

      <Modal
        title="Buat Jalur Pembelajaran Sendiri"
        open={open}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
      >
        <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-1.5 block text-xs font-semibold">
              Nama Keterampilan
            </label>

            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Contoh: Pengembangan Web" />
              )}
            />

            {errors.title && (
              <p className="mt-1 text-xs text-rose-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold">
                Kategori
              </label>

              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    className="w-full"
                    value={field.value}
                    onChange={field.onChange}
                    options={categories
                      .filter((item) => item.value !== 'All')
                    }
                    placeholder="Pilih kategori"
                  />
                )}
              />

              {errors.category && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold">
                Tingkat Kesulitan
              </label>

              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <Select
                    className="w-full"
                    value={field.value}
                    onChange={field.onChange}
                    options={levels}
                  />
                )}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold">
              Deskripsi Singkat
            </label>

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  rows={2}
                  placeholder="Apa yang ingin kamu pelajari?"
                />
              )}
            />

            {errors.description && (
              <p className="mt-1 text-xs text-rose-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold">
              Tahapan Pembelajaran{' '}
              <span className="font-normal text-slate-400">
                (satu tahapan setiap baris)
              </span>
            </label>

            <Controller
              name="milestones"
              control={control}
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  rows={4}
                  placeholder={
                    'Pelajari dasar-dasarnya\nBerlatih materi dasar\nBuat sebuah proyek'
                  }
                />
              )}
            />

            {errors.milestones && (
              <p className="mt-1 text-xs text-rose-500">
                {errors.milestones.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button onClick={closeModal}>Batal</Button>

            <Button
              type="primary"
              htmlType="submit"
              className="!bg-violet-600"
            >
              Buat Jalur Pembelajaran
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
