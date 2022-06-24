module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:react/recommended',
    'standard',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'no-unused-vars': ['warn'],
    'no-debugger': ['warn']
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
