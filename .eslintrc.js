const WARN = 'warn';
const ERROR = 'error';
const OFF = 'off';
const ALWAYS = 'always';
const FIRST = 'first';

module.exports = {
  extends: [
    'eslint:recommended',
    'google',
  ],
  env: {
    browser: true,
    mocha: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.d.ts'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
      ],
      plugins:[
        '@typescript-eslint',
      ],
      rules: {
        '@typescript-eslint/indent': [ERROR, 2],
        '@typescript-eslint/no-var-requires': OFF,
      },
    },
    {
      files: ['**/*.vue'],
      extends: [
        'plugin:vue/recommended',
        '@vue/eslint-config-typescript/recommended'
      ]
    },
    {
      files: ['**/*.json'],
      plugins: [
        'json'
      ],
      extends: [
        'plugin:json/recommended',
      ],
      rules: {
        'comma-dangle': ['error', 'never'],
      }
    },
  ],
  rules: {
    'max-len': OFF,
    'no-multiple-empty-lines':[ERROR, {'max':1, 'maxEOF':0, 'maxBOF':0}],
    'require-jsdoc': OFF,
    'semi': ERROR,
    'padded-blocks': [ERROR, ALWAYS],
    'no-console': ERROR,
    'no-debugger': ERROR,
    'valid-jsdoc': OFF,
    'lines-around-comment': [ERROR, { 
      'beforeBlockComment': true, 
      'beforeLineComment': true
    }],
    'multiline-comment-style': [ERROR, "starred-block"],
    'spaced-comment': [ERROR, ALWAYS],
    'newline-per-chained-call': [ERROR, { "ignoreChainWithDepth": 2 }],
    'no-ternary': ERROR,
    'object-curly-newline': [ERROR, {
      'ObjectExpression': {
        'multiline': true,
        'minProperties': 1
      },
      'ObjectPattern': {
        'multiline': true,
        'minProperties': 1
      },
      'ImportDeclaration': {
        'multiline': true,
        'minProperties': 3
      },
      'ExportDeclaration': {
        'multiline': true,
        'minProperties': 3
      },
    }],
    'indent': [
      ERROR, 2, {
        'ArrayExpression': FIRST,
        'FunctionExpression': {'body': 1, 'parameters': FIRST},
        'ObjectExpression': FIRST,
        'SwitchCase': 1,
        'CallExpression': {'arguments': FIRST},
      },
    ],
    'padding-line-between-statements': [
      ERROR,
      {'blankLine': 'any', 'prev': ['const', 'let', 'var'], 'next': ['const', 'let', 'var']},
      {'blankLine': ALWAYS, 'prev': '*',  'next': 'class'},
      {'blankLine': ALWAYS, 'prev': '*',  'next': 'class'},
      {'blankLine': ALWAYS, 'prev': '*',  'next': 'function'},
      {'blankLine': ALWAYS, 'prev': 'block-like',  'next': '*'},
      {'blankLine': ALWAYS, 'prev': '*',  'next': 'block-like'},
    ],
    'new-cap': [ERROR, {'newIsCap': true, 'capIsNew': false}]
  },
};
