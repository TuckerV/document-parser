/**
 * Converts a Gavel/Liquid/Django-style template string to Mustache-style syntax for docx-templater.
 * - Converts {% if condition %}...{% endif %} to {{#condition}}...{{/condition}}
 * - Converts {{ variable }} to {{variable}}
 * - Attempts to convert loops and pluralization blocks
 * - Uses regex only (no external libraries)
 *
 * @param template The input template string
 * @returns The converted template string
 */

// Step 1: Convert if/endif blocks
const convertIfBlocks = (input: string): string =>
  input.replace(
    /\{\%\s*if\s+(.*?)\s*\%\}([\s\S]*?)\{\%\s*endif\s*\%\}/g,
    (match, condition, content) =>
      `{{#${condition.trim()}}}${content}{{/${condition.trim()}}}`,
  );

// Step 1b: Convert else blocks
const convertElseBlocks = (input: string): string => {
  // This function replaces {% else %} with {/}{#not_condition} where not_condition is the opposite of the last if condition.
  // It recursively checks for the last {% if ... %} before {% else %}.
  return input.replace(/\{\%\s*else\s*\%\}/g, (match, offset, string) => {
    // Find the last {% if ... %} before this else
    const before = string.slice(0, offset);
    const ifMatches = [...before.matchAll(/\{\%\s*if\s+(.*?)\s*\%\}/g)];
    if (ifMatches.length === 0) return match; // No if found, leave unchanged
    const lastIf = ifMatches[ifMatches.length - 1];
    const condition = lastIf[1].trim();
    // Use a simple 'not_' prefix for the opposite condition
    const notCondition = condition.startsWith('not_')
      ? condition.slice(4)
      : `not_${condition}`;
    return `{{/}}{{--else--}}{{#${notCondition}}}`;
  });
};

// Step 2: Convert variable placeholders ({{ variable }}) to {{variable}}
const convertVariables = (input: string): string =>
  input.replace(
    /\{\{\s*([^\s\}]+)\s*\}\}/g,
    (match, variable) => `{{${variable.trim()}}}`,
  );

// Step 3: Convert for loops
const convertForLoops = (input: string): string =>
  input.replace(
    /\{\%\s*for\s+(\w+)\s+in\s+(\w+)\s*\%\}([\s\S]*?)\{\%\s*endfor\s*\%\}/g,
    (match, item, items, content) => {
      const inner = content.replace(
        new RegExp(`\{\{\s*${item}\\.([^\s\}]+)\s*\}\}`, 'g'),
        (m: string, prop: string): string => `{{${prop}}}`,
      );
      return `{{#${items}}}${inner}{{/${items}}}`;
    },
  );

// Step 4: (optional) Pluralization and advanced logic -- see notes in docstring

// Step 5: Convert %key% and %key.subkey% placeholders to {key} and {key.subkey}
const convertPercentPlaceholders = (input: string): string =>
  input.replace(
    /%([a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*)%/g,
    (match, key) => `{${key}}`,
  );

// Step 6: Clean up whitespace and ensure tag formatting
const cleanWhitespaceAndTags = (input: string): string =>
  input
    .replace(/[ \t]+\n/g, '\n') // Remove trailing spaces before newlines
    .replace(/\n{3,}/g, '\n\n') // Collapse multiple blank lines
    .replace(/\{\{\s+/g, '{{') // Remove extra spaces after opening braces
    .replace(/\s+\}\}/g, '}}') // Remove extra spaces before closing braces
    .replace(/\{#\s+/g, '{#')
    .replace(/\s+\}/g, '}');

// Step 8: Replace all double curly braces with singles
const convertDoubleBracesToSingle = (input: string): string =>
  input.replace(/\{\{/g, '{').replace(/\}\}/g, '}');

// Step 7: (Optional) Extract and process tables and headers (stub for docx structure)
const extractTablesAndHeaders = (input: string): string => input;

/**
 * Converts a Gavel/Liquid/Django-style template string to Mustache-style syntax for docx-templater.
 * - Converts {% if condition %}...{% endif %} to {{#condition}}...{{/condition}}
 * - Converts {{ variable }} to {{variable}}
 * - Attempts to convert loops and pluralization blocks
 * - Uses regex only (no external libraries)
 *
 * @param template The input template string
 * @returns The converted template string
 */
export {
  convertIfBlocks,
  convertElseBlocks,
  convertVariables,
  convertForLoops,
  convertPercentPlaceholders,
  cleanWhitespaceAndTags,
  extractTablesAndHeaders,
  convertDoubleBracesToSingle,
};
