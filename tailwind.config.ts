import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        title1: ['28px', { lineHeight: '1.2', fontWeight: '500' }],
        'title1-bold': ['28px', { lineHeight: '1.2', fontWeight: '800' }],
        'title1-semibold': ['28px', { lineHeight: '1.2', fontWeight: '700' }],
        'title1-medium': ['28px', { lineHeight: '1.2', fontWeight: '600' }],
        'title1-light': ['28px', { lineHeight: '1.2', fontWeight: '400' }],

        title2: ['24px', { lineHeight: '1.2', fontWeight: '500' }],
        'title2-bold': ['24px', { lineHeight: '1.2', fontWeight: '800' }],
        'title2-semibold': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        'title2-medium': ['24px', { lineHeight: '1.2', fontWeight: '600' }],
        'title2-light': ['24px', { lineHeight: '1.2', fontWeight: '400' }],

        heading1: ['22px', { lineHeight: '1.2', fontWeight: '500' }],
        'heading1-bold': ['22px', { lineHeight: '1.2', fontWeight: '800' }],
        'heading1-semibold': ['22px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading1-medium': ['22px', { lineHeight: '1.2', fontWeight: '600' }],
        'heading1-light': ['22px', { lineHeight: '1.2', fontWeight: '400' }],

        heading2: ['20px', { lineHeight: '1.2', fontWeight: '500' }],
        'heading2-bold': ['20px', { lineHeight: '1.2', fontWeight: '800' }],
        'heading2-semibold': ['20px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading2-medium': ['20px', { lineHeight: '1.2', fontWeight: '600' }],
        'heading2-light': ['20px', { lineHeight: '1.2', fontWeight: '400' }],

        body1: ['18px', { lineHeight: '1.5', fontWeight: '500' }],
        'body1-bold': ['18px', { lineHeight: '1.5', fontWeight: '800' }],
        'body1-semibold': ['18px', { lineHeight: '1.5', fontWeight: '700' }],
        'body1-medium': ['18px', { lineHeight: '1.5', fontWeight: '600' }],
        'body1-light': ['18px', { lineHeight: '1.5', fontWeight: '400' }],

        body2: ['16px', { lineHeight: '1.5', fontWeight: '500' }],
        'body2-bold': ['16px', { lineHeight: '1.5', fontWeight: '800' }],
        'body2-semibold': ['16px', { lineHeight: '1.5', fontWeight: '700' }],
        'body2-medium': ['16px', { lineHeight: '1.5', fontWeight: '600' }],
        'body2-light': ['16px', { lineHeight: '1.5', fontWeight: '400' }],

        label: ['14px', { lineHeight: '1.5', fontWeight: '500' }],
        'label-bold': ['14px', { lineHeight: '1.5', fontWeight: '800' }],
        'label-semibold': ['14px', { lineHeight: '1.5', fontWeight: '700' }],
        'label-medium': ['14px', { lineHeight: '1.5', fontWeight: '600' }],
        'label-light': ['14px', { lineHeight: '1.5', fontWeight: '400' }],

        caption: ['12px', { lineHeight: '1.5', fontWeight: '500' }],
        'caption-bold': ['12px', { lineHeight: '1.5', fontWeight: '800' }],
        'caption-semibold': ['12px', { lineHeight: '1.5', fontWeight: '700' }],
        'caption-medium': ['12px', { lineHeight: '1.5', fontWeight: '600' }],
        'caption-light': ['12px', { lineHeight: '1.5', fontWeight: '400' }],

        caption2: ['10px', { lineHeight: '1.5', fontWeight: '500' }],
        'caption2-bold': ['10px', { lineHeight: '1.5', fontWeight: '800' }],
        'caption2-semibold': ['10px', { lineHeight: '1.5', fontWeight: '700' }],
        'caption2-medium': ['10px', { lineHeight: '1.5', fontWeight: '600' }],
        'caption2-light': ['10px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      colors: {
        gray: {
          '000': '#FFFFFF',
          '050': '#F9FAFB',
          '100': '#F3F4F6',
          '200': '#EBEEEF',
          '300': '#E2E4E6',
          '400': '#CFD3D6',
          '500': '#AAAFB3',
          '600': '#888D91',
          '700': '#4E5256',
          '800': '#373A3C',
          '900': '#1E1E1E',
        },
        point: {
          blue: '#0101FF',
          yellow: '#FFCD32',
        },
        success: {
          '500': '#76E8AD',
          '600': '#35D48D',
          '700': '#1BBF83',
        },
        error: {
          '500': '#FF8E89',
          '600': '#FF5D5D',
          '700': '#E0504E',
        },
      },
    },
    animation: {
      fadeIn: 'fadeIn 1s ease-in-out forwards',
      'move-up-down': 'move-up-down 2s ease-in-out infinite',
    },
    keyframes: {
      'move-up-down': {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-10px)' },
      },
      fadeIn: {
        '0%': { opacity: '0', transform: 'translateY(10px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
    height: {
      screen: '100dvh',
    },
    minHeight: {
      screen: '100dvh',
    },
  },
  plugins: [],
}
export default config
