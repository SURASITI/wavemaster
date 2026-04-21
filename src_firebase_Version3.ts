// firebase.ts
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export const appStateRef = (path = '/') => ref(db, 'appState' + path);

// helpers
export const writeAppState = async (state: any) => {
  state._updatedAt = Date.now();
  await set(ref(db, 'appState'), state);
};

export const patchAppState = async (partial: any) => {
  partial._updatedAt = Date.now();
  await update(ref(db, 'appState'), partial);
};