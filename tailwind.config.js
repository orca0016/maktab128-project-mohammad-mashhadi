// tailwind.config.js
import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(button|card|checkbox|divider|drawer|dropdown|input|menu|modal|navbar|pagination|radio|select|skeleton|spinner|toggle|tabs|toast|user|ripple|form|popover|listbox|scroll-shadow|avatar).js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "media",
  plugins: [heroui()],
};
