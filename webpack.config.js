const entry = __dirname + '/src/main';
const build = __dirname;

module.exports = {
    entry: entry,
    output: {
        path: build,
        filename: 'index.js',
        library: 'itChainer',
        libraryTarget: 'umd'
    },

    target: 'node',

    watch: true,

    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};