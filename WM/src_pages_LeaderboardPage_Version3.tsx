// pages/LeaderboardPage.tsx (logic-focused)
import React from 'react';
import { calcTotalScore } from '../utils/scoring';
import type { AppState } from '../types';

const LeaderboardPage: React.FC<{ state?: AppState }> = ({ state }) => {
  if (!state) return <div>Loading...</div>;
  const { athletes, heats, config } = state;
  const athleteMap = new Map<string, number[]>();
  Object.values(heats).flat().forEach((heat) => {
    Object.entries(heat.scores || {}).forEach(([aid, arr]) => {
      athleteMap.set(aid, (athleteMap.get(aid) || []).concat(arr));
    });
  });

  const rows = athletes.map((a) => {
    const scores = athleteMap.get(a.id) || [];
    return { athlete: a, total: calcTotalScore(scores, config.bestNWaves) };
  }).sort((x, y) => y.total - x.total);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Leaderboard</h2>
      <ol className="mt-3 space-y-2">
        {rows.map((r, idx) => (
          <li key={r.athlete.id} className={`p-3 rounded ${idx===0 ? 'bg-yellow-200' : idx===1 ? 'bg-sky-200' : idx===2 ? 'bg-orange-200' : 'bg-white'}`}>
            <div className="flex justify-between">
              <div>{idx+1}. {r.athlete.name} ({r.athlete.team})</div>
              <div>{r.total.toFixed(2)}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default LeaderboardPage;