import lineClamp from '@tailwindcss/line-clamp';

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        netflix: {
          black: '#141414',
          red: '#E50914',
          grayLight: '#B3B3B3',
          grayDark: '#333333',
        },
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [lineClamp],
  plugins: [require('tailwind-scrollbar')],
plugins: [
    require('@tailwindcss/aspect-ratio'), // Add this line
  ],
};
