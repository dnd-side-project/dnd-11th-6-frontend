import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        title1: ['28px', { lineHeight: '1.2', fontWeight: '600' }],
        'title1-bold': ['28px', { lineHeight: '1.2', fontWeight: '700' }],
        title2: ['24px', { lineHeight: '1.2', fontWeight: '600' }],
        'title2-bold': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        heading1: ['22px', { lineHeight: '1.2', fontWeight: '600' }],
        'heading1-bold': ['22px', { lineHeight: '1.2', fontWeight: '700' }],
        heading2: ['20px', { lineHeight: '1.2', fontWeight: '600' }],
        'heading2-bold': ['20px', { lineHeight: '1.2', fontWeight: '700' }],
        body1: ['18px', { lineHeight: '1.5', fontWeight: '500' }],
        'body1-medium': ['18px', { lineHeight: '1.5', fontWeight: '600' }],
        'body1-bold': ['18px', { lineHeight: '1.5', fontWeight: '700' }],
        body2: ['16px', { lineHeight: '1.5', fontWeight: '500' }],
        'body2-medium': ['16px', { lineHeight: '1.5', fontWeight: '600' }],
        'body2-bold': ['16px', { lineHeight: '1.5', fontWeight: '700' }],
        label: ['14px', { lineHeight: '1.5', fontWeight: '500' }],
        'label-medium': ['14px', { lineHeight: '1.5', fontWeight: '600' }],
        'label-bold': ['14px', { lineHeight: '1.5', fontWeight: '700' }],
        caption: ['12px', { lineHeight: '1.5', fontWeight: '500' }],
        'caption-medium': ['12px', { lineHeight: '1.5', fontWeight: '600' }],
        caption2: ['10px', { lineHeight: '1.5', fontWeight: '500' }],
        'caption2-medium': ['10px', { lineHeight: '1.5', fontWeight: '600' }],
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
  },
  plugins: [],
}
export default config
