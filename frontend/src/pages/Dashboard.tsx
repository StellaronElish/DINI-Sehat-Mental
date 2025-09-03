import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Users, TrendingUp, AlertTriangle, Eye,Heart, Calendar, Search, ChevronDown, Download, FileText} from "lucide-react";

interface Respondent {
  id: number;
  name: string;
  age: number;
  status: string;
}

interface Result {
  id: number;
  respondent: Respondent;
  score_total: number;
  problematic_category: number;
  stress_level: "rendah" | "sedang" | "tinggi";
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<Result[]>([]);
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [levelFilter, setLevelFilter] = useState("Semua Level");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/results")
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        console.error("Gagal fetch data:", err);
        if (err.response?.status === 401) navigate("/login");
      });
  }, [navigate]);

  // 📊 Hitung statistik
  const totalResponden = results.length;
  const rataRata =
    results.length > 0
      ? (results.reduce((a, b) => a + b.score_total, 0) / results.length).toFixed(1)
      : 0;

      
      const baru7Hari = results.filter((r) => {
        const diff =
        (new Date().getTime() - new Date(r.created_at).getTime()) /
        (1000 * 60 * 60 * 24);
        return diff <= 7;
      }).length;
      
      const handleLogout = async() => {
        const token = localStorage.getItem("doctor_token");
        
        await axios.post("http://localhost:8000/api/doctor/logout", {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        localStorage.clear();
        navigate("/login");
        
      };

  const stressTinggi = results.filter((r) => r.stress_level === "tinggi").length;
  const stressSedang = results.filter((r) => r.stress_level === "sedang").length;
  const stressRendah = results.filter((r) => r.stress_level === "rendah").length;
      
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Dashboard Dokter
                </h1>
                <p className="text-sm text-slate-500">
                  Analisis Stress Kerja Responden
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
          title="Total Responden"
          value={totalResponden}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          bg="bg-blue-100"
          color="text-blue-600"
        />
        <StatCard
          title="Rata-rata Skor"
          value={`${rataRata}%`}
          icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
          bg="bg-emerald-100"
          color="text-emerald-600"
        />
        <StatCard
          title="Stress Tinggi"
          value={stressTinggi}
          icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
          bg="bg-red-100"
          color="text-red-600"
        />
        <StatCard
          title="Stress Sedang"
          value={stressSedang}
          icon={<Eye className="w-6 h-6 text-amber-600" />}
          bg="bg-amber-100"
          color="text-amber-600"
        />
        <StatCard
          title="Responden Baru (7 hari)"
          value={baru7Hari}
          icon={<Calendar className="w-6 h-6 text-violet-600" />}
          bg="bg-violet-100"
          color="text-violet-600"
        />
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stress Tinggi */}
          <div className="bg-gradient-to-r from-red-50 to-red-50/50 rounded-2xl p-6 border border-red-200/60">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-red-900 mb-1">Prioritas Tinggi</h3>
                {stressTinggi > 0 ? (
                  <p className="text-sm text-red-700">
                    {stressTinggi} responden perlu perhatian segera
                  </p>
                ) : (
                  <p className="text-sm text-red-700">Tidak ada responden dengan stress tinggi</p>
                )}
              </div>
            </div>
          </div>

          {/* Stress Sedang */}
          <div className="bg-gradient-to-r from-amber-50 to-amber-50/50 rounded-2xl p-6 border border-amber-200/60">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-amber-900 mb-1">Pemantauan</h3>
                {stressSedang > 0 ? (
                  <p className="text-sm text-amber-700">
                    {stressSedang} responden dalam pemantauan
                  </p>
                ) : (
                  <p className="text-sm text-amber-700">Tidak ada responden dengan stress sedang</p>
                )}
              </div>
            </div>
          </div>

          {/* Stress Rendah */}
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-50/50 rounded-2xl p-6 border border-emerald-200/60">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-900 mb-1">Kondisi Baik</h3>
                {stressRendah > 0 ? (
                  <p className="text-sm text-emerald-700">
                    {stressRendah} responden dalam kondisi baik
                  </p>
                ) : (
                  <p className="text-sm text-emerald-700">Tidak ada responden dengan stress rendah</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60">
          {/* Table Header */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-slate-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Data Responden
              </h2>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                {totalResponden}
              </span>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama responden..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                />
              </div>
              <div className="flex gap-3">
                <FilterSelect
                  value={statusFilter}
                  setValue={setStatusFilter}
                  options={["Semua Status", "Employed", "Unemployed"]}
                />
                <FilterSelect
                  value={levelFilter}
                  setValue={setLevelFilter}
                  options={[
                    "Semua Level",
                    "Stress Tinggi",
                    "Stress Sedang",
                    "Stress Rendah",
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div>
            {results
              .filter((res) => {
                // filter status
                if (
                  statusFilter !== "Semua Status" &&
                  res.respondent.status !== statusFilter
                )
                  return false;

                // filter level
                const levelText =
                  res.stress_level === "tinggi"
                    ? "Stress Tinggi"
                    : res.stress_level === "sedang"
                    ? "Stress Sedang"
                    : "Stress Rendah";
                if (levelFilter !== "Semua Level" && levelText !== levelFilter)
                  return false;

                return true;
              })
              .map((res) => {
                const level =
                  res.stress_level === "tinggi"
                    ? "Stress Tinggi"
                    : res.stress_level === "sedang"
                    ? "Stress Sedang"
                    : "Stress Rendah";

                return (
                  <div
                    key={res.id}
                    className="p-6 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                      {/* Left Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-base font-bold text-slate-900">
                              {res.respondent.name}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                level === "Stress Tinggi"
                                  ? "bg-red-100 text-red-700"
                                  : level === "Stress Sedang"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-emerald-100 text-emerald-700"
                              }`}
                            >
                              {level}
                            </span>
                          </div>
                          {/* Score on mobile */}
                          <div className="xl:hidden text-right">
                            <div className="text-2xl font-bold text-slate-900">
                              {res.score_total}
                            </div>
                            <div className="text-xs text-slate-500">
                              Skor Kesehatan Mental
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-slate-500">Usia:</span>
                            <div className="font-medium text-slate-900">
                              {res.respondent.age} tahun
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-500">Status:</span>
                            <div className="font-medium text-slate-900">
                              {res.respondent.status}
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-500">Skor:</span>
                            <div className="font-medium text-slate-900">
                              {res.score_total}
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-500">Jawaban:</span>
                            <div className="font-medium text-slate-900">
                              109/109
                            </div>
                          </div>
                        </div>

                        <div className="text-xs text-slate-500 space-y-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              Diselesaikan{" "}
                              {new Date(res.created_at).toLocaleDateString(
                                "id-ID"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Content - Desktop */}
                      <div className="hidden xl:flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-3xl font-bold text-slate-900 mb-1">
                            {res.score_total}
                          </div>
                          <div className="text-xs text-slate-500 mb-2">
                            Skor Kesehatan Mental
                          </div>
                          {level === "Stress Tinggi" && (
                            <span className="inline-flex px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                              Perlu perhatian Segera
                            </span>
                          )}
                        </div>
                        <button className="px-4 py-2 text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors text-sm font-medium">
                          Detail
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Export Section */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Export Data
              </h3>
              <p className="text-sm text-slate-500">
                Download laporan analisis stress kerja untuk {totalResponden}{" "}
                responden
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex items-center justify-center space-x-2 px-6 py-3 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl hover:shadow-sm transition-all text-sm font-semibold text-slate-700">
                <Download className="w-4 h-4" />
                <span>Export Excel</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 hover:shadow-lg transition-all text-sm font-semibold">
                <FileText className="w-4 h-4" />
                <span>Download Laporan PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen StatCard
const StatCard = ({ title, value, icon, bg, color }: any) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-2">{title}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
      </div>
      <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </div>
);

const FilterSelect = ({
  value,
  setValue,
  options,
}: {
  value: string;
  setValue: (v: string) => void;
  options: string[];
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium min-w-[140px]"
    >
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
  </div>
);

export default Dashboard;
