// src/pages/Questionnaire.tsx
import { useState } from "react";
import { categories } from "../data/categories";
import { questions } from "../data/questions";
import { calculateScores } from "../utils/Scoring";

export default function Questionnaire() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setError(null); // clear error kalau user mulai jawab
  };

  const progress = Math.round(
    (Object.keys(answers).length / questions.length) * 100
  );

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      setError("Harap isi semua pertanyaan sebelum mengirim survey.");
      return;
    }

    // hitung skor dulu
    const scores = calculateScores(answers);
    console.log("Skor per kategori:", scores);

    // sementara redirect ke results
    window.location.href = "/results";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            Kuesioner Stres Kerja
          </h1>
          <p className="text-sm text-gray-600">Progress: {progress}%</p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Group pertanyaan per kategori */}
        {Object.entries(categories).map(([cat, data]) => (
          <div key={cat} className="space-y-6">
            {questions.some((q) => q.category === cat) && (
              <div className="p-4 bg-gray-100 rounded-lg border">
                <p className="text-sm text-gray-700 italic">
                  {data.instruction}
                </p>
              </div>
            )}

            {questions
              .filter((q) => q.category === cat)
              .map((q) => (
                <div
                  key={q.id}
                  className="p-5 bg-white rounded-xl shadow border space-y-4"
                >
                  <p className="font-medium text-gray-800">
                    {q.id}. {q.text}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {data.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(q.id, opt)}
                        className={`px-4 py-2 rounded-lg border text-sm ${
                          answers[q.id] === opt
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ))}

        {/* Error message kalau belum lengkap */}
        {error && (
          <div className="text-center">
            <p className="text-red-600 text-sm font-medium bg-red-100 px-4 py-2 rounded-lg inline-block">
              {error}
            </p>
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Selesai & Lihat Hasil
          </button>
        </div>
      </div>
    </div>
  );
}
