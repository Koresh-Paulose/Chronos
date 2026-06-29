import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthChange, getCurrentUser, getIdToken } from '@/lib/firebase';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signInIncognito: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for incognito session first
    const savedIncognito = localStorage.getItem('chronos-incognito-user');
    if (savedIncognito) {
      setUser(JSON.parse(savedIncognito));
      setLoading(false);
      
      // Setup listener to sync if they clear it
      const handleStorage = (e: StorageEvent) => {
        if (e.key === 'chronos-incognito-user' && !e.newValue) {
          setUser(null);
        }
      };
      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    }

    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser({
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        emailVerified: currentUser.emailVerified,
        createdAt: currentUser.metadata.creationTime ?? '',
        lastLoginAt: currentUser.metadata.lastSignInTime ?? ''
      });
    }
    setLoading(false);

    const unsubscribe = onAuthChange((firebaseUser) => {
      // If we are currently in incognito mode, ignore Firebase auth changes unless explicitly signing out
      if (localStorage.getItem('chronos-incognito-user')) return;

      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
          createdAt: firebaseUser.metadata.creationTime ?? '',
          lastLoginAt: firebaseUser.metadata.lastSignInTime ?? ''
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async () => {
    localStorage.removeItem('chronos-incognito-user');
    const { signInWithGoogle } = await import('@/lib/firebase');
    await signInWithGoogle();
  };

  const signInIncognito = async () => {
    const guestUser: User = {
      uid: 'guest-' + Math.random().toString(36).substring(2, 9),
      email: 'guest@chronos.incognito',
      displayName: 'Incognito Guest',
      photoURL: null,
      emailVerified: true,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };
    localStorage.setItem('chronos-incognito-user', JSON.stringify(guestUser));
    setUser(guestUser);
  };

  const signOut = async () => {
    localStorage.removeItem('chronos-incognito-user');
    const { signOutUser } = await import('@/lib/firebase');
    await signOutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInIncognito, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}