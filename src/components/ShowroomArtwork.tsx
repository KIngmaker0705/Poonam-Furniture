import React from 'react';

interface ArtworkProps {
  type: string;
  className?: string;
}

export const ShowroomArtwork: React.FC<ArtworkProps> = ({ type, className = 'w-full h-full' }) => {
  switch (type) {
    case 'hero':
      return (
        <svg viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A2421" />
              <stop offset="50%" stopColor="#1E1A18" />
              <stop offset="100%" stopColor="#141211" />
            </linearGradient>
            <linearGradient id="warmTeak" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A46843" />
              <stop offset="100%" stopColor="#7E4A28" />
            </linearGradient>
            <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFB270" />
              <stop offset="100%" stopColor="#B38639" />
            </linearGradient>
            <linearGradient id="tvScreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1320" />
              <stop offset="100%" stopColor="#05080E" />
            </linearGradient>
            <linearGradient id="linenFabric" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D9D2C9" />
              <stop offset="100%" stopColor="#B8AEA3" />
            </linearGradient>
          </defs>

          {/* Background Wall & Floor */}
          <rect width="1200" height="675" fill="url(#heroBg)" />
          {/* Wall Panel Slats */}
          <g opacity="0.15">
            {Array.from({ length: 40 }).map((_, i) => (
              <rect key={i} x={i * 30} y="0" width="12" height="480" fill="#DFB270" />
            ))}
          </g>
          {/* Polished Teak Floor */}
          <polygon points="0,480 1200,480 1200,675 0,675" fill="#2E1F18" />
          <line x1="0" y1="480" x2="1200" y2="480" stroke="#DFB270" strokeWidth="2" strokeOpacity="0.4" />

          {/* Ambient Lighting Glow */}
          <circle cx="280" cy="220" r="180" fill="#DFB270" opacity="0.08" />
          <circle cx="880" cy="220" r="220" fill="#8BB2E5" opacity="0.08" />

          {/* Teak Wardrobe (Kapat) on Left */}
          <g transform="translate(80, 160)">
            {/* Main Cabinet */}
            <rect x="0" y="0" width="220" height="340" rx="4" fill="url(#warmTeak)" />
            {/* Crown Molding */}
            <rect x="-10" y="-12" width="240" height="12" rx="2" fill="#5C3419" />
            {/* Panels & Doors */}
            <line x1="73" y1="0" x2="73" y2="340" stroke="#4A2914" strokeWidth="3" />
            <line x1="146" y1="0" x2="146" y2="340" stroke="#4A2914" strokeWidth="3" />
            {/* Mirror in Center Door */}
            <rect x="80" y="30" width="60" height="240" rx="2" fill="#A8BCC9" fillOpacity="0.3" stroke="#DFB270" strokeWidth="2" />
            {/* Brass Handles */}
            <rect x="66" y="150" width="4" height="40" rx="2" fill="url(#goldAccent)" />
            <rect x="150" y="150" width="4" height="40" rx="2" fill="url(#goldAccent)" />
            {/* Lower Drawers */}
            <rect x="8" y="285" width="204" height="45" rx="2" fill="#5C3419" stroke="#4A2914" strokeWidth="2" />
            <circle cx="110" cy="307" r="4" fill="url(#goldAccent)" />
          </g>

          {/* Modern Crafted Teak Bed in Center */}
          <g transform="translate(360, 240)">
            {/* Headboard */}
            <rect x="0" y="0" width="440" height="180" rx="8" fill="url(#warmTeak)" stroke="#5C3419" strokeWidth="4" />
            {/* Woven Cane Headboard Inset */}
            <rect x="25" y="20" width="390" height="130" rx="4" fill="#C49B66" opacity="0.65" stroke="#DFB270" strokeWidth="2" strokeDasharray="4 2" />
            {/* Mattress & Bedding */}
            <rect x="-20" y="140" width="480" height="110" rx="12" fill="url(#linenFabric)" />
            {/* Plush Pillows */}
            <rect x="20" y="125" width="180" height="40" rx="10" fill="#EAE5DF" stroke="#D1C7BD" strokeWidth="2" />
            <rect x="240" y="125" width="180" height="40" rx="10" fill="#EAE5DF" stroke="#D1C7BD" strokeWidth="2" />
            {/* Duvet Fold */}
            <polygon points="-20,175 460,175 460,250 -20,250" fill="#C5BCB1" />
            {/* Bed Frame & Tapered Legs */}
            <rect x="-30" y="240" width="500" height="25" rx="4" fill="#5C3419" />
            <polygon points="-20,265 -15,300 -5,300 -10,265" fill="#4A2914" />
            <polygon points="450,265 455,300 445,300 440,265" fill="#4A2914" />
          </g>

          {/* Smart TV & Lowline Teak Entertainment Console on Right */}
          <g transform="translate(860, 180)">
            {/* Ultra Slim Wall-Mounted Smart TV */}
            <rect x="20" y="0" width="240" height="145" rx="4" fill="#000000" stroke="#555555" strokeWidth="3" />
            <rect x="26" y="6" width="228" height="133" rx="2" fill="url(#tvScreen)" />
            {/* Screen Horizon Glow */}
            <path d="M 26 100 Q 140 70 254 100 L 254 139 L 26 139 Z" fill="#204060" opacity="0.5" />
            <circle cx="140" cy="70" r="18" fill="url(#goldAccent)" opacity="0.4" />
            {/* Lowline Media Console */}
            <rect x="0" y="180" width="280" height="90" rx="4" fill="url(#warmTeak)" />
            <line x1="93" y1="180" x2="93" y2="270" stroke="#4A2914" strokeWidth="2" />
            <line x1="186" y1="180" x2="186" y2="270" stroke="#4A2914" strokeWidth="2" />
            {/* Brass Console Feet */}
            <rect x="20" y="270" width="10" height="25" rx="2" fill="url(#goldAccent)" />
            <rect x="250" y="270" width="10" height="25" rx="2" fill="url(#goldAccent)" />
          </g>

          {/* Showroom Lighting Chandelier Top */}
          <g transform="translate(600, 30)">
            <line x1="0" y1="0" x2="0" y2="70" stroke="url(#goldAccent)" strokeWidth="3" />
            <circle cx="0" cy="85" r="24" fill="none" stroke="url(#goldAccent)" strokeWidth="4" />
            <circle cx="0" cy="85" r="8" fill="#FFF2D6" />
          </g>
        </svg>
      );

    case 'beds':
    case 'bed':
      return (
        <svg viewBox="0 0 600 450" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="600" height="450" fill="#F4EFEA" className="dark:fill-[#1A1817]" />
          <g transform="translate(70, 70)">
            {/* Teak Headboard with Arched Elegance */}
            <rect x="30" y="20" width="400" height="180" rx="8" fill="#8B532C" />
            <rect x="50" y="40" width="360" height="140" rx="4" fill="#D3A975" opacity="0.75" stroke="#72411E" strokeWidth="3" />
            {/* Mattress */}
            <rect x="10" y="160" width="440" height="120" rx="14" fill="#EAE5DF" stroke="#D3C9BD" strokeWidth="3" />
            {/* Bed Runner / Duvet */}
            <path d="M 10 210 Q 230 200 450 210 L 450 280 L 10 280 Z" fill="#B38639" opacity="0.85" />
            {/* Pillows */}
            <rect x="60" y="140" width="140" height="45" rx="8" fill="#FFFFFF" stroke="#D3C9BD" strokeWidth="2" />
            <rect x="260" y="140" width="140" height="45" rx="8" fill="#FFFFFF" stroke="#D3C9BD" strokeWidth="2" />
            {/* Solid Wooden Base & Legs */}
            <rect x="0" y="270" width="460" height="30" rx="4" fill="#5C3419" />
            <rect x="20" y="300" width="18" height="35" rx="2" fill="#422511" />
            <rect x="422" y="300" width="18" height="35" rx="2" fill="#422511" />
          </g>
        </svg>
      );

    case 'wardrobes':
    case 'kapat':
      return (
        <svg viewBox="0 0 600 450" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="600" height="450" fill="#F2EFE9" className="dark:fill-[#18181A]" />
          <g transform="translate(160, 30)">
            {/* Steel / Teak Kapat Cabinet */}
            <rect x="20" y="20" width="240" height="360" rx="6" fill="#435263" stroke="#2D3748" strokeWidth="4" />
            {/* 3 Doors */}
            <rect x="30" y="30" width="68" height="270" rx="2" fill="#4E5D6F" stroke="#2D3748" strokeWidth="2" />
            {/* Center Mirror Door */}
            <rect x="104" y="30" width="72" height="270" rx="2" fill="#CBD5E1" stroke="#DFB270" strokeWidth="2" />
            <rect x="182" y="30" width="68" height="270" rx="2" fill="#4E5D6F" stroke="#2D3748" strokeWidth="2" />
            {/* Brass Handles */}
            <rect x="85" y="150" width="5" height="35" rx="2" fill="#DFB270" />
            <rect x="190" y="150" width="5" height="35" rx="2" fill="#DFB270" />
            {/* Bottom Drawers */}
            <rect x="30" y="308" width="106" height="55" rx="2" fill="#3A4655" stroke="#2D3748" strokeWidth="2" />
            <rect x="144" y="308" width="106" height="55" rx="2" fill="#3A4655" stroke="#2D3748" strokeWidth="2" />
            <circle cx="83" cy="335" r="4" fill="#DFB270" />
            <circle cx="197" cy="335" r="4" fill="#DFB270" />
          </g>
        </svg>
      );

    case 'rotating-dressing-tables':
    case 'dressing-tables':
      return (
        <svg viewBox="0 0 600 450" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="600" height="450" fill="#F6F2EC" className="dark:fill-[#191716]" />
          <g transform="translate(190, 30)">
            {/* Rotating Tall Vanity Mirror Column */}
            <rect x="50" y="20" width="120" height="320" rx="60" fill="#8B532C" stroke="#5C3419" strokeWidth="4" />
            {/* Inner Full Length Mirror */}
            <rect x="62" y="35" width="96" height="240" rx="48" fill="#DCE5ED" stroke="#DFB270" strokeWidth="3" />
            {/* Lower Rotating Drawers Base */}
            <rect x="25" y="330" width="170" height="50" rx="8" fill="#72411E" stroke="#5C3419" strokeWidth="3" />
            {/* 360 Swivel Base */}
            <ellipse cx="110" cy="385" rx="90" ry="15" fill="#4A2914" />
            <circle cx="110" cy="305" r="5" fill="#DFB270" />
            {/* Rotate Indicator Arc */}
            <path d="M 30 200 A 80 80 0 0 1 190 200" fill="none" stroke="#DFB270" strokeWidth="2" strokeDasharray="4 4" />
          </g>
        </svg>
      );

    case 'televisions':
    case 'smart-tv':
      return (
        <svg viewBox="0 0 600 450" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="600" height="450" fill="#EEF2F6" className="dark:fill-[#15191E]" />
          <g transform="translate(80, 80)">
            {/* 55-inch Ultra Thin Smart TV */}
            <rect x="20" y="20" width="400" height="240" rx="6" fill="#0A0D12" stroke="#4A5568" strokeWidth="4" />
            <rect x="28" y="28" width="384" height="224" rx="3" fill="#0F172A" />
            {/* Screen Visual Ambient Display */}
            <circle cx="220" cy="140" r="60" fill="#3B82F6" opacity="0.3" />
            <circle cx="260" cy="120" r="45" fill="#DFB270" opacity="0.35" />
            {/* Stand Legs */}
            <polygon points="100,260 120,295 90,295" fill="#334155" />
            <polygon points="340,260 350,295 320,295" fill="#334155" />
          </g>
        </svg>
      );

    case 'refrigerators':
    case 'fridge':
      return (
        <svg viewBox="0 0 600 450" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="600" height="450" fill="#F0F4F8" className="dark:fill-[#15181C]" />
          <g transform="translate(180, 30)">
            {/* Double Door Modern Refrigerator */}
            <rect x="30" y="20" width="180" height="360" rx="12" fill="#64748B" stroke="#334155" strokeWidth="4" />
            {/* Top Freezer Door */}
            <rect x="36" y="28" width="168" height="110" rx="8" fill="#94A3B8" />
            {/* Bottom Fridge Door */}
            <rect x="36" y="145" width="168" height="225" rx="8" fill="#94A3B8" />
            {/* Recessed Handle Grips */}
            <rect x="44" y="125" width="30" height="8" rx="4" fill="#334155" />
            <rect x="44" y="155" width="30" height="8" rx="4" fill="#334155" />
            {/* Digital Inverter Badge */}
            <rect x="140" y="45" width="50" height="18" rx="3" fill="#1E293B" stroke="#38BDF8" strokeWidth="1" />
          </g>
        </svg>
      );

    case 'sofas':
    case 'sofa':
      return (
        <svg viewBox="0 0 600 450" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="600" height="450" fill="#F7F5F0" className="dark:fill-[#1B1917]" />
          <g transform="translate(70, 90)">
            {/* Luxury Fabric Modular Sofa */}
            {/* Sofa Backrest */}
            <rect x="30" y="20" width="400" height="140" rx="16" fill="#C4B8AA" stroke="#9C8E7E" strokeWidth="3" />
            {/* Left Armrest */}
            <rect x="10" y="60" width="60" height="140" rx="12" fill="#B3A596" stroke="#9C8E7E" strokeWidth="3" />
            {/* Right Armrest */}
            <rect x="390" y="60" width="60" height="140" rx="12" fill="#B3A596" stroke="#9C8E7E" strokeWidth="3" />
            {/* 3 Cushion Seats */}
            <rect x="70" y="110" width="105" height="100" rx="10" fill="#DFD7CE" stroke="#9C8E7E" strokeWidth="2" />
            <rect x="178" y="110" width="105" height="100" rx="10" fill="#DFD7CE" stroke="#9C8E7E" strokeWidth="2" />
            <rect x="286" y="110" width="105" height="100" rx="10" fill="#DFD7CE" stroke="#9C8E7E" strokeWidth="2" />
            {/* Wooden Base & Tapered Legs */}
            <rect x="20" y="210" width="420" height="20" rx="4" fill="#6B4226" />
            <polygon points="40,230 45,260 30,260 35,230" fill="#4A2914" />
            <polygon points="420,230 425,260 410,260 415,230" fill="#4A2914" />
          </g>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 600 450" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="600" height="450" fill="#F4EFEA" className="dark:fill-[#1A1817]" />
          <g transform="translate(150, 100)">
            <rect x="50" y="50" width="200" height="150" rx="8" fill="#8B532C" opacity="0.8" />
            <line x1="80" y1="200" x2="80" y2="240" stroke="#5C3419" strokeWidth="8" />
            <line x1="220" y1="200" x2="220" y2="240" stroke="#5C3419" strokeWidth="8" />
          </g>
        </svg>
      );
  }
};
