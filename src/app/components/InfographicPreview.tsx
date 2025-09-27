import { InfographicData } from "../types";
import { Header } from "./Header";
import { ContentBlock } from "./ContentBlock";
import { Footer } from "./Footer";
import { MenuBar } from "./MenuBar";

interface InfographicPreviewProps {
  data: InfographicData;
}

export function InfographicPreview({ data }: InfographicPreviewProps) {
  const customization = data.customization;
  const blocks = data.blocks;

  // Determine grid layout based on number of blocks
  const getGridLayout = () => {
    const blockCount = blocks.length;

    if (blockCount === 1) return "grid-cols-1";
    if (blockCount === 2) return "grid-cols-1 md:grid-cols-2";
    if (blockCount === 3 || blockCount === 4) return "grid-cols-1 md:grid-cols-2";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

  // Map customization styles to Tailwind utility classes
  const getCustomStyles = () => {
    if (!customization) return "";

    const fontFamilyMap = {
      inter: "font-sans",
      system: "font-system",
      monospace: "font-mono",
      serif: "font-serif",
      "comic-sans": "font-comic",
      arial: "font-sans",
    };

    const borderRadiusMap = {
      none: "rounded-none",
      small: "rounded",
      medium: "rounded-lg",
      large: "rounded-xl",
      xl: "rounded-2xl",
    };

    const shadowMap = {
      none: "shadow-none",
      subtle: "shadow-sm",
      medium: "shadow-md",
      bold: "shadow-lg",
    };

    return `
      ${fontFamilyMap[customization.fontFamily] || "font-sans"}
      ${borderRadiusMap[customization.borderRadius] || "rounded-lg"}
      ${shadowMap[customization.shadow] || "shadow-md"}
    `;
  };

  // Ensure html2canvas-friendly colors (force HEX fallback)
  const safeHex = (color?: string, fallback = "#000000") => {
    if (!color) return fallback;
    if (color.startsWith("#") || color.startsWith("rgb")) return color;
    return fallback; // ignore Tailwind oklch/var()
  };

  const customStyles = {
    backgroundColor: safeHex(customization?.backgroundColor, "#1F2937"),
    color: safeHex(customization?.textColor, "#F9FAFB"),
  } as React.CSSProperties;

  return (
    <div>
      <div
        id="print-area"
        className={`w-full max-w-6xl p-8 transition-all duration-300 print:bg-white print:text-black print:shadow-none print:w-full ${getCustomStyles()}`}
        style={customStyles}
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

        <Footer {...data.footer} customization={customization} />
      </div>

      <MenuBar targetId="print-area" />
    </div>
  );
}
