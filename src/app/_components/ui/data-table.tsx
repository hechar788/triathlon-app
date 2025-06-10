"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="w-full">
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
  )
} 