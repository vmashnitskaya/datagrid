module.exports = {
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],
    plugins: ['react', '@typescript-eslint', 'jest'],
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        'linebreak-style': 'off',
        "@typescript-eslint/camelcase": "off",
        'react/prop-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        "react/jsx-props-no-spreading": "off",
        "no-use-before-define": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
        "@typescript-eslint/triple-slash-reference": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "no-underscore-dangle": "off",
        "jsx-a11y/label-has-associated-control": [ "error", {
            "required": {
                "some": [ "nesting", "id"  ]
            }
        }],
        "jsx-a11y/label-has-for": [ "error", {
            "required": {
                "some": [ "nesting", "id"  ]
            }
        }],
        'prettier/prettier': [
            'error',
            {
                "singleQuote": true,
                "tabWidth": 4,
                "printWidth": 100,
            },
        ],
    },
};