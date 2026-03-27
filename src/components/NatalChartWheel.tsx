'use client';

import { NatalChart, Planet, Zodiac } from '@/lib/astrology/types';
import { useRef } from 'react';

interface NatalChartWheelProps {
  chart: NatalChart;
  size?: number;
}

export default function NatalChartWheel({ chart, size = 600 }: NatalChartWheelProps) {
  const canvasRef = useRef<SVGSVGElement>(null);
  const center = size / 2;
  const radius = size / 2 - 40;

  const zodiacSigns = [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
    'Aquarius',
    'Pisces',
  ];

  const planetSymbols: Record<Planet, string> = {
    [Planet.Sun]: '☉',
    [Planet.Moon]: '☽',
    [Planet.Mercury]: '☿',
    [Planet.Venus]: '♀',
    [Planet.Mars]: '♂',
    [Planet.Jupiter]: '♃',
    [Planet.Saturn]: '♄',
    [Planet.Uranus]: '♅',
    [Planet.Neptune]: '♆',
    [Planet.Pluto]: '♇',
    [Planet.NorthNode]: '☊',
    [Planet.SouthNode]: '☋',
    [Planet.Chiron]: '⚷',
  };

  const zodiacColors: Record<Zodiac, string> = {
    [Zodiac.Aries]: '#ff6b6b',
    [Zodiac.Taurus]: '#a29bfe',
    [Zodiac.Gemini]: '#74b9ff',
    [Zodiac.Cancer]: '#81ecec',
    [Zodiac.Leo]: '#ffeaa7',
    [Zodiac.Virgo]: '#55efc4',
    [Zodiac.Libra]: '#fab1a0',
    [Zodiac.Scorpio]: '#fd79a8',
    [Zodiac.Sagittarius]: '#6c5ce7',
    [Zodiac.Capricorn]: '#00b894',
    [Zodiac.Aquarius]: '#fdcb6e',
    [Zodiac.Pisces]: '#e17055',
  };

  const degreesToRadians = (degrees: number): number => {
    return ((degrees - 90) * Math.PI) / 180;
  };

  const polarToCartesian = (radius: number, degrees: number) => {
    const angle = degreesToRadians(degrees);
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Draw zodiac ring
  const drawZodiacRing = () => {
    return (
      <>
        {/* Zodiac background sections */}
        {zodiacSigns.map((_, idx) => {
          const startDegree = idx * 30;
          const endDegree = (idx + 1) * 30;

          const start = polarToCartesian(radius, startDegree);
          const end = polarToCartesian(radius, endDegree);
          const startInner = polarToCartesian(radius - 50, startDegree);
          const endInner = polarToCartesian(radius - 50, endDegree);

          const largeArc = 0;
          const pathData = [
            `M ${start.x} ${start.y}`,
            `A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`,
            `L ${endInner.x} ${endInner.y}`,
            `A ${radius - 50} ${radius - 50} 0 ${largeArc} 0 ${startInner.x} ${startInner.y}`,
            'Z',
          ].join(' ');

          const zodiacSign = zodiacSigns[idx];
          const color = zodiacColors[zodiacSign as Zodiac];

          return (
            <g key={`zodiac-${idx}`}>
              <path d={pathData} fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" />
              {/* Zodiac label */}
              <text
                x={polarToCartesian(radius - 25, startDegree + 15).x}
                y={polarToCartesian(radius - 25, startDegree + 15).y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="11"
                fontWeight="600"
                fill={color}
                style={{ pointerEvents: 'none' }}
              >
                {zodiacSign.substring(0, 3).toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Degree markers */}
        {Array.from({ length: 360 }, (_, i) => i).map((degree) => {
          const isMainDegree = degree % 30 === 0;
          const isMajorDegree = degree % 10 === 0;

          if (!isMajorDegree) return null;

          const outer = polarToCartesian(radius, degree);
          const inner = isMainDegree
            ? polarToCartesian(radius - 15, degree)
            : polarToCartesian(radius - 8, degree);

          return (
            <line
              key={`degree-${degree}`}
              x1={outer.x}
              y1={outer.y}
              x2={inner.x}
              y2={inner.y}
              stroke="#334155"
              strokeWidth={isMainDegree ? '2' : '1'}
            />
          );
        })}
      </>
    );
  };

  // Draw houses
  const drawHouses = () => {
    return (
      <>
        {chart.houses.slice(0, 12).map((house, idx) => {
          const pos = polarToCartesian(radius - 60, house.longitude);
          const color = '#4f46e5';

          return (
            <g key={`house-${idx}`}>
              <line
                x1={center}
                y1={center}
                x2={pos.x}
                y2={pos.y}
                stroke={color}
                strokeWidth="1"
                opacity="0.5"
              />
              <circle cx={pos.x} cy={pos.y} r="4" fill={color} />
              <text
                x={pos.x}
                y={pos.y}
                dx="10"
                dy="3"
                fontSize="10"
                fill="#cbd5e1"
                fontWeight="600"
              >
                H{house.number}
              </text>
            </g>
          );
        })}
      </>
    );
  };

  // Draw planets
  const drawPlanets = () => {
    return (
      <>
        {chart.planets.map((planet, idx) => {
          const pos = polarToCartesian(radius - 100, planet.longitude);
          const symbol = planetSymbols[planet.planet];
          const color = zodiacColors[planet.zodiacSign];

          return (
            <g
              key={`planet-${idx}`}
              className="planet-point"
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r="12"
                fill="#1e293b"
                stroke={color}
                strokeWidth="2"
                style={{ transition: 'all 0.3s ease' }}
              />
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="14"
                fontWeight="bold"
                fill={color}
                style={{ pointerEvents: 'none' }}
              >
                {symbol}
              </text>
              <title>{planet.planet}</title>
            </g>
          );
        })}
      </>
    );
  };

  // Draw aspects
  const drawAspects = () => {
    const aspectColors: Record<string, string> = {
      Conjunction: '#ff6b6b',
      Opposition: '#d63031',
      Square: '#ff7675',
      Trine: '#00b894',
      Sextile: '#00b894',
      Quincunx: '#fdcb6e',
      'Semi-Square': '#e17055',
      Sesquisquare: '#d63031',
    };

    return (
      <>
        {chart.aspects
          .filter((a) => a.isActive)
          .slice(0, 15)
          .map((aspect, idx) => {
            const planet1 = chart.planets.find((p) => p.planet === aspect.planet1);
            const planet2 = chart.planets.find((p) => p.planet === aspect.planet2);

            if (!planet1 || !planet2) return null;

            const pos1 = polarToCartesian(radius - 100, planet1.longitude);
            const pos2 = polarToCartesian(radius - 100, planet2.longitude);
            const color = aspectColors[aspect.type] || '#cbd5e1';

            return (
              <g key={`aspect-${idx}`}>
                <line
                  x1={pos1.x}
                  y1={pos1.y}
                  x2={pos2.x}
                  y2={pos2.y}
                  stroke={color}
                  strokeWidth="1.5"
                  opacity="0.4"
                  strokeDasharray={aspect.type === 'Opposition' ? '5,5' : 'none'}
                />
              </g>
            );
          })}
      </>
    );
  };

  return (
    <div className="flex justify-center mb-6">
      <svg
        ref={canvasRef}
        width={size}
        height={size}
        className="border border-slate-600 rounded-lg bg-slate-700"
        style={{ filter: 'drop-shadow(0 0 10px rgba(79, 70, 229, 0.3))' }}
      >
        {/* Background circle */}
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#334155" strokeWidth="1" />
        <circle
          cx={center}
          cy={center}
          r={radius - 50}
          fill="none"
          stroke="#334155"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Zodiac ring */}
        {drawZodiacRing()}

        {/* Houses */}
        {drawHouses()}

        {/* Aspects */}
        {drawAspects()}

        {/* Planets */}
        {drawPlanets()}

        {/* Center circle */}
        <circle cx={center} cy={center} r="30" fill="#0f172a" stroke="#4f46e5" strokeWidth="2" />
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="24"
          fontWeight="bold"
          fill="#4f46e5"
          style={{ pointerEvents: 'none' }}
        >
          ☉
        </text>
      </svg>
    </div>
  );
}
