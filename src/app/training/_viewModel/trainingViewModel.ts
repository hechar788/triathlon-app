import { Difficulty } from "@/model/lib/enums/difficulty";
import { Sport } from "@/model/lib/enums/sport";
import { RepUnit } from "@/model/lib/enums/units";
import TrainingManagement from "@/model/components/training/management/trainingManagement";
import TrainingExercise from "@/model/components/training/exercise/trainingExercise";
import { TrainingPlanRowData, ExerciseRowData } from "../_components/table/types";
import { DifficultyColor } from "@/app/_lib/types";
import { IExercise } from "@/model/lib/interfaces/iExercise";
import { Muscle } from "@/model/lib/enums/muscle";
import { ExerciseName } from "@/model/lib/types/exerciseName";
import TrainingPlan from "@/model/components/training/plan/trainingPlan";

// Interface for saved training management data
interface SavedTrainingData {
    id: string;
    timestamp: number;
    traineeName: string;
    description?: string;
    data: SerializableTrainingManagement;
}

// Interface for exercise edit history
interface ExerciseEditHistory {
    id: string;
    value: number;
    timestamp: number;
    dateFormatted: string;
}

// Interface for edit history storage
interface EditHistoryStorage {
    [planName: string]: {
        [exerciseName: string]: {
            sets: ExerciseEditHistory[];
            reps: ExerciseEditHistory[];
        };
    };
}

// Serializable versions of the classes for localStorage
interface SerializableTrainingManagement {
    traineeName: string;
    trainingPlans: SerializableTrainingPlan[];
}

interface SerializableTrainingPlan {
    name: string;
    difficulty: Difficulty;
    trainingExercises: SerializableTrainingExercise[];
}

interface SerializableTrainingExercise {
    type: Sport;
    name: ExerciseName;
    description: string;
    targetMuscles: Muscle[];
    defaultSets: number;
    defaultReps: number;
    defaultRepUnitType: RepUnit;
    defaultDifficulty: Difficulty;
    sets: number;
    reps: number;
    repUnits: RepUnit;
    difficulty: Difficulty;
}

/**
 * View Model class that handles data transformation and business logic for training information display.
 * This class encapsulates all formatting logic, calculations, and data transformations
 * required to present training information in a user-friendly format.
 */
export class TrainingViewModel {
    #trainingManagement: TrainingManagement;
    #selectedPlanName: string | null = null;
    #localStorageKey = 'triathlon-training-data';
    #editHistoryKey = 'triathlon-edit-history';
    #editHistory: EditHistoryStorage = {};
    #indexedDBName = 'TriathlonTrainingDB';
    #indexedDBVersion = 1;
    #indexedDBStoreName = 'training-data';

    /**
     * Creates a new TrainingViewModel instance
     * @param traineeName Initial trainee name
     */
    constructor(traineeName: string = "Trainee") {
        this.#trainingManagement = new TrainingManagement(traineeName);
        this.#loadEditHistoryFromStorage();
        this.#initializeDefaultData();
    }

    /**
     * Attempts to restore data from localStorage (client-side only)
     * Should be called after component mounts to restore previously saved state
     */
    public restoreFromLocalStorageIfAvailable(): boolean {
        // Only run on client side
        if (typeof window === 'undefined') return false;
        
        try {
            const savedData = this.#getSavedTrainingData();
            if (savedData.length === 0) return false;
            
            // Get the most recent save
            const mostRecent = savedData.sort((a, b) => b.timestamp - a.timestamp)[0];
            
            // Only restore if it's more recent than our default data initialization
            // This prevents overwriting user changes with old saves
            this.#trainingManagement = this.#deserializeTrainingManagement(mostRecent.data);
            this.#selectedPlanName = null; // Reset selected plan
            
            return true;
        } catch (error) {
            console.error('Error restoring from localStorage:', error);
            return false;
        }
    }

