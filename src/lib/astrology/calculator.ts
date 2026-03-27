// Core calculations using Swiss Ephemeris
import { BirthData, NatalChart, Planet, PlanetPosition, House, Zodiac, Aspect, AspectType, ElementalBalance, QualityBalance, Element, Quality } from './types';

// Mock implementation - in production, use swisseph library
// This is a foundation that will be enhanced with actual ephemeris calculations

export class AstrologyCalculator {
  
  // Convert Gregorian date to Julian Day Number
  static calculateJulianDay(year: number, month: number, day: number, hour: number = 12, minute: number = 0): number {
    let y = year;
    let m = month;
    
    if (m <= 2) {
      y -= 1;
      m += 12;
    }
    
    const a = Math.floor(y / 100);
    const b = 2 - a + Math.floor(a / 4);
    
    const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
    const ut = hour + minute / 60;
    
    return jd + ut / 24;
  }

  // Convert degrees to zodiac sign
  static degreesToZodiac(lng: number): { sign: Zodiac, degree: number, minute: number } {
    let normalized = lng % 360;
    if (normalized < 0) normalized += 360;
    
    const signIndex = Math.floor(normalized / 30);
    const degree = Math.floor(normalized % 30);
    const minute = Math.floor((normalized % 1) * 60);
    
    const signs: Zodiac[] = [
      Zodiac.Aries, Zodiac.Taurus, Zodiac.Gemini, Zodiac.Cancer,
      Zodiac.Leo, Zodiac.Virgo, Zodiac.Libra, Zodiac.Scorpio,
      Zodiac.Sagittarius, Zodiac.Capricorn, Zodiac.Aquarius, Zodiac.Pisces
    ];
    
    return {
      sign: signs[signIndex],
      degree,
      minute
    };
  }

  // Get element for zodiac sign
  static getElementForSign(sign: Zodiac): Element {
    const fireSignsL = [Zodiac.Aries, Zodiac.Leo, Zodiac.Sagittarius];
    const earthSigns = [Zodiac.Taurus, Zodiac.Virgo, Zodiac.Capricorn];
    const airSigns = [Zodiac.Gemini, Zodiac.Libra, Zodiac.Aquarius];
    
    if (fireSignsL.includes(sign)) return Element.Fire;
    if (earthSigns.includes(sign)) return Element.Earth;
    if (airSigns.includes(sign)) return Element.Air;
    return Element.Water;
  }

  // Get quality for zodiac sign
  static getQualityForSign(sign: Zodiac): Quality {
    const cardinalSigns = [Zodiac.Aries, Zodiac.Cancer, Zodiac.Libra, Zodiac.Capricorn];
    const fixedSigns = [Zodiac.Taurus, Zodiac.Leo, Zodiac.Scorpio, Zodiac.Aquarius];
    
    if (cardinalSigns.includes(sign)) return Quality.Cardinal;
    if (fixedSigns.includes(sign)) return Quality.Fixed;
    return Quality.Mutable;
  }

  // Calculate Sun position (simplified)
  static calculateSunPosition(jd: number): PlanetPosition {
    // Simplified sun position calculation - actual would use Swiss Ephemeris
    const T = (jd - 2451545.0) / 36525;
    
    // Mean longitude of sun
    let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
    L0 = L0 % 360;
    
    // Mean anomaly
    const M = 357.52911 + 35999.05029 * T - 0.0001536 * T * T;
    const MRad = (M * Math.PI) / 180;
    
    // Equation of center
    const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(MRad) +
              (0.019993 - 0.000101 * T) * Math.sin(2 * MRad) +
              0.000029 * Math.sin(3 * MRad);
    
    const sunLng = L0 + C;
    const normalized = sunLng % 360;
    const zodiac = this.degreesToZodiac(normalized);
    
    return {
      planet: Planet.Sun,
      longitude: normalized,
      latitude: 0,
      zodiacSign: zodiac.sign,
      degree: zodiac.degree,
      minute: zodiac.minute,
      retrograde: false,
    };
  }

  // Calculate Moon position (simplified)
  static calculateMoonPosition(jd: number): PlanetPosition {
    // Simplified moon position calculation
    const T = (jd - 2451545.0) / 36525;
    const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + T * T * T / 545868 - T * T * T * T / 113065000;
    
    const M = 357.52910 + 35999.05030 * T - 0.0001536 * T * T;
    const F = 93.2720950 + 483202.0175233 * T - 0.0036539 * T * T - T * T * T / 3526000 + T * T * T * T / 863310000;
    
    // Simplified calculation of moon longitude
    let moonLng = D + 6.28875 * Math.sin((M * Math.PI) / 180);
    moonLng = moonLng % 360;
    if (moonLng < 0) moonLng += 360;
    
    const zodiac = this.degreesToZodiac(moonLng);
    
    return {
      planet: Planet.Moon,
      longitude: moonLng,
      latitude: 0,
      zodiacSign: zodiac.sign,
      degree: zodiac.degree,
      minute: zodiac.minute,
      retrograde: false,
    };
  }

