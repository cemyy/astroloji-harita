'use client';

interface InterpretationPanelProps {
  interpretation: string;
  loading: boolean;
  onLoad: () => void;
}

export default function InterpretationPanel({
  interpretation,
  loading,
  onLoad,
}: InterpretationPanelProps) {
  if (!interpretation) {
    return (
      <div className="bg-slate-600 p-6 rounded text-center">
        <h3 className="text-2xl font-bold mb-4">Comprehensive Chart Interpretation</h3>
        <p className="text-gray-300 mb-6">
          Click below to generate a detailed AI-powered interpretation of your natal chart.
        </p>
        <button
          onClick={onLoad}
          disabled={loading}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 rounded-lg font-semibold transition"
        >
          {loading ? 'Generating...' : 'Generate Interpretation'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-600 p-6 rounded prose prose-invert max-w-none">
      <div
        className="whitespace-pre-wrap text-gray-100 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: interpretation.replace(/\n/g, '<br />') }}
      />
    </div>
  );
}
