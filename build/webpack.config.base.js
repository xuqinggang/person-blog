import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

import baseConfig from './baseConfig';

const resolve = dir => path.resolve(baseConfig.rootDir, dir);

const webpackBaseConf = {
    mode: 'production',
    entry: {
        index: resolve('src/index.js'),

        vendors: [
            'react-tap-event-plugin-fix',
        ],
    },

    output: {
        path: resolve(baseConfig.distPath),
        filename: 'js/[name].[hash:8].js',
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: Infinity,
            name: 'vendors',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
            },
        },
    },

    resolve: {
        // webpack去读取es目录下的代码需要使用jsnext:main字段配置的入口
        mainFields: ['main', 'jsnext:main'],
        // 配置模块库（通常是指node_modules）所在的位置
        // 默认的配置会采用向上递归搜索的方式去寻找node_modules，但通常项目目录里只有一个node_modules在项目根目录，为了减少搜索我们直接写明node_modules的全路径：
        modules: [resolve('node_modules')],
        extensions: ['.css', '.less', '.js', '.jsx', '.json'],
        alias: {
            shared: resolve('src/components/shared'),
            components: resolve('src/components'),
            pages: resolve('src/pages'),
            const: resolve('src/const'),
            reduxs: resolve('src/reduxs'),
            styles: resolve('src/styles'),
            utils: resolve('src/utils'),
            images: resolve('src/images'),
        },
    },

    plugins: [
        new webpack.ProvidePlugin({
            // ReactJS module name in node_modules folder
            React: 'react',
            // ReactDom module name in node_modules folder
            ReactDOM: 'react-dom',
        }),

        new ExtractTextPlugin({
            filename: 'css/[name].[hash:8].css',
        }),

        // 生成入口文件的公共模块
        // 多入口文件公共模块提取
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     filename: 'js/vendor/common.[hash:8].js',
        //     chunks: ['index', 'map'],
        // }),

        // 第三方库文件模块的生成
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendors',
        //     filename: 'js/vendor/vendor.[hash:8].js', // 生成的公共模块的存放路径

        //     // name: ['vendors', 'manifest'],
        //     // (随着 entry chunk 越来越多，
        //     // 这个配置保证没其它的模块会打包进 vendor chunk)
        //     minChunks: Infinity,
        // }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            chunks: ['vendors', 'index'], // 需要引入的chunk，不配置就会引入所有页面的资源
            inject: true,
            cache: true,
            minify: { //压缩HTML文件  
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            },
        }),
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                include: baseConfig.includePaths,
                loaders: [
                    {
                        // babel编译过程很耗时，好在babel-loader提供缓存编译结果选项，在重启webpack时不需要创新编译而是复用缓存结果减少编译流程。babel-loader缓存机制默认是关闭的
                        loader: 'babel-loader?cacheDirectory',
                    },
                ],
            },
            // assets rules
            {
                test: /\.(svg|eot|woff2?|ttf|otf)$/,
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    name: 'fonts/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    name: 'images/[name].[hash:8].[ext]',
                },
            },
        ],
    },
};

export default webpackBaseConf;
