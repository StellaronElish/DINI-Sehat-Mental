// src/utils/Scoring.ts
import { categories } from "../data/categories";
import { questions } from "../data/questions";

//  Konversi jawaban (string) ke skor numerik mentah
export function mapAnswerToScore(category: string, answer: string): number {
  const opts = categories[category]?.options || [];
  const idx = opts.indexOf(answer);
  return idx >= 0 ? idx + 1 : 0; // jawaban pertama = 1, dst
}

//  Helper function untuk bikin formula otomatis
function makeFormulaSubtract(max: number, divisor: number) {
  return (scores: number[]) => {
    const value = (max - scores.reduce((a, b) => a + b, 0)) / divisor;
    return value < 2.25 ? 1 : 0;
  };
}

function makeFormulaReverse() {
  return (scores: number[]) => {
    const value = 5 - scores[0]; // hanya 1 item
    return value < 2.25 ? 1 : 0;
  };
}

//  Helper: direct scoring (pakai X apa adanya, lalu cutoff 2.25)
function makeFormulaDirect() {
  return (scores: number[]) => {
    const value = scores[0];
    return value < 2.25 ? 1 : 0;
  };
}

//  Helper: kategorisasi skala 1–5 (Q64–Q81)
function calculateRange64to81(scores: number[]) {
  const total = scores.reduce((a, b) => a + b, 0);

  if (total > 46.25) return 5;      // sangat tinggi
  if (total > 39.75) return 4;      // tinggi
  if (total > 33.25) return 3;      // sedang
  if (total > 26.75) return 2;      // rendah
  return 1;                         // sangat rendah
}

//  Helper: klasifikasi Q82–Q109
function classifyStressLevel(scores: number[]) {
  const X = scores.reduce((a, b) => a + b, 0); // jumlah skor individu
  const µ = mean(scores);
  const SD = stdDev(scores);

  if (X > µ + 1.5 * SD) return 4;                         // sangat tinggi
  if (X > µ + 0.5 * SD && X <= µ + 1.5 * SD) return 3;    // tinggi
  if (X > µ - 0.5 * SD && X <= µ + 0.5 * SD) return 2;    // sedang
  if (X > µ - 1.5 * SD && X <= µ - 0.5 * SD) return 1;    // rendah
  return 0;                                               // sangat rendah
}

