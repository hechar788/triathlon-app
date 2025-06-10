import { Difficulty } from "../../../lib/enums/difficulty";
import TrainingExercise from "../exercise/trainingExercise";
import { IExercise } from "../../../lib/interfaces/iExercise";
import { RepUnit } from "../../../lib/enums/units";

export default class TrainingPlan {
    #name: string;
    #difficulty: Difficulty;
    #trainingExercises: TrainingExercise[] = [];

    /**
     * Creates a new training plan
     * @param name The name of the training plan
     * @param difficulty The overall difficulty level of the plan
     */
    constructor(
        name: string = '', 
        difficulty: Difficulty = Difficulty.UNKNOWN, 
    ) {
        this.#name = name;
        this.#difficulty = difficulty;
    }
    
    /**
     * Gets the name of the training plan
     * @returns The name of the training plan
     */
    public getName(): string {
        return this.#name;
    }

    /**
     * Gets the difficulty level of the training plan
     * @returns The difficulty level
     */
    public getDifficulty(): Difficulty {
        return this.#difficulty;
    }

    /**
     * Sets the name of the training plan
     * @param name The new name for the training plan
     */
    public setName(name: string): void {
        this.#name = name;
    }

    /**
     * Sets the difficulty level of the training plan
     * @param difficulty The new difficulty level
     */
    public setDifficulty(difficulty: Difficulty): void {
        this.#difficulty = difficulty;
    }

    /**
     * Gets all training exercises in the plan
     * @returns A copy of the array of training exercises
     */
    public getTrainingExercises(): TrainingExercise[] {
        return [...this.#trainingExercises];
    }

    /**
     * Finds an exercise in the plan by name
     * @param exerciseName The name of the exercise to find
     * @returns The exercise if found, undefined otherwise
     */
    public getExercise(exerciseName: string): TrainingExercise {
        let exercise = this.#trainingExercises.find(exercise => exercise.name === exerciseName);
        if(exercise){
            return exercise
        } else {
            throw new Error('Exercise does not exist')
        }
    }

    /**
     * Get count of all the Training Exercises in the training plan
     * @returns The number of training exercises in the plan
     */
    public getCountOfExercises(): number {
        return this.#trainingExercises.length;
    }

    /**
     * Gets an exercise at a specific position in the plan
     * @param index The index of the exercise to retrieve
     * @returns The exercise at the specified index, or undefined if index is out of bounds
     */
    public getExerciseAt(index: number): TrainingExercise {
        if (index < 0 || index >= this.#trainingExercises.length) {
            throw new Error('Index out of range of training exercises')
        }
        return this.#trainingExercises[index];
    }

    /**
     * Adds an exercise to the training plan
     * @param exercise The exercise to add
     * @param sets The number of sets (defaults to exercise's default sets)
     * @param reps The number of repetitions (defaults to exercise's default reps)
     * @param repUnit The unit of measurement for repetitions (defaults to exercise's default unit)
     * @param difficulty The difficulty level (defaults to exercise's default difficulty)
     */
    public addExercise(
        exercise: IExercise, 
        sets: number = exercise.defaultSets, 
        reps: number = exercise.defaultReps, 
        repUnit: RepUnit = exercise.defaultRepUnitType, 
        difficulty: Difficulty = exercise.defaultDifficulty
    ): void {
        this.#trainingExercises.push(
            new TrainingExercise(
                exercise.type, 
                exercise.name, 
                exercise.description, 
                exercise.targetMuscles, 
                exercise.defaultSets, 
                exercise.defaultReps, 
                exercise.defaultRepUnitType, 
                exercise.defaultDifficulty, 
                sets, 
                reps, 
                repUnit, 
                difficulty
            )
        );
    }

    /**
     * Removes an exercise from the plan by name
     * @param exerciseName The name of the exercise to remove
     */
    public removeExercise(exerciseName: string): void {
        this.#trainingExercises = this.#trainingExercises.filter(exercise => exercise.name !== exerciseName);
    }

    /**
     * Removes an exercise at a specific position in the plan
     * @param index The index of the exercise to remove
     */
    public removeExerciseAt(index: number): void {
        if (index < 0 || index >= this.#trainingExercises.length) {
            throw new Error("Removing exercise outside bounds of training plan exercises");
        }
        this.#trainingExercises.splice(index, 1);
    }
}