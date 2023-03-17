module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/jsx-boolean-value': 1,
    'react/jsx-curly-brace-presence': [
      1,
      { props: 'never', children: 'never' },
    ],
    'no-console': 'warn',
    'no-empty-pattern': 1,
    'no-undef': 'off',
    'react-hooks/exhaustive-deps': 'off'
  },
  
};
