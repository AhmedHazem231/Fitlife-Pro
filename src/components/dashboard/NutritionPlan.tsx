import React from 'react';
import { Utensils, Beef, Grain, Oil } from 'lucide-react';
import { FitnessMetrics } from '../../utils/types';

interface Props {
  metrics: FitnessMetrics;
}

export function NutritionPlan({ metrics }: Props) {
  const totalGrams =
    metrics.nutrition.protein + metrics.nutrition.carbs + metrics.nutrition.fat;
  const proteinPercentage = (metrics.nutrition.protein / totalGrams) * 100;
  const carbsPercentage = (metrics.nutrition.carbs / totalGrams) * 100;
  const fatPercentage = (metrics.nutrition.fat / totalGrams) * 100;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Utensils className="h-6 w-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          Daily Nutrition Plan
        </h2>
      </div>

      <div className="space-y-6">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div className="flex items-center">
              <Beef className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-sm font-semibold text-gray-700">
                Protein
              </span>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-700">
                {metrics.nutrition.protein}g
              </span>
              <span className="text-sm text-gray-500 ml-2">
                ({proteinPercentage.toFixed(0)}%)
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-red-100">
            <div
              style={{ width: `${proteinPercentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
            />
          </div>
        </div>

        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div className="flex items-center">
              <Grain className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-sm font-semibold text-gray-700">Carbs</span>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-700">
                {metrics.nutrition.carbs}g
              </span>
              <span className="text-sm text-gray-500 ml-2">
                ({carbsPercentage.toFixed(0)}%)
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-yellow-100">
            <div
              style={{ width: `${carbsPercentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
            />
          </div>
        </div>

        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div className="flex items-center">
              <Oil className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm font-semibold text-gray-700">Fat</span>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-700">
                {metrics.nutrition.fat}g
              </span>
              <span className="text-sm text-gray-500 ml-2">
                ({fatPercentage.toFixed(0)}%)
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
            <div
              style={{ width: `${fatPercentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            />
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Daily Totals
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">
                {metrics.calories.toFixed(0)}
              </p>
              <p className="text-xs text-gray-500">Calories</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{totalGrams}g</p>
              <p className="text-xs text-gray-500">Total Macros</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">3</p>
              <p className="text-xs text-gray-500">Meals/Day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
