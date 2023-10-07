const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const fileExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "eot",
    "otf",
    "svg",
    "ttf",
    "woff",
    "woff2",
];

module.exports = {
    mode: "production",
    entry: {
        popup: path.join(__dirname, "..", "src", "popup.tsx"),
        background: path.resolve(__dirname, "..", "src", "background.ts"),
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].js",
        clean: true,
        assetModuleFilename: '[name][ext]',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /(\.css$)/,
                use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader'],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 1000,
                        },
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: new RegExp(".(" + fileExtensions.join("|") + ")$"),
                use: [
                    {
                        loader: "file-loader?",
                        options: {
                            name: "name=[name].[ext]",
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: ".", context: "public" }],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
};