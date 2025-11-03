// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    root: true,
    extends: ["@react-native-community", "prettier"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    rules: {
      "import/no-unresolved": "off",
    },

    overrides: [
      {
        files: ["*.ts", "*.tsx"],
        rules: {
          "@typescript-eslint/no-shadow": ["error"],
          "no-shadow": "off",
          "no-undef": "off",
          "no-console": 1,
        },
      },
    ],
  },
]);
