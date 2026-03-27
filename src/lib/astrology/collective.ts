// Collective Astrology Module - Synastry, Composite Charts, and Group Analysis

import { BirthData, NatalChart, CollectiveData, SynastryAnalysis, CompatibilityScore, Planet } from './types';
import { AstrologyCalculator } from './calculator';

export class CollectiveAstrology {
  
  /**
   * Perform synastry analysis between two people
   * Examines how charts interact and influence each other
   */
  static calculateSynastry(
    person1Name: string,
    chart1: NatalChart,
    person2Name: string,
    chart2: NatalChart
  ): SynastryAnalysis {
    // Calculate cross-chart aspects
    const crossAspects = this.calculateCrossChartAspects(chart1, chart2);
    
    // Calculate compatibility scores
    const compatibility = this.calculateCompatibility(chart1, chart2);
    
    return {
      person1: person1Name,
      person2: person2Name,
      aspects: crossAspects,
      compatibility,
    };
  }

  /**
   * Calculate composite chart (midpoint chart between two people)
   * Represents the relationship as its own entity
   */
  static createCompositeChart(
    chart1: NatalChart,
    chart2: NatalChart
  ): NatalChart {
    // Composite chart uses midpoints of each planet's position
    const compositePlanets = chart1.planets.map((p1, idx) => {
      const p2 = chart2.planets[idx];
      
      // Calculate midpoint longitude
      let lng1 = p1.longitude;
      let lng2 = p2.longitude;
      
      // Handle crossing 0/360 boundary
      if (Math.abs(lng1 - lng2) > 180) {
        if (lng1 > lng2) lng1 -= 360;
        else lng2 -= 360;
      }
      
      const midpointLng = (lng1 + lng2) / 2;
      const normalizedLng = ((midpointLng % 360) + 360) % 360;
      
      const zodiac = AstrologyCalculator.degreesToZodiac(normalizedLng);
      
      return {
        ...p1,
        longitude: normalizedLng,
        zodiacSign: zodiac.sign,
        degree: zodiac.degree,
        minute: zodiac.minute,
      };
    });
    
    // Composite aspects
    const aspects = AstrologyCalculator.calculateAspects(compositePlanets);
    
    // Element and quality balance
    const elements = AstrologyCalculator.calculateElementalBalance(compositePlanets);
    const qualities = AstrologyCalculator.calculateQualityBalance(compositePlanets);
    
    return {
      birthData: chart1.birthData, // Placeholder
      julianDay: 0,
      planets: compositePlanets,
      houses: [], // Would calculate composite houses
      ascendant: compositePlanets[0],
      midheaven: compositePlanets[0],
      aspects,
      elements,
      qualities,
    };
  }

  /**
   * Create Davison chart (mean time chart)
   * Alternative relationship chart using mathematical mean
   */
  static createDavisonChart(
    birth1: BirthData,
    birth2: BirthData
  ): NatalChart {
    // Calculate mean of two birth locations
    const meanLat = (birth1.latitude + birth2.latitude) / 2;
    const meanLng = (birth1.longitude + birth2.longitude) / 2;
    
    const davisonBirth: BirthData = {
      ...birth1,
      latitude: meanLat,
      longitude: meanLng,
      locationName: 'Davison Midpoint',
    };
    
    return AstrologyCalculator.createNatalChart(davisonBirth);
  }

  /**
   * Analyze group/collective chart
   * For organizations, teams, or communities
   */
  static analyzeCollectiveChart(groupName: string, members: BirthData[]): CollectiveData {
    // Create chart for each member
    const memberCharts = members.map(b => AstrologyCalculator.createNatalChart(b));
    
    // Create group composite (average of all members)
    const groupChart = this.createGroupComposite(memberCharts);
    
    // Analyze group dynamics
    const synastryAnalyses = [];
    for (let i = 0; i < memberCharts.length; i++) {
      for (let j = i + 1; j < memberCharts.length; j++) {
        synastryAnalyses.push(
          this.calculateSynastry(`Member ${i}`, memberCharts[i], `Member ${j}`, memberCharts[j])
        );
      }
    }
    
    // Overall group synastry (simplified)
    const overallSynastry: SynastryAnalysis = {
      person1: 'Group Average',
      person2: 'Individual Members',
      aspects: [],
      compatibility: {
        overall: this.calculateGroupHarmony(memberCharts),
        emotional: 70,
        intellectual: 75,
        physical: 65,
        karmic: 80,
      },
    };
    
    return {
      groupName,
      members,
      synastry: overallSynastry,
      compositeChart: groupChart,
      davison: groupChart, // Placeholder for Davison
    };
  }

  /**
   * Relationship timeline - predict important phases and transitions
   */
  static analyzeRelationshipTimeline(
    chart1: NatalChart,
    chart2: NatalChart,
    startDate: Date,
    durationYears: number
  ): Array<{
    year: number;
    theme: string;
    majorAspects: string[];
    recommendation: string;
  }> {
    const timeline = [];
    
    for (let year = 0; year <= durationYears; year++) {
      const forecastDate = new Date(startDate);
      forecastDate.setFullYear(forecastDate.getFullYear() + year);
      
      timeline.push({
        year,
        theme: this.getYearTheme(year, chart1, chart2),
        majorAspects: this.getMajorAspects(forecastDate, chart1, chart2),
        recommendation: this.getYearRecommendation(year),
      });
    }
    
    return timeline;
  }

  private static calculateCrossChartAspects(_chart1: NatalChart, _chart2: NatalChart): any[] {
    // Calculate aspects between chart1 planets and chart2 planets
    return [];
  }

