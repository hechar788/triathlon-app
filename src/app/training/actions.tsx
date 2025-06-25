import { ReactElement } from "react";
import { TrainingViewModel } from "./_viewModel/trainingViewModel";
import useTrainingPlanTable from "./_components/table/useTrainingPlanTable";
import useExerciseTable from "./_components/table/useExerciseTable";
import { Difficulty } from "@/model/lib/enums/difficulty";

/**
 * Controller class for accessing Training data and components.
 * Follows MVC/MVVM pattern by acting as a controller layer between the view (page.tsx) and the model/view-model.
 */
export default class TrainingController {
    /**
     * Private static instance of the TrainingViewModel that handles all data transformations
     * and business logic for training information display.
     */
    readonly #viewModel = new TrainingViewModel("John Doe");

    /**
     * Gets the training view model instance for direct access to training data and methods.
     * 
     * @returns {TrainingViewModel} The training view model instance
     */
    public getViewModel(): TrainingViewModel {
        return this.#viewModel;
    }

    /**
     * Gets the training plan table component hook for rendering all training plans.
     * 
     * @param selectedPlan Currently selected training plan name
     * @param onPlanSelect Callback when a training plan is selected 
     * @param onPlanDelete Callback when a training plan is deleted
     * @param onDifficultyEdit Callback when a training plan difficulty is edited
     * @returns {ReactElement} The training plan table component
     */
    public getTrainingPlanTable(
        selectedPlan: string | null,
        onPlanSelect: (planName: string) => void,
        onPlanDelete: (planName: string) => void,
        onDifficultyEdit?: (planName: string) => void
    ): ReactElement {
        return useTrainingPlanTable(
            this.#viewModel.getTrainingPlanTableData(),
            selectedPlan,
            onPlanSelect,
            onPlanDelete,
            onDifficultyEdit
        );
    }

    /**
     * Gets the exercises table component hook for rendering the selected plan's exercises.
     * 
     * @param selectedPlan Currently selected training plan name
     * @param onExerciseDelete Callback when an exercise is deleted
     * @param onExerciseSetsEdit Callback when exercise sets edit is requested
     * @param onExerciseRepsEdit Callback when exercise reps edit is requested
     * @returns {ReactElement} The exercises table component
     */
    public getExerciseTable(
        selectedPlan: string | null,
        onExerciseDelete: (exerciseName: string) => void,
        onExerciseSetsEdit?: (exerciseName: string) => void,
        onExerciseRepsEdit?: (exerciseName: string) => void
    ): ReactElement {
        this.#viewModel.setSelectedPlan(selectedPlan);
        return useExerciseTable(
            this.#viewModel.getSelectedPlanExerciseTableData(),
            onExerciseDelete,
            onExerciseSetsEdit,
            onExerciseRepsEdit
        );
    }

    /**
     * Updates the sets for an exercise in the selected training plan
     * 
     * @param exerciseName Name of the exercise to update
     * @param sets New number of sets
     */
    public updateExerciseSets(exerciseName: string, sets: number): void {
        this.#viewModel.updateExerciseSets(exerciseName, sets);
    }

    /**
     * Updates the reps for an exercise in the selected training plan
     * 
     * @param exerciseName Name of the exercise to update
     * @param reps New number of reps
     */
    public updateExerciseReps(exerciseName: string, reps: number): void {
        this.#viewModel.updateExerciseReps(exerciseName, reps);
    }

    /**
     * Updates the difficulty for a training plan
     * 
     * @param planName Name of the training plan to update
     * @param difficulty New difficulty level
     */
    public updateTrainingPlanDifficulty(planName: string, difficulty: Difficulty): void {
        this.#viewModel.updateTrainingPlanDifficulty(planName, difficulty);
    }

    /**
     * Export current training data to file using File System Access API
     * 
     * @param description Optional description for the export
     * @param customName Optional custom name for the export
     */
    public async exportToFile(description?: string, customName?: string): Promise<void> {
        return this.#viewModel.exportToFile(description, customName);
    }

    /**
     * Import training data from file using File System Access API
     */
    public async importFromFile(): Promise<void> {
        return this.#viewModel.importFromFile();
    }

    /**
     * Check if File System Access API is supported
     */
    public static isFileSystemAPISupported(): boolean {
        return TrainingViewModel.isFileSystemAPISupported();
    }

    /**
     * Get browser compatibility message for File System API
     */
    public static getFileSystemAPICompatibilityMessage(): string {
        return TrainingViewModel.getFileSystemAPICompatibilityMessage();
    }
}
