/**
 * All rides in the park
 */
export function getAllRides(): Ride[] {
  return map
    .rides
    .filter(r => r.classification === 'ride')
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Converts a RatingsModifier enumeration to a string
 * using the key in RatingsModifier.
 */
export function ratingsModifierToString(modifier: RatingsModifierType): string {
  var allEnumerations = Object.keys(RatingsModifierType);
  var allEnumerationValues = allEnumerations.map(function (key: any) {
    return RatingsModifierType[key];
  }) as unknown as RatingsModifierType[];

  return allEnumerations[allEnumerationValues.indexOf(modifier)];
}