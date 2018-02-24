const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        './app.js'
    ],
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            }
        ]
    }
}