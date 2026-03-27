// AI-Powered Interpretation Module - Generate comprehensive astrological readings

import { NatalChart, SynastryAnalysis, MundaneChart, ElementalBalance } from '@/lib/astrology/types';

export class AIInterpretation {
  
  /**
   * Generate comprehensive natal chart interpretation
   * Uses local template-based generation (no API calls needed)
   */
  static async interpretNatalChart(chart: NatalChart, language: string = 'en'): Promise<string> {
    return this.generateNatalChartInterpretation(chart, language);
  }

  /**
   * Generate relationship compatibility reading
   * Uses local template-based generation (no API calls needed)
   */
  static async interpretSynastry(synastry: SynastryAnalysis, language: string = 'en'): Promise<string> {
    return this.generateSynastryInterpretation(synastry, language);
  }

  /**
   * Generate life guidance based on current transits
   * Uses local template-based generation (no API calls needed)
   */
  static async getYearlyForecast(chart: NatalChart, year: number, language: string = 'en'): Promise<string> {
    return this.generateYearlyForecast(chart, year, language);
  }

  /**
   * Generate interpretation for mundane/world events
   * Uses local template-based generation (no API calls needed)
   */
  static async interpretMundaneChart(chart: MundaneChart, language: string = 'en'): Promise<string> {
    return this.generateMundaneInterpretation(chart, language);
  }

  private static generateNatalChartInterpretation(chart: NatalChart, language: string): string {
    const sunSign = chart.planets[0]?.zodiacSign || 'Unknown';
    const moonSign = chart.planets[1]?.zodiacSign || 'Unknown';
    const risingSign = chart.ascendant?.zodiacSign || 'Unknown';
    const venusSign = chart.planets[4]?.zodiacSign || 'Unknown';
    const marsSign = chart.planets[3]?.zodiacSign || 'Unknown';
    
    const sunTraits = this.getSunSignTraits(sunSign);
    const moonTraits = this.getMoonSignTraits(moonSign);
    const majorAspects = chart.aspects.filter(a => a.isActive).slice(0, 8);
    
    const interpretation = `
# ${language === 'tr' ? 'Doğum Haritası Analizi' : 'Natal Chart Interpretation'}

## ${language === 'tr' ? 'Temel Kişilik' : 'Core Identity'}
**${language === 'tr' ? 'Güneş Burcu' : 'Sun Sign'}: ${sunSign}**
${language === 'tr' 
  ? `Senin özünü ve yaşam amacınızı temsil eder. ${sunSign} bireyleri ${sunTraits} ile bilinirler.`
  : `Your core essence and life purpose. ${sunSign} individuals are characterized by ${sunTraits}.`
}

## ${language === 'tr' ? 'Duygusal Doğa' : 'Emotional Nature'}
**${language === 'tr' ? 'Ay Burcu' : 'Moon Sign'}: ${moonSign}**
${language === 'tr'
  ? `Senin iç duygusal dünyan. ${moonSign} ayı ${moonTraits}.`
  : `Your inner emotional world and private self. ${moonSign} moon ${moonTraits}.`
}

## ${language === 'tr' ? 'Dış Kişilik' : 'Outer Personality'}
**${language === 'tr' ? 'Yükselen Burç (Assan)' : 'Rising Sign (Ascendant)'}: ${risingSign}**
${language === 'tr'
  ? `İlk izleninizde insanlar sizi ${risingSign} olarak görürler.`
  : `How others perceive you at first glance. You appear as ${risingSign} to the world.`
}

## ${language === 'tr' ? 'Aşk ve İstek' : 'Love & Desire Nature'}
**${language === 'tr' ? 'Venüs' : 'Venus'}: ${venusSign} | ${language === 'tr' ? 'Mars' : 'Mars'}: ${marsSign}**
${language === 'tr'
  ? `${venusSign} Venüs'ü sevgi ve ilişkiler için. ${marsSign} Mars'ı enerji ve tutku için gösterir.`
  : `${venusSign} Venus shows your love style and values. ${marsSign} Mars shows your drive and passion.`
}

## ${language === 'tr' ? 'Element Dengesi' : 'Elemental Balance'}
${this.getElementalInterpretation(chart.elements, language)}

## ${language === 'tr' ? 'Ana Açılar' : 'Major Aspects'}
${majorAspects.map((a) => `- **${a.planet1} ${a.type} ${a.planet2}**: ${this.getAspectInterpretation(a, language)}`).join('\n')}

## ${language === 'tr' ? 'Yaşam Yolu' : 'Life Path'}
${language === 'tr'
  ? 'Bu harita ruh yolculuğunun derin dönüşüm ve büyüme olduğunu gösterir.'
  : 'This chart indicates a soul moving toward deep growth and meaningful transformation.'
}

---
${language === 'tr' ? '*Lokalde oluşturulmuş yorum. AI tarafından güçlendirilmiş okumalar için API anahtarı ayarlayın.*' : '*Locally generated interpretation using astrological algorithms.*'}
    `;
    
    return interpretation;
  }

