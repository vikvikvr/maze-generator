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

type Options = {
  [className: string]: boolean;
};

/**
 * Utility function to dinamically apply class names.
 * @param options object containing a boolean for each class name
 *
 * @example
 *
 * const names = classNames({
 *  'foo': true,
 *  'bar': false,
 *  'baz': true
 * })
 *
 * console.log(names) // 'foo baz'
 */
export function classNames(options: Options): string {
  let allClasses = '';

  Object.entries(options).forEach(([className, shouldAdd]) => {
    if (shouldAdd) {
      allClasses += ' ' + className;
    }
  });

  return allClasses.trim();
}
