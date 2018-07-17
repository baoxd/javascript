const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: ['./index.js'],
    output: {
        path: path.join(__dirname, './'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.less', '.scss', '.css'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader"
                }]
            }
        ],
    },
    devServer: {
        port: 8080,
        contentBase: ".",
        hot: true,
        historyApiFallback: true,
        publicPath: "/",
        stats: {
            colors: true
        }
    }
}

