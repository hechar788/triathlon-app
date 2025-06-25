import { TriathlonViewModel } from "./_viewModel/triathlonViewModel";
import useTriathlonTable from "./_table/useTriathlonTable";
import { ReactElement } from "react";

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
     * Gets the triathlon table component hook for rendering the data table.
     * This method returns the hook function that should be called within a React component.
     * 
     * @returns {Function} The useTriathlonTable hook function
     */
    public getTriathlonTable(): ReactElement {
        return useTriathlonTable(this.#viewModel.getTableData());
    }

    /**
     * Gets the distance range information for header display.
     * 
     * @returns {Object} Object containing total distance range and individual sport summaries
     */
    public getDistanceRangeInfo() {
        return this.#viewModel.getDistanceRangeInfo();
    }
}