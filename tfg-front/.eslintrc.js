module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard'
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
    'eslint-plugin-react',
    'standard',
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
