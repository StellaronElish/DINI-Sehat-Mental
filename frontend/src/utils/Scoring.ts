import { categories } from "../data/categories";
import { questions } from "../data/questions";

// Konversi jawaban (string) ke skor numerik
export function mapAnswerToScore(category: string, answer: string): number {
  const opts = categories[category]?.options || [];
  const idx = opts.indexOf(answer);
  return idx >= 0 ? idx + 1 : 0;
}

// Hitung total skor per kategori
export function calculateScores(answers: Record<number, string>) {
  const scores: Record<string, number> = {};

  questions.forEach((q) => {
    const ans = answers[q.id];
    if (!ans) return;

    const score = mapAnswerToScore(q.category, ans);
    if (!scores[q.category]) scores[q.category] = 0;
    scores[q.category] += score;
  });

  return scores;
}
