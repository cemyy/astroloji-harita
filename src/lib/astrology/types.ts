// Core Astrology Types

export interface BirthData {
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
}

export interface RectificationData extends BirthData {
  approximateTime: string;
  knownEvents: Array<{
    date: Date;
    description: string;
    confidence: 'high' | 'medium' | 'low';
  }>;
}

export enum Planet {
  Sun = 'Sun',
  Moon = 'Moon',
  Mercury = 'Mercury',
  Venus = 'Venus',
  Mars = 'Mars',
  Jupiter = 'Jupiter',
  Saturn = 'Saturn',
  Uranus = 'Uranus',
  Neptune = 'Neptune',
  Pluto = 'Pluto',
  NorthNode = 'North Node',
  SouthNode = 'South Node',
  Chiron = 'Chiron',
}

export enum Zodiac {
  Aries = 'Aries',
  Taurus = 'Taurus',
  Gemini = 'Gemini',
  Cancer = 'Cancer',
  Leo = 'Leo',
  Virgo = 'Virgo',
  Libra = 'Libra',
  Scorpio = 'Scorpio',
  Sagittarius = 'Sagittarius',
  Capricorn = 'Capricorn',
  Aquarius = 'Aquarius',
  Pisces = 'Pisces',
}

export enum Element {
  Fire = 'Fire',
  Earth = 'Earth',
  Air = 'Air',
  Water = 'Water',
}

export enum Quality {
  Cardinal = 'Cardinal',
  Fixed = 'Fixed',
  Mutable = 'Mutable',
}

export interface PlanetPosition {
  planet: Planet;
  longitude: number; // 0-360 degrees
  latitude: number;
  zodiacSign: Zodiac;
  degree: number; // 0-29
  minute: number; // 0-59
  retrograde: boolean;
}

export interface House {
  number: number;
  longitude: number;
  zodiacSign: Zodiac;
  degree: number;
  minute: number;
}

export interface NatalChart {
  birthData: BirthData;
  julianDay: number;
  planets: PlanetPosition[];
  houses: House[];
  ascendant: PlanetPosition;
  midheaven: PlanetPosition;
  aspects: Aspect[];
  elements: ElementalBalance;
  qualities: QualityBalance;
}

export interface Aspect {
  planet1: Planet;
  planet2: Planet;
  angle: number; // degrees
  type: AspectType;
  orb: number; // allowed deviation
  isActive: boolean;
}

export enum AspectType {
  Conjunction = 'Conjunction',
  Sextile = 'Sextile',
  Square = 'Square',
  Trine = 'Trine',
  Opposition = 'Opposition',
  Quincunx = 'Quincunx',
  SemiSquare = 'Semi-Square',
  Sesquisquare = 'Sesquisquare',
}

export interface ElementalBalance {
  fire: number;
  earth: number;
  air: number;
  water: number;
}

export interface QualityBalance {
  cardinal: number;
  fixed: number;
  mutable: number;
}

export interface AstrocartographyLine {
  planet: Planet;
  angle: 'IC' | 'ASC' | 'MC' | 'DESC';
  coordinates: Array<{ latitude: number; longitude: number }>;
  influence: 'positive' | 'negative';
  description: string;
}

export interface MundaneChart {
  eventDate: Date;
  location?: { latitude: number; longitude: number };
  planets: PlanetPosition[];
  aspects: Aspect[];
  interpretation: string;
}

export interface CollectiveData {
  groupName: string;
  members: BirthData[];
  synastry: SynastryAnalysis;
  compositeChart: NatalChart;
  davison: NatalChart;
}

export interface SynastryAnalysis {
  person1: string;
  person2: string;
  aspects: SynastryAspect[];
  compatibility: CompatibilityScore;
}

export interface SynastryAspect extends Aspect {
  person1Planet: Planet;
  person2Planet: Planet;
}

export interface CompatibilityScore {
  overall: number; // 0-100
  emotional: number;
  intellectual: number;
  physical: number;
  karmic: number;
}
