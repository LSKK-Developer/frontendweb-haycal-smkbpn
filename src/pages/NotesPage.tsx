
import { useMemo, useState } from 'react';
import {
  BookOpen,
  FileText,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { Button, Input, Popconfirm, Select } from 'antd';
import { useSkillUpStore } from '../store/useSkillUpStore';

export default function NotesPage() {
  const { notes, skills, addNote, updateNote, deleteNote } =
    useSkillUpStore();

  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [skillId, setSkillId] = useState<string | undefined>();
  const [formOpen, setFormOpen] = useState(false);

  const filtered = useMemo(
    () =>
      notes.filter((note) =>
        `${note.title} ${note.content}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [notes, search],
  );

  const reset = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setSkillId(undefined);
    setFormOpen(false);
  };

  const startEdit = (note: (typeof notes)[number]) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setSkillId(note.skillId);
    setFormOpen(true);
  };

  const save = () => {
    if (!title.trim() || !content.trim()) return;

    if (editingId) {
      updateNote(editingId, {
        title: title.trim(),
        content: content.trim(),
        skillId,
      });
    } else {
      addNote({
        id: `note-${Date.now()}`,
        title: title.trim(),
        content: content.trim(),
        skillId,
        updatedAt: new Date().toISOString(),
      });
    }

    reset();
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-violet-600 dark:text-violet-300">
            <BookOpen size={14} /> Ruang Pengetahuan
          </span>

          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Catatan Pembelajaran
          </h2>

          <p className="m-0 text-sm text-slate-500 dark:text-slate-400">
            Simpan ide, rangkuman, dan hal penting yang ingin kamu ingat.
          </p>
        </div>

        <Button
          type="primary"
          icon={<Plus size={15} />}
          onClick={() => {
            reset();
            setFormOpen(true);
          }}
          className="!h-10 !rounded-xl !bg-violet-600"
        >
          Buat Catatan Baru
        </Button>
      </section>

      <Input
        prefix={<Search size={15} className="text-slate-400" />}
        placeholder="Cari catatanmu..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="!h-11 !max-w-md !rounded-xl"
      />

      {formOpen && (
        <section className="rounded-2xl border border-violet-100 bg-white p-5 shadow-soft dark:border-violet-500/20 dark:bg-[#191c2e]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="m-0 text-base font-bold text-slate-800 dark:text-white">
              {editingId ? 'Edit Catatan' : 'Buat Catatan Baru'}
            </h3>

            <button
              onClick={reset}
              aria-label="Tutup formulir catatan"
              className="text-slate-400 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Judul catatan"
              className="!h-10 !rounded-lg"
            />

            <Select
              allowClear
              value={skillId}
              onChange={setSkillId}
              placeholder="Keterampilan terkait (opsional)"
              className="w-full"
              options={skills.map((skill) => ({
                label: skill.title,
                value: skill.id,
              }))}
            />
          </div>

          <Input.TextArea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={5}
            placeholder="Tuliskan hal-hal yang sudah kamu pelajari..."
            className="!mt-3 !rounded-lg"
          />

          <div className="mt-3 flex justify-end gap-2">
            <Button onClick={reset}>Batal</Button>

            <Button
              type="primary"
              onClick={save}
              disabled={!title.trim() || !content.trim()}
              className="!bg-violet-600"
            >
              Simpan Catatan
            </Button>
          </div>
        </section>
      )}

      {filtered.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((note) => (
            <article
              key={note.id}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_5px_25px_rgba(35,35,65,.035)] dark:border-[#292c42] dark:bg-[#191c2e]"
            >
              <div className="mb-4 flex items-start justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300">
                  <FileText size={17} />
                </span>

                <div className="flex gap-1">
                  <button
                    onClick={() => startEdit(note)}
                    aria-label="Edit catatan"
                    className="rounded-lg p-2 text-slate-400 hover:bg-violet-50 hover:text-violet-600"
                  >
                    <Pencil size={15} />
                  </button>

                  <Popconfirm
                    title="Hapus catatan ini?"
                    description="Tindakan ini tidak dapat dibatalkan."
                    onConfirm={() => deleteNote(note.id)}
                    okText="Hapus"
                    cancelText="Batal"
                  >
                    <button
                      aria-label="Hapus catatan"
                      className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </Popconfirm>
                </div>
              </div>

              <h3 className="mb-2 text-sm font-bold text-slate-800 dark:text-white">
                {note.title}
              </h3>

              <p className="mb-4 line-clamp-5 whitespace-pre-line text-xs leading-6 text-slate-500 dark:text-slate-400">
                {note.content}
              </p>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-[#292c42]">
                <span className="truncate text-[10px] font-semibold text-violet-600 dark:text-violet-300">
                  {skills.find((skill) => skill.id === note.skillId)?.title ??
                    'Catatan Pribadi'}
                </span>

                <span className="text-[10px] text-slate-400">
                  {new Date(note.updatedAt).toLocaleDateString('id-ID')}
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center dark:border-[#34374d]">
          <FileText
            className="mx-auto mb-3 text-slate-300"
            size={28}
          />

          <p className="mb-1 text-sm font-bold text-slate-700 dark:text-white">
            Catatan Tidak Ditemukan
          </p>

          <p className="m-0 text-xs text-slate-400">
            Buat catatan pembelajaran pertamamu untuk menyimpan hal-hal penting.
          </p>
        </div>
      )}
    </div>
  );
}
