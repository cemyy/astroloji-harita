// State Management Store - Zustand store for the application

import { create } from 'zustand';
import { BirthData, NatalChart } from '@/lib/astrology/types';

interface User {
  id: string;
  name: string;
  email?: string;
}

interface SavedChart {
  id: string;
  name: string;
  birthData: BirthData;
  chart?: NatalChart;
  createdAt: Date;
  updatedAt: Date;
}

interface AppState {
  // Current user
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  // Current language
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  
  // Current chart being analyzed
  currentChart: NatalChart | null;
  currentBirthData: BirthData | null;
  setCurrentChart: (data: BirthData, chart?: NatalChart) => void;
  clearCurrentChart: () => void;
  
  // Saved charts
  savedCharts: SavedChart[];
  addSavedChart: (chart: SavedChart) => void;
  removeSavedChart: (id: string) => void;
  updateSavedChart: (id: string, chart: SavedChart) => void;
  
  // Comparison mode
  isComparison: boolean;
  comparisonChart1: NatalChart | null;
  comparisonChart2: NatalChart | null;
  setComparisonCharts: (chart1: NatalChart, chart2: NatalChart) => void;
  clearComparison: () => void;
  
  // UI state
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  
  // Settings
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  timezone: string;
  setTimezone: (tz: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Current user
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  
  // Language
  currentLanguage: 'en',
  setLanguage: (lang) => set({ currentLanguage: lang }),
  
  // Current chart
  currentChart: null,
  currentBirthData: null,
  setCurrentChart: (data, chart) => set({ currentBirthData: data, currentChart: chart }),
  clearCurrentChart: () => set({ currentChart: null, currentBirthData: null }),
  
  // Saved charts
  savedCharts: [],
  addSavedChart: (chart) => set((state) => ({
    savedCharts: [...state.savedCharts, chart],
  })),
  removeSavedChart: (id) => set((state) => ({
    savedCharts: state.savedCharts.filter(c => c.id !== id),
  })),
  updateSavedChart: (id, chart) => set((state) => ({
    savedCharts: state.savedCharts.map(c => c.id === id ? chart : c),
  })),
  
  // Comparison
  isComparison: false,
  comparisonChart1: null,
  comparisonChart2: null,
  setComparisonCharts: (chart1, chart2) => set({
    isComparison: true,
    comparisonChart1: chart1,
    comparisonChart2: chart2,
  }),
  clearComparison: () => set({
    isComparison: false,
    comparisonChart1: null,
    comparisonChart2: null,
  }),
  
  // UI
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  error: null,
  setError: (error) => set({ error }),
  
  // Settings
  theme: 'light',
  setTheme: (theme) => set({ theme }),
  timezone: 'UTC',
  setTimezone: (tz) => set({ timezone: tz }),
}));

export default useAppStore;
