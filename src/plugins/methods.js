import Vue from 'vue';
import _ from "lodash";
import cookies from 'js-cookie';
import jsuper from "exports-loader?jsuper!@/../node_modules/SuperBrowserLibs/dist/jsuperV2.js";

var dateFormat = require('dateformat');

const ua = navigator.userAgent.toLowerCase(),
    isIOS = ua.match(/iphone|ipad|ipod/i),
    isAndroid = !isIOS,
    isSuperBrowser = !!~ua.indexOf('superfriday'),
    isWXBrowser = !!~ua.indexOf("micromessenger"),
    bbVersion = /superfriday_([\d\.]+)/ig.exec(ua) ? /SuperFriday_([\d\.]+)/ig.exec(ua)[1] : (isSuperBrowser ? '0' : '99999'),
    isLowVersion = bbVersion.replace(/\./g, '') * 1 >= 920;
const wordBreak = {
    title: { //h: 77, 
        line: 2,
        lh: 1.2,
        sz: 36,
        pw: 234 + 25,
        isoverflow: 1
    },
    orderTitle: { //h: 67, 
        line: 2,
        lh: 1.2,
        sz: 30,
        pw: 152 + 25,
        isoverflow: 1
    },
    packageIntroTitle: { //h: 77, 
        line: 2,
        lh: 1.4,
        sz: 34,
        isoverflow: 1
    },
    packageTitle: { //h: 62, 
        line: 2,
        lh: 1.4,
        sz: 26,
        pw: (118 + 20 + 25),
        isoverflow: 1
    }, //20 额外的padding
    packageTitleCurCourse: { // h: 62, 
        line: 1,
        lh: 1.4,
        sz: 26,
        pw: (118 + 20 + 25),
        isoverflow: 1
    }, //20 额外的padding
    detail: { //h: 56,
        line: 2,
        lh: 1.4,
        sz: 26,
        pw: 234 + 25,
        isoverflow: 1
    },
}
const normalIcon = "http://qiniu.myfriday.cn/WechatIMG14.jpeg",
    courseIcon = "http://qiniu.myfriday.cn/o_1bpdjbnn21i9lbag1lh8i0l1sfg7.png",
    weiboNormalIcon = "http://qiniu.myfriday.cn/WechatIMG14.jpeg", //"http://qiniu.myfriday.cn/o_1c0itq9p29o2vf8r201sli1puoc.png",
    weiboCourseIcon = "http://qiniu.myfriday.cn/o_1c0itqjfd1hogh1513781lq71119h.png";

let utils = {
    isIOS: isIOS,
    isAndroid: isAndroid,
    isSuperBrowser: isSuperBrowser,
    isWXBrowser: isWXBrowser,
    //获取url中的参数 
    cookie: {
        get: name => {
            let res = cookies.get(name);
            return res;
        },
        set: (name, val, options) => {
            let res = cookies.set(name, val, options);
            return res;
        }
    },
    getUrlParam: (name) => {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
        let r = window.location.search.substr(1).match(reg); //匹配目标参数  
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    },
    setShare: (data, options = {}) => {
        let platform = ["weixinTimeline", "weixinSession"],
            shareData = {};

        if (isSuperBrowser) {
            jsuper.browserConfig({
                data: {
                    openWithBrowser: 0, //是否允许外部浏览器打开
                    orientation: 1 //横竖屏,1竖屏,2横屏,3跟随手机方向
                }
            });

            if (isLowVersion && data && platform.length < 4) {
                platform.push("feed");
            }
            jsuper.shareItems({
                platform: platform
            });
                shareData = { //其余分享
                    title: "珊珂弹润好礼免费开抢",
                    content: "珊珂品牌日海量礼品就位，快来和朋友一起动动手指抢好礼叭！",
                    titleUrl: window.location.origin + window.location.pathname + '?#/',
                    shareUrl: window.location.origin + window.location.pathname + '?#/',
                    shareImgUrl: normalIcon, //分享的图片链接
                    icon: normalIcon //分享的图片链接
                }

            // var shareData = data ? data.institute ? {
            //     title: "第二大学，由14家名企联合创办，正式招生，仅限200人",
            //     content: "从大学开始学习职场知识，进入企业参观学习,拓宽自己的眼界吧！",
            //     titleUrl: window.location.href,
            //     shareUrl: window.location.href,
            //     shareImgUrl: normalIcon, //分享的图片链接
            //     icon: normalIcon //分享的图片链接
            // } : {
            //     title: "第二大学课程 | " + data.name,
            //     content: '这个课程还可以哦，组个队一起学习吧！',
            //     titleUrl: options.href || window.location.href,
            //     shareUrl: options.href || window.location.href,
            //     shareImgUrl: courseIcon, //分享的图片链接
            //     icon: courseIcon //分享的图片链接
            // } : {
            //     title: "第二大学，从大学开始进入名企参观、工作实践。",
            //     content: "这里有企业总裁、高管的实战经验教学，行业顶尖的职场技能培训。",
            //     titleUrl: window.location.origin + window.location.pathname + '?#/',
            //     shareUrl: window.location.origin + window.location.pathname + '?#/',
            //     shareImgUrl: normalIcon, //分享的图片链接
            //     icon: normalIcon //分享的图片链接
            // };

            // jsuper.shareWeiboConfig(
            //     _.extend({}, shareData, {
            //         content: shareData.title + "网页链接地址" + shareData.titleUrl,
            //         // imgUrl: "http://qiniu.myfriday.cn/o_1c01beo8r1t8t1fs91hat1v1n1983m.jpg",
            //         shareImgUrl: data ? data.institute ? weiboNormalIcon : weiboCourseIcon : weiboNormalIcon,
            //         // 
            //     })
            // ); //微博
            jsuper.shareWeixinTimelineConfig(shareData); //微信朋友圈

            // let shareWeixinSessionConfig = data ? data.institute ? _.extend({}, shareData, { title: '跟我一起报名第二大学，暑假去企业工作实践吧！' }) : shareData : shareData;

            jsuper.shareWeixinSessionConfig(shareData); //微信好友
            isLowVersion && data && jsuper.shareFeedConfig(_.extend({}, shareData, { content: shareData.title })); //Feed流
        }
    },
    deepLinkTo() {
        if (!isSuperBrowser) {
            let encodeUrl = encodeURIComponent(window.location.href),
                androidUrl = `xtuonefriday://redirectUrl?url=${encodeUrl}`,
                defaultUrl = `https://deeplink.super.cn?action=redirectUrl&url=${encodeUrl}`;

            window.location.href = isIOS ? defaultUrl :
                isWXBrowser ? `http://a.app.qq.com/o/simple.jsp?pkgname=com.xtuone.android.syllabus&android_schema=${encodeURIComponent(androidUrl)}` : androidUrl;
            !isIOS && setTimeout(() => {
                isWXBrowser ? '' : window.location.href = defaultUrl;
            });
        }
    },
    setIssueTime: (date, format = 'yyyy/mm/dd') => {
        return dateFormat(date, format);
    },
    dateFormat: (date, format = 'yyyy/mm/dd') => {
        return dateFormat(date, format);
    },
    setWordBreak: (param) => {
        // self, line, isActive,sz
        // var wordBreak = this.wordBreak;
        var isBoole = param.isBoole || 0;
        var txt = param.text;
        if (txt) {
            var type = param.type,
                typeObj = wordBreak[type],
                bw = document.body.clientWidth,
                // h = (typeObj.h / 75 * bw / 10).toFixed(3), //rem => px 换算
                w = bw - (((35 + 35 + (param.width || typeObj.pw)) / 75 * bw / 10)), //35 外层padding， 25 文字marginRight， 234 图片宽度 param.width//课程标签额外宽度
                line = typeObj.line,
                foneSize = (typeObj.sz / 75 * bw / 10) / 2, //单字节宽度
                len = txt.replace(/[^\x00-\xff]/g, "01").length, //双字节换算为单字节的长度
                max = parseInt(w * line / foneSize);

            // if (h > lineHeight) { //行高大于一行
            if (len >= max) { //大于最大字数
                txt = txt.substring(0, parseInt(max / 2) - 2) + (typeObj.isoverflow == 1 ? '..' : '')
            } else {
                if (isBoole == 1) {
                    return true;
                }
            }
            // }
        }
        return isBoole == 1 ? false : txt;
    },
};
export default utils;
export let utils_plugin = {
    install(Vue) {
        Vue.prototype.$utils = utils;
        // Vue.prototype.$weixin = weixin;
    }
}