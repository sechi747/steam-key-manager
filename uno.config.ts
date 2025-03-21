import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetWind3 } from 'unocss/preset-wind3'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-250 ease-in-out hover:opacity-100'],

    ['trans', 'transition-all-250 ease-linear'],
    ['text', 'text-text-default dark:text-text-dark'],
    ['bg', 'bg-bg-default dark:bg-bg-dark'],
    ['base', 'text'],

    ['pr', 'relative'],
    ['pa', 'absolute'],
    ['pf', 'fixed'],
    ['p-c', 'pa top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'],

    ['f-c', 'flex justify-center items-center'],
    ['f-c-c', 'f-c flex-col'],
    ['fc', 'flex justify-center'],
    ['fcc', 'flex justify-center items-center'],
    ['fs', 'flex justify-start'],
    ['fsc', 'flex justify-start items-center'],
    ['fe', 'flex justify-end'],
    ['fec', 'flex justify-end items-center'],
    ['fb', 'flex justify-between'],
    ['fbc', 'flex justify-between items-center'],
    ['fw', 'flex justify-wrap'],
    ['fwr', 'flex justify-wrap-reverse'],
    ['fa', 'flex justify-around'],
    ['fac', 'flex justify-around items-center'],
    ['fic', 'flex items-center'],
    ['fccc', 'flex justify-center items-center flex-col'],
  ],
  theme: {
    fontFamily: {
      mono: '"LXGW WenKai Screen", sans-serif',
    },
    colors: {
      bg: {
        default: '#ffffff',
        dark: '#242424',
      },
      text: {
        default: 'rgba(0, 0, 0, 0.9);',
        dark: 'rgba(255, 255, 255, 0.9);',
      },
      primary: '#26a69a',
    },
    boxShadow: {
      switch: '0 0 0 2px rgba(24, 160, 88, 0.2)',
    },
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography({
      cssExtend: {
        'a': {
          'text-decoration-thickness': '0.1em;',
          'text-underline-offset': '0.15em;',
          'text-decoration-color': 'rgba(38, 166, 154,0.7);',
        },
        'a:hover': {
          'text-decoration-color': 'rgba(38, 166, 154,1);',
        },
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
