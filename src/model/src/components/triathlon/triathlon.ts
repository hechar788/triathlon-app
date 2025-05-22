import { TriathlonType } from "../../lib/enums/triathlonType";
import { Difficulty } from "../../lib/enums/difficulty";
import { TriathlonInformation } from "../../lib/types/triathlonInformation";
import { Sport } from "../../lib/enums/sport";
import { IDistance } from "../../lib/interfaces/iDistance";
import { Distance } from "../util/distance";

export abstract class Triathlon {
    static #triathlons: Record<TriathlonType, TriathlonInformation> = {
        [TriathlonType.SUPER_SPRINT]: {
            difficulty: Difficulty.BEGINNER,
            distances: {
                [Sport.SWIM]: new Distance(0.4),
                [Sport.BIKE]: new Distance(10),
                [Sport.RUN]: new Distance(2.5)
            }
        },
        [TriathlonType.SPRINT]: {
            difficulty: Difficulty.BEGINNER,
            distances: {
                [Sport.SWIM]: new Distance(0.75),
                [Sport.BIKE]: new Distance(20),
                [Sport.RUN]: new Distance(5)
            }
        },
        [TriathlonType.STANDARD]: {
            difficulty: Difficulty.INTERMEDIATE,
            distances: {
                [Sport.SWIM]: new Distance(1.5),
                [Sport.BIKE]: new Distance(40),
                [Sport.RUN]: new Distance(10)
            }
        },
        [TriathlonType.HALF_IRONMAN]: {
            difficulty: Difficulty.ADVANCED,
            distances: {
                [Sport.SWIM]: new Distance(1.9),
                [Sport.BIKE]: new Distance(90),
                [Sport.RUN]: new Distance(21.1)
            }
        },
        [TriathlonType.PTO_T100]: {
            difficulty: Difficulty.ADVANCED,
            distances: {
                [Sport.SWIM]: new Distance(2),
                [Sport.BIKE]: new Distance(80),
                [Sport.RUN]: new Distance(18)
            }
        },
        [TriathlonType.IRONMAN]: {
            difficulty: Difficulty.EXPERT,
            distances: {
                [Sport.SWIM]: new Distance(3.8),
                [Sport.BIKE]: new Distance(180),
                [Sport.RUN]: new Distance(42.2)
            }
        }
    };

    // Get distance of every sport in every triathlon
    static getAllTriathlonInformation(): Record<TriathlonType, TriathlonInformation> {return this.#triathlons;}

    static getDifficulty(triathlonType: TriathlonType): Difficulty {
        return this.#triathlons[triathlonType].difficulty
    }

    // Get distance of every sport in a particular triathlon
    static getDistances(triathlonType: TriathlonType): Record<Sport, IDistance> {
        return this.#triathlons[triathlonType].distances;
    }

    // Get distance of a single sport in a particular triathlon
    static getDistance(triathlonType: TriathlonType, sportType: Sport): IDistance {
        return this.#triathlons[triathlonType].distances[sportType];
    }

    // Get total distance of a particular triathlon
    static getTotalDistance(triathlonType: TriathlonType): IDistance {
        const sportDistances = this.#triathlons[triathlonType].distances;
        return new Distance(
                sportDistances[Sport.SWIM].kilometers + 
                sportDistances[Sport.BIKE].kilometers + 
                sportDistances[Sport.RUN].kilometers
        )
    }
}