/** @type {import('@types/eslint').ESLint.Options['baseConfig']} */
// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parserOptions: { tsconfigRootDir: __dirname, project: ["./tsconfig.json"] },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "promise", "simple-import-sort"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:promise/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "crlf" }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};
