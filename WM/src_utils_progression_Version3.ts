// utils/progression.ts
import type { Heat } from '../types';
import { rankHeat } from './scoring';

// cross-seed generator (simple): take winners order and interleave
export function buildNextRoundHeats(
  allHeats: Heat[],
  advancePerHeat: number,
  nextRoundAthletesPerHeat: number,
  nextRoundRoundId: string,
  cat: string
): Heat[] {
  // collect advancing athlete IDs in seed order: first places from each heat, then second places...
  const bestN = 2; // used for ranking; ideally pass from config
  const seeds: string[] = [];
  for (const h of allHeats) {
    const ranked = rankHeat(h, bestN);
    for (let i = 0; i < advancePerHeat; i++) {
      if (ranked[i]) seeds.push(ranked[i].athleteId);
    }
  }

  const nextHeats: Heat[] = [];
  const numHeats = Math.ceil(seeds.length / nextRoundAthletesPerHeat);
  for (let i = 0; i < numHeats; i++) {
    nextHeats.push({
      id: `${nextRoundRoundId}_${i + 1}`,
      status: 'pending',
      athleteIds: [],
      scores: {},
      round: nextRoundRoundId,
      cat,
      advanceCount: 0,
    });
  }

  for (let s = 0; s < seeds.length; s++) {
    const heatIndex = s % numHeats;
    nextHeats[heatIndex].athleteIds.push(seeds[s]);
  }

  return nextHeats;
}