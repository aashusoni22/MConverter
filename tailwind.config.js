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
            h1: {
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            },
            h2: {
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            },
            p: {
              marginBottom: "1rem",
              lineHeight: "1.6",
            },
            ul: {
              listStyleType: "disc",
              paddingLeft: "1.5rem",
              marginBottom: "1rem",
            },
            code: {
              backgroundColor: "#2d3748",
              padding: "0.2rem 0.4rem",
              borderRadius: "0.25rem",
              fontFamily: "monospace",
              color: "#f56565",
            },
            pre: {
              backgroundColor: "#2d3748",
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
