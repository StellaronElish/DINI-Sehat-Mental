import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Phone,
  Globe,
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
  Brain,
  Shield,
  User,
  Calendar,
  Briefcase,
  BarChart3,
  ArrowRight,
  Download,
  Share2,
} from "lucide-react";

// Import gambar ilustrasi yang sudah ada
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
  const [isLoaded, setIsLoaded] = useState(false);
  const respondent = localStorage.getItem("respondent_id");

  useEffect(() => {
    // Simulasi loading untuk UX yang lebih baik
    setIsLoaded(false);

    axios
      .get(`http://localhost:8000/api/results/${respondent}`)
      .then((res) => {
        setData(res.data);
        // Delay sedikit untuk loading animation
        setTimeout(() => setIsLoaded(true), 800);
      })
      .catch(() => navigate("/questionnaire"));
  }, [respondent, navigate]);

  // Loading State
  if (!data || !isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium">
            Menganalisis hasil assessment Anda...
          </p>
          <p className="text-sm text-gray-500">Harap tunggu beberapa saat</p>
        </div>
      </div>
    );
  }

  const { name, age, status, score_total, problematic_category, stress_level } =
    data;

  const maxScore = 50;
  const percentage = ((score_total / maxScore) * 100).toFixed(1);

  // Enhanced configuration dengan gambar PNG yang sudah ada
  const config = {
    rendah: {
      color: "emerald",
      bgGradient: "from-emerald-50 to-green-50",
      title: "Kondisi Stress Terkendali",
      subtitle: "Anda dalam kondisi yang baik!",
      message:
        "Tingkat stress Anda berada dalam rentang normal. Kondisi mental dan fisik Anda cukup stabil untuk menjalani aktivitas sehari-hari.",
      img: StressLow,
      scoreColor: "text-emerald-600",
      bgColor: "bg-emerald-500",
      borderColor: "border-emerald-200",
      actions: [
        {
          icon: <Heart className="w-5 h-5" />,
          title: "Pertahankan Pola Hidup Sehat",
          desc: "Jaga pola tidur 7-8 jam dan konsumsi makanan bergizi seimbang",
        },
        {
          icon: <Clock className="w-5 h-5" />,
          title: "Olahraga Teratur",
          desc: "Minimal 30 menit aktivitas fisik, 3x seminggu untuk menjaga stamina",
        },
        {
          icon: <User className="w-5 h-5" />,
          title: "Jaga Hubungan Sosial",
          desc: "Pertahankan komunikasi baik dengan keluarga dan teman terdekat",
        },
      ],
    },
    sedang: {
      color: "amber",
      bgGradient: "from-amber-50 to-yellow-50",
      title: "Perlu Perhatian Khusus",
      subtitle: "Waspada dan ambil tindakan preventif",
      message:
        "Tingkat stress Anda mulai meningkat dan memerlukan perhatian. Kondisi ini masih dapat dikelola dengan perubahan pola hidup dan manajemen stress yang tepat.",
      img: StressMedium,
      scoreColor: "text-amber-600",
      bgColor: "bg-amber-500",
      borderColor: "border-amber-200",
      actions: [
        {
          icon: <Brain className="w-5 h-5" />,
          title: "Teknik Relaksasi",
          desc: "Praktikkan meditasi, deep breathing, atau mindfulness setiap hari",
        },
        {
          icon: <Briefcase className="w-5 h-5" />,
          title: "Manajemen Beban Kerja",
          desc: "Diskusikan dengan atasan untuk mengatur prioritas dan deadline kerja",
        },
        {
          icon: <Heart className="w-5 h-5" />,
          title: "Dukungan Sosial",
          desc: "Bicarakan perasaan dan kondisi Anda dengan orang terdekat",
        },
        {
          icon: <CheckCircle className="w-5 h-5" />,
          title: "Evaluasi Gaya Hidup",
          desc: "Tinjau kembali pola tidur, nutrisi, dan work-life balance",
        },
      ],
    },
    tinggi: {
      color: "red",
      bgGradient: "from-red-50 to-rose-50",
      title: "Memerlukan Bantuan Segera",
      subtitle: "Kondisi memerlukan intervensi profesional",
      message:
        "Tingkat stress Anda sudah mencapai level yang dapat membahayakan kesehatan mental dan fisik. Segera konsultasi dengan tenaga profesional untuk mendapatkan penanganan yang tepat.",
      img: StressHigh,
      scoreColor: "text-red-600",
      bgColor: "bg-red-500",
      borderColor: "border-red-200",
      actions: [
        {
          icon: <User className="w-5 h-5" />,
          title: "Konsultasi Profesional",
          desc: "Segera hubungi psikolog atau psikiater dalam 24-48 jam",
        },
        {
          icon: <Briefcase className="w-5 h-5" />,
          title: "Komunikasi dengan HR",
          desc: "Bicarakan kondisi dengan HR atau atasan untuk mendapat dukungan kerja",
        },
        {
          icon: <Clock className="w-5 h-5" />,
          title: "Pertimbangkan Cuti",
          desc: "Ambil waktu istirahat untuk pemulihan kondisi mental yang optimal",
        },
        {
          icon: <Heart className="w-5 h-5" />,
          title: "Dukungan Keluarga",
          desc: "Libatkan keluarga dan teman dekat dalam proses pemulihan",
        },
      ],
    },
  };

  const cfg = config[stress_level];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${cfg.bgGradient} p-4 md:p-6`}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Hero Section */}
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <span className="font-semibold text-gray-700">
              Assessment Completed
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Hasil Analisis Stress Kerja Anda
          </h1>
          <p className="text-gray-600 text-lg">
            Berikut adalah hasil lengkap dari 109 pertanyaan yang telah Anda
            jawab
          </p>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden">
          {/* Header dengan ilustrasi */}
          <div
            className={`bg-gradient-to-r ${cfg.bgGradient} p-8 text-center relative`}
          >
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
            <div className="relative z-10 space-y-6">
              {/* Gambar Ilustrasi PNG */}
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-white rounded-3xl shadow-lg p-4 flex items-center justify-center">
                  <img
                    src={cfg.img}
                    alt={`Stress level ${stress_level}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div>
                <h2
                  className={`text-2xl md:text-3xl font-bold ${cfg.scoreColor} mb-2`}
                >
                  {cfg.title}
                </h2>
                <p className="text-gray-600 font-medium text-lg">
                  {cfg.subtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {/* Score Visualization */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${cfg.scoreColor}`}>
                    {score_total}
                  </div>
                  <div className="text-sm text-gray-500">dari {maxScore}</div>
                </div>
                <div className="w-px h-12 bg-gray-200 hidden sm:block"></div>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${cfg.scoreColor}`}>
                    {percentage}%
                  </div>
                  <div className="text-sm text-gray-500">Total Skor</div>
                </div>
                <div className="w-px h-12 bg-gray-200 hidden sm:block"></div>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${cfg.scoreColor}`}>
                    {problematic_category}
                  </div>
                  <div className="text-sm text-gray-500">
                    Kategori Bermasalah
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                <div
                  className={`h-4 rounded-full ${cfg.bgColor} shadow-sm transition-all duration-1000 ease-out`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto text-lg">
                {cfg.message}
              </p>
            </div>

            {/* Action Plan */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 text-center">
                Rencana Tindak Lanjut untuk Anda
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {cfg.actions.map((action, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-all duration-200 border border-gray-100"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-full bg-${cfg.color}-100 flex items-center justify-center flex-shrink-0`}
                      >
                        <div className={`text-${cfg.color}-600`}>
                          {action.icon}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-800">
                          {action.title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {action.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact (for high stress) */}
            {stress_level === "tinggi" && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  <h4 className="font-bold text-red-800">Kontak Darurat</h4>
                </div>
                <p className="text-red-700 text-sm">
                  Jika Anda merasa dalam kondisi darurat atau memiliki pikiran
                  untuk menyakiti diri sendiri, segera hubungi layanan bantuan
                  profesional di bawah ini:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-red-200 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          Hotline Crisis 24/7
                        </p>
                        <p className="text-sm text-red-600 font-mono">
                          119 ext. 8
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-white rounded-xl p-4 border border-red-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() =>
                      window.open("https://www.halodoc.com", "_blank")
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Globe className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          Konsultasi Online
                        </p>
                        <p className="text-sm text-blue-600">halodoc.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Personal Info Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Ringkasan Assessment
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <User className="w-6 h-6 text-gray-500 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-1">Nama Lengkap</p>
              <p className="font-semibold text-gray-800">{name}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Calendar className="w-6 h-6 text-gray-500 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-1">Usia</p>
              <p className="font-semibold text-gray-800">{age} tahun</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Briefcase className="w-6 h-6 text-gray-500 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-1">Status Kerja</p>
              <p className="font-semibold text-gray-800">{status}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <CheckCircle className="w-6 h-6 text-gray-500 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-1">Completion</p>
              <p className="font-semibold text-gray-800">109/109</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center pt-6">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/form");
            }}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <User className="w-4 h-4" />
            Kembali ke Data Diri
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/form");
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            Isi Assessment Lagi
          </button>
        </div>

        {/* Footer Note */}
        <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-200">
          <p>
            Hasil assessment ini bersifat indikatif dan tidak menggantikan
            diagnosis profesional. Untuk evaluasi lengkap, disarankan konsultasi
            dengan tenaga kesehatan mental.
          </p>
        </div>
      </div>
    </div>
  );
}
