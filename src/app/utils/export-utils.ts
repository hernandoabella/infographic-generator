import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { InfographicData, CustomizationOptions } from '../types';

export const exportAsPNG = async (): Promise<void> => {
  const element = document.getElementById('print-area');
  if (!element) return;

  const canvas = await html2canvas(element, {
    backgroundColor: null,
    useCORS: true,
    scale: 2 // Higher quality
  });

  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'infographic.png';
  link.click();
};

export const exportAsPDF = async (data: InfographicData): Promise<void> => {
  const element = document.getElementById('print-area');
  if (!element) return;

  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${data.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
};

export const exportAsJSON = (data: InfographicData, customization: CustomizationOptions): void => {
  const exportData = { data, customization, version: '1.0' };
  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = 'infographic-template.json';
  link.click();
};

export const importFromJSON = (event: React.ChangeEvent<HTMLInputElement>): void => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = JSON.parse(e.target?.result as string);
      // Handle the imported data (you'll need to pass this up to parent)
      console.log('Imported data:', content);
    } catch (error) {
      console.error('Error parsing JSON file:', error);
    }
  };
  reader.readAsText(file);
};