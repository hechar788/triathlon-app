import React from "react";
import { DataTable } from "@/app/_components/ui/data-table";
import { trainingPlanColumns } from "./trainingPlanColumns";
import { TrainingPlanRowData } from "./types";
import TrainingPlanSearch from "./TrainingPlanSearch";

/**
 * Custom React hook to create and configure a training plan data table component.
 * 
 * @param data - Array of training plan row data to display in the table
 * @param selectedPlan - Currently selected training plan name
 * @param onPlanSelect - Callback when a training plan is selected
 * @param onPlanDelete - Callback when a training plan is deleted
 * @param onDifficultyEdit - Callback when a training plan difficulty is edited
 * @param onSave - Callback when save to localStorage is clicked
 * @param onLoad - Callback when load from localStorage is clicked
 * @param onIndexedDBSave - Callback when save to IndexedDB is clicked
 * @param onIndexedDBLoad - Callback when load from IndexedDB is clicked
 * @param onExportToFile - Callback when export to file is clicked
 * @param onImportFromFile - Callback when import from file is clicked
 * @param showFileSystemButtons - Whether to show file system buttons
 * @returns Configured DataTable component with training plan columns and data
 */
export default function useTrainingPlanTable(
    data: TrainingPlanRowData[], 
    selectedPlan: string | null,
    onPlanSelect: (planName: string) => void,
    onPlanDelete: (planName: string) => void,
    onDifficultyEdit?: (planName: string) => void,
    onSave?: () => void,
    onLoad?: () => void,
    onIndexedDBSave?: () => void,
    onIndexedDBLoad?: () => void,
    onExportToFile?: () => void,
    onImportFromFile?: () => void,
    showFileSystemButtons: boolean = false
) {
    // Create a wrapped filter component that includes all storage handlers
    const FilterComponentWithProps = React.useCallback((props: { table: any }) => (
        <TrainingPlanSearch 
            {...props} 
            onSave={onSave} 
            onLoad={onLoad}
            onIndexedDBSave={onIndexedDBSave}
            onIndexedDBLoad={onIndexedDBLoad}
            onExportToFile={onExportToFile}
            onImportFromFile={onImportFromFile}
            showFileSystemButtons={showFileSystemButtons}
        />
    ), [onSave, onLoad, onIndexedDBSave, onIndexedDBLoad, onExportToFile, onImportFromFile, showFileSystemButtons]);

    return (
        <DataTable 
            columns={trainingPlanColumns} 
            data={data}
            filterComponent={FilterComponentWithProps}
            meta={{
                selectedPlan,
                onPlanSelect,
                onPlanDelete,
                onDifficultyEdit,
                onRowClick: (rowData: TrainingPlanRowData) => onPlanSelect(rowData.name)
            }}
        />
    );
} 