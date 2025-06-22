import { Difficulty } from "@/model/lib/enums/difficulty";
import { Sport } from "@/model/lib/enums/sport";
import TrainingManagement from "@/model/components/training/management/trainingManagement";
import { DifficultyColor } from "@/app/_lib/types";

/**
 * View Model class that handles data transformation and business logic for training plan information display.
 * This class encapsulates all formatting logic, calculations, and data transformations
 * required to present training plan information in a user-friendly format.
 */
export class TrainingViewModel {
    #trainingManagement: TrainingManagement;

    /**
     * Creates a new TrainingViewModel instance.
     * Initializes the training management system with sample data for demonstration.
     */
    constructor() {
        this.#trainingManagement = new TrainingManagement("Sample Trainee");
        this.#initializeSampleData();
    }

    /**
     * Initializes sample training plans for demonstration purposes.
     * This method creates a few example training plans with different difficulty levels.
     * 
     * @private
     */
    #initializeSampleData(): void {
        // Create sample training plan with two exercises
        this.#trainingManagement.createTrainingPlan("Beginner Triathlon Plan", Difficulty.BEGINNER);
        const beginnerPlan = this.#trainingManagement.getTrainingPlan("Beginner Triathlon Plan");
        const swimExercise = this.#trainingManagement.getExerciseByName("Freestyle Technique Drills" as any);
        const runExercise = this.#trainingManagement.getExerciseByName("Strides" as any);
        beginnerPlan.addExercise(swimExercise);
        beginnerPlan.addExercise(runExercise);
    }

    /**
     * Gets all available exercises organized by sport.
     * 
     * @returns {Record<Sport, any[]>} Available exercises organized by sport
     */
    getAvailableExercises(): Record<Sport, any[]> {
        return this.#trainingManagement.getAllExercises();
    }

    /**
     * Gets the current trainee name from the training management system.
     * 
     * @returns {string} The name of the current trainee
     */
    getTraineeName(): string {
        return this.#trainingManagement.getTraineeName();
    }

    /**
     * Updates the trainee name in the training management system.
     * 
     * @param {string} name - The new trainee name
     */
    updateTraineeName(name: string): void {
        this.#trainingManagement.setTraineeName(name);
    }

    /**
     * Gets the total number of training plans.
     * 
     * @returns {number} Total count of training plans
     */
    getTrainingPlanCount(): number {
        return this.#trainingManagement.getCountOfTrainingPlans();
    }
} 