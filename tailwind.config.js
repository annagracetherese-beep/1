/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fffdfa',
          100: '#fdf8ee',
          200: '#f9f1de',
          300: '#eedfbe',
          400: '#dec799',
        },
        sage: {
          50: '#f4f7f5',
          100: '#e5ece7',
          200: '#c7d7cc',
          300: '#9fbca7',
          400: '#759d81',
          500: '#537d60',
        },
        pastel: {
          pink: '#f4a6b2',
          pinkLight: '#fde8ec',
          lavender: '#cbb2fe',
          lavenderLight: '#f3edff',
          yellow: '#ffe066',
          yellowLight: '#fff9db',
          blue: '#74c0fc',
          blueLight: '#e7f5ff',
          peach: '#ffbe76',
          peachLight: '#ffeaa7',
        },
        ink: {
          DEFAULT: '#28211e',
          soft: '#4a3e39',
          light: '#7d6b63',
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        display: ['"Silkscreen"', 'monospace'],
        mono2: ['"VT323"', 'monospace'],
        sans: ['"Fredoka"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px #28211e',
        'brutal': '4px 4px 0px #28211e',
        'brutal-md': '5px 5px 0px #28211e',
        'brutal-lg': '7px 7px 0px #28211e',
        'brutal-xl': '10px 10px 0px #28211e',
        'brutal-pressed': '1px 1px 0px #28211e',
        'brutal-white': '4px 4px 0px #ffffff',
      },
      borderWidth: {
        '3': '3px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        cloudDrift: {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(110%)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        floatSlow: 'floatSlow 5s ease-in-out infinite',
        sway: 'sway 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        cloudDrift: 'cloudDrift 45s linear infinite',
        bounceSubtle: 'bounceSubtle 1.8s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
