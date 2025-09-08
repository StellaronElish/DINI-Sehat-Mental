// // src/utils/Scoring.ts
// import { categories } from "../data/categories";
// import { questions } from "../data/questions";

// //  Konversi jawaban (string) ke skor numerik mentah
// export function mapAnswerToScore(category: string, answer: string): number {
//   const opts = categories[category]?.options || [];
//   const idx = opts.indexOf(answer);
//   return idx >= 0 ? idx + 1 : 0; // jawaban pertama = 1, dst
// }

// //  Helper function untuk bikin formula otomatis
// function makeFormulaSubtract(max: number, divisor: number) {
//   return (scores: number[]) => {
//     const value = (max - scores.reduce((a, b) => a + b, 0)) / divisor;
//     return value < 2.25 ? 1 : 0;
//   };
// }

// function makeFormulaReverse() {
//   return (scores: number[]) => {
//     const value = 5 - scores[0]; // hanya 1 item
//     return value < 2.25 ? 1 : 0;
//   };
// }

// //  Helper: direct scoring (pakai X apa adanya, lalu cutoff 2.25)
// function makeFormulaDirect() {
//   return (scores: number[]) => {
//     const value = scores[0];
//     return value < 2.25 ? 1 : 0;
//   };
// }

// //  Helper: kategorisasi skala 1–5 (Q64–Q81)
// function calculateRange64to81(scores: number[]) {
//   const total = scores.reduce((a, b) => a + b, 0);

//   if (total > 46.25) return 5;      // sangat tinggi
//   if (total > 39.75) return 4;      // tinggi
//   if (total > 33.25) return 3;      // sedang
//   if (total > 26.75) return 2;      // rendah
//   return 1;                         // sangat rendah
// }

// //  Helper: klasifikasi Q82–Q109
// function classifyStressLevel(scores: number[]) {
//   const X = scores.reduce((a, b) => a + b, 0); // jumlah skor individu
//   const µ = mean(scores);
//   const SD = stdDev(scores);

//   if (X > µ + 1.5 * SD) return 4;                         // sangat tinggi
//   if (X > µ + 0.5 * SD && X <= µ + 1.5 * SD) return 3;    // tinggi
//   if (X > µ - 0.5 * SD && X <= µ + 0.5 * SD) return 2;    // sedang
//   if (X > µ - 1.5 * SD && X <= µ - 0.5 * SD) return 1;    // rendah
//   return 0;                                               // sangat rendah
// }

// //  Helper: hitung mean dan standar deviasi
// function mean(arr: number[]) {
//   return arr.reduce((a, b) => a + b, 0) / arr.length;
// }

// function stdDev(arr: number[]) {
//   const m = mean(arr);
//   const variance = arr.reduce((sum, x) => sum + Math.pow(x - m, 2), 0) / arr.length;
//   return Math.sqrt(variance);
// }

// //  Formula per pertanyaan (independen)
// const formulas: Record<number, (scores: number[]) => number> = {

//   // Q1: (∑X)/2 → cek cut-off 2.25
//   1: (scores) => {
//     const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
//     return mean < 2.25 ? 1 : 0;
//   },

//   // Q2: (∑X)/2 → cek cut-off 2.25
//   2: (scores) => {
//     const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
//     return mean < 2.25 ? 1 : 0;
//   },

//   // Q3-Q4: (10 - ∑X)/2 → cut-off 2.25
//   3: makeFormulaSubtract(10, 2),
//   4: makeFormulaSubtract(10, 2),
  
//   // Q5 tidak dihitung sendiri → nanti digabung dengan Q6 & Q7

//   // Q8-Q9: reverse scoring (5 - X), lalu cek cutoff
//   8: makeFormulaReverse(),
//   9: makeFormulaReverse(),

//   // Q10 - Q12: (∑X)/3 → cutoff 2.25
//   10: (scores) => {
//     const mean = scores.reduce((a, b) => a + b, 0) / 3;
//     return mean < 2.25 ? 1 : 0;
//   },

//   11: (scores) => {
//     const mean = scores.reduce((a, b) => a + b, 0) / 3;
//     return mean < 2.25 ? 1 : 0;
//   },
//   12: (scores) => {
//     const mean = scores.reduce((a, b) => a + b, 0) / 3;
//     return mean < 2.25 ? 1 : 0;
//   },

