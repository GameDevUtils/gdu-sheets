module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        "@typescript-eslint/ban-types": [
            "error",
            {
                "extendDefaults": true,
                "types": {
                    "{}": false
                }
            }
        ]
    },
    // overrides: [
    //     {
    //         files: ['*.jsx', '*.tsx'],
    //         rules: {
    //             '@typescript-eslint/explicit-module-boundary-types': ['off'],
    //         },
    //     },
    // ],
};
