'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.
// 参数说明： https://www.cnblogs.com/whkl-m/p/6627864.html
// 容量分析 http://alexkuz.github.io/webpack-chart/
// 优化打包 https://jeffjade.com/2017/08/06/124-webpack-packge-optimization-for-volume/#Webpack3-新功能-Scope-Hoisting
const path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'), // 使用 config/prod.env.js 中定义的编译环境
        index: path.resolve(__dirname, '../dist/index.html'), // 编译输入的 index.html 文件
        assetsRoot: path.resolve(__dirname, '../dist'), // 编译输出的静态资源路径
        assetsSubDirectory: 'static', // 编译输出的二级目录     // /jsuper2/superCourse/
        assetsPublicPath: 'http://qiniu-web.super.cn/olcourse/v2/', //  编译发布的根目录，可配置为资源服务器域名或 CDN 域名 http://qiniu-web.super.cn/olcourse/v2/  http://test.ke.super.cn/
        productionSourceMap: true, // 是否开启 cssSourceMap
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        host: '192.168.20.208',
        env: require('./dev.env'),
        port: process.env.PORT || 9080,
        autoOpenBrowser: false,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/course': {  
                target: 'http://192.168.0.8:80', 
                changeOrigin: true,
                pathRewrite: { 
                '^/course': 'http://192.168.0.8:80'  //http://ke.super.cn
                }
            },
            '/V2': 'http://192.168.0.8:80',
            '/SMS': 'http://192.168.0.8:80',
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}