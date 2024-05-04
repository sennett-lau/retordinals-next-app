import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'v1_orange': "url('/web/V1_Orange.png')",
        'v1_dark': "url('/web/V1_Dark.png')",
      },
      colors: {
        primary: {
          500: '#FD8603', // logo orange
        },
        secondary: {},
        dark: {
          500: '#121212', // background
        },
        discord: {
          500: '#7289DA', // discord color
        },
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
        '11xl': '112rem',
      },
    },
  },
  plugins: [],
}
export default config
