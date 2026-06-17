import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'icon';
  className?: string;
}

export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  // Define exact colors from the design moodboard
  const color1 = '#0057D9'; // Cobalt Blue
  const color2 = '#007BE6'; // Medium Blue
  const color3 = '#00B4D8'; // Cyan/Teal
  const color4 = '#00D2C4'; // Aquamarine/Teal

  // Render the four animated streamlines matching the brand graphics
  const iconSvg = (
    <svg
      className={variant === 'icon' ? 'w-12 h-12 flex-shrink-0' : 'w-14 h-7 flex-shrink-0'}
      viewBox="0 0 100 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="logo-streamlines-svg"
    >
      {/* --- STREAMLINE 1 (Top - Cobalt Blue) --- */}
      {/* Left Anchor Dot */}
      <circle cx="12" cy="15" r="2.5" fill={color1} />
      {/* Base Path */}
      <path
        d="M 12 15 C 30 25, 55 5, 85 12"
        stroke={color1}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Dynamic Flow Particle Tracer overlay */}
      <path
        d="M 12 15 C 30 25, 55 5, 85 12"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="logo-flow-line-1 opacity-60"
      />
      {/* Right Anchor Dot */}
      <circle cx="85" cy="12" r="2.5" fill={color1} />

      {/* --- STREAMLINE 2 (Medium Blue) --- */}
      {/* Left Anchor Dot */}
      <circle cx="10" cy="23" r="2.5" fill={color2} />
      {/* Base Path */}
      <path
        d="M 10 23 C 28 33, 58 13, 88 20"
        stroke={color2}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.95"
      />
      {/* Dynamic Flow Particle Tracer overlay */}
      <path
        d="M 10 23 C 28 33, 58 13, 88 20"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="logo-flow-line-2 opacity-60"
      />
      {/* Right Anchor Dot */}
      <circle cx="88" cy="20" r="2.5" fill={color2} />

      {/* --- STREAMLINE 3 (Cyan/Teal) --- */}
      {/* Left Anchor Dot */}
      <circle cx="10" cy="31" r="2.5" fill={color3} />
      {/* Base Path */}
      <path
        d="M 10 31 C 28 41, 58 21, 88 28"
        stroke={color3}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.95"
      />
      {/* Dynamic Flow Particle Tracer overlay */}
      <path
        d="M 10 31 C 28 41, 58 21, 88 28"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="logo-flow-line-3 opacity-60"
      />
      {/* Right Anchor Dot */}
      <circle cx="88" cy="28" r="2.5" fill={color3} />

      {/* --- STREAMLINE 4 (Bottom - Aquamarine) --- */}
      {/* Left Anchor Dot */}
      <circle cx="12" cy="39" r="2.5" fill={color4} />
      {/* Base Path */}
      <path
        d="M 12 39 C 30 49, 58 29, 83 36"
        stroke={color4}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Dynamic Flow Particle Tracer overlay */}
      <path
        d="M 12 39 C 30 49, 58 29, 83 36"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="logo-flow-line-4 opacity-60"
      />
      {/* Right Anchor Dot */}
      <circle cx="83" cy="36" r="2.5" fill={color4} />
    </svg>
  );

  if (variant === 'icon') {
    return (
      <div className={`flex items-center justify-center ${className}`} id="logo-icon-container">
        {iconSvg}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 select-none ${className}`} id="logo-brand-container">
      {iconSvg}
      
      {/* Core Wordmark "FlowDiv" using precise font-display "Saira" and matching design sizes */}
      <span className="font-display font-semibold text-2xl tracking-tight flex items-center leading-none">
        {/* "Flow" in Deep Navy (Dark theme/slate) or Off-white (Light variant) */}
        <span className={variant === 'light' ? 'text-white' : 'text-navy'} id="logo-text-flow">
          Flow
        </span>
        
        {/* "Div" in Cobalt Blue */}
        <span className="text-cobalt flex items-center" id="logo-text-div">
          D
          {/* Custom animated/styled lowercase 'i' with a pulsing cobalt dot */}
          <span className="relative inline-flex flex-col items-center">
            <span className="absolute -top-1.5 w-1.5 h-1.5 rounded-full bg-cobalt animate-pulse"></span>
            <span>i</span>
          </span>
          v
        </span>
      </span>
    </div>
  );
}
