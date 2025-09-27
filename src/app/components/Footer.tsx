import { CustomizationOptions } from "../types";

interface FooterProps {
  profilePic: string;
  name: string;
  username: string;
  customization?: CustomizationOptions; // 👈 agregado
}

export function Footer({ profilePic, name, username, customization }: FooterProps) {
  return (
    <div className="flex items-center mt-8 gap-4">
      <img 
        src={profilePic} 
        alt={name} 
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm opacity-70">@{username}</p>
      </div>
    </div>
  );
}
