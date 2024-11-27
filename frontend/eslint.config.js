const typescriptEslintParser = require("@typescript-eslint/parser");
const typescriptEslintPlugin = require("@typescript-eslint/eslint-plugin");
const todoPlzPlugin = require("eslint-plugin-todo-plz");

module.exports = [
  {
    ignores: ["node_modules/**"], // Add ignores if necessary
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mjs"],
    languageOptions: {
      parser: typescriptEslintParser,
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      "todo-plz": todoPlzPlugin,
    },
    rules: {
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: false,
        },
      ],
      "todo-plz/ticket-ref": [
        "warn",
        {
          commentPattern: "TODO:\\s\\[(AGE-[0-9]+[,\\s]*)+\\]",
          description: "For example: TODO: [AGE-123] Do something",
        },
      ],
    },
  },
];
