import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  rules: {
    'no-console': 'warn',
    'regexp/no-obscure-range': 'off',
    'n/prefer-global/process': 'off',
  },
})
