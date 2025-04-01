import ts from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
      parser: ts,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
    },

    rules: {
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/jsx-uses-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];
