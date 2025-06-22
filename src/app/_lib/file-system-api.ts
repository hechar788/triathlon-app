interface ExportData {
  exportType: 'triathlon_training_data';
  version: '1.0';
  exportDate: string;
  trainingData: {
    id: string;
    timestamp: number;
    traineeName: string;
    description?: string;
    customName?: string;
    data: any; // SerializableTrainingManagement
  };
  editHistory?: any; // EditHistoryStorage
}

/**
 * File System Access API utility for triathlon training app
 * Handles export/import of training data to/from local files
 */
export class FileSystemAPI {
  private static readonly FILE_EXTENSION = '.json';
  private static readonly FILE_DESCRIPTION = 'Triathlon Training Data';

  /**
   * Check if File System Access API is supported
   */
  static isSupported(): boolean {
    return 'showSaveFilePicker' in window && 'showOpenFilePicker' in window;
  }

  /**
   * Export training data to a file on the user's computer
   */
  static async exportTrainingData(
    trainingData: {
      id: string;
      timestamp: number;
      traineeName: string;
      description?: string;
      customName?: string;
      data: any;
    },
    editHistory?: any
  ): Promise<void> {
    if (!this.isSupported()) {
      throw new Error('File System Access API not supported in this browser');
    }

    try {
      // Prepare export data
      const exportData: ExportData = {
        exportType: 'triathlon_training_data',
        version: '1.0',
        exportDate: new Date().toISOString(),
        trainingData,
        editHistory
      };

      // Generate filename
      const filename = this.generateFilename(trainingData.traineeName, trainingData.customName);

      // Show save file picker
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [
          {
            description: this.FILE_DESCRIPTION,
            accept: {
              'application/json': [this.FILE_EXTENSION],
            },
          },
        ],
      });

      // Write data to file
      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(exportData, null, 2));
      await writable.close();

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // User cancelled the dialog
        return;
      }
      throw new Error(`Failed to export training data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Import training data from a file on the user's computer
   */
  static async importTrainingData(): Promise<{
    trainingData: {
      id: string;
      timestamp: number;
      traineeName: string;
      description?: string;
      customName?: string;
      data: any;
    };
    editHistory?: any;
  }> {
    if (!this.isSupported()) {
      throw new Error('File System Access API not supported in this browser');
    }

    try {
      // Show open file picker
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: this.FILE_DESCRIPTION,
            accept: {
              'application/json': [this.FILE_EXTENSION],
            },
          },
        ],
        multiple: false,
      });

      // Read file content
      const file = await fileHandle.getFile();
      const content = await file.text();
      
      // Parse and validate data
      const importData: ExportData = JSON.parse(content);
      
      if (!this.validateImportData(importData)) {
        throw new Error('Invalid file format or corrupted data');
      }

      return {
        trainingData: importData.trainingData,
        editHistory: importData.editHistory
      };

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // User cancelled the dialog
        throw new Error('Import cancelled by user');
      }
      if (error instanceof SyntaxError) {
        throw new Error('Invalid JSON file format');
      }
      throw new Error(`Failed to import training data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Export multiple training data entries to a single backup file
   */
  static async exportBackup(
    allTrainingData: Array<{
      id: string;
      timestamp: number;
      traineeName: string;
      description?: string;
      customName?: string;
      data: any;
    }>,
    editHistory?: any
  ): Promise<void> {
    if (!this.isSupported()) {
      throw new Error('File System Access API not supported in this browser');
    }

    try {
      const exportData = {
        exportType: 'triathlon_training_backup',
        version: '1.0',
        exportDate: new Date().toISOString(),
        trainingDataEntries: allTrainingData,
        editHistory
      };

      const filename = `triathlon-training-backup-${new Date().toISOString().split('T')[0]}.json`;

      const fileHandle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [
          {
            description: 'Triathlon Training Backup',
            accept: {
              'application/json': [this.FILE_EXTENSION],
            },
          },
        ],
      });

      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(exportData, null, 2));
      await writable.close();

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      throw new Error(`Failed to export backup: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate a filename for export
   */
  private static generateFilename(traineeName: string, customName?: string): string {
    const sanitize = (str: string) => str.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const date = new Date().toISOString().split('T')[0];
    
    if (customName) {
      return `${sanitize(customName)}_${date}${this.FILE_EXTENSION}`;
    }
    
    return `${sanitize(traineeName)}_training_${date}${this.FILE_EXTENSION}`;
  }

  /**
   * Validate imported data structure
   */
  private static validateImportData(data: any): data is ExportData {
    return (
      typeof data === 'object' &&
      data.exportType === 'triathlon_training_data' &&
      data.version === '1.0' &&
      typeof data.trainingData === 'object' &&
      typeof data.trainingData.id === 'string' &&
      typeof data.trainingData.timestamp === 'number' &&
      typeof data.trainingData.traineeName === 'string' &&
      typeof data.trainingData.data === 'object'
    );
  }

  /**
   * Show browser compatibility message
   */
  static getBrowserCompatibilityMessage(): string {
    if (this.isSupported()) {
      return 'File System Access API is supported';
    }
    
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome') || userAgent.includes('Edge')) {
      return 'Your browser supports File System Access API, but it may be disabled';
    } else if (userAgent.includes('Firefox')) {
      return 'Firefox does not support File System Access API yet. Please use Chrome or Edge for file export/import';
    } else if (userAgent.includes('Safari')) {
      return 'Safari does not support File System Access API yet. Please use Chrome or Edge for file export/import';
    }
    
    return 'Your browser does not support File System Access API. Please use Chrome or Edge for file export/import';
  }

  /**
   * Provide fallback download for unsupported browsers
   */
  static downloadAsFile(data: any, filename: string): void {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
  }
}

// Type declarations for File System Access API
declare global {
  interface Window {
    showOpenFilePicker(options?: {
      types?: Array<{
        description: string;
        accept: Record<string, string[]>;
      }>;
      multiple?: boolean;
    }): Promise<FileSystemFileHandle[]>;

    showSaveFilePicker(options?: {
      suggestedName?: string;
      types?: Array<{
        description: string;
        accept: Record<string, string[]>;
      }>;
    }): Promise<FileSystemFileHandle>;
  }

  interface FileSystemFileHandle {
    getFile(): Promise<File>;
    createWritable(): Promise<FileSystemWritableFileStream>;
  }

  interface FileSystemWritableFileStream {
    write(data: string): Promise<void>;
    close(): Promise<void>;
  }
} 