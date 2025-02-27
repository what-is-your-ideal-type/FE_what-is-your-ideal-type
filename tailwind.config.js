/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  content: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          'sans-serif',
        ],
      },
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
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
  plugins: [require('tailwindcss-animate')],
};

module.exports = config;
