module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
    "react-native/react-native": true
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  "parser": "babel-eslint",
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    'react-native'
  ],
  'rules': {
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    // "react-native/no-inline-styles": 2,
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 2,
    'no-invalid-this': 0,
    // 'babel/no-invalid-this': 1
  },
};
