"use client";

import { InfographicData, CustomizationOptions } from '../types';
import { exportAsPNG, exportAsPDF, exportAsJSON } from '../utils/export-utils';

interface ExportControlsProps {
  infographicData: InfographicData;
  customization: CustomizationOptions;
}

export function ExportControls({ infographicData, customization }: ExportControlsProps) {
  const handleExport = async (format: 'png' | 'pdf' | 'json') => {
    try {
      switch (format) {
        case 'png':
          await exportAsPNG();
          break;
        case 'pdf':
          await exportAsPDF(infographicData);
          break;
        case 'json':
          exportAsJSON(infographicData, customization);
          break;
      }
    } catch (error) {
      console.error(`Error exporting as ${format}:`, error);
      alert(`Error exporting as ${format}. Please try again.`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-between p-4 bg-gray-800 rounded-lg">
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => handleExport('png')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
        >
          <span>📷</span>
          Download PNG
        </button>
        
        <button
          onClick={() => handleExport('pdf')}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
        >
          <span>📄</span>
          Download PDF
        </button>
        
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
        >
          <span>🖨️</span>
          Print
        </button>
      </div>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => handleExport('json')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors text-sm"
        >
          <span>💾</span>
          Export Template
        </button>
        
        <label className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors text-sm cursor-pointer">
          <span>📥</span>
          Import Template
          <input
            type="file"
            accept=".json"
            onChange={(e) => {
              // Import functionality will be implemented later
              console.log('Import feature coming soon');
            }}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}