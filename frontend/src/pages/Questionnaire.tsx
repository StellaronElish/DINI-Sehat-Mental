// // src/pages/Questionnaire.tsx
// import { useState } from "react";
// import { categories } from "../data/categories";
// import { questions } from "../data/questions";
// import { calculateScores } from "../utils/Scoring";
// import axios from "axios";

// export default function Questionnaire() {
//   const [answers, setAnswers] = useState<Record<number, string>>(() => {
//     const saved = localStorage.getItem("survey_answers");
//     return saved ? JSON.parse(saved) : {};
//   });
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
//     const saved = localStorage.getItem("survey_index");
//     return saved ? parseInt(saved, 10) : 0;
//   });
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [showResult, setShowResult] = useState(false);

//   const currentQuestion = questions[currentQuestionIndex];
//   const category = categories[currentQuestion?.category];
//   const progress = Math.round(
//     ((currentQuestionIndex + 1) / questions.length) * 100
//   );

//   // Get category order and details
//   const categoryOrder = Object.keys(categories);
//   const currentCategoryIndex =
//     categoryOrder.indexOf(currentQuestion?.category) + 1;
//   const totalCategories = categoryOrder.length;

//   // Check if we need to show category instruction
//   const isFirstQuestionInCategory =
//     currentQuestionIndex === 0 ||
//     questions[currentQuestionIndex - 1]?.category !== currentQuestion?.category;

//   const handleAnswer = (value: string) => {
//     const newAnswers = { ...answers, [currentQuestion.id]: value };
//     setAnswers(newAnswers);
//     localStorage.setItem("survey_answers", JSON.stringify(newAnswers));

//     // Auto advance ...
//     setTimeout(() => {
//       if (currentQuestionIndex < questions.length - 1) {
//         setIsTransitioning(true);
//         setTimeout(() => {
//           const nextIndex = currentQuestionIndex + 1;
//           setCurrentQuestionIndex(nextIndex);
//           localStorage.setItem("survey_index", nextIndex.toString()); // simpan posisi
//           setIsTransitioning(false);
//         }, 300);
//       } else {
//         setShowResult(true);
//       }
//     }, 600);
// };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setIsTransitioning(true);
//       setTimeout(() => {
//         const prevIndex = currentQuestionIndex - 1;
//         setCurrentQuestionIndex(prevIndex);
//         localStorage.setItem("survey_index", prevIndex.toString());
//         setIsTransitioning(false);
//       }, 300);
//     }
//   };

//   const handleSubmit = async () => {
//   const scores = calculateScores(answers);
//   const respondent = JSON.parse(localStorage.getItem("respondent") || "{}");

//   // Mapping perCategory ke format backend
//   const categoryScores: Record<string, number> = {};
//   Object.entries(scores.perCategory).forEach(([cat, value]) => {
//     categoryScores[`score_${cat}`] = value;
//   });

//   // Tentukan level stres berdasarkan jumlah kategori bermasalah
//   const countProblems = scores.problematicCategories.length;
//   let stress_level = "rendah";
//   if (countProblems >= 7) stress_level = "tinggi";
//   else if (countProblems >= 4) stress_level = "sedang";
//   else if (countProblems >= 1) stress_level = "rendah";

//   const payload = {
//     ...respondent,
//     ...categoryScores,
//     problematic_category: countProblems,
//     score_total: scores.total,
//     stress_level,
//   };

//   try {
//     const res = await axios.post("http://localhost:8000/api/respondent", payload, {
//       headers: { "Content-Type": "application/json" },
//     });

//     if (res.status === 201) {
//       console.log("Data berhasil disimpan:", res.data);
//       localStorage.setItem("respondent_id", res.data.respondent.id);
//       localStorage.removeItem("respondent");
//       localStorage.removeItem("survey_answers");
//       localStorage.removeItem("survey_index");
//       window.location.href = "/results";
//     } else {
//       console.error("Gagal menyimpan data:", res);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

