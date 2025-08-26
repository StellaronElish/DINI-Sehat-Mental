import { useState } from "react";
import { Link } from "react-router-dom";
import { Stethoscope, User, Lock } from "lucide-react";

export default function LandingPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login dokter:", { username, password });
    // TODO: Integrasikan ke backend Laravel untuk autentikasi dokter/psikolog
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Left section: Intro */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-blue-500 grid place-items-center text-white">
              <Stethoscope className="h-6 w-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              Sistem Analisis{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                Stress Kerja
              </span>
            </h1>
          </div>

          <p className="text-slate-600 text-base md:text-lg max-w-md">
            Platform komprehensif untuk evaluasi kesehatan mental karyawan
            dengan analisis mendalam dan rekomendasi profesional.
          </p>

          <div className="flex gap-4 flex-wrap">
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

        {/* Right section: Cards */}
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

              <p className="text-xs text-slate-500">
                <span className="font-semibold text-blue-600">Demo Login:</span>{" "}
                Username: dokter | Password: admin123
              </p>

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
    </div>
  );
}
