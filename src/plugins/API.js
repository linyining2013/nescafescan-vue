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

/**
 * API 工厂方法。
 * 
 * @param url 链接
 * @param options 配置
 */

// if (from.name != null) {
//     console.log(API.cancelAxios);
//     API.cancelAxios && API.cancelAxios('操作取消');
// }
// http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     });

// axios.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:
//                     break;
//                 case 403:
//                     break;
//                 case 504:
//                     break;
//                 case 500:
//                     //store.dispatch(types.AJAX_ERROR,500);
//                     break;
//                 case 404:
//                     //store.dispatch(types.AJAX_ERROR,404);
//                     break;
//             }
//         }
//         console.log(1)
//         console.log(JSON.stringify(error)); //console : Error: Request failed with status code 402
//         return Promise.reject(error.response.data)
//     });

let APIloader = { iserror: true, num: 0, loader: [], error: [] };
let APIFactory = (url, options = {}) => {
    options = _.extend({
        url: url
    }, ApiDefaultOptions, options);
    return (data = {}, requestOptions = {}, ) => {
        // data.identity = store.state.identity;
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
                vm.$super.loading.show();
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
            
             if(options.url.indexOf('Qiniu/get')!=-1){
                return data;
            } else if (!options.customer) {
                if (data.status === 1 ) {
                    return data
                } else {
                    // 强行增加一个错误字段code 即有些变量e.name为接口的e.code
                    // var e = new Error('data.message'); //进入catch
                    // e.name = data.message == null ? e.name : data.message;
                    // throw e;
                    vm.$super.toast.text(data.message || data.code)
                    return data
                }
            }else { //七牛请求数据
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
const LOGIN_IP = 'http://192.168.0.36:9109'; //测试外网http://121.40.28.189:81 内网http://192.168.0.8:80 正式外网http://120.55.151.61:80
// const LOGIN_IP = 'http://a.super.cn/shanke'; //测试外网http://121.40.28.189:81 内网http://192.168.0.8:80 正式外网http://120.55.151.61:80
const api = 'http://help.super.cn/Web'
let API = {
    // sources: sources,
    APIFactory: APIFactory, 
    getQiNiuToken: APIFactory(api + '/Qiniu/getQiNiuToken.action'),//getQiNiuToken
    getQiNiuInfo: APIFactory(api + '/Qiniu/getQiNiuInfo.action'),//
    sign: APIFactory(LOGIN_IP + '/Student/sign.action'),//报名入口，用于判断是否第一次进入
    getPrize: APIFactory(LOGIN_IP + '/Prize/getPrize.action'),//获取用户获奖详情
    kill: APIFactory(LOGIN_IP + '/Prize/kill.action'),//秒杀
    like: APIFactory(LOGIN_IP + '/LikeLog/like.action'),//点赞
    submit: APIFactory(LOGIN_IP + '/Shows/submit.action'),//确认上传图片
    getList: APIFactory(LOGIN_IP + '/Shows/getList.action'),//获取最新列表
    getListOrderByLike: APIFactory(LOGIN_IP + '/Shows/getListOrderByLike.action'),//获取最热列表
    // getCourseDetail: APIFactory(config.currentNet+'/Course/getCourseDetail.action'),
    // getMyCouponList: APIFactory('/CJ/V1/Coupon/myList.action'),
    // indexCourse: APIFactory(config.currentNet+'/Course/index.action'),
    // getCourseByCategoryId: APIFactory(config.currentNet+'/Course/getCourseByCategoryId.action'), //根据分类获课程列表
    // getCommentByCourseIdPage: APIFactory('/Evaluate/getCommentByCourseIdPage.action'),
    // G4CouponDetail: APIFactory('/CJ/V1/Coupon/G4Detail.action'),
    // receiveCoupon: APIFactory('/CJ/V1/Coupon/receive.action'),
    // getAllCombo: APIFactory('/Combo/getAllCombo.action'), //获取所有套餐
    // getAllCourse: APIFactory(config.currentNet+'/Course/getAllCourse.action'), //获取所有课程
    // getDetailCombo: APIFactory('/Combo/getDetail.action'), //获取课程包所有课程
    // getComboEvaluateList: APIFactory('/Combo/Evaluate/getList.action'), //获取套餐评论列表
    // getMyCourses: APIFactory(config.currentNet+'/Course/getMyCourses.action'), //获取我的课程
    // getMyCoursesV2: APIFactory(config.currentNet+'/Course/getMyCoursesV2.action'), //获取我的课程V2
    // getMyUnfinishedCourses: APIFactory(config.currentNet+'/Course/getMyUnfinishedCourses.action'), //我的课程列表-未完成
    // getDetailByCourseId: APIFactory('/Sectioin/getDetailByCourseId.action'), //获取购买课程内容
    // findAuditionByCourseId: APIFactory('/Sectioin/findAuditionByCourseId.action'), //获取试听课程内容
    // getDiscussByCourseIdPage: APIFactory('/Evaluate/getDiscussByCourseIdPage.action'), //获取课程讨论
    // addEvaluate: APIFactory('/Evaluate/addEvaluate.action'), //增加课程讨论 //评论课程
    // saveOrUpdae: APIFactory('/LearnProgress/saveOrUpdae.action'), //增加或者修改学习进度
    // addLike: APIFactory('/Like/addLike.action'), //课程点赞
    // isScore: APIFactory('/Score/isScore.action'), //获取评分
    // isEvaluateOfComment: APIFactory('/Evaluate/isEvaluateOfComment.action'), //获取评分
    // addScore: APIFactory('/Score/save.action'), //评分课程
    // getCoursesByRecommend: APIFactory(config.currentNet+'/Course/getCoursesByRecommend.action'), //获取推荐课程
    // finshCourse: APIFactory('/LearnProgress/finshCourse.action'), //结束课程
    // registerForH5: APIFactory(LOGIN_IP + '/V2/StudentSkip/registerForH5.action', { baseURL: '' }), //站外注册
    // loginForH5: APIFactory(LOGIN_IP + '/V2/StudentSkip/loginForH5.action', { baseURL: '' }), //站外登陆/SMS/getRegisterCaptchaForH5.action

    // bindWXForH5: APIFactory(LOGIN_IP + '/V2/StudentSkip/bindWXForH5.action', { baseURL: '', customer: true }), //H5-绑定账号时获取验证码
    // getBindCaptchaForH5: APIFactory(LOGIN_IP + '/V2/SMS/getBindCaptchaForH5.action', { baseURL: '' }), //H5-绑定账号时获取验证码
    // getRegisterCaptchaForH5: APIFactory(LOGIN_IP + '/V2/SMS/getRegisterCaptchaForH5.action', { baseURL: '' }), //注册获取手机验证码
    // getWXBBUserInfo: APIFactory(LOGIN_IP + '/api/wx/get_user_info.action', { baseURL: '' }), //，没用
    // // getWXBBUserInfo: APIFactory('http://121.40.28.189:8090/SuperWx/api/wx/get_user_info.action', { baseURL: '', customer: true }),
    // getUserBindWXInfo: APIFactory(LOGIN_IP + '/V2/StudentSkip/getUserBindWXInfo.action', { baseURL: '', customer: true }), //根据微信openID及unionID获取用户信息

    // updateAuthInfo: APIFactory('/Third/updateAuthInfo.action'), //公众号授权信息记录
    // get_user_info: APIFactory('http://wx.super.cn/oauth3/api/wx/get_user_info.action', { baseURL: '', customer: true }), //获取微信个人信息
    // orderPreCreate: APIFactory('/CJ/V1/Order/preCreate.action'),
    // getSellPriceX: APIFactory('/CJ/V1/Order/getSellPriceX.action'),
    // orderCreate: APIFactory('/CJ/V1/Order/create.action'),
    // checkPayStatus: APIFactory('/CJ/V1/Order/checkPayStatus.action'),
    // create4Free: APIFactory('/CJ/V1/Order/create4Free.action'), //生成免费订单
    // getMyOrders: APIFactory('/CJ/V1/Order/getMyOrders.action'), //我的订单列表
    // getPayWays: APIFactory('/CJ/V1/Order/getPayWays.action'), //获取支付方式
    // cancelOrder: APIFactory('/CJ/V1/Order/cancel.action'), //订单取消
    // dualCreate: APIFactory('/CJ/V1/Order/dualCreate.action'), //重新支付
    // getStudentInfo: APIFactory(config.currentNet+'/Student/getInfo.action'), //学生信息
    // addRecord: APIFactory('/Record/add.action'), //进度存储
    // bannerPush: APIFactory(config.currentNet+'/Course/bannerPush.action'), //banner推送
    // getOrderDetail: APIFactory('/CJ/V1/Order/getDetail.action'), //订单信息
    // getComboDetailV2: APIFactory('/Combo/getDetailV2.action'), //套餐（包含训练营）回顾
    // getCreditDetailList: APIFactory('/Credit/getCreditDetailList.action'), //套餐的学分获取
    // getSchoolsByName: APIFactory('/Setting/Edu/getSchoolsByName.action'), //搜索学校
    // getSchoolAcademies: APIFactory('/Setting/Edu/getSchoolAcademies.action'), //返回学校的所有学院
    // getProvinceCities: APIFactory('/Setting/Address/getProvinceCities.action'), //搜索城市
    // getAllProvinces: APIFactory('/Setting/Address/getAllProvinces.action'), //搜索城市
    // addSelfAndEdu: APIFactory('/Student/addSelfAndEdu.action'), //学籍信息填写（第一次填写）
    // getIndexPushCourses: APIFactory(config.currentNet+'/Course/getIndexPushCourses.action'), //首页热门课程列表
    // getMySchoolRollInfo: APIFactory('/Student/getMySchoolRollInfo.action'), //我的学籍资料-完整
    // saveExtra: APIFactory('/Student/saveExtra.action'), //个人信息修改
    // editEdu: APIFactory('/Student/editEdu.action'), //教育经历编辑-单个
    // getTipsUnReadNum: APIFactory('/Tips/getTipsUnReadNum.action'), //未读的通知数量
    // updateTipsReadRecord: APIFactory('/Tips/updateTipsReadRecord.action'), //消息通知阅读上报
    // newGetIdentity: APIFactory('/Student/wx/getIdentity.action'), // 新增的api 获取identity
    // createWxStudent: APIFactory('/Student/wx/create.action'),   //新增的api 创建微信独立账号
};  //http://192.168.0.36:8084
// export function fetch(url, options) {

//     var opt = options || {}
//     return new Promise((resolve, reject) => {
//         axios({
//             method: opt.type || 'post',
//             url: url,
//             params: opt.params || {},
//             // 判断是否有自定义头部，以对参数进行序列化。不定义头部，默认对参数序列化为查询字符串。
//             data: (opt.headers ? opt.data : JSON.stringify(opt.data)) || {},
//             responseType: opt.dataType || 'json',
//             // 设置默认请求头
//             headers: opt.headers || { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
//         }).then(response => {
//             let data = response.data;
//             if (data.status === 1) {
//                 resolve(data.data)
//             } else {
//                 reject(response)
//             }
//         }).catch(error => {
//             console.log(2)
//             console.log(error)
//         })
//     });
// }
export default API;
export let APIPlugin = {
    install(Vue) {
        vm = Vue;
        Vue.prototype.$API = API;
    }
}