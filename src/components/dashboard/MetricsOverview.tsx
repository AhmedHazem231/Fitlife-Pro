import React from 'react';
import { Activity, Scale, Flame, Brain } from 'lucide-react';
import { FitnessMetrics } from '../../utils/types';

interface Props {
  metrics: FitnessMetrics;
}

export function MetricsOverview({ metrics }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Your Fitness Metrics
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Scale className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-gray-700">BMI</span>
          </div>
          <p className="text-3xl font-bold text-blue-600">
            {metrics.bmi.toFixed(1)}
          </p>
          <p className="text-sm text-gray-600 mt-1">Body Mass Index</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="h-6 w-6 text-green-600" />
            <span className="font-semibold text-gray-700">BMR</span>
          </div>
          <p className="text-3xl font-bold text-green-600">
            {metrics.bmr.toFixed(0)}
          </p>
          <p className="text-sm text-gray-600 mt-1">kcal/day</p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-6 w-6 text-orange-600" />
            <span className="font-semibold text-gray-700">TDEE</span>
          </div>
          <p className="text-3xl font-bold text-orange-600">
            {metrics.tdee.toFixed(0)}
          </p>
          <p className="text-sm text-gray-600 mt-1">kcal/day</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Flame className="h-6 w-6 text-purple-600" />
            <span className="font-semibold text-gray-700">Target</span>
          </div>
          <p className="text-3xl font-bold text-purple-600">
            {metrics.calories.toFixed(0)}
          </p>
          <p className="text-sm text-gray-600 mt-1">kcal/day</p>
        </div>
      </div>
    </div>
  );
}