  // Create natal chart
  static createNatalChart(birthData: BirthData): NatalChart {
    const jd = this.calculateJulianDay(
      birthData.year,
      birthData.month,
      birthData.day,
      birthData.hour || 0,
      birthData.minute || 0
    );

    // Get sun and moon positions
    const sunPos = this.calculateSunPosition(jd);
    const moonPos = this.calculateMoonPosition(jd);
    
    // Placeholder planets (0-360 degrees)
    const planets: PlanetPosition[] = [
      sunPos,
      moonPos,
      // Additional planets would be calculated here
    ];

    // Placeholder houses (Placidus or similar)
    const houses: House[] = this.calculateHouses(jd, birthData);
    
    // Ascendant (1st house cusp)
    const ascendant: PlanetPosition = {
      planet: Planet.Sun, // Placeholder
      ...houses[0],
    } as PlanetPosition;

    // Midheaven (10th house cusp)
    const midheaven: PlanetPosition = {
      planet: Planet.Sun, // Placeholder
      ...houses[9],
    } as PlanetPosition;

    // Calculate aspects
    const aspects = this.calculateAspects(planets);

    // Calculate elemental balance
    const elements = this.calculateElementalBalance(planets);
    
    // Calculate quality balance
    const qualities = this.calculateQualityBalance(planets);

    return {
      birthData,
      julianDay: jd,
      planets,
      houses,
      ascendant,
      midheaven,
      aspects,
      elements,
      qualities,
    };
  }

  // Calculate houses (simplified Placidus)
  static calculateHouses(jd: number, birthData: BirthData): House[] {
    const houses: House[] = [];
    
    // Placeholder - calculate actual house cusps
    for (let i = 0; i < 12; i++) {
      const lng = (birthData.longitude + (i * 30)) % 360;
      const zodiac = this.degreesToZodiac(lng);
      
      houses.push({
        number: i + 1,
        longitude: lng,
        zodiacSign: zodiac.sign,
        degree: zodiac.degree,
        minute: zodiac.minute,
      });
    }
    
    return houses;
  }

  // Calculate aspects between planets
  static calculateAspects(planets: PlanetPosition[]): Aspect[] {
    const aspects: Aspect[] = [];
    const aspectAngles: Record<AspectType, { angle: number; orb: number }> = {
      [AspectType.Conjunction]: { angle: 0, orb: 8 },
      [AspectType.Sextile]: { angle: 60, orb: 6 },
      [AspectType.Square]: { angle: 90, orb: 8 },
      [AspectType.Trine]: { angle: 120, orb: 8 },
      [AspectType.Opposition]: { angle: 180, orb: 8 },
      [AspectType.Quincunx]: { angle: 150, orb: 3 },
      [AspectType.SemiSquare]: { angle: 45, orb: 2 },
      [AspectType.Sesquisquare]: { angle: 135, orb: 2 },
    };

    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        const p1 = planets[i];
        const p2 = planets[j];
        
        let angleDiff = Math.abs(p1.longitude - p2.longitude);
        if (angleDiff > 180) angleDiff = 360 - angleDiff;

        for (const [type, config] of Object.entries(aspectAngles)) {
          const diff = Math.abs(angleDiff - config.angle);
          if (diff <= config.orb) {
            aspects.push({
              planet1: p1.planet,
              planet2: p2.planet,
              angle: angleDiff,
              type: type as AspectType,
              orb: diff,
              isActive: diff <= 2,
            });
          }
        }
      }
    }

    return aspects;
  }

  // Calculate elemental balance
  static calculateElementalBalance(planets: PlanetPosition[]): ElementalBalance {
    const balance: ElementalBalance = { fire: 0, earth: 0, air: 0, water: 0 };
    
    planets.forEach(planet => {
      const element = this.getElementForSign(planet.zodiacSign);
      switch (element) {
        case Element.Fire:
          balance.fire++;
          break;
        case Element.Earth:
          balance.earth++;
          break;
        case Element.Air:
          balance.air++;
          break;
        case Element.Water:
          balance.water++;
          break;
      }
    });
    
    return balance;
  }

  // Calculate quality balance
  static calculateQualityBalance(planets: PlanetPosition[]): QualityBalance {
    const balance: QualityBalance = { cardinal: 0, fixed: 0, mutable: 0 };
    
    planets.forEach(planet => {
      const quality = this.getQualityForSign(planet.zodiacSign);
      switch (quality) {
        case Quality.Cardinal:
          balance.cardinal++;
          break;
        case Quality.Fixed:
          balance.fixed++;
          break;
        case Quality.Mutable:
          balance.mutable++;
          break;
      }
    });
    
    return balance;
  }
}
