/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: '#706EF4',
          hover: '#5b5dd7',
        },
        sub: {
          DEFAULT: '#D4D3FC',
          hover: '#DDDDFF',
        },
        gray: {
          DEFAULT: '#D1D5DB',
          hover: '#b1b5c1',
        },
        kakao: {
          DEFAULT: '#facc15',
          hover: '#e5b007',
        },
        naver: {
          DEFAULT: '#10B981',
          hover: '#0e976a',
        },
        white: {
          DEFAULT: 'white',
          hover: '#f0f0f0',
        },
        black: {
          DEFAULT: '#0A0A0A',
        },
        red: {
          DEFAULT: '#F14747',
        },
        disabled: {
          DEFAULT: '#b1b5c1',
        },
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        slideInRight: 'slideInRight 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};

module.exports = config;
