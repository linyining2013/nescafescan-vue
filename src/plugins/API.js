// import Vue from 'vue';
import store from '../vuex/store';
import axios from 'axios';
import Qs from 'qs';
import _ from 'lodash';
import config from '../../config/config';


import {
    APIConfig
} from '../config';

// Vue.use(store);

let vm;
let identity;

/**
 * axios 默认配置
 */
let cancelAxios;
let CancelToken = axios.CancelToken;
// let sources = [];
const ApiDefaultOptions = {
    method: 'post',
    baseURL: process.env.NODE_ENV === 'development' ? APIConfig.prefix : '',
    timeout: 30000,
    transformRequest: [function (data) {
        return Qs.stringify(data, {
            arrayFormat: 'brackets'
        });
    }],
    showLoading: true,
    /* 是否自动显示loading，默认400ms */
    showLoadingDely: 400,
    /* 400ms后如果请求未完成则显示loading */
};


let APIloader = { iserror: true, num: 0, loader: [], error: [] };
let APIFactory = (url, options = {}) => {
    options = _.extend({
        url: url
    }, ApiDefaultOptions, options);
    return (data = {}, requestOptions = {}, ) => {
        if ((options.url.indexOf('SmallRecordLog/get.action') != -1) || (options.url.indexOf('Register/get.action') != -1)) {

        } else {

            data.identity = store.state.identity;
        }
        requestOptions = _.extend({}, options, requestOptions, {
            // cancelToken: new CancelToken((c) => {
            //     sources.push(c);
            // })
        });
        requestOptions.data = data;
        /**
         * 如果超过300ms的请求会显示loading
         */
        let loadingTimer = null;
        if (requestOptions.showLoading) {
            loadingTimer = setTimeout(() => {
                if (options.url.indexOf('Card/scan') != -1) {
                    vm.$super.loading.hide();
                } else {
                    vm.$super.loading.show();
                }
            }, options.showLoadingDely);
        }
        APIloader.loader[APIloader.loader.length] = true;
        APIloader.num = APIloader.loader.length;
        return axios(requestOptions).then((response) => {
            // console.log(options)
            loadingTimer && clearTimeout(loadingTimer);
            vm.$super.loading.hide();
            let data = response.data;

            if (APIloader.loader.length) {
                APIloader.loader.splice(0, 1);
                APIloader.iserror = false;
            }
            APIloader.error = [];

            if (options.url.indexOf('Qiniu/get') != -1) {
                return data;
            } else if (!options.customer) {
                if (options.url.indexOf('Card/scan') != -1) {
                    return data
                } else {

                    if (data.status === 1) {
                        return data
                    } else {
                        // 强行增加一个错误字段code 即有些变量e.name为接口的e.code
                        // var e = new Error('data.message'); //进入catch
                        // e.name = data.message == null ? e.name : data.message;
                        // throw e;
                        vm.$super.toast.text(data.message || data.code)
                        return data
                    }
                }
            } else { //七牛请求数据
                return data;
            }
        }, err => { //axios本身报错进入
            APIloader.error[APIloader.error.length] = true;
            loadingTimer && clearTimeout(loadingTimer);
            vm.$super.loading.hide();
            if (APIloader.error.length == APIloader.num && APIloader.iserror) {
                // console.log('显示网络错误页面');
                vm.$super.timeoutTip.show();
                throw new Error('');
            } else {
                throw err;
            }
        });
        // .catch(error => { //接口报错
        //     console.log(error) 
        // });
    };
};
const LOGIN_IP = 'http://192.168.10.97'; //测试外网http://121.40.28.189:81 内网http://192.168.0.8:80 正式外网http://120.55.151.61:80
// const LOGIN_IP = 'http://192.168.0.36:9104'; //测试外网http://121.40.28.189:81 内网http://192.168.0.8:80 正式外网http://120.55.151.61:80
// const LOGIN_IP = config.currentNet; //测试外网http://121.40.28.189:81 内网http://192.168.0.8:80 正式外网http://120.55.151.61:80
// const LOGIN_IP = 'http://a.super.cn/shanke'; //测试外网http://121.40.28.189:81 内网http://192.168.0.8:80 正式外网http://120.55.151.61:80
const api = 'https://help.super.cn/Web'
let API = {
    // sources: sources,
    APIFactory: APIFactory,
    getQiNiuToken: APIFactory(api + '/Qiniu/getQiNiuToken.action'),//getQiNiuToken
    getQiNiuInfo: APIFactory(api + '/Qiniu/getQiNiuInfo.action'),//
    scan: APIFactory(LOGIN_IP + '/Card/scan.action'),//扫字
    give: APIFactory(LOGIN_IP + '/Card/give.action'),// 赠送
    get: APIFactory(LOGIN_IP + '/Card/get.action'),// 领卡
    findStatus: APIFactory(LOGIN_IP + '/Card/findStatus.action'),// 查看剩余次数
    submit: APIFactory(LOGIN_IP + '/Register/get.action'),//领取红包
    SmallRecordLog: APIFactory(LOGIN_IP + '/SmallRecordLog/get.action'),//领取红包
    findCard: APIFactory(LOGIN_IP + '/Card/findCard.action'),//查看当前拥有的卡以及数量
    findCount: APIFactory(LOGIN_IP + '/Card/findCount.action'),//集齐人数
    Status: APIFactory(LOGIN_IP + '/Register/findStatus.action'),//查看刮分状态以及金额
    getState: APIFactory(LOGIN_IP + '/SmallPrize/getState.action'),//查看刮分状态以及金额
    Small: APIFactory(LOGIN_IP + '/Register/getState.action'),//查看刮分状态以及金额

};  //http://192.168.0.36:8084
export default API;
export let APIPlugin = {
    install(Vue) {
        vm = Vue;
        Vue.prototype.$API = API;
    }
}