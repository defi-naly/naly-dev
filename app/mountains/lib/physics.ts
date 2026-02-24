// Adiabatic lapse rates
export const DRY_ADIABATIC_RATE = 3.0; // °C per 1000ft
export const MOIST_ADIABATIC_RATE = 1.5; // °C per 1000ft (approximate average)
export const STANDARD_LAPSE_RATE = 2.0; // °C per 1000ft (ISA standard)

// Temperature at altitude given surface temp and lapse rate
export function tempAtAltitude(surfaceTemp: number, altitudeFt: number, lapseRate: number): number {
  return surfaceTemp - (altitudeFt / 1000) * lapseRate;
}

// Lifted Condensation Level (approximate)
export function lclAltitude(surfaceTemp: number, dewPoint: number): number {
  // Espy's formula: LCL height (ft) ≈ 222 * (T - Td)
  return 222 * (surfaceTemp - dewPoint);
}

// Determine stability
export type StabilityType = 'absolutely-stable' | 'conditionally-unstable' | 'absolutely-unstable';

export function getStability(environmentalLapseRate: number): StabilityType {
  if (environmentalLapseRate < MOIST_ADIABATIC_RATE) return 'absolutely-stable';
  if (environmentalLapseRate > DRY_ADIABATIC_RATE) return 'absolutely-unstable';
  return 'conditionally-unstable';
}

// Glide ratio calculation
export function glideRatio(altitude: number, distance: number): number {
  if (altitude <= 0) return 0;
  return distance / altitude;
}

// Speed to fly (simplified McCready)
export function speedToFly(
  polarSinkAtTrim: number, // m/s sink at best L/D
  trimSpeed: number, // km/h
  expectedClimbRate: number, // m/s
  headwind: number // km/h
): number {
  // Simplified: optimal speed increases with expected climb and headwind
  const speedIncrease = Math.sqrt(expectedClimbRate / Math.abs(polarSinkAtTrim)) * 10;
  return trimSpeed + speedIncrease + headwind * 0.5;
}

// Wind chill (for avalanche context)
export function windChill(tempC: number, windSpeedKmh: number): number {
  if (windSpeedKmh < 4.8 || tempC > 10) return tempC;
  return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windSpeedKmh, 0.16) + 0.3965 * tempC * Math.pow(windSpeedKmh, 0.16);
}

// Avalanche survival probability (exponential decay)
export function survivalProbability(minutesBuried: number): number {
  if (minutesBuried <= 0) return 92;
  if (minutesBuried <= 18) return 92 - (minutesBuried / 18) * 60;
  if (minutesBuried <= 35) return 32 - ((minutesBuried - 18) / 17) * 5;
  return Math.max(27 - ((minutesBuried - 35) / 90) * 20, 7);
}
