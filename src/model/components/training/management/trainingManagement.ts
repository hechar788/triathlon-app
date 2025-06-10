import { TrainingOptions } from "../options/trainingOptions";
import { IExercise } from "../../../lib/interfaces/iExercise";
import TrainingPlan from "../plan/trainingPlan";
import { Difficulty } from "../../../lib/enums/difficulty";
import { Sport } from "../../../lib/enums/sport";
import { ExerciseName } from "../../../lib/types/exerciseName";

export default class TrainingManagement {
    #traineeName: string;
    #trainingPlans: TrainingPlan[];

    /**
     * Creates a new training management instance.
     * @param trainingName - The name of the trainee.
     */
    constructor(trainingName: string = '') {
        this.#traineeName = trainingName;
        this.#trainingPlans = [];
    }

    /**
     * Gets the current trainee name.
     * @returns The name of the trainee.
     */
    public getTraineeName(): string {
        return this.#traineeName;
    }

    /**
     * Sets a new trainee name.
     * @param name - The new name to set for the trainee.
     */
    public setTraineeName(name: string): void {
        this.#traineeName = name;
    }

    // Training Plans - CRUD

    /**
     * Gets the total number of training plans.
     * @returns The count of training plans.
     */
    public getCountOfTrainingPlans(): number {
        return this.#trainingPlans.length;
    }

    /**
     * Gets a copy of all training plans.
     * @returns A new array containing all training plans.
     */
    public getTrainingPlans(): TrainingPlan[] {
        return [...this.#trainingPlans];
    }

    /**
     * Gets training plans sorted by difficulty level (from lowest to highest).
     * @returns A sorted array of training plans.
     */
    public getSortedTrainingPlansByDifficulty(): TrainingPlan[] {
        const difficultyOrder = {
            [Difficulty.UNKNOWN]: 0,
            [Difficulty.BEGINNER]: 1,
            [Difficulty.INTERMEDIATE]: 2,
            [Difficulty.ADVANCED]: 3,
            [Difficulty.EXPERT]: 4
        };
        return this.getTrainingPlans()
            .sort((a, b) => {
                const diffA = difficultyOrder[a.getDifficulty()];
                const diffB = difficultyOrder[b.getDifficulty()];
                return diffA - diffB;
            });
    }

    /**
     * Checks if a training plan with the given name exists.
     * @param name - The name of the training plan to check.
     * @returns True if the training plan exists, false otherwise.
     */
    public checkTrainingPlanExists(name: string): boolean {
        return this.#trainingPlans.some(plan => plan.getName() === name);
    }

    /**
     * Gets a training plan by name.
     * @param name - The name of the training plan to retrieve.
     * @returns The training plan with the specified name.
     * @throws Error if the training plan is not found.
     */
    public getTrainingPlan(name: string): TrainingPlan {
        const plan = this.#trainingPlans.find(plan => plan.getName() === name);
        if (!plan) {
            throw new Error(`Training plan: '${name}' not found`);
        }
        return plan;
    }

    /**
     * Gets a training plan at the specified index.
     * @param index - The index of the training plan to retrieve.
     * @returns The training plan at the specified index.
     * @throws Error if the index is out of range.
     */
    public getTrainingPlanAt(index: number): TrainingPlan {
        if (index < 0 || index >= this.#trainingPlans.length) {
            throw new Error(`Training plan: '${index}' outside range`);
        }
        return this.#trainingPlans[index];
    }

    /**
     * Creates a new training plan.
     * @param name - The name for the new training plan.
     * @param difficulty - The difficulty level of the training plan.
     */
    public createTrainingPlan(name: string = '', difficulty: Difficulty = Difficulty.UNKNOWN): void {
        this.#trainingPlans.push(new TrainingPlan(name, difficulty));
    }

    /**
     * Removes a training plan by name.
     * @param name - The name of the training plan to remove.
     */
    public removeTrainingPlan(name: string): void {
        this.#trainingPlans = this.#trainingPlans.filter(plan => plan.getName() !== name);
    }

    /**
     * Removes a training plan at the specified index.
     * @param index - The index of the training plan to remove.
     * @throws Error if the index is out of range.
     */
    public removeTrainingPlanAt(index: number): void {
        if (index < 0 || index >= this.#trainingPlans.length) {
            throw new Error("Removing Training Plan at non-existent index");
        }
        this.#trainingPlans.splice(index, 1);
    }

    // Training Options - Proxy

    /**
     * Gets all exercises organized by sport.
     * @returns A record mapping sport types to arrays of exercises.
     */
    public getAllExercises(): Record<Sport, IExercise[]> {
        return TrainingOptions.getAllExercises();
    }

    /**
     * Gets the total count of all exercises across all sports.
     * @returns The total number of exercises.
     */
    public getAllExercisesCount(): number {
        return TrainingOptions.getAllExercisesCount();
    }

    /**
     * Gets all exercises of a specific difficulty level.
     * @param difficulty - The difficulty level to filter by.
     * @returns An array of exercises matching the specified difficulty.
     */
    public getAllExercisesOfDifficulty(difficulty: Difficulty): IExercise[] {
        return TrainingOptions.getAllExercisesOfDifficulty(difficulty);
    }

    /**
     * Gets all exercises for a specific sport.
     * @param sportType - The sport type to filter by.
     * @returns An array of exercises for the specified sport.
     */
    public getAllExercisesForSport(sportType: Sport): IExercise[] {
        return TrainingOptions.getAllExercisesForSport(sportType);
    }

    /**
     * Gets the count of exercises for a specific sport.
     * @param sportType - The sport type to count exercises for.
     * @returns The number of exercises for the specified sport.
     */
    public getExerciseCountForSport(sportType: Sport): number {
        return TrainingOptions.getExerciseCountForSport(sportType);
    }

    /**
     * Gets exercises for a specific sport and difficulty level.
     * @param sportType - The sport type to filter by.
     * @param difficulty - The difficulty level to filter by.
     * @returns An array of exercises matching the sport and difficulty.
     */
    public getExercisesForSportOfDifficulty(sportType: Sport, difficulty: Difficulty): IExercise[] {
        return TrainingOptions.getExercisesForSportOfDifficulty(sportType, difficulty);
    }

    /**
     * Gets all exercise names.
     * @returns An array of all exercise names.
     */
    public getAllExerciseNames(): ExerciseName[] {
        return TrainingOptions.getAllExerciseNames();
    }

    /**
     * Gets an exercise by its name.
     * @param exercise - The name of the exercise to retrieve.
     * @returns The exercise with the specified name.
     */
    public getExerciseByName(exercise: ExerciseName): IExercise {
        return TrainingOptions.getExerciseByName(exercise);
    }

    /**
     * Gets an exercise by name for a specific sport.
     * @param exercise - The name of the exercise to retrieve.
     * @param sport - The sport type the exercise belongs to.
     * @returns The exercise with the specified name for the specified sport.
     */
    public getExerciseByNameForSport(exercise: ExerciseName, sport: Sport): IExercise {
        return TrainingOptions.getExerciseByNameForSport(exercise, sport);
    }
}