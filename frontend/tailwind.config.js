/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "rgba(255,255,255,0.14)", // hairline-strong as default border
        input: "rgba(255,255,255,0.14)",
        ring: "#fcfdff", // ink
        background: "#000000", // canvas
        foreground: "#fcfdff", // ink
        primary: {
          DEFAULT: "#fcfdff",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#101012", // surface-elevated
          foreground: "#fcfdff", // ink
        },
        destructive: {
          DEFAULT: "#ff2047", // accent-red
          foreground: "#fcfdff",
        },
        muted: {
          DEFAULT: "#06060a", // surface-deep
          foreground: "#a1a4a5", // mute
        },
        accent: {
          DEFAULT: "#101012", // surface-elevated
          foreground: "#fcfdff",
        },
        popover: {
          DEFAULT: "#0a0a0c", // surface-card
          foreground: "#fcfdff",
        },
        card: {
          DEFAULT: "#0a0a0c", // surface-card
          foreground: "#fcfdff",
        },
        // Custom design.md tokens
        canvas: "#000000",
        "surface-card": "#0a0a0c",
        "surface-elevated": "#101012",
        "surface-deep": "#06060a",
        "surface-light": "#f1f7fe",
        hairline: "rgba(255,255,255,0.06)",
        "hairline-strong": "rgba(255,255,255,0.14)",
        "divider-soft": "rgba(255,255,255,0.04)",
        ink: "#fcfdff",
        body: "rgba(252,253,255,0.86)",
        charcoal: "rgba(252,253,255,0.7)",
        mute: "#a1a4a5",
        ash: "#888e90",
        stone: "#464a4d",
        "on-light": "#000000",
        "on-light-mute": "rgba(0,0,51,0.7)",
        "accent-orange": "#ff801f",
        "accent-yellow": "#ffc53d",
        "accent-blue": "#3b9eff",
        "accent-green": "#11ff99",
        "accent-red": "#ff2047",
      },
      borderRadius: {
        none: "0px",
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      fontFamily: {
        display: ["Playfair Display", "ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
