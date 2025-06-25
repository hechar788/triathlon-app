"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ExerciseRowData } from "./types"
import { Button } from "@/app/_components/ui/button"
import { useState } from "react"

/**
 * Column definitions for the exercises data table using TanStack Table.
 */
export const exerciseColumns: ColumnDef<ExerciseRowData>[] = [
  /**
   * Exercise Name Column
   */
  {
    accessorKey: "name",
    enableResizing: true,
    size: 200,
    minSize: 150,
    maxSize: 350,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: () => (
      <div className="flex items-center">
        <span className="font-bold text-slate-800 text-sm">Exercise</span>
      </div>
    ),
    cell: ({ getValue, row }) => {
      return (
        <div className="flex items-center space-x-2">
          <div>
            <span className="font-bold text-slate-900 text-base block">{getValue() as string}</span>
            <span className="text-xs text-slate-500 uppercase tracking-wide">{row.original.type}</span>
          </div>
        </div>
      )
    },
  },
  /**
   * Sets Column - Editable
   */
  {
    id: "sets",
    accessorFn: (row) => row.sortValues.sets,
    enableSorting: true,
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <button
          className="flex items-center space-x-1 hover:text-slate-600 transition-colors cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="font-bold text-slate-800 text-sm">Sets</span>
          <span className="text-xs">
            {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </span>
        </button>
      </div>
    ),
    cell: ({ row, table }) => {
      const [isHovered, setIsHovered] = useState(false);
      const meta = table.options.meta as any;
      const exerciseName = row.getValue("name") as string;

      const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        meta?.onExerciseSetsEdit?.(exerciseName);
      };

      return (
        <div className="flex items-center justify-center">
          <div 
            className={`px-3 py-2 rounded-lg border cursor-pointer transition-all duration-200 relative ${
              isHovered 
                ? 'bg-blue-50 border-blue-300' 
                : 'bg-slate-50 border-slate-200'
            }`}
            onClick={handleEdit}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className={`font-medium text-sm ${
              isHovered ? 'text-blue-700' : 'text-slate-700'
            }`}>
              {row.original.sets}
            </span>
            {isHovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-blue-50 bg-opacity-90 rounded-lg">
                <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      )
    },
  },
  /**
   * Reps Column - Editable
   */
  {
    id: "reps",
    accessorFn: (row) => row.sortValues.reps,
    enableSorting: true,
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <button
          className="flex items-center space-x-1 hover:text-slate-600 transition-colors cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="font-bold text-slate-800 text-sm">Reps</span>
          <span className="text-xs">
            {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </span>
        </button>
      </div>
    ),
    cell: ({ row, table }) => {
      const [isHovered, setIsHovered] = useState(false);
      const meta = table.options.meta as any;
      const exerciseName = row.getValue("name") as string;

      const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        meta?.onExerciseRepsEdit?.(exerciseName);
      };

      return (
        <div className="flex items-center justify-center">
          <div 
            className={`px-3 py-2 rounded-lg border cursor-pointer transition-all duration-200 relative ${
              isHovered 
                ? 'bg-blue-50 border-blue-300' 
                : 'bg-slate-50 border-slate-200'
            }`}
            onClick={handleEdit}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className={`font-medium text-sm ${
              isHovered ? 'text-blue-700' : 'text-slate-700'
            }`}>
              {row.original.reps}
            </span>
            {isHovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-blue-50 bg-opacity-90 rounded-lg">
                <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      )
    },
  },
  /**
   * Units Column
   */
  {
    accessorKey: "repUnit",
    header: () => (
      <div className="flex items-center justify-center">
        <span className="font-bold text-slate-800 text-sm">Units</span>
      </div>
    ),
    cell: ({ row }) => {
      const repUnit = row.original.repUnit;
      return (
        <div className="flex items-center justify-center">
          <div className="bg-gray-100 px-3 py-2 rounded-lg border border-gray-200">
            <span className="font-medium text-gray-700 text-sm">{repUnit}</span>
          </div>
        </div>
      )
    },
  },
  /**
   * Target Muscles Column
   */
  {
    accessorKey: "targetMuscles",
    header: () => (
      <div className="flex items-center justify-center">
        <span className="font-bold text-slate-800 text-sm">Target Muscles</span>
      </div>
    ),
    cell: ({ row }) => {
      const muscles = row.original.targetMuscles;
      return (
        <div className="flex items-center justify-center">
          <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 w-full overflow-hidden">
            <span className="font-medium text-slate-700 text-xs break-words">{muscles.join(", ")}</span>
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
    cell: ({ row }) => {
      const difficulty: string = row.getValue("difficulty");
      const color = row.original.difficultyColor;
      let badgeClass;
      switch (color) {
        case 'grey':
          badgeClass = 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-300 shadow-sm'
          break
        case 'green':
          badgeClass = 'bg-gradient-to-r from-emerald-100 to-green-200 text-emerald-800 border-emerald-300 shadow-sm hover:shadow-md transition-shadow'
          break
        case 'yellow':
          badgeClass = 'bg-gradient-to-r from-yellow-100 to-amber-200 text-yellow-800 border-yellow-300 shadow-sm hover:shadow-md transition-shadow'
          break
        case 'orange':
          badgeClass = 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border-orange-300 shadow-sm hover:shadow-md transition-shadow'
          break
        default:
          badgeClass = 'bg-gradient-to-r from-red-100 to-rose-200 text-red-800 border-red-300 shadow-sm hover:shadow-md transition-shadow'
      }
      
      return (
        <div className="flex items-center justify-center">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold border ${badgeClass}`}>
            <span className="w-1 h-1 rounded-full bg-current mr-1"></span>
            {difficulty}
          </span>
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
      const exerciseName = row.getValue("name") as string;
      
      return (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => meta?.onExerciseDelete(exerciseName)}
            className="text-xs"
          >
            Remove
          </Button>
        </div>
      )
    },
  },
] 