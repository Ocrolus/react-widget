import {snakeToCamel, isPreviewModeEnabled} from 'utils/helper';

describe('snakeToCamel', () => {
  it('converts snake_case keys to camelCase keys in an object', () => {
    const input = {
      snake_case: 'value',
      nested_object: {
        nested_key: 'nested_value',
      },
    };

    const expectedOutput = {
      snakeCase: 'value',
      nestedObject: {
        nestedKey: 'nested_value',
      },
    };

    expect(snakeToCamel(input)).toEqual(expectedOutput);
  });

  it('converts snake_case keys to camelCase keys in an array of objects', () => {
    const input = [
      {
        snake_case: 'value1',
      },
      {
        another_key: 'value2',
      },
    ];

    const expectedOutput = [
      {
        snakeCase: 'value1',
      },
      {
        anotherKey: 'value2',
      },
    ];

    expect(snakeToCamel(input)).toEqual(expectedOutput);
  });

  it('does not modify non-object and non-array values', () => {
    expect(snakeToCamel('string')).toBe('string');
    expect(snakeToCamel(123)).toBe(123);
    expect(snakeToCamel(true)).toBe(true);
  });
});

describe('isPreviewModeEnabled', () => {
  it('returns true when "preview" query parameter is set to "true"', () => {
    //@ts-ignore
    delete window.location;
    //@ts-ignore
    window.location = {search: '?preview=true'};
    const result = isPreviewModeEnabled();
    expect(result).toBe(true);
  });

  it('returns false when "preview" query parameter is not set or set to other values', () => {
    //@ts-ignore
    delete window.location;
    //@ts-ignore
    window.location = {search: '?preview=false'};
    const result = isPreviewModeEnabled();
    expect(result).toBe(false);
  });

  it('returns false when "preview" query parameter is not present', () => {
    //@ts-ignore
    delete window.location;
    //@ts-ignore
    window.location = {search: ''};
    const result = isPreviewModeEnabled();
    expect(result).toBe(false);
  });

  it('returns false when "preview" query parameter is set but not to "true"', () => {
    //@ts-ignore
    delete window.location;
    //@ts-ignore
    window.location = {search: '?preview=abc'};
    const result = isPreviewModeEnabled();
    expect(result).toBe(false);
  });
});
