module.exports = {
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ['dist/**', 'node_modules/**'],
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    'no-prototype-builtins': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'no-return-await': 'off',
    'no-shadow': 'off',
    'no-return-assign': 'off',
    'max-len': 'off',
    'vue/max-len': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/valid-v-on': 'off',
    'import/no-cycle': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'consistent-return': 'off',
    'prefer-destructuring': 'off'
  },
};
