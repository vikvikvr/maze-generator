/**
 * Utility function to select a random element from an array.
 *
 * @param array the array of elements
 *
 * @example
 * pickRandomElementFromArray([1,2,3,4]) // 3
 * pickRandomElementFromArray([1,2,3,4]) // 1
 */
 export function pickRandomElementFromArray<T>(array: T[]) {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
}
