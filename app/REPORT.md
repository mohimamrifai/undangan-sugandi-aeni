# Laporan Undangan Sugandi & Aeni

Tanggal: 27 Oktober 2026

## Ringkasan

Undangan digital di `app/` sudah selesai dan sudah diuji. Clerk dihapus sepenuhnya. Tamu dapat mengirim ucapan tanpa login, ucapan masuk ke database dalam status menunggu, dan admin dapat menyetujui atau menghapus ucapan lewat panel sederhana di `/admin`. Ucapan yang sudah disetujui tampil di halaman undangan dan diperbarui otomatis oleh halaman setiap 20 detik.

Database setelah pengujian bersih: `ucapan` 0 baris dan `rsvp` 0 baris.

## Perubahan dari Brief

Brief awal meminta autentikasi Clerk dan `POST /api/ucapan` menolak tamu tanpa login dengan status 401. Atas permintaan terbaru, bagian tersebut diganti:

- Clerk beserta seluruh komponen, provider, middleware, dependency, dan environment terkait dihapus, termasuk environment Clerk di Vercel dan berkas env lokal.
- Form ucapan publik tidak memakai login dan tidak mengumpulkan email.
- `POST /api/ucapan` sekarang publik, menyimpan ucapan dengan status menunggu, dan mengembalikan 201.
- Ucapan hanya tampil di daftar publik setelah disetujui admin.
- Panel admin ditambahkan untuk menyetujui, membatalkan persetujuan, dan menghapus ucapan.

Pemeriksaan 401 lama untuk `POST /api/ucapan` tidak berlaku lagi. Penggantinya adalah pemisahan status menunggu dan disetujui, yang sudah diuji.

## Implementasi

### Halaman undangan

- Tampilan navy, gold, dan ivory dipertahankan.
- Isi undangan, cover, musik, countdown, galeri, RSVP, dan footer tetap ada.
- Tidak ada form login, email, tombol masuk, badge Clerk, atau teks pengembangan di halaman publik.
- Favicon memakai monogram `S&A` di `src/app/icon.svg`, sehingga permintaan `/favicon.ico` yang gagal tidak muncul lagi.
- Font Cormorant Garamond dan Jost disajikan sendiri dari `public/fonts` agar build tidak bergantung pada pengambilan Google Fonts.

### Ucapan publik

- Form berisi nama tampilan dan ucapan.
- Setelah tombol kirim ditekan, form dikosongkan dan muncul informasi bahwa ucapan sudah terkirim dan akan tampil otomatis setelah disetujui admin.
- Daftar publik hanya mengambil ucapan dengan `disetujui = TRUE`.
- Daftar diperbarui otomatis setiap 20 detik saat tab sedang terlihat.
- Validasi server: nama 2 sampai 60 karakter, ucapan 1 sampai 500 karakter, JSON harus valid.
- `GET /api/ucapan` memakai `Cache-Control: no-store` dan hanya mengembalikan kolom yang aman.

### Panel admin

- Rute: `/admin`.
- Login memakai akun admin yang sudah ditentukan. Kredensial disimpan sebagai environment variable server (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, opsional `ADMIN_SESSION_SECRET`) dan tidak dimasukkan ke repository publik. Nilai kredensial tidak dicantumkan di laporan ini.
- Sesi memakai cookie HttpOnly, SameSite Lax, Secure saat produksi, dan token HMAC bertanda tangan.
- Dashboard menampilkan filter Menunggu, Disetujui, dan Semua, beserta jumlahnya.
- Admin dapat menyetujui, membatalkan persetujuan, menghapus ucapan, dan memuat ulang daftar.
- Panel admin memakai `noindex, nofollow` dan tidak ditautkan dari halaman publik.
- Password admin tidak ada di bundle client. Pemeriksaan `.next/static` menemukan 0 kemunculan.

### Database

Skema `ucapan` sekarang:

- `id`
- `nama_ketik`
- `pesan`
- `disetujui` boolean, default false
- `dibuat_pada`
- `disetujui_pada`

Kolom email lama dihapus karena alur login sudah tidak dipakai. Migrasi `scripts/migrate.ts` bersifat idempotent dan menambahkan kolom serta index yang diperlukan. Tabel `rsvp` tidak berubah.

## Verifikasi

### Build dan pemeriksaan statis

- `npm run build`: lulus.
- `npx tsc --noEmit`: lulus, tanpa error.
- `npx eslint .`: lulus, tanpa error.
- `npm run migrate`: lulus dan aman dijalankan ulang.

### HTTP lokal

- `/`: 200
- `/admin`: 200
- `/icon.svg`: 200
- `/prewed-01.webp`: 200
- `/prewed-02.webp`: 200
- `/og.jpg`: 200
- `/music.mp3`: 200
- `GET /api/ucapan`: 200, `cache-control: no-store`
- `GET /api/admin/ucapan` tanpa sesi: 401
- `POST /api/admin/login` dengan kredensial salah: 401
- `POST /api/admin/login` dengan kredensial benar: 200
- `POST /api/admin/logout`: 200 dan cookie dihapus
- `PATCH` admin dari origin lain: 403
- Cookie admin yang diubah: 401
- Halaman `/admin`: `noindex, nofollow`
- HTML publik dan admin: tidak ada referensi Clerk, tidak ada teks terlarang, dan tidak ada URL pengembangan.

### HTTP produksi

