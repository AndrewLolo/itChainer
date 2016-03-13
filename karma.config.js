const webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
    config.set({

        files: [
            './**/*.spec.js'
        ],

        exclude: [
            'node_modules/**/*.spec.js',
            'bower_components/**/*.spec.js'],

        frameworks: ['jasmine'],
        browsers: ['Chrome'],

        preprocessors: {
            './**/*.spec.js': ['webpack']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        }
    });
};