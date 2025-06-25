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
 * @returns Configured DataTable component with training plan columns and data
 */
export default function useTrainingPlanTable(
    data: TrainingPlanRowData[], 
    selectedPlan: string | null,
    onPlanSelect: (planName: string) => void,
    onPlanDelete: (planName: string) => void,
    onDifficultyEdit?: (planName: string) => void
) {
    // Create a wrapped filter component
    const FilterComponentWithProps = React.useCallback((props: { table: any }) => (
        <TrainingPlanSearch {...props} />
    ), []);

    return (
        <DataTable 
            columns={trainingPlanColumns} 
            data={data}
            filterComponent={FilterComponentWithProps}
            containerWidth="full"
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