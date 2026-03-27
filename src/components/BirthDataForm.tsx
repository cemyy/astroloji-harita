'use client';

import { useState } from 'react';
import { BirthData } from '@/lib/astrology/types';

interface BirthDataFormProps {
  onSubmit: (data: BirthData) => void;
}

export default function BirthDataForm({ onSubmit }: BirthDataFormProps) {
  const [formData, setFormData] = useState<Partial<BirthData>>({
    year: new Date().getFullYear(),
    month: 1,
    day: 1,
    hour: 12,
    minute: 0,
    latitude: 0,
    longitude: 0,
  });

  const [unknownTime, setUnknownTime] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'year' || name === 'month' || name === 'day' || name === 'hour' || name === 'minute' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.year ||
      !formData.month ||
      !formData.day ||
      !formData.locationName ||
      (!unknownTime && (!formData.hour || !formData.minute)) ||
      formData.latitude === undefined ||
      formData.longitude === undefined
    ) {
      alert('Please fill in all required fields');
      return;
    }

    const birthData: BirthData = {
      year: formData.year,
      month: formData.month,
      day: formData.day,
      hour: unknownTime ? 12 : formData.hour || 12,
      minute: unknownTime ? 0 : formData.minute || 0,
      latitude: formData.latitude,
      longitude: formData.longitude,
      locationName: formData.locationName,
      timezone: formData.timezone || 0,
    };

    onSubmit(birthData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-700 p-8 rounded-lg max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6">Enter Your Birth Information</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Year</label>
          <input
            type="number"
            name="year"
            min="1900"
            max={new Date().getFullYear()}
            value={formData.year}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Month</label>
          <select
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded text-white"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
              <option key={m} value={m}>
                {new Date(2000, m - 1).toLocaleString('en', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Day</label>
          <input
            type="number"
            name="day"
            min="1"
            max="31"
            value={formData.day}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded text-white"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={unknownTime}
            onChange={(e) => setUnknownTime(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm">Don't know exact birth time</span>
        </label>

        {!unknownTime && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Hour</label>
              <input
                type="number"
                name="hour"
                min="0"
                max="23"
                value={formData.hour}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Minute</label>
              <input
                type="number"
                name="minute"
                min="0"
                max="59"
                value={formData.minute}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded text-white"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Birth Location</label>
        <input
          type="text"
          name="locationName"
          placeholder="City, Country"
          value={formData.locationName || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Latitude</label>
          <input
            type="number"
            name="latitude"
            step="0.0001"
            value={formData.latitude}
            onChange={handleChange}
            placeholder="e.g., 40.7128"
            className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Longitude</label>
          <input
            type="number"
            name="longitude"
            step="0.0001"
            value={formData.longitude}
            onChange={handleChange}
            placeholder="e.g., -74.0060"
            className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded text-white"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg font-semibold text-lg transition"
      >
        Calculate Chart
      </button>
    </form>
  );
}
