import { Difficulty } from "@/model/lib/enums/difficulty";

/**
 * Interface representing a single row of data in the triathlon information table.
 * Each row corresponds to a specific triathlon race type with its associated details
 * formatted for display in the data table component.
 * 
 * This interface is used throughout the table rendering pipeline from the view model
 * through to the column definitions and final display.
 */
export interface TriathlonRowData {
    /** Human-readable name of the triathlon type (e.g., "Sprint", "Standard", "Ironman") */
    type: string;
    difficulty: string
    difficultyColor: string;
    distances: string[];
    totalDistance: string;
    /** Numeric values for sorting - distances in kilometers */
    sortValues: {
        swimming: number;
        cycling: number;
        running: number;
        totalDistance: number;
    };
}

/**
 * Maps difficulty levels to their corresponding CSS color identifiers.
 */
export type DifficultyColor = 'grey' | 'green' | 'yellow' | 'orange' | 'red';
