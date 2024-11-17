const path = require('path')
const gasWebpackPlugin = require('gas-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

const SOURCE = path.resolve(__dirname, 'src')
const OUTPUT = path.resolve(__dirname, 'dist')

module.exports = (env, argv) => {

    const IS_DEVELOPMENT = argv.mode === 'development'

    return {
        entry: {
            index: path.resolve(SOURCE, 'index.ts'),
        },
        output: {
            path: path.resolve(OUTPUT),
            filename: 'index.gs',
        },
        devtool: IS_DEVELOPMENT ? 'inline-source-map' : IS_DEVELOPMENT,
        resolve: {
            extensions: ['*', '.js', '.ts'],
            modules: [
                path.resolve(__dirname, 'node_modules')
            ],
            alias: {
                '@': path.resolve(SOURCE),
            },
        },
        devServer: {
            open: true,
            static: {
                directory: OUTPUT,
                watch: true
            },
            historyApiFallback: true,
        },
        module: {
            rules: RULES
        },
        plugins: [
            new gasWebpackPlugin(),
            new copyWebpackPlugin({
                patterns: [
                    {
                        from: 'appsscript.json',
                        to: 'appsscript.json',
                        context: path.resolve('.', 'src')
                    },
                ]
            })
        ],
    }
}

const RULES = [
    {
        test: /\.(ts)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
    },
]