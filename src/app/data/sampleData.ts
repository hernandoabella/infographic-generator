import { InfographicData, CustomizationOptions } from "../types";

export const defaultCustomization: CustomizationOptions = {
  // Colors
  primaryColor: '#3B82F6',
  backgroundColor: '#1F2937',
  textColor: '#F9FAFB',
  accentColor: '#10B981',

  // Typography
  fontFamily: 'inter',
  fontSize: 'medium',
  fontWeight: 'normal',

  // Layout
  spacing: 'comfortable',
  borderRadius: 'large',
  shadow: 'medium',

  // Theme
  theme: 'default'
};

export const initialInfographicData: InfographicData = {
  title: "Mastering JavaScript Console Methods",
  subtitle: "Essential debugging techniques for modern developers",
  blocks: [
    {
      title: "Basic Object Logging",
      code: `const user = { id: 1, name: "Neo", role: "Hacker" };
console.log(user);`,
      description: "Logs the object, but can collapse/expand in DevTools."
    },
    

  ],
  footer: {
    profilePic: "/profile.jpg",
    name: "Hernando Abella",
    username: "hernandoabella"
  },
  customization: defaultCustomization
};