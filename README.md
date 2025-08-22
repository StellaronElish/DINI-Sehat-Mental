# DINI Sehat Mental Web App

*Aplikasi web skrining tingkat stres kerja untuk pekerja perempuan.*

Web ini bertujuan untuk mengetahui seberapa tinggi tingkat stress para pekerja perempuan dengan cara responden akan menjawab pertanyaan pertanyaan terkait pekerjaan.

Hasil dari jawaban tersebut akan dikalkulasikan dan dikategorikan ke dalam 3 tingkatan yaitu kecil-sedang-besar. 

Proyek ini digunakan untuk responden menjawab kuesioner, hasilnya dihitung otomatis dan ditampilkan secara _eye-catching_ (teks + grafik).  

#### Web dibangun dengan tech **Laravel + Node.js** (backend API) dan **React + TypeScript + TailwindCSS** (frontend).

## 🚀 Tech Stack
- **Backend**: Laravel 12 (PHP 8.2), Node.js (22.18.0).
- **Frontend**: React 18, TypeScript (5.8.3), Vite, TailwindCSS (3.4.17).
- **Database**: MySQL / MariaDB (15.1/10.4.32).
- **Tools**: Composer (2.8.1), npm (10.9.3), Git.

---

## 📂 Project Structure
```bash
stress-level-app/
│
├── backend/ → Laravel project (API)
├── frontend/ → React + TS + Tailwind project
└── README.md
```
---

## ⚙️ Installation & Setup

### 1. Clone Repository
Silahkan Clone/Pull Repository terlebih dahulu ke server lokal mu.
```bash
git clone https://github.com/<username>/DINI-Sehat-Mental.git
```
Kemudian masuk ke dalam folder root untuk backend dan frontend yang sudah dibuat.
```bash
cd stress-level-app
```
---

### 2. Backend (Laravel)
Selanjutnya install package untuk backend Laravel, jika belum memiliki composer silahkan install terlebih dahulu [composer](https://getcomposer.org/download/). 

#### 1. Masuk ke dalam folder backend.
```bash
cd backend
```
#### 2. Kemudian install package untuk Laravel.
```bash
composer install
```
#### 3. Copy file .env
```bash
cp .env.example .env
```
#### 4. Edit file .env untuk konfigurasi database:
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=stress_level
DB_USERNAME=root
DB_PASSWORD=
```
#### 5. Lalu migrasi database.
```bash
php artisan migrate
```
#### 6. Kemudian Jalankan server Laravel nya.
```bash
php artisan serve
```
Server akan berjalan di localhost
```bash
http://127.0.0.1:8000
```
---

### 3. Frontend (React + TypeScript + Tailwindcss)
Selanjutnya install package untuk frontend React, Typescript, dan Tailwindcss, jika belum install node.js/npm silahkan install terlebih dahulu [node.js](https://nodejs.org/id).

#### 1. Masuk ke dalam folder frontend.
```bash
cd frontend
```
#### 2. Install package menggunakan npm.
```bash
npm install
```
#### 3. Kemudian jalankan server frontend nya.
```bash
npm run dev
```
Server akan berjalan di localhost
```bash
http://127.0.0.1:5173
```