//  Helper: hitung mean dan standar deviasi
function mean(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function stdDev(arr: number[]) {
  const m = mean(arr);
  const variance = arr.reduce((sum, x) => sum + Math.pow(x - m, 2), 0) / arr.length;
  return Math.sqrt(variance);
}

//  Formula per pertanyaan (independen)
const formulas: Record<number, (scores: number[]) => number> = {

  // Q1: (∑X)/2 → cek cut-off 2.25
  1: (scores) => {
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    return mean < 2.25 ? 1 : 0;
  },

  // Q2: (∑X)/2 → cek cut-off 2.25
  2: (scores) => {
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    return mean < 2.25 ? 1 : 0;
  },

  // Q3-Q4: (10 - ∑X)/2 → cut-off 2.25
  3: makeFormulaSubtract(10, 2),
  4: makeFormulaSubtract(10, 2),
  
  // Q5 tidak dihitung sendiri → nanti digabung dengan Q6 & Q7

  // Q8-Q9: reverse scoring (5 - X), lalu cek cutoff
  8: makeFormulaReverse(),
  9: makeFormulaReverse(),

  // Q10 - Q12: (∑X)/3 → cutoff 2.25
  10: (scores) => {
    const mean = scores.reduce((a, b) => a + b, 0) / 3;
    return mean < 2.25 ? 1 : 0;
  },

  11: (scores) => {
    const mean = scores.reduce((a, b) => a + b, 0) / 3;
    return mean < 2.25 ? 1 : 0;
  },
  12: (scores) => {
    const mean = scores.reduce((a, b) => a + b, 0) / 3;
    return mean < 2.25 ? 1 : 0;
  },

  // Q13–Q21: (15 - ∑X)/3
  13: makeFormulaSubtract(15, 3),
  14: makeFormulaSubtract(15, 3),
  15: makeFormulaSubtract(15, 3),
  16: makeFormulaSubtract(15, 3),
  17: makeFormulaSubtract(15, 3),
  18: makeFormulaSubtract(15, 3),
  19: makeFormulaSubtract(15, 3),
  20: makeFormulaSubtract(15, 3),
  21: makeFormulaSubtract(15, 3),

  // Q22–Q27: (30 - ∑X)/6
  22: makeFormulaSubtract(30, 6),
  23: makeFormulaSubtract(30, 6),
  24: makeFormulaSubtract(30, 6),
  25: makeFormulaSubtract(30, 6),
  26: makeFormulaSubtract(30, 6),
  27: makeFormulaSubtract(30, 6),

  // Q28–Q38: (55 - ∑X)/11
  28: makeFormulaSubtract(55, 11),
  29: makeFormulaSubtract(55, 11),
  30: makeFormulaSubtract(55, 11),
  31: makeFormulaSubtract(55, 11),
  32: makeFormulaSubtract(55, 11),
  33: makeFormulaSubtract(55, 11),
  34: makeFormulaSubtract(55, 11),
  35: makeFormulaSubtract(55, 11),
  36: makeFormulaSubtract(55, 11),
  37: makeFormulaSubtract(55, 11),
  38: makeFormulaSubtract(55, 11),

  // Q39–Q40: (10 - ∑X)/2
  39: makeFormulaSubtract(10, 2),
  40: makeFormulaSubtract(10, 2),

  // Q41–Q42: (5 - X)
  41: makeFormulaReverse(), // dukungan atasan
  42: makeFormulaReverse(), // kepuasan kerja

  // Q43–Q44: Sesuai Skor
  43: makeFormulaDirect(),
  44: makeFormulaDirect(),

  // Q45–Q59: (5 - X)
  45: makeFormulaReverse(),
  46: makeFormulaReverse(),
  47: makeFormulaReverse(),
  48: makeFormulaReverse(),
  49: makeFormulaReverse(),
  50: makeFormulaReverse(),
  51: makeFormulaReverse(),
  52: makeFormulaReverse(),
  53: makeFormulaReverse(),
  54: makeFormulaReverse(),
  55: makeFormulaReverse(),
  56: makeFormulaReverse(),
  57: makeFormulaReverse(),
  58: makeFormulaReverse(),
  59: makeFormulaReverse(),
  
  // Q60: Sesuai Skor
  60: makeFormulaDirect(),

  // Q61: (5 - X)
  61: makeFormulaReverse(),

  // Q62-Q63: (10 - ∑X)/2
  62: makeFormulaSubtract(10, 2),
  63: makeFormulaSubtract(10, 2),

  // Q64-Q81 dihitung setelah loop selesai

  // Q82-Q109 dihitung setelah loop selesai

};

//  Hitung skor per pertanyaan, kategori, dan total
export function calculateScores(answers: Record<number, string>) {
  const perQuestion: Record<number, number> = {};
  const perCategory: Record<string, number> = {};
  let problematicCategories: string[] = [];
  let total = 0;

  // simpan jawaban mentah Q5–Q7
  const q5to7: number[] = [];
  const q64to81: number[] = [];
  const q82to109: number[] = [];

  questions.forEach((q) => {
    const ans = answers[q.id];
    if (!ans) return;

    // konversi jawaban ke angka
    const score = mapAnswerToScore(q.category, ans);
    if (score === 0) return;

    // Kalau Q5–Q7 → simpan dulu
    if ([5, 6, 7].includes(q.id)) {
      q5to7.push(score);
      return;
    }

    // Kalau Q64–Q81 → simpan dulu
    if (q.id >= 64 && q.id <= 81) {
      q64to81.push(score);
      return;
    }

    // Kalau Q82–Q109 → simpan dulu
    if (q.id >= 82 && q.id <= 109) {
      q82to109.push(score);
      return;
    }

    // terapkan formula kalau ada
    const formula = formulas[q.id];
    const finalScore = formula ? formula([score]) : score;

    // simpan hasil
    perQuestion[q.id] = finalScore;
    perCategory[q.category] = (perCategory[q.category] || 0) + finalScore;
    total += finalScore;
  });

  // cek kategori bermasalah berdasarkan cutoff
  Object.entries(perCategory).forEach(([cat, val]) => {
    const cutoff = 2.25; // default
    if (val < cutoff) {
      problematicCategories.push(cat);
    }
  });

  //  Setelah loop → hitung Q5–Q7 gabungan
  if (q5to7.length === 3) {
    const [x1, x2, x3] = q5to7;
    const value = (x1 + x2 + (5 - x3)) / 3;
    const final57 = value < 2.25 ? 1 : 0;

    perQuestion["5-7" as any] = final57; // simpan dengan key gabungan
    perCategory["I"] = (perCategory["I"] || 0) + final57; // kategori sama kayak Q5
    total += final57;
  }

  //  Setelah loop → hitung Q64–Q81 gabungan
  if (q64to81.length === 18) {
    const final6481 = calculateRange64to81(q64to81);

    perQuestion["64-81" as any] = final6481;
    perCategory["VIII"] = (perCategory["VIII"] || 0) + final6481; // contoh kategori "VIII", bisa disesuaikan
    total += final6481;
  }

  // Setelah loop → hitung Q82–Q109 gabungan
  if (q82to109.length === 28) {
    const final82109 = classifyStressLevel(q82to109);

    perQuestion["82-109" as any] = final82109;
    perCategory["IX"] = (perCategory["IX"] || 0) + final82109; // contoh kategori IX
    total += final82109;
  }

  return { perQuestion, perCategory, total, problematicCategories};
}
