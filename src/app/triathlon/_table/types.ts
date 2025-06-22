
/**
 * Interface representing a single row of data in the triathlon information table.
 * Each row corresponds to a specific triathlon race type with its associated details
 * formatted for display in the data table component.
 * 
 * This interface is used throughout the table rendering pipeline from the view model
 * through to the column definitions and final display.
 */
export interface TriathlonRowData {
    type: string;
    difficulty: string
    difficultyColor: string;
    distances: string[];
    totalDistance: string;
    sortValues: {
        swimming: number;
        cycling: number;
        running: number;
        totalDistance: number;
    };
}
