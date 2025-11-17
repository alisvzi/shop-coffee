// const config = {
//   plugins: ["@tailwindcss/postcss"],
// };

// export default config;
const config = {
  plugins: {
    "@tailwindcss/postcss": {
      optimize: false,
    },
    // "postcss-import": {},
    "postcss-nested": {},

    // autoprefixer: {},
  },
};
export default config;
