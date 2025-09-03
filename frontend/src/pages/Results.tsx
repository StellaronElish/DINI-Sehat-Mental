// src/pages/Results.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle, AlertTriangle, Phone, Globe } from "lucide-react";

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
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        navigate("/questionnaire");
      });

  }, [respondent, navigate]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat hasil analisis...</p>
      </div>
    );
  }

  const { name, age, status, score_total, problematic_category, stress_level } = data;
  const maxScore = 50;
  const percentage = ((score_total / maxScore) * 100).toFixed(1);

  // Pesan dinamis sesuai level stres
  const stressMessages: Record<typeof stress_level, string> = {
    rendah:
      "Stress Anda berada di level rendah. Kondisi ini masih dalam batas wajar. Tetap jaga pola hidup sehat agar tidak meningkat.",
    sedang:
      "Stress Anda berada di level sedang. Kondisi ini mulai memerlukan perhatian. Cobalah manajemen stress dengan relaksasi, olahraga, atau bercerita pada orang terdekat.",
    tinggi:
      "Stress Anda berada di level tinggi. Kondisi ini berpotensi membahayakan kesehatan mental dan fisik. Segera pertimbangkan konsultasi dengan tenaga profesional.",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="p-6 bg-green-100 rounded-xl border flex items-center gap-3">
          <CheckCircle className="text-green-600 w-6 h-6" />
          <div>
            <h1 className="text-lg font-bold text-green-700">
              Analisis Screening Stress Kerja Selesai!
            </h1>
            <p className="text-sm text-gray-700">
              Terima kasih telah mengisi survey lengkap. Berikut hasil analisis
              Anda.
            </p>
          </div>
        </div>

        {/* Hasil Utama */}
        <div className="p-6 bg-white rounded-xl shadow border space-y-4">
          <h2
            className={`text-xl font-bold ${
              stress_level === "tinggi"
                ? "text-red-600"
                : stress_level === "sedang"
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            Tingkat Stress {stress_level.toUpperCase()}
          </h2>
          <p className="text-gray-700">
            Skor: {score_total}/{maxScore} ({percentage}%) • Kategori Bermasalah:{" "}
            {problematic_category}
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${
                stress_level === "tinggi"
                  ? "bg-red-500"
                  : stress_level === "sedang"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="text-sm text-gray-600">{stressMessages[stress_level]}</p>
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