//   // Q13–Q21: (15 - ∑X)/3
//   13: makeFormulaSubtract(15, 3),
//   14: makeFormulaSubtract(15, 3),
//   15: makeFormulaSubtract(15, 3),
//   16: makeFormulaSubtract(15, 3),
//   17: makeFormulaSubtract(15, 3),
//   18: makeFormulaSubtract(15, 3),
//   19: makeFormulaSubtract(15, 3),
//   20: makeFormulaSubtract(15, 3),
//   21: makeFormulaSubtract(15, 3),

//   // Q22–Q27: (30 - ∑X)/6
//   22: makeFormulaSubtract(30, 6),
//   23: makeFormulaSubtract(30, 6),
//   24: makeFormulaSubtract(30, 6),
//   25: makeFormulaSubtract(30, 6),
//   26: makeFormulaSubtract(30, 6),
//   27: makeFormulaSubtract(30, 6),

//   // Q28–Q38: (55 - ∑X)/11
//   28: makeFormulaSubtract(55, 11),
//   29: makeFormulaSubtract(55, 11),
//   30: makeFormulaSubtract(55, 11),
//   31: makeFormulaSubtract(55, 11),
//   32: makeFormulaSubtract(55, 11),
//   33: makeFormulaSubtract(55, 11),
//   34: makeFormulaSubtract(55, 11),
//   35: makeFormulaSubtract(55, 11),
//   36: makeFormulaSubtract(55, 11),
//   37: makeFormulaSubtract(55, 11),
//   38: makeFormulaSubtract(55, 11),

//   // Q39–Q40: (10 - ∑X)/2
//   39: makeFormulaSubtract(10, 2),
//   40: makeFormulaSubtract(10, 2),

//   // Q41–Q42: (5 - X)
//   41: makeFormulaReverse(), // dukungan atasan
//   42: makeFormulaReverse(), // kepuasan kerja

//   // Q43–Q44: Sesuai Skor
//   43: makeFormulaDirect(),
//   44: makeFormulaDirect(),

//   // Q45–Q59: (5 - X)
//   45: makeFormulaReverse(),
//   46: makeFormulaReverse(),
//   47: makeFormulaReverse(),
//   48: makeFormulaReverse(),
//   49: makeFormulaReverse(),
//   50: makeFormulaReverse(),
//   51: makeFormulaReverse(),
//   52: makeFormulaReverse(),
//   53: makeFormulaReverse(),
//   54: makeFormulaReverse(),
//   55: makeFormulaReverse(),
//   56: makeFormulaReverse(),
//   57: makeFormulaReverse(),
//   58: makeFormulaReverse(),
//   59: makeFormulaReverse(),
  
//   // Q60: Sesuai Skor
//   60: makeFormulaDirect(),

//   // Q61: (5 - X)
//   61: makeFormulaReverse(),

//   // Q62-Q63: (10 - ∑X)/2
//   62: makeFormulaSubtract(10, 2),
//   63: makeFormulaSubtract(10, 2),

//   // Q64-Q81 dihitung setelah loop selesai

//   // Q82-Q109 dihitung setelah loop selesai

// };

// //  Hitung skor per pertanyaan, kategori, dan total
// export function calculateScores(answers: Record<number, string>) {
//   const perQuestion: Record<number, number> = {};
//   const perCategory: Record<string, number> = {};
//   let problematicCategories: string[] = [];
//   let total = 0;

//   // simpan jawaban mentah Q5–Q7
//   const q5to7: number[] = [];
//   const q64to81: number[] = [];
//   const q82to109: number[] = [];

//   questions.forEach((q) => {
//     const ans = answers[q.id];
//     if (!ans) return;

//     // konversi jawaban ke angka
//     const score = mapAnswerToScore(q.category, ans);
//     if (score === 0) return;

//     // Kalau Q5–Q7 → simpan dulu
//     if ([5, 6, 7].includes(q.id)) {
//       q5to7.push(score);
//       return;
//     }

//     // Kalau Q64–Q81 → simpan dulu
//     if (q.id >= 64 && q.id <= 81) {
//       q64to81.push(score);
//       return;
//     }

