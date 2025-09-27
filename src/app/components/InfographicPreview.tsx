import { InfographicData } from "../types";
import { Header } from "./Header";
import { ContentBlock } from "./ContentBlock";
import { Footer } from "./Footer";

interface InfographicPreviewProps {
  data: InfographicData;
}

export function InfographicPreview({ data }: InfographicPreviewProps) {
  const customization = data.customization;
  const blocks = data.blocks;

  
  // Determine grid layout based on number of blocks
const getGridLayout = () => {
  const blockCount = blocks.length;

  if (blockCount === 1) {
    return "grid-cols-1"; // Single block = one column
  } else if (blockCount === 2) {
    return "grid-cols-1 md:grid-cols-2"; // Two blocks = two columns
  } else if (blockCount === 3 || blockCount === 4) {
    return "grid-cols-1 md:grid-cols-2"; // 3-4 blocks = 2 columns
  } else {
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"; // 5+ blocks = 3 columns
  }
};
;

  // Apply customization styles
  const getCustomStyles = () => {
    if (!customization) return '';

    // Font family mapping
    const fontFamilyMap = {
      'inter': 'font-sans',
      'system': 'font-system',
      'monospace': 'font-mono',
      'serif': 'font-serif',
      'comic-sans': 'font-comic',
      'arial': 'font-sans'
    };

    // Border radius mapping
    const borderRadiusMap = {
      'none': 'rounded-none',
      'small': 'rounded',
      'medium': 'rounded-lg',
      'large': 'rounded-xl',
      'xl': 'rounded-2xl'
    };

    // Shadow mapping
    const shadowMap = {
      'none': 'shadow-none',
      'subtle': 'shadow-sm',
      'medium': 'shadow-md',
      'bold': 'shadow-lg'
    };

    return `
      ${fontFamilyMap[customization.fontFamily] || 'font-sans'}
      ${borderRadiusMap[customization.borderRadius] || 'rounded-lg'}
      ${shadowMap[customization.shadow] || 'shadow-md'}
    `;
  };

  const customStyles = {
    '--primary-color': customization?.primaryColor || '#3B82F6',
    '--bg-color': customization?.backgroundColor || '#1F2937',
    '--text-color': customization?.textColor || '#F9FAFB',
    '--accent-color': customization?.accentColor || '#10B981',
  } as React.CSSProperties;

  return (
    <div
      id="print-area"
      className={`w-full max-w-6xl p-8 transition-all duration-300 print:bg-white print:text-black print:shadow-none print:w-full ${getCustomStyles()}`}
      style={{
        backgroundColor: customization?.backgroundColor || '#1F2937',
        color: customization?.textColor || '#F9FAFB',
        ...customStyles
      }}
    >
      <Header 
        title={data.title} 
        subtitle={data.subtitle} 
        customization={customization}
      />
      
      {/* Grid Layout for Content Blocks */}
      <div className={`my-8 grid gap-6 ${getGridLayout()}`}>
        {blocks.map((block, i) => (
          <ContentBlock 
            key={i} 
            {...block} 
            customization={customization}
            index={i}
            totalBlocks={blocks.length}
          />
        ))}
      </div>

      <Footer 
        {...data.footer} 
        customization={customization}
      />
    </div>
  );
}