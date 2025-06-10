import { Sport } from "../../../lib/enums/sport";
import { Difficulty } from "../../../lib/enums/difficulty";

import { IExercise } from "../../../lib/interfaces/iExercise";
import { ExerciseName } from "../../../lib/types/exerciseName";

import { SWIM_EXERCISE_DATA } from "../../../lib/constants/swimExerciseData";
import { BIKE_EXERCISE_DATA } from "../../../lib/constants/bikeExerciseData";
import { RUN_EXERCISE_DATA } from "../../../lib/constants/runExerciseData";

export abstract class TrainingOptions {
    static #exercises: Record<Sport, IExercise[]> = {
        [Sport.SWIM]: Object.values(SWIM_EXERCISE_DATA),
        [Sport.BIKE]: Object.values(BIKE_EXERCISE_DATA),
        [Sport.RUN]: Object.values(RUN_EXERCISE_DATA)
    };

    /**
     * Get all exercises for all sports
     * @returns Record of all exercises organized by sport
     */
    static getAllExercises(): Record<Sport, IExercise[]> {
        return {
            [Sport.SWIM]: [...this.#exercises[Sport.SWIM]],
            [Sport.BIKE]: [...this.#exercises[Sport.BIKE]],
            [Sport.RUN]: [...this.#exercises[Sport.RUN]]
        };
    }

    /**
     * Get number of exercises in all sports
     * @returns Total count of exercises across all sports
     */
    static getAllExercisesCount(): number {
        const exercises = this.getAllExercises();
        return exercises[Sport.RUN].length + exercises[Sport.BIKE].length + exercises[Sport.SWIM].length;
    }

    /**
     * Get exercises of a particular difficulty for all sports
     * @param difficulty The difficulty level to filter by
     * @returns Array of exercises matching the specified difficulty across all sports
     */
    static getAllExercisesOfDifficulty(difficulty: Difficulty): IExercise[] {
        return this.getExercisesForSportOfDifficulty(Sport.RUN, difficulty)
            .concat(this.getExercisesForSportOfDifficulty(Sport.BIKE, difficulty))
            .concat(this.getExercisesForSportOfDifficulty(Sport.SWIM, difficulty));
    }

    /**
     * Get all exercises for a specific sport
     * @param sportType The sport to get exercises for
     * @returns Array of exercises for the specified sport
     */
    static getAllExercisesForSport(sportType: Sport): IExercise[] {
        return this.getAllExercises()[sportType];
    }

    /**
     * Get exercise count for specific sport
     * @param sportType The sport to count exercises for
     * @returns Number of exercises for the specified sport
     */
    static getExerciseCountForSport(sportType: Sport): number {
        return this.getAllExercises()[sportType].length;
    }

    /**
     * Get exercises of a particular difficulty for a specific sport
     * @param sportType The sport to filter exercises for
     * @param difficulty The difficulty level to filter by
     * @returns Array of exercises matching the specified sport and difficulty
     */
    static getExercisesForSportOfDifficulty(sportType: Sport, difficulty: Difficulty): IExercise[] {
        return this.getAllExercises()[sportType].filter(ex => ex.defaultDifficulty === difficulty);
    }

    /**
    * Get all exercise names across all sports
    * @returns Array of all exercise names
    */
    static getAllExerciseNames(): ExerciseName[] {
        const exerciseNames: ExerciseName[] = [];
        for (const sport of Object.values(Sport)) {
            const sportExercises = this.getAllExercises()[sport as Sport];
            sportExercises.forEach(exercise => {
                exerciseNames.push(exercise.name);
            });
        }
        return exerciseNames;
    }

    /**
    * Gets an exercise by its name
    * @param exerciseName The name of the exercise to find
    * @returns The exercise object if found
    * @throws Error if the exercise is not found
    */
    static getExerciseByName(exercise: string): IExercise {
        for (const sport of Object.values(Sport)) {
            const foundExercise = this.getAllExercisesForSport(sport as Sport).find(ex => ex.name === exercise);
            if (foundExercise) {
                return foundExercise;
            }
        }
        throw new Error(`Exercise with name '${exercise}' not found in any sport`);
    }

    /**
     * Gets an exercise by its name for a specific sport
     * @param exerciseName The name of the exercise to find
     * @param sport The sport to search in
     * @returns The exercise object if found
     * @throws Error if the exercise is not found in the specified sport
     */
    static getExerciseByNameForSport(exercise: ExerciseName, sport: Sport): IExercise {
        const foundExercise = this.getAllExercisesForSport(sport).find(ex => ex.name === exercise);
        if (foundExercise) {
            return foundExercise;
        }
        throw new Error(`Exercise with name '${exercise}' not found for sport '${sport}'`);
    }
}