- `/`: 200, memuat aset `_next/static`, judul undangan, dan tanpa form login atau Clerk.
- `/admin`: 200, `noindex, nofollow`.
- `/api/ucapan`: 200, `cache-control: no-store`.
- `/api/admin/ucapan` tanpa sesi: 401.
- `/api/admin/login` dengan kredensial salah: 401.
- `/api/admin/login` dengan kredensial benar: 200.
- `/fonts/cormorant-normal.woff2`, `/fonts/cormorant-italic.woff2`, `/fonts/jost-normal.woff2`, `/icon.svg`, `/prewed-01.webp`, `/prewed-02.webp`, `/music.mp3`, dan `/og.jpg`: 200.
- Panel admin produksi: login berhasil, filter dan jumlah tampil, logout berhasil.

### Alur ucapan

1. `POST /api/ucapan` tanpa login: 201.
2. Ucapan baru tidak muncul di `GET /api/ucapan`.
3. Admin melihat ucapan di filter Menunggu.
4. Admin menyetujui: 200.
5. Ucapan muncul di daftar publik tanpa memuat ulang halaman, lewat pembaruan otomatis.
6. Admin membatalkan persetujuan: ucapan hilang dari daftar publik.
7. Admin menghapus: baris terhapus dari database.
8. Validasi nama 1 karakter, nama 61 karakter, ucapan 501 karakter, ucapan kosong, dan JSON rusak semuanya menghasilkan 400.

### Alur ucapan produksi

1. `POST /api/ucapan` di produksi: 201.
2. Ucapan uji tidak tampil di daftar publik sebelum disetujui.
3. Ucapan uji terlihat di filter Menunggu admin.
4. Admin menyetujui: 200 dan ucapan tampil di daftar publik.
5. Admin menghapus: 200 dan ucapan hilang dari daftar publik.
6. Jumlah akhir `ucapan`: 0.

### RSVP

- Data tidak valid: 400.
- Data valid: 201.
- Baris baru diverifikasi langsung di database.
- Baris uji dihapus kembali.
- Jumlah akhir `rsvp` 0.

### Layout

- 390 x 844: `scrollHeight` 4371, tanpa overflow horizontal.
- 1440 x 900: `scrollHeight` 4304, tanpa overflow horizontal.
- Tidak ada target sentuh di bawah 44 px.
- Tidak ada teks di bawah 12 px.
- Musik berputar setelah undangan dibuka.
- Tidak ada error console di halaman publik.
- Tidak ada resource Clerk yang dimuat.
- Panel admin di 390 px dan 1440 px juga tanpa overflow, tanpa target sentuh kecil, dan tanpa teks di bawah 12 px.
- Produksi 390 x 844 dan 1440 x 900: tinggi halaman sama dengan build lokal, tanpa overflow horizontal, tanpa target sentuh di bawah 44 px, tanpa teks di bawah 12 px, tanpa error console, dan tanpa resource Clerk.
- Panel admin produksi di 390 px: tanpa overflow horizontal, tanpa target sentuh kecil, dan tanpa teks di bawah 12 px.

### Kebersihan data

- `ucapan`: 0 baris.
- `rsvp`: 0 baris.
- Tidak ada user Clerk uji yang tersisa.
- Tidak ada baris uji yang tertinggal.

## Catatan dan Tindakan Lanjutan

- Login admin memakai akun tetap yang disimpan sebagai environment variable Vercel. Karena repository GitHub bersifat publik, kredensial tidak ditulis di source. Pertimbangkan autentikasi yang lebih kuat jika panel dipakai jangka panjang.
- `POST /api/ucapan` bersifat publik dan belum memiliki rate limit atau captcha. Antrean persetujuan mencegah ucapan spam tampil, tetapi belum mencegah spam masuk ke database. Tambahkan rate limit atau captcha bila diperlukan.
- OG image memakai URL produksi `https://undangan-sugandi-aeni.vercel.app/og.jpg`. Jika domain produksi berbeda, set `NEXT_PUBLIC_SITE_URL` agar URL metadata ikut berubah.
- Halaman statis di root `site/` tidak diubah. Aplikasi Next.js ditempatkan di `site/app/` agar dapat dibangun oleh Vercel dengan Root Directory `app`.

## Deployment

- Publik: `https://undangan-sugandi-aeni.vercel.app/`
- Admin: `https://undangan-sugandi-aeni.vercel.app/admin`
- GitHub: `https://github.com/mohimamrifai/undangan-sugandi-aeni`
- Framework Vercel: Next.js
- Root Directory Vercel: `app`
- Status: produksi aktif, deployment READY
- Build Vercel: lulus dengan font self-hosted
- Kredensial admin: environment Vercel, tidak masuk repository

## File Utama

- `src/components/UcapanSection.tsx`
- `src/app/api/ucapan/route.ts`
- `src/app/admin/page.tsx`
- `src/components/admin/AdminLogin.tsx`
- `src/components/admin/AdminDashboard.tsx`
- `src/app/api/admin/login/route.ts`
- `src/app/api/admin/logout/route.ts`
- `src/app/api/admin/ucapan/route.ts`
- `src/app/api/admin/ucapan/[id]/route.ts`
- `src/lib/admin-auth.ts`
- `scripts/migrate.ts`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/app/icon.svg`
- `public/fonts/`

File yang dihapus: `src/middleware.ts` dan `src/components/EmailCodeAuth.tsx`. Dependency `@clerk/nextjs` juga dihapus dari `package.json` dan lockfile.