//   if (showResult) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
//         <div className="w-full max-w-md mx-auto text-center space-y-6 sm:space-y-8 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100">
//           <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
//             <svg
//               className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//           </div>

//           <div className="space-y-3">
//             <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
//               Terima kasih!
//             </h2>
//             <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
//               Anda telah menyelesaikan semua{" "}
//               <span className="font-semibold text-gray-900">
//                 {questions.length}
//               </span>{" "}
//               pertanyaan dengan baik.
//             </p>
//           </div>

//           <button
//             onClick={handleSubmit}
//             className="w-full bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-sm sm:text-base"
//           >
//             Lihat Hasil Analisis
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 flex-shrink-0">
//         <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
//           <div className="text-center space-y-4">
//             <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
//               Kuesioner Stres Kerja
//             </h1>

//             {/* Progress info */}
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm text-gray-600">
//               <span>
//                 Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
//               </span>
//               <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
//               <span>{progress}% selesai</span>
//             </div>

//             {/* Progress bar */}
//             <div className="w-full max-w-sm sm:max-w-md mx-auto">
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className="bg-blue-500 h-2 rounded-full transition-all duration-500"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1">
//           {/* Category instruction */}
//           {isFirstQuestionInCategory && (
//             <div
//               className={`mb-8 sm:mb-12 transition-all duration-300 ${
//                 isTransitioning
//                   ? "opacity-0 transform translate-y-4"
//                   : "opacity-100 transform translate-y-0"
//               }`}
//             >
//               <div className="bg-blue-50 border border-blue-100 rounded-xl sm:rounded-2xl p-4 sm:p-6">
//                 <div className="flex items-start sm:items-center gap-3 mb-3">
//                   <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <svg
//                       className="w-3 h-3 text-white"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                   <span className="font-semibold text-blue-900 text-sm sm:text-base">
//                     Instruksi
//                   </span>
//                 </div>
//                 <p className="text-blue-800 leading-relaxed text-sm sm:text-base">
//                   {category?.instruction}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Question */}
//           <div
//             className={`transition-all duration-300 ${
//               isTransitioning
//                 ? "opacity-0 transform translate-x-8"
//                 : "opacity-100 transform translate-x-0"
//             }`}
//           >
//             {/* Question header */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-900 text-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
//                   <span className="font-bold text-lg sm:text-xl">
//                     {currentQuestion?.id}
//                   </span>
//                 </div>
//                 <div className="space-y-1 min-w-0">
//                   <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
//                     Kategori
//                   </div>
//                   <div className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium truncate">
//                     {currentQuestion?.category}
//                   </div>
//                 </div>
//               </div>

//               {/* Category progress indicator - hidden on mobile */}
//               <div className="hidden lg:block text-right flex-shrink-0">
//                 <div className="text-xs text-gray-500 mb-2">
//                   Progress Kategori
//                 </div>
//                 <div className="flex items-center justify-end gap-1">
//                   {questions
//                     .filter((q) => q.category === currentQuestion?.category)
//                     .map((q, idx) => {
//                       const isAnswered = answers[q.id];
//                       const isCurrent = q.id === currentQuestion?.id;
//                       return (
//                         <div
//                           key={q.id}
//                           className={`w-3 h-3 rounded-full transition-all ${
//                             isCurrent
//                               ? "bg-blue-500 ring-2 ring-blue-200"
//                               : isAnswered
//                               ? "bg-emerald-400"
//                               : "bg-gray-300"
//                           }`}
//                         />
//                       );
//                     })}
//                 </div>
//               </div>
//             </div>

//             {/* Question text */}
//             <div className="mb-8 sm:mb-12">
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-relaxed">
//                 {currentQuestion?.text}
//               </h2>
//             </div>

