"use client";

import { InfographicData } from "../types";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface ExportSidebarProps {
  data: InfographicData;
  onClose: () => void;
}

export function ExportSidebar({ data, onClose }: ExportSidebarProps) {
  const handleDownloadPNG = async () => {
    const element = document.getElementById("print-area");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: null,
        useCORS: true,
        scale: 2
      });

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "infographic.png";
      link.click();
    } catch (error) {
      console.error("Error generating PNG:", error);
      alert("Error generating image. Please try again.");
    }
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("print-area");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("infographic.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Export Options</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleDownloadPNG}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          📷 Download PNG
        </button>

        <button
          onClick={handleDownloadPDF}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          📄 Download PDF
        </button>

        <button
          onClick={handlePrint}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          🖨️ Print
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-700 rounded-lg">
        <h3 className="font-semibold mb-2">Tips</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• PNG: Best for social media</li>
          <li>• PDF: Best for printing</li>
          <li>• Print: Direct browser printing</li>
        </ul>
      </div>
    </div>
  );
}