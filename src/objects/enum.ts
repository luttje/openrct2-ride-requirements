/**
 * Converts an enumeration to a string by getting the key
 * for a given value.
 */
export function enumKeyFromValue(enumeration: any, value: any): string {
  var allEnumerations = Object.keys(enumeration);
  var allEnumerationValues = allEnumerations.map(function (key: any) {
    return enumeration[key];
  }) as unknown as (typeof enumeration)[];

  return allEnumerations[allEnumerationValues.indexOf(value)];
}