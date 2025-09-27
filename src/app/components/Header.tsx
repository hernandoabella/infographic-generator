import { CustomizationOptions } from "../types";

interface HeaderProps {
  title: string;
  subtitle: string;
  customization?: CustomizationOptions;
}

export function Header({ title, subtitle, customization }: HeaderProps) {
  return (
    <header className="text-center mb-8">
      <h1 
        className="text-4xl font-bold mb-3 gradient-text"
        style={{ 
          background: customization?.primaryColor 
            ? `linear-gradient(135deg, ${customization.primaryColor}, ${customization.accentColor || customization.primaryColor})`
            : 'linear-gradient(135deg, #3B82F6, #10B981)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        {title}
      </h1>
      <p 
        className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed"
        style={{ color: customization?.textColor || '#F9FAFB' }}
      >
        {subtitle}
      </p>
      
      {/* Decorative Line */}
      <div 
        className="w-24 h-1 mx-auto mt-6 rounded-full"
        style={{ backgroundColor: customization?.primaryColor || '#3B82F6' }}
      />
    </header>
  );
}