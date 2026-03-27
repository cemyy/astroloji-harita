import { NextRequest, NextResponse } from 'next/server';

// Server-side OpenAI API endpoint for safer API key handling
export async function POST(request: NextRequest) {
  const { prompt, type } = await request.json();

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  try {
    const systemPrompt =
      type === 'synastry'
        ? 'You are an expert relationship astrologer. Provide deep, insightful relationship analysis based on astrological compatibility.'
        : type === 'mundane'
        ? 'You are an expert in mundane astrology. Provide analysis of world events and global astrological trends.'
        : 'You are an expert Western astrologer. Provide comprehensive, insightful natal chart interpretations.';

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
            content: systemPrompt,
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
      return NextResponse.json(
        { error: 'Failed to generate interpretation' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: 'No content generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error('AI API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
