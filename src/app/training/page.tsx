"use client"
import { useState, useCallback, useMemo, useEffect } from "react";
import TrainingController from './actions';
import { Button } from "@/app/_components/ui/button";
import { Difficulty } from "@/model/lib/enums/difficulty";
import { IExercise } from "@/model/lib/interfaces/iExercise";
import SuccessPopup from "@/app/_components/ui/success-popup";
import EditHistoryPopup, { EditHistoryEntry } from "@/app/_components/ui/edit-history-popup";

export default function TrainingPage() {
    const [actions] = useState(() => new TrainingController());
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedPlanName, setSelectedPlanName] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);
    const [showAddPlanDialog, setShowAddPlanDialog] = useState(false);
    const [showAddExerciseDialog, setShowAddExerciseDialog] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState<IExercise | null>(null);
    const [showEditDifficultyDialog, setShowEditDifficultyDialog] = useState(false);
    const [editingPlanName, setEditingPlanName] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
    const [newPlanName, setNewPlanName] = useState("");
    const [traineeNameEditing, setTraineeNameEditing] = useState(false);
    const [traineeNameValue, setTraineeNameValue] = useState(actions.getViewModel().getTraineeName());
    
    // localStorage related state
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [showLoadDialog, setShowLoadDialog] = useState(false);
    const [saveDescription, setSaveDescription] = useState("");
    const [selectedLoadId, setSelectedLoadId] = useState<string | null>(null);
    
    // IndexedDB related state
    const [showIndexedDBSaveDialog, setShowIndexedDBSaveDialog] = useState(false);
    const [showIndexedDBLoadDialog, setShowIndexedDBLoadDialog] = useState(false);
    const [indexedDBSaveDescription, setIndexedDBSaveDescription] = useState("");
    const [indexedDBSaveName, setIndexedDBSaveName] = useState("");
    const [selectedIndexedDBLoadId, setSelectedIndexedDBLoadId] = useState<string | null>(null);
    const [indexedDBDataSummaries, setIndexedDBDataSummaries] = useState<any[]>([]);
    const [customSaveNames, setCustomSaveNames] = useState<string[]>([]);
    const [enableOverwrite, setEnableOverwrite] = useState(false);
    const [availableSaves, setAvailableSaves] = useState<Array<{id: string; displayName: string; customName?: string}>>([]);
    
    // Status messages state
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [statusType, setStatusType] = useState<'success' | 'error' | 'info'>('success');
    
    // Edit history popup state
    const [showEditHistoryPopup, setShowEditHistoryPopup] = useState(false);
    const [editingExercise, setEditingExercise] = useState<{
        name: string;
        setsData: {
            currentValue: number;
            defaultValue: number;
            history: EditHistoryEntry[];
        };
        repsData: {
            currentValue: number;
            defaultValue: number;
            history: EditHistoryEntry[];
        };
    } | null>(null);

    // File System API state
    const [isFileAPISupported] = useState(() => 
        typeof window !== 'undefined' && TrainingController.isFileSystemAPISupported()
    );

    const forceRefresh = useCallback(() => {
        setRefreshKey(prev => prev + 1);
    }, []);

    // Utility function to show status messages
    const showStatusMessage = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success', duration: number = 3000) => {
        setStatusMessage(message);
        setStatusType(type);
        setTimeout(() => setStatusMessage(null), duration);
    }, []);

    const handlePlanSelect = useCallback((planName: string) => {
        if (selectedPlanName === planName) {
            setSelectedPlanName(null);
        } else {
            setSelectedPlanName(planName);
        }
    }, [selectedPlanName]);

    const handlePlanDelete = useCallback((planName: string) => {
        actions.getViewModel().removeTrainingPlan(planName);
        if (selectedPlanName === planName) {
            setSelectedPlanName(null);
        }
        showStatusMessage(`Training plan "${planName}" deleted successfully!`, 'info');
        forceRefresh();
    }, [actions, selectedPlanName, forceRefresh, showStatusMessage]);

    const handleAddPlan = useCallback(() => {
        if (newPlanName.trim()) {
            actions.getViewModel().createTrainingPlan(newPlanName.trim(), Difficulty.BEGINNER);
            showStatusMessage(`Training plan "${newPlanName.trim()}" created successfully!`);
            setNewPlanName("");
            setShowAddPlanDialog(false);
            forceRefresh();
        }
    }, [newPlanName, actions, forceRefresh, showStatusMessage]);

    const handleExerciseDelete = useCallback((exerciseName: string) => {
        actions.getViewModel().removeExerciseFromSelectedPlan(exerciseName);
        showStatusMessage(`Exercise "${exerciseName}" deleted successfully!`, 'info');
        forceRefresh();
    }, [actions, forceRefresh, showStatusMessage]);

    const handleAddExercise = useCallback((exercise: IExercise) => {
        actions.getViewModel().addExerciseToSelectedPlan(exercise);
        showStatusMessage(`Exercise "${exercise.name}" added successfully!`);
        forceRefresh();
    }, [actions, forceRefresh, showStatusMessage]);

    const handleExerciseEdit = useCallback((exerciseName: string) => {
        if (!selectedPlanName) return;
        
        // Get data for both sets and reps
        const setsHistory = actions.getViewModel().getExerciseEditHistory(selectedPlanName, exerciseName, 'sets');
        const repsHistory = actions.getViewModel().getExerciseEditHistory(selectedPlanName, exerciseName, 'reps');
        const setsDefaultValue = actions.getViewModel().getExerciseDefaultValue(exerciseName, 'sets');
        const repsDefaultValue = actions.getViewModel().getExerciseDefaultValue(exerciseName, 'reps');
        
        const exerciseData = actions.getViewModel().getSelectedPlanExerciseTableData()
            .find(ex => ex.name === exerciseName);
        
        if (!exerciseData) return;
        
        setEditingExercise({
            name: exerciseName,
            setsData: {
                currentValue: exerciseData.sets,
                defaultValue: setsDefaultValue,
                history: setsHistory
            },
            repsData: {
                currentValue: exerciseData.reps,
                defaultValue: repsDefaultValue,
                history: repsHistory
            }
        });
        setShowEditHistoryPopup(true);
    }, [selectedPlanName, actions]);

    const handleEditHistoryConfirm = useCallback((sets: number, reps: number) => {
        if (!editingExercise) return;
        
        actions.updateExerciseSets(editingExercise.name, sets);
        actions.updateExerciseReps(editingExercise.name, reps);
        
        setShowEditHistoryPopup(false);
        setEditingExercise(null);
        forceRefresh();
    }, [editingExercise, actions, forceRefresh]);

    const handleEditHistoryClose = useCallback(() => {
        setShowEditHistoryPopup(false);
        setEditingExercise(null);
    }, []);

    const handleDifficultyEdit = useCallback((planName: string) => {
        setEditingPlanName(planName);
        setShowEditDifficultyDialog(true);
    }, []);

    const handleDifficultyUpdate = useCallback(() => {
        if (editingPlanName && selectedDifficulty) {
            actions.updateTrainingPlanDifficulty(editingPlanName, selectedDifficulty);
            setShowEditDifficultyDialog(false);
            setEditingPlanName(null);
            setSelectedDifficulty(null);
            forceRefresh();
        }
    }, [editingPlanName, selectedDifficulty, actions, forceRefresh]);

    const handleTraineeNameSubmit = useCallback(() => {
        const trimmedName = traineeNameValue.trim();
        if (trimmedName) {
            actions.getViewModel().setTraineeName(trimmedName);
            setTraineeNameEditing(false);
            forceRefresh();
        } else {
            // If empty, revert to the current name and exit edit mode
            setTraineeNameValue(actions.getViewModel().getTraineeName());
            setTraineeNameEditing(false);
        }
    }, [traineeNameValue, actions, forceRefresh]);

    const handleTraineeNameKeyPress = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleTraineeNameSubmit();
        } else if (e.key === 'Escape') {
            setTraineeNameValue(actions.getViewModel().getTraineeName());
            setTraineeNameEditing(false);
        }
    }, [handleTraineeNameSubmit, actions]);

    // Memoize data that depends on refreshKey and selectedPlanName
    const allExercises = useMemo(() => {
        return actions.getViewModel().getAllExercises();
    }, [actions]);

    const traineeName = useMemo(() => {
        return actions.getViewModel().getTraineeName();
    }, [actions, refreshKey]);

    const trainingPlanCount = useMemo(() => {
        return actions.getViewModel().getTrainingPlanCount();
    }, [actions, refreshKey]);

    const handleSaveToLocalStorage = useCallback(() => {
        try {
            const id = actions.getViewModel().saveToLocalStorage(saveDescription.trim() || undefined);
            showStatusMessage("Training data saved successfully!");
            setSaveDescription("");
            setShowSaveDialog(false);
        } catch (error) {
            showStatusMessage("Failed to save training data. Please try again.", 'error', 5000);
        }
    }, [actions, saveDescription, showStatusMessage]);

    const handleLoadFromLocalStorage = useCallback(() => {
        if (!selectedLoadId) return;
        
        try {
            actions.getViewModel().loadFromLocalStorage(selectedLoadId);
            showStatusMessage("Training data loaded successfully!");
            setSelectedLoadId(null);
            setShowLoadDialog(false);
            setSelectedPlanName(null); // Reset selected plan
            forceRefresh();
        } catch (error) {
            showStatusMessage("Failed to load training data. Please try again.", 'error', 5000);
        }
    }, [actions, selectedLoadId, forceRefresh, showStatusMessage]);

    const handleDeleteSavedData = useCallback((id: string) => {
        try {
            actions.getViewModel().deleteSavedTrainingData(id);
            if (selectedLoadId === id) {
                setSelectedLoadId(null);
            }
            forceRefresh(); // To update the load dialog
        } catch (error) {
            console.error("Failed to delete saved data:", error);
        }
    }, [actions, selectedLoadId, forceRefresh]);

    // IndexedDB handlers
    const handleSaveToIndexedDB = useCallback(async () => {
        try {
            let saveName: string | undefined = undefined;
            let overwriteId: string | undefined = undefined;
            
            if (enableOverwrite && indexedDBSaveName.trim()) {
                // Find the selected save
                const selectedSave = availableSaves.find(save => save.displayName === indexedDBSaveName.trim());
                if (selectedSave) {
                    // Use the existing ID to overwrite
                    overwriteId = selectedSave.id;
                    // Use the customName if it exists, otherwise use the displayName as the new customName
                    saveName = selectedSave.customName || selectedSave.displayName;
                }
            }
            
            const id = await actions.getViewModel().saveToIndexedDB(
                indexedDBSaveDescription.trim() || undefined,
                saveName,
                overwriteId
            );
            showStatusMessage("Training data saved to IndexedDB successfully!");
            setIndexedDBSaveDescription("");
            setIndexedDBSaveName("");
            setEnableOverwrite(false);
            setShowIndexedDBSaveDialog(false);
        } catch (error) {
            showStatusMessage("Failed to save training data to IndexedDB. Please try again.", 'error', 5000);
        }
    }, [actions, indexedDBSaveDescription, indexedDBSaveName, enableOverwrite, availableSaves, showStatusMessage]);

    const handleLoadFromIndexedDB = useCallback(async () => {
        if (!selectedIndexedDBLoadId) return;
        
        try {
            await actions.getViewModel().loadFromIndexedDB(selectedIndexedDBLoadId);
            showStatusMessage("Training data loaded from IndexedDB successfully!");
            setSelectedIndexedDBLoadId(null);
            setShowIndexedDBLoadDialog(false);
            setSelectedPlanName(null); // Reset selected plan
            forceRefresh();
        } catch (error) {
            showStatusMessage("Failed to load training data from IndexedDB. Please try again.", 'error', 5000);
        }
    }, [actions, selectedIndexedDBLoadId, forceRefresh, showStatusMessage]);

    const handleDeleteIndexedDBData = useCallback(async (id: string) => {
        try {
            await actions.getViewModel().deleteSavedIndexedDBData(id);
            if (selectedIndexedDBLoadId === id) {
                setSelectedIndexedDBLoadId(null);
            }
            // Refresh the IndexedDB data list
            const summaries = await actions.getViewModel().getSavedIndexedDBDataSummaries();
            setIndexedDBDataSummaries(summaries);
        } catch (error) {
            console.error("Failed to delete IndexedDB data:", error);
        }
    }, [actions, selectedIndexedDBLoadId]);

    const loadIndexedDBData = useCallback(async () => {
        if (!isClient) return;
        try {
            const summaries = await actions.getViewModel().getSavedIndexedDBDataSummaries();
            setIndexedDBDataSummaries(summaries);
            
            const names = await actions.getViewModel().getCustomSaveNames();
            setCustomSaveNames(names);
            
            // Create list of all saves available for overwrite
            const saves = summaries.map(summary => ({
                id: summary.id,
                displayName: summary.customName || `${summary.traineeName} - ${summary.dateFormatted}`,
                customName: summary.customName
            }));
            setAvailableSaves(saves);
        } catch (error) {
            console.error("Error loading IndexedDB data:", error);
        }
    }, [actions, isClient]);

    // Load IndexedDB data when dialogs are opened
    useEffect(() => {
        if (showIndexedDBSaveDialog || showIndexedDBLoadDialog) {
            loadIndexedDBData();
        }
    }, [showIndexedDBSaveDialog, showIndexedDBLoadDialog, loadIndexedDBData]);

    // Effect to restore localStorage data after component mounts
    useEffect(() => {
        setIsClient(true);
        
        // Try to restore data from localStorage
        const restored = actions.getViewModel().restoreFromLocalStorageIfAvailable();
        if (restored) {
            showStatusMessage("Previous training data restored from local storage", 'info');
            forceRefresh();
        }
    }, [actions, showStatusMessage, forceRefresh]);

    // File System API handlers
    const handleExportToFile = useCallback(async () => {
        if (!isFileAPISupported) {
            showStatusMessage('File System Access API not supported in this browser. Please use Chrome or Edge.', 'error', 5000);
            return;
        }

        try {
            await actions.exportToFile();
            showStatusMessage('Training data exported to file successfully!');
        } catch (error) {
            if (error instanceof Error && error.message.includes('cancelled')) {
                return; // User cancelled, don't show error
            }
            console.error('Error exporting to file:', error);
            showStatusMessage('Failed to export training data to file. Please try again.', 'error', 5000);
        }
    }, [actions, isFileAPISupported, showStatusMessage]);

    const handleImportFromFile = useCallback(async () => {
        if (!isFileAPISupported) {
            showStatusMessage('File System Access API not supported in this browser. Please use Chrome or Edge.', 'error', 5000);
            return;
        }

        try {
            await actions.importFromFile();
            showStatusMessage('Training data imported from file successfully!');
            setSelectedPlanName(null); // Reset selected plan
            forceRefresh();
        } catch (error) {
            if (error instanceof Error && error.message.includes('cancelled')) {
                return; // User cancelled, don't show error
            }
            console.error('Error importing from file:', error);
            showStatusMessage('Failed to import training data from file. Please try again.', 'error', 5000);
        }
    }, [actions, isFileAPISupported, showStatusMessage, forceRefresh]);

    // Get saved training data summaries for the load dialog
    const savedTrainingDataSummaries = useMemo(() => {
        if (!isClient) return []; // Don't access localStorage during SSR
        return actions.getViewModel().getSavedTrainingDataSummaries();
    }, [actions, refreshKey, showLoadDialog, isClient]);

    return (
        <div className="bg-white w-full min-h-screen">
            {/* Status Messages - Using reusable component */}
            <SuccessPopup message={statusMessage} type={statusType} />
            <div className="flex flex-col items-center w-full pt-16 pb-48">
                <div className="w-full max-w-7xl px-4">
                    <div className="space-y-8">
                        {/* Welcome Section */}
                        <div className="text-center space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-center space-x-2">
                                    <span className="text-2xl font-bold text-slate-800">Welcome</span>
                                    {traineeNameEditing ? (
                                        <input
                                            type="text"
                                            value={traineeNameValue}
                                            onChange={(e) => setTraineeNameValue(e.target.value)}
                                            onBlur={handleTraineeNameSubmit}
                                            onKeyDown={handleTraineeNameKeyPress}
                                            className="text-2xl font-bold text-blue-600 bg-transparent border-b-2 border-blue-300 focus:border-blue-500 focus:outline-none min-w-0"
                                            autoFocus
                                        />
                                    ) : (
                                        <button
                                            onClick={() => setTraineeNameEditing(true)}
                                            className="text-2xl font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                                        >
                                            {traineeName}
                                        </button>
                                    )}
                                    <span className="text-2xl font-bold text-slate-800">,</span>
                                </div>
                                <p className="text-lg text-slate-600">
                                    You have <span className="font-semibold text-blue-600">{trainingPlanCount}</span> available training plans.
                                </p>
                            </div>
                        </div>

                        {/* Training Plans Section */}
                        <div className="space-y-4 flex flex-col items-start mt-16 mb-18">
                            <div className="w-[90%] max-w-6xl mx-auto">
                                <Button 
                                    onClick={() => setShowAddPlanDialog(true)}
                                    className="bg-blue-600 hover:bg-blue-700 w-fit"
                                >
                                    Add Training Plan
                                </Button>
                            </div>
                            
                            {actions.getTrainingPlanTable(
                                selectedPlanName, 
                                handlePlanSelect, 
                                handlePlanDelete, 
                                handleDifficultyEdit,
                                () => setShowSaveDialog(true),
                                () => setShowLoadDialog(true),
                                () => setShowIndexedDBSaveDialog(true),
                                () => setShowIndexedDBLoadDialog(true),
                                handleExportToFile,
                                handleImportFromFile
                            )}
                        </div>

                        {/* Selected Plan Exercises Section */}
                        {selectedPlanName && (
                            <div className="space-y-4">
                                {/* Centered Exercises Header */}
                                <div className="text-center space-y-4">
                                    <h2 className="text-xl font-bold text-slate-800">
                                        Exercises in "{selectedPlanName}"
                                    </h2>
                                </div>
                                
                                {/* Left-aligned Add Exercise Button */}
                                <div className="w-[90%] max-w-6xl mx-auto">
                                    <Button 
                                        onClick={() => setShowAddExerciseDialog(true)}
                                        className="bg-green-600 hover:bg-green-700 w-fit"
                                    >
                                        Add Exercise
                                    </Button>
                                </div>
                                
                                {/* Exercise Table */}
                                {(() => {
                                    actions.getViewModel().setSelectedPlan(selectedPlanName);
                                    const exerciseData = actions.getViewModel().getSelectedPlanExerciseTableData();
                                    
                                    return exerciseData.length > 0 ? (
                                        actions.getExerciseTable(selectedPlanName, handleExerciseDelete, handleExerciseEdit, handleExerciseEdit)
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-slate-500">No exercises in this training plan yet.</p>
                                            <p className="text-slate-400 text-sm">Click "Add Exercise" to get started!</p>
                                        </div>
                                    );
                                })()}
                            </div>
                        )}

                        {/* Add Plan Dialog */}
                        {showAddPlanDialog && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
                                <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-96 pointer-events-auto">
                                    <h3 className="text-lg font-bold">Add New Training Plan</h3>
                                    <input
                                        type="text"
                                        placeholder="Enter plan name..."
                                        value={newPlanName}
                                        onChange={(e) => setNewPlanName(e.target.value)}
                                        className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        autoFocus
                                    />
                                    <div className="flex space-x-2">
                                        <div className="relative group">
                                            <Button 
                                                onClick={handleAddPlan} 
                                                disabled={!newPlanName.trim()}
                                            >
                                                Add Plan
                                            </Button>
                                            {!newPlanName.trim() && (
                                                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                                    Please enter a plan name to continue
                                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                                                </div>
                                            )}
                                        </div>
                                        <Button variant="outline" onClick={() => setShowAddPlanDialog(false)}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Add Exercise Dialog */}
                        {showAddExerciseDialog && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
                                <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6 w-[600px] max-h-[70vh] overflow-hidden flex flex-col border border-slate-200">
                                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                                        <h3 className="text-xl font-bold text-slate-800">Add Exercise to "{selectedPlanName}"</h3>
                                        <button
                                            onClick={() => {
                                                setShowAddExerciseDialog(false);
                                                setSelectedExercise(null);
                                            }}
                                            className="text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    <div className="overflow-y-auto flex-1 space-y-6 pr-2">
                                        {Object.entries(allExercises).map(([sport, exercises]) => (
                                            <div key={sport} className="space-y-3">
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                                                        {sport === 'SWIM' && (
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M2 17h20l-2-4H4l-2 4zM13.8 11.2c.8-.6 1.7-1 2.7-1.2.3-.1.6-.1.9-.1 1.1 0 2.2.4 3 1.1.4.3.7.7.9 1.1h1.4c-.4-1-1.1-1.8-2-2.4-1.2-.8-2.6-1.2-4.1-1.2-.4 0-.8 0-1.2.1-1.2.2-2.3.7-3.2 1.4-.9-.7-2-1.2-3.2-1.4-.4-.1-.8-.1-1.2-.1-1.5 0-2.9.4-4.1 1.2-.9.6-1.6 1.4-2 2.4h1.4c.2-.4.5-.8.9-1.1.8-.7 1.9-1.1 3-1.1.3 0 .6 0 .9.1 1 .2 1.9.6 2.7 1.2z"/>
                                                            </svg>
                                                        )}
                                                        {sport === 'BIKE' && (
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zM17.8 10H15l-3.5-5.5c-.3-.4-.8-.5-1.3-.5s-1 .2-1.3.5L7.8 6.5c-.2.2-.3.5-.3.8 0 .6.4 1 1 1h2.4l1.8 2.8c.2.2.4.4.7.4h3.1c.3 0 .6-.1.8-.4l2.4-3.6c.3-.4.2-1-.2-1.3-.4-.3-1-.2-1.3.2L17.8 10z"/>
                                                            </svg>
                                                        )}
                                                        {sport === 'RUN' && (
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.89 19.38l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <h4 className="text-lg font-bold text-slate-800 capitalize">{sport.toLowerCase()}</h4>
                                                    <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
                                                </div>
                                                <div className="grid grid-cols-1 gap-2 ml-10">
                                                    {exercises.map((exercise, index) => {
                                                        const isSelected = selectedExercise?.name === exercise.name;
                                                        return (
                                                            <button
                                                                key={index}
                                                                onClick={() => setSelectedExercise(exercise)}
                                                                className={`text-left p-3 rounded-lg text-sm transition-all duration-200 border group ${
                                                                    isSelected 
                                                                        ? 'bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-300 shadow-sm' 
                                                                        : 'border-transparent hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200 hover:shadow-sm'
                                                                }`}
                                                            >
                                                                <div className="flex items-center space-x-3">
                                                                    <div className={`w-2 h-2 rounded-full transition-colors ${
                                                                        isSelected 
                                                                            ? 'bg-blue-500' 
                                                                            : 'bg-slate-300 group-hover:bg-blue-500'
                                                                    }`}></div>
                                                                    <span className={`font-medium transition-colors ${
                                                                        isSelected 
                                                                            ? 'text-blue-700' 
                                                                            : 'text-slate-700 group-hover:text-blue-700'
                                                                    }`}>
                                                                        {exercise.name}
                                                                    </span>
                                                                    {isSelected && (
                                                                        <div className="ml-auto">
                                                                            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                            </svg>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                                        <div className="text-sm text-slate-500">
                                            {selectedExercise ? `Selected: ${selectedExercise.name}` : 'Select an exercise to add'}
                                        </div>
                                        <div className="flex space-x-3">
                                            <Button 
                                                variant="outline" 
                                                onClick={() => {
                                                    setShowAddExerciseDialog(false);
                                                    setSelectedExercise(null);
                                                }}
                                                className="px-6"
                                            >
                                                Cancel
                                            </Button>
                                            <Button 
                                                onClick={() => {
                                                    if (selectedExercise) {
                                                        handleAddExercise(selectedExercise);
                                                        setShowAddExerciseDialog(false);
                                                        setSelectedExercise(null);
                                                    }
                                                }}
                                                disabled={!selectedExercise}
                                                className="px-6 bg-green-600 hover:bg-green-700"
                                            >
                                                Add Exercise
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Edit Difficulty Dialog */}
                        {showEditDifficultyDialog && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
                                <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6 w-[500px] border border-slate-200">
                                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                                        <h3 className="text-xl font-bold text-slate-800">Edit Difficulty for "{editingPlanName}"</h3>
                                        <button
                                            onClick={() => {
                                                setShowEditDifficultyDialog(false);
                                                setEditingPlanName(null);
                                                setSelectedDifficulty(null);
                                            }}
                                            className="text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <p className="text-slate-600">Select a new difficulty level for this training plan:</p>
                                        <div className="grid grid-cols-1 gap-3">
                                            {Object.values(Difficulty).map((difficulty) => {
                                                const isSelected = selectedDifficulty === difficulty;
                                                
                                                return (
                                                    <button
                                                        key={difficulty}
                                                        onClick={() => setSelectedDifficulty(difficulty)}
                                                        className={`text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                                                            isSelected 
                                                                ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-md' 
                                                                : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                                                        }`}
                                                    >
                                                        <div className="flex items-center space-x-3">
                                                            <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                                                                isSelected 
                                                                    ? 'bg-blue-500 border-blue-500' 
                                                                    : 'bg-transparent border-slate-300'
                                                            }`}>
                                                                {isSelected && (
                                                                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                                                                )}
                                                            </div>
                                                            <span className="font-semibold text-lg capitalize">
                                                                {difficulty.toLowerCase()}
                                                            </span>
                                                            {isSelected && (
                                                                <div className="ml-auto">
                                                                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    
                                    <div className="border-t border-slate-200 pt-4 flex justify-end">
                                        <div className="flex space-x-3">
                                            <Button 
                                                variant="outline" 
                                                onClick={() => {
                                                    setShowEditDifficultyDialog(false);
                                                    setEditingPlanName(null);
                                                    setSelectedDifficulty(null);
                                                }}
                                                className="px-6"
                                            >
                                                Cancel
                                            </Button>
                                            <Button 
                                                onClick={handleDifficultyUpdate}
                                                disabled={!selectedDifficulty}
                                                className="px-6 bg-blue-600 hover:bg-blue-700"
                                            >
                                                Update Difficulty
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Save to Local Storage Dialog */}
                        {showSaveDialog && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
                                <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6 w-[500px] border border-slate-200">
                                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                                        <h3 className="text-xl font-bold text-slate-800">Save Training Data</h3>
                                        <button
                                            onClick={() => {
                                                setShowSaveDialog(false);
                                                setSaveDescription("");
                                            }}
                                            className="text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <p className="text-slate-600">
                                            Save your current training plans and exercises to local storage for future use.
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            <span className="font-medium">Trainee:</span> {actions.getViewModel().getTraineeName()}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            <span className="font-medium">Plans:</span> {actions.getViewModel().getTrainingPlanCount()} training plan(s)
                                        </p>
                                        
                                        <div className="space-y-2">
                                            <label htmlFor="save-description" className="text-sm font-medium text-slate-700">
                                                Description (optional)
                                            </label>
                                            <textarea
                                                id="save-description"
                                                value={saveDescription}
                                                onChange={(e) => setSaveDescription(e.target.value)}
                                                placeholder="Add a description to help you identify this save later..."
                                                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="border-t border-slate-200 pt-4 flex justify-end">
                                        <div className="flex space-x-3">
                                            <Button 
                                                variant="outline" 
                                                onClick={() => {
                                                    setShowSaveDialog(false);
                                                    setSaveDescription("");
                                                }}
                                                className="px-6"
                                            >
                                                Cancel
                                            </Button>
                                            <Button 
                                                onClick={handleSaveToLocalStorage}
                                                className="px-6 bg-green-600 hover:bg-green-700"
                                            >
                                                Save to Local Storage
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Load from Local Storage Dialog */}
                        {showLoadDialog && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
                                <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6 w-[700px] max-h-[80vh] overflow-hidden flex flex-col border border-slate-200">
                                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                                        <h3 className="text-xl font-bold text-slate-800">Load Training Data</h3>
                                        <button
                                            onClick={() => {
                                                setShowLoadDialog(false);
                                                setSelectedLoadId(null);
                                            }}
                                            className="text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    <div className="overflow-y-auto flex-1 space-y-4 pr-2">
                                        {savedTrainingDataSummaries.length === 0 ? (
                                            <div className="text-center py-8">
                                                <p className="text-slate-500 text-lg">No saved training data found</p>
                                                <p className="text-slate-400 text-sm mt-2">Save your current training data first to load it later.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                <p className="text-slate-600 text-sm">
                                                    Select a saved training plan to load:
                                                </p>
                                                {savedTrainingDataSummaries.map((summary) => {
                                                    const isSelected = selectedLoadId === summary.id;
                                                    return (
                                                        <div
                                                            key={summary.id}
                                                            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                                                isSelected 
                                                                    ? 'bg-orange-50 border-orange-300 shadow-md' 
                                                                    : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                                            }`}
                                                            onClick={() => setSelectedLoadId(summary.id)}
                                                        >
                                                            <div className="flex items-start space-x-3">
                                                                <div className={`w-4 h-4 rounded-full border-2 mt-1 transition-colors ${
                                                                    isSelected 
                                                                        ? 'bg-orange-500 border-orange-500' 
                                                                        : 'bg-transparent border-slate-300'
                                                                }`}>
                                                                    {isSelected && (
                                                                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                                                                    )}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center justify-between">
                                                                        <h4 className="font-semibold text-slate-800">
                                                                            {summary.traineeName}
                                                                        </h4>
                                                                        <div className="flex items-center space-x-2">
                                                                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                                                                {summary.planCount} plan{summary.planCount !== 1 ? 's' : ''}
                                                                            </span>
                                                                            <button
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    handleDeleteSavedData(summary.id);
                                                                                }}
                                                                                className="text-red-400 hover:text-red-600 transition-colors p-1"
                                                                                title="Delete saved data"
                                                                            >
                                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-sm text-slate-600 mt-1">
                                                                        {summary.dateFormatted}
                                                                    </p>
                                                                    {summary.description && (
                                                                        <p className="text-sm text-slate-500 mt-2 italic">
                                                                            "{summary.description}"
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                                        <div className="text-sm text-slate-500">
                                            {selectedLoadId ? 'Ready to load selected training data' : 'Select a training plan to load'}
                                        </div>
                                        <div className="flex space-x-3">
                                            <Button 
                                                variant="outline" 
                                                onClick={() => {
                                                    setShowLoadDialog(false);
                                                    setSelectedLoadId(null);
                                                }}
                                                className="px-6"
                                            >
                                                Cancel
                                            </Button>
                                            <Button 
                                                onClick={handleLoadFromLocalStorage}
                                                disabled={!selectedLoadId}
                                                className="px-6 bg-orange-600 hover:bg-orange-700"
                                            >
                                                Load Training Data
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* IndexedDB Save Dialog */}
                        {showIndexedDBSaveDialog && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
                                <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6 w-[500px] border border-slate-200">
                                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                                        <h3 className="text-xl font-bold text-slate-800">Save to IndexedDB</h3>
                                        <button
                                            onClick={() => {
                                                setShowIndexedDBSaveDialog(false);
                                                setIndexedDBSaveDescription("");
                                                setIndexedDBSaveName("");
                                                setEnableOverwrite(false);
                                            }}
                                            className="text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <p className="text-slate-600">
                                            Save your current training plans and exercises to IndexedDB for persistent local storage.
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            <span className="font-medium">Trainee:</span> {actions.getViewModel().getTraineeName()}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            <span className="font-medium">Plans:</span> {actions.getViewModel().getTrainingPlanCount()} training plan(s)
                                        </p>
                                        
                                        <div className="space-y-2">
                                            <label htmlFor="indexeddb-save-description" className="text-sm font-medium text-slate-700">
                                                Description (optional)
                                            </label>
                                            <textarea
                                                id="indexeddb-save-description"
                                                value={indexedDBSaveDescription}
                                                onChange={(e) => setIndexedDBSaveDescription(e.target.value)}
                                                placeholder="Add a description to help you identify this save later..."
                                                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                                rows={3}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id="enable-overwrite"
                                                    checked={enableOverwrite}
                                                    onChange={(e) => setEnableOverwrite(e.target.checked)}
                                                    disabled={availableSaves.length === 0}
                                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                />
                                                <label htmlFor="enable-overwrite" className={`text-sm font-medium ${availableSaves.length === 0 ? 'text-slate-400' : 'text-slate-700'}`}>
                                                    Enable overwrite mode
                                                </label>
                                                {availableSaves.length === 0 && (
                                                    <span className="text-xs text-slate-400">(No existing saves)</span>
                                                )}
                                            </div>
                                            {enableOverwrite && availableSaves.length > 0 && (
                                                <div className="space-y-2">
                                                    <label htmlFor="save-name-dropdown" className="text-sm font-medium text-slate-700">
                                                        Select Save to Overwrite
                                                    </label>
                                                    <select
                                                        id="save-name-dropdown"
                                                        value={indexedDBSaveName}
                                                        onChange={(e) => setIndexedDBSaveName(e.target.value)}
                                                        className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                                    >
                                                        <option value="">Select a save to overwrite...</option>
                                                        {availableSaves.map((save) => (
                                                            <option key={save.id} value={save.displayName}>
                                                                {save.displayName}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="border-t border-slate-200 pt-4 flex justify-end">
                                        <div className="flex space-x-3">
                                            <Button 
                                                variant="outline" 
                                                onClick={() => {
                                                    setShowIndexedDBSaveDialog(false);
                                                    setIndexedDBSaveDescription("");
                                                    setIndexedDBSaveName("");
                                                    setEnableOverwrite(false);
                                                }}
                                                className="px-6"
                                            >
                                                Cancel
                                            </Button>
                                            <Button 
                                                onClick={handleSaveToIndexedDB}
                                                className="px-6 bg-blue-600 hover:bg-blue-700"
                                            >
                                                Save to IndexedDB
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* IndexedDB Load Dialog */}
                        {showIndexedDBLoadDialog && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
                                <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6 w-[700px] max-h-[80vh] overflow-hidden flex flex-col border border-slate-200">
                                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                                        <h3 className="text-xl font-bold text-slate-800">Load from IndexedDB</h3>
                                        <button
                                            onClick={() => {
                                                setShowIndexedDBLoadDialog(false);
                                                setSelectedIndexedDBLoadId(null);
                                            }}
                                            className="text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    <div className="overflow-y-auto flex-1 space-y-4 pr-2">
                                        {indexedDBDataSummaries.length === 0 ? (
                                            <div className="text-center py-8">
                                                <p className="text-slate-500 text-lg">No saved training data found in IndexedDB</p>
                                                <p className="text-slate-400 text-sm mt-2">Save your current training data first to load it later.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                <p className="text-slate-600 text-sm">
                                                    Select a saved training plan to load:
                                                </p>
                                                {indexedDBDataSummaries.map((summary) => {
                                                    const isSelected = selectedIndexedDBLoadId === summary.id;
                                                    return (
                                                        <div
                                                            key={summary.id}
                                                            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                                                isSelected 
                                                                    ? 'bg-purple-50 border-purple-300 shadow-md' 
                                                                    : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                                            }`}
                                                            onClick={() => setSelectedIndexedDBLoadId(summary.id)}
                                                        >
                                                            <div className="flex items-start space-x-3">
                                                                <div className={`w-4 h-4 rounded-full border-2 mt-1 transition-colors ${
                                                                    isSelected 
                                                                        ? 'bg-purple-500 border-purple-500' 
                                                                        : 'bg-transparent border-slate-300'
                                                                }`}>
                                                                    {isSelected && (
                                                                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                                                                    )}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center justify-between">
                                                                        <h4 className="font-semibold text-slate-800">
                                                                            {summary.customName ? `${summary.customName} (${summary.traineeName})` : summary.traineeName}
                                                                        </h4>
                                                                        <div className="flex items-center space-x-2">
                                                                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                                                                {summary.planCount} plan{summary.planCount !== 1 ? 's' : ''}
                                                                            </span>
                                                                            <button
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    handleDeleteIndexedDBData(summary.id);
                                                                                }}
                                                                                className="text-red-400 hover:text-red-600 transition-colors p-1"
                                                                                title="Delete saved data"
                                                                            >
                                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-sm text-slate-600 mt-1">
                                                                        {summary.dateFormatted}
                                                                    </p>
                                                                    {summary.description && (
                                                                        <p className="text-sm text-slate-500 mt-2 italic">
                                                                            "{summary.description}"
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                                        <div className="text-sm text-slate-500">
                                            {selectedIndexedDBLoadId ? 'Ready to load selected training data' : 'Select a training plan to load'}
                                        </div>
                                        <div className="flex space-x-3">
                                            <Button 
                                                variant="outline" 
                                                onClick={() => {
                                                    setShowIndexedDBLoadDialog(false);
                                                    setSelectedIndexedDBLoadId(null);
                                                }}
                                                className="px-6"
                                            >
                                                Cancel
                                            </Button>
                                            <Button 
                                                onClick={handleLoadFromIndexedDB}
                                                disabled={!selectedIndexedDBLoadId}
                                                className="px-6 bg-purple-600 hover:bg-purple-700"
                                            >
                                                Load Training Data
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Edit History Popup */}
                        {editingExercise && (
                            <EditHistoryPopup
                                isOpen={showEditHistoryPopup}
                                onClose={handleEditHistoryClose}
                                exerciseName={editingExercise.name}
                                setsData={editingExercise.setsData}
                                repsData={editingExercise.repsData}
                                onSelectValues={handleEditHistoryConfirm}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
