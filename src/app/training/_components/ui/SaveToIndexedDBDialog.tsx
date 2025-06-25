import { Button } from "@/app/_components/ui/button";

interface AvailableSave {
  id: string;
  displayName: string;
}

interface SaveToIndexedDBDialogProps {
  isOpen: boolean;
  onClose: () => void;
  traineeName: string;
  planCount: number;
  description: string;
  setDescription: (description: string) => void;
  enableOverwrite: boolean;
  setEnableOverwrite: (enable: boolean) => void;
  availableSaves: AvailableSave[];
  saveName: string;
  setSaveName: (name: string) => void;
  onSave: () => void;
}

export default function SaveToIndexedDBDialog({
  isOpen,
  onClose,
  traineeName,
  planCount,
  description,
  setDescription,
  enableOverwrite,
  setEnableOverwrite,
  availableSaves,
  saveName,
  setSaveName,
  onSave
}: SaveToIndexedDBDialogProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setDescription("");
    setSaveName("");
    setEnableOverwrite(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
      <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6 w-[500px] border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h3 className="text-xl font-bold text-slate-800">Save to IndexedDB</h3>
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
            Save your current training plans and exercises to IndexedDB for persistent local storage.
          </p>
          <p className="text-sm text-slate-500">
            <span className="font-medium">Trainee:</span> {traineeName}
          </p>
          <p className="text-sm text-slate-500">
            <span className="font-medium">Plans:</span> {planCount} training plan(s)
          </p>
          
          <div className="space-y-2">
            <label htmlFor="indexeddb-save-description" className="text-sm font-medium text-slate-700">
              Description (optional)
            </label>
            <textarea
              id="indexeddb-save-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
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
              onClick={handleClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button 
              onClick={onSave}
              className="px-6 bg-blue-600 hover:bg-blue-700"
            >
              Save to IndexedDB
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 