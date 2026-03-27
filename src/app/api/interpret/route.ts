import { NextRequest, NextResponse } from 'next/server';
import AIInterpretation from '@/lib/ai/interpretation';
import { NatalChart, SynastryAnalysis, MundaneChart } from '@/lib/astrology/types';

// Local interpretation endpoint - no API keys required
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { chart, type = 'natal', language = 'en' } = body;

    if (!chart) {
      return NextResponse.json(
        { error: 'Chart data is required' },
        { status: 400 }
      );
    }

    let interpretation: string;

    // Generate interpretation locally using astrology algorithms
    switch (type) {
      case 'natal':
        interpretation = await AIInterpretation.interpretNatalChart(chart as NatalChart, language);
        break;
      case 'synastry':
        interpretation = await AIInterpretation.interpretSynastry(chart as SynastryAnalysis, language);
        break;
      case 'forecast':
        const year = new Date().getFullYear();
        interpretation = await AIInterpretation.getYearlyForecast(chart as NatalChart, year, language);
        break;
      case 'mundane':
        interpretation = await AIInterpretation.interpretMundaneChart(chart as MundaneChart, language);
        break;
      default:
        interpretation = await AIInterpretation.interpretNatalChart(chart as NatalChart, language);
    }

    return NextResponse.json({ 
      content: interpretation,
      type,
      language,
      generatedAt: new Date().toISOString(),
      source: 'local-astrology-engine'
    });
  } catch (error) {
    console.error('Interpretation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate interpretation' },
      { status: 500 }
    );
  }
}
