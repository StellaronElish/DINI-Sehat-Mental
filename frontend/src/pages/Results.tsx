// src/pages/Results.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Phone, Globe, AlertTriangle } from "lucide-react";

// ilustrasi (letakkan di /src/assets)
import StressLow from "../assets/stress_low.png";
import StressMedium from "../assets/stress_medium.png";
import StressHigh from "../assets/stress_high.png";

interface ResultData {
  name: string;
  age: number;
  status: string;
  score_total: number;
  problematic_category: number;
  stress_level: "rendah" | "sedang" | "tinggi";
}

export default function Results() {
  const navigate = useNavigate();
  const [data, setData] = useState<ResultData | null>(null);
  const respondent = localStorage.getItem("respondent_id");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/results/${respondent}`)
      .then((res) => setData(res.data))
      .catch(() => navigate("/questionnaire"));
  }, [respondent, navigate]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat hasil analisis...</p>
      </div>
    );
  }

  const { name, age, status, score_total, problematic_category, stress_level } =
    data;

  // 🔹 Tetap pake 50, sesuai logika awal
  const maxScore = 50;
  const percentage = ((score_total / maxScore) * 100).toFixed(1);

  // 🔹 Config per level stress
  const config = {
    rendah: {
      color: "green",
      title: "Tingkat Stress Rendah",
      message:
        "Stress Anda berada di level rendah. Kondisi ini masih dalam batas wajar, tetap jaga pola hidup sehat agar tidak meningkat.",
      actions: [
        "Pertahankan pola tidur yang cukup dan berkualitas",
        "Lakukan olahraga rutin minimal 3x seminggu",
        "Jaga komunikasi baik dengan teman dan keluarga",
      ],
      img: StressLow,
    },
    sedang: {
      color: "yellow",
      title: "Tingkat Stress Sedang",
      message:
        "Stress Anda berada di level sedang. Kondisi ini mulai memerlukan perhatian. Cobalah manajemen stress dengan relaksasi, olahraga, atau bercerita pada orang terdekat.",
      actions: [
        "Coba praktikkan teknik pernapasan atau meditasi",
        "Atur ulang prioritas kerja agar lebih seimbang",
        "Diskusikan kondisi Anda dengan atasan/HR",
        "Cari dukungan emosional dari orang terdekat",
      ],
      img: StressMedium,
    },
    tinggi: {
      color: "red",
      title: "Tingkat Stress Tinggi",
      message:
        "Stress Anda berada di level tinggi. Kondisi ini berpotensi membahayakan kesehatan mental dan fisik. Segera pertimbangkan konsultasi dengan tenaga profesional.",
      actions: [
        "Segera konsultasi dengan psikolog atau psikiater",
        "Bicarakan dengan HR atau atasan tentang kondisi kerja",
        "Pertimbangkan cuti untuk pemulihan kondisi",
        "Cari dukungan keluarga dan teman dekat",
        "Evaluasi apakah lingkungan kerja cocok untuk Anda",
      ],
      img: StressHigh,
    },
  } as const;

  const cfg = config[stress_level];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div
          className={`p-6 rounded-xl border flex items-center gap-3 bg-${cfg.color}-50 border-${cfg.color}-200`}
        >
          <h1 className={`text-lg font-bold text-${cfg.color}-700`}>
            Analisis Screening Stress Kerja Selesai!
          </h1>
          <p className="text-sm text-gray-700">
            Terima kasih telah mengisi survey lengkap. Berikut hasil analisis
            Anda.
          </p>
        </div>

        {/* Hasil Utama */}
        <div className="p-6 bg-white rounded-xl shadow border space-y-4 text-center">
          <div className="flex justify-center">
            <img
              src={cfg.img}
              alt={`Stress level ${stress_level}`}
              className="w-40 h-40 object-contain"
            />
          </div>

          <h2 className={`text-xl font-bold text-${cfg.color}-600`}>
            {cfg.title}
          </h2>

          <p className="text-gray-700">
            Skor: {score_total}/{maxScore} ({percentage}%) • Kategori
            Bermasalah: {problematic_category}
          </p>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full bg-${cfg.color}-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="text-sm text-gray-600">{cfg.message}</p>
        </div>

        {/* Rekomendasi Action Plan */}
        <div className="p-6 bg-white rounded-xl shadow border space-y-4">
          <h3 className="font-bold text-gray-800">
            Rekomendasi Action Plan untuk Anda
          </h3>
          <ul className="space-y-2">
            {cfg.actions.map((act, i) => (
              <li
                key={i}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border"
              >
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700">{act}</span>
              </li>
            ))}
          </ul>

          {stress_level === "tinggi" && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg mt-4">
              <p className="text-sm text-red-700 font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Tindakan Segera Diperlukan
              </p>
              <p className="text-xs text-red-600 mt-1">
                Segera hubungi tenaga kesehatan profesional dalam 24–48 jam
                untuk menghindari dampak serius pada kesehatan mental dan fisik
                Anda.
              </p>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white border rounded-lg flex items-center gap-3">
                  <Phone className="text-red-500 w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Hotline 24/7
                    </p>
                    <p className="text-xs text-gray-600">119 ext. 8</p>
                  </div>
                </div>
                <div
                  className="p-3 bg-white border rounded-lg flex items-center gap-3 cursor-pointer hover:bg-gray-50"
                  onClick={() =>
                    window.open("https://www.halodoc.com", "_blank")
                  }
                >
                  <Globe className="text-blue-500 w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Konsultasi Online
                    </p>
                    <p className="text-xs text-gray-600">halodoc.com</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Informasi Survey */}
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
              <p className="font-medium">109/109</p>
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/form");
            }}
            className="px-5 py-3 rounded-lg border bg-white text-gray-700 hover:bg-gray-100"
          >
            Kembali ke Data Diri
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/form");
            }}
            className="px-5 py-3 rounded-lg bg-black text-white hover:bg-gray-800"
          >
            Isi Survey Lagi
          </button>
        </div>
      </div>
    </div>
  );
}
