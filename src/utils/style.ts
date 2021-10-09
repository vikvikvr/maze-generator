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
export function classNames(options: { [className: string]: boolean }): string {
  let allClasses = '';

  Object.entries(options).forEach(([className, shouldAdd]) => {
    if (shouldAdd) {
      allClasses += ' ' + className;
    }
  });

  return allClasses.trim();
}
