/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand1: {
          10: '#f3f7f5',
          100: '#ddf5eb',
          200: '#bcebd6',
          300: '#9ae0c2',
          400: '#79d6ad',
          500: '#57cc99',
          600: '#46a37a',
          700: '#347a5c',
          800: '#23523d',
          900: '#11291f',
        },
        primary: '#3238f2'
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'inter': ['Inter'],
        'header': ['Inter-Medium', 'Helvetica'],
        'semibold': ['Inter-SemiBold', 'Helvetica'],
        'serif': ['Instrument-Serif', 'serif'],
        'instrument': ['Instrument Serif']
      },
    },
  },
  plugins: [],
};
