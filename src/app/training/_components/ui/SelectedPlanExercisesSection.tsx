import { Button } from "@/app/_components/ui/button";

interface SelectedPlanExercisesSectionProps {
    selectedPlanName: string | null;
    onShowAddExerciseDialog: () => void;
    exerciseTable: React.ReactNode;
    exerciseData: any[];
}

export default function SelectedPlanExercisesSection({
    selectedPlanName,
    onShowAddExerciseDialog,
    exerciseTable,
    exerciseData
}: SelectedPlanExercisesSectionProps) {
    if (!selectedPlanName) return null;

    return (
        <div className="space-y-4 flex flex-col items-start mt-8">
            <div className="w-[90%] max-w-6xl mx-auto">
                <div className="border border-slate-200 rounded-lg bg-white shadow-sm">
                    <div className="p-6 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-slate-800">
                                Exercises for "{selectedPlanName}"
                            </h3>
                            <Button 
                                onClick={onShowAddExerciseDialog}
                                className="bg-green-600 hover:bg-green-700 w-fit"
                            >
                                Add Exercise
                            </Button>
                        </div>
                    </div>
                    <div className="p-6">
                        {exerciseData.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-slate-500 text-lg">No exercises added yet.</p>
                                <p className="text-slate-400 text-sm mt-1">Click "Add Exercise" to get started!</p>
                            </div>
                        ) : (
                            exerciseTable
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 