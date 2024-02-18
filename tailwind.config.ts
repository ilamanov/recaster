import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  safelist: ["dark"], // https://github.com/shadcn-ui/ui/issues/515
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hovered: "hsl(var(--primary-hovered))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          hovered: "hsl(var(--destructive-hovered))",
        },

        code: {
          background: "hsl(var(--code-background))",
          foreground: "hsl(var(--code-foreground))",
          keyword: "hsl(var(--code-keyword))",
          builtin: "hsl(var(--code-builtin))",
          solidity: "hsl(var(--code-solidity))",
          "control-flow": "hsl(var(--code-control-flow))",
          punctuation: "hsl(var(--code-punctuation))",
          property: "hsl(var(--code-property))",
          function: "hsl(var(--code-function))",
          argument: "hsl(var(--code-argument))",
          string: "hsl(var(--code-string))",
          comment: "hsl(var(--code-comment))",
          number: "hsl(var(--code-number))",
          regex: "hsl(var(--code-regex))",
          "line-numbers": "hsl(var(--code-line-numbers))",
          "read-function": "hsl(var(--code-read-function))",
          "write-function": "hsl(var(--code-write-function))",
          highlight: "hsl(var(--code-highlight))",
          selector: "hsl(var(--code-selector))",
          "selection-bg": "hsl(var(--code-selection-bg))",
          "line-highlight-bg": "hsl(var(--code-line-highlight-bg))",
          "line-highlight-shadow": "hsl(var(--code-line-highlight-shadow))",
        },
      },
      borderRadius: {
        xl: `calc(var(--radius) + 4px)`,
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        18: "4.5rem",
      },
      fontFamily: {
        // sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
    },
  },
  plugins: [],
};
export default config;
