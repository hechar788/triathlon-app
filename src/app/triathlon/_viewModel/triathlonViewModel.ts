import { TriathlonType } from "@/model/lib/enums/triathlonType";
import { Sport } from "@/model/lib/enums/sport";
import { TriathlonInformation } from "@/model/lib/types/triathlonInformation";
import { Difficulty } from "@/model/lib/enums/difficulty";

interface TriathlonRowData {
    type: string;
    difficulty: Difficulty;
    difficultyColor: string;
    distances: string[];
    totalDistance: string;
}

interface TriathlonTableData {
    headers: string[];
    rows: TriathlonRowData[];
}

export class TriathlonViewModel {
    #triathlonData: Record<TriathlonType, TriathlonInformation>;
    #triathlonTypes: TriathlonType[];
    #sportTypes: Sport[];

    constructor(
        triathlonData: Record<TriathlonType, TriathlonInformation>,
        triathlonTypes: TriathlonType[],
        sportTypes: Sport[]
    ) {
        this.#triathlonData = triathlonData;
        this.#triathlonTypes = triathlonTypes;
        this.#sportTypes = sportTypes;
    }

    #getDifficultyColor(difficulty: Difficulty): string {
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

    #formatType(type: TriathlonType): string {
        return type.replace(/_/g, ' ');
    }

    #formatDistance(kilometers: number): string {
        return `${kilometers} km`;
    }

    get tableData(): TriathlonTableData {
        return {
            headers: ['Type', 'Difficulty', ...this.#sportTypes.map(sport => `${sport} Distance`), 'Total Distance'],
            rows: this.#triathlonRows
        };
    }

    get sportTypes(): Sport[] {
        return [...this.#sportTypes];
    }

    get triathlonTypes(): TriathlonType[] {
        return [...this.#triathlonTypes];
    }

    get triathlonInformation(): Record<TriathlonType, TriathlonInformation> {
        return {...this.#triathlonData};
    }

    get #triathlonRows(): TriathlonRowData[] {
        return this.#triathlonTypes.map(type => {
            const info = this.#triathlonData[type];
            const totalDistance = Object.values(info.distances)
                .reduce((sum, distance) => sum + distance.kilometers, 0);

            const distances = this.#sportTypes.map(sport => 
                this.#formatDistance(info.distances[sport].kilometers)
            );

            return {
                type: this.#formatType(type),
                difficulty: info.difficulty,
                difficultyColor: this.#getDifficultyColor(info.difficulty),
                distances,
                totalDistance: this.#formatDistance(totalDistance)
            };
        });
    }
} 