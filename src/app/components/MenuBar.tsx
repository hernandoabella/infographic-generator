"use client";

import html2canvas from "html2canvas";
import { Download, Share2 } from "lucide-react";

interface MenuBarProps {
    targetId?: string; // id del área a exportar
}

export function MenuBar({ targetId = "print-area" }: MenuBarProps) {
    // Exportar como PNG
    const handleDownload = async () => {
        const element = document.getElementById(targetId);
        if (!element) return;

        const canvas = await html2canvas(element, {
            backgroundColor: "#ffffff",
            scale: 2, // mejor resolución
        });
        const link = document.createElement("a");
        link.download = "infographic.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

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