//             {/* Answer options */}
//             <div className="space-y-3 sm:space-y-4">
//               {category?.options.map((option, index) => (
//                 <button
//                   key={option}
//                   onClick={() => handleAnswer(option)}
//                   className={`w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 text-left transition-all duration-200 group ${
//                     answers[currentQuestion?.id] === option
//                       ? "bg-blue-50 border-blue-500 text-blue-900"
//                       : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-900"
//                   }`}
//                   style={{
//                     animationDelay: `${index * 50}ms`,
//                   }}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="font-medium text-base sm:text-lg pr-4">
//                       {option}
//                     </span>
//                     <div
//                       className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
//                         answers[currentQuestion?.id] === option
//                           ? "border-blue-500 bg-blue-500"
//                           : "border-gray-300 group-hover:border-gray-400"
//                       }`}
//                     >
//                       {answers[currentQuestion?.id] === option && (
//                         <svg
//                           className="w-3 h-3 text-white"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       )}
//                     </div>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Navigation */}
//       <div className="border-t border-gray-200 bg-white flex-shrink-0">
//         <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
//           <div className="flex items-center justify-between gap-4">
//             {/* Previous button */}
//             <button
//               onClick={handlePrevious}
//               disabled={currentQuestionIndex === 0}
//               className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all text-sm sm:text-base ${
//                 currentQuestionIndex === 0
//                   ? "text-gray-400 cursor-not-allowed"
//                   : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//               }`}
//             >
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//               <span className="hidden sm:inline">Kembali</span>
//             </button>

//             {/* Clean progress bar - Fixed width to prevent overflow */}
//             <div className="flex items-center justify-center flex-shrink-0">
//               <div className="bg-gray-100 rounded-full p-1">
//                 <div className="flex items-center gap-1">
//                   {/* Show max 4 segments on mobile, 6 on desktop */}
//                   {[
//                     ...Array(
//                       window.innerWidth < 640
//                         ? Math.min(
//                             4,
//                             Math.ceil(
//                               questions.length / Math.ceil(questions.length / 4)
//                             )
//                           )
//                         : Math.min(6, Math.ceil(questions.length / 5))
//                     ),
//                   ].map((_, index) => {
//                     const maxSegments = window.innerWidth < 640 ? 4 : 6;
//                     const questionsPerSegment = Math.ceil(
//                       questions.length / maxSegments
//                     );
//                     const startIndex = index * questionsPerSegment;
//                     const endIndex = Math.min(
//                       startIndex + questionsPerSegment,
//                       questions.length
//                     );
//                     const segmentAnswered = questions
//                       .slice(startIndex, endIndex)
//                       .filter((q) => answers[q.id]).length;
//                     const segmentTotal = endIndex - startIndex;
//                     const isCurrent =
//                       currentQuestionIndex >= startIndex &&
//                       currentQuestionIndex < endIndex;

//                     return (
//                       <div
//                         key={index}
//                         className={`w-4 sm:w-6 h-2 rounded-full transition-all duration-300 ${
//                           isCurrent
//                             ? "bg-blue-500"
//                             : segmentAnswered === segmentTotal
//                             ? "bg-emerald-400"
//                             : segmentAnswered > 0
//                             ? "bg-yellow-400"
//                             : "bg-gray-300"
//                         }`}
//                       />
//                     );
//                   })}
//                 </div>
//               </div>

//               <div className="ml-2 sm:ml-4 text-xs text-gray-600 whitespace-nowrap">
//                 <span className="font-medium">
//                   {Object.keys(answers).length}
//                 </span>
//                 <span className="hidden sm:inline"> dari</span>
//                 <span className="sm:hidden">/</span> {questions.length}
//               </div>
//             </div>

//             {/* Status indicator */}
//             <div className="flex items-center gap-2 sm:gap-4">
//               {answers[currentQuestion?.id] && (
//                 <div className="inline-flex items-center gap-1 sm:gap-2 text-emerald-600 text-xs sm:text-sm font-medium bg-emerald-50 px-2 sm:px-3 py-1 rounded-full">
//                   <svg
//                     className="w-3 h-3 sm:w-4 sm:h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M5 13l4 4L19 7"
//                     />
//                   </svg>
//                   <span className="hidden sm:inline">Terjawab</span>
//                   <span className="sm:hidden">✓</span>
//                 </div>
//               )}

