// hooks/useAppState.tsx
import { useEffect, useState, useRef } from 'react';
import { appStateRef } from '../firebase';
import type { AppState } from '../types';
import { onValue } from 'firebase/database';

export const useAppState = (onRemoteUpdate?: (state: AppState) => void) => {
  const [state, setState] = useState<AppState | null>(null);
  const lastUpdatedRef = useRef<number>(0);

  useEffect(() => {
    const refRoot = appStateRef('');
    const unsub = onValue(refRoot, (snap) => {
      const data = snap.val() as AppState | null;
      if (!data) return;
      if (!state || data._updatedAt > lastUpdatedRef.current) {
        lastUpdatedRef.current = data._updatedAt;
        setState(data);
        onRemoteUpdate?.(data);
      }
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { state, setState };
};