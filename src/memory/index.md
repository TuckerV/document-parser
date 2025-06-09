# 🧾 DocxTemplater Conversion Checklist (Angular Parser)

This guide outlines a complete, step-by-step process for converting `.docx` files into fully functional **DocxTemplater** templates using the **Angular parser**. Use this to ensure reliable formatting, valid logic, and dynamic content compatibility.

---

## 🪜 Step-by-Step Instructions

### 1. 🔍 Preprocess and Parse the Document

- Read all `.docx` content: paragraphs, tables, headers.
- Convert any `%key%` placeholders into:
  - `{key}` for flat variables
  - `{key.subkey}` for nested objects

---

### 2. 🔄 Convert Repeating Sections

Wrap repeating content with loop tags:

```text
{#items}
  ...template content using {item_field}...
{/}
```

---

### 3. ⚠️ Normalize Conditional Logic

- Convert:
  - `and` → `&&`
  - `or` → `||`
- Replace `if/else` emulation (`{#condition}...{#false}...`) with:

```text
{#condition}
  ...true block...
{/}
{#!condition}
  ...false block...
{/}
```

---

### 4. 🔧 Fix Syntax & Remove Invalid Tags

- ✅ Use `{#}`, `{/}`, `{^}`, and `{!}` blocks only
- ❌ Never use `%key%` or `{/key}` or raw `if`/`else`
- Remove/validate filters:
  - `{key | lower}` is OK if `lower` is defined
  - Remove or replace unknown filters

---

### 5. 🧼 Validate Loop and Condition Closures

- Ensure every `{#...}` and `{^...}` has a matching `{/}`
- No orphaned or nested loop mismatches

---

### 6. 🚫 Remove `{#false}` Tags

Replace `{#false}` blocks with clean negated conditionals or `#!condition` syntax.

---

### 7. ✅ Clean and Finalize

- **No `%` symbols** left in the final file
- **No `{#false}`** syntax remains
- **All expressions are Angular-compliant**
- Verify that variable paths match expected JSON structure

---

### 8. 📁 Export

- Save final output as `.docx`
- Maintain all layout, spacing, and styles

---

### 9. 🧪 (Optional) Live Data Validation

- Load sample JSON data and test:
  - Loop rendering
  - Conditional visibility
  - Nested object resolution

---

### 10. Traverse every table in the document.

For each table:

- Iterate through every row (tr)
- Iterate through every cell (td)
- Apply all the same logic and transformations used on paragraphs:
- %key% → {key}
- Jinja blocks → Angular syntax
- {#false} → {#!condition} format
- replace and/or with &&/||
- Ensure every {#...} has a matching {/}

---

## ✅ End Product Requirements

- `.docx` file compatible with DocxTemplater
- Fully dynamic, readable by Angular parser
- All logic clean and closed
- Supports live data rendering without error