//               {/* Next auto indicator - hidden on mobile when answered */}
//               {answers[currentQuestion?.id] &&
//                 currentQuestionIndex < questions.length - 1 && (
//                   <div className="hidden sm:inline-flex items-center gap-2 text-gray-500 text-xs">
//                     <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
//                     <span>Otomatis lanjut...</span>
//                   </div>
//                 )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/Questionnaire.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/categories";
import { questions } from "../data/questions";
import { calculateScores } from "../utils/Scoring";
import axios from "axios";

export default function Questionnaire() {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    const saved = localStorage.getItem("survey_answers");
    return saved ? JSON.parse(saved) : {};
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const saved = localStorage.getItem("survey_index");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const category = categories[currentQuestion?.category];
  const progress = Math.round(
    ((currentQuestionIndex + 1) / questions.length) * 100
  );

  // Get category order and details
  const categoryOrder = Object.keys(categories);
  const currentCategoryIndex =
    categoryOrder.indexOf(currentQuestion?.category) + 1;
  const totalCategories = categoryOrder.length;

  // Check if we need to show category instruction
  const isFirstQuestionInCategory =
    currentQuestionIndex === 0 ||
    questions[currentQuestionIndex - 1]?.category !== currentQuestion?.category;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    localStorage.setItem("survey_answers", JSON.stringify(newAnswers));

    // Auto advance ...
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setIsTransitioning(true);
        setTimeout(() => {
          const nextIndex = currentQuestionIndex + 1;
          setCurrentQuestionIndex(nextIndex);
          localStorage.setItem("survey_index", nextIndex.toString());
          setIsTransitioning(false);
        }, 300);
      } else {
        setShowResult(true);
      }
    }, 600);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        const prevIndex = currentQuestionIndex - 1;
        setCurrentQuestionIndex(prevIndex);
        localStorage.setItem("survey_index", prevIndex.toString());
        setIsTransitioning(false);
      }, 300);
    }
  };

  // Update bagian handleSubmit di Questionnaire.tsx
  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const scores = calculateScores(answers);
      const respondent = JSON.parse(localStorage.getItem("respondent") || "{}");

      console.log("Hasil calculateScores:", scores);

      // === VALIDASI HASIL ===
      const answeredQuestions = Object.keys(answers).length;
      const totalQuestions = questions.length;

      if (answeredQuestions < totalQuestions) {
        console.warn(
          `Hanya ${answeredQuestions}/${totalQuestions} pertanyaan terjawab`
        );
      }

      // Cek distribusi jawaban untuk debugging
      const answerDistribution: Record<string, number> = {};
      Object.values(answers).forEach((answer) => {
        answerDistribution[answer] = (answerDistribution[answer] || 0) + 1;
      });
      console.log("Distribusi jawaban:", answerDistribution);

      // Validasi khusus untuk jawaban mayoritas di tengah
      const middleAnswers = [
        "Cukup Setuju",
        "Kurang Setuju",
        "Kadang-kadang",
        "Sering",
        "Cukup benar",
        "Kurang benar",
        "Setuju",
        "Tidak setuju",
        "Cukup",
        "Sedikit",
      ];

      const middleCount = Object.entries(answerDistribution)
        .filter(([answer]) => middleAnswers.some((ma) => answer.includes(ma)))
        .reduce((sum, [, count]) => sum + count, 0);

      const middlePercentage = (middleCount / answeredQuestions) * 100;
      console.log(
        `Jawaban tengah: ${middleCount}/${answeredQuestions} (${middlePercentage.toFixed(
          1
        )}%)`
      );

      // Override jika anomali terdeteksi
      if (middlePercentage > 70 && scores.stressLevel === "tinggi") {
        console.warn(
          "ANOMALI TERDETEKSI: Override ke sedang karena mayoritas jawaban tengah"
        );
        scores.stressLevel = "sedang";
      }

      // PAYLOAD untuk backend
      const payload = {
        name: respondent.name,
        age: respondent.age,
        status: respondent.status,

        problematic_category: scores.totalBinaryFlags,
        score_total: scores.totalBinaryFlags,
        stress_level: scores.stressLevel,
        wfc_index: scores.wfcIndex,
        stress_index: scores.stressIndex,

        score_category: JSON.stringify(scores.perCategory),
        score_details: JSON.stringify(scores.perQuestion),
      };

      console.log("Payload yang akan dikirim:", payload);
      console.log("Stress Level final:", scores.stressLevel);

      const res = await axios.post(
        "http://localhost:8000/api/respondent",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 201) {
        console.log("Data berhasil disimpan:", res.data);

        const respondentId = res.data.id;

        if (respondentId) {
          localStorage.setItem("respondent_id", respondentId.toString());
          console.log("Respondent ID berhasil disimpan:", respondentId);

          // Navigate ke results
          navigate("/results");
        } else {
          throw new Error("Respondent ID tidak ditemukan");
        }
      }
    } catch (error: any) {
      console.error("Error:", error);

      let errorMessage = "Terjadi kesalahan saat menyimpan data.";
      if (error.response?.status === 500) {
        errorMessage = "Kesalahan server. Silakan coba lagi nanti.";
      } else if (error.response?.status === 422) {
        console.log("Validation errors:", error.response.data);
        errorMessage =
          "Data tidak valid. Pastikan semua pertanyaan sudah dijawab.";
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md mx-auto text-center space-y-6 sm:space-y-8 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Terima kasih!
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Anda telah menyelesaikan semua{" "}
              <span className="font-semibold text-gray-900">
                {questions.length}
              </span>{" "}
              pertanyaan dengan baik.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-sm sm:text-base flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Menyimpan...
              </>
            ) : (
              "Lihat Hasil Analisis"
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="text-center space-y-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Kuesioner Stres Kerja
            </h1>

            {/* Progress info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm text-gray-600">
              <span>
                Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
              </span>
              <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>{progress}% selesai</span>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-sm sm:max-w-md mx-auto">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1">
          {/* Category instruction */}
          {isFirstQuestionInCategory && (
            <div
              className={`mb-8 sm:mb-12 transition-all duration-300 ${
                isTransitioning
                  ? "opacity-0 transform translate-y-4"
                  : "opacity-100 transform translate-y-0"
              }`}
            >
              <div className="bg-blue-50 border border-blue-100 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-start sm:items-center gap-3 mb-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold text-blue-900 text-sm sm:text-base">
                    Instruksi
                  </span>
                </div>
                <p className="text-blue-800 leading-relaxed text-sm sm:text-base">
                  {category?.instruction}
                </p>
              </div>
            </div>
          )}

          {/* Question */}
          <div
            className={`transition-all duration-300 ${
              isTransitioning
                ? "opacity-0 transform translate-x-8"
                : "opacity-100 transform translate-x-0"
            }`}
          >
            {/* Question header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-900 text-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <span className="font-bold text-lg sm:text-xl">
                    {currentQuestion?.id}
                  </span>
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                    Kategori
                  </div>
                  <div className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium truncate">
                    {currentQuestion?.category}
                  </div>
                </div>
              </div>

              {/* Category progress indicator - hidden on mobile */}
              <div className="hidden lg:block text-right flex-shrink-0">
                <div className="text-xs text-gray-500 mb-2">
                  Progress Kategori
                </div>
                <div className="flex items-center justify-end gap-1">
                  {questions
                    .filter((q) => q.category === currentQuestion?.category)
                    .map((q, idx) => {
                      const isAnswered = answers[q.id];
                      const isCurrent = q.id === currentQuestion?.id;
                      return (
                        <div
                          key={q.id}
                          className={`w-3 h-3 rounded-full transition-all ${
                            isCurrent
                              ? "bg-blue-500 ring-2 ring-blue-200"
                              : isAnswered
                              ? "bg-emerald-400"
                              : "bg-gray-300"
                          }`}
                        />
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Question text */}
            <div className="mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-relaxed">
                {currentQuestion?.text}
              </h2>
            </div>

            {/* Answer options */}
            <div className="space-y-3 sm:space-y-4">
              {category?.options.map((option, index) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 text-left transition-all duration-200 group ${
                    answers[currentQuestion?.id] === option
                      ? "bg-blue-50 border-blue-500 text-blue-900"
                      : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-900"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-base sm:text-lg pr-4">
                      {option}
                    </span>
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                        answers[currentQuestion?.id] === option
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300 group-hover:border-gray-400"
                      }`}
                    >
                      {answers[currentQuestion?.id] === option && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-gray-200 bg-white flex-shrink-0">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            {/* Previous button */}
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all text-sm sm:text-base ${
                currentQuestionIndex === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="hidden sm:inline">Kembali</span>
            </button>

            {/* Clean progress bar - Fixed width to prevent overflow */}
            <div className="flex items-center justify-center flex-shrink-0">
              <div className="bg-gray-100 rounded-full p-1">
                <div className="flex items-center gap-1">
                  {/* Show max 4 segments on mobile, 6 on desktop */}
                  {[
                    ...Array(
                      window.innerWidth < 640
                        ? Math.min(
                            4,
                            Math.ceil(
                              questions.length / Math.ceil(questions.length / 4)
                            )
                          )
                        : Math.min(6, Math.ceil(questions.length / 5))
                    ),
                  ].map((_, index) => {
                    const maxSegments = window.innerWidth < 640 ? 4 : 6;
                    const questionsPerSegment = Math.ceil(
                      questions.length / maxSegments
                    );
                    const startIndex = index * questionsPerSegment;
                    const endIndex = Math.min(
                      startIndex + questionsPerSegment,
                      questions.length
                    );
                    const segmentAnswered = questions
                      .slice(startIndex, endIndex)
                      .filter((q) => answers[q.id]).length;
                    const segmentTotal = endIndex - startIndex;
                    const isCurrent =
                      currentQuestionIndex >= startIndex &&
                      currentQuestionIndex < endIndex;

                    return (
                      <div
                        key={index}
                        className={`w-4 sm:w-6 h-2 rounded-full transition-all duration-300 ${
                          isCurrent
                            ? "bg-blue-500"
                            : segmentAnswered === segmentTotal
                            ? "bg-emerald-400"
                            : segmentAnswered > 0
                            ? "bg-yellow-400"
                            : "bg-gray-300"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="ml-2 sm:ml-4 text-xs text-gray-600 whitespace-nowrap">
                <span className="font-medium">
                  {Object.keys(answers).length}
                </span>
                <span className="hidden sm:inline"> dari</span>
                <span className="sm:hidden">/</span> {questions.length}
              </div>
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-2 sm:gap-4">
              {answers[currentQuestion?.id] && (
                <div className="inline-flex items-center gap-1 sm:gap-2 text-emerald-600 text-xs sm:text-sm font-medium bg-emerald-50 px-2 sm:px-3 py-1 rounded-full">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="hidden sm:inline">Terjawab</span>
                  <span className="sm:hidden">✓</span>
                </div>
              )}

              {/* Next auto indicator - hidden on mobile when answered */}
              {answers[currentQuestion?.id] &&
                currentQuestionIndex < questions.length - 1 && (
                  <div className="hidden sm:inline-flex items-center gap-2 text-gray-500 text-xs">
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
                    <span>Otomatis lanjut...</span>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
