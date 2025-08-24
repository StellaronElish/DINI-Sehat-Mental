// src/pages/Results.tsx
import { CheckCircle, AlertTriangle, Phone, Globe } from "lucide-react";

export default function Results() {
  // 🔹 Data dummy untuk sementara
  const totalScore = 280;
  const maxScore = 436;
  const percentage = ((totalScore / maxScore) * 100).toFixed(1);

  const level = "Tinggi"; // bisa "Rendah" | "Sedang" | "Tinggi"
  const name = "High";
  const age = 22;
  const status = "Employed";
  const answered = 109;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ✅ Header Success */}
        <div className="p-6 bg-green-100 rounded-xl border flex items-center gap-3">
          <CheckCircle className="text-green-600 w-6 h-6" />
          <div>
            <h1 className="text-lg font-bold text-green-700">
              Analisis Stress Kerja Selesai!
            </h1>
            <p className="text-sm text-gray-700">
              Terima kasih telah mengisi survey lengkap. Berikut hasil analisis
              Anda.
            </p>
          </div>
        </div>

        {/* 🔹 Hasil Utama */}
        <div className="p-6 bg-white rounded-xl shadow border space-y-4">
          <h2 className="text-xl font-bold text-red-600">
            Tingkat Stress {level}
          </h2>
          <p className="text-gray-700">
            Skor: {totalScore}/{maxScore} ({percentage}%)
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${
                level === "Tinggi"
                  ? "bg-red-500"
                  : level === "Sedang"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="text-sm text-gray-600">
            Anda mengalami tingkat stress kerja yang tinggi yang dapat berdampak
            pada kesehatan mental dan fisik. Disarankan untuk segera mengambil
            tindakan.
          </p>
        </div>

        {/* 🔴 Perhatian Khusus */}
        <div className="p-6 bg-red-100 border border-red-300 rounded-xl space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-600 w-5 h-5" />
            <h3 className="font-bold text-red-700">
              Perhatian Khusus Diperlukan
            </h3>
          </div>
          <p className="text-sm text-red-700">
            Tingkat stress Anda berada pada level <b>TINGGI</b> yang memerlukan
            perhatian medis profesional segera. Kondisi ini dapat berdampak
            serius pada kesehatan mental dan fisik Anda.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border flex items-center gap-3">
              <Phone className="w-6 h-6 text-red-600" />
              <div>
                <p className="text-sm font-medium">Hotline 24/7</p>
                <p className="text-gray-700">119 ext. 8</p>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg border flex items-center gap-3">
              <Globe className="w-6 h-6 text-red-600" />
              <div>
                <p className="text-sm font-medium">Konsultasi Online</p>
                <p className="text-gray-700">halodoc.com</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-red-700 font-semibold">
            ⚠️ Jangan Tunda - Konsultasi dalam 24–48 jam ke depan
          </p>
        </div>

        {/* 📌 Rekomendasi Action Plan */}
        <div className="p-6 bg-white rounded-xl shadow border space-y-4">
          <h3 className="font-bold text-gray-800">
            Rekomendasi Action Plan untuk Anda
          </h3>
          <p className="text-sm text-gray-600">
            Langkah-langkah yang dapat Anda ambil berdasarkan hasil analisis:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Segera konsultasi dengan psikolog atau psikiater",
              "Bicarakan dengan HR atau atasan tentang kondisi kerja",
              "Pertimbangkan untuk mengambil cuti jika memungkinkan",
              "Cari dukungan dari keluarga dan teman terdekat",
              "Evaluasi apakah lingkungan kerja cocok untuk Anda",
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border bg-gray-50 flex items-start gap-2"
              >
                <span className="text-sm font-bold text-red-600">
                  {idx + 1}.
                </span>
                <p className="text-sm text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 📊 Informasi Survey */}
        <div className="p-6 bg-white rounded-xl shadow border space-y-3">
          <h3 className="font-bold text-gray-800">Informasi Survey</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <p className="text-xs text-gray-500">Nama</p>
              <p className="font-medium">{name}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <p className="text-xs text-gray-500">Usia</p>
              <p className="font-medium">{age} tahun</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <p className="text-xs text-gray-500">Status</p>
              <p className="font-medium">{status}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <p className="text-xs text-gray-500">Pertanyaan</p>
              <p className="font-medium">{answered}/109</p>
            </div>
          </div>
        </div>

        {/* ⚠️ Catatan */}
        <div className="p-6 bg-white rounded-xl shadow border space-y-2">
          <h3 className="font-bold text-gray-800">Catatan Penting</h3>
          <p className="text-sm text-gray-600">
            Hasil analisis ini berdasarkan self-assessment dan tidak
            menggantikan diagnosis medis profesional.
          </p>
          <p className="text-sm text-red-600 font-semibold">
            ⚠️ Untuk kondisi stress tinggi, sangat disarankan konsultasi
            langsung dengan psikolog, psikiater, atau tenaga kesehatan mental
            profesional dalam 24–48 jam.
          </p>
        </div>

        {/* 🔘 Tombol Aksi */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => (window.location.href = "/form")}
            className="px-5 py-3 rounded-lg border bg-white text-gray-700 hover:bg-gray-100"
          >
            Kembali ke Data Diri
          </button>

          <button
            onClick={() => (window.location.href = "/questionnaire")}
            className="px-5 py-3 rounded-lg bg-black text-white hover:bg-gray-800"
          >
            Isi Survey Lagi
          </button>

          <button
            onClick={() => window.open("https://www.halodoc.com", "_blank")}
            className="px-5 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Konsultasi Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
