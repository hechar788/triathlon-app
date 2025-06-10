import { Difficulty } from "../enums/difficulty";
import { Sport } from "../enums/sport";
import { IDistance } from "../interfaces/iDistance";

export type TriathlonInformation = {
    difficulty: Difficulty;
    distances: Record<Sport, IDistance>;
}