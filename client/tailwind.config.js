import * as baseConfig from "./src/ui/tailwind.config";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts,js,jsx}", "./src/ui/**/*.{tsx,ts,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [baseConfig],
};
