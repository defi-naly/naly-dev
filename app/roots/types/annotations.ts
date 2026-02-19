export interface MachineAnnotation {
  id: string;
  label: string;
  value?: string;
  position: [number, number]; // [x%, y%]
  progressMin: number;
  progressMax: number;
  color?: string; // per-annotation color override
}
