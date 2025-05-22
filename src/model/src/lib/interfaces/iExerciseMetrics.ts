import { Difficulty } from "../enums/difficulty"
import { RepUnit } from "../enums/units"
import { IExercise } from "./iExercise"

export interface IExerciseMetrics extends IExercise {
    getSets(): number
    getReps(): number
    getRepUnits(): RepUnit
    getDifficulty(): Difficulty
    setSets(numberOfSets: number): void
    setReps(numberOfReps: number): void
    setRepUnits(repUnit:RepUnit): void
    setDifficulty(difficulty: Difficulty): void
}