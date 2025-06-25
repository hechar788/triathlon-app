import { Button } from "@/app/_components/ui/button";

// UI-only types - no model dependencies
interface DifficultyOption {
    value: string;
    label: string;
}

interface EditDifficultyDialogProps {
    isOpen: boolean;
    onClose: () => void;
    editingPlanName: string | null;
    difficultyOptions: DifficultyOption[];
    selectedDifficulty: string | null;
    setSelectedDifficulty: (difficulty: string | null) => void;
    onUpdateDifficulty: () => void;
}

export default function EditDifficultyDialog({
    isOpen,
    onClose,
    editingPlanName,
    difficultyOptions,
    selectedDifficulty,
    setSelectedDifficulty,
    onUpdateDifficulty
}: EditDifficultyDialogProps) {
    if (!isOpen) return null;

    const handleClose = () => {
        onClose();
        setSelectedDifficulty(null);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
            <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6 w-[500px] border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <h3 className="text-xl font-bold text-slate-800">Edit Difficulty for "{editingPlanName}"</h3>
                    <button
                        onClick={handleClose}
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
                        {difficultyOptions.map((difficulty) => {
                            const isSelected = selectedDifficulty === difficulty.value;
                            
                            return (
                                <button
                                    key={difficulty.value}
                                    onClick={() => setSelectedDifficulty(difficulty.value)}
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
                                        <span className="font-semibold text-lg">
                                            {difficulty.label}
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
                            onClick={handleClose}
                            className="px-6"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={onUpdateDifficulty}
                            disabled={!selectedDifficulty}
                            className="px-6 bg-blue-600 hover:bg-blue-700"
                        >
                            Update Difficulty
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} 