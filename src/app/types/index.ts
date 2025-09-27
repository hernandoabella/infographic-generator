export interface InfographicData {
  title: string;
  subtitle: string;
  blocks: ContentBlock[];
  footer: FooterData;
  customization?: CustomizationOptions;
}

export interface ContentBlock {
  title: string;
  code: string;
  description: string;
}

export interface FooterData {
  profilePic: string;
  name: string;
  username: string;
}

export interface CustomizationOptions {
  // Colors
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  
  // Typography
  fontFamily: FontFamily;
  fontSize: FontSize;
  fontWeight: FontWeight;
  
  // Layout
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadow: Shadow;
  
  // Theme
  theme: Theme;
}

// Typography Options
export type FontFamily = 'inter' | 'system' | 'monospace' | 'serif' | 'comic-sans' | 'arial';
export type FontSize = 'small' | 'medium' | 'large';
export type FontWeight = 'normal' | 'medium' | 'bold';

// Layout Options
export type Spacing = 'compact' | 'comfortable' | 'spacious';
export type BorderRadius = 'none' | 'small' | 'medium' | 'large' | 'xl';
export type Shadow = 'none' | 'subtle' | 'medium' | 'bold';

// Theme Options
export type Theme = 'default' | 'dark' | 'minimal' | 'colorful' | 'professional' | 'warm';

// Preset Types
export interface DesignPreset {
  id: string;
  name: string;
  description: string;
  customization: CustomizationOptions;
  previewColor: string;
}