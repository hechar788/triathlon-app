"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  ColumnResizeMode,
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
  meta?: any
  enableColumnResizing?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterComponent: FilterComponent,
  meta,
  enableColumnResizing = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [expandedRows, setExpandedRows] = React.useState<Set<string>>(new Set())

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    enableColumnResizing: enableColumnResizing,
    columnResizeMode: enableColumnResizing ? ("onChange" as ColumnResizeMode) : undefined,
    meta: {
      ...meta,
      expandedRows,
      setExpandedRows,
    },
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
            <div className="text-sm text-slate-500">There are no records to display at the moment.</div>
          </div>
        </div>
      );
    }

    // Generic mobile card layout for all table types
    return (
      <div className="space-y-4 p-4">
        {filteredRows.map((row, index) => (
          <div key={row.id} className={`bg-white rounded-lg border border-slate-200 shadow-sm p-4 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
            {table.getVisibleLeafColumns().map((column, colIndex) => {
              const cell = row.getVisibleCells().find(cell => cell.column.id === column.id);
              if (!cell) return null;
              
              return (
                <div key={column.id} className={`flex justify-between items-center py-2 ${colIndex !== table.getVisibleLeafColumns().length - 1 ? 'border-b border-slate-100' : ''}`}>
                                      <span className="font-medium text-slate-600 text-sm">
                      {typeof column.columnDef.header === 'string' 
                        ? column.columnDef.header 
                        : column.id
                      }
                    </span>
                  <div className="text-right">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </div>
              );
            })}
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
        <div className={enableColumnResizing ? 'overflow-x-auto' : ''}>
          <Table style={{ width: enableColumnResizing ? `${table.getCenterTotalSize()}px` : '100%', minWidth: enableColumnResizing ? '100%' : 'auto' }}>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-0 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-150">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead 
                        key={header.id} 
                        className={`px-3 py-3 text-slate-700 font-bold text-sm uppercase tracking-wider border-r border-slate-200/50 last:border-r-0 ${enableColumnResizing ? 'relative' : ''}`}
                        style={enableColumnResizing ? { width: header.getSize() } : {}}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {enableColumnResizing && header.column.getCanResize() && (
                          <div
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className={`resizer absolute right-0 top-0 h-full w-1 bg-slate-300 cursor-col-resize select-none touch-none hover:bg-blue-500 ${
                              header.column.getIsResizing() ? 'bg-blue-500' : ''
                            }`}
                          />
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
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className={`
                      group transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 hover:shadow-lg
                      ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}
                      border-b border-slate-200/60 hover:border-blue-200
                      ${meta?.onRowClick ? 'cursor-pointer' : ''}
                      ${meta?.selectedPlan && meta.selectedPlan === (row.original as any).name ? 'bg-blue-50 border-blue-300' : ''}
                    `}
                    onClick={() => meta?.onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => (
                      <TableCell 
                        key={cell.id} 
                        className={`
                          px-3 py-3 text-slate-700 border-r border-slate-200/30 last:border-r-0
                          transition-all duration-300 group-hover:border-blue-200/50
                          ${cellIndex === 0 ? 'font-semibold' : ''}
                        `}
                        style={enableColumnResizing ? { width: cell.column.getSize() } : {}}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  
                  {/* Expanded Row Content */}
                  {expandedRows.has(row.id) && (
                    <TableRow className="bg-slate-50">
                      <TableCell colSpan={columns.length} className="px-6 py-4">
                        <div className="space-y-4">
                          {/* Exercise Management Controls */}
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-slate-700 text-sm">Exercises</h4>
                            <button
                              onClick={() => {
                                // Add exercise logic - for now just show an alert
                                alert(`Add exercise to plan: ${(row.original as any).name}`);
                              }}
                              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                            >
                              + Add Exercise
                            </button>
                          </div>
                          
                          {/* Exercises List */}
                          {(row.original as any).exercises && (row.original as any).exercises.length > 0 ? (
                            <div className="grid gap-2">
                              {(row.original as any).exercises.map((exercise: any, exerciseIndex: number) => (
                                <div 
                                  key={exercise.id} 
                                  className="bg-white p-3 rounded border border-slate-200 flex items-center justify-between"
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                                    <div>
                                      <span className="font-medium text-slate-700 text-sm">{exercise.name}</span>
                                      <div className="text-xs text-slate-500">{exercise.type}</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border bg-gradient-to-r from-emerald-100 to-green-200 text-emerald-800 border-emerald-300`}>
                                      {exercise.difficulty}
                                    </span>
                                    <div className="bg-slate-100 px-2 py-1 rounded border border-slate-200">
                                      <span className="text-sm text-slate-700">
                                        {exercise.sets} sets × {exercise.reps} {exercise.repUnit}
                                      </span>
                                    </div>
                                    <button
                                      onClick={() => {
                                        // Remove exercise logic
                                        alert(`Remove exercise: ${exercise.name}`);
                                      }}
                                      className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center text-slate-500 text-sm py-4">
                              No exercises in this training plan yet. Click "Add Exercise" to get started.
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
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
                      <div className="text-sm text-slate-500">There are no records to display at the moment.</div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      </div>

      {/* Mobile Table */}
      <div className="block md:hidden bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 overflow-hidden">
        {renderMobileTable()}
      </div>
    </div>
  )
} 