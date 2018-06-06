import path from 'path';

// 运行环境（代码的运行环境）运行环境分为'dev','test','prod'
// 运行环境不同于NODE_ENV，有些包会根据NODE_ENV选择是执行开发环境代码还是生产环境代码
// (NODE_ENV:包括'production',其余的为'not production')
// 所以有时候我们需要运行环境为'dev'或者'test'时，NODE_ENV都为'production'
const runEnv = process.env.RUN_ENV || 'production';

const config = {
    // 各环境公共的配置
    common: {
        distPath: './dist',
        rootDir: path.resolve(__dirname, '..'),
        includePaths: path.resolve(__dirname, '../src'),
    },

    // 本地开发环境
    dev: {
        port: 8887,
        host: '10.0.120.35',
        proxy: [{
            context: ['/bj/nangua/api/v1', '/sh/nangua/api/v1'],
            target: 'http://11.11.111.111',
            headers: {
                host: 'm.nangua.test.cn',
            },
        }],
        publicPath: '/',
        nodeEnv: 'dev',
    },

    // 远程测试环境
    test: {
        publicPath: '/xx/xxx/',
        nodeEnv: 'production',
    },

    // 线上生产环境
    production: {
        publicPath: '//static-xxx.file.xxx.com/projectname/',
        nodeEnv: 'production',
    },
};

export default Object.assign({}, config.common, config[runEnv]);
