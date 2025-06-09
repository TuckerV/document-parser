# 🧬 DocxTemplater Angular Parser App

This application provides a complete, step-by-step workflow for converting `.docx` files into fully functional [DocxTemplater](https://docxtemplater.com/) templates using Angular-style syntax. The goal is to ensure reliable formatting, valid logic, and dynamic content compatibility for automated document generation.

---

## 🚀 Goal

- **Convert `.docx` files** into dynamic templates compatible with DocxTemplater and Angular parser logic.
- **Normalize placeholders, loops, and conditionals** to follow strict, error-free syntax for automated document workflows.
- **Validate and clean** all template logic for robust, production-ready output.

---

## 🛠️ How to Use

### 1. Prepare Your DOCX File
- Start with any `.docx` file containing text, tables, and placeholders (e.g., `%key%`).

### 2. Upload and Parse
- Use the app's upload interface to select your `.docx` file.
- The app will automatically:
  - Convert `%key%` placeholders to `{key}` or `{key.subkey}`
  - Wrap repeating sections with `{#items}...{/}` blocks
  - Normalize logical operators (`and` → `&&`, `or` → `||`)
  - Refactor `if/else` blocks to Angular-compliant `{#condition}...{#!condition}...{/}`
  - Remove or replace invalid filters and tags
  - Ensure all loops/conditionals are properly closed
  - Remove all `{#false}` tags and `%` symbols

### 3. Review and Export
- Preview the cleaned and converted template in the app.
- Download the finalized `.docx` file, ready for use with DocxTemplater and live data.

---

## 📋 Conversion Checklist (Summary)
- All `%key%` → `{key}`
- All loops and conditionals use `{#}`, `{^}`, `{!}`, and `{/}` blocks
- No orphaned or mismatched tags
- No `{#false}` or `%` symbols remain
- All expressions are Angular-compliant
- Output is a `.docx` file compatible with DocxTemplater

For full details, see `src/memory/index.md`.

---

## 🧩 End Product Requirements
- `.docx` file compatible with DocxTemplater
- Fully dynamic, readable by Angular parser
- All logic clean and closed
- Supports live data rendering without error

---

## 🏁 Example Workflow
1. Upload your `.docx` file.
2. The app parses and transforms all content according to the checklist.
3. Review the output and download your ready-to-use template.

---

## ℹ️ More Information
- See `src/memory/index.md` for the authoritative checklist and technical details.
- For DocxTemplater documentation, visit [docxtemplater.com](https://docxtemplater.com/).

- [Getting Started](https://create-react-app.dev/docs/getting-started) – How to create a new app.
- [User Guide](https://create-react-app.dev) – How to develop apps bootstrapped with Create React App.

## Available Scripts

In the project directory, you can run:

### `yarn generate`

Allows you to generate components or reducers.<br />

**Components**<br />

The command `yarn generate component` will generate a new component and add it to the components folder of your project. There are 3 parameters to the `component` generator that you will be prompted for if you do not provide them inline:
<ol>
  <li> Component Name </li>
  <li> Whether or not you would like to include a test file (y/n) </li>
  <li> Whether or not you would like to include a storybook file (y/n)  </li>
</ol>

You can provide these parameters inline if you want: `yarn generate component myComponent y n` or in part `yarn generate component myComponent`. Any parameter that you do not provide will cause the plop generator to prompt you for an answer.<br />

**Reducers**<br />

The reducer generator only has one parameter, its name. You can generate a reducer using the command `yarn generate reducer myReducer`. If you do not provide a name you will be prompted for one. Generating a reducer will produce the following modifications to your project: <br />

<ol>
  <li> A new folder will be created in the actions directory of your project and an index.ts file will be added to it with some boiler plate examples of creating actions using Redux Toolkit.</li>
  <li> A new folder will be created in the reducers directory of your project and an index.ts file will be added to it with a basic reducer wired up with a default case. Handle new cases by adding `.addCase()` to the builder object provided. More info can be found in the Redux Toolkit <a href='https://redux-toolkit.js.org/api/createReducer#builderaddcase' target="_blank">documentation</a>.</li>
  <li> The index.ts file in the base of the reducer folder will be modified to import your new reducer and wire it up. As long as you always create reducers using the generator command, you should never need to touch this file. </li>
</ol>

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn storybook`

Starts up a storybook server to host any components that have been generated with a storybook file.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
