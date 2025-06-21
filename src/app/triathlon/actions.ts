import { TriathlonViewModel } from "./_viewModel/triathlonViewModel";
import { TriathlonRowData } from "./types";
import useTriathlonTable from "./_table/useTriathlonTable";

/**
 * Controller class for accessing Triathlon data and components.
 * Follows MVC/MVVM pattern by acting as a controller layer between the view (page.tsx) and the model/view-model.
 * 
 */
export default class TriathlonController {
    /**
     * Private static instance of the TriathlonViewModel that handles all data transformations
     * and business logic for triathlon information display.
     */
    readonly #viewModel = new TriathlonViewModel();

    /**
     * Each row contains formatted information about a specific triathlon type including
     * difficulty, distances for each sport, and total distance.
     * 
     * @returns {TriathlonRowData[]} Array of formatted triathlon data for table display
     */
    private getTableData(): TriathlonRowData[] {
        return this.#viewModel.getTableData();
    }

    /**
     * Gets the triathlon table component hook for rendering the data table.
     * This method returns the hook function that should be called within a React component.
     * 
     * @returns {Function} The useTriathlonTable hook function
     */
    public getTriathlonTable() {
        return useTriathlonTable(this.getTableData());
    }
}