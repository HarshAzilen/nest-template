export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: Extract<keyof T, string>[],
): Pick<T, K> {
  const filtered: Partial<T> = {};
  keys.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      filtered[key] = obj[key];
    }
  });
  return filtered as Pick<T, K>;
}