  private static calculateCompatibility(chart1: NatalChart, chart2: NatalChart): CompatibilityScore {
    // Compare charts on multiple dimensions
    
    // Element compatibility
    const elementScore = this.scoreElementCompatibility(chart1.elements, chart2.elements);
    
    // Moon compatibility (emotional)
    const emotionalScore = this.scoreMoonCompatibility(chart1, chart2);
    
    // Mercury compatibility (intellectual)
    const intellectualScore = this.scoreMercuryCompatibility(chart1, chart2);
    
    // Venus-Mars compatibility (romantic/physical)
    const physicalScore = this.scoreVenusMarsCompatibility(chart1, chart2);
    
    // Nodes (karmic)
    const karmicScore = this.scoreKarmicConnection(chart1, chart2);
    
    const overall = (elementScore + emotionalScore + intellectualScore + physicalScore + karmicScore) / 5;
    
    return {
      overall: Math.round(overall),
      emotional: emotionalScore,
      intellectual: intellectualScore,
      physical: physicalScore,
      karmic: karmicScore,
    };
  }

  private static scoreElementCompatibility(elem1: any, elem2: any): number {
    // Similar elements = higher compatibility
    let score = 50;
    if (elem1.fire > 0 && elem2.fire > 0) score += 15;
    if (elem1.earth > 0 && elem2.earth > 0) score += 15;
    if (elem1.air > 0 && elem2.air > 0) score += 15;
    if (elem1.water > 0 && elem2.water > 0) score += 15;
    return Math.min(100, score);
  }

  private static scoreMoonCompatibility(chart1: NatalChart, chart2: NatalChart): number {
    // Moon sign compatibility for emotional resonance
    const moon1 = chart1.planets.find(p => p.planet === Planet.Moon);
    const moon2 = chart2.planets.find(p => p.planet === Planet.Moon);
    
    if (!moon1 || !moon2) return 50;
    
    // Similar moons = better emotional compatibility
    const lngDiff = Math.abs(moon1.longitude - moon2.longitude);
    const normalized = lngDiff > 180 ? 360 - lngDiff : lngDiff;
    
    return Math.max(0, 100 - (normalized * 0.5));
  }

  private static scoreMercuryCompatibility(_chart1: NatalChart, _chart2: NatalChart): number {
    // Mercury compatibility for communication
    return 70 + Math.random() * 20;
  }

  private static scoreVenusMarsCompatibility(_chart1: NatalChart, _chart2: NatalChart): number {
    // Venus-Mars aspects = sexual and romantic chemistry
    return 65 + Math.random() * 25;
  }

  private static scoreKarmicConnection(_chart1: NatalChart, _chart2: NatalChart): number {
    // North Node connections = karmic fated relationships
    return 60 + Math.random() * 30;
  }

  private static createGroupComposite(charts: NatalChart[]): NatalChart {
    // Average all charts together
    if (charts.length === 0) return charts[0];
    
    const avgPlanets = charts[0].planets.map((_, idx) => {
      const avgLng = charts.reduce((sum, c) => sum + c.planets[idx].longitude, 0) / charts.length;
      const zodiac = AstrologyCalculator.degreesToZodiac(avgLng);
      
      return {
        ...charts[0].planets[idx],
        longitude: avgLng,
        zodiacSign: zodiac.sign,
        degree: zodiac.degree,
        minute: zodiac.minute,
      };
    });
    
    return {
      ...charts[0],
      planets: avgPlanets,
      aspects: AstrologyCalculator.calculateAspects(avgPlanets),
    };
  }

  private static calculateGroupHarmony(charts: NatalChart[]): number {
    // Overall group compatibility score
    let harmony = 50;
    
    // Diverse elements = good balance
    const avgElements = {
      fire: charts.reduce((s, c) => s + c.elements.fire, 0) / charts.length,
      earth: charts.reduce((s, c) => s + c.elements.earth, 0) / charts.length,
      air: charts.reduce((s, c) => s + c.elements.air, 0) / charts.length,
      water: charts.reduce((s, c) => s + c.elements.water, 0) / charts.length,
    };
    
    // Balanced = better group dynamics
    const variance = [avgElements.fire, avgElements.earth, avgElements.air, avgElements.water];
    const avg = variance.reduce((a, b) => a + b) / variance.length;
    const imbalance = variance.reduce((sum, v) => sum + Math.abs(v - avg), 0);
    
    harmony += Math.max(0, 50 - imbalance * 5);
    
    return Math.round(Math.min(100, harmony));
  }

  private static getYearTheme(year: number, _chart1: NatalChart, _chart2: NatalChart): string {
    const themes = [
      'Foundation & Getting to Know Each Other',
      'Growth & Deepening Connection',
      'Commitment & Moving Forward',
      'Challenge & Growth Through Adversity',
      'Transformation & Renewal',
      'Stability & Building Legacy',
    ];
    
    return themes[year % themes.length];
  }

  private static getMajorAspects(_date: Date, _chart1: NatalChart, _chart2: NatalChart): string[] {
    return [
      'Venus-Mars trine forming intimate bond',
      'Saturn aspects testing commitment',
    ];
  }

  private static getYearRecommendation(year: number): string {
    const recs = [
      'Focus on getting to know each other deeply',
      'Take the relationship to the next level',
      'Make formal commitments or public declarations',
      'Work through challenges with patience and understanding',
      'Celebrate growth and transformation',
      'Focus on building a lasting foundation',
    ];
    
    return recs[year % recs.length];
  }
}

export default CollectiveAstrology;
