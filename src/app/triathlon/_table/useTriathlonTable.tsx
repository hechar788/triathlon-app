import React from "react";
import { DataTable } from "@/app/_components/ui/data-table";
import { columns } from "./columns";
import { TriathlonRowData } from "./columns";
import TriathlonFilters from "./TriathlonFilters";

/**
 * Custom React hook to create and configure a triathlon data table component.
 * 
 * @param {TriathlonRowData[]} data - Array of triathlon row data to display in the table
 * @returns {React.ReactElement} - Configured DataTable component with triathlon columns and data
 * 
 * @example
 * ```tsx
 * const TriathlonRowData[] tableData = getTriathlonData();
 * const table = useTriathlonTable(tableData);
 * return <div>{table}</div>;
 * ```
 */
export default function useTriathlonTable(data: TriathlonRowData[]) {
    return (
        <DataTable 
            columns={columns} 
            data={data} 
            filterComponent={TriathlonFilters}
        />
    );
}