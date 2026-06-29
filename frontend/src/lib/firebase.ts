import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser, IdTokenResult } from 'firebase/auth';

export const hasFirebaseConfig = !!(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID
);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "mock-api-key-for-local-dev",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mock-auth-domain-for-local-dev.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mock-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mock-storage-bucket.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:000000000000:web:0000000000000000000000"
};

let app: FirebaseApp;
let auth: Auth;

function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  }
  return app;
}

function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

export const firebaseApp = getFirebaseApp();
export const firebaseAuth = getFirebaseAuth();

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Mock systems for local development when configuration is missing
const mockFirebaseUser = {
  uid: 'mock-uid-123',
  email: 'dev@example.com',
  displayName: 'Local Developer',
  photoURL: 'https://api.dicebear.com/7.x/bottts/svg?seed=dev',
  emailVerified: true,
  metadata: {
    creationTime: new Date().toISOString(),
    lastSignInTime: new Date().toISOString()
  },
  getIdToken: async () => 'mock-token-abc',
  getIdTokenResult: async () => ({ token: 'mock-token-abc' } as any)
} as any as FirebaseUser;

let mockCurrentUser: FirebaseUser | null = mockFirebaseUser;
const authCallbacks: Set<(user: FirebaseUser | null) => void> = new Set();

export async function signInWithGoogle(): Promise<FirebaseUser> {
  if (hasFirebaseConfig) {
    const result = await signInWithPopup(firebaseAuth, googleProvider);
    return result.user;
  } else {
    mockCurrentUser = mockFirebaseUser;
    authCallbacks.forEach(cb => cb(mockCurrentUser));
    return mockFirebaseUser;
  }
}

export async function signOutUser(): Promise<void> {
  if (hasFirebaseConfig) {
    await signOut(firebaseAuth);
  } else {
    mockCurrentUser = null;
    authCallbacks.forEach(cb => cb(null));
  }
}

export function onAuthChange(callback: (user: FirebaseUser | null) => void): () => void {
  if (hasFirebaseConfig) {
    return onAuthStateChanged(firebaseAuth, callback);
  } else {
    authCallbacks.add(callback);
    callback(mockCurrentUser); // Trigger immediately
    return () => {
      authCallbacks.delete(callback);
    };
  }
}

export async function getIdToken(forceRefresh = false): Promise<string | null> {
  if (hasFirebaseConfig) {
    const user = firebaseAuth.currentUser;
    if (!user) return null;
    return user.getIdToken(forceRefresh);
  } else {
    return mockCurrentUser ? 'mock-token-abc' : null;
  }
}

export async function getIdTokenResult(forceRefresh = false): Promise<IdTokenResult | null> {
  if (hasFirebaseConfig) {
    const user = firebaseAuth.currentUser;
    if (!user) return null;
    return user.getIdTokenResult(forceRefresh);
  } else {
    return mockCurrentUser ? { token: 'mock-token-abc' } as any : null;
  }
}

export function getCurrentUser(): FirebaseUser | null {
  if (hasFirebaseConfig) {
    return firebaseAuth.currentUser;
  } else {
    return mockCurrentUser;
  }
}

export { firebaseConfig };