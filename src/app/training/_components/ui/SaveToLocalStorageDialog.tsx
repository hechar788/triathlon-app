import { Button } from "@/app/_components/ui/button";

interface SaveToLocalStorageDialogProps {
    isOpen: boolean;
    onClose: () => void;
    traineeName: string;
    planCount: number;
    saveDescription: string;
    setSaveDescription: (description: string) => void;
    onSave: () => void;
}

export default function SaveToLocalStorageDialog({
    isOpen,
    onClose,
    traineeName,
    planCount,
    saveDescription,
    setSaveDescription,
    onSave
}: SaveToLocalStorageDialogProps) {
    if (!isOpen) return null;

    const handleClose = () => {
        onClose();
        setSaveDescription("");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
            <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6 w-[500px] border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <h3 className="text-xl font-bold text-slate-800">Save Training Data</h3>
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
                    <p className="text-slate-600">
                        Save your current training plans and exercises to local storage for future use.
                    </p>
                    <p className="text-sm text-slate-500">
                        <span className="font-medium">Trainee:</span> {traineeName}
                    </p>
                    <p className="text-sm text-slate-500">
                        <span className="font-medium">Plans:</span> {planCount} training plan(s)
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
                            onClick={handleClose}
                            className="px-6"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={onSave}
                            className="px-6 bg-green-600 hover:bg-green-700"
                        >
                            Save to Local Storage
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} 