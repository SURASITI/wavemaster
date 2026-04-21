// types.ts
export type Role = 'viewer' | 'judge' | 'admin';

export interface CompetitionConfig {
  name: string;
  venue: string;
  country: string;
  startAt: string; // ISO or datetime-local string
  timezone: string;
  heatDurationMin: number;
  athletesPerHeat: number;
  bestNWaves: number;
  maxScorePerWave: number;
}

export type Category = 'Open' | 'Men' | 'Women' | string;

export interface RoundConfig {
  id: string;    // e.g., "R1", "QF", "SF", "F"
  enabled: boolean;
  advanceCount: number;
  name: string;
}

export interface Athlete {
  id: string;
  bib: number;
  name: string;
  team?: string;
  countryCode?: string; // ISO 2-letter
  category: Category;
}

export interface Heat {
  id: string;
  status: 'pending' | 'live' | 'done';
  athleteIds: string[];
  scores: Record<string, number[]>; // athleteId -> array of scores (0.0 - 10.0)
  round: string;
  cat: Category;
  advanceCount: number;
  startedAt?: number;
  endedAt?: number;
}

export interface AppState {
  config: CompetitionConfig;
  rounds: Record<string, RoundConfig>;
  athletes: Athlete[];
  heats: Record<string, Heat[]>;
  catRounds: Record<string, string[]>;
  nextBib: number;
  _updatedAt: number;
}