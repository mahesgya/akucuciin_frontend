# Akucuciin Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Ini adalah repositori kode untuk antarmuka pengguna (frontend) dari aplikasi **Akucuciin**. Proyek ini dibangun untuk menyediakan platform yang mudah digunakan bagi pelanggan untuk memesan, melacak, dan mengelola layanan laundry mereka.

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Instalasi dan Menjalankan Proyek](#-instalasi-dan-menjalankan-proyek)
- [Skrip yang Tersedia](#-skrip-yang-tersedia)
- [Struktur Folder](#-struktur-folder)
- [Kontribusi](#-kontribusi)

## ✨ Fitur Utama

Berdasarkan struktur halaman, beberapa fitur yang direncanakan atau sudah ada adalah:

-   **Autentikasi Pengguna:** Halaman untuk login dan registrasi.
-   **Dashboard Pengguna:** Halaman utama setelah login untuk melihat ringkasan status pesanan dan informasi akun.
-   **Pemesanan:** Alur untuk membuat pesanan laundry baru.
-   **Riwayat Pesanan:** Melihat daftar semua pesanan yang pernah dibuat.
-   **Pelacakan Pesanan:** Melihat status terkini dari sebuah pesanan (misal: Diterima, Dicuci, Selesai, Diantar).
-   **Halaman Landing:** Halaman awal yang informatif untuk pengguna yang belum login.

## 🚀 Teknologi yang Digunakan

Proyek ini dibangun menggunakan ekosistem modern JavaScript:

-   **Framework Inti:** [React.js](https://reactjs.org/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Routing:** [React Router DOM](https://reactrouter.com/)
-   **Permintaan HTTP (API):** [Axios](https://axios-http.com/)
-   **Komponen UI Interaktif:** [Swiper.js](https://swiperjs.com/) (untuk carousel/slider)

## ⚙️ Instalasi dan Menjalankan Proyek

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/mahesgya/akucuciin_frontend.git](https://github.com/mahesgya/akucuciin_frontend.git)
    ```

2.  **Masuk ke direktori proyek:**
    ```bash
    cd akucuciin_frontend
    ```

3.  **Install semua dependency yang dibutuhkan:**
    (Gunakan salah satu manajer paket pilihanmu)
    ```bash
    npm install
    # atau
    yarn install
    # atau
    pnpm install
    ```

4.  **Jalankan server development:**
    ```bash
    npm run dev
    ```

5.  Buka browser dan kunjungi `http://localhost:5173` (atau port lain yang muncul di terminal Anda).

## 📜 Skrip yang Tersedia

Dalam file `package.json`, terdapat beberapa skrip yang dapat digunakan:

-   `npm run dev`: Menjalankan aplikasi dalam mode development.
-   `npm run build`: Membuat build aplikasi yang sudah dioptimalkan untuk production di dalam folder `dist/`.
-   `npm run preview`: Menjalankan server lokal untuk melihat hasil dari production build.

## 📁 Struktur Folder

Berikut adalah gambaran umum struktur folder penting dalam direktori `src/`:

```
src/
├── assets/         # Untuk menyimpan aset statis seperti gambar, ikon, dll.
├── components/     # Komponen React yang dapat digunakan kembali (Navbar, Footer, Card).
├── pages/          # Komponen yang berfungsi sebagai halaman (Home, Login, Dashboard).
├── services/       # Logika untuk berkomunikasi dengan API backend (menggunakan Axios).
├── utils/          # Fungsi bantuan atau utilitas umum.
├── App.jsx         # Komponen root aplikasi dan pengaturan routing.
└── main.jsx        # Titik masuk utama aplikasi (entry point).
```

## 🤝 Kontribusi

Kontribusi sangat diterima! Jika Anda ingin membantu mengembangkan proyek ini, silakan buat *fork* dari repositori ini dan ajukan *pull request* dengan perubahan yang Anda usulkan.

1.  Fork repositori ini.
2.  Buat branch fitur baru (`git checkout -b fitur/NamaFiturBaru`).
3.  Commit perubahan Anda (`git commit -m 'Menambahkan fitur A'`).
4.  Push ke branch tersebut (`git push origin fitur/NamaFiturBaru`).
5.  Buka Pull Request.

---
