/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
            color: "inherit",
            h1: {
              color: "inherit",
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            },
            h2: {
              color: "inherit",
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            },
            p: {
              color: "inherit",
              marginBottom: "1rem",
              lineHeight: "1.6",
            },
            ul: {
              listStyleType: "disc",
              paddingLeft: "1.5rem",
              marginBottom: "1rem",
            },
            code: {
              backgroundColor: "rgb(var(--code-bg))",
              color: "rgb(var(--code-color))",
              padding: "0.2rem 0.4rem",
              borderRadius: "0.25rem",
              fontFamily: "monospace",
            },
            pre: {
              backgroundColor: "rgb(var(--code-bg))",
              padding: "1rem",
              borderRadius: "0.5rem",
              overflowX: "auto",
              marginBottom: "1rem",
            },
          },
        },
      },

      fontFamily: {
        chakra: ["Chakra Petch", "serif"],
        arial: ["Arial", "sans-serif"],
        verdana: ["Verdana", "sans-serif"],
        georgia: ["Georgia", "serif"],
        tahoma: ["Tahoma", "sans-serif"],
        courier: ["Courier New", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
