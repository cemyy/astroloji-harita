'use client';

import { useState, useEffect } from 'react';
import { NatalChart, BirthData } from '@/lib/astrology/types';
import { AIInterpretation } from '@/lib/ai/interpretation';
import { AstrocartographyCalculator } from '@/lib/astrology/astrocartography';
import ChartVisualization from './ChartVisualization';
import InterpretationPanel from './InterpretationPanel';
import AstrocartographyPanel from './AstrocartographyPanel';

interface ChartDisplayProps {
  chart: NatalChart;
  birthData: BirthData;
}

export default function ChartDisplay({ chart, birthData }: ChartDisplayProps) {
  const [activeTab, setActiveTab] = useState<'chart' | 'interpretation' | 'astrocartography' | 'forecast'>('chart');
  const [interpretation, setInterpretation] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [astrocLines, setAstrocLines] = useState<any[]>([]);

  useEffect(() => {
    // Load astrocartography lines
    const lines = AstrocartographyCalculator.calculateAstrocartographyLines(chart);
    setAstrocLines(lines);
  }, [chart]);

  const handleLoadInterpretation = async () => {
    setLoading(true);
    try {
      // For now, use basic interpretation since AI API would need configuration
      const text = AIInterpretation.generateBasicInterpretation(chart);
      setInterpretation(text);
    } catch (error) {
      console.error('Error generating interpretation:', error);
      setInterpretation('Could not generate interpretation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-700 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-slate-600">
        <h2 className="text-3xl font-bold mb-2">
          {birthData.locationName} - {birthData.day}/{birthData.month}/{birthData.year}
        </h2>
        <p className="text-gray-300">
          {birthData.hour}:{String(birthData.minute).padStart(2, '0')} | Birth Chart Analysis
        </p>
      </div>

      <div className="flex flex-wrap gap-2 p-4 border-b border-slate-600 bg-slate-800">
        {(['chart', 'interpretation', 'astrocartography', 'forecast'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              if (tab === 'interpretation' && !interpretation) {
                handleLoadInterpretation();
              }
            }}
            className={`px-4 py-2 rounded font-semibold transition ${
              activeTab === tab
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
            }`}
          >
            {tab === 'chart' && 'Chart'}
            {tab === 'interpretation' && 'Interpretation'}
            {tab === 'astrocartography' && 'Astrocartography'}
            {tab === 'forecast' && 'Forecast'}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'chart' && <ChartVisualization chart={chart} />}

        {activeTab === 'interpretation' && (
          <InterpretationPanel
            interpretation={interpretation}
            loading={loading}
            onLoad={handleLoadInterpretation}
          />
        )}

        {activeTab === 'astrocartography' && (
          <AstrocartographyPanel chart={chart} lines={astrocLines} />
        )}

        {activeTab === 'forecast' && (
          <div className="bg-slate-600 p-6 rounded">
            <h3 className="text-2xl font-bold mb-4">Yearly Forecast</h3>
            <p className="text-gray-300 mb-4">
              Your yearly forecast would be calculated based on current transits and progressions.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-slate-500 p-4 rounded">
                  <h4 className="font-semibold mb-2">Q{i} {new Date().getFullYear()}</h4>
                  <p className="text-sm text-gray-400">Forecast details coming soon...</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-slate-600 bg-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h4 className="font-semibold text-sm text-gray-400 mb-2">Elements</h4>
            <div className="space-y-1 text-sm">
              <p>🔥 Fire: {chart.elements.fire}</p>
              <p>🌍 Earth: {chart.elements.earth}</p>
              <p>💨 Air: {chart.elements.air}</p>
              <p>💧 Water: {chart.elements.water}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-400 mb-2">Qualities</h4>
            <div className="space-y-1 text-sm">
              <p>♈ Cardinal: {chart.qualities.cardinal}</p>
              <p>♄ Fixed: {chart.qualities.fixed}</p>
              <p>♆ Mutable: {chart.qualities.mutable}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-400 mb-2">Key Angles</h4>
            <div className="space-y-1 text-sm">
              <p>ASC: {chart.ascendant?.zodiacSign}</p>
              <p>MC: {chart.midheaven?.zodiacSign}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-400 mb-2">Planets</h4>
            <div className="space-y-1 text-sm">
              <p>☉ {chart.planets[0]?.zodiacSign}</p>
              <p>☽ {chart.planets[1]?.zodiacSign}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
