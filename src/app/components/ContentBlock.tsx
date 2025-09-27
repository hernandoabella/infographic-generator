import { CustomizationOptions } from "../types";
import { CodeBlock } from "./CodeBlock";

interface ContentBlockProps {
  title: string;
  code: string;
  description: string;
  index: number;
  totalBlocks: number;
  customization?: CustomizationOptions;
}

export function ContentBlock({ 
  title, 
  code, 
  description, 
  index,
  totalBlocks,
  customization 
}: ContentBlockProps) {
  // Determine block height based on content length
  const getBlockHeight = () => {
    const codeLength = code.split("\n").length;
    if (codeLength > 8) return "min-h-[300px]";
    if (codeLength > 5) return "min-h-[250px]";
    return "min-h-[200px]";
  };

  const blockStyle = {
    borderColor: customization?.primaryColor || "#3B82F6",
    backgroundColor:
      customization?.backgroundColor === "#FFFFFF"
        ? "#F9FAFB"
        : "rgba(255, 255, 255, 0.05)",
  };

  return (
    <div
      className={`
        relative p-6 border-2 transition-all duration-300 hover:transform hover:scale-105 
        ${getBlockHeight()} 
        flex flex-col
        ${
          customization?.borderRadius === "none"
            ? "rounded-none"
            : customization?.borderRadius === "small"
            ? "rounded-lg"
            : customization?.borderRadius === "large"
            ? "rounded-xl"
            : customization?.borderRadius === "xl"
            ? "rounded-2xl"
            : "rounded-lg"
        }
        ${
          customization?.shadow === "none"
            ? "shadow-none"
            : customization?.shadow === "subtle"
            ? "shadow-md"
            : customization?.shadow === "bold"
            ? "shadow-lg"
            : "shadow-md"
        }
      `}
      style={blockStyle}
    >
      {/* Block Number */}
      <div
        className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
        style={{ backgroundColor: customization?.primaryColor || "#3B82F6" }}
      >
        {index + 1}
      </div>

      {/* Title */}
      <h3
        className="text-lg font-bold mb-3 pr-4"
        style={{ color: customization?.primaryColor || "#3B82F6" }}
      >
        {title}
      </h3>

      {/* Code Block with Syntax Highlighter */}
      <div className="flex-1 mb-4">
        <CodeBlock code={code} language="javascript" />
      </div>

      {/* Description */}
      <div
        className="mt-auto pt-3 border-t"
        style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
      >
        <p className="text-sm opacity-90 leading-relaxed">{description}</p>
      </div>

      {/* Hover Effect Indicator */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, transparent, ${
            customization?.primaryColor || "#3B82F6"
          }10, transparent)`,
        }}
      />
    </div>
  );
}
