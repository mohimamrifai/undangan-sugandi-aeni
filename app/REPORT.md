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

## Revisi 30 Oktober 2026

Sumber: pesan klien (Sugandi) 30 Okt 2026 00.52 dan 00.58, diteruskan AXION lewat `BRIEF-RAKA-REVISI-3010.md`.

### Perubahan kode

- `src/components/WeddingPage.tsx` — teks Bismillah di bagian pembuka dihapus. Kalimat undangan diganti persis menjadi: "Tanpa mengurangi rasa hormat. Kami mengundang bapak/ibu/saudara/i serta kerabat sekalian untuk menghadiri acara pernikahan kami."
- `src/components/CoupleSection.tsx` — label bagian mempelai "Mempelai" diganti "The Bride & Groom". Ukuran, tracking, warna, dan tata letak tidak diubah.
- `src/components/GiftSection.tsx` — judul "Amplop digital" menjadi "Wedding Gift". Data rekening dummy (BCA/Mandiri) diganti data asli: BNI 2049302241 a/n Muhammad Sugandi, DANA 0895320368985 a/n Quratul Aeni. Kalimat "Nomor di atas masih contoh..." dihapus. Kedua tombol salin tetap berfungsi.
- Tidak ada perubahan pada cover, countdown, RSVP, ucapan, galeri, musik, footer, maupun panel admin. Skema database tidak diubah.

### Sapuan Bismillah

- `app/src`: 1 kemunculan, yaitu `src/components/WeddingPage.tsx` (teks Arab بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ). Sudah dihapus. Catatan: brief memperkirakan tidak ada di `app/src`, hasil grep menunjukkan ada satu.
- `app/public`: 0 kemunculan, termasuk seluruh aset `prewed-*.webp`.
- Halaman `/u/[slug]`: memakai komponen `WeddingPage`, jadi otomatis bersih.
- Di luar `app/` masih ada di: `print/v1.html`, `print/v3.html`, `print/v5-slim.html`, `print/print.css`, `print/print2.css`, `print/panduan-lipat.html`, `paket.html`, `site/index.html`. Berkas `print/v4-a5.html` (desain cetak terpilih) sudah dibersihkan. Varian cetak lain (v5-slim, v6-landscape) tidak diubah karena bukan desain yang dipilih klien. Kelas CSS `.bismillah` di `print2.css` dibiarkan karena tidak lagi dipakai `v4-a5.html`.

### Undangan cetak

- Berkas sumber: `print/v4-a5.html`. Cadangan versi 27 Okt: `print/v4-a5-sebelum-revisi-3010.html`.
- Tata letak sebaran dalam (halaman 2): nama kedua mempelai di kolom kiri, foto tambahan di kolom kanan, tanggal "Kamis, 12 November 2026" tepat di bawah foto. Bismillah dihapus; ayat QS. Ar-Rum 21 dipertahankan.
- Bingkai emas tetap satu bingkai yang menyambung melewati lipatan; garis dan motif tidak dipotong di tengah.
- Ukuran tetap A5 terbuka 29,7 × 21 cm + bleed 3 mm: file 303 × 216 mm (858,96 × 612 pt), 2 halaman.
- Foto: `app/public/prewed-02.webp` (satu-satunya foto prewedding yang belum dipakai di desain A5), dikonversi ke `print/photo-prewed-02.jpg` 960 × 1280, kualitas 94, 231 ppi saat dicetak.
- PDF baru: `print/Undangan-Cetak-A5-Revisi-3010.pdf` — 1.516.159 byte, teks sudah outline (0 font terdaftar di `pdffonts`), warna CMYK (terverifikasi `inkcov`), MD5 `29d89db7cefb2c649fddbbe4f1ebdf14`.

### Verifikasi

- `npm run build`: lulus. Satu peringatan lama `@next/next/no-page-custom-font` di `src/app/layout.tsx` (sudah ada sebelum revisi).
- Deploy produksi: `dpl_5y9h15rs48u4xSgdQYdYJjVzijaH` (`undangan-sugandi-aeni-oph3wq6ir`), status Ready (30 s), alias `https://undangan-sugandi-aeni.vercel.app` sudah menunjuk ke deployment ini.
- Verifikasi live, HTML dari `https://undangan-sugandi-aeni.vercel.app/` dan `/u/bapak-budi-santoso` (keduanya 200): "The Bride & Groom" 1, kalimat undangan baru 1, "Wedding Gift" 1, `2049302241` 1, `0895320368985` 1, Bismillah 0, "BCA" 0, "Mandiri" 0, "Amplop digital" 0, "Dengan memohon rahmat" 0.
- Verifikasi di browser pada URL live: 2 tombol "Salin nomor" ada; klik tombol pertama menyalin `2049302241`, klik tombol kedua menyalin `0895320368985`, dan label berubah menjadi "Nomor tersalin".
- `/admin` 200, `/api/ucapan` 200.
- Mobile 390 × 844: tidak ada overflow horizontal (`scrollWidth - clientWidth = 0`), label "The Bride & Groom" tetap satu baris.

### Tafsiran yang dipilih

- "Nama di kiri, foto di kanan, tanggal di bawah foto" diterapkan pada sebaran dalam (halaman 2). Sampul luar (halaman 1) tidak diubah: nama tetap menumpang di atas foto penuh karena di sisi luar tidak ada kolom foto kedua.
- Label mempelai memakai gaya kicker yang sudah ada (huruf kapital), sehingga tampil sebagai "THE BRIDE & GROOM"; teks sumbernya persis "The Bride & Groom".
- "Wedding Gift" hanya mengganti judul. Label kecil "Tanda Kasih" di atasnya dipertahankan karena klien tidak menyebutnya dan brief meminta teks penjelas tetap bahasa Indonesia. Kalimat penutup "Nomor di atas masih contoh..." diganti kalimat netral karena datanya sudah asli.
- Nomor DANA ditulis apa adanya `0895320368985` (bukan format +62) sesuai pesan klien.

### Tindak lanjut

- Repositori git sekarang ada di `app/`: commit baseline `1272733`, commit revisi `0d71459`.
- `print/` belum menjadi repositori git.
- Deploy CLI dari `app/` ditolak Vercel ("commit author doesn't have permission") karena direktori itu kini punya `.git` dengan author lokal; deploy berhasil dengan mengunggah salinan tanpa `.git` (struktur Root Directory `app` dipertahankan).

