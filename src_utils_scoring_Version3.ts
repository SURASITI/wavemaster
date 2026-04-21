// utils/scoring.ts
import type { Heat } from '../types';

// ให้ผลรวมตาม Best N waves
export function calcTotalScore(scores: number[], bestN: number) {
  if (!scores || scores.length === 0) return 0;
  const arr = scores.slice().sort((a, b) => b - a);
  return arr.slice(0, bestN).reduce((s, v) => s + v, 0);
}

// สำหรับ heat ให้คืน ranking array [{athleteId, total}]
export function rankHeat(heat: Heat, bestN: number) {
  const entries = Object.keys(heat.scores || {}).map((id) => ({
    athleteId: id,
    total: calcTotalScore(heat.scores[id] || [], bestN),
  }));
  entries.sort((a, b) => b.total - a.total);
  return entries;
}