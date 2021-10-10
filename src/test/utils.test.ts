import { classNames } from 'utils';

describe('classNames', () => {
  it('should add class names when condition is true', () => {
    const names = classNames({
      foo: true,
      bar: true,
    });

    expect(names).toBe('foo bar');
  });
  it('should not add class names when condition is false', () => {
    const names = classNames({
      foo: true,
      bar: false,
      baz: true,
    });

    expect(names).toBe('foo baz');
  });
});
