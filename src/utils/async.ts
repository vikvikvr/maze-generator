/**
 * Utility function to await a given amount of time.
 * @param ms milliseconds to wait
 *
 * @example
 *
 * await sleep(1000) // waits for 1 second
 */
 export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}