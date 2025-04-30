module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    //  "plugin:react-hooks/recommended-legacy"
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
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Группа для side-effect импортов (например, import "./polyfill";)
          ["^\\u0000"],
          // Node.js встроенные модули
          ["^node:"],
          // Сторонние библиотеки
          ["^@?\\w"],
          // Импорты с заданными alias
          [
            "^@app/",
            "^@entities/",
            "^@features/",
            "^@shared/",
            "^@pages/",
            "^@widgets/",
            "^@processes/",
          ],
          // Другие абсолютные импорты (начинающиеся не с точки)
          ["^[^.]"],
          // Относительные импорты
          ["^\\./"],
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
    "react-compiler/react-compiler": "error",
  },
};