//     // Kalau Q82–Q109 → simpan dulu
//     if (q.id >= 82 && q.id <= 109) {
//       q82to109.push(score);
//       return;
//     }

//     // terapkan formula kalau ada
//     const formula = formulas[q.id];
//     const finalScore = formula ? formula([score]) : score;

//     // simpan hasil
//     perQuestion[q.id] = finalScore;
//     perCategory[q.category] = (perCategory[q.category] || 0) + finalScore;
//     total += finalScore;
//   });

//   // cek kategori bermasalah berdasarkan cutoff
//   Object.entries(perCategory).forEach(([cat, val]) => {
//     const cutoff = 2.25; // default
//     if (val < cutoff) {
//       problematicCategories.push(cat);
//     }
//   });

//   //  Setelah loop → hitung Q5–Q7 gabungan
//   if (q5to7.length === 3) {
//     const [x1, x2, x3] = q5to7;
//     const value = (x1 + x2 + (5 - x3)) / 3;
//     const final57 = value < 2.25 ? 1 : 0;

//     perQuestion["5-7" as any] = final57; // simpan dengan key gabungan
//     perCategory["I"] = (perCategory["I"] || 0) + final57; // kategori sama kayak Q5
//     total += final57;
//   }

//   //  Setelah loop → hitung Q64–Q81 gabungan
//   if (q64to81.length === 18) {
//     const final6481 = calculateRange64to81(q64to81);

//     perQuestion["64-81" as any] = final6481;
//     perCategory["VIII"] = (perCategory["VIII"] || 0) + final6481; // contoh kategori "VIII", bisa disesuaikan
//     total += final6481;
//   }

//   // Setelah loop → hitung Q82–Q109 gabungan
//   if (q82to109.length === 28) {
//     const final82109 = classifyStressLevel(q82to109);

//     perQuestion["82-109" as any] = final82109;
//     perCategory["IX"] = (perCategory["IX"] || 0) + final82109; // contoh kategori IX
//     total += final82109;
//   }

//   return { perQuestion, perCategory, total, problematicCategories};
// }


// src/utils/Scoring.ts - FIXED VERSION
import { questions } from "../data/questions";
import { categories } from "../data/categories";

/**
 * Map jawaban (string) -> skor ordinal
 * Kategori IX: 1-5, kategori lainnya: 1-4
 */
function mapAnswerToScore(categoryKey: string, answer: string): number {
  const cat = categories[categoryKey];
  if (!cat) return 0;

  const idx = cat.options.findIndex((o: string) => o === answer);
  if (idx < 0) return 0;

  // Kategori IX memiliki 5 opsi (1-5)
  // Kategori lainnya memiliki 4 opsi (1-4)
  return idx + 1;
}

/** Helper reverse: 5 - X, lalu cut-off 2.25 => 1 (ada masalah) | 0 (tidak) */
const revToFlag = (x: number) => (5 - x < 2.25 ? 1 : 0);
/** Helper direct: X < 2.25 ? 1 : 0 */
const dirToFlag = (x: number) => (x < 2.25 ? 1 : 0);
/** Helper rata: (sum / n) < 2.25 ? 1 : 0 */
const meanToFlag = (vals: number[]) =>
  vals.reduce((a, b) => a + b, 0) / Math.max(vals.length, 1) < 2.25 ? 1 : 0;
/** Helper (K - sum)/n < 2.25 ? 1 : 0 */
const subToFlag = (K: number, vals: number[], n: number) =>
  (K - vals.reduce((a, b) => a + b, 0)) / n < 2.25 ? 1 : 0;

/** Klasifikasi Q64–Q81 -> 1..5 (sangat rendah..sangat tinggi) berdasarkan total X */
function classifyWFC(q64to81: number[]): 1 | 2 | 3 | 4 | 5 {
  const X = q64to81.reduce((a, b) => a + b, 0);
  const maxScore = q64to81.length * 4; // 18 pertanyaan × 4 = 72
  const percentage = (X / maxScore) * 100;

  if (percentage > 75) return 5; // sangat tinggi
  if (percentage > 60) return 4; // tinggi
  if (percentage > 40) return 3; // sedang
  if (percentage > 20) return 2; // rendah
  return 1; // sangat rendah
}

