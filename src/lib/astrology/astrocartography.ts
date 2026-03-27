// Astrocartography Module - Calculates planetary lines and best locations for life/work

import { NatalChart, Planet, AstrocartographyLine } from './types';

export class AstrocartographyCalculator {
  
  /**
   * Calculate astrocartography lines for all planets
   * These represent paths on Earth where each planet has maximum influence
   */
  static calculateAstrocartographyLines(chart: NatalChart): AstrocartographyLine[] {
    const lines: AstrocartographyLine[] = [];
    
    const angles: Array<'IC' | 'ASC' | 'MC' | 'DESC'> = ['IC', 'ASC', 'MC', 'DESC'];
    
    for (const planet of chart.planets) {
      for (const angle of angles) {
        const lineCoords = this.calculateLineCoordinates(chart, planet, angle);
        
        const influence = this.determinePlantInfluence(planet.planet, angle);
        const description = this.getLineDescription(planet.planet, angle);
        
        lines.push({
          planet: planet.planet,
          angle,
          coordinates: lineCoords,
          influence,
          description,
        });
      }
    }
    
    return lines;
  }

  /**
   * Calculate the path coordinates for a planet-angle combination
   * This line circles the Earth where the planet is in that angle position
   */
  private static calculateLineCoordinates(
    chart: NatalChart,
    planet: any,
    angle: 'IC' | 'ASC' | 'MC' | 'DESC'
  ): Array<{ latitude: number; longitude: number }> {
    const coordinates: Array<{ latitude: number; longitude: number }> = [];
    
    // Steps of longitude (calculate every 5 degrees)
    for (let lng = -180; lng <= 180; lng += 5) {
      // Calculate required latitude for this longitude
      // Based on where the planet would be in the specified house angle
      
      const lat = this.calculateLatitudeForLine(
        planet.longitude,
        planet.latitude,
        lng,
        angle
      );
      
      if (lat >= -90 && lat <= 90) {
        coordinates.push({ latitude: lat, longitude: lng });
      }
    }
    
    return coordinates;
  }

  /**
   * Calculate latitude at a given longitude for an astrocartography line
   */
  private static calculateLatitudeForLine(
    planetLng: number,
    planetLat: number,
    testLng: number,
    angle: 'IC' | 'ASC' | 'MC' | 'DESC'
  ): number {
    // Simplified calculation
    // In reality, this involves complex spherical geometry
    
    const lngDiff = testLng - planetLng;
    const lngDiffNorm = ((lngDiff + 180) % 360) - 180;
    
    // Different angles give different curves
    let lat = 0;
    
    switch (angle) {
      case 'ASC':
      case 'DESC':
        // Ascendant/Descendant lines go through both poles
        lat = 90 * Math.cos((lngDiffNorm * Math.PI) / 180);
        break;
      case 'MC':
      case 'IC':
        // MC/IC lines are more complex
        lat = 45 * Math.sin((lngDiffNorm * Math.PI) / 180);
        break;
    }
    
    return lat + planetLat;
  }

  /**
   * Determine if a planet's influence on an angle is positive or negative
   */
  private static determinePlantInfluence(planet: Planet, angle: string): 'positive' | 'negative' {
    const benefics = [Planet.Venus, Planet.Jupiter, Planet.Sun];
    const malefics = [Planet.Saturn, Planet.Mars, Planet.Pluto];
    
    if (benefics.includes(planet)) {
      return 'positive';
    } else if (malefics.includes(planet)) {
      return 'negative';
    } else {
      // Neutral planets can be positive or negative
      return angle === 'MC' || angle === 'ASC' ? 'positive' : 'negative';
    }
  }

