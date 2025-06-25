import React from "react";
import { DataTable } from "@/app/_components/ui/data-table";
import { exerciseColumns } from "./exerciseColumns";
import { ExerciseRowData } from "./types";

/**
 * Custom React hook to create and configure an exercise data table component.
 * 
 * @param data - Array of exercise row data to display in the table
 * @param onExerciseDelete - Callback when an exercise is deleted from the plan
 * @param onExerciseSetsEdit - Callback when exercise sets edit is requested
 * @param onExerciseRepsEdit - Callback when exercise reps edit is requested
 * @returns Configured DataTable component with exercise columns and data
 */
export default function useExerciseTable(
    data: ExerciseRowData[], 
    onExerciseDelete: (exerciseName: string) => void,
    onExerciseSetsEdit?: (exerciseName: string) => void,
    onExerciseRepsEdit?: (exerciseName: string) => void
) {
    return (
        <DataTable 
            columns={exerciseColumns} 
            data={data}
            containerWidth="full"
            meta={{
                onExerciseDelete,
                onExerciseSetsEdit,
                onExerciseRepsEdit
            }}
        />
    );
} 