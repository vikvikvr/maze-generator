/**
 * Utility function to select a random element from an array.
 *
 * @param array the array of elements
 */
export function pickRandomElementFromArray<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
}
