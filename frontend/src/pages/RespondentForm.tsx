import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Calendar, Briefcase, CheckCircle2 } from "lucide-react";

export default function RespondentForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const jobStatuses = [
    { value: "Staff", label: "Staff/Karyawan" },
    { value: "Supervisor", label: "Supervisor/Team Lead" },
    { value: "Manager", label: "Manager" },
    { value: "Senior Manager", label: "Senior Manager" },
    { value: "Director", label: "Director/VP" },
    { value: "Executive", label: "C-Level Executive" },
    { value: "Consultant", label: "Konsultan" },
    { value: "Contractor", label: "Contractor/Freelancer" },
    { value: "Intern", label: "Magang/Trainee" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !age || !status) {
      setError("Harap lengkapi semua data diri!");
      setIsSubmitting(false);
      return;
    }

    const parsedAge = parseInt(age);
    if (isNaN(parsedAge) || parsedAge < 18) {
      setError("Minimal usia untuk mengikuti survey adalah 18 tahun.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate loading for better UX
      setTimeout(() => {
        // TODO: simpan data diri ke backend atau localStorage
        localStorage.setItem(
          "respondent",
          JSON.stringify({ name, age, status })
        );

        // setelah submit → ke questionnaire
        navigate("/questionnaire");
      }, 800);
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setIsSubmitting(false);
    }
  };

  const clearError = () => {
    if (error) setError("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8 transform transition-all duration-500 ease-out">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-white shadow-lg mb-4 transform transition-transform hover:scale-105">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-800">
            Survey Kepuasan Kerja
          </h1>
          <p className="mt-2 text-gray-600 text-sm leading-relaxed">
            Evaluasi komprehensif untuk meningkatkan
            <br />
            kualitas lingkungan kerja perusahaan
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 space-y-6 transform transition-all duration-300 hover:shadow-2xl"
        >
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-blue-600" /> Data Responden
          </h2>

          {/* Nama Lengkap */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <div className="relative">
              <User
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${
                  focusedField === "name" || name
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              />
              <input
                type="text"
                placeholder="Masukkan nama lengkap Anda"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearError();
                }}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField("")}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none ${
                  focusedField === "name"
                    ? "border-blue-500 ring-4 ring-blue-50"
                    : "border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                }`}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Usia */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Usia
            </label>
            <div className="relative">
              <Calendar
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${
                  focusedField === "age" || age
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              />
              <input
                type="number"
                placeholder="Masukkan usia Anda"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  clearError();
                }}
                onFocus={() => setFocusedField("age")}
                onBlur={() => setFocusedField("")}
                min="18"
                max="100"
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none ${
                  focusedField === "age"
                    ? "border-blue-500 ring-4 ring-blue-50"
                    : "border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                }`}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Status Pekerjaan */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Posisi/Level Pekerjaan
            </label>
            <div className="relative">
              <Briefcase
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-200 z-10 ${
                  focusedField === "status" || status
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              />
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  clearError();
                }}
                onFocus={() => setFocusedField("status")}
                onBlur={() => setFocusedField("")}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none appearance-none bg-white ${
                  focusedField === "status"
                    ? "border-blue-500 ring-4 ring-blue-50"
                    : "border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                }`}
                required
                disabled={isSubmitting}
              >
                <option value="">Pilih posisi/level pekerjaan Anda</option>
                {jobStatuses.map((job) => (
                  <option key={job.value} value={job.value}>
                    {job.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Tentang Survey */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              Tentang Survey Ini
            </h3>
            <div className="space-y-1 text-xs text-gray-600 leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-semibold">•</span>
                <span>
                  109 pertanyaan komprehensif dalam 9 kategori evaluasi
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-semibold">•</span>
                <span>Estimasi waktu pengisian: 10–15 menit</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-semibold">•</span>
                <span>
                  Hasil membantu evaluasi dan perbaikan lingkungan kerja
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 transition-all duration-300 ease-in-out">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-200 transform ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5 active:transform-none"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Memproses...
              </div>
            ) : (
              "Mulai Survey"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500 leading-relaxed">
          Survey ini dirancang khusus untuk mengevaluasi dan meningkatkan
          <br />
          kualitas lingkungan kerja di perusahaan Anda
        </p>
      </div>
    </div>
  );
}
