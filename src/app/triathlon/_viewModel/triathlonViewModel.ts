import { TriathlonType } from "@/model/lib/enums/triathlonType";
import { Sport } from "@/model/lib/enums/sport";
import { TriathlonInformation } from "@/model/lib/types/triathlonInformation";
import { Difficulty } from "@/model/lib/enums/difficulty";
import { Triathlon } from "@/model/components/triathlon/triathlon";
import { TriathlonRowData, DifficultyColor } from "../types";

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
     * Calculates and formats the distance range for a specific sport across all triathlon types.
     * Returns a string showing the minimum and maximum distances for the given sport.
     * 
     * @param {Sport} sport - The sport type to calculate range for
     * @returns {string} Formatted distance range (e.g., "0.4km - 3.8km")
     */
    getSportDistanceRange(sport: Sport): string {
        const distances = this.#triathlonTypes.map(type => 
            this.#triathlonData[type].distances[sport].kilometers
        );
        
        const minDistance = Math.min(...distances);
        const maxDistance = Math.max(...distances);
        
        return `${minDistance}km - ${maxDistance}km`;
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

    /**
     * Gets a copy of the available sport types array.
     * Returns a new array to prevent external modification of internal state.
     * 
     * @returns {Sport[]} Array of sport types (Swimming, Cycling, Running)
     */
    get sportTypes(): Sport[] {
        return [...this.#sportTypes];
    }

    /**
     * Gets a copy of the available triathlon types array.
     * Returns a new array to prevent external modification of internal state.
     * 
     * @returns {TriathlonType[]} Array of triathlon race types
     */
    get triathlonTypes(): TriathlonType[] {
        return [...this.#triathlonTypes];
    }

    /**
     * Gets a copy of the triathlon information data.
     * Returns a new object to prevent external modification of internal state.
     * 
     * @returns {Record<TriathlonType, TriathlonInformation>} Complete triathlon data mapping
     */
    get triathlonInformation(): Record<TriathlonType, TriathlonInformation> {
        return {...this.#triathlonData};
    }
} 