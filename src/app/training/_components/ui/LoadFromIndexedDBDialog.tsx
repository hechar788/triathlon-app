import { Button } from "@/app/_components/ui/button";

interface IndexedDBDataSummary {
  id: string;
  traineeName: string;
  customName?: string;
  planCount: number;
  dateFormatted: string;
  description?: string;
}

interface LoadFromIndexedDBDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dataSummaries: IndexedDBDataSummary[];
  selectedLoadId: string | null;
  setSelectedLoadId: (id: string | null) => void;
  onLoad: () => void;
  onDeleteData: (id: string) => void;
}

export default function LoadFromIndexedDBDialog({
  isOpen,
  onClose,
  dataSummaries,
  selectedLoadId,
  setSelectedLoadId,
  onLoad,
  onDeleteData
}: LoadFromIndexedDBDialogProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setSelectedLoadId(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
      <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6 w-[700px] max-h-[80vh] overflow-hidden flex flex-col border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h3 className="text-xl font-bold text-slate-800">Load from IndexedDB</h3>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-y-auto flex-1 space-y-4 pr-2">
          {dataSummaries.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500 text-lg">No saved training data found in IndexedDB</p>
              <p className="text-slate-400 text-sm mt-2">Save your current training data first to load it later.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-slate-600 text-sm">
                Select a saved training plan to load:
              </p>
              {dataSummaries.map((summary) => {
                const isSelected = selectedLoadId === summary.id;
                return (
                  <div
                    key={summary.id}
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'bg-purple-50 border-purple-300 shadow-md' 
                        : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                    onClick={() => setSelectedLoadId(summary.id)}
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
                                onDeleteData(summary.id);
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
              onClick={handleClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button 
              onClick={onLoad}
              disabled={!selectedLoadId}
              className="px-6 bg-purple-600 hover:bg-purple-700"
            >
              Load Training Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 