import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { language } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const announcementText = {
    en: 'Welcome to Poonam Wholesale Wala, Jalna — Direct Showroom Rates on Furniture & Home Appliances',
    mr: 'पूनम होलसेल वाला, जालना मध्ये आपले स्वागत — फर्निचर व घरगुती उपकरणांवर थेट शोरूम होलसेल दर',
    hi: 'पूनम होलसेल वाला, जालना में आपका स्वागत — फर्नीचर और घरेलू उपकरणों पर सीधे शोरूम थोक दरें'
  }[language];

  return (
    <div className="bg-[#2A2421] text-[#DFB270] dark:bg-[#0F0D0C] dark:text-[#E8C488] px-4 py-2 text-xs md:text-sm font-medium tracking-wide flex items-center justify-between border-b border-[#3D332D]">
      <div className="mx-auto text-center truncate pr-2">
        <span>{announcementText}</span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-[#DFB270]/70 hover:text-[#DFB270] transition-colors p-1"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
