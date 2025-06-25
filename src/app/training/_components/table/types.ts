/**
 * Interface representing a single row of data in the training plans table.
 * Each row corresponds to a specific training plan with its associated details
 * formatted for display in the data table component.
 * 
 * This interface is used throughout the table rendering pipeline from the view model
 * through to the column definitions and final display.
 */
export interface TrainingPlanRowData {
    id: string;
    name: string;
    difficulty: string;
    difficultyColor: string;
    exerciseCount: number;
    sortValues: {
        exerciseCount: number;
    };
}

/**
 * Interface representing a single row of data in the exercises table.
 * Each row corresponds to a specific exercise within a training plan.
 */
export interface ExerciseRowData {
    id: string;
    name: string;
    type: string;
    description: string;
    targetMuscles: string[];
    sets: number;
    reps: number;
    repUnit: string;
    difficulty: string;
    difficultyColor: string;
    sortValues: {
        sets: number;
        reps: number;
    };
}

/**
 * Maps difficulty levels to their corresponding CSS color identifiers.
 */
export type DifficultyColor = 'grey' | 'green' | 'yellow' | 'orange' | 'red';
