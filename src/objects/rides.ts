/**
 * All rides in the park
 */
export function getAllRides(): Ride[] {
  return map
    .rides
    .filter(r => r.classification === 'ride')
    .sort((a, b) => a.name.localeCompare(b.name));
}
