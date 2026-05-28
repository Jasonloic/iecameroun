import { create } from 'zustand';
import { Admin } from '../types';

interface AuthState {
  token: string | null;
  admin: Admin | null;
  setAuth: (token: string, admin: Admin) => void;
  setAdmin: (admin: Admin) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('ie_token'),
  admin: null,
  setAuth: (token, admin) => {
    localStorage.setItem('ie_token', token);
    set({ token, admin });
  },
  setAdmin: (admin) => set({ admin }),
  logout: () => {
    localStorage.removeItem('ie_token');
    set({ token: null, admin: null });
  },
}));
