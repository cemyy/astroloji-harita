// AI-Powered Interpretation Module - Generate comprehensive astrological readings

import { NatalChart, BirthData, SynastryAnalysis, MundaneChart } from './astrology/types';

export class AIInterpretation {
  
  /**
   * Generate comprehensive natal chart interpretation using AI
   */
  static async interpretNatalChart(chart: NatalChart, language: string = 'en'): Promise<string> {
    const prompt = this.buildNatalChartPrompt(chart, language);
    return await this.callAIAPI(prompt);
  }

  /**
   * Generate relationship compatibility reading
   */
  static async interpretSynastry(synastry: SynastryAnalysis, language: string = 'en'): Promise<string> {
    const prompt = this.buildSynastryPrompt(synastry, language);
    return await this.callAIAPI(prompt);
  }

  /**
   * Generate life guidance based on current transits
   */
  static async getYearlyForecast(chart: NatalChart, year: number, language: string = 'en'): Promise<string> {
    const prompt = this.buildYearlyForecastPrompt(chart, year, language);
    return await this.callAIAPI(prompt);
  }

  /**
   * Generate interpretation for mundane/world events
   */
  static async interpretMundaneChart(chart: MundaneChart, language: string = 'en'): Promise<string> {
    const prompt = this.buildMundanePrompt(chart, language);
    return await this.callAIAPI(prompt);
  }

