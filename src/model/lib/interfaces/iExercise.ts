import { RepUnit } from "../enums/units";
import { Difficulty } from "../enums/difficulty";
import { Sport } from "../enums/sport";
import { Muscle } from "../enums/muscle";
import { ExerciseName } from "../types/exerciseName";

export interface IExercise {
    readonly type: Sport;
    readonly name: ExerciseName;
    readonly description: string;
    readonly targetMuscles: Muscle[];
    readonly defaultSets: number;
    readonly defaultReps: number;
    readonly defaultRepUnitType: RepUnit;
    readonly defaultDifficulty: Difficulty;
}