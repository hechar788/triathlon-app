import { Button } from "@/app/_components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/app/_components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface WelcomeSectionProps {
    traineeName: string;
    traineeNameEditing: boolean;
    traineeNameValue: string;
    setTraineeNameValue: (value: string) => void;
    setTraineeNameEditing: (editing: boolean) => void;
    trainingPlanCount: number;
    onTraineeNameSubmit: () => void;
    onTraineeNameKeyPress: (e: React.KeyboardEvent) => void;
    // Import/Export handlers
    onSave?: () => void;
    onLoad?: () => void;
    onIndexedDBSave?: () => void;
    onIndexedDBLoad?: () => void;
    onExportToFile?: () => void;
    onImportFromFile?: () => void;
    showFileSystemButtons?: boolean;
}

export default function WelcomeSection({
    traineeName,
    traineeNameEditing,
    traineeNameValue,
    setTraineeNameValue,
    setTraineeNameEditing,
    trainingPlanCount,
    onTraineeNameSubmit,
    onTraineeNameKeyPress,
    onSave,
    onLoad,
    onIndexedDBSave,
    onIndexedDBLoad,
    onExportToFile,
    onImportFromFile,
    showFileSystemButtons = false
}: WelcomeSectionProps) {
    return (
        <div className="w-[90%] max-w-6xl mx-auto pt-12 pb-8">
            <div className="border border-slate-200 rounded-lg bg-gradient-to-r from-slate-50 to-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-baseline space-x-1">
                            <h2 className="text-2xl font-bold text-slate-800">
                                {traineeNameEditing ? (
                                    <input
                                        type="text"
                                        value={traineeNameValue}
                                        onChange={(e) => setTraineeNameValue(e.target.value)}
                                        onBlur={onTraineeNameSubmit}
                                        onKeyDown={onTraineeNameKeyPress}
                                        className="text-2xl font-bold text-blue-600 bg-transparent border-b-2 border-blue-300 focus:border-blue-500 focus:outline-none min-w-0"
                                        autoFocus
                                    />
                                ) : (
                                    <button
                                        onClick={() => setTraineeNameEditing(true)}
                                        className="text-2xl font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                                    >
                                        {traineeName}
                                    </button>
                                )}
                            </h2>
                            <span className="text-2xl font-bold text-slate-800">,</span>
                        </div>
                        <p className="text-lg text-slate-600 mt-2">
                            You have <span className="font-semibold text-blue-600">{trainingPlanCount}</span> training plans available.
                        </p>
                    </div>
                    
                    {/* Import/Export Dropdown */}
                    <div className="flex items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button 
                                    className="bg-blue-600 hover:bg-blue-700 h-10"
                                    size="sm"
                                >
                                    Import/Export
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>Local Storage</DropdownMenuLabel>
                                {onSave && (
                                    <DropdownMenuItem onClick={onSave}>
                                        <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                                        Save to Local Storage
                                    </DropdownMenuItem>
                                )}
                                {onLoad && (
                                    <DropdownMenuItem onClick={onLoad}>
                                        <span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
                                        Load from Local Storage
                                    </DropdownMenuItem>
                                )}
                                
                                <DropdownMenuSeparator />
                                
                                <DropdownMenuLabel>IndexedDB</DropdownMenuLabel>
                                {onIndexedDBSave && (
                                    <DropdownMenuItem onClick={onIndexedDBSave}>
                                        <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                                        Save to IndexedDB
                                    </DropdownMenuItem>
                                )}
                                {onIndexedDBLoad && (
                                    <DropdownMenuItem onClick={onIndexedDBLoad}>
                                        <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                                        Load from IndexedDB
                                    </DropdownMenuItem>
                                )}
                                
                                {/* File System Access API options */}
                                {showFileSystemButtons && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel>File System</DropdownMenuLabel>
                                        {onExportToFile && (
                                            <DropdownMenuItem onClick={onExportToFile}>
                                                <span className="mr-2">📁</span>
                                                Export to File
                                            </DropdownMenuItem>
                                        )}
                                        {onImportFromFile && (
                                            <DropdownMenuItem onClick={onImportFromFile}>
                                                <span className="mr-2">📂</span>
                                                Import from File
                                            </DropdownMenuItem>
                                        )}
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    );
} 