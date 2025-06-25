"use client"

import React, { useState } from 'react';
import { Difficulty } from '@/model/lib/enums/difficulty';
import { TriathlonType } from '@/model/lib/enums/triathlonType';

interface TriathlonFiltersProps {
  table: any;
}

/**
 * Filter component for the triathlon data table.
 * Provides checkboxes to filter by difficulty level and race type.
 * Includes collapsible functionality to show/hide filter options.
 */
export default function TriathlonFilters({ table }: TriathlonFiltersProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const difficultyFilter = table.getColumn("difficulty")?.getFilterValue() as string[] || [];
  const typeFilter = table.getColumn("type")?.getFilterValue() as string[] || [];

  const difficulties = Object.values(Difficulty).filter(d => d !== Difficulty.UNKNOWN);
  const raceTypes = Object.values(TriathlonType).map(type => type.replace(/_/g, ' '));

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    const currentFilter = difficultyFilter;
    let newFilter;
    
    if (checked) {
      newFilter = [...currentFilter, difficulty];
    } else {
      newFilter = currentFilter.filter(d => d !== difficulty);
    }
    
    table.getColumn("difficulty")?.setFilterValue(newFilter.length > 0 ? newFilter : undefined);
  };

  const handleRaceTypeChange = (raceType: string, checked: boolean) => {
    const currentFilter = typeFilter;
    let newFilter;
    
    if (checked) {
      newFilter = [...currentFilter, raceType];
    } else {
      newFilter = currentFilter.filter(t => t !== raceType);
    }
    
    table.getColumn("type")?.setFilterValue(newFilter.length > 0 ? newFilter : undefined);
  };

  const clearAllFilters = () => {
    table.getColumn("difficulty")?.setFilterValue(undefined);
    table.getColumn("type")?.setFilterValue(undefined);
  };

  return (
    <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      {/* Toggle Header */}
      <div className="px-4 py-3 border-b border-slate-200 bg-white/50 hover:bg-slate-100 hover:shadow-sm transition-all duration-200 cursor-pointer">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-between w-full group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Filters</span>
            {(difficultyFilter.length > 0 || typeFilter.length > 0) && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {difficultyFilter.length + typeFilter.length}
              </span>
            )}
          </div>
          <div className={`transform transition-transform duration-200 ${!isCollapsed ? 'rotate-180' : ''}`}>
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      </div>

      {/* Collapsible Content */}
      <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'}`}>
        <div className="p-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Difficulty Filter */}
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Filter by Difficulty
              </h3>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <label
                    key={difficulty}
                    className="flex items-center space-x-2 bg-white px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={difficultyFilter.includes(difficulty)}
                      onChange={(e) => handleDifficultyChange(difficulty, e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700">{difficulty}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Race Type Filter */}
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Filter by Race Type
              </h3>
              <div className="flex flex-wrap gap-2">
                {raceTypes.map((raceType) => (
                  <label
                    key={raceType}
                    className="flex items-center space-x-2 bg-white px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={typeFilter.includes(raceType)}
                      onChange={(e) => handleRaceTypeChange(raceType, e.target.checked)}
                      className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm font-medium text-slate-700">{raceType}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="flex items-end">
              <button
                onClick={clearAllFilters}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:from-red-600 hover:to-pink-600 font-medium text-sm cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 