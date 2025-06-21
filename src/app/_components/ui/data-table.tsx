"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterComponent?: React.ComponentType<{ table: any }>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterComponent: FilterComponent,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  })

  // Mobile responsive table renderer
  const renderMobileTable = () => {
    const filteredRows = table.getRowModel().rows;
    
    if (!filteredRows?.length) {
      return (
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center">
            <span className="text-3xl">📊</span>
          </div>
          <div className="space-y-2 text-center">
            <div className="text-xl font-semibold text-slate-600">No data available</div>
            <div className="text-sm text-slate-500">There are no triathlon records to display at the moment.</div>
          </div>
        </div>
      );
    }

    const attributes = [
      { key: 'difficulty', label: 'Difficulty' },
      { key: 'swimming', label: 'Swimming' },
      { key: 'cycling', label: 'Cycling' },
      { key: 'running', label: 'Running' },
      { key: 'totalDistance', label: 'Total Distance' },
    ];

    return (
      <div className="overflow-x-auto pb-4">
        {/* Header row with race types */}
        <div className="flex min-w-max bg-gradient-to-r from-slate-50 to-slate-100 sticky top-0 z-10">
          <div className="w-36 px-4 py-6 font-bold text-sm text-slate-700 uppercase tracking-wider border-r border-slate-200/50 flex-shrink-0">
            Category
          </div>
          {filteredRows.map((row) => (
            <div key={row.id} className="flex-1 min-w-32 px-2 py-6 text-center border-r border-slate-200/50 last:border-r-0 flex items-center justify-center h-12">
              <span className="font-bold text-xs text-slate-900 leading-tight truncate">{(row.original as any).type}</span>
            </div>
          ))}
        </div>

        {/* Attribute rows */}
                {attributes.map((attribute, attrIndex) => (
          <div key={attribute.key} className={`flex min-w-max h-16 ${attrIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'} border-b border-slate-200/60 last:border-b-0`}>
            <div className="w-36 px-4 py-6 font-semibold text-sm text-slate-700 border-r border-slate-200/30 bg-slate-50/50 flex-shrink-0 flex items-center h-full">
              {(attribute.key === 'swimming' || attribute.key === 'cycling' || attribute.key === 'running' || attribute.key === 'totalDistance') ? (
                <button
                  className="flex items-center space-x-1 hover:text-slate-600 transition-colors text-left w-full"
                  onClick={() => {
                    const column = table.getColumn(attribute.key === 'totalDistance' ? 'totalDistance' : attribute.key);
                    column?.toggleSorting(column.getIsSorted() === "asc");
                  }}
                >
                  <span>{attribute.label}</span>
                  <span className="text-xs ml-1">
                    {(() => {
                      const column = table.getColumn(attribute.key === 'totalDistance' ? 'totalDistance' : attribute.key);
                      const sortState = column?.getIsSorted();
                      return sortState === "asc" ? "↑" : sortState === "desc" ? "↓" : "↕";
                    })()}
                  </span>
                </button>
              ) : (
                attribute.label
              )}
            </div>
            {filteredRows.map((row) => (
              <div key={row.id} className="flex-1 min-w-32 px-2 py-6 border-r border-slate-200/30 last:border-r-0 flex justify-center items-center h-full">
                {attribute.key === 'difficulty' && (
                  (() => {
                    const difficulty = (row.original as any).difficulty;
                    const color = (row.original as any).difficultyColor;
                    let badgeClass;
                    switch (color) {
                      case 'grey':
                        badgeClass = 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-300';
                        break;
                      case 'green':
                        badgeClass = 'bg-gradient-to-r from-emerald-100 to-green-200 text-emerald-800 border-emerald-300';
                        break;
                      case 'yellow':
                        badgeClass = 'bg-gradient-to-r from-yellow-100 to-amber-200 text-yellow-800 border-yellow-300';
                        break;
                      case 'orange':
                        badgeClass = 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border-orange-300';
                        break;
                      default:
                        badgeClass = 'bg-gradient-to-r from-red-100 to-rose-200 text-red-800 border-red-300';
                    }
                    return (
                      <span className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-bold border ${badgeClass} max-w-full`}>
                        <span className="w-1 h-1 rounded-full bg-current mr-1 flex-shrink-0"></span>
                        <span className="truncate text-center">{difficulty}</span>
                      </span>
                    );
                  })()
                )}
                {attribute.key === 'swimming' && (
                  <div className="bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 min-w-0 w-full max-w-20">
                    <span className="font-medium text-slate-700 text-xs truncate block">{(row.original as any).distances[0] || "N/A"}</span>
                  </div>
                )}
                {attribute.key === 'cycling' && (
                  <div className="bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 min-w-0 w-full max-w-20">
                    <span className="font-medium text-slate-700 text-xs truncate block">{(row.original as any).distances[1] || "N/A"}</span>
                  </div>
                )}
                {attribute.key === 'running' && (
                  <div className="bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 min-w-0 w-full max-w-20">
                    <span className="font-medium text-slate-700 text-xs truncate block">{(row.original as any).distances[2] || "N/A"}</span>
                  </div>
                )}
                {attribute.key === 'totalDistance' && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-2 py-1 rounded-lg border border-blue-200 min-w-0 w-full max-w-20">
                    <span className="font-bold text-blue-800 text-xs truncate block">{(row.original as any).totalDistance || "N/A"}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-[90%] max-w-6xl mx-auto space-y-4">
      {FilterComponent && (
        <div>
          <FilterComponent table={table} />
        </div>
      )}
      
      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-0 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-150">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-3 py-3 text-slate-700 font-bold text-sm uppercase tracking-wider border-r border-slate-200/50 last:border-r-0">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`
                    group transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 hover:shadow-lg
                    ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}
                    border-b border-slate-200/60 last:border-b-0 hover:border-blue-200
                  `}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <TableCell 
                      key={cell.id} 
                      className={`
                        px-3 py-3 text-slate-700 border-r border-slate-200/30 last:border-r-0
                        transition-all duration-300 group-hover:border-blue-200/50
                        ${cellIndex === 0 ? 'font-semibold' : ''}
                      `}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center">
                      <span className="text-3xl">📊</span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xl font-semibold text-slate-600">No data available</div>
                      <div className="text-sm text-slate-500">There are no triathlon records to display at the moment.</div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Table */}
      <div className="block md:hidden bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 overflow-hidden">
        {renderMobileTable()}
      </div>
    </div>
  )
} 