"use client"
import { useState, useCallback, useMemo, useEffect } from "react";
import TrainingController from './actions';
import { Difficulty } from "@/model/lib/enums/difficulty";
import { IExercise } from "@/model/lib/interfaces/iExercise";

import StatusPopup from './_components/ui/StatusPopup';
import EditHistoryPopup, { EditHistoryEntry } from './_components/ui/EditHistoryPopup';
import AddPlanDialog from './_components/ui/AddPlanDialog';
import AddExerciseDialog from './_components/ui/AddExerciseDialog';
import EditDifficultyDialog from './_components/ui/EditDifficultyDialog';
import WelcomeSection from './_components/ui/WelcomeSection';
import SelectedPlanExercisesSection from './_components/ui/SelectedPlanExercisesSection';
import SaveToLocalStorageDialog from './_components/ui/SaveToLocalStorageDialog';
import LoadFromLocalStorageDialog from './_components/ui/LoadFromLocalStorageDialog';
import SaveToIndexedDBDialog from './_components/ui/SaveToIndexedDBDialog';
import LoadFromIndexedDBDialog from './_components/ui/LoadFromIndexedDBDialog';
import TrainingPlansSection from './_components/ui/TrainingPlansSection';

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

    // Memoize data that depends on actions
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
    }, [showIndexedDBSaveDialog, showIndexedDBLoadDialog]);

    // Effect to restore localStorage data after component mounts - RUN ONLY ONCE
    useEffect(() => {
        setIsClient(true);
        
        // Try to restore data from localStorage
        const restored = actions.getViewModel().restoreFromLocalStorageIfAvailable();
        if (restored) {
            showStatusMessage("Previous training data restored from local storage", 'info');
            forceRefresh();
        }
    }, []); // ← Empty dependency array - run only once on mount

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
    }, [actions, refreshKey, isClient]);

    return (
        <div className="bg-white w-full min-h-screen">
            {/* Status Messages - Using reusable component */}
            <StatusPopup message={statusMessage} type={statusType} />
            <div className="flex flex-col items-center w-full pb-48">

                {/* Centered Main Header */}
                <div className="mb-4 text-center max-w-4xl pt-14 pb-4 px-4">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Training Management Center
                    </h1>
                </div>
                
                <div className="w-full max-w-7xl px-4">
                    <div className="space-y-8">
                        {/* Welcome Section */}
                        <WelcomeSection
                            traineeName={traineeName}
                            traineeNameEditing={traineeNameEditing}
                            traineeNameValue={traineeNameValue}
                            setTraineeNameValue={setTraineeNameValue}
                            setTraineeNameEditing={setTraineeNameEditing}
                            trainingPlanCount={trainingPlanCount}
                            onTraineeNameSubmit={handleTraineeNameSubmit}
                            onTraineeNameKeyPress={handleTraineeNameKeyPress}
                            onSave={() => setShowSaveDialog(true)}
                            onLoad={() => setShowLoadDialog(true)}
                            onIndexedDBSave={() => setShowIndexedDBSaveDialog(true)}
                            onIndexedDBLoad={() => setShowIndexedDBLoadDialog(true)}
                            onExportToFile={handleExportToFile}
                            onImportFromFile={handleImportFromFile}
                            showFileSystemButtons={isFileAPISupported}
                        />

                        {/* Training Plans Section */}
                        <TrainingPlansSection
                            onShowAddPlanDialog={() => setShowAddPlanDialog(true)}
                            trainingPlanTable={actions.getTrainingPlanTable(
                                selectedPlanName, 
                                handlePlanSelect, 
                                handlePlanDelete, 
                                handleDifficultyEdit
                            )}
                        />

                        {/* Selected Plan Exercises Section */}
                        <SelectedPlanExercisesSection
                            selectedPlanName={selectedPlanName}
                            onShowAddExerciseDialog={() => setShowAddExerciseDialog(true)}
                            exerciseTable={(() => {
                                if (selectedPlanName) {
                                    actions.getViewModel().setSelectedPlan(selectedPlanName);
                                    return actions.getExerciseTable(selectedPlanName, handleExerciseDelete, handleExerciseEdit, handleExerciseEdit);
                                }
                                return null;
                            })()}
                            exerciseData={(() => {
                                if (selectedPlanName) {
                                    actions.getViewModel().setSelectedPlan(selectedPlanName);
                                    return actions.getViewModel().getSelectedPlanExerciseTableData();
                                }
                                return [];
                            })()}
                        />

                        {/* Add Plan Dialog */}
                        <AddPlanDialog
                            isOpen={showAddPlanDialog}
                            onClose={() => setShowAddPlanDialog(false)}
                            newPlanName={newPlanName}
                            setNewPlanName={setNewPlanName}
                            onAddPlan={handleAddPlan}
                        />

                        {/* Add Exercise Dialog */}
                        <AddExerciseDialog
                            isOpen={showAddExerciseDialog}
                            onClose={() => setShowAddExerciseDialog(false)}
                            selectedPlanName={selectedPlanName || ''}
                            allExercises={Object.fromEntries(
                                Object.entries(allExercises).map(([sport, exercises]) => [
                                    sport,
                                    exercises.map(ex => ({ name: ex.name }))
                                ])
                            )}
                            selectedExercise={selectedExercise ? { name: selectedExercise.name } : null}
                            setSelectedExercise={(exerciseItem) => {
                                if (exerciseItem) {
                                    // Find the full exercise from allExercises
                                    for (const exercises of Object.values(allExercises)) {
                                        const fullExercise = exercises.find(ex => ex.name === exerciseItem.name);
                                        if (fullExercise) {
                                            setSelectedExercise(fullExercise);
                                            return;
                                        }
                                    }
                                } else {
                                    setSelectedExercise(null);
                                }
                            }}
                            onAddExercise={(exerciseItem) => {
                                // Find the full exercise from allExercises and call the original handler
                                for (const exercises of Object.values(allExercises)) {
                                    const fullExercise = exercises.find(ex => ex.name === exerciseItem.name);
                                    if (fullExercise) {
                                        handleAddExercise(fullExercise);
                                        return;
                                    }
                                }
                            }}
                        />

                        {/* Edit Difficulty Dialog */}
                        <EditDifficultyDialog
                            isOpen={showEditDifficultyDialog}
                            onClose={() => setShowEditDifficultyDialog(false)}
                            editingPlanName={editingPlanName}
                            difficultyOptions={Object.values(Difficulty).map(diff => ({
                                value: diff,
                                label: diff.toLowerCase().charAt(0).toUpperCase() + diff.toLowerCase().slice(1)
                            }))}
                            selectedDifficulty={selectedDifficulty?.toString() || null}
                            setSelectedDifficulty={(value: string | null) => setSelectedDifficulty(value as Difficulty)}
                            onUpdateDifficulty={handleDifficultyUpdate}
                        />

                        {/* Save to Local Storage Dialog */}
                        <SaveToLocalStorageDialog
                            isOpen={showSaveDialog}
                            onClose={() => setShowSaveDialog(false)}
                            traineeName={traineeName}
                            planCount={trainingPlanCount}
                            saveDescription={saveDescription}
                            setSaveDescription={setSaveDescription}
                            onSave={handleSaveToLocalStorage}
                        />

                        {/* Load from Local Storage Dialog */}
                        <LoadFromLocalStorageDialog
                            isOpen={showLoadDialog}
                            onClose={() => setShowLoadDialog(false)}
                            savedDataSummaries={savedTrainingDataSummaries}
                            selectedLoadId={selectedLoadId}
                            setSelectedLoadId={setSelectedLoadId}
                            onLoad={handleLoadFromLocalStorage}
                            onDeleteSavedData={handleDeleteSavedData}
                        />

                        {/* IndexedDB Save Dialog */}
                        <SaveToIndexedDBDialog
                            isOpen={showIndexedDBSaveDialog}
                            onClose={() => setShowIndexedDBSaveDialog(false)}
                            traineeName={actions.getViewModel().getTraineeName()}
                            planCount={actions.getViewModel().getTrainingPlanCount()}
                            description={indexedDBSaveDescription}
                            setDescription={setIndexedDBSaveDescription}
                            enableOverwrite={enableOverwrite}
                            setEnableOverwrite={setEnableOverwrite}
                            availableSaves={availableSaves}
                            saveName={indexedDBSaveName}
                            setSaveName={setIndexedDBSaveName}
                            onSave={handleSaveToIndexedDB}
                        />

                        {/* IndexedDB Load Dialog */}
                        <LoadFromIndexedDBDialog
                            isOpen={showIndexedDBLoadDialog}
                            onClose={() => setShowIndexedDBLoadDialog(false)}
                            dataSummaries={indexedDBDataSummaries}
                            selectedLoadId={selectedIndexedDBLoadId}
                            setSelectedLoadId={setSelectedIndexedDBLoadId}
                            onLoad={handleLoadFromIndexedDB}
                            onDeleteData={handleDeleteIndexedDBData}
                        />

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