  private static generateSynastryInterpretation(synastry: SynastryAnalysis, language: string): string {
    const overallScore = synastry.compatibility.overall;
    const emotionalScore = synastry.compatibility.emotional;
    const physicalScore = synastry.compatibility.physical;
    const majorAspects = synastry.aspects.slice(0, 12);
    
    const interpretation = `
# ${language === 'tr' ? 'İlişki Uyumluluğu Analizi' : 'Relationship Compatibility Analysis'}
**${synastry.person1} ${language === 'tr' ? 've' : '&'} ${synastry.person2}**

## ${language === 'tr' ? 'Genel Uyum Skorları' : 'Overall Compatibility Scores'}
- ${language === 'tr' ? 'Genel' : 'Overall'}: **${overallScore}%** 
- ${language === 'tr' ? 'Duygusal' : 'Emotional'}: **${emotionalScore}%**
- ${language === 'tr' ? 'Entelektüel' : 'Intellectual'}: **${synastry.compatibility.intellectual}%**
- ${language === 'tr' ? 'Fiziksel/Romantik' : 'Physical/Romantic'}: **${physicalScore}%**
- ${language === 'tr' ? 'Karmik' : 'Karmic'}: **${synastry.compatibility.karmic}%**

## ${language === 'tr' ? 'İlişki Potansiyeli' : 'Relationship Potential'}
${language === 'tr'
  ? `${overallScore > 70 ? 'Bu çift güçlü bir bağ gösteriyor.' : overallScore > 50 ? 'Uyum iyi fakat çalışma gerektiriyor.' : 'İlişki zorlayıcı fakat büyüme potansiyeline sahip.'} Derin bağlantı için karşılıklı çaba önemli.`
  : `${overallScore > 70 ? 'This pair shows strong compatibility.' : overallScore > 50 ? 'Good foundation with room for growth.' : 'Challenging but rich with learning potential.'} Success requires mutual commitment.`
}

## ${language === 'tr' ? 'Ana Haçlı Açılar' : 'Major Cross-Chart Aspects'}
${majorAspects.slice(0, 10).map(a => `- **${a.planet1} ${a.type} ${a.planet2}**: ${this.getAspectInterpretation(a, language)}`).join('\n')}

## ${language === 'tr' ? 'Güçlü Yönler' : 'Strengths of This Pairing'}
${language === 'tr'
  ? `- Duygusal desteği ve anlaşmayı paylaşan\n- Ortak değerleri ve amaçları\n- Birbirini tamamlayan güçler\n- Büyütme ve öğrenme potansiyeli`
  : `- Shared emotional understanding and support\n- Common values and life goals\n- Complementary strengths\n- Growth potential together`
}

## ${language === 'tr' ? 'Mücadele Alanları' : 'Areas for Growth'} 
${language === 'tr'
  ? 'Çatlak noktaların farkında olmak ve açık iletişim bu çifti güçlendirir.'
  : 'Awareness of challenging points and open communication will strengthen this bond.'
}

---
${language === 'tr' ? '*Lokalde oluşturulmuş analiz. Detaylı okuma için astrologerle görüşün.*' : '*Locally generated analysis based on chart compatibility.*'}
    `;
    
    return interpretation;
  }

