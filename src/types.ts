export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  iconName: string;
  accent: string;
}

export interface Metric {
  label: string;
  value: string;
  sub: string;
}

export interface CaseStudyData {
  title: string;
  subtitle: string;
  projectType: string;
  location: string;
  metrics: Metric[];
  description: string;
  challenge: string;
  solution: string;
}

export interface AuditSelection {
  firmSize: 'small' | 'medium' | 'large';
  projectsPerYear: number;
  avgPreparationDays: number;
  mainSoftware: string;
  bottleneck: string;
}

export interface SimulationModel {
  id: string;
  name: string;
  inletVelocity: number; // m/s
  ductWidth: number; // mm
  temperature: number; // Celsius
  hasObstacle: boolean;
}
