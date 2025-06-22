import React from "react";
import { Button } from "@/app/_components/ui/button";

interface TrainingPlanSearchProps {
  table: any;
  onSave?: () => void;
  onLoad?: () => void;
  onIndexedDBSave?: () => void;
  onIndexedDBLoad?: () => void;
  onExportToFile?: () => void;
  onImportFromFile?: () => void;
  showFileSystemButtons?: boolean;
}

/**
 * Search filter component for the training plan table.
 * Allows users to filter training plans by name and includes storage buttons.
 */
export default function TrainingPlanSearch({ 
  table, 
  onSave, 
  onLoad, 
  onIndexedDBSave, 
  onIndexedDBLoad,
  onExportToFile,
  onImportFromFile,
  showFileSystemButtons = false
}: TrainingPlanSearchProps) {
  const nameFilter = (table.getColumn("name")?.getFilterValue() as string) ?? "";

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-2">
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search training plans..."
            value={nameFilter}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="pl-10 w-full h-10 bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        {nameFilter && (
          <button
            onClick={() => table.getColumn("name")?.setFilterValue("")}
            className="px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
      
      {/* Storage buttons */}
      <div className="flex items-center space-x-2">
        {onSave && (
          <Button 
            onClick={onSave}
            className="bg-green-600 hover:bg-green-700 h-10"
            size="sm"
          >
            Save to Local Storage
          </Button>
        )}
        {onLoad && (
          <Button 
            onClick={onLoad}
            className="bg-orange-600 hover:bg-orange-700 h-10"
            size="sm"
          >
            Load from Local Storage
          </Button>
        )}
        {onIndexedDBSave && (
          <Button 
            onClick={onIndexedDBSave}
            className="bg-blue-600 hover:bg-blue-700 h-10"
            size="sm"
          >
            Save to IndexedDB
          </Button>
        )}
        {onIndexedDBLoad && (
          <Button 
            onClick={onIndexedDBLoad}
            className="bg-purple-600 hover:bg-purple-700 h-10"
            size="sm"
          >
            Load from IndexedDB
          </Button>
        )}
        
        {/* File System Access API buttons */}
        {showFileSystemButtons && (
          <>
            <div className="w-px h-6 bg-slate-300"></div>
            {onExportToFile && (
              <Button 
                onClick={onExportToFile}
                className="bg-emerald-600 hover:bg-emerald-700 h-10"
                size="sm"
                title="Export to file on your computer"
              >
                📁 Export to File
              </Button>
            )}
            {onImportFromFile && (
              <Button 
                onClick={onImportFromFile}
                className="bg-teal-600 hover:bg-teal-700 h-10"
                size="sm"
                title="Import from file on your computer"
              >
                📂 Import from File
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
} 