import { TriathlonType } from "@/model/lib/enums/triathlonType";
import { Sport } from "@/model/lib/enums/sport";
import { TriathlonInformation } from "@/model/lib/types/triathlonInformation";
import { Difficulty } from "@/model/lib/enums/difficulty";
import { Triathlon } from "@/model/components/triathlon/triathlon";
import { TriathlonRowData } from "../_table/types";
import { DifficultyColor } from "@/app/_lib/types";

/**
 * View Model class that handles data transformation and business logic for triathlon information display.
 * This class encapsulates all formatting logic, calculations, and data transformations
 * required to present triathlon information in a user-friendly format.
 */
export class TriathlonViewModel {
    #triathlonData: Record<TriathlonType, TriathlonInformation> = Triathlon.getAllTriathlonInformation();
    #triathlonTypes: TriathlonType[] = Object.values(TriathlonType);
    #sportTypes: Sport[] = Object.values(Sport);

    /**
     * Maps a difficulty level to its corresponding color identifier for UI styling.
     * 
     * @private
     * @param {Difficulty} difficulty - The difficulty level to map
     * @returns {string} Color identifier (grey, green, yellow, orange, red)
     */
    #getDifficultyColor(difficulty: Difficulty): DifficultyColor {
        switch (difficulty) {
            case Difficulty.UNKNOWN:
                return 'grey';
            case Difficulty.BEGINNER:
                return 'green';
            case Difficulty.INTERMEDIATE:
                return 'yellow';
            case Difficulty.ADVANCED:
                return 'orange';
            default:
                return 'red';
        }
    }

    /**
     * Formats a distance value into a standardized string with unit suffix.
     * 
     * @private
     * @param {number} kilometers - The distance value in kilometers
     * @returns {string} Formatted distance string with 'km' suffix
     */
    #formatDistance(kilometers: number): string {
        return `${kilometers} km`;
    }

    /**
     * Transforms raw triathlon data into formatted table row data ready for display.
     * Each row contains processed information about a triathlon type including formatted
     * distances, difficulty styling, and calculated totals.
     * 
     * @returns {TriathlonRowData[]} Array of formatted triathlon data for table display
     */
    getTableData(): TriathlonRowData[] {
        return this.#triathlonTypes.map(type => {
            const info = this.#triathlonData[type];
            const distances = this.#sportTypes.map(sport => 
                this.#formatDistance(info.distances[sport].kilometers)
            );

            const totalDistanceKm = Object.values(info.distances).reduce((sum, distance) => sum + distance.kilometers, 0);

            return {
                type: type.replace(/_/g, ' '),
                difficulty: info.difficulty as string,
                difficultyColor: this.#getDifficultyColor(info.difficulty),
                distances,
                totalDistance: this.#formatDistance(totalDistanceKm),
                sortValues: {
                    swimming: info.distances[Sport.SWIM].kilometers,
                    cycling: info.distances[Sport.BIKE].kilometers,
                    running: info.distances[Sport.RUN].kilometers,
                    totalDistance: totalDistanceKm
                }
            };
        });
    }
} 