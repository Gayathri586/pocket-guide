import { create } from 'zustand';

export type PermissionState = {
  locationGranted: boolean;
  callLogGranted: boolean;
  notificationsGranted: boolean;
};

export type UserProfile = {
  username: string;
  fullName: string;
  email?: string;
  phone?: string;
  nationalId?: string;
  passport?: string;
};

type AppState = {
  user?: UserProfile;
  isAuthenticated: boolean;
  permissions: PermissionState;
  reviews: Array<{ id: string; username: string; rating: number; comment: string; createdAt: string }>;
  setUser: (u: UserProfile | undefined) => void;
  authenticate: (flag: boolean) => void;
  grantPermission: (key: keyof PermissionState, value: boolean) => void;
  addReview: (r: { username: string; rating: number; comment: string }) => void;
  loadFromStorage: () => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  user: undefined,
  isAuthenticated: false,
  permissions: { locationGranted: false, callLogGranted: false, notificationsGranted: false },
  reviews: [],
  setUser: (u) => {
    set({ user: u });
    localStorage.setItem('pg_user', JSON.stringify(u));
  },
  authenticate: (flag) => set({ isAuthenticated: flag }),
  grantPermission: (key, value) => set({ permissions: { ...get().permissions, [key]: value } }),
  addReview: ({ username, rating, comment }) => {
    const entry = { id: crypto.randomUUID(), username, rating, comment, createdAt: new Date().toISOString() };
    const next = [...get().reviews, entry];
    set({ reviews: next });
    localStorage.setItem('pg_reviews', JSON.stringify(next));
  },
  loadFromStorage: () => {
    const u = localStorage.getItem('pg_user');
    const r = localStorage.getItem('pg_reviews');
    if (u) set({ user: JSON.parse(u), isAuthenticated: true });
    if (r) set({ reviews: JSON.parse(r) });
  },
}));