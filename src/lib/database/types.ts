// Database types for Supabase

export interface User {
  id: string;
  email: string;
  username?: string;
  fullName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SavedChart {
  id: string;
  userId: string;
  name: string;
  birthData: {
    year: number;
    month: number;
    day: number;
    hour?: number;
    minute?: number;
    second?: number;
    latitude: number;
    longitude: number;
    timezone?: number;
    locationName: string;
    isDaylightSaving?: boolean;
  };
  natalChart?: any; // Full chart data
  notes?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comparison {
  id: string;
  userId: string;
  name: string;
  chart1Id: string;
  chart2Id: string;
  comparisonType: 'synastry' | 'composite' | 'davison';
  synastryData?: any;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AstrocartographySession {
  id: string;
  userId: string;
  chartId: string;
  currentLocation: {
    latitude: number;
    longitude: number;
    name: string;
  };
  astrocartographyLines?: any;
  recommendations?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Interpretation {
  id: string;
  userId: string;
  chartId: string;
  interpretationType: 'natal' | 'synastry' | 'forecast' | 'mundane';
  content: string;
  createdAt: string;
  updatedAt: string;
}
