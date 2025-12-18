// eslint.config.js

import js from '@eslint/js';
import globals from 'globals';

export default [
    // Recommended Rules
    js.configs.recommended,

    // Node.js Configuration
    {
        files: ['**/*.js', '**/*.mjs'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
            ecmaVersion: 2022,
            sourceType: 'module'
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off'
        }
    }

    // Jest test files
    , {
        files: ['**/*.test.js', '**/*.spec.js', 'test/**/*.js', '__tests__/**/*.js'],
        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },
    }
];