"use client";

import html2canvas from "html2canvas";
import { Download, Share2 } from "lucide-react";

interface MenuBarProps {
  targetId?: string; // ID of the area to export
}

export function MenuBar({ targetId = "print-area" }: MenuBarProps) {
  // Download PNG of the preview
  const handleDownload = async () => {
    const element = document.getElementById(targetId);
    if (!element) return;

    // Ensure Tailwind background colors are converted safely
    const canvas = await html2canvas(element, {
      backgroundColor: "#ffffff", // solid white (no oklch)
      scale: 2, // higher resolution
      useCORS: true,
    });

    const link = document.createElement("a");
    link.download = "infographic.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Print preview

  return (
    <div className="mt-8 flex justify-center gap-4">
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
      >
        <Download className="w-4 h-4" />
        Download PNG
      </button>

      <button
        onClick={() => alert("Share coming soon!")}
        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow-md transition"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>
    </div>
  );
}
