import React from "react";

interface TrainingPlanSearchProps {
  table: any;
}

/**
 * Search filter component for the training plan table.
 * Allows users to filter training plans by name.
 */
export default function TrainingPlanSearch({ 
  table
}: TrainingPlanSearchProps) {
  const nameFilter = (table.getColumn("name")?.getFilterValue() as string) ?? "";

  return (
    <div className="flex items-center justify-start w-full">
      <div className="flex items-center space-x-2">
        <div className="relative w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search training plans..."
            value={nameFilter}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="pl-10 w-full h-10 bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        {nameFilter && (
          <button
            onClick={() => table.getColumn("name")?.setFilterValue("")}
            className="px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
} 