"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-white">
      <SyntaxHighlighter
        language={language}
        style={vs}
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontSize: "0.875rem",
          background: "transparent",
          border: "none",
        }}
        showLineNumbers
        lineNumberStyle={{
          color: "#6B7280",
          minWidth: "3em"
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}