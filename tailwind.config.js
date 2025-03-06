export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        upDown: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      fontFamily: {
        'dancing-script': ['Dancing Script', 'cursive'],
      },
      animation: {
        upDown: "upDown 5s ease-in-out infinite",
      },
      animationDelay: {
        200: "200ms",
        500: "500ms",
        1000: "1000ms",
      },
    },
  },
  plugins: [],
  safelist: [
    // Safelist all color-related classes
    { pattern: /bg-(blue|green|red|yellow|purple|pink|indigo)-(100|200|300|400|500|600|700|800|900)/ },
    { pattern: /text-(blue|green|red|yellow|purple|pink|indigo)-(100|200|300|400|500|600|700|800|900)/ },
    { pattern: /border-(blue|green|red|yellow|purple|pink|indigo)-(100|200|300|400|500|600|700|800|900)/ },
    { pattern: /shadow-(blue|green|red|yellow|purple|pink|indigo)-(100|200|300|400|500|600|700|800|900)/ },
    { pattern: /from-(blue|green|red|yellow|purple|pink|indigo)-(100|200|300|400|500|600|700|800|900)/ },
    { pattern: /to-(blue|green|red|yellow|purple|pink|indigo)-(100|200|300|400|500|600|700|800|900)/ },
  ],
};