import { Difficulty } from "../../../lib/enums/difficulty";
import { Muscle } from "../../../lib/enums/muscle";
import { RepUnit } from "../../../lib/enums/units";
import { Sport } from "../../../lib/enums/sport";
import { IExerciseMetrics } from "../../../lib/interfaces/iExerciseMetrics";
import { IExerciseControls } from "../../../lib/interfaces/iExerciseControls";
import { ExerciseName } from "../../../lib/types/exerciseName";

export default class TrainingExercise implements IExerciseMetrics, IExerciseControls {
    #sets: number;
    #reps: number;
    #repUnits: RepUnit;
    #difficulty: Difficulty;

    /**
     * Creates a new training exercise.
     * @param type - The sport category this exercise belongs to.
     * @param name - The name of the exercise.
     * @param description - A description of how to perform the exercise.
     * @param targetMuscles - The muscles targeted by this exercise.
     * @param defaultSets - The default number of sets for this exercise.
     * @param defaultReps - The default number of repetitions for this exercise.
     * @param defaultRepUnitType - The default unit for measuring repetitions (e.g., count, seconds).
     * @param defaultDifficulty - The default difficulty level of this exercise.
     * @param sets - The current number of sets (defaults to defaultSets).
     * @param reps - The current number of repetitions (defaults to defaultReps).
     * @param repUnits - The current repetition unit (defaults to defaultRepUnitType).
     * @param difficulty - The current difficulty level (defaults to defaultDifficulty).
     */
    constructor(
        public readonly type: Sport,
        public readonly name: ExerciseName,
        public readonly description: string,
        public readonly targetMuscles: Muscle[],
        public readonly defaultSets: number,
        public readonly defaultReps: number,
        public readonly defaultRepUnitType: RepUnit,
        public readonly defaultDifficulty: Difficulty,
        sets: number = defaultSets,
        reps: number = defaultReps,
        repUnits: RepUnit = defaultRepUnitType,
        difficulty: Difficulty = defaultDifficulty
    ) { 
        this.#sets = sets;
        this.#reps = reps;
        this.#repUnits = repUnits;
        this.#difficulty = difficulty
    }

    /**
     * Gets the current number of sets.
     * @returns The number of sets.
     */
    public getSets(): number {
        return this.#sets
    }

    /**
     * Gets the current number of repetitions.
     * @returns The number of repetitions.
     */
    public getReps(): number {
        return this.#reps
    }

    /**
     * Gets the current difficulty level.
     * @returns The difficulty level.
     */
    public getDifficulty(): Difficulty {
        return this.#difficulty
    }

    /**
     * Gets the current repetition unit type.
     * @returns The repetition unit type.
     */
    public getRepUnits(): RepUnit {
        return this.#repUnits;
    }

    /**
     * Sets the number of sets for this exercise.
     * @param numOfSets - The new number of sets.
     */
    public setSets(numOfSets: number): void {
        this.#sets = numOfSets;
    }

    /**
     * Sets the number of repetitions for this exercise.
     * @param numOfReps - The new number of repetitions.
     */
    public setReps(numOfReps: number): void {
        this.#reps = numOfReps;
    }

    /**
     * Sets the repetition unit type for this exercise.
     * @param repUnit - The new repetition unit type.
     */
    public setRepUnits(repUnit: RepUnit): void {
        this.#repUnits = repUnit;
    }

    /**
     * Sets the difficulty level for this exercise.
     * @param difficulty - The new difficulty level.
     */
    public setDifficulty(difficulty: Difficulty): void {
        this.#difficulty = difficulty;
    }

    /**
     * Reverts all exercise metrics to their default values.
     */
    public revertTrainingExerciseToDefaults(): void {
        this.revertSetsToDefault();
        this.revertRepsToDefault();
        this.revertRepUnitToDefault();
        this.revertDifficultyToDefault();
    }

    /**
     * Reverts the number of sets to the default value.
     */
    public revertSetsToDefault(): void {
        this.#sets = this.defaultSets;
    }

    /**
     * Reverts the number of repetitions to the default value.
     */
    public revertRepsToDefault(): void {
        this.#reps = this.defaultReps;
    }

    /**
     * Reverts the repetition unit type to the default value.
     */
    public revertRepUnitToDefault(): void {
        this.#repUnits = this.defaultRepUnitType;
    }

    /**
     * Reverts the difficulty level to the default value.
     */
    public revertDifficultyToDefault(): void {
        this.#difficulty = this.defaultDifficulty;
    }
}