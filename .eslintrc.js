module.exports = {
    extends: 'app',
    settings: {
        'import/resolver': {
            webpack: {
                config: 'build/webpack.config.base.js',
            },
        },
    },
};
