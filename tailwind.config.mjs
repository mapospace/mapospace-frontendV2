/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  animation: {
    fadeIn: 'fadeIn 1s ease-in-out',
    slideInUp: 'slideInUp 0.5s ease-in-out',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
    slideInUp: {
      '0%': { transform: 'translateY(20px)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 },
    },
  },
  theme: {
    extend: {
      colors: {
        brand1: {
          10: '#f9fafc',
          100: '#edf1f7',
          200: '#dbe3ee',
          300: '#c5d3e5',
          400: '#a2b9d8',
          500: '#6c9fcc',
          600: '#497faf',
          700: '#37658d',
          800: '#264a6a',
          900: '#19334b',
        },
        primary: {
          50: '#f5faff',
          100: '#e0f2ff',
          200: '#bfe4ff',
          300: '#80cdff',
          400: '#40b3ff',
          500: '#1f93e0',
          600: '#1573b3',
          700: '#105a8f',
          800: '#0a3f66',
          900: '#052a47',
        },
        secondary: {
          50:  '#f5f0ff',   // dreamy lavender fog
          100: '#e0d9ff',   // soft lilac
          200: '#d3bfff',   // candy orchid
          300: '#b89cff',   // lavender jelly
          400: '#9c7dff',   // periwinkle pop
          500: '#8372ff',   // saturated indigo violet
          600: '#a3c0ff',   // rich soft blue-violet
          700: '#5e60ff',   // cooler blueish purple
          800: '#768bff',   // sky-indigo punch
          900: '#683ef0',   // playful soft blue
        },
        neutral: {
          100: '#f9fafb',
          200: '#f3f4f6',
          300: '#e5e7eb',
          400: '#d1d5db',
          500: '#9ca3af',
          600: '#6b7280',
          700: '#4b5563',
          800: '#374151',
          900: '#1f2937',
          1000: '#111827',
          1100: '#0f172a',
          1200: '#0e1422',
          1300: '#0a101c',
          1400: '#070d17',
          1500: '#050a12',
        },
      },
      screens: {
        'sc-xs': '576px',
        'sc-sm': '769px',
        'sc-md': '992px',
        'sc-lg': '1200px',
        'sc-xl': '1400px',
        'sc-2xl': '1540px',
        'custom-range': { min: '1230px', max: '1290px' },
        'custom-range-mobile': { min: '600px', max: '1048px' },
        'custom-range-tab': { min: '425px', max: '600px' },
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'inter': ['Inter'],
        'header': ['Inter-Medium', 'Helvetica'],
        'semibold': ['Inter-SemiBold', 'Helvetica'],
        'serif': ['Instrument-Serif', 'serif'],
        'instrument': ['Instrument Serif']
      },
      spacing: {
        '2xs': '2px',
        'xs': '4px',
        's': '8px',
        'm': '12px',
        'l': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '40px',
        '4xl': '48px',
        '5xl': '56px',
        '6xl': '64px',
        '7xl': '72px',
        '8xl': '80px',
        '9xl': '88px',
        '10xl': '96px',
        '11xl': '104px',
        '12xl': '112px',
      },
      borderRadius: {
        none: '0',
        bxs: '4px',
        bs: '8px',
        bm: '12px',
        blg: '16px',
        bpill: '999px',
        bfull: '50%',
      },
      fontSize: {
        'f-xs': '10px',
        'f-s': '12px',
        'f-m': '14px',
        'f-l': '16px',
        'f-xl': '18px',
        'f-2xl': '20px',
        'f-3xl': '24px',
        'f-4xl': '28px',
        'f-5xl': '32px',
        'f-6xl': '40px',
        'f-7xl': '48px',
        'f-8xl': '56px',
        'f-9xl': '64px',
        'f-10xl': '72px',
      },
    },
  },
  plugins: [],
};