  private static buildNatalChartPrompt(chart: NatalChart, language: string): string {
    const birthInfo = `
Birth Information:
- Date: ${chart.birthData.day}/${chart.birthData.month}/${chart.birthData.year}
- Time: ${chart.birthData.hour || 'Unknown'}:${chart.birthData.minute || '00'}
- Location: ${chart.birthData.locationName}
- Latitude: ${chart.birthData.latitude}
- Longitude: ${chart.birthData.longitude}

Planets Positions:
${chart.planets.map(p => `- ${p.planet}: ${p.zodiacSign} ${p.degree}°${p.minute}' ${p.retrograde ? '(Retrograde)' : ''}`).join('\n')}

Houses:
${chart.houses.slice(0, 4).map(h => `- House ${h.number} (${['1st', '10th'][h.number % 10] || h.number}): ${h.zodiacSign} ${h.degree}°${h.minute}'`).join('\n')}

Major Aspects:
${chart.aspects.filter(a => a.isActive).slice(0, 10).map(a => `- ${a.planet1} ${a.type} ${a.planet2} (${a.angle.toFixed(1)}°)`).join('\n')}

Element Balance: Fire ${chart.elements.fire}, Earth ${chart.elements.earth}, Air ${chart.elements.air}, Water ${chart.elements.water}
Quality Balance: Cardinal ${chart.qualities.cardinal}, Fixed ${chart.qualities.fixed}, Mutable ${chart.qualities.mutable}

Please provide a comprehensive, in-depth interpretation of this natal chart in ${language}.
Include:
1. Overall personality and life purpose indicated by the chart
2. Sun sign (core identity and ego)
3. Moon sign (emotional nature and inner needs)
4. Rising sign/Ascendant (outward appearance and first impression)
5. Venus and Mars (love and desire nature)
6. Saturn's placement (life lessons and maturation)
7. North Node (soul's evolutionary direction)
8. Major aspects and their meanings
9. Element and quality balance interpretation
10. Karmic patterns and past incarnation hints
11. Strengths and challenges
12. Potential life path and talents
13. Areas for growth and healing
14. Recommendation for personal development

Make the interpretation deeply meaningful, specific to this chart's unique configuration, and spiritually insightful.
`;
    
    return birthInfo;
  }

  private static buildSynastryPrompt(synastry: SynastryAnalysis, language: string): string {
    const synastryInfo = `
Relationship Analysis between ${synastry.person1} and ${synastry.person2}:

Compatibility Scores:
- Overall: ${synastry.compatibility.overall}%
- Emotional: ${synastry.compatibility.emotional}%
- Intellectual: ${synastry.compatibility.intellectual}%
- Physical/Romantic: ${synastry.compatibility.physical}%
- Karmic: ${synastry.compatibility.karmic}%

Major Cross-Chart Aspects:
${synastry.aspects.slice(0, 15).map(a => `- ${a.planet1} ${a.type} ${a.planet2} (${a.angle.toFixed(1)}°)`).join('\n')}

Please provide a comprehensive relationship analysis in ${language} that includes:
1. Overall compatibility and relationship potential
2. Strengths of this pairing
3. Potential challenges and friction points
4. Emotional compatibility (Moon signs and Venus placements)
5. Communication compatibility (Mercury interactions)
6. Sexual and romantic chemistry (Mars-Venus dynamics)
7. Balance of power and equality
8. Growth potential - what each person teaches the other
9. Timeline for relationship development
10. Specific advice for making the relationship work
11. Karmic purpose of this connection
12. Red flags or warning signs
13. Best times to work on relationship
14. Long-term potential

Make the analysis honest, compassionate, and practical.
`;
    
    return synastryInfo;
  }

  private static buildYearlyForecastPrompt(chart: NatalChart, year: number, language: string): string {
    return `
Create a comprehensive yearly forecast for ${year} for someone with:
- Sun in ${chart.planets[0]?.zodiacSign} (approximately)
- Moon in ${chart.planets[1]?.zodiacSign} (approximately)
- Rising sign/Ascendant in ${chart.ascendant.zodiacSign || 'Unknown'}

Current planetary positions and transits for ${year}:
(Include major transits, progressions, and solar returns)

Provide an in-depth forecast in ${language} covering:
1. Overall theme for the year
2. Month-by-month breakdown with key transits
3. Career and finances
4. Relationships and social life
5. Health and physical well-being
6. Personal growth and spiritual development
7. Challenges and how to navigate them
8. Opportunities and when to seize them
9. Mercury retrogrades and their impact
10. Full moons and new moons timing
11. Best timing for major decisions
12. Recommendations for making the most of the year's energy

Be specific with dates and practical guidance.
`;
  }

  private static buildMundanePrompt(chart: MundaneChart, language: string): string {
    return `
Analyze this world event from an astrological perspective for ${chart.eventDate.toLocaleDateString()}:

Event: ${chart.eventDate.toISOString()}
Location: ${chart.location ? `${chart.location.latitude}, ${chart.location.longitude}` : 'Global'}

Planetary positions at event:
${chart.planets.map(p => `- ${p.planet}: ${p.zodiacSign} ${p.degree}°`).join('\n')}

Provide an interpretation in ${language} including:
1. Astrological significance of this event's timing
2. Major planetary aspects active at this moment
3. Expected collective impact
4. Long-term implications
5. Similar historical events during similar planetary configurations
6. How this affects different regions/countries
7. Likely follow-up developments
8. Healing and learning opportunities
9. Global consciousness implications
10. Recommendation for how humanity should respond

Provide deep spiritual and practical insight.
`;
  }

  /**
   * Call AI API (OpenAI GPT-4)
   * Falls back to template-based interpretation if API unavailable
   */
  private static async callAIAPI(prompt: string): Promise<string> {
    try {
      // Get API key from environment
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      
      if (!apiKey) {
        console.warn('OpenAI API key not configured (NEXT_PUBLIC_OPENAI_API_KEY). Using template interpretation.');
        console.info('To enable AI features, add NEXT_PUBLIC_OPENAI_API_KEY to .env.local');
        return this.getTemplateInterpretation();
      }

      // Call OpenAI API with GPT-4
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo',
          messages: [
            {
              role: 'system',
              content: `You are an expert Western astrologer with decades of experience in natal chart interpretation, transits, and personal consulting. 
Your interpretations are:
- Deep and insightful, going beyond surface-level descriptions
- Spiritually aware but grounded in practical life guidance
- Compassionate and non-judgmental
- Specific to the individual's unique chart configuration
- Include both strengths/gifts and challenges/lessons
- Written for someone who may be new to astrology but wants real depth`,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 3000,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('OpenAI API error:', error);
        return this.getTemplateInterpretation();
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        console.error('No content in OpenAI response');
        return this.getTemplateInterpretation();
      }

      return content;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return this.getTemplateInterpretation();
    }
  }

  private static getTemplateInterpretation(): string {
    return `
This is a placeholder interpretation. To generate comprehensive AI-powered readings:

1. Set up your OpenAI API key in environment variables
   - Create .env.local file with: NEXT_PUBLIC_OPENAI_API_KEY=your_key
   
2. The system will generate detailed interpretations based on:
   - Planetary positions in zodiac signs and houses
   - Aspects between planets
   - Element and quality balances
   - Lunar nodes (karmic direction)
   - Transiting planets
   - Progressions and directions
   - Solar returns

3. Interpretations cover:
   - Personality and life purpose
   - Talents, strengths, and lessons
   - Relationship dynamics
   - Yearly forecasts
   - Spiritual development
   - Career guidance
   - Health and wellness

To enable full AI features, configure your API key and the system will provide comprehensive, personalized astrological readings.
    `;
  }

  /**
   * Generate simple text-based interpretation without AI
   */
  static generateBasicInterpretation(chart: NatalChart): string {
    const sunSign = chart.planets[0]?.zodiacSign || 'Unknown';
    const moonSign = chart.planets[1]?.zodiacSign || 'Unknown';
    const risingSign = chart.ascendant?.zodiacSign || 'Unknown';
    
    return `
# Natal Chart Interpretation

## Core Identity
**Sun Sign:** ${sunSign}
Your core essence and life purpose. ${sunSign} individuals are known for their ${this.getSunSignTraits(sunSign)}.

## Emotional Nature  
**Moon Sign:** ${moonSign}
Your inner emotional world and how you process feelings. ${moonSign} moons ${this.getMoonSignTraits(moonSign)}.

## Outer Personality
**Rising Sign (Ascendant):** ${risingSign}
How others perceive you at first meeting. You come across as ${risingSign}.

## Elemental Balance
This chart shows strength in ${this.getElementalInterpretation(chart.elements)} energies.

## Major Aspects
${chart.aspects.filter(a => a.isActive).slice(0, 5).map(a => `- **${a.planet1} ${a.type} ${a.planet2}**: ${this.getAspectInterpretation(a)}`).join('\n')}

## Life Path
This chart indicates a soul moving toward ${chart.planets.length > 0 ? 'deep growth and transformation' : 'unknown'}.

*(For comprehensive AI-powered interpretation, please configure your API key)*
    `;
  }

  private static getSunSignTraits(sign: string): string {
    const traits: Record<string, string> = {
      'Aries': 'courage, initiative, and pioneering spirit',
      'Taurus': 'stability, loyalty, and love of beauty',
      'Gemini': 'curiosity, communication, and versatility',
      'Cancer': 'nurturing, sensitivity, and emotional depth',
      'Leo': 'creativity, confidence, and generosity',
      'Virgo': 'analysis, service, and self-improvement',
      'Libra': 'balance, harmony, and relationship skills',
      'Scorpio': 'intensity, transformation, and depth',
      'Sagittarius': 'exploration, wisdom, and optimism',
      'Capricorn': 'responsibility, ambition, and discipline',
      'Aquarius': 'innovation, individuality, and humanitarianism',
      'Pisces': 'compassion, intuition, and spirituality',
    };
    return traits[sign] || 'unique qualities';
  }

  private static getMoonSignTraits(sign: string): string {
    const traits: Record<string, string> = {
      'Aries': 'need quick emotional responses and active engagement',
      'Taurus': 'need security and stable emotional foundation',
      'Gemini': 'need mental stimulation and variety in relationships',
      'Cancer': 'need deep emotional bonding and nurturing',
      'Leo': 'need recognition and to feel special',
      'Virgo': 'need order, improvement, and reliable support',
      'Libra': 'need harmony, beauty, and partnership',
      'Scorpio': 'need depth, intensity, and emotional transformation',
      'Sagittarius': 'need freedom, exploration, and meaning',
      'Capricorn': 'need structure, respect, and achievement',
      'Aquarius': 'need independence, uniqueness, and intellectual connection',
      'Pisces': 'need compassion, imagination, and spiritual connection',
    };
    return traits[sign] || 'emotional depth and understanding';
  }

  private static getElementalInterpretation(elements: Record<string, number>): string {
    const max = Math.max(elements.fire, elements.earth, elements.air, elements.water);
    const el = Object.keys(elements).find(k => elements[k as keyof typeof elements] === max);
    return el ? `${el}` : 'balanced';
  }

  private static getAspectInterpretation(aspect: any): string {
    const interpretations: Record<string, string> = {
      'Conjunction': 'Blending of energies - powerful but unified force',
      'Sextile': 'Harmonious flow - natural talent and ease',
      'Square': 'Challenge - drives growth through friction',
      'Trine': 'Fortunate flow - gifts and natural abilities',
      'Opposition': 'Polarity - integration of opposites creates wholeness',
    };
    return interpretations[aspect.type] || 'significant interaction';
  }
}

export default AIInterpretation;
