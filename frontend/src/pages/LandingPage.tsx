import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stethoscope, User, Lock } from "lucide-react";
import axios from "axios";
import FemaleDoctor from "../assets/FemaleDoctor.png"; // 🔹 pastikan file ada

export default function LandingPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showResumeModal, setShowResumeModal] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/doctor/login", {
        username,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("doctor_token", res.data.token);
        window.location.href = "/dashboard";
      } else {
        alert("Username atau password salah");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat login");
    }
  };

  // Cek progress survey
  useEffect(() => {
    const savedAnswers = localStorage.getItem("survey_answers");
    const savedIndex = localStorage.getItem("survey_index");

    if (savedAnswers && savedIndex) {
      setShowResumeModal(true);
    }
  }, []);

  const handleResume = () => {
    setShowResumeModal(false);
    navigate("/questionnaire");
  };

  const handleRestart = () => {
    localStorage.clear();
    setShowResumeModal(false);
    navigate("/form");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* 🔹 Left: Intro + Image */}
        <div className="space-y-6 flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-blue-500 grid place-items-center text-white">
              <Stethoscope className="h-6 w-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              Sistem Analisis{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                Screening Stress Kerja Perempuan
              </span>
            </h1>
          </div>

          <p className="text-slate-600 text-base md:text-lg max-w-md text-center md:text-left">
            Platform komprehensif untuk evaluasi kesehatan mental karyawan
            dengan analisis mendalam dan rekomendasi profesional.
          </p>

          {/* 🔹 Gambar: mobile di bawah teks, desktop center di bawah teks juga */}
          <div className="flex justify-center md:justify-start">
            <div
              className="relative w-full max-w-sm md:max-w-md rounded-3xl overflow-hidden shadow-xl"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <img
                src={FemaleDoctor}
                alt="Ilustrasi Dokter/Psikolog"
                className="w-full h-auto object-cover rounded-3xl"
              />
              {/* Floating particles */}
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-blue-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-teal-500 rounded-full opacity-20"></div>
              <div className="absolute top-1/3 -left-4 w-6 h-6 bg-green-500 rounded-full opacity-30"></div>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            <div className="rounded-xl border bg-white px-4 py-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-blue-600">109</p>
              <p className="text-xs text-slate-600">Pertanyaan Komprehensif</p>
            </div>
            <div className="rounded-xl border bg-white px-4 py-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-600">9</p>
              <p className="text-xs text-slate-600">Kategori Evaluasi</p>
            </div>
            <div className="rounded-xl border bg-white px-4 py-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-purple-600">3</p>
              <p className="text-xs text-slate-600">Level Stress Analysis</p>
            </div>
          </div>
        </div>

        {/* 🔹 Right: Forms */}
        <div className="space-y-6">
          {/* Login Dokter/Psikolog */}
          <div className="rounded-2xl border bg-white shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 border-b">
              <h2 className="flex items-center gap-2 font-semibold text-slate-800">
                <Stethoscope className="h-5 w-5 text-blue-600" /> Login Dokter /
                Psikolog
              </h2>
              <p className="text-xs text-slate-500">
                Akses dashboard untuk melihat hasil analisis stress kerja
                responden
              </p>
            </div>

            <form onSubmit={handleLogin} className="p-5 space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Masukkan username dokter"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
              >
                Masuk ke Dashboard
              </button>
            </form>
          </div>

          {/* Akses Responden */}
          <div className="rounded-2xl border bg-white shadow-md p-5">
            <h2 className="flex items-center gap-2 font-semibold text-slate-800">
              <User className="h-5 w-5 text-green-600" /> Akses Responden
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Langsung mengisi survey kepuasan kerja tanpa login
            </p>
            <Link
              to="/form"
              className="inline-flex items-center justify-center w-full border border-green-600 text-green-600 py-2 rounded-lg font-medium hover:bg-green-50"
            >
              Mulai Survey Sebagai Responden
            </Link>
          </div>
        </div>
      </div>

      {/* 🔹 Modal Konfirmasi */}
      {showResumeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              Lanjutkan Survey?
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Kami mendeteksi Anda masih memiliki survey yang belum selesai.
              Apakah Anda ingin melanjutkan survey atau memulai dari awal?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleRestart}
                className="px-4 py-2 rounded-lg border text-slate-600 hover:bg-slate-50"
              >
                Mulai Baru
              </button>
              <button
                onClick={handleResume}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
