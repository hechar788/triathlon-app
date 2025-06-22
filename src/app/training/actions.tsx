import { TrainingViewModel } from "./_viewModel/trainingViewModel";

/**
 * Controller class for accessing Training data and components.
 * Follows MVC/MVVM pattern by acting as a controller layer between the view (page.tsx) and the model/view-model.
 * 
 */
export default class TrainingController {
    /**
     * Private static instance of the TrainingViewModel that handles all data transformations
     * and business logic for training plan information display.
     */
    readonly #viewModel = new TrainingViewModel();
}
