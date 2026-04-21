// pages/HeatsPage.tsx (simplified)
import React, { useState } from 'react';
import type { Role, Heat } from '../types';
import { calcTotalScore } from '../utils/scoring';
import { db } from '../firebase';
import { ref, push, get, child, set } from 'firebase/database';

interface Props { role: Role; }

const ScoreButton: React.FC<{ onScore: () => void; onDelete?: () => void; value: number }> = ({ onScore, onDelete, value }) => {
  return (
    <button
      onClick={onScore}
      onContextMenu={(e) => { e.preventDefault(); onDelete?.(); }}
      className="px-2 py-1 m-1 bg-gray-200 rounded"
    >
      {value.toFixed(1)}
    </button>
  );
};

const HeatsPage: React.FC<Props> = ({ role }) => {
  const [heats, setHeats] = useState<Heat[]>([]); // in real app load from useAppState
  const bestN = 2;

  const addScore = async (heatId: string, athleteId: string, score: number) => {
    // simplified example: append score (in production use transaction)
    const node = ref(db, `appState/heats/${heatId}`);
    const snap = await get(node);
    const heat = snap.val();
    if (!heat) return;
    const scores = (heat.scores && heat.scores[athleteId]) ? [...heat.scores[athleteId], score] : [score];
    await set(ref(db, `appState/heats/${heatId}/scores/${athleteId}`), scores);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Heats</h2>
      {heats.map((h) => (
        <div key={h.id} className="border rounded p-3 my-2 bg-white">
          <div className="flex justify-between">
            <div>{h.id} - {h.status}</div>
            <div>Round: {h.round}</div>
          </div>
          <div className="mt-2">
            {h.athleteIds.map((aid) => {
              const scores = h.scores?.[aid] || [];
              const total = calcTotalScore(scores, bestN);
              return (
                <div key={aid} className="flex items-center justify-between my-2">
                  <div>{aid}</div>
                  <div className="flex items-center">
                    <div className="mr-4">Total: {total.toFixed(2)}</div>
                    {role !== 'viewer' && (
                      <div className="flex">
                        {[0.1,0.5,1,2,4,6,8,9,9.5,10].map((v) => (
                          <ScoreButton
                            key={v}
                            value={v}
                            onScore={() => addScore(h.id, aid, v)}
                            onDelete={() => console.log('delete score', h.id, aid)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeatsPage;