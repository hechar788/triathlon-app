"use client"
import { ColumnDef } from "@tanstack/react-table"

/**
 * Interface representing a single row of data in the triathlon information table.
 * Each row corresponds to a specific triathlon race type with its associated details
 * formatted for display in the data table component.
 * 
 * This interface is used throughout the table rendering pipeline from the view model
 * through to the column definitions and final display.
 */
export interface TriathlonRowData {
  type: string;
  difficulty: string
  difficultyColor: string;
  distances: string[];
  totalDistance: string;
  sortValues: {
      swimming: number;
      cycling: number;
      running: number;
      totalDistance: number;
  };
}


/**
 * Column definitions for the triathlon data table using TanStack Table.
 * 
 * This configuration defines how each column should be rendered, including headers,
 * cell content formatting, and styling. The table displays comprehensive triathlon
 * information including race types, difficulty levels, individual sport distances,
 * and total distances.
 * 
 * Each column definition includes:
 * - Header rendering with proper styling and labels
 * - Cell rendering with custom formatting and visual elements
 * - Responsive design considerations
 * - Accessibility features
 * 
 * @type {ColumnDef<TriathlonRowData>[]} Array of column definitions for the data table
 */
export const columns: ColumnDef<TriathlonRowData>[] = [
  /**
   * Race Type Column
   * Displays the triathlon race type name with visual indicators and styling.
   * Features a gradient color bar and official designation badge.
   */
  {
    accessorKey: "type",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: () => (
      <div className="flex items-center">
        <span className="font-bold text-slate-800 text-sm">Race Type</span>
      </div>
    ),
    cell: ({ getValue }) => {
      return (
        <div className="flex items-center space-x-2">
          <div>
            <span className="font-bold text-slate-900 text-base block">{getValue() as string}</span>
            <span className="text-xs text-slate-500 uppercase tracking-wide">Official</span>
          </div>
        </div>
      )
    },
  },
  /**
   * Difficulty Column
   * Displays the difficulty level with color-coded badges that provide visual
   * indication of race complexity. Each difficulty level has distinct styling.
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
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${badgeClass}`}>
            <span className="w-1 h-1 rounded-full bg-current mr-1"></span>
            {difficulty}
          </span>
        </div>
      )
    },
  },
  /**
   * Swimming Distance Column
   * Displays the swimming distance for each triathlon type in a formatted container.
   * Shows the first distance value from the distances array (index 0).
   * Sortable by numeric value.
   */
  {
    id: "swimming",
    accessorFn: (row) => row.sortValues.swimming,
    enableSorting: true,
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <button
          className="flex items-center space-x-1 hover:text-slate-600 transition-colors cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="font-bold text-slate-800 text-sm">Swimming</span>
          <span className="text-xs">
            {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </span>
        </button>
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
  /**
   * Cycling Distance Column  
   * Displays the cycling distance for each triathlon type in a formatted container.
   * Shows the second distance value from the distances array (index 1).
   * Sortable by numeric value.
   */
  {
    id: "cycling",
    accessorFn: (row) => row.sortValues.cycling,
    enableSorting: true,
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <button
          className="flex items-center space-x-1 hover:text-slate-600 transition-colors cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="font-bold text-slate-800 text-sm">Cycling</span>
          <span className="text-xs">
            {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </span>
        </button>
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
  /**
   * Running Distance Column
   * Displays the running distance for each triathlon type in a formatted container.
   * Shows the third distance value from the distances array (index 2).
   * Sortable by numeric value.
   */
  {
    id: "running",
    accessorFn: (row) => row.sortValues.running,
    enableSorting: true,
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <button
          className="flex items-center space-x-1 hover:text-slate-600 transition-colors cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="font-bold text-slate-800 text-sm">Running</span>
          <span className="text-xs">
            {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </span>
        </button>
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
  /**
   * Total Distance Column
   * Displays the combined total distance of all three sports with prominent styling.
   * Features a gradient background to emphasize the total distance value.
   * Sortable by numeric value.
   */
  {
    accessorKey: "totalDistance",
    accessorFn: (row) => row.sortValues.totalDistance,
    enableSorting: true,
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <button
          className="flex items-center space-x-1 hover:text-slate-600 transition-colors cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="font-bold text-slate-800 text-sm">Total</span>
          <span className="text-xs">
            {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </span>
        </button>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 rounded-lg border border-blue-200 shadow-sm">
            <span className="font-bold text-blue-800 text-sm">{row.original.totalDistance}</span>
          </div>
        </div>
      )
    },
  },
] 