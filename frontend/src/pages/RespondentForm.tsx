import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Calendar, Briefcase } from "lucide-react";

export default function RespondentForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !age || !status) {
      alert("Harap lengkapi semua data diri!");
      return;
    }

    const parsedAge = parseInt(age);
    if (isNaN(parsedAge) || parsedAge < 18) {
      setError("Minimal usia untuk mengikuti survey adalah 18 tahun.");
      return;
    }

    // TODO: simpan data diri ke backend atau localStorage
    localStorage.setItem("respondent", JSON.stringify({ name, age, status }));

    // setelah submit → ke questionnaire
    navigate("/questionnaire");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-gray-200">
            <User className="h-7 w-7 text-gray-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            Survey Kepuasan Kerja
          </h1>
          <p className="mt-2 text-gray-600 text-sm">
            Sistem evaluasi komprehensif untuk meningkatkan lingkungan kerja
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md border p-6 space-y-5"
        >
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
            <User className="h-4 w-4 text-gray-500" /> Informasi Pribadi
          </h2>

          {/* Nama Lengkap */}
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Masukkan nama lengkap Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Usia */}
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="number"
              placeholder="Masukkan usia Anda"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Status Pekerjaan */}
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            >
              <option value="">Pilih status pekerjaan Anda</option>
              <option value="Karyawan">Karyawan</option>
              <option value="Mahasiswi">Mahasiswi</option>
              <option value="Ibu Rumah Tangga">Ibu Rumah Tangga</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          {/* Tentang Survey */}
          <div className="bg-gray-50 border rounded-lg p-4 text-xs text-gray-600 leading-relaxed">
            <p>• 109 pertanyaan komprehensif dalam 11 kategori</p>
            <p>• Waktu pengisian: 15–20 menit</p>
            <p>• Data akan dijaga kerahasiaannya</p>
            <p>• Hasil dapat membantu evaluasi lingkungan kerja</p>
          </div>

          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 rounded-lg font-medium"
          >
            Lengkapi Data Diri
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          Survey ini dirancang untuk membantu meningkatkan kualitas lingkungan
          kerja
        </p>
      </div>
    </div>
  );
}