  /**
   * Get interpretation text for a planetary line
   */
  private static getLineDescription(planet: Planet, angle: string): string {
    const descriptions: Record<Planet, Record<string, string>> = {
      [Planet.Sun]: {
        MC: 'Empowerment and public recognition - best for leadership and visibility',
        ASC: 'Vitality and self-expression - optimal for personal development',
        IC: 'Family matters and real estate - favorable for home-based ventures',
        DESC: 'Relationships and partnerships - good for marriage and business partners',
      },
      [Planet.Moon]: {
        MC: 'Emotional security in career - nurturing public work',
        ASC: 'Emotional sensitivity - enhanced intuition and empathy',
        IC: 'Home and family comfort - ideal for family life',
        DESC: 'Emotional bonding with others - strong relationship connections',
      },
      [Planet.Mercury]: {
        MC: 'Communication success - ideal for writing, teaching, sales',
        ASC: 'Mental clarity and quick thinking - enhanced during travel',
        IC: 'Learning at home - great for research and study',
        DESC: 'Stimulating conversations and intellectual partnerships',
      },
      [Planet.Venus]: {
        MC: 'Artistic success and attraction - great for creative/aesthetic work',
        ASC: 'Personal charm and attractiveness - enhanced social popularity',
        IC: 'Love and beauty in home - harmonious domestic life',
        DESC: 'Social ease and romantic attraction - favorable for relationships',
      },
      [Planet.Mars]: {
        MC: 'Competitive success - ideal for ambitious projects',
        ASC: 'Physical energy and courage - active lifestyle',
        IC: 'Property disputes and family conflict - challenging for home peace',
        DESC: 'Passionate relationships - intense romantic connections',
      },
      [Planet.Jupiter]: {
        MC: 'Expansion and luck in career - greatest opportunities',
        ASC: 'Optimism and positive opportunities - personal growth',
        IC: 'Luck with real estate and inheritance',
        DESC: 'Generous partnerships and fortunate relationships',
      },
      [Planet.Saturn]: {
        MC: 'Serious ambition and long-term success - slow steady progress',
        ASC: 'Responsibility and maturity - serious personal circumstances',
        IC: 'Real estate and property management - building solid foundation',
        DESC: 'Serious long-term relationships - testing of commitments',
      },
      [Planet.Uranus]: {
        MC: 'Revolutionary and tech-related success - innovation',
        ASC: 'Eccentricity and uniqueness - breaking conventions',
        IC: 'Sudden changes with homes/family - unpredictability',
        DESC: 'Unusual and exciting relationships - unconventional partnerships',
      },
      [Planet.Neptune]: {
        MC: 'Artistic and spiritual careers - mystical work',
        ASC: 'Spirituality and intuition - dreamy and imaginative',
        IC: 'Spirituality at home - mystical family connections',
        DESC: 'Mystical and artistic partnerships - spiritual connections',
      },
      [Planet.Pluto]: {
        MC: 'Transformative power - deep psychological work, taboo subjects',
        ASC: 'Magnetic intensity and transformation - powerful presence',
        IC: 'Deep family healing - ancestral issues',
        DESC: 'Intense transformative relationships - psychological depth',
      },
      [Planet.NorthNode]: {
        MC: 'Soul's purpose in career - destiny fulfillment',
        ASC: 'Soul's evolutionary direction - life purpose',
        IC: 'Ancestral karma and family destiny',
        DESC: 'Soul connections with others - karmic partnerships',
      },
      [Planet.SouthNode]: {
        MC: 'Past talents now obsolete - let go to progress',
        ASC: 'The self to transcend - move beyond',
        IC: 'Family patterns to release - ancestral healing',
        DESC: 'Comfortable but limiting partnerships',
      },
      [Planet.Chiron]: {
        MC: 'Healing and teaching others - wounded healer work',
        ASC: 'Personal healing and transformation',
        IC: 'Family and intergenerational healing',
        DESC: 'Healing partnerships - therapeutic connections',
      },
    };
    
    return descriptions[planet]?.[angle] || `${planet} influence on ${angle} angle`;
  }

  /**
   * Recommend best times to visit locations based on astrocartography
   */
  static getLocationRecommendations(
    chart: NatalChart,
    currentLocation: { latitude: number; longitude: number },
    timeframe: 'short' | 'medium' | 'long'
  ): Array<{
    location: string;
    latitude: number;
    longitude: number;
    bestFor: string;
    timing: string;
    planetaryInfluences: Planet[];
  }> {
    // Get all astrocartography lines
    const lines = this.calculateAstrocartographyLines(chart);
    
    // Find locations with beneficial planetary influences
    const recommendations = [];
    
    // Major cities and their coordinates (expanded list)
    const majorCities = [
      { name: 'New York, USA', lat: 40.7128, lng: -74.0060 },
      { name: 'London, UK', lat: 51.5074, lng: -0.1278 },
      { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503 },
      { name: 'Paris, France', lat: 48.8566, lng: 2.3522 },
      { name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093 },
      { name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708 },
      { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
      { name: 'Istanbul, Turkey', lat: 41.0082, lng: 28.9784 },
      { name: 'Bangkok, Thailand', lat: 13.7563, lng: 100.5018 },
      { name: 'Seoul, South Korea', lat: 37.5665, lng: 126.9780 },
      { name: 'Barcelona, Spain', lat: 41.3851, lng: 2.1734 },
      { name: 'Berlin, Germany', lat: 52.5200, lng: 13.4050 },
    ];
    
    for (const city of majorCities) {
      // Find nearby planetary lines
      const nearbyLines = this.findNearbyLines(lines, city.lat, city.lng, 5); // Within 5 degrees
      
      if (nearbyLines.length > 0) {
        const positiveLines = nearbyLines.filter(l => l.influence === 'positive');
        
        if (positiveLines.length > 0) {
          recommendations.push({
            location: city.name,
            latitude: city.lat,
            longitude: city.lng,
            bestFor: positiveLines.map(l => `${l.planet} ${l.angle}`).join(', '),
            timing: this.getOptimalTiming(timeframe),
            planetaryInfluences: positiveLines.map(l => l.planet),
          });
        }
      }
    }
    
    return recommendations.sort((a, b) => b.planetaryInfluences.length - a.planetaryInfluences.length);
  }

  private static findNearbyLines(
    lines: AstrocartographyLine[],
    lat: number,
    lng: number,
    threshold: number
  ): AstrocartographyLine[] {
    return lines.filter(line => {
      return line.coordinates.some(coord => {
        const latDiff = Math.abs(coord.latitude - lat);
        const lngDiff = Math.abs(coord.longitude - lng);
        return latDiff < threshold && lngDiff < threshold;
      });
    });
  }

  private static getOptimalTiming(timeframe: 'short' | 'medium' | 'long'): string {
    switch (timeframe) {
      case 'short':
        return 'Next 3 months';
      case 'medium':
        return '3-12 months';
      case 'long':
        return '1-3 years';
    }
  }
}

export default AstrocartographyCalculator;
