import { Button } from "@/app/_components/ui/button";

// UI-only types - no model dependencies
interface ExerciseItem {
    name: string;
}

interface AddExerciseDialogProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPlanName: string;
    allExercises: Record<string, ExerciseItem[]>;
    selectedExercise: ExerciseItem | null;
    setSelectedExercise: (exercise: ExerciseItem | null) => void;
    onAddExercise: (exercise: ExerciseItem) => void;
}

export default function AddExerciseDialog({
    isOpen,
    onClose,
    selectedPlanName,
    allExercises,
    selectedExercise,
    setSelectedExercise,
    onAddExercise
}: AddExerciseDialogProps) {
    if (!isOpen) return null;

    const handleClose = () => {
        onClose();
        setSelectedExercise(null);
    };

    const handleAddExercise = () => {
        if (selectedExercise) {
            onAddExercise(selectedExercise);
            handleClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
            <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6 w-[600px] max-h-[70vh] overflow-hidden flex flex-col border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <h3 className="text-xl font-bold text-slate-800">Add Exercise to "{selectedPlanName}"</h3>
                    <button
                        onClick={handleClose}
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
                            onClick={handleClose}
                            className="px-6"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleAddExercise}
                            disabled={!selectedExercise}
                            className="px-6 bg-green-600 hover:bg-green-700"
                        >
                            Add Exercise
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} 