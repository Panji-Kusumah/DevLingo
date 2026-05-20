# DevLingo

**DevLingo** adalah aplikasi belajar bahasa Inggris interaktif yang dirancang khusus untuk programmer dan pengembang perangkat lunak di Indonesia. Aplikasi ini dibuat untuk membantu meningkatkan keterampilan komunikasi profesional, memahami kosakata teknis, menulis dokumentasi berkualitas, serta mempersiapkan wawancara kerja dalam bahasa Inggris profesional.

---

## 🚀 Fitur Utama

Aplikasi ini mengintegrasikan metode belajar praktis dengan elemen gamifikasi untuk memastikan pengalaman belajar yang menyenangkan dan efektif:

### 1. Modul Pembelajaran Interaktif (Quiz Flow)
*   **Skenario Dunia Kerja Nyata**: Pelajari topik-topik krusial seperti *The Daily Standup* (bagaimana melaporkan perkembangan proyek dan hambatan), penamaan variabel yang bersih (*Clean Code Vocabulary*), penulisan dokumentasi, hingga diskusi teknis.
*   **Kuis Pilihan Ganda Interaktif**: Uji pemahaman Anda dengan skenario realistis lengkap dengan potongan kode program.
*   **Umpan Balik Instan**: Penjelasan mendalam untuk setiap jawaban membantu Anda memahami alasan di balik tata bahasa atau pilihan kata terbaik dalam dunia teknologi profesional.

### 2. Glosarium Istilah Teknis Lengkap
*   **Kamus Istilah Komprehensif**: Jelajahi berbagai istilah teknis penting mulai dari *Blocker*, *Backlog*, *Boolean*, *Refactoring*, hingga konsep arsitektur perangkat lunak.
*   **Pencarian Cepat**: Cari istilah berdasarkan kata kunci bahasa Inggris maupun bahasa Indonesia secara instan.
*   **Dilengkapi Contoh dan Klasifikasi**: Setiap istilah dilengkapi dengan kategori kosakata, definisi formal, serta contoh kalimat penggunaan di tempat kerja nyata.

### 3. Sistem Gamifikasi dan Kemajuan Belajar
*   **Catatan Konsistensi (Streak Counter)**: Jaga semangat belajar harian Anda melalui pelacak harian (*Daily Streak*) yang interaktif.
*   **Skor Pengalaman (XP Rewards)**: Raih poin XP setiap kali menyelesaikan pelajaran baru atau menjawab kuis dengan benar.
*   **Sistem Pangkat Dinamis**: Naiki tangga keahlian dari pangkat **Ahli Teknis**, lalu **Lanjutan**, hingga mencapai puncak prestasi sebagai seorang **Maestro**.

### 4. Penyimpanan Kemajuan Otomatis
*   Kemajuan belajar, akumulasi XP, sejarah *streak*, dan riwayat modul yang Anda selesaikan akan tersimpan dengan aman di perangkat lokal menggunakan integrasi penyimpanan web standar, sehingga Anda dapat melanjutkan pembelajaran kapan saja secara instan.

---

## 🎨 Desain dan Antarmuka Pengguna

Aplikasi ini dirancang dengan estetika modern, ramah di mata, serta responsif tinggi:
*   **Tema Gelap Premium**: Menggunakan palet warna gelap berkualitas tinggi untuk kenyamanan membaca dalam waktu lama.
*   **Tipografi Presisi**: Menggunakan font sans-serif modern yang dikombinasikan dengan font monospace untuk pembacaan kode yang optimal.
*   **Animasi Responsif**: Transisi antarlayar dan umpan balik tombol interaktif yang ditenagai oleh animasi halus untuk pengalaman pengguna yang dinamis.

---

## 🛠️ Teknologi yang Digunakan

Aplikasi web ini dibangun dengan menggunakan ekosistem teknologi modern:
*   **React 18** – Pustaka antarmuka berbasis komponen yang efisien.
*   **Vite** – Alat build supercepat untuk pengembangan frontend modern.
*   **TypeScript** – Memberikan jaminan tipe data statis dan kode yang aman dari kesalahan saat kompilasi.
*   **Tailwind CSS** – Kerangka kerja CSS berbasis utilitas untuk desain antarmuka yang modern, responsif, dan konsisten.
*   **Lucide React** – Penyedia ikon vektor yang bersih, efisien, dan minimalis.
*   **Framer Motion / Motion** – Pustaka animasi tangguh untuk transisi visual yang halus dan interaktif.
*   **Vitest & React Testing Library** – Kerangka kerja pengujian fungsionalitas otomatis untuk menjamin keandalan sistem.

---

## 💻 Cara Menjalankan Aplikasi di Lokal

Ikuti langkah-langkah berikut untuk menjalankan proyek di komputer lokal Anda:

### 1. Prasyarat
Pastikan Anda sudah menginstal **Node.js** (versi 16 atau lebih tinggi) dan **npm** di komputer Anda.

### 2. Instalasi Dependensi
Jalankan perintah berikut di direktori utama proyek untuk memasang berbagai pustaka yang dibutuhkan:
```bash
npm install
```

### 3. Menjalankan Server Pengembangan
Untuk meluncurkan server lokal dan melihat aplikasi di peramban Anda, jalankan perintah:
```bash
npm run dev
```
Aplikasi akan dapat diakses secara default melalui tautan `http://localhost:3000`.

### 4. Melakukan Uji Coba (Running Tests)
Untuk menjalankan seluruh rangkaian uji fungsionalitas otomatis dengan Vitest:
```bash
npm run test
```