/**
 * Klasifikasi Q82–Q109 (Stres kerja, variabel dependen).
 * Menggunakan rata-rata karena skala 1-5
 */
function classifyStressLevel(scores: number[]): 0 | 1 | 2 | 3 | 4 {
  if (scores.length === 0) return 0;

  const X = scores.reduce((a, b) => a + b, 0);
  const average = X / scores.length; // Rata-rata skor (1-5)

  console.log(
    `Stress Assessment Q82-Q109: Total=${X}, Avg=${average.toFixed(2)}, Count=${
      scores.length
    }`
  );

  // Klasifikasi berdasarkan rata-rata (skala 1-5)
  // Nilai tengah = 3, jadi threshold disesuaikan
  if (average >= 4.0) return 4; // sangat tinggi
  if (average >= 3.5) return 3; // tinggi
  if (average >= 2.5) return 2; // sedang (nilai tengah-tengah)
  if (average >= 2.0) return 1; // rendah
  return 0; // sangat rendah
}

type CalcResult = {
  perQuestion: Record<string, number>;
  perCategory: Record<string, number>;
  binaryVariableKeys: string[];
  wfcIndex: 1 | 2 | 3 | 4 | 5;
  stressIndex: 0 | 1 | 2 | 3 | 4;
  totalBinaryFlags: number;
  stressLevel: "rendah" | "sedang" | "tinggi";
};