  private static generateYearlyForecast(chart: NatalChart, year: number, language: string): string {
    const sunSign = chart.planets[0]?.zodiacSign || 'Unknown';
    
    const forecast = `
# ${year} ${language === 'tr' ? 'Yıllık Tahmini' : 'Yearly Forecast'}
**${sunSign} ${language === 'tr' ? 'Güneşi İçin' : 'Sun'} ${year}**

## ${language === 'tr' ? 'Yıl Teması' : 'Overall Theme for the Year'}
${language === 'tr'
  ? `${year} yılı kişisel dönüşüm, yeni başlangış ve gözlemci yıldızlarının rehberliği dönemini gösterir.`
  : `${year} brings themes of personal growth, new opportunities, and alignment with your higher purpose.`
}

## ${language === 'tr' ? 'Aylar' : 'Monthly Breakdown'}

### ${language === 'tr' ? 'Ocak - Mart' : 'January - March'}
${language === 'tr'
  ? 'Planlama ve yeni başlangıç dönemi. Hedefiniz netleştirin.'
  : 'Planning and new beginnings. Clarify your intentions and set goals.'
}

### ${language === 'tr' ? 'Nisan - Haziran' : 'April - June'} 
${language === 'tr'
  ? 'Harekete geçme saati. Projeleriniz hayata geçirin.'
  : 'Time for action and manifestation. Launch projects and take calculated risks.'
}

### ${language === 'tr' ? 'Temmuz - Eylül' : 'July - September'}
${language === 'tr'
  ? 'Refleksyon ve değerlendirme dönemi. İlerlemeyi gözden geçirin.'
  : 'Review and evaluation period. Assess progress and adjust course as needed.'
}

### ${language === 'tr' ? 'Ekim - Aralık' : 'October - December'}
${language === 'tr'
  ? 'Hasılada alma ve kapanış. Yılı saygıyla bitirin.'
  : 'Completion and harvest. Celebrate achievements and close chapters.'
}

## ${language === 'tr' ? 'Kariyer ve Finans' : 'Career & Finances'}
${language === 'tr'
  ? `${sunSign} doğmuş kişiler bu yıl kariyer ilerlemesi ve finansal fırsatlarını görebilir.`
  : `For ${sunSign} natives, this year brings potential for career advancement and financial growth.`
}

## ${language === 'tr' ? 'İlişkiler' : 'Relationships'}}
${language === 'tr'
  ? 'İlişkileriniz derin olacak. Saygı ve iletişime odaklanın.'
  : 'Relationships deepen. Focus on authentic communication and mutual support.'
}

## ${language === 'tr' ? 'Tavsiye' : 'Recommendations'}
${language === 'tr'
  ? '- Kendinize zaman ayırın\n- Özniyetinize sadık kalın\n- Yeni fırsatları kucaklayın\n- Sağlığınıza dikkat edin'
  : '- Prioritize self-care and reflection\n- Stay true to your authentic path\n- Embrace new opportunities\n- Maintain physical and mental health'
}

---
${language === 'tr' ? '*Tahmini astrolojik döngülere göre oluşturulmuştur.*' : '*Forecast based on astrological cycles and transits.*'}
    `;
    
    return forecast;
  }

