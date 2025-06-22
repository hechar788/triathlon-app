"use client"
import { useState } from "react";
import { Button } from "@/app/_components/ui/button";

export interface EditHistoryEntry {
    id: string;
    value: number;
    timestamp: number;
    dateFormatted: string;
}

interface ExerciseEditData {
    currentValue: number;
    defaultValue: number;
    history: EditHistoryEntry[];
}

interface EditHistoryPopupProps {
    isOpen: boolean;
    onClose: () => void;
    exerciseName: string;
    setsData: ExerciseEditData;
    repsData: ExerciseEditData;
    onSelectValues: (sets: number, reps: number) => void;
}

export default function EditHistoryPopup({
    isOpen,
    onClose,
    exerciseName,
    setsData,
    repsData,
    onSelectValues
}: EditHistoryPopupProps) {
    const [selectedSets, setSelectedSets] = useState<number>(setsData.currentValue);
    const [selectedReps, setSelectedReps] = useState<number>(repsData.currentValue);
    const [customSets, setCustomSets] = useState<string>(setsData.currentValue.toString());
    const [customReps, setCustomReps] = useState<string>(repsData.currentValue.toString());
    const [showCustomSetsInput, setShowCustomSetsInput] = useState(false);
    const [showCustomRepsInput, setShowCustomRepsInput] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = () => {
        const setsToUse = showCustomSetsInput ? parseInt(customSets) : selectedSets;
        const repsToUse = showCustomRepsInput ? parseInt(customReps) : selectedReps;
        
        if (!isNaN(setsToUse) && setsToUse > 0 && !isNaN(repsToUse) && repsToUse > 0) {
            onSelectValues(setsToUse, repsToUse);
            onClose();
        }
    };

    const handleCancel = () => {
        setSelectedSets(setsData.currentValue);
        setSelectedReps(repsData.currentValue);
        setCustomSets(setsData.currentValue.toString());
        setCustomReps(repsData.currentValue.toString());
        setShowCustomSetsInput(false);
        setShowCustomRepsInput(false);
        onClose();
    };

    const handleSetsValueSelect = (value: number) => {
        setSelectedSets(value);
        setShowCustomSetsInput(false);
        setCustomSets(value.toString());
    };

    const handleRepsValueSelect = (value: number) => {
        setSelectedReps(value);
        setShowCustomRepsInput(false);
        setCustomReps(value.toString());
    };

    const handleCustomSetsInputToggle = () => {
        setShowCustomSetsInput(!showCustomSetsInput);
        if (!showCustomSetsInput) {
            setCustomSets(setsData.currentValue.toString());
        }
    };

    const handleCustomRepsInputToggle = () => {
        setShowCustomRepsInput(!showCustomRepsInput);
        if (!showCustomRepsInput) {
            setCustomReps(repsData.currentValue.toString());
        }
    };

    // Sort history by timestamp (most recent first)
    const sortedSetsHistory = [...setsData.history].sort((a, b) => b.timestamp - a.timestamp);
    const sortedRepsHistory = [...repsData.history].sort((a, b) => b.timestamp - a.timestamp);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
            <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6 w-[800px] max-h-[85vh] flex flex-col border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <h3 className="text-xl font-bold text-slate-800">
                        Edit Exercise - {exerciseName}
                    </h3>
                    <button
                        onClick={handleCancel}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="overflow-y-auto flex-1 pr-2">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Sets Column */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">Sets</h4>
                            
                            {/* Current Sets */}
                            <div className="space-y-2">
                                <span className="text-sm font-medium text-slate-600">Current Value</span>
                                <button
                                    onClick={() => handleSetsValueSelect(setsData.currentValue)}
                                    className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                                        selectedSets === setsData.currentValue && !showCustomSetsInput
                                            ? 'bg-slate-100 border-slate-400 shadow-sm' 
                                            : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">{setsData.currentValue}</span>
                                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Current</span>
                                    </div>
                                </button>
                            </div>

                            {/* Default Sets */}
                            <div className="space-y-2">
                                <span className="text-sm font-medium text-slate-600">Default Value</span>
                                <button
                                    onClick={() => handleSetsValueSelect(setsData.defaultValue)}
                                    className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                                        selectedSets === setsData.defaultValue && !showCustomSetsInput
                                            ? 'bg-slate-100 border-slate-400 shadow-sm' 
                                            : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">{setsData.defaultValue}</span>
                                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Default</span>
                                    </div>
                                </button>
                            </div>

                            {/* Custom Sets Input */}
                            <div className="space-y-2">
                                <span className="text-sm font-medium text-slate-600">Custom Value</span>
                                <div className={`p-3 rounded-lg border transition-all duration-200 ${
                                    showCustomSetsInput
                                        ? 'bg-slate-100 border-slate-400 shadow-sm' 
                                        : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                }`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={handleCustomSetsInputToggle}
                                                className="w-4 h-4 rounded border border-slate-300 hover:border-slate-500 transition-colors flex items-center justify-center"
                                            >
                                                {showCustomSetsInput && (
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>
                                            {showCustomSetsInput ? (
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={customSets}
                                                    onChange={(e) => setCustomSets(e.target.value)}
                                                    className="w-20 px-2 py-1 text-center border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500 font-semibold"
                                                    autoFocus
                                                />
                                            ) : (
                                                <span className="text-slate-500">Enter custom value</span>
                                            )}
                                        </div>
                                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Custom</span>
                                    </div>
                                </div>
                            </div>

                            {/* Sets History */}
                            {sortedSetsHistory.length > 0 && (
                                <div className="space-y-2">
                                    <span className="text-sm font-medium text-slate-600">Previous Values</span>
                                    <div className="space-y-1 max-h-32 overflow-y-auto">
                                        {sortedSetsHistory.map((entry) => (
                                            <button
                                                key={entry.id}
                                                onClick={() => handleSetsValueSelect(entry.value)}
                                                className={`w-full text-left p-2 rounded border transition-all duration-200 ${
                                                    selectedSets === entry.value && !showCustomSetsInput
                                                        ? 'bg-slate-100 border-slate-400 shadow-sm' 
                                                        : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium">{entry.value}</span>
                                                    <span className="text-xs text-slate-500">{entry.dateFormatted}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Reps Column */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">Reps</h4>
                            
                            {/* Current Reps */}
                            <div className="space-y-2">
                                <span className="text-sm font-medium text-slate-600">Current Value</span>
                                <button
                                    onClick={() => handleRepsValueSelect(repsData.currentValue)}
                                    className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                                        selectedReps === repsData.currentValue && !showCustomRepsInput
                                            ? 'bg-slate-100 border-slate-400 shadow-sm' 
                                            : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">{repsData.currentValue}</span>
                                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Current</span>
                                    </div>
                                </button>
                            </div>

                            {/* Default Reps */}
                            <div className="space-y-2">
                                <span className="text-sm font-medium text-slate-600">Default Value</span>
                                <button
                                    onClick={() => handleRepsValueSelect(repsData.defaultValue)}
                                    className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                                        selectedReps === repsData.defaultValue && !showCustomRepsInput
                                            ? 'bg-slate-100 border-slate-400 shadow-sm' 
                                            : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">{repsData.defaultValue}</span>
                                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Default</span>
                                    </div>
                                </button>
                            </div>

                            {/* Custom Reps Input */}
                            <div className="space-y-2">
                                <span className="text-sm font-medium text-slate-600">Custom Value</span>
                                <div className={`p-3 rounded-lg border transition-all duration-200 ${
                                    showCustomRepsInput
                                        ? 'bg-slate-100 border-slate-400 shadow-sm' 
                                        : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                }`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={handleCustomRepsInputToggle}
                                                className="w-4 h-4 rounded border border-slate-300 hover:border-slate-500 transition-colors flex items-center justify-center"
                                            >
                                                {showCustomRepsInput && (
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>
                                            {showCustomRepsInput ? (
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={customReps}
                                                    onChange={(e) => setCustomReps(e.target.value)}
                                                    className="w-20 px-2 py-1 text-center border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500 font-semibold"
                                                />
                                            ) : (
                                                <span className="text-slate-500">Enter custom value</span>
                                            )}
                                        </div>
                                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Custom</span>
                                    </div>
                                </div>
                            </div>

                            {/* Reps History */}
                            {sortedRepsHistory.length > 0 && (
                                <div className="space-y-2">
                                    <span className="text-sm font-medium text-slate-600">Previous Values</span>
                                    <div className="space-y-1 max-h-32 overflow-y-auto">
                                        {sortedRepsHistory.map((entry) => (
                                            <button
                                                key={entry.id}
                                                onClick={() => handleRepsValueSelect(entry.value)}
                                                className={`w-full text-left p-2 rounded border transition-all duration-200 ${
                                                    selectedReps === entry.value && !showCustomRepsInput
                                                        ? 'bg-slate-100 border-slate-400 shadow-sm' 
                                                        : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium">{entry.value}</span>
                                                    <span className="text-xs text-slate-500">{entry.dateFormatted}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {(sortedSetsHistory.length === 0 && sortedRepsHistory.length === 0) && (
                        <div className="text-center py-6 mt-6 border-t border-slate-200">
                            <p className="text-slate-500">No previous edits found</p>
                            <p className="text-slate-400 text-sm">This will be your first edit for this exercise.</p>
                        </div>
                    )}
                </div>

                <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                    <div className="text-sm text-slate-500">
                        {`Will set to: ${showCustomSetsInput ? customSets || 'invalid' : selectedSets} sets, ${showCustomRepsInput ? customReps || 'invalid' : selectedReps} reps`}
                    </div>
                    <div className="flex space-x-3">
                        <Button 
                            variant="outline" 
                            onClick={handleCancel}
                            className="px-6"
                        >
                            Cancel
                        </Button>
                        <div className="relative group">
                            <Button 
                                onClick={handleConfirm}
                                disabled={
                                    (showCustomSetsInput && (customSets === '' || isNaN(parseInt(customSets)) || parseInt(customSets) <= 0)) ||
                                    (showCustomRepsInput && (customReps === '' || isNaN(parseInt(customReps)) || parseInt(customReps) <= 0))
                                }
                                className="px-6"
                            >
                                Confirm Changes
                            </Button>
                            {((showCustomSetsInput && (customSets === '' || isNaN(parseInt(customSets)) || parseInt(customSets) <= 0)) ||
                              (showCustomRepsInput && (customReps === '' || isNaN(parseInt(customReps)) || parseInt(customReps) <= 0))) && (
                                <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[60]" style={{whiteSpace: 'nowrap'}}>
                                    {showCustomSetsInput && (customSets === '' || isNaN(parseInt(customSets)) || parseInt(customSets) <= 0) && 
                                     showCustomRepsInput && (customReps === '' || isNaN(parseInt(customReps)) || parseInt(customReps) <= 0)
                                        ? 'Please enter valid numbers for both sets and reps'
                                        : showCustomSetsInput && (customSets === '' || isNaN(parseInt(customSets)) || parseInt(customSets) <= 0)
                                        ? 'Please enter a valid number for sets'
                                        : 'Please enter a valid number for reps'
                                    }
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 