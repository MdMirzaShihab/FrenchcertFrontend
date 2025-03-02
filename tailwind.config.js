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
};
