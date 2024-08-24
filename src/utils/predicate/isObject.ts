export const isObject = (value: unknown): value is object => {
  return value !== null && typeof value === "object" && !Array.isArray(value);
};