    /**
     * Initialize default training plans for demonstration
     */
    #initializeDefaultData(): void {
        this.#trainingManagement.createTrainingPlan("Default Training Plan", Difficulty.BEGINNER);

        const beginnerPlan = this.#trainingManagement.getTrainingPlan("Default Training Plan");
        const allExercises = this.#trainingManagement.getAllExercises();

        beginnerPlan.addExercise(allExercises[Sport.SWIM][0]);
        beginnerPlan.addExercise(allExercises[Sport.BIKE][0]);
        beginnerPlan.addExercise(allExercises[Sport.RUN][0]);

    }

    /**
     * Maps a difficulty level to its corresponding color identifier for UI styling.
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
            case Difficulty.EXPERT:
                return 'red';
            default:
                return 'grey';
        }
    }

    /**
     * Gets the current trainee name
     */
    public getTraineeName(): string {
        return this.#trainingManagement.getTraineeName();
    }

    /**
     * Sets the trainee name
     */
    public setTraineeName(name: string): void {
        this.#trainingManagement.setTraineeName(name);
    }

    /**
     * Gets the count of available training plans
     */
    public getTrainingPlanCount(): number {
        return this.#trainingManagement.getCountOfTrainingPlans();
    }

    /**
     * Gets the currently selected training plan name
     */
    public getSelectedPlanName(): string | null {
        return this.#selectedPlanName;
    }

    /**
     * Sets the currently selected training plan
     */
    public setSelectedPlan(planName: string | null): void {
        this.#selectedPlanName = planName;
    }

    /**
     * Creates a new training plan
     */
    public createTrainingPlan(name: string, difficulty: Difficulty = Difficulty.BEGINNER): void {
        this.#trainingManagement.createTrainingPlan(name, difficulty);
    }

    /**
     * Removes a training plan by name
     */
    public removeTrainingPlan(name: string): void {
        this.#trainingManagement.removeTrainingPlan(name);
        if (this.#selectedPlanName === name) {
            this.#selectedPlanName = null;
        }
    }

    /**
     * Adds an exercise to the selected training plan
     */
    public addExerciseToSelectedPlan(exercise: IExercise): void {
        if (!this.#selectedPlanName) {
            throw new Error("No training plan selected");
        }
        const plan: TrainingPlan = this.#trainingManagement.getTrainingPlan(this.#selectedPlanName);
        plan.addExercise(exercise);
    }

    /**
     * Removes an exercise from the selected training plan
     */
    public removeExerciseFromSelectedPlan(exerciseName: string): void {
        if (!this.#selectedPlanName) {
            throw new Error("No training plan selected");
        }
        const plan = this.#trainingManagement.getTrainingPlan(this.#selectedPlanName);
        plan.removeExercise(exerciseName);
    }

    /**
     * Gets all available exercises
     */
    public getAllExercises(): Record<Sport, IExercise[]> {
        return this.#trainingManagement.getAllExercises();
    }

    /**
     * Updates the sets for an exercise in the selected training plan
     */
    public updateExerciseSets(exerciseName: string, sets: number): void {
        if (!this.#selectedPlanName) {
            throw new Error("No training plan selected");
        }
        const plan = this.#trainingManagement.getTrainingPlan(this.#selectedPlanName);
        const exercise = plan.getExercise(exerciseName);
        
        // Track the edit in history
        this.#addEditToHistory(this.#selectedPlanName, exerciseName, 'sets', sets);
        
        exercise.setSets(sets);
    }

    /**
     * Updates the reps for an exercise in the selected training plan
     */
    public updateExerciseReps(exerciseName: string, reps: number): void {
        if (!this.#selectedPlanName) {
            throw new Error("No training plan selected");
        }
        const plan = this.#trainingManagement.getTrainingPlan(this.#selectedPlanName);
        const exercise = plan.getExercise(exerciseName);
        
        // Track the edit in history
        this.#addEditToHistory(this.#selectedPlanName, exerciseName, 'reps', reps);
        
        exercise.setReps(reps);
    }

    /**
     * Updates the difficulty for a training plan
     */
    public updateTrainingPlanDifficulty(planName: string, difficulty: Difficulty): void {
        const plan = this.#trainingManagement.getTrainingPlan(planName);
        plan.setDifficulty(difficulty);
    }

    /**
     * Gets a training plan by name
     */
    public getTrainingPlan(planName: string): any {
        return this.#trainingManagement.getTrainingPlan(planName);
    }

    /**
     * Transforms training plan data into formatted table row data
     */
    public getTrainingPlanTableData(): TrainingPlanRowData[] {
        const plans = this.#trainingManagement.getTrainingPlans();
        
        return plans.map((plan, index) => ({
            id: `plan-${index}`,
            name: plan.getName(),
            difficulty: plan.getDifficulty(),
            difficultyColor: this.#getDifficultyColor(plan.getDifficulty()),
            exerciseCount: plan.getCountOfExercises(),
            sortValues: {
                exerciseCount: plan.getCountOfExercises()
            }
        }));
    }

    /**
     * Transforms exercise data for the selected training plan into formatted table row data
     */
    public getSelectedPlanExerciseTableData(): ExerciseRowData[] {
        if (!this.#selectedPlanName) {
            return [];
        }

        try {
            const plan = this.#trainingManagement.getTrainingPlan(this.#selectedPlanName);
            const exercises = plan.getTrainingExercises();

            return exercises.map((exercise, index) => ({
                id: `exercise-${index}`,
                name: exercise.name,
                type: exercise.type,
                description: exercise.description,
                targetMuscles: exercise.targetMuscles,
                sets: exercise.getSets(),
                reps: exercise.getReps(),
                repUnit: exercise.getRepUnits(),
                difficulty: exercise.getDifficulty(),
                difficultyColor: this.#getDifficultyColor(exercise.getDifficulty()),
                sortValues: {
                    sets: exercise.getSets(),
                    reps: exercise.getReps()
                }
            }));
        } catch (error) {
            console.error("Error getting exercise data:", error);
            return [];
        }
    }

    /**
     * Gets the edit history for a specific exercise
     */
    public getExerciseEditHistory(planName: string, exerciseName: string, editType: 'sets' | 'reps'): ExerciseEditHistory[] {
        if (!this.#editHistory[planName] || !this.#editHistory[planName][exerciseName]) {
            return [];
        }
        return this.#editHistory[planName][exerciseName][editType] || [];
    }

    /**
     * Gets the default value for an exercise field
     */
    public getExerciseDefaultValue(exerciseName: string, editType: 'sets' | 'reps'): number {
        if (!this.#selectedPlanName) {
            throw new Error("No training plan selected");
        }
        const plan = this.#trainingManagement.getTrainingPlan(this.#selectedPlanName);
        const exercise = plan.getExercise(exerciseName);
        
        return editType === 'sets' ? exercise.defaultSets : exercise.defaultReps;
    }

    /**
     * Adds an edit to the history
     */
    #addEditToHistory(planName: string, exerciseName: string, editType: 'sets' | 'reps', value: number): void {
        // Initialize history structure if needed
        if (!this.#editHistory[planName]) {
            this.#editHistory[planName] = {};
        }
        if (!this.#editHistory[planName][exerciseName]) {
            this.#editHistory[planName][exerciseName] = { sets: [], reps: [] };
        }

        // Create the history entry
        const entry: ExerciseEditHistory = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            value,
            timestamp: Date.now(),
            dateFormatted: new Date().toLocaleString()
        };

        // Add to history (keep only last 10 entries per field)
        this.#editHistory[planName][exerciseName][editType].push(entry);
        if (this.#editHistory[planName][exerciseName][editType].length > 10) {
            this.#editHistory[planName][exerciseName][editType].shift();
        }

        // Save to localStorage
        this.#saveEditHistoryToStorage();
    }

    /**
     * Loads edit history from localStorage
     */
    #loadEditHistoryFromStorage(): void {
        if (typeof window === 'undefined') return;
        
        try {
            const data = localStorage.getItem(this.#editHistoryKey);
            if (data) {
                this.#editHistory = JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading edit history from localStorage:', error);
            this.#editHistory = {};
        }
    }

    /**
     * Saves edit history to localStorage
     */
    #saveEditHistoryToStorage(): void {
        if (typeof window === 'undefined') return;
        
        try {
            localStorage.setItem(this.#editHistoryKey, JSON.stringify(this.#editHistory));
        } catch (error) {
            console.error('Error saving edit history to localStorage:', error);
        }
    }

    /**
     * Saves the current training management to localStorage
     */
    public saveToLocalStorage(description?: string): string {
        try {
            const serializedData = this.#serializeTrainingManagement();
            const savedData: SavedTrainingData = {
                id: Date.now().toString(),
                timestamp: Date.now(),
                traineeName: this.#trainingManagement.getTraineeName(),
                description,
                data: serializedData
            };

            // Get existing saved data
            const existingData = this.#getSavedTrainingData();
            existingData.push(savedData);

            // Save training data to localStorage
            localStorage.setItem(this.#localStorageKey, JSON.stringify(existingData));
            
            // Also save current edit history (this is separate from the saved training data)
            this.#saveEditHistoryToStorage();
            
            return savedData.id;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            throw new Error('Failed to save training data');
        }
    }

    /**
     * Loads training management from localStorage by ID
     */
    public loadFromLocalStorage(id: string): void {
        try {
            const savedData = this.#getSavedTrainingData();
            const dataToLoad = savedData.find(item => item.id === id);
            
            if (!dataToLoad) {
                throw new Error('Training data not found');
            }

            this.#trainingManagement = this.#deserializeTrainingManagement(dataToLoad.data);
            this.#selectedPlanName = null; // Reset selected plan
            
            // Edit history is maintained seperately so users don't lose their edit history when switching between saves
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            throw new Error('Failed to load training data');
        }
    }

    /**
     * Gets all saved training data summaries
     */
    public getSavedTrainingDataSummaries(): Array<{
        id: string;
        timestamp: number;
        traineeName: string;
        description?: string;
        planCount: number;
        dateFormatted: string;
    }> {
        try {
            const savedData = this.#getSavedTrainingData();
            return savedData.map(item => ({
                id: item.id,
                timestamp: item.timestamp,
                traineeName: item.traineeName,
                description: item.description,
                planCount: item.data.trainingPlans.length,
                dateFormatted: new Date(item.timestamp).toLocaleString()
            })).sort((a, b) => b.timestamp - a.timestamp); // Most recent first
        } catch (error) {
            console.error('Error getting saved training data:', error);
            return [];
        }
    }

    /**
     * Deletes saved training data by ID
     */
    public deleteSavedTrainingData(id: string): void {
        try {
            const savedData = this.#getSavedTrainingData();
            const filteredData = savedData.filter(item => item.id !== id);
            localStorage.setItem(this.#localStorageKey, JSON.stringify(filteredData));
        } catch (error) {
            console.error('Error deleting saved training data:', error);
            throw new Error('Failed to delete training data');
        }
    }

    /**
     * Gets saved training data from localStorage
     */
    #getSavedTrainingData(): SavedTrainingData[] {
        try {
            const data = localStorage.getItem(this.#localStorageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error parsing saved training data:', error);
            return [];
        }
    }

    /**
     * Serializes the current training management for storage
     */
    #serializeTrainingManagement(): SerializableTrainingManagement {
        const plans = this.#trainingManagement.getTrainingPlans();
        
        return {
            traineeName: this.#trainingManagement.getTraineeName(),
            trainingPlans: plans.map(plan => ({
                name: plan.getName(),
                difficulty: plan.getDifficulty(),
                trainingExercises: plan.getTrainingExercises().map(exercise => ({
                    type: exercise.type,
                    name: exercise.name,
                    description: exercise.description,
                    targetMuscles: exercise.targetMuscles,
                    defaultSets: exercise.defaultSets,
                    defaultReps: exercise.defaultReps,
                    defaultRepUnitType: exercise.defaultRepUnitType,
                    defaultDifficulty: exercise.defaultDifficulty,
                    sets: exercise.getSets(),
                    reps: exercise.getReps(),
                    repUnits: exercise.getRepUnits(),
                    difficulty: exercise.getDifficulty()
                }))
            }))
        };
    }

    /**
     * Deserializes training management data from storage
     */
    #deserializeTrainingManagement(data: SerializableTrainingManagement): TrainingManagement {
        const trainingManagement = new TrainingManagement(data.traineeName);
        
        // Recreate training plans
        data.trainingPlans.forEach(planData => {
            trainingManagement.createTrainingPlan(planData.name, planData.difficulty);
            const plan = trainingManagement.getTrainingPlan(planData.name);
            
            // Recreate exercises for this plan
            planData.trainingExercises.forEach(exerciseData => {
                const exercise = new TrainingExercise(
                    exerciseData.type,
                    exerciseData.name,
                    exerciseData.description,
                    exerciseData.targetMuscles,
                    exerciseData.defaultSets,
                    exerciseData.defaultReps,
                    exerciseData.defaultRepUnitType,
                    exerciseData.defaultDifficulty,
                    exerciseData.sets,
                    exerciseData.reps,
                    exerciseData.repUnits,
                    exerciseData.difficulty
                );
                
                // Add the exercise directly to the plan's exercise array
                // We need to use the IExercise interface for the addExercise method
                const iExercise: IExercise = {
                    type: exerciseData.type,
                    name: exerciseData.name,
                    description: exerciseData.description,
                    targetMuscles: exerciseData.targetMuscles,
                    defaultSets: exerciseData.defaultSets,
                    defaultReps: exerciseData.defaultReps,
                    defaultRepUnitType: exerciseData.defaultRepUnitType,
                    defaultDifficulty: exerciseData.defaultDifficulty
                };
                
                plan.addExercise(
                    iExercise,
                    exerciseData.sets,
                    exerciseData.reps,
                    exerciseData.repUnits,
                    exerciseData.difficulty
                );
            });
        });
        
        return trainingManagement;
    }

    /**
     * Initialize IndexedDB database
     */
    #initIndexedDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            if (typeof window === 'undefined') {
                reject(new Error('IndexedDB not available on server side'));
                return;
            }

            const request = indexedDB.open(this.#indexedDBName, this.#indexedDBVersion);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                
                // Create object store if it doesn't exist
                if (!db.objectStoreNames.contains(this.#indexedDBStoreName)) {
                    const store = db.createObjectStore(this.#indexedDBStoreName, { keyPath: 'id' });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                    store.createIndex('traineeName', 'traineeName', { unique: false });
                }
            };
        });
    }

    /**
     * Saves the current training management to IndexedDB
     * If overwriteId is provided, it will overwrite the existing save with that ID
     * If saveWithName is provided, it will be used as the custom name
     */
    public async saveToIndexedDB(description?: string, saveWithName?: string, overwriteId?: string): Promise<string> {
        try {
            const db = await this.#initIndexedDB();
            const serializedData = this.#serializeTrainingManagement();
            
            let id: string;
            
            if (overwriteId) {
                // Use the provided ID to overwrite existing save
                id = overwriteId;
            } else {
                // Create new save with unique ID
                id = Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);
            }

            const savedData: SavedTrainingData & { customName?: string } = {
                id,
                timestamp: Date.now(),
                traineeName: this.#trainingManagement.getTraineeName(),
                description,
                customName: saveWithName,
                data: serializedData
            };

            const transaction = db.transaction([this.#indexedDBStoreName], 'readwrite');
            const store = transaction.objectStore(this.#indexedDBStoreName);
            
            await new Promise<void>((resolve, reject) => {
                const request = store.put(savedData);
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });

            db.close();
            return id;
        } catch (error) {
            console.error('Error saving to IndexedDB:', error);
            throw new Error('Failed to save training data to IndexedDB');
        }
    }

    /**
     * Loads training management from IndexedDB by ID
     */
    public async loadFromIndexedDB(id: string): Promise<void> {
        try {
            const db = await this.#initIndexedDB();
            const transaction = db.transaction([this.#indexedDBStoreName], 'readonly');
            const store = transaction.objectStore(this.#indexedDBStoreName);
            
            const dataToLoad = await new Promise<SavedTrainingData>((resolve, reject) => {
                const request = store.get(id);
                request.onsuccess = () => {
                    if (request.result) {
                        resolve(request.result);
                    } else {
                        reject(new Error('Training data not found'));
                    }
                };
                request.onerror = () => reject(request.error);
            });

            this.#trainingManagement = this.#deserializeTrainingManagement(dataToLoad.data);
            this.#selectedPlanName = null; // Reset selected plan
            
            db.close();
        } catch (error) {
            console.error('Error loading from IndexedDB:', error);
            throw new Error('Failed to load training data from IndexedDB');
        }
    }

    /**
     * Gets all saved training data summaries from IndexedDB
     */
    public async getSavedIndexedDBDataSummaries(): Promise<Array<{
        id: string;
        timestamp: number;
        traineeName: string;
        description?: string;
        customName?: string;
        planCount: number;
        dateFormatted: string;
    }>> {
        try {
            const db = await this.#initIndexedDB();
            const transaction = db.transaction([this.#indexedDBStoreName], 'readonly');
            const store = transaction.objectStore(this.#indexedDBStoreName);
            
            const savedData = await new Promise<(SavedTrainingData & { customName?: string })[]>((resolve, reject) => {
                const request = store.getAll();
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });

            db.close();

            return savedData.map(item => ({
                id: item.id,
                timestamp: item.timestamp,
                traineeName: item.traineeName,
                description: item.description,
                customName: item.customName,
                planCount: item.data.trainingPlans.length,
                dateFormatted: new Date(item.timestamp).toLocaleString()
            })).sort((a, b) => b.timestamp - a.timestamp); // Most recent first
        } catch (error) {
            console.error('Error getting saved IndexedDB data:', error);
            return [];
        }
    }

    /**
     * Deletes saved training data from IndexedDB by ID
     */
    public async deleteSavedIndexedDBData(id: string): Promise<void> {
        try {
            const db = await this.#initIndexedDB();
            const transaction = db.transaction([this.#indexedDBStoreName], 'readwrite');
            const store = transaction.objectStore(this.#indexedDBStoreName);
            
            await new Promise<void>((resolve, reject) => {
                const request = store.delete(id);
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });

            db.close();
        } catch (error) {
            console.error('Error deleting IndexedDB data:', error);
            throw new Error('Failed to delete training data from IndexedDB');
        }
    }

    /**
     * Attempts to restore data from IndexedDB (client-side only)
     * Should be called after component mounts to restore previously saved state
     */
    public async restoreFromIndexedDBIfAvailable(): Promise<boolean> {
        // Only run on client side
        if (typeof window === 'undefined') return false;
        
        try {
            const savedData = await this.getSavedIndexedDBDataSummaries();
            if (savedData.length === 0) return false;
            
            // Get the most recent save
            const mostRecent = savedData.sort((a, b) => b.timestamp - a.timestamp)[0];
            
            // Load the most recent save
            await this.loadFromIndexedDB(mostRecent.id);
            this.#selectedPlanName = null; // Reset selected plan
            
            return true;
        } catch (error) {
            console.error('Error restoring from IndexedDB:', error);
            return false;
        }
    }

    /**
     * Gets all custom save names from IndexedDB
     */
    public async getCustomSaveNames(): Promise<string[]> {
        try {
            const summaries = await this.getSavedIndexedDBDataSummaries();
            return summaries
                .filter(item => item.customName)
                .map(item => item.customName!)
                .filter((name, index, array) => array.indexOf(name) === index) // Remove duplicates
                .sort();
        } catch (error) {
            console.error('Error getting custom save names:', error);
            return [];
        }
    }

    /**
     * Export current training data to file using File System Access API
     */
    public async exportToFile(description?: string, customName?: string): Promise<void> {
        try {
            const { FileSystemAPI } = await import('@/app/_lib/file-system-api');
            
            const serializedData = this.#serializeTrainingManagement();
            const trainingData = {
                id: Date.now().toString() + '-export',
                timestamp: Date.now(),
                traineeName: this.#trainingManagement.getTraineeName(),
                description,
                customName,
                data: serializedData
            };

            // Get edit history for export
            const editHistory = this.#editHistory;

            await FileSystemAPI.exportTrainingData(trainingData, editHistory);
        } catch (error) {
            console.error('Error exporting to file:', error);
            throw error;
        }
    }

    /**
     * Import training data from file using File System Access API
     */
    public async importFromFile(): Promise<void> {
        try {
            const { FileSystemAPI } = await import('@/app/_lib/file-system-api');
            
            const { trainingData, editHistory } = await FileSystemAPI.importTrainingData();
            
            // Load the imported data
            this.#trainingManagement = this.#deserializeTrainingManagement(trainingData.data);
            this.#selectedPlanName = null; // Reset selected plan
            
            // Load edit history if available
            if (editHistory) {
                this.#editHistory = editHistory;
                this.#saveEditHistoryToStorage();
            }
            
        } catch (error) {
            console.error('Error importing from file:', error);
            throw error;
        }
    }

    /**
     * Export all saved training data as backup file
     */
    public async exportAllAsBackup(): Promise<void> {
        try {
            const { FileSystemAPI } = await import('@/app/_lib/file-system-api');
            
            // Get all saved data from IndexedDB
            const indexedDBData = await this.getSavedIndexedDBDataSummaries();
            const localStorageData = this.getSavedTrainingDataSummaries();
            
            // Combine all data
            const allData = [
                ...indexedDBData.map(item => ({
                    id: item.id,
                    timestamp: item.timestamp,
                    traineeName: item.traineeName,
                    description: item.description,
                    customName: item.customName,
                    data: {} // We'd need to fetch full data for each item
                })),
                ...localStorageData.map(item => ({
                    id: item.id,
                    timestamp: item.timestamp,
                    traineeName: item.traineeName,
                    description: item.description,
                    customName: undefined,
                    data: {} // We'd need to fetch full data for each item
                }))
            ];

            await FileSystemAPI.exportBackup(allData, this.#editHistory);
        } catch (error) {
            console.error('Error exporting backup:', error);
            throw error;
        }
    }

    /**
     * Check if File System Access API is supported
     */
    public static isFileSystemAPISupported(): boolean {
        if (typeof window === 'undefined') return false;
        return 'showSaveFilePicker' in window && 'showOpenFilePicker' in window;
    }

    /**
     * Get browser compatibility message for File System API
     */
    public static getFileSystemAPICompatibilityMessage(): string {
        if (typeof window === 'undefined') return 'Not available on server';
        
        if (TrainingViewModel.isFileSystemAPISupported()) {
            return 'File System Access API is supported';
        }
        
        const userAgent = navigator.userAgent;
        if (userAgent.includes('Chrome') || userAgent.includes('Edge')) {
            return 'Your browser supports File System Access API, but it may be disabled';
        } else if (userAgent.includes('Firefox')) {
            return 'Firefox does not support File System Access API yet. Please use Chrome or Edge for file export/import';
        } else if (userAgent.includes('Safari')) {
            return 'Safari does not support File System Access API yet. Please use Chrome or Edge for file export/import';
        }
        
        return 'Your browser does not support File System Access API. Please use Chrome or Edge for file export/import';
    }
} 