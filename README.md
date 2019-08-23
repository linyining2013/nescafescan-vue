

2018/8/14 

- 去掉来自第二大学的一封信 src\App.vue 同时设置 setScroll，不然不能滚动
- 去掉广州地区的营销广告 src\pages\Home\me.vue
- 配置一个 config 文件 config\config.js
- 将package.json 中 "SuperBrowserLibs" 的value 从 git + ssh 改为 git + http。
- 修改代理 '/course',  原先代理用不了。 config\index.js
--- 


# super-course

> Super Course

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# Install report 额外引进
## postcss-color-function scss颜色编辑
    npm install postcss-color-function
    ex: color(red shade(20%)) color(red tint(20%))
    https://github.com/postcss/postcss-color-function
## vuex 安卓机显示空白页bug  需要安装 babel-polyfill
    npm install vuex --save
    vues 文档 http://blog.csdn.net/h5_queenstyle12/article/details/75386359
## vue-ga  百度统计 
    npm install vue-ba --save
    https://github.com/egoist/vue-ga
    http://blog.csdn.net/sinat_17775997/article/details/77890929
    http://blog.csdn.net/qq_38355456/article/details/77653747
## npm i babel-runtime -S


# router report
:XXX表示必填的任意值
域名 + 
首页：/#/
    --- 课程列表(default)： /#/
    --- 课程套餐：         /#/package
    --- 我的：            /#/me
优惠券：        /#/couponList
优惠券领取页面：/#/coupon/:couponId
分类列表：     /#/courseList/:categoryId/:categoryName
课程：        /#/course/:courseId
    --- 课程介绍(default)： /#/course/:courseId
    --- 课程章节：         /#/course/:courseId/section
    --- 课程点评：        /#/course/:courseId/comments
套餐：     /#/package/:comboId
    --- 套餐点评            /#/package/:comboId/comments
课程阅读：/#/learning/:courseId/:pageNo[1, ∞]
    --- 课程讨论    /#/learning/:courseId/:pageNo[1, ∞]/discuss

:pageNo[1, ∞]  这个是表示替换页码，后面[1, ∞]是区间
ep: http://192.168.10.233:9080/#/course/200/
    http://192.168.10.233:9080/#/learning/200/2/

```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

```
配置：
/config/index.js
build.assetsPublicPath: 配置静态资源打包路径： http://test.ke.super.cn/ 测试外网    http://qiniu-web.super.cn/olcourse/V2/  线上网

/config/config.js
prod线上    testprod测试外网    prod36内网36    dev个人本地网   ciphertext为本地域名

/src/plugins/API.js
LOGIN_IP配置

/src/pages/Author/author.vue
切换微信端测试外网以及正式网的appId
```
