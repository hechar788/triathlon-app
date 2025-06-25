import { Button } from "@/app/_components/ui/button";

interface AddPlanDialogProps {
    isOpen: boolean;
    onClose: () => void;
    newPlanName: string;
    setNewPlanName: (name: string) => void;
    onAddPlan: () => void;
}

export default function AddPlanDialog({
    isOpen,
    onClose,
    newPlanName,
    setNewPlanName,
    onAddPlan
}: AddPlanDialogProps) {
    if (!isOpen) return null;

    return (
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
                            onClick={onAddPlan} 
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
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
} 