'use client';

import { useState } from 'react';
import { AstrologyCalculator } from '@/lib/astrology/calculator';
import { BirthData } from '@/lib/astrology/types';
import { useAppStore } from '@/stores/appStore';
import ChartDisplay from '@/components/ChartDisplay';
import BirthDataForm from '@/components/BirthDataForm';

export default function Home() {
  const [showForm, setShowForm] = useState(true);
  const { currentChart, currentBirthData, setCurrentChart } = useAppStore();

  const handleCalculateChart = (birthData: BirthData) => {
    const chart = AstrologyCalculator.createNatalChart(birthData);
    setCurrentChart(birthData, chart);
    setShowForm(false);
  };

  return (
    <main className="min-h-screen">
      <header className="bg-gradient-to-r from-indigo-900 to-purple-900 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Astroloji Harita Analizi</h1>
          <p className="text-xl text-gray-300">Western Astrology Natal Chart Analysis & Interpretations</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {showForm ? (
          <div>
            <BirthDataForm onSubmit={handleCalculateChart} />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard
                title="Natal Chart"
                description="Complete birth chart calculation with planetary positions"
              />
              <FeatureCard
                title="Rectification"
                description="Determine accurate birth time from known life events"
              />
              <FeatureCard
                title="Interpretations"
                description="AI-powered comprehensive astrological readings"
              />
              <FeatureCard
                title="Relationships"
                description="Synastry analysis and compatibility scores"
              />
              <FeatureCard
                title="Astrocartography"
                description="Find the best locations for your planetary energy"
              />
              <FeatureCard
                title="Forecasts"
                description="Yearly transits and progressive forecasts"
              />
            </div>
          </div>
        ) : currentChart ? (
          <div>
            <button
              onClick={() => setShowForm(true)}
              className="mb-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition"
            >
              ← Back to Form
            </button>
            <ChartDisplay chart={currentChart} birthData={currentBirthData!} />
          </div>
        ) : null}
      </div>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-slate-700 p-6 rounded-lg hover:bg-slate-600 transition cursor-pointer">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
