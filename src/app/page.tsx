"use client";

import { useState } from "react";
import { InfographicEditor } from "./components/InfographicEditor";
import { InfographicPreview } from "./components/InfographicPreview";
import { ExportSidebar } from "./components/ExportSidebar";
import { initialInfographicData } from "./data/sampleData";
import { InfographicData } from "./types";

export default function Home() {
  const [infographicData, setInfographicData] = useState<InfographicData>(initialInfographicData);
  const [isExportSidebarOpen, setIsExportSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex h-screen">
        {/* Left Sidebar - Editor */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <InfographicEditor 
            data={infographicData}
            onDataChange={setInfographicData}
            onExportClick={() => setIsExportSidebarOpen(true)}
          />
        </div>

        {/* Main Content - Preview */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
          <InfographicPreview data={infographicData} />
        </div>

       
        
      </div>
    </div>
  );
}