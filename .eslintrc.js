module.exports = {
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 9
    },
    "env": {
        "node": true,
        "es6": true
    },
    "rules": {
        "no-console": 'off',
        "object-curly-spacing": 'off',
        "no-const-assign": "warn",
        "linebreak-style": 'off',
        "max-len": 'off',
        "require-jsdoc": 'off',
        "indent": ["error", "tab", {"SwitchCase": 1}],
        "no-tabs": 'off',
        "no-unreachable": 'error',
        "no-multi-spaces": 'off',
        "arrow-parens": 'off',
        "no-undef": "error",
        "prefer-const": "error"
    }
};