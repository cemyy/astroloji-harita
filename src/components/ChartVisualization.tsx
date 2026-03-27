'use client';

import { NatalChart } from '@/lib/astrology/types';
import NatalChartWheel from './NatalChartWheel';

interface ChartVisualizationProps {
  chart: NatalChart;
}

export default function ChartVisualization({ chart }: ChartVisualizationProps) {
  return (
    <div className="space-y-6">
      <NatalChartWheel chart={chart} size={500} />
      
      <div className="bg-slate-600 p-6 rounded">
        <h3 className="text-2xl font-bold mb-4">Planets & Positions</h3>
        <div className="space-y-3">
          {chart.planets.map((planet, idx) => (
            <div key={idx} className="flex justify-between items-center border-b border-slate-500 pb-2">
              <div>
                <p className="font-semibold">{planet.planet}</p>
                <p className="text-sm text-gray-400">
                  {planet.zodiacSign} {planet.degree}°{planet.minute}' {planet.retrograde && '♻️'}
                </p>
              </div>
              <p className="text-right">
                <span className="text-lg">{planet.longitude.toFixed(2)}°</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-600 p-6 rounded">
        <h3 className="text-2xl font-bold mb-4">Houses</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {chart.houses.slice(0, 12).map((house, idx) => (
            <div key={idx} className="bg-slate-500 p-4 rounded text-center">
              <p className="font-bold text-lg">House {house.number}</p>
              <p className="text-sm text-gray-300">
                {house.zodiacSign} {house.degree}°
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-600 p-6 rounded">
        <h3 className="text-2xl font-bold mb-4">Major Aspects</h3>
        <div className="space-y-2">
          {chart.aspects
            .filter((a) => a.isActive)
            .slice(0, 15)
            .map((aspect, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-slate-500 rounded">
                <div>
                  <p className="font-semibold">
                    {aspect.planet1} {aspect.type} {aspect.planet2}
                  </p>
                  <p className="text-xs text-gray-400">Orb: {aspect.orb.toFixed(2)}°</p>
                </div>
                <p className="text-right font-bold">{aspect.angle.toFixed(1)}°</p>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded text-center">
        <h3 className="text-xl font-bold mb-4">Interactive Chart Wheel</h3>
        <p className="text-sm text-gray-200">
          This SVG chart shows all planets, houses, zodiac signs, and major aspects in a interactive wheel format.
          Planets are positioned by their exact longitude (0-360 degrees).
        </p>
        <ul className="mt-4 text-sm text-gray-200 space-y-2">
          <li>🔵 <strong>Colored Rings</strong>: Zodiac signs with unique colors</li>
          <li>⭐ <strong>Symbols</strong>: Planetary positions (☉☽☿♀♂♃♄♅♆♇)</li>
          <li>📍 <strong>Lines</strong>: House divisions from your birth chart</li>
          <li>🎯 <strong>Connecting Lines</strong>: Aspect connections between planets</li>
        </ul>
      </div>
    </div>
  );
}