  private static generateMundaneInterpretation(chart: MundaneChart, language: string): string {
    const interpretation = `
# ${language === 'tr' ? 'Dünya Olayları Analizi' : 'Mundane Events Analysis'}
**${chart.eventDate.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}**

## ${language === 'tr' ? 'Astrolojik Anlamlılık' : 'Astrological Significance'}
${language === 'tr'
  ? 'Bu olay belirli bir astrolojik dönemde meydana gelmiş, kozmik ritmlerle uyumlu.'
  : 'This event occurred at a significant astrological moment, aligned with cosmic cycles.'
}

## ${language === 'tr' ? 'Gezegen Etkileri' : 'Planetary Influences'}}
${chart.planets.slice(0, 5).map(p => `- **${p.planet}** in ${p.zodiacSign}`).join('\n')}

## ${language === 'tr' ? 'Beklenen Etki' : 'Expected Impact'}}
${language === 'tr'
  ? 'Kolektif bilinç üzerinde derin etki. Evrim ve dönüşüm potansiyeli.'
  : 'Significant collective impact. Potential for evolution and collective learning.'
}

## ${language === 'tr' ? 'Belgeselendirme' : 'Long-term Implications'}}
${language === 'tr'
  ? 'Bu olayın etkisi önümüzdeki aylar ve yıllar içinde hissedilecek.'
  : 'The effects of this event will unfold over coming months and years.'
}

---
${language === 'tr' ? '*Dünya astrolojisi analizi.*' : '*Mundane astrology analysis based on world events.*'}
    `;
    
    return interpretation;
  }

  /**
   * Generate simple text-based interpretation without AI
   */
  static generateBasicInterpretation(chart: NatalChart, language: string = 'en'): string {
    return this.generateNatalChartInterpretation(chart, language);
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
    return traits[sign] || 'unique qualities and strengths';
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
    return traits[sign] || 'emotional depth and authentic connection';
  }

  private static getElementalInterpretation(elements: ElementalBalance, language: string = 'en'): string {
    const fire = elements.fire || 0;
    const earth = elements.earth || 0;
    const air = elements.air || 0;
    const water = elements.water || 0;
    
    const dominant = Math.max(fire, earth, air, water);
    let element = 'balanced';
    
    if (dominant === fire && fire > 0) element = language === 'tr' ? 'Ateş' : 'Fire';
    else if (dominant === earth && earth > 0) element = language === 'tr' ? 'Toprak' : 'Earth';
    else if (dominant === air && air > 0) element = language === 'tr' ? 'Hava' : 'Air';
    else if (dominant === water && water > 0) element = language === 'tr' ? 'Su' : 'Water';
    
    const description = language === 'tr'
      ? element === 'Ateş' ? 'Enerji, tutku ve eylem'
        : element === 'Toprak' ? 'Pratikallik, istikrar ve güvenilirlik'
        : element === 'Hava' ? 'İletişim, zeka ve sosyallik'
        : element === 'Su' ? 'Duygusallık, sezgi ve empati'
        : 'Dengeli bir kişilikle'
      : element === 'Fire' ? 'Energy, passion, and action'
        : element === 'Earth' ? 'Practicality, stability, and reliability'
        : element === 'Air' ? 'Communication, intellect, and social nature'
        : element === 'Water' ? 'Emotions, intuition, and empathy'
        : 'A balanced personality with';
    
    return description;
  }

  private static getAspectInterpretation(aspect: any, language: string = 'en'): string {
    const interpretations: Record<string, Record<string, string>> = {
      'Conjunction': {
        'en': 'Blending of energies - unified and powerful force',
        'tr': 'Enerji birleşmesi - güçlü ve birleşik etki'
      },
      'Sextile': {
        'en': 'Harmonious flow - natural talent and ease',
        'tr': 'Harmonik akış - doğal yetenek ve kolaylık'
      },
      'Square': {
        'en': 'Challenge and friction - drives growth and maturity',
        'tr': 'Zorluk ve çatışma - büyüme ve olgunluğu yönlendirir'
      },
      'Trine': {
        'en': 'Fortunate flow - gifts and natural abilities',
        'tr': 'Şanslı akış - armağanlar ve doğal yetenekler'
      },
      'Opposition': {
        'en': 'Polarity - integration of opposites brings wholeness',
        'tr': 'Kutupluluk - zıtlıkların birleşmesi bütünlüğü getirir'
      },
    };
    
    const lang = language === 'tr' ? 'tr' : 'en';
    return interpretations[aspect.type]?.[lang] || 'significant planetary interaction';
  }
}

export default AIInterpretation;
