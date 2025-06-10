"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Difficulty } from "@/model/lib/enums/difficulty"

// Define the shape of our data based on the TriathlonViewModel
export type TriathlonRow = {
  type: string
  difficulty: Difficulty
  difficultyColor: string
  distances: string[]
  totalDistance: string
}

// Helper function to get difficulty badge styles with vibrant colors
const getDifficultyBadgeClass = (color: string) => {
  switch (color) {
    case 'grey':
      return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-300 shadow-sm'
    case 'green':
      return 'bg-gradient-to-r from-emerald-100 to-green-200 text-emerald-800 border-emerald-300 shadow-sm hover:shadow-md transition-shadow'
    case 'yellow':
      return 'bg-gradient-to-r from-yellow-100 to-amber-200 text-yellow-800 border-yellow-300 shadow-sm hover:shadow-md transition-shadow'
    case 'orange':
      return 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border-orange-300 shadow-sm hover:shadow-md transition-shadow'
    default:
      return 'bg-gradient-to-r from-red-100 to-rose-200 text-red-800 border-red-300 shadow-sm hover:shadow-md transition-shadow'
  }
}

// Helper function to get sport icons
const getSportIcon = (sport: string) => {
  switch (sport.toLowerCase()) {
    case 'swimming':
      return '🏊‍♂️'
    case 'cycling':
      return '🚴‍♂️'
    case 'running':
      return '🏃‍♂️'
    default:
      return '🏃‍♂️'
  }
}

export const columns: ColumnDef<TriathlonRow>[] = [
  {
    accessorKey: "type",
    header: () => (
      <div className="flex items-center space-x-2">
        <div className="w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm">🏆</span>
        </div>
        <span className="font-bold text-slate-800 text-sm">Race Type</span>
      </div>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as string
      return (
        <div className="flex items-center space-x-2">
          <div className="w-2 h-8 bg-gradient-to-b from-blue-400 via-indigo-500 to-purple-600 rounded-full"></div>
          <div>
            <span className="font-bold text-slate-900 text-base block">{value}</span>
            <span className="text-xs text-slate-500 uppercase tracking-wide">Official</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "difficulty",
    header: () => (
      <div className="flex items-center space-x-2">
        <div className="w-7 h-7 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm">📊</span>
        </div>
        <span className="font-bold text-slate-800 text-sm">Difficulty</span>
      </div>
    ),
    cell: ({ row }) => {
      const difficulty = row.getValue("difficulty") as Difficulty
      const color = row.original.difficultyColor
      const badgeClass = getDifficultyBadgeClass(color)
      
      return (
        <div className="flex items-center justify-center">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${badgeClass}`}>
            <span className="w-1 h-1 rounded-full bg-current mr-1"></span>
            {difficulty}
          </span>
        </div>
      )
    },
  },
  {
    id: "swimming",
    header: () => (
      <div className="flex items-center space-x-2">
        <div className="w-7 h-7 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm">🏊‍♂️</span>
        </div>
        <span className="font-bold text-slate-800 text-sm">Swimming</span>
      </div>
    ),
    cell: ({ row }) => {
      const distance = row.original.distances[0] || "N/A"
      return (
        <div className="flex items-center justify-center">
          <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
            <span className="font-medium text-slate-700 text-sm">{distance}</span>
          </div>
        </div>
      )
    },
  },
  {
    id: "cycling",
    header: () => (
      <div className="flex items-center space-x-2">
        <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm">🚴‍♂️</span>
        </div>
        <span className="font-bold text-slate-800 text-sm">Cycling</span>
      </div>
    ),
    cell: ({ row }) => {
      const distance = row.original.distances[1] || "N/A"
      return (
        <div className="flex items-center justify-center">
          <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
            <span className="font-medium text-slate-700 text-sm">{distance}</span>
          </div>
        </div>
      )
    },
  },
  {
    id: "running",
    header: () => (
      <div className="flex items-center space-x-2">
        <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm">🏃‍♂️</span>
        </div>
        <span className="font-bold text-slate-800 text-sm">Running</span>
      </div>
    ),
    cell: ({ row }) => {
      const distance = row.original.distances[2] || "N/A"
      return (
        <div className="flex items-center justify-center">
          <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
            <span className="font-medium text-slate-700 text-sm">{distance}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "totalDistance",
    header: () => (
      <div className="flex items-center space-x-2">
        <div className="w-7 h-7 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm">📏</span>
        </div>
        <span className="font-bold text-slate-800 text-sm">Total</span>
      </div>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as string
      return (
        <div className="flex items-center justify-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-lg shadow-md">
            <span className="font-bold text-sm">{value}</span>
          </div>
        </div>
      )
    },
  },
] 