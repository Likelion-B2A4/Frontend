/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        alice: ['AliceDigitalLearning', 'sans-serif'],
        sans: ['Pretendard', 'sans-serif'],

        pretendard: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