export function calculateScores(answers: Record<number, string>): CalcResult {
  console.log("=== MULAI PERHITUNGAN SCORES ===");
  console.log(`Total jawaban: ${Object.keys(answers).length}`);

  // Kumpulkan skor mentah
  const raw: Record<number, number> = {};
  for (const q of questions) {
    const a = answers[q.id];
    if (!a) continue;
    const s = mapAnswerToScore(q.category, a);
    if (s > 0) {
      raw[q.id] = s;
    }
  }

  const pick = (ids: number[]) => ids.map((id) => raw[id] ?? 0);
  const perQuestion: Record<string, number> = {};
  const perCategory: Record<string, number> = {};
  const pushCat = (idOrIds: number | number[], flag: number) => {
    const firstId = Array.isArray(idOrIds) ? idOrIds[0] : idOrIds;
    const cat = questions.find((q) => q.id === firstId)?.category ?? "UNK";
    perCategory[cat] = (perCategory[cat] ?? 0) + flag;
  };

  const binaryVariableKeys: string[] = [];

  const addVar = (key: string, ids: number[], flag: number) => {
    perQuestion[key] = flag;
    pushCat(ids, flag);
    if (flag === 1) {
      binaryVariableKeys.push(key);
    }
  };

  // === RUMUS ASLI TETAP DIPERTAHANKAN ===

  // I. Lingkungan kerja
  addVar("1-2", [1, 2], meanToFlag(pick([1, 2])));
  addVar("3-4", [3, 4], subToFlag(10, pick([3, 4]), 2));
  {
    const v = pick([5, 6]);
    v.push(5 - (raw[7] ?? 0));
    addVar("5-7", [5, 6, 7], meanToFlag(v));
  }
  addVar("8", [8], revToFlag(raw[8] ?? 0));
  addVar("9", [9], revToFlag(raw[9] ?? 0));

  // II. Kondisi kesehatan
  addVar("10-12", [10, 11, 12], meanToFlag(pick([10, 11, 12])));
  addVar("13-15", [13, 14, 15], subToFlag(15, pick([13, 14, 15]), 3));
  addVar("16-18", [16, 17, 18], subToFlag(15, pick([16, 17, 18]), 3));
  addVar("19-21", [19, 20, 21], subToFlag(15, pick([19, 20, 21]), 3));
  addVar(
    "22-27",
    [22, 23, 24, 25, 26, 27],
    subToFlag(30, pick([22, 23, 24, 25, 26, 27]), 6)
  );
  addVar(
    "28-38",
    [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
    subToFlag(55, pick([28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38]), 11)
  );

  // III. Sumber daya di sekitar
  addVar("39-40", [39, 40], subToFlag(10, pick([39, 40]), 2));
  addVar("41", [41], revToFlag(raw[41] ?? 0));

  // IV. Aspek pekerjaan rinci
  addVar("42", [42], revToFlag(raw[42] ?? 0));
  addVar("43", [43], dirToFlag(raw[43] ?? 0));
  addVar("44", [44], dirToFlag(raw[44] ?? 0));

  // V–VII. Faktor organisasi & psikologis
  [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59].forEach((id) =>
    addVar(String(id), [id], revToFlag(raw[id] ?? 0))
  );
  addVar("60", [60], dirToFlag(raw[60] ?? 0));
  addVar("61", [61], revToFlag(raw[61] ?? 0));
  addVar("62-63", [62, 63], subToFlag(10, pick([62, 63]), 2));

  // VIII. Work–Family Conflict (64–81)
  const q64to81 = pick(Array.from({ length: 18 }, (_, i) => 64 + i));
  const wfcIndex = classifyWFC(q64to81);
  perQuestion["64-81"] = wfcIndex;
  console.log(`WFC Index (Q64-81): ${wfcIndex}`);

  // IX. Stres kerja (82–109) - SKALA 1-5
  const q82to109 = pick(Array.from({ length: 28 }, (_, i) => 82 + i));
  const stressIndex = classifyStressLevel(q82to109);
  perQuestion["82-109"] = stressIndex;
  console.log(`Stress Index (Q82-109): ${stressIndex}`);

  const totalBinaryFlags = binaryVariableKeys.length;

  // === KLASIFIKASI STRESS LEVEL DENGAN LOGIKA KOMBINASI ===
  const binaryPercentage = (totalBinaryFlags / 63) * 100;

  // Weighted combination: 70% dari binary flags, 30% dari stress index
  const binaryWeight = 0.7;
  const stressWeight = 0.3;

  // Normalisasi stress index ke skala 0-100
  const stressIndexNormalized = (stressIndex / 4) * 100;

  // Hitung skor gabungan
  const combinedScore =
    binaryPercentage * binaryWeight + stressIndexNormalized * stressWeight;

  console.log(
    `Binary flags: ${totalBinaryFlags}/63 (${binaryPercentage.toFixed(1)}%)`
  );
  console.log(`Stress index normalized: ${stressIndexNormalized.toFixed(1)}%`);
  console.log(`Combined Score: ${combinedScore.toFixed(1)}%`);

  let stressLevel: "rendah" | "sedang" | "tinggi";

  // Threshold yang lebih masuk akal
  if (combinedScore >= 50) {
    stressLevel = "tinggi";
  } else if (combinedScore >= 25) {
    stressLevel = "sedang";
  } else {
    stressLevel = "rendah";
  }

  // Validasi edge cases untuk jawaban mayoritas tengah
  const avgRawScore =
    Object.values(raw).reduce((a, b) => a + b, 0) / Object.values(raw).length;
  console.log(`Average raw score all questions: ${avgRawScore.toFixed(2)}`);

  // Jika rata-rata skor mentah di sekitar nilai tengah (2.3-2.7 untuk skala 1-4, atau 2.8-3.2 untuk campuran)
  if (avgRawScore >= 2.3 && avgRawScore <= 3.2) {
    if (stressLevel === "tinggi" && combinedScore < 55) {
      console.log("Koreksi: Jawaban mayoritas tengah, adjust ke sedang");
      stressLevel = "sedang";
    }
    if (stressLevel === "rendah" && combinedScore > 20) {
      console.log("Koreksi: Jawaban mayoritas tengah, adjust ke sedang");
      stressLevel = "sedang";
    }
  }

  console.log("=== HASIL AKHIR ===");
  console.log(`Total Binary Flags: ${totalBinaryFlags}/63`);
  console.log(`WFC Index: ${wfcIndex}, Stress Index: ${stressIndex}`);
  console.log(`Combined Score: ${combinedScore.toFixed(1)}%`);
  console.log(`Final Stress Level: ${stressLevel}`);

  return {
    perQuestion,
    perCategory,
    binaryVariableKeys,
    wfcIndex,
    stressIndex,
    totalBinaryFlags,
    stressLevel,
  };
}
