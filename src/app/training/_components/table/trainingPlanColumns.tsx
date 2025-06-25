"use client"
import { ColumnDef } from "@tanstack/react-table"
import { TrainingPlanRowData } from "./types"
import { Button } from "@/app/_components/ui/button"

/**
 * Column definitions for the training plans data table using TanStack Table.
 */
export const trainingPlanColumns: ColumnDef<TrainingPlanRowData>[] = [
  /**
   * Training Plan Name Column
   */
  {
    accessorKey: "name",
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as string;
      return rowValue.toLowerCase().includes(value.toLowerCase());
    },
    header: () => (
      <div className="flex items-center">
        <span className="font-bold text-slate-800 text-sm">Training Plan</span>
      </div>
    ),
    cell: ({ getValue, row, table }) => {
      const meta = table.options.meta as any;
      const isSelected = meta?.selectedPlan === getValue();
      
      return (
        <div className="flex items-left space-x-2">
          <div>
            <span className={`font-bold text-base block ${isSelected ? 'text-blue-600' : 'text-slate-900'}`}>
              {getValue() as string}
            </span>
            <span className="text-xs text-slate-500 uppercase tracking-wide block">Training Plan</span>
          </div>
        </div>
      )
    },
  },
  /**
   * Difficulty Column
   */
  {
    accessorKey: "difficulty",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: () => (
      <div className="flex items-center justify-center">
        <span className="font-bold text-slate-800 text-sm">Difficulty</span>
      </div>
    ),
    cell: ({ row, table }) => {
      const difficulty: string = row.getValue("difficulty");
      const color = row.original.difficultyColor;
      const meta = table.options.meta as any;
      const planName = row.getValue("name") as string;
      
      let badgeClass;
      switch (color) {
        case 'grey':
          badgeClass = 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-300 shadow-sm hover:shadow-md transition-all'
          break
        case 'green':
          badgeClass = 'bg-gradient-to-r from-emerald-100 to-green-200 text-emerald-800 border-emerald-300 shadow-sm hover:shadow-md transition-all'
          break
        case 'yellow':
          badgeClass = 'bg-gradient-to-r from-yellow-100 to-amber-200 text-yellow-800 border-yellow-300 shadow-sm hover:shadow-md transition-all'
          break
        case 'orange':
          badgeClass = 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border-orange-300 shadow-sm hover:shadow-md transition-all'
          break
        default:
          badgeClass = 'bg-gradient-to-r from-red-100 to-rose-200 text-red-800 border-red-300 shadow-sm hover:shadow-md transition-all'
      }
      
      return (
        <div className="flex items-center justify-center">
          <span 
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border cursor-pointer hover:scale-105 ${badgeClass}`}
            onClick={(e) => {
              e.stopPropagation();
              meta?.onDifficultyEdit?.(planName);
            }}
          >
            <span className="w-1 h-1 rounded-full bg-current mr-1"></span>
            {difficulty}
            <svg className="w-3 h-3 ml-1 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </span>
        </div>
      )
    },
  },
  /**
   * Exercise Count Column
   */
  {
    id: "exerciseCount",
    accessorFn: (row) => row.sortValues.exerciseCount,
    enableSorting: true,
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <button
          className="flex items-center space-x-1 hover:text-slate-600 transition-colors cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="font-bold text-slate-800 text-sm">Exercises</span>
          <span className="text-xs">
            {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </span>
        </button>
      </div>
    ),
    cell: ({ row }) => {
      const exerciseCount = row.original.exerciseCount;
      return (
        <div className="flex items-center justify-center">
          <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
            <span className="font-medium text-slate-700 text-sm">{exerciseCount}</span>
          </div>
        </div>
      )
    },
  },
  /**
   * Actions Column
   */
  {
    id: "actions",
    header: () => (
      <div className="flex items-center justify-center">
        {/* Empty header */}
      </div>
    ),
    cell: ({ row, table }) => {
      const meta = table.options.meta as any;
      const planName = row.getValue("name") as string;
      
      return (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              meta?.onPlanDelete(planName);
            }}
            className="text-xs"
          >
            Delete
          </Button>
        </div>
      )
    },
  },
] 