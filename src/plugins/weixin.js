import Vue from 'vue';
// import _ from "lodash";
import API from "../plugins/API";
import utils from '@/plugins/methods';
import wx from "weixin-js-sdk";
// import jsuper from "exports-loader?jsuper!@/../node_modules/SuperBrowserLibs/dist/jsuperV2.js";

let normalIcon = "http://qiniu.myfriday.cn/o_1cb9v8i7g10lmkk41e7f1con9lmh.png",
    courseIcon = "http://qiniu.myfriday.cn/o_1bpdjbnn21i9lbag1lh8i0l1sfg7.png";

let shareData = {};
// let shareWeixinSessionConfig = {};
let weixin_event = ["onMenuShareTimeline", "onMenuShareAppMessage"];
let weixin = (function() {
    return /**  @lends Super.weixin */ {
        /**
         * 默认配置
         * @type {Object}
         *
         */
        setting: {
            /**
             * 请求微信signature的API
             * @type {String}
             */
            signatureApi: 'http://wx.super.cn/oauth2/api/wx/get_js_config.action',
            /**
             * 是否debug
             * @type {Boolean}
             */
            debug: false,
            /**
             * 微信API
             * @type {String[]}
             * @default ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'translateVoice', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard']
             */
            jsApiList: weixin_event,
            /**
             * 微信验证错误的回调函数
             */
            errorCallback: function() {}
        },
        init(data, options = {}) {
            let _self = this;

            if (data) {
                if (data.institute) {
                    shareData = { //训练营相关页面分享
                        title: "第二大学，由14家名企共同创办，首期仅招生200名",
                        desc: "从大学开始进入一流名企参观、工作实践，提升自己的能力",
                        link: window.location.origin + window.location.pathname + '?#/Institute/newmediamarketing',
                        imgUrl: normalIcon //分享的图片链接
                    }
                } else if (data.courseType == undefined) { //课程套餐
                    shareData = {
                        title: "第二大学系统化课程 | " + data.name,
                        desc: "行业顶尖名师体系化实战讲解，带你从零基础入门到精通",
                        link: window.location.href,
                        imgUrl: courseIcon //分享的图片链接
                    }
                } else { //课程 + 学习分享 => 统一分享单课程页面
                    shareData = { //训练营相关页面分享
                        title: "第二大学课程 | " + data.name,
                        desc: data.teacherName + ' | ' + (data.courseShortIntro || data.intro.replace(/<[^>]+>/g, "").substr(0, 100)),
                        link: options.href || window.location.href,
                        imgUrl: courseIcon //分享的图片链接
                    }
                }
            } else {
                shareData = {
                    title: "第二大学，从大学开始进入名企参观、工作实践。",
                    desc: "这里有企业总裁、高管的实战经验教学，行业顶尖的职场技能培训。",
                    link: window.location.origin + window.location.pathname + '?#/',
                    imgUrl: normalIcon //分享的图片链接
                }
            }

            // shareData = data ? data.institute ? {
            //     title: "第二大学，由14家名企联合创办，正式招生，仅限200人",
            //     desc: "从大学开始学习职场知识，进入企业参观学习,拓宽自己的眼界吧！",
            //     titleUrl: window.location.href,
            //     shareUrl: window.location.href,
            //     imgUrl: normalIcon //分享的图片链接
            // } : {
            //     title: "第二大学课程 | " + data.name,
            //     desc: data.courseShortIntro || data.intro.replace(/<[^>]+>/g, "").substr(0, 100),
            //     link: options.href || window.location.href,
            //     imgUrl: courseIcon, //分享的图片链接
            // } : {
            //     title: "第二大学，从大学开始进入名企参观、工作实践。",
            //     desc: "这里有企业总裁、高管的实战经验教学，行业顶尖的职场技能培训。",
            //     link: window.location.origin + window.location.pathname + '?#/',
            //     imgUrl: normalIcon //分享的图片链接
            // };


            // if (data && data.institute) {
            //     shareWeixinSessionConfig = _.extend({}, shareData, { title: '跟我一起报名第二大学，暑假去企业工作实践吧！' });
            // } else {
            //     shareWeixinSessionConfig = _.extend({}, shareData);
            // }

            if (utils.isWXBrowser && utils.isAndroid || utils.isIOS) {
                _self._getSignature();
            }
        },
        _getSignature() {
            let _self = this;
            API.APIFactory(_self.setting.signatureApi, {
                customer: true
            })({ url: window.location.href }).then(data => {
                if (data.code === 0) {
                    var config = data.data;
                    wx.config({
                        debug: _self.setting.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: config.appId, // 必填，公众号的唯一标识
                        timestamp: config.timestamp, // 必填，生成签名的时间戳
                        nonceStr: config.nonceStr, // 必填，生成签名的随机串
                        signature: config.signature, // 必填，签名，见附录1
                        jsApiList: _self.setting.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function() {
                        wx.onMenuShareAppMessage(shareData); //分享给朋友
                        wx.onMenuShareTimeline(shareData); //分享到朋友圈

                        // wx.getLocation({
                        //     //demo http://blog.csdn.net/docallen/article/details/70877925
                        //     //api http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding
                        //     //申请AK http://lbsyun.baidu.com/apiconsole/key
                        //     //<script type = "text/javascript" >
                        //     // 百度地图API功能
                        //     //function myFun(result) {
                        //     //    var cityName = result.name;
                        //     //    alert("当前定位城市:" + cityName);
                        //     //}
                        //     //var myCity = new BMap.LocalCity();
                        //     //myCity.get(myFun); 
                        //     //</script>
                        //     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                        //     success: function(res) {
                        //         var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        //         var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        //         var speed = res.speed; // 速度，以米/每秒计
                        //         var accuracy = res.accuracy; // 位置精度
                        //         alert(`latitude${latitude}longitude${longitude}`);
                        //     },
                        //     cancel: function(res) {
                        //         alert('用户拒绝授权获取地理位置');
                        //     }
                        // });
                    });
                    wx.error = function(res) {};
                } else {}
            });
        },
        onMenuShareAppMessage() {
            wx.onMenuShareAppMessage({
                title: shareData.title, // 分享标题
                desc: shareData.desc, // 分享描述
                link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareData.imgUrl, // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }

            });
        },
        onMenuShareTimeline() {
            wx.onMenuShareTimeline({
                title: shareData.title, // 分享标题
                link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareData.imgUrl, // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });
        },
    }
}())


export default weixin;

export let weixin_plugin = {
    install(Vue) {
        Vue.prototype.$weixin = weixin;
    }
}