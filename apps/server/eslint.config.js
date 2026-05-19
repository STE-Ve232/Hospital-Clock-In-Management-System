const tseslint = require("typescript-eslint");
const plugin = require("@typescript-eslint/eslint-plugin");

module.exports = tseslint.config({
    files: ["**/*.ts"],
    ignores: ["dist"],
    plugins: {
        '@typescript-eslint': plugin
    },
    languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
            project: true,
        },
    },
    rules: {
        ...plugin.configs.recommended.rules,
        '@typescript-eslint/no-explicit-any': 'error',
    }
});