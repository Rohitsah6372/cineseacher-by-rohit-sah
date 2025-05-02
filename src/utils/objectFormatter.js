/**
 * Converts a string to camelCase.
 * Handles PascalCase, snake_case, kebab-case, and acronyms like imdbID → imdbId.
 */
function toCamelCase(str) {
  return str
    .replace(/([A-Z]+)(?=[A-Z][a-z]|$)/g, " $1") // Handle acronyms
    .replace(/[_-\s]+/g, " ") // Normalize separators
    .trim()
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
}

/**
 * Recursively converts all keys in an object or array to camelCase.
 * @param {*} input - The input object or array
 * @returns {*} - New object or array with camelCased keys
 */
export function keysToCamelCase(input) {
  if (Array.isArray(input)) {
    return input.map(keysToCamelCase);
  }

  if (input !== null && typeof input === "object") {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [
        toCamelCase(key),
        keysToCamelCase(value),
      ])
    );
  }

  return input;
}
