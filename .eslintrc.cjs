module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
  plugins: ["react-refresh", "simple-import-sort", "react-compiler"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "react-compiler/react-compiler": "error",
  },
};
