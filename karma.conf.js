// Karma configuration
// Generated on Fri Aug 18 2017 09:06:55 GMT-0700 (PDT)

module.exports = function (config) {
    config.set({
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [ {
                    test: /\.jsx$/,
                    exclude: /\/node_modules\//,
                    loader: 'babel-loader'
                } ],
            },
            externals: {
                cheerio: 'window',
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true,
            },
        },
        basePath: '',
        frameworks: [ 'jasmine' ],
        files: [
            'test/*.jsx'
        ],
        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-chrome-launcher'
        ],
        exclude: [],
        preprocessors: { 'test/*.jsx': ['webpack'] },
        reporters: [ 'progress' ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [ 'Chrome' ],
        singleRun: false,
        concurrency: Infinity
    })
}
