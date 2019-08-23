// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/store';
import ba from 'vue-ba';
import './polyfill';
import '@/components/index';
import utils, { utils_plugin } from '@/plugins/methods';
import { weixin_plugin } from '@/plugins/weixin';
import { ToastPlugin, LoadingPlugin, ShareTipPlugin, TimeoutTipPlugin, ModalTipPlugin } from '@/plugins/SUI';
// import jsuper from "exports-loader?jsuper!@/../node_modules/SuperBrowserLibs/dist/jsuperV2.js";
Vue.config.productionTip = false;
import API, { APIPlugin } from '@/plugins/API'

/* eslint-disable no-new */
Vue.use(store);
Vue.use(utils_plugin);
Vue.use(weixin_plugin);
Vue.use(ToastPlugin);
Vue.use(ShareTipPlugin);
Vue.use(TimeoutTipPlugin);
Vue.use(LoadingPlugin);
// Vue.use(BuyTipPlugin);
Vue.use(ModalTipPlugin);
Vue.use(APIPlugin);

/**
 * ba 百度统计
 */
Vue.use(ba, { siteId: 'b289f6a5b8682eecf3f6566639c6669a', src: 'https://hm.baidu.com/hm.js?b289f6a5b8682eecf3f6566639c6669a' })

/**
 * Event Bus
 */

let EventBus = new Vue();
Vue.prototype.$bus = EventBus;

store.dispatch('login').then((identity) => {
    router.beforeEach((to, from, next) => { //12.1 暂时去除站外登陆
        if (utils.isWXBrowser) { //微信浏览器
            if (to.path == '/author' && store.state.user.id) {
                next('/');
                return false;
            }

            let author = utils.getUrlParam('author');
            store.dispatch('getOpenId').then((openid) => {
                if ((!openid) && to.path != '/author' && !author) {
                    // 第一次进入项目
                    utils.cookie.set("beforeLoginUrl", to.fullPath) // 保存用户进入的url
                    next('/author')
                        // window.location.replace(window.location.href + 'author');
                    return false
                } else if (author == 1 && (!openid)) {
                    next('/author');
                    // window.location.replace(window.location.href + 'author');
                    return false
                        //有openid
                } else if (openid) {
                    //http://blog.csdn.net/liufeng520/article/details/51354741
                    //bug 处理微信 购买  --  链接添加？
                    // let paths = window.location.href.split("#");
                    // paths[1] = paths[1] || "/";
                    // // 老式的#!分隔跳转
                    // if (paths[0].charAt(paths[0].length - 1) !== "?") {
                    //     paths[0] = `${paths[0]}?`;
                    // }
                    // if (paths[1].charAt(0) === "!") {
                    //     paths[1] = paths[1].substr(1);
                    // }

                    // let url = `${paths[0]}#${paths[1]}`;
                    // if (window.location.href !== url) {
                    //     window.location.href = url;
                    // }

                    //bug 添加？让微信识别为传参，而不是锚点，否则会有提示 ke.super.cn/#/不是注册域名
                    let paths = window.location.href.split("#");
                    paths[1] = paths[1] || "/";

                    if (paths[0].indexOf('?') == -1) {
                        paths[0] = `${paths[0]}?`;
                    }
                    let url = `${paths[0]}#${paths[1]}`;
                    if (window.location.href !== url) {
                        window.location.href = url;
                        // window.location.replace(url);
                    }
                    // else { //木有unionid 或者identity 
                    //if (!store.state.user.unionid || !store.state.identity) 
                    // API.get_user_info({ openId: openid }).then(

                    // );

                    // }
                }
            })
        }

        if (to.path) { //百度统计
            // _hmt.push(['_trackPageview', '/#' + to.fullPath]);
            ba.trackPageview('/#' + to.fullPath);
        }
        next();
    });
    new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: {
            App
        }
    });
})

// Vue.prototype.$jsuper = jsuper;
// Vue.directive('title', {
//     inserted: function(el, binding) {
//         document.title = el.dataset.title;
//         //以下代码可以解决以上问题，不依赖jq
//         // setTimeout(function() {
//         //     //利用iframe的onload事件刷新页面
//         //     document.title = el.dataset.title;
//         //     var iframe = document.createElement('iframe');
//         //     iframe.style.visibility = 'hidden';
//         //     iframe.style.width = '1px';
//         //     iframe.style.height = '1px';
//         //     iframe.onload = function() {
//         //         setTimeout(function() {
//         //             document.body.removeChild(iframe);
//         //         }, 0);
//         //     };
//         //     document.body.appendChild(iframe);
//         // }, 0);
//     }
// })
// setAPIIdentity(123);
// new Vue({
//     el: '#app',
//     router,
//     store,
//     template: '<App/>',
//     components: {
//         App
//     }
// });
// router.onReady(function() {
// login().then(identity => {
//     setAPIIdentity(identity);
//     Vue.prototype.$super = {
//         identity: identity
//     };
//     new Vue({
//         el: '#app',
//         router,
//         template: '<App/>',
//         components: {
//             App
//         }
//     });
// })