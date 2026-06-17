import React, { useState, useMemo } from 'react';
import { Play, RotateCcw, AlertCircle, HelpCircle, Shield, Cpu, Gauge, Thermometer, Maximize2 } from 'lucide-react';
import { SimulationModel } from '../types';

export default function FlowSimulator() {
  const [model, setModel] = useState<SimulationModel>({
    id: 'sim-default',
    name: 'Standard HVAC Duct simulation',
    inletVelocity: 2.5, // m/s
    ductWidth: 600, // mm
    temperature: 24, // °C
    hasObstacle: true,
  });

  const [activeTelemetry, setActiveTelemetry] = useState<string>('velocity'); // velocity | pressure | temp
  const [simulationRunning, setSimulationRunning] = useState<boolean>(true);

  // Constants
  const airDensity = 1.204; // kg/m³ at 20°C
  const airViscosity = 1.81e-5; // Pa·s (dynamic viscosity)

  // Calculated Physics Metrics
  const reynoldsNumber = useMemo(() => {
    // Re = (density * velocity * hydraulic_diameter) / viscosity
    // Let hydraulic diameter = ductWidth / 1000
    const diameter = model.ductWidth / 1000;
    const re = (airDensity * model.inletVelocity * diameter) / airViscosity;
    return Math.round(re);
  }, [model.inletVelocity, model.ductWidth]);

  const pressureDrop = useMemo(() => {
    // Simplified Darcy-Weisbach or minor loss formula: Delta P = K_l * 0.5 * density * velocity^2
    // Baffle obstacle adds significant minor loss K_l
    const kl = model.hasObstacle ? 2.4 : 0.45;
    const dp = kl * 0.5 * airDensity * Math.pow(model.inletVelocity, 2);
    // Add friction factor proportional to temperature and duct length
    return parseFloat(dp.toFixed(2));
  }, [model.inletVelocity, model.hasObstacle]);

  const flowUniformity = useMemo(() => {
    // Scale 0.0 to 1.0 representing how distributed the airflow is
    // Obstacle disrupts airflow and drops uniformity. Faster speeds also lower it.
    let ui = 0.96;
    if (model.hasObstacle) ui -= 0.18;
    ui -= (model.inletVelocity - 1) * 0.015;
    return parseFloat(Math.max(0.45, Math.min(0.98, ui)).toFixed(2));
  }, [model.inletVelocity, model.hasObstacle]);

  // Generate Streamline paths based on duct dimensions & obstacle state
  const streamlines = useMemo(() => {
    const linesCount = 8;
    const paths: string[] = [];
    const height = 180; // canvas height representation
    const width = 500; // canvas width representation
    const obstacleX = width / 2;
    const obstacleY = height / 2;
    const obstacleR = 26; // collision limit

    for (let i = 0; i < linesCount; i++) {
      // Inflow Y coordinate starting linearly
      const startY = (height / (linesCount + 1)) * (i + 1);

      if (!model.hasObstacle) {
        // Straight airflow streamlines when no obstacle
        paths.push(`M 15 ${startY} L ${width - 15} ${startY}`);
      } else {
        // Airflow curves around the center-placed circular/rectangular baffle
        const distFromCenter = Math.abs(startY - obstacleY);
        
        let pathStr = `M 15 ${startY}`;
        
        if (distFromCenter < 5) {
          // Lines directly on the center get split smoothly up or down
          const up = i % 2 === 0;
          const shiftY = up ? -34 : 34;
          pathStr += ` C ${obstacleX - 100} ${startY}, ${obstacleX - 60} ${obstacleY + shiftY}, ${obstacleX} ${obstacleY + shiftY}`;
          pathStr += ` C ${obstacleX + 60} ${obstacleY + shiftY}, ${obstacleX + 100} ${startY}, ${width - 15} ${startY}`;
        } else if (distFromCenter < 25) {
          // Nearby lines bend outward
          const side = startY < obstacleY ? -1 : 1;
          const bendY = obstacleY + (side * (obstacleR + 15));
          pathStr += ` Q ${obstacleX - 60} ${startY}, ${obstacleX} ${bendY}`;
          pathStr += ` Q ${obstacleX + 60} ${startY}, ${width - 15} ${startY}`;
        } else {
          // Far away lines bend slightly
          const side = startY < obstacleY ? -1 : 1;
          const bendY = startY + (side * 8);
          pathStr += ` Q ${obstacleX} ${bendY}, ${width - 15} ${startY}`;
        }
        paths.push(pathStr);
      }
    }
    return paths;
  }, [model.hasObstacle]);

  // Calculate dynamic contour colors representing velocity vector spaces or temperature boundary layers
  const contourColorsLeftToRight = useMemo(() => {
    // Generate simple gradient markers or control arrays based on states
    if (activeTelemetry === 'velocity') {
      const v = model.inletVelocity;
      if (model.hasObstacle) {
        return {
          bg: 'linear-gradient(90deg, #10233F 0%, #0057D9 30%, #FF7A00 48%, #10233F 53%, #0057D9 80%)',
          stops: [
            { label: 'Inlet (Max Flow)', color: 'bg-cobalt', val: `${v} m/s` },
            { label: 'Obstacle Drag Area', color: 'bg-amber-500', val: `${v*0.2} m/s` },
            { label: 'Recirculation Wake', color: 'bg-navy', val: `${v*0.1} m/s` },
            { label: 'Jet Stream Bystanders', color: 'bg-cobalt', val: `${v*1.3} m/s` }
          ]
        };
      } else {
        return {
          bg: 'linear-gradient(90deg, #0057D9 0%, #1E40AF 100%)',
          stops: [
            { label: 'Inlet Stable', color: 'bg-cobalt', val: `${v} m/s` },
            { label: 'Friction Edge', color: 'bg-blue-900', val: `${v*0.8} m/s` },
            { label: 'Core Velocity', color: 'bg-blue-600', val: `${v} m/s` }
          ]
        };
      }
    } else if (activeTelemetry === 'pressure') {
      const dp = pressureDrop;
      if (model.hasObstacle) {
        return {
          bg: 'linear-gradient(90deg, #10233F 0%, #FF7A00 45%, #EF4444 49%, #0057D9 55%, #10233F 100%)',
          stops: [
            { label: 'Inlet pressure', color: 'bg-navy', val: `${(dp * 0.8).toFixed(1)} Pa` },
            { label: 'Baffle Shock High', color: 'bg-orange-accent', val: `${(dp * 1.5).toFixed(1)} Pa` },
            { label: 'Wake Negative zone', color: 'bg-blue-600', val: `-${(dp * 0.4).toFixed(1)} Pa` }
          ]
        };
      } else {
        return {
          bg: 'linear-gradient(90deg, #10233F 0%, #475569 50%, #0057D9 100%)',
          stops: [
            { label: 'Inlet head', color: 'bg-navy', val: `${(dp * 1.0).toFixed(1)} Pa` },
            { label: 'Duct Friction loss', color: 'bg-slate-500', val: `${(dp * 0.5).toFixed(1)} Pa` },
            { label: 'Free exit pressure', color: 'bg-cobalt', val: '0.0 Pa' }
          ]
        };
      }
    } else {
      // Temperature Distribution
      const temp = model.temperature;
      return {
        bg: `linear-gradient(90deg, #0057D9 0%, #3B82F6 40%, ${model.hasObstacle ? '#F59E0B' : '#60A5FA'} 60%, #3B82F6 100%)`,
        stops: [
          { label: 'Duct Core Inlet', color: 'bg-blue-600', val: `${temp}°C` },
          { label: 'Thermodynamic Wall boundary', color: 'bg-indigo-600', val: `${(temp - 1.5).toFixed(1)}°C` },
          { label: 'Baffle localized stagnation', color: 'bg-amber-600', val: `${(temp + 2.1).toFixed(1)}°C` }
        ]
      };
    }
  }, [activeTelemetry, model, pressureDrop]);

  return (
    <div id="interactive-cfd-simulator" className="bg-white border-2 border-navy rounded-lg shadow-tech overflow-hidden">
      {/* Simulation Header Console */}
      <div className="bg-navy text-white px-5 py-4 border-b border-navy/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <div>
            <h4 className="font-display font-bold text-base tracking-wide uppercase">FlowDiv WebCFD™ Core</h4>
            <p className="text-xs font-mono text-offwhite/60">SIM_STATUS: RUNNING | REAL-TIME SOLVER V1.04</p>
          </div>
        </div>
        
        {/* Play/Pause controls */}
        <div className="flex items-center gap-2">
          <button
            id="sim-toggle-run"
            onClick={() => setSimulationRunning(!simulationRunning)}
            className={`px-3 py-1.5 rounded text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
              simulationRunning ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20' : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${simulationRunning ? 'hidden' : 'block'}`} />
            <span>{simulationRunning ? 'Stop Simulation' : 'Resume Flow'}</span>
          </button>
          
          <button
            id="sim-reset-parameters"
            onClick={() => {
              setModel({
                id: 'sim-default',
                name: 'Standard HVAC Duct simulation',
                inletVelocity: 2.5,
                ductWidth: 600,
                temperature: 24,
                hasObstacle: true,
              });
              setSimulationRunning(true);
            }}
            className="p-1.5 text-offwhite/70 hover:text-white bg-white/10 hover:bg-white/20 rounded transition-all"
            title="Reset Simulation Constants"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: left inputs, right viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: Controller Inputs */}
        <div className="lg:col-span-5 p-6 border-r border-gridgray flex flex-col justify-between bg-offwhite/50">
          <div className="space-y-6">
            <div className="border-b border-gridgray/60 pb-3">
              <span className="text-xs font-mono font-bold text-cobalt tracking-wider uppercase">CONSTRAINTS CONFIGURATION</span>
              <h5 className="font-display font-medium text-navy text-sm mt-0.5">Control simulation field parameters</h5>
            </div>

            {/* Slider 1: Fluid Velocity */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="sim-input-velocity" className="font-sans font-semibold text-navy flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-cobalt" />
                  <span>Inlet Flow Velocity (v_in)</span>
                </label>
                <span className="font-mono font-bold text-cobalt bg-cobalt/10 px-2 py-0.5 rounded">
                  {model.inletVelocity} m/s
                </span>
              </div>
              <input
                id="sim-input-velocity"
                type="range"
                min="0.5"
                max="8.0"
                step="0.5"
                value={model.inletVelocity}
                onChange={(e) => setModel({ ...model, inletVelocity: parseFloat(e.target.value) })}
                className="w-full accent-cobalt h-1.5 bg-gridgray rounded-lg appearance-none cursor-ew-resize"
              />
              <div className="flex justify-between text-[10px] font-mono text-steel">
                <span>0.5 m/s (Laminar Comfort)</span>
                <span>8.0 m/s (High Velocity Jet)</span>
              </div>
            </div>

            {/* Slider 2: Duct Hydraulic Width */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="sim-input-width" className="font-sans font-semibold text-navy flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-cobalt" />
                  <span>Duct Section Width (D)</span>
                </label>
                <span className="font-mono font-bold text-cobalt bg-cobalt/10 px-2 py-0.5 rounded">
                  {model.ductWidth} mm
                </span>
              </div>
              <input
                id="sim-input-width"
                type="range"
                min="200"
                max="1200"
                step="50"
                value={model.ductWidth}
                onChange={(e) => setModel({ ...model, ductWidth: parseInt(e.target.value) })}
                className="w-full accent-cobalt h-1.5 bg-gridgray rounded-lg appearance-none cursor-ew-resize"
              />
              <div className="flex justify-between text-[10px] font-mono text-steel">
                <span>200 mm (Residential Baffle)</span>
                <span>1200 mm (Industrial Plenum)</span>
              </div>
            </div>

            {/* Slider 3: Design Air Temperature */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="sim-input-temp" className="font-sans font-semibold text-navy flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-cobalt" />
                  <span>Inflow HVAC Temperature (T)</span>
                </label>
                <span className="font-mono font-bold text-cobalt bg-cobalt/10 px-2 py-0.5 rounded">
                  {model.temperature} °C
                </span>
              </div>
              <input
                id="sim-input-temp"
                type="range"
                min="10"
                max="50"
                step="1"
                value={model.temperature}
                onChange={(e) => setModel({ ...model, temperature: parseInt(e.target.value) })}
                className="w-full accent-cobalt h-1.5 bg-gridgray rounded-lg appearance-none cursor-ew-resize"
              />
              <div className="flex justify-between text-[10px] font-mono text-steel">
                <span>10 °C (Chilled Air)</span>
                <span>50 °C (Heavy Heat Load)</span>
              </div>
            </div>

            {/* Binary Switch: Obstacle Inflow Obstruction */}
            <div className="bg-white border border-gridgray p-4 rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-sans font-semibold text-xs text-navy block">Insert Flow Obstacle (MEP Damper)</span>
                  <p className="text-[11px] text-steel">Simulates duct structural features, branch coils, or structural columns.</p>
                </div>
                <button
                  id="sim-toggle-obstacle"
                  type="button"
                  onClick={() => setModel({ ...model, hasObstacle: !model.hasObstacle })}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${
                    model.hasObstacle ? 'bg-orange-accent' : 'bg-slate-300'
                  }`}
                  aria-label="Toggle obstacle presence"
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                    model.hasObstacle ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gridgray/60 pt-4 text-xs text-steel/80 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-cobalt flex-shrink-0 mt-0.5" />
            <p>
              In FlowDiv's automated professional tooling, these spatial boundaries are extracted instantly from native Autodesk Revit or AutoCAD files to initiate cloud cluster solvers.
            </p>
          </div>
        </div>

        {/* Right Side: Render Canvas & Telemetry Diagnostics */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-white pl-6">
          
          {/* Visual Canvas Panel */}
          <div>
            <div className="flex items-center justify-between border-b border-gridgray/60 pb-3 mb-4">
              <div className="flex gap-2">
                {(['velocity', 'pressure', 'temp'] as const).map((mode) => (
                  <button
                    key={mode}
                    id={`telemetry-tab-${mode}`}
                    onClick={() => setActiveTelemetry(mode)}
                    className={`px-3 py-1 text-xs font-mono font-medium rounded transition-all capitalize border ${
                      activeTelemetry === mode
                        ? 'bg-navy text-white border-navy'
                        : 'bg-offwhite text-steel border-gridgray/60 hover:bg-gridgray/20'
                    }`}
                  >
                    {mode} Field
                  </button>
                ))}
              </div>
              <span className="text-[11px] font-mono font-bold text-steel bg-gridgray/30 px-2 py-1 rounded">
                FIELD RESOLUTION: 0.12mm/grid
              </span>
            </div>

            {/* Simulated Canvas viewport */}
            <div className="relative border border-navy/20 rounded-lg overflow-hidden h-[240px] bg-slate-900 shadow-inner flex items-center justify-center">
              {/* Grid system representing layout meshes */}
              <div className="absolute inset-0 blueprint-grid-dark opacity-40"></div>
              <div className="absolute inset-0 blueprint-grid-fine-dark opacity-20"></div>

              {/* Dynamic Gradient Background portraying Contour Values */}
              <div
                className="absolute inset-0 opacity-40 transition-all duration-700"
                style={{ background: contourColorsLeftToRight.bg }}
              ></div>

              {/* Vector Field lines - dynamic calculated SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 180" preserveAspectRatio="none">
                {streamlines.map((path, idx) => (
                  <path
                    key={idx}
                    d={path}
                    fill="none"
                    stroke={activeTelemetry === 'pressure' && model.hasObstacle && idx % 3 === 0 ? '#EF4444' : '#60A5FA'}
                    strokeWidth={model.inletVelocity > 5 ? '2.2' : '1.5'}
                    className={`opacity-75 ${
                      !simulationRunning
                        ? ''
                        : model.inletVelocity > 5
                        ? 'airflow-line-fast'
                        : model.inletVelocity < 2
                        ? 'airflow-line-slow'
                        : 'airflow-line'
                    }`}
                  />
                ))}

                {/* Draw Obstacle if active */}
                {model.hasObstacle && (
                  <g className="transition-all duration-300">
                    {/* Heated boundary shadow */}
                    <rect x="235" y="60" width="30" height="60" rx="3" fill="#10233F" className="opacity-95 stroke-2 stroke-cobalt" />
                    {/* Damper blade lines */}
                    <line x1="238" y1="75" x2="262" y2="75" stroke="#FF7A00" strokeWidth="2" className="opacity-80" />
                    <line x1="238" y1="90" x2="262" y2="90" stroke="#0057D9" strokeWidth="2" className="opacity-80" />
                    <line x1="238" y1="105" x2="262" y2="105" stroke="#FF7A00" strokeWidth="2" className="opacity-80" />
                    <text x="250" y="50" textAnchor="middle" fill="#FF7A00" className="text-[10px] font-mono font-bold">DAMPER</text>
                  </g>
                )}

                {/* Flow boundaries indicating wall friction drag */}
                <line x1="0" y1="2" x2="500" y2="2" stroke="#4A5563" strokeWidth="3" strokeDasharray="5 5" className="opacity-50" />
                <line x1="0" y1="178" x2="500" y2="178" stroke="#4A5563" strokeWidth="3" strokeDasharray="5 5" className="opacity-50" />
              </svg>

              {/* Dynamic Scale indicators */}
              <div className="absolute top-3 left-4 flex flex-col gap-1 z-10">
                <span className="text-[10px] font-mono text-white/50 uppercase leading-none">Inlet Profile</span>
                <span className="text-sm font-display font-medium text-cobalt flex items-center gap-1">
                  <Play className="w-3.5 h-3.5 fill-cobalt inline-block animate-pulse text-cobalt" />
                  <span>{model.inletVelocity} m/s</span>
                </span>
                <span className="text-[10px] font-mono text-amber-400">@ {model.temperature}°C</span>
              </div>

              {/* Flow Direction Overlay indicator */}
              <div className="absolute bottom-3 right-4 flex items-center gap-2 bg-navy/80 border border-gridgray/20 px-2.5 py-1 rounded text-[10px] font-mono text-white/90">
                <span>FLOW: INLET (L) → OUTLET (R)</span>
              </div>
            </div>

            {/* Colored contour map legend */}
            <div className="mt-4 bg-offwhite/80 border border-gridgray p-3 rounded-md">
              <div className="text-xs font-mono text-navy font-bold mb-2 flex items-center gap-1.5 justify-between">
                <span>CONTOUR MAGNITUDE ({activeTelemetry.toUpperCase()})</span>
                <span className="text-[9px] text-steel font-normal">SIMULATION CALCULATION RESOLVED</span>
              </div>
              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                {contourColorsLeftToRight.stops.map((stop, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 flex-1 min-w-[120px] bg-white border border-gridgray/50 px-2 py-1 rounded text-[11px]">
                    <div className={`w-3.5 h-3.5 rounded-full ${stop.color} border border-navy/10 flex-shrink-0`}></div>
                    <div className="truncate">
                      <p className="font-medium text-navy text-[10px] leading-tight truncate">{stop.label}</p>
                      <p className="font-mono text-cobalt font-bold text-[10px]">{stop.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Analytics Diagnostics and Output */}
          <div className="mt-6 border-t border-gridgray pt-5 grid grid-cols-3 gap-4">
            
            <div className="bg-offwhite/40 border border-gridgray/60 p-3 rounded-lg text-center" id="stat-reynolds">
              <span className="block text-[10px] font-mono text-steel uppercase">Reynolds Num (Re)</span>
              <span className="block font-display font-bold text-navy text-lg sm:text-xl md:text-2xl mt-1 tracking-tight">
                {reynoldsNumber.toLocaleString()}
              </span>
              <span className={`inline-block text-[9px] font-mono uppercase px-1.5 py-0.5 rounded mt-1.5 ${
                reynoldsNumber > 4000 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {reynoldsNumber > 4000 ? 'TURBULENT' : 'LAMINAR'}
              </span>
            </div>

            <div className="bg-offwhite/40 border border-gridgray/60 p-3 rounded-lg text-center font-bold" id="stat-press-drop">
              <span className="block text-[10px] font-mono text-steel uppercase leading-none">Pressure Drop (ΔP)</span>
              <span className="block font-display font-bold text-navy text-lg sm:text-xl md:text-2xl mt-1 tracking-tight">
                {pressureDrop} <span className="text-xs font-normal text-steel">Pa</span>
              </span>
              <span className="block text-[9px] font-mono text-steel font-normal mt-2">
                {(pressureDrop * 10).toFixed(0)} N/m duct length
              </span>
            </div>

            <div className="bg-offwhite/40 border border-gridgray/60 p-3 rounded-lg text-center" id="stat-uniformity">
              <span className="block text-[10px] font-mono text-steel uppercase">Uniformity Index</span>
              <span className="block font-display font-bold text-navy text-lg sm:text-xl md:text-2xl mt-1 tracking-tight">
                {(flowUniformity * 100).toFixed(0)}%
              </span>
              <div className="w-full bg-gridgray h-1 rounded-full overflow-hidden mt-2.5">
                <div
                  className="bg-cobalt h-full transition-all duration-500"
                  style={{ width: `${flowUniformity * 100}%` }}
                ></div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
