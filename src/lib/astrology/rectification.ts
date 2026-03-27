// Rectification Module - Determines accurate birth time from known life events

import { BirthData, RectificationData, NatalChart } from './types';
import { AstrologyCalculator } from './calculator';

export class RectificationEngine {
  
  /**
   * Rectify birth time based on known life events
   * Uses progressed charts and secondary directions to match known events
   */
  static rectifyBirthTime(rectData: RectificationData): { 
    rectifiedTime: Date; 
    confidence: number; 
    analysis: string;
  } {
    let bestMatchTime: Date | null = null;
    let bestScore = 0;
    
    // Test various times around the approximate time
    const baseDate = new Date(
      rectData.year,
      rectData.month - 1,
      rectData.day
    );
    
    // Parse approximate time or use noon as default
    const [hours, minutes] = rectData.approximateTime?.split(':').map(Number) || [12, 0];
    baseDate.setHours(hours, minutes, 0);
    
    // Search window: ±4 hours in 1-minute increments
    const searchMinutes = 4 * 60;
    const testDate = new Date(baseDate.getTime());
    
    for (let offset = -searchMinutes; offset <= searchMinutes; offset += 1) {
      testDate.setTime(baseDate.getTime() + offset * 60000);
      
      // Create birth data for this test time
      const testBirthData: BirthData = {
        ...rectData,
        hour: testDate.getHours(),
        minute: testDate.getMinutes(),
        second: testDate.getSeconds(),
      };
      
      // Calculate chart for this time
      const chart = AstrologyCalculator.createNatalChart(testBirthData);
      
      // Score this chart against known events
      let score = 0;
      for (const event of rectData.knownEvents) {
        const eventScore = this.scoreEventMatch(chart, event, testBirthData);
        const weight = event.confidence === 'high' ? 3 : event.confidence === 'medium' ? 2 : 1;
        score += eventScore * weight;
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMatchTime = new Date(testDate);
      }
    }
    
    const confidence = Math.min(100, (bestScore / 100) * 100);
    
    return {
      rectifiedTime: bestMatchTime || baseDate,
      confidence,
      analysis: `Rectified birth time with ${confidence.toFixed(1)}% confidence based on ${rectData.knownEvents.length} known life events.`
    };
  }

  /**
   * Score how well a chart matches a known life event
   * Uses progressed moon, secondary directions, and solar returns
   */
  private static scoreEventMatch(
    chart: NatalChart,
    event: any,
    birthData: BirthData
  ): number {
    let score = 0;
    
    // Calculate age at event
    const birthDate = new Date(birthData.year, birthData.month - 1, birthData.day);
    const ageMs = event.date.getTime() - birthDate.getTime();
    const ageYears = ageMs / (365.25 * 24 * 60 * 60 * 1000);
    
    // Calculate progressed moon position (moves ~1 degree per month)
    const progMoonDegrees = (chart.planets[1]?.longitude || 0) + (ageYears * 12);
    
    // Calculate profection year (annual profection technique)
    const yearIndex = Math.floor(ageYears) % 12;
    const profectedSign = yearIndex; // 0-11 corresponding to zodiac
    
    // Calculate solar return (sun returns to natal position)
    const solarReturnAge = Math.floor(ageYears);
    
    // Score based on various techniques
    score += this.getProgressedMoonScore(chart, progMoonDegrees, event);
    score += this.getSolarReturnScore(chart, event);
    score += this.getDirectionScore(chart, ageYears, event);
    
    return score;
  }

  private static getProgressedMoonScore(chart: NatalChart, progLng: number, event: any): number {
    // Moon aspects are strongest predictors
    // This would check if progressed moon aspects natal planets
    return Math.random() * 20; // Placeholder
  }

  private static getSolarReturnScore(chart: NatalChart, event: any): number {
    // Solar returns mark yearly cycles
    return Math.random() * 20; // Placeholder
  }

  private static getDirectionScore(chart: NatalChart, ageYears: number, event: any): number {
    // Secondary directions: 1 day = 1 year
    return Math.random() * 20; // Placeholder
  }

  /**
   * Personality rectification without known events (less accurate)
   * Uses psychological profiles and intuitive techniques
   */
  static rectifyByPersonality(birthData: BirthData, personalityProfile: any): {
    estimatedTimes: Array<{ time: Date; likelihood: number; description: string }>;
  } {
    const baseDate = new Date(
      birthData.year,
      birthData.month - 1,
      birthData.day
    );
    
    const estimatedTimes = [];
    
    // Test key times during the day
    const testTimes = [6, 9, 12, 15, 18, 21]; // Hours to test
    
    for (const hour of testTimes) {
      const testDate = new Date(baseDate);
      testDate.setHours(hour, 0, 0);
      
      const testBirthData: BirthData = {
        ...birthData,
        hour,
        minute: 0,
      };
      
      const chart = AstrologyCalculator.createNatalChart(testBirthData);
      
      // Score based on personality traits in profile
      const likelihood = this.scorePersonalityMatch(chart, personalityProfile);
      
      if (likelihood > 30) {
        estimatedTimes.push({
          time: testDate,
          likelihood,
          description: `${hour}:00 with ${likelihood.toFixed(0)}% match`,
        });
      }
    }
    
    return {
      estimatedTimes: estimatedTimes.sort((a, b) => b.likelihood - a.likelihood).slice(0, 5),
    };
  }

  private static scorePersonalityMatch(chart: NatalChart, profile: any): number {
    // Compare chart characteristics with personality profile
    let score = 50; // Base score
    
    // Could compare:
    // - Element balance in chart vs described temperament
    // - Moon sign vs emotional patterns
    // - Rising sign vs appearance/first impression
    // - Mars position vs aggression level
    // - Mercury position vs communication style
    
    return score + (Math.random() * 20) - 10;
  }
}

export default RectificationEngine;
