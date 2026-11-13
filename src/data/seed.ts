
import type { Skill } from '../types';

export const seedSkills: Skill[] = [
  {
    id: 'frontend-developer',
    title: 'Pengembangan Frontend',
    category: 'Technology',
    description:
      'Pelajari cara membuat website yang responsif, mudah diakses, dan interaktif dari dasar.',
    level: 'Beginner',
    estimatedWeeks: 8,
    icon: 'code',
    color: 'violet',
    enrolled: true,
    milestones: [
      {
        id: 'fe-1',
        title: 'Dasar-Dasar HTML dan CSS',
        description:
          'Pelajari struktur HTML, tata letak halaman, dan desain responsif.',
        durationMinutes: 180,
        completed: true,
      },
      {
        id: 'fe-2',
        title: 'Dasar-Dasar JavaScript',
        description:
          'Pelajari variabel, fungsi, array, dan interaksi dengan DOM.',
        durationMinutes: 240,
        completed: true,
      },
      {
        id: 'fe-3',
        title: 'Dasar-Dasar React',
        description:
          'Buat komponen yang dapat digunakan kembali dan kelola state aplikasi.',
        durationMinutes: 300,
        completed: false,
      },
      {
        id: 'fe-4',
        title: 'TypeScript dan Integrasi API',
        description:
          'Gunakan tipe data dan hubungkan antarmuka dengan data eksternal.',
        durationMinutes: 240,
        completed: false,
      },
      {
        id: 'fe-5',
        title: 'Membuat Proyek Portofolio',
        description:
          'Terapkan materi yang sudah dipelajari dalam sebuah proyek frontend lengkap.',
        durationMinutes: 360,
        completed: false,
      },
    ],
  },
  {
    id: 'ui-ux-design',
    title: 'Desain UI/UX',
    category: 'Design',
    description:
      'Pelajari riset pengguna, pembuatan wireframe, sistem visual, dan prototipe interaktif.',
    level: 'Beginner',
    estimatedWeeks: 6,
    icon: 'palette',
    color: 'pink',
    enrolled: true,
    milestones: [
      {
        id: 'ux-1',
        title: 'Dasar-Dasar Design Thinking',
        description:
          'Pahami desain yang berpusat pada pengguna dan cara merumuskan masalah.',
        durationMinutes: 90,
        completed: true,
      },
      {
        id: 'ux-2',
        title: 'Riset Pengguna',
        description:
          'Pelajari cara mengenali kebutuhan pengguna dan membuat profil pengguna sederhana.',
        durationMinutes: 150,
        completed: false,
      },
      {
        id: 'ux-3',
        title: 'Pembuatan Wireframe',
        description:
          'Ubah ide menjadi rancangan tata letak halaman yang sederhana.',
        durationMinutes: 180,
        completed: false,
      },
      {
        id: 'ux-4',
        title: 'Prototipe dan Pengujian Kemudahan Penggunaan',
        description:
          'Buat prototipe interaktif dan uji alur penggunaannya.',
        durationMinutes: 240,
        completed: false,
      },
    ],
  },
  {
    id: 'data-analytics',
    title: 'Analisis Data',
    category: 'Data',
    description:
      'Ubah data mentah menjadi informasi yang bermanfaat menggunakan spreadsheet dan visualisasi.',
    level: 'Intermediate',
    estimatedWeeks: 7,
    icon: 'chart',
    color: 'blue',
    enrolled: false,
    milestones: [
      {
        id: 'da-1',
        title: 'Mengenal dan Mengolah Data',
        description:
          'Pelajari jenis data, kualitas data, dan teknik pembersihan data dasar.',
        durationMinutes: 120,
        completed: false,
      },
      {
        id: 'da-2',
        title: 'Analisis Menggunakan Spreadsheet',
        description:
          'Gunakan rumus, pengurutan data, dan tabel pivot.',
        durationMinutes: 210,
        completed: false,
      },
      {
        id: 'da-3',
        title: 'Visualisasi Data',
        description:
          'Pilih jenis grafik yang tepat untuk menyampaikan informasi.',
        durationMinutes: 180,
        completed: false,
      },
      {
        id: 'da-4',
        title: 'Proyek Analisis Sederhana',
        description:
          'Analisis kumpulan data kecil dan sajikan hasilnya.',
        durationMinutes: 300,
        completed: false,
      },
    ],
  },
  {
    id: 'english-speaking',
    title: 'Komunikasi Bahasa Inggris',
    category: 'Language',
    description:
      'Bangun kepercayaan diri dalam percakapan sehari-hari, presentasi, dan lingkungan profesional.',
    level: 'Beginner',
    estimatedWeeks: 5,
    icon: 'messages',
    color: 'amber',
    enrolled: false,
    milestones: [
      {
        id: 'en-1',
        title: 'Kosakata Sehari-hari',
        description:
          'Pelajari kosakata yang berguna untuk berbagai situasi sehari-hari.',
        durationMinutes: 120,
        completed: false,
      },
      {
        id: 'en-2',
        title: 'Latihan Berbicara',
        description:
          'Latih percakapan singkat dan pelafalan bahasa Inggris.',
        durationMinutes: 180,
        completed: false,
      },
      {
        id: 'en-3',
        title: 'Menyampaikan Ide',
        description:
          'Susun dan sampaikan ide dengan jelas dan percaya diri.',
        durationMinutes: 180,
        completed: false,
      },
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Pemasaran Digital',
    category: 'Business',
    description:
      'Pelajari target audiens, perencanaan konten, media sosial, dan pengukuran keberhasilan kampanye.',
    level: 'Intermediate',
    estimatedWeeks: 6,
    icon: 'megaphone',
    color: 'green',
    enrolled: false,
    milestones: [
      {
        id: 'dm-1',
        title: 'Target Audiens dan Positioning',
        description:
          'Tentukan target audiens dan nilai utama yang ditawarkan.',
        durationMinutes: 120,
        completed: false,
      },
      {
        id: 'dm-2',
        title: 'Strategi Konten',
        description:
          'Rencanakan format konten dan kalender publikasi.',
        durationMinutes: 180,
        completed: false,
      },
      {
        id: 'dm-3',
        title: 'Pengukuran Kampanye',
        description:
          'Pelajari metrik interaksi dan konversi untuk mengevaluasi kampanye.',
        durationMinutes: 210,
        completed: false,
      },
    ],
  },
];
