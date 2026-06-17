import React, { useState, useMemo } from 'react';
import { Gauge, Thermometer, Wind, Zap, Info, Activity, Flame, Clock } from 'lucide-react';

interface Hotspot3D {
  id: string;
  name: string;
  coord: string;
  cx: number;
  cy: number;
  description: string;
  velocity: string;
  temp: string;
  airAge: string;
  co2: string;
}

export default function HeroVentilationStudy() {
  const [activeStudyField, setActiveStudyField] = useState<'velocity' | 'thermal' | 'age'>('velocity');
  const [cfmLevel, setCfmLevel] = useState<number>(450); // Fresh air CFM
  const [solarHeat, setSolarHeat] = useState<number>(4.0); // Heat intensity in kW
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot3D | null>(null);

  // Define 3D coordinate-positioned sensors across our multi-floor atrium layout
  const hotspots: Hotspot3D[] = [
    {
      id: 'ground_inlet',
      name: 'Ground Floor Displacement Diffuser',
      coord: 'X: 4.5m, Y: 2.1m, Z: 0.2m',
      cx: 90,
      cy: 230,
      description: 'Displacement fresh air supply. Cool, high-density air pooling at floor level.',
      velocity: '0.45 m/s',
      temp: '18.5 °C',
      airAge: '12 sec',
      co2: '410 ppm'
    },
    {
      id: 'atrium_core',
      name: 'Atrium Central Buoyant Vortex',
      coord: 'X: 12.0m, Y: 12.0m, Z: 6.5m',
      cx: 190,
      cy: 165,
      description: 'Core buoyant updraft. Warm air ascending vertically through floor openings.',
      velocity: '1.25 m/s',
      temp: '23.8 °C',
      airAge: '110 sec',
      co2: '580 ppm'
    },
    {
      id: 'mezzanine_dead',
      name: 'Level 3 Mezzanine Dead Zone',
      coord: 'X: 22.1m, Y: 5.4m, Z: 9.8m',
      cx: 310,
      cy: 100,
      description: 'Flow recirculation wake behind structural columns. Air stagnancy region.',
      velocity: '0.03 m/s',
      temp: '26.4 °C',
      airAge: '790 sec',
      co2: '920 ppm'
    },
    {
      id: 'roof_exhaust',
      name: 'Roof Level Solar Extraction Vent',
      coord: 'X: 12.0m, Y: 12.0m, Z: 12.2m',
      cx: 190,
      cy: 50,
      description: 'Thermal stack discharge point. Stale, heated air exited under negative pressure.',
      velocity: '2.10 m/s',
      temp: '28.9 °C',
      airAge: '160 sec',
      co2: '650 ppm'
    }
  ];

  // Calculate live study values dynamically based on selected CFM and Solar Heat Load
  const calculatedMetrics = useMemo(() => {
    const scaleFactor = cfmLevel / 450;
    const heatFactor = solarHeat / 4.0;
    
    // Stack effect speed is driven by both supply air injection and thermal buoyancy lift
    const stackDraftSpeed = (0.2 + (heatFactor * 0.4) + (scaleFactor * 0.65)).toFixed(2);
    // Atrium CO2 decreases with high CFM ventilation, slightly increases when hot stagnation is present
    const meanAtriumCo2 = Math.max(390, Math.min(1000, 780 - (scaleFactor * 320) + (heatFactor * 45))).toFixed(0);
    // Temperature stratification reflects heat gradient between top and bottom floors
    const tempStratification = (3.2 + (heatFactor * 4.8) - (scaleFactor * 2.1)).toFixed(1);
    // Disippation efficiency is highest with plenty of fresh flushing CFM relative to solar thermal load
    const heatDissipation = Math.min(99.4, Math.max(28, 55 + (scaleFactor * 25) - (heatFactor * 10))).toFixed(1);

    return {
      draft: stackDraftSpeed,
      co2: meanAtriumCo2,
      strat: tempStratification,
      efficiency: heatDissipation
    };
  }, [cfmLevel, solarHeat]);

  // Adjust path speeds dynamically based on flow rates
  const flowSpeedClass = useMemo(() => {
    const speed = cfmLevel + (solarHeat * 35);
    if (speed > 750) return 'airflow-line-fast';
    if (speed < 380) return 'airflow-line-slow';
    return 'airflow-line';
  }, [cfmLevel, solarHeat]);

  return (
    <div id="hero-mini-ventilation-study" className="relative bg-navy border border-white/10 rounded-lg p-5 sm:p-6 shadow-2xl overflow-hidden flex flex-col justify-between group">
      {/* Subtle blueprint background grid */}
      <div className="absolute inset-0 blueprint-grid-dark opacity-35"></div>
      <div className="absolute inset-0 blueprint-grid-fine-dark opacity-15"></div>

      {/* Header telemetry ribbon */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 relative z-10" id="study-header">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
            3D STUDY: VERTICAL ATRIUM BUOYANCY
          </span>
        </div>
        <span className="text-[9px] font-mono text-white/50">
          MESH RESOLUTION: 2.1M TET-CELLS
        </span>
      </div>

      {/* Selector Tabs for Study Modes */}
      <div className="flex border border-white/10 rounded bg-navy-light/40 overflow-hidden relative z-10 mb-4 text-[10px] sm:text-xs">
        {(['velocity', 'thermal', 'age'] as const).map((field) => (
          <button
            key={field}
            id={`hero-tab-${field}`}
            onClick={() => setActiveStudyField(field)}
            className={`flex-1 py-2 text-center font-mono font-bold transition-all ${
              activeStudyField === field
                ? 'bg-cobalt text-white shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {field === 'velocity' ? '🌬️ Airflow velocity' : field === 'thermal' ? '🔥 Thermal Zones' : '⏳ Air Age (Flushing)'}
          </button>
        ))}
      </div>

      {/* Isometric 3D wireframe canvas showing Multi-floor vertical atrium */}
      <div className="relative border border-white/10 rounded overflow-hidden bg-slate-950/90 h-64 sm:h-72 flex items-center justify-center z-10 mb-4 shadow-inner">
        <div className="absolute inset-0 blueprint-grid-dark opacity-30"></div>

        {/* Legend Indicator for different study modes */}
        <div className="absolute top-2 left-2 flex items-center gap-2 bg-slate-900/90 border border-white/10 px-2.5 py-1 rounded text-[8px] font-mono text-white/90 z-20">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cobalt opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cobalt"></span>
          </span>
          <span>
            {activeStudyField === 'velocity' && 'SPECTRUM: 0.05m/s (Blue) — 2.5m/s (Red)'}
            {activeStudyField === 'thermal' && 'GRADIENT: 18°C Ground Displacement — 29°C Roof Vent'}
            {activeStudyField === 'age' && 'AIR AGE: Fresh Air Inlet (Green) — Stagnant Pockets (Red)'}
          </span>
        </div>

        {/* 3D Wireframe SVG Space Container */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none" id="wireframe-3d-svg">
          {/* DEFINITIONS OF MESH PATTERNS & VELOCITY/THERMAL COLOR GRADIENTS */}
          <defs>
            {/* Grid Pattern for the floors */}
            <pattern id="floor-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0057D9" strokeWidth="0.5" strokeOpacity="0.12" />
            </pattern>

            {/* Velocity spectrum gradient overlay */}
            <linearGradient id="velocityGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0057D9" stopOpacity="0.85" />    {/* Cobalt Blue at base */}
              <stop offset="45%" stopColor="#00D2C4" stopOpacity="0.9" />    {/* Aquamarine in middle */}
              <stop offset="80%" stopColor="#34D399" stopOpacity="0.95" />   {/* Fresh Emerald in upper shaft */}
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.95" />   {/* High Speed crimson exit */}
            </linearGradient>

            {/* Thermal convective buoyancy plume gradient */}
            <linearGradient id="thermalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />     {/* Cool Blue displacement inlet */}
              <stop offset="35%" stopColor="#10B981" stopOpacity="0.7" />     {/* Ambient Green mid atrium */}
              <stop offset="65%" stopColor="#F59E0B" stopOpacity="0.85" />    {/* Warm solar storage stack */}
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.95" />   {/* Convective Heat core chimney */}
            </linearGradient>

            {/* Air age stagnant gradient */}
            <linearGradient id="ageGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.85" />    {/* Fresh green lower zone */}
              <stop offset="50%" stopColor="#EAB308" stopOpacity="0.8" />     {/* Mid-age yellow column */}
              <stop offset="85%" stopColor="#F97316" stopOpacity="0.85" />    {/* Stale orange ceiling accumulation */}
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.95" />   {/* Stagnant critical red exhaust */}
            </linearGradient>
          </defs>

          {/* SECTION 1: MAIN STRUCTURAL GRID COLUMNS AND BEAMS (BACKGROUND ELEMENTS) */}
          <g id="wireframe-background-columns" className="stroke-white/10" strokeWidth="1">
            {/* Back vertical pillar */}
            <line x1="190" y1="200" x2="190" y2="50" strokeDasharray="2 2" />
            {/* Left structural wall lines */}
            <line x1="50" y1="240" x2="190" y2="200" strokeDasharray="3 3" />
            <line x1="50" y1="165" x2="190" y2="125" strokeDasharray="3 3" />
            <line x1="50" y1="90" x2="190" y2="50" strokeDasharray="3 3" />
            {/* Right structural wall lines */}
            <line x1="190" y1="200" x2="350" y2="240" strokeDasharray="3 3" />
            <line x1="190" y1="125" x2="350" y2="165" strokeDasharray="3 3" />
            <line x1="190" y1="50" x2="350" y2="90" strokeDasharray="3 3" />
          </g>

          {/* SECTION 2: GROUND FLOOR PLAN (FLOOR 1) */}
          <g id="ground-floor-slab">
            {/* Outer plate shape */}
            <path d="M 50 240 L 190 200 L 350 240 L 190 280 Z" fill="rgba(15, 23, 42, 0.55)" stroke="#0057D9" strokeWidth="1" strokeOpacity="0.5" />
            {/* Isometric tile lattice surface overlay */}
            <path d="M 50 240 L 190 200 L 350 240 L 190 280 Z" fill="url(#floor-grid)" />
            {/* Floor indicator */}
            <text x="65" y="270" fill="white" className="text-[7px] font-mono opacity-40">LEVEL 1 (GROUND SLAB)</text>
          </g>

          {/* SECTION 3: MID LEVEL FLOOR PLAN WITH CENTER ATRIUM VOID (FLOOR 2) */}
          <g id="level-2-slab">
            {/* Level 2 outer plate */}
            <path d="M 50 165 L 190 125 L 350 165 L 190 205 Z" fill="rgba(15, 23, 42, 0.45)" stroke="#0057D9" strokeWidth="1" strokeOpacity="0.4" />
            {/* Tile grid */}
            <path d="M 50 165 L 190 125 L 350 165 L 190 205 Z" fill="url(#floor-grid)" />
            
            {/* Center circular openings defining the vertical Atrium (Holes in the floor deck) */}
            <ellipse cx="190" cy="165" rx="35" ry="12" fill="#020617" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.75" />
            
            <text x="65" y="195" fill="white" className="text-[7px] font-mono opacity-45">LEVEL 2 (MEZZANINE DECK)</text>
          </g>

          {/* SECTION 4: ROOF FLOOR PLAN WITH ATRIUM OPENING/VENT (FLOOR 3) */}
          <g id="level-3-slab">
            {/* Level 3 outer plate */}
            <path d="M 50 90 L 190 50 L 350 90 L 190 130 Z" fill="rgba(15, 23, 42, 0.35)" stroke="#0057D9" strokeWidth="1" strokeOpacity="0.3" />
            {/* Tile grid */}
            <path d="M 50 90 L 190 50 L 350 90 L 190 130 Z" fill="url(#floor-grid)" />
            
            {/* Roof circular extraction fan hole */}
            <ellipse cx="190" cy="90" rx="35" ry="12" fill="#020617" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.75" />
            
            {/* Exhaust fan blade outline symbols */}
            <ellipse cx="190" cy="90" rx="20" ry="7" fill="none" stroke="#FF7A00" strokeWidth="0.8" strokeDasharray="3 3" className="animate-spin origin-center" style={{ transformOrigin: '190px 90px' }} />
            
            <text x="65" y="120" fill="white" className="text-[7px] font-mono opacity-45">LEVEL 3 (HEAT EXHAUST PLENUM)</text>
          </g>

          {/* SECTION 5: FOREGROUND VERTICAL STRUCTURAL POSTS (COLUMNS) FOR 3D PERSPECTIVE */}
          <g id="wireframe-foreground-columns" stroke="#0057D9" strokeWidth="1.2" className="opacity-45">
            {/* Left structural Column */}
            <line x1="50" y1="240" x2="50" y2="90" />
            {/* Right structural Column */}
            <line x1="350" y1="240" x2="350" y2="90" />
            {/* Front structural Column */}
            <line x1="190" y1="280" x2="190" y2="130" strokeDasharray="4 2" />
          </g>

          {/* SECTION 6: HIGH-FIDELITY ANIMATED CONVECTIVE STREAMLINES RISERS */}
          {/* We select the source gradient depending on the user's active tab selection */}
          <g id="animated-convective-plumes">
            {/* Streamline 1 (Core high flow vortex rising up vertically through atriums) */}
            <path
              d="M 190 260 C 145 250, 135 200, 190 165 C 245 130, 235 95, 190 90 C 145 85, 155 45, 190 25"
              stroke={`url(#${activeStudyField === 'velocity' ? 'velocityGrad' : activeStudyField === 'thermal' ? 'thermalGrad' : 'ageGrad'})`}
              strokeWidth="2.8"
              fill="none"
              className={`${flowSpeedClass} opacity-95`}
            />

            {/* Streamline 2 (Right-side auxiliary draft pulling convective load upwards) */}
            <path
              d="M 220 255 C 170 245, 165 200, 205 165 C 245 130, 220 95, 190 90 C 160 85, 170 45, 175 25"
              stroke={`url(#${activeStudyField === 'velocity' ? 'velocityGrad' : activeStudyField === 'thermal' ? 'thermalGrad' : 'ageGrad'})`}
              strokeWidth="2"
              fill="none"
              className={`${flowSpeedClass} opacity-85`}
            />

            {/* Streamline 3 (Left-side fresh air displacement sweep circling lower and mid atrium) */}
            <path
              d="M 155 242 C 215 235, 220 185, 175 165 C 130 145, 145 105, 185 90 C 225 75, 205 40, 195 25"
              stroke={`url(#${activeStudyField === 'velocity' ? 'velocityGrad' : activeStudyField === 'thermal' ? 'thermalGrad' : 'ageGrad'})`}
              strokeWidth="2.2"
              fill="none"
              className={`${flowSpeedClass} opacity-85`}
            />

            {/* Streamline 4 (Slightly lazy perimeter flow looping wide but venting through top) */}
            <path
              d="M 190 270 C 250 250, 250 200, 190 165 C 130 130, 130 90, 191 90 C 250 90, 240 50, 205 25"
              stroke={`url(#${activeStudyField === 'velocity' ? 'velocityGrad' : activeStudyField === 'thermal' ? 'thermalGrad' : 'ageGrad'})`}
              strokeWidth="1.8"
              fill="none"
              className={`${flowSpeedClass} opacity-80`}
            />

            {/* Streamline 5 (Stagnant horizontal ventilation loop trapped inside bottom story partition) */}
            <path
              d="M 115 255 C 80 250, 75 220, 110 215 C 145 210, 150 235, 120 240"
              stroke={activeStudyField === 'age' ? '#EF4444' : activeStudyField === 'thermal' ? '#EF4444' : '#FF7A00'}
              strokeWidth="1.2"
              fill="none"
              className="airflow-line-slow opacity-60"
            />
          </g>

          {/* SECTION 7: INTERACTIVE HIGHLIGHT PIN-NODES FOR 3D SENSORS */}
          <g id="3d-sensors-hotspots">
            {hotspots.map((h) => {
              const hoverState = hoveredHotspot?.id === h.id;
              const isDeadZone = h.id === 'mezzanine_dead';
              return (
                <g
                  key={h.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredHotspot(h)}
                  onMouseLeave={() => setHoveredHotspot(null)}
                >
                  {/* Glowing sensor pulsing ring */}
                  <circle
                    cx={h.cx}
                    cy={h.cy}
                    r={hoverState ? 12 : 6}
                    fill="none"
                    stroke={isDeadZone ? '#EF4444' : '#00D2C4'}
                    strokeWidth="1"
                    className="animate-ping opacity-70 transition-all duration-300"
                  />
                  {/* Central solid vector dot */}
                  <circle
                    cx={h.cx}
                    cy={h.cy}
                    r="4.5"
                    fill={isDeadZone ? '#EF4444' : '#0057D9'}
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                  />
                  {/* Tiny text ID anchor label next to sensors */}
                  <text x={h.cx + 8} y={h.cy + 3} fill="white" className="text-[6.5px] font-mono tracking-widest opacity-60 bg-slate-900 text-shadow">
                    {h.id === 'ground_inlet' && 'SENS_A01'}
                    {h.id === 'atrium_core' && 'SENS_B02'}
                    {h.id === 'mezzanine_dead' && 'SENS_C03'}
                    {h.id === 'roof_exhaust' && 'SENS_D04'}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Dynamic Float-over 3D Tooltip with detailed room inspection coordinates */}
        {hoveredHotspot && (
          <div className="absolute top-2 right-2 left-2 sm:left-auto sm:w-64 bg-navy/95 border border-white/20 p-3 rounded shadow-xl text-[10px] sm:text-xs z-30 transition-all">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1.5">
              <span className="font-sans font-bold text-white flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cobalt flex-shrink-0" />
                <span>{hoveredHotspot.name}</span>
              </span>
              <span className="text-[8px] font-mono text-white/50">{hoveredHotspot.coord}</span>
            </div>
            <p className="text-white/70 text-[9px] leading-tight mb-2 min-h-[24px]">
              {hoveredHotspot.description}
            </p>
            
            <div className="grid grid-cols-4 gap-1 pt-1.5 border-t border-white/10 font-mono text-[9px]">
              <div>
                <span className="block text-white/40">Vel:</span>
                <span className="font-bold text-cobalt">{hoveredHotspot.velocity}</span>
              </div>
              <div>
                <span className="block text-white/40">Temp:</span>
                <span className="font-bold text-amber-400">{hoveredHotspot.temp}</span>
              </div>
              <div>
                <span className="block text-white/40">CO2:</span>
                <span className="font-bold text-red-400">{hoveredHotspot.co2}</span>
              </div>
              <div>
                <span className="block text-white/40">Age:</span>
                <span className="font-bold text-emerald-400">{hoveredHotspot.airAge}</span>
              </div>
            </div>
          </div>
        )}

        {/* Hover reminder instruction */}
        {!hoveredHotspot && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-navy/85 border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono text-white/60">
            <Info className="w-3 h-3 text-cobalt" />
            <span>Hover 3D mesh node sensors to overlay variables</span>
          </div>
        )}
      </div>

      {/* DUAL SLIDER CONTROLLER CONTAINER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4 bg-white/5 border border-white/10 p-3.5 rounded z-10 text-[10px] sm:text-xs">
        {/* SLIDER A: Fresh CFM supply */}
        <div>
          <div className="flex justify-between items-center text-white/90 mb-1">
            <span className="font-sans font-semibold flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-cobalt" />
              <span>Disp. Airflow Supply</span>
            </span>
            <span className="font-mono font-bold text-cobalt bg-white/10 px-1.5 py-0.5 rounded text-[9px]">
              {cfmLevel} CFM
            </span>
          </div>
          <input
            id="hero-cfm-slider-3d"
            type="range"
            min="150"
            max="800"
            step="50"
            value={cfmLevel}
            onChange={(e) => setCfmLevel(parseInt(e.target.value))}
            className="w-full accent-cobalt h-1 bg-white/10 rounded cursor-ew-resize focus:outline-none"
          />
        </div>

        {/* SLIDER B: Solar Heat Load coefficient */}
        <div>
          <div className="flex justify-between items-center text-white/90 mb-1">
            <span className="font-sans font-semibold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>Solar heat gain load</span>
            </span>
            <span className="font-mono font-bold text-[#FF7A00] bg-white/10 px-1.5 py-0.5 rounded text-[9px]">
              {solarHeat.toFixed(1)} kW
            </span>
          </div>
          <input
            id="hero-heat-slider-3d"
            type="range"
            min="1.0"
            max="12.0"
            step="0.5"
            value={solarHeat}
            onChange={(e) => setSolarHeat(parseFloat(e.target.value))}
            className="w-full accent-[#FF7A00] h-1 bg-white/10 rounded cursor-ew-resize focus:outline-none"
          />
        </div>
      </div>

      {/* Calculated Real-time Atrium CFD Telemetry Metrics */}
      <div className="grid grid-cols-2 gap-2 relative z-10 text-[10px] sm:text-xs">
        <div className="bg-white/5 border border-white/10 p-2.5 rounded">
          <span className="block text-[8px] font-mono text-white/50 uppercase">STACK BUOYANCY SPEED</span>
          <span className="block font-display font-extrabold text-[#00D2C4] text-xs sm:text-sm mt-0.5">
            {calculatedMetrics.draft} m/s
          </span>
          <span className="block text-[7px] font-mono text-white/30 truncate">Convective velocity vector</span>
        </div>

        <div className="bg-white/5 border border-white/10 p-2.5 rounded">
          <span className="block text-[8px] font-mono text-white/50 uppercase">MEAN ATRIUM CO2</span>
          <span className="block font-display font-extrabold text-[#60A5FA] text-xs sm:text-sm mt-0.5">
            {calculatedMetrics.co2} PPM
          </span>
          <span className="block text-[7px] font-mono text-white/30 truncate">Steady state flushing index</span>
        </div>

        <div className="bg-white/5 border border-white/10 p-2.5 rounded">
          <span className="block text-[8px] font-mono text-white/50 uppercase">THERMAL STRATIFICATION</span>
          <span className="block font-display font-extrabold text-amber-400 text-xs sm:text-sm mt-0.5">
            {calculatedMetrics.strat} °C
          </span>
          <span className="block text-[7px] font-mono text-white/30 truncate">ΔT (Floor 3 vs Floor 1)</span>
        </div>

        <div className="bg-white/5 border border-white/10 p-2.5 rounded">
          <span className="block text-[8px] font-mono text-white/50 uppercase">HEAT EXTRACTION EFFICIENCY</span>
          <span className="block font-display font-extrabold text-red-400 text-xs sm:text-sm mt-0.5">
            {calculatedMetrics.efficiency}%
          </span>
          <span className="block text-[7px] font-mono text-white/30 truncate">Buoyant displacement factor</span>
        </div>
      </div>

      {/* Footer Branding line */}
      <div className="mt-3.5 pt-2 border-t border-white/10 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-white/50 relative z-10">
        <span className="flex items-center gap-1 text-cobalt">
          <Zap className="w-3 h-3 text-cobalt fill-cobalt" />
          KATHMANDU FLUENT SOLVER™ v3.8
        </span>
        <span>INTEGRATED SYSTEM MIGRATION</span>
      </div>
    </div>
  );
}
