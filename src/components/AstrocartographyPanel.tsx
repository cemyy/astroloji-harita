'use client';

import { NatalChart } from '@/lib/astrology/types';
import { AstrocartographyCalculator } from '@/lib/astrology/astrocartography';

interface AstrocartographyPanelProps {
  chart: NatalChart;
  lines: any[];
}

export default function AstrocartographyPanel({
  chart,
  lines,
}: AstrocartographyPanelProps) {
  const recommendations = AstrocartographyCalculator.getLocationRecommendations(
    chart,
    { latitude: chart.birthData.latitude, longitude: chart.birthData.longitude },
    'medium'
  );

  return (
    <div className="space-y-6">
      <div className="bg-slate-600 p-6 rounded">
        <h3 className="text-2xl font-bold mb-4">Planetary Lines</h3>
        <p className="text-gray-300 mb-4">
          These are the paths on Earth where each planet has maximum influence in different house angles.
        </p>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {lines.slice(0, 20).map((line, idx) => (
            <div key={idx} className="bg-slate-500 p-4 rounded">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">
                    {line.planet} - {line.angle} angle
                  </p>
                  <p className="text-sm text-gray-400">{line.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded text-sm font-semibold ${
                    line.influence === 'positive'
                      ? 'bg-green-600'
                      : 'bg-red-600'
                  }`}
                >
                  {line.influence}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-600 p-6 rounded">
        <h3 className="text-2xl font-bold mb-4">Best Locations for You</h3>
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.slice(0, 8).map((rec, idx) => (
              <div key={idx} className="bg-slate-500 p-4 rounded">
                <h4 className="font-semibold mb-2">{rec.location}</h4>
                <p className="text-sm text-gray-300 mb-2">
                  <strong>Best For:</strong> {rec.bestFor.split(', ').slice(0, 2).join(', ')}
                </p>
                <p className="text-xs text-gray-400">
                  📍 {rec.latitude.toFixed(2)}°, {rec.longitude.toFixed(2)}°
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300">Finding best locations based on your chart...</p>
        )}
      </div>

      <div className="bg-indigo-600 p-6 rounded">
        <h3 className="text-xl font-bold mb-2">Astrocartography Map View</h3>
        <p className="text-gray-200 mb-4">
          Interactive world map would show planetary lines and highlighted beneficial locations.
        </p>
        <div className="bg-slate-700 h-96 rounded flex items-center justify-center">
          <p className="text-center text-gray-400">
            World map visualization - showing planetary influence zones
          </p>
        </div>
      </div>

      <div className="bg-slate-600 p-6 rounded">
        <h3 className="text-2xl font-bold mb-4">How to Use Astrocartography</h3>
        <ul className="space-y-2 text-gray-300">
          <li>✓ MC/ASC lines (positive planets) = Best for living, high achievement</li>
          <li>✓ IC/DESC lines (positive planets) = Good for specific projects or visits</li>
          <li>✗ IC/DESC lines (difficult planets) = Avoid for long-term residence</li>
          <li>✓ Consider timing - transits affect which lines are active</li>
          <li>✓ Combine with other astrological factors for best results</li>
        </ul>
      </div>
    </div>
  );
}
