import Vue from 'vue';
import Vuex from 'vuex';
// import cookies from 'js-cookie';
import utils from '@/plugins/methods';
// import { test } from '@/plugins/methods';
import jsuper from 'exports-loader?jsuper!@/../node_modules/SuperBrowserLibs/dist/jsuperV2.js';
import config from '../../config/config';
Vue.use(Vuex);
/**
 * checkBuy
 * 是否登陆之后检查用户是否购买 
 * 1获取购买状态
 * 2询问购买状态
 * 0忽略
 **/
const store = new Vuex.Store({
    state: {
        identity: '',
        secKill:false,
        startTime:'2019/09/12 17:00:00',
        endTime:'2019/09/12 23:59:59',
        info:false
        // checkBuy: utils.cookie.get("checkBuy") || 0,
    },
    getters: { //获取对应值之前进行的一步计算 
        // count:function(state){
        //     return state.count +=100;
        // }
        secKillGet:state=>{
            var inte= setInterval(() => {
                if (new Date(state.startTime).getTime() <= new Date().getTime() && new Date(state.endTime).getTime() >= new Date().getTime()) {
                    
                        return true;
                } else {
                    clearInterval(inte)
                    return false;
                }
            }, 1000);
        }

    },
    mutations: { //在vue 中，只有mutation 才能改变state.
        setUnReadNum(state, info) {
            // console.log(info);
            // var date = new Date().getTime()
            // var time1 = new Date(state.startTime).getTime();
            // var time2 = new Date(state.endTime).getTime();
          
            // if (time1 <= date && time2 >= date){
            //     if(info){
            //         state.secKill = info; 
            //     }
            // }else{
            //     state.secKill = false;
            // }
            var inte = setInterval(() => {
                if (new Date(state.startTime).getTime() <= new Date().getTime() && new Date(state.endTime).getTime() >= new Date().getTime()) {

                    state.secKill = true;
                } else {
                    clearInterval(inte)
                    state.secKill = false;
                }
            }, 1000);
        },
        setId(state, i) {
            state.identity = i;
        },
        // setCheckBuy(state, i) {
        //     state.checkBuy = i;
        // },
    },
    actions: {
        updateUnReadNum({ commit }, info) {
            commit('setUnReadNum', info);
        },
       
        login({ commit }) {
            return new Promise((resolve, reject) => {
                if (utils.isSuperBrowser) {
                    jsuper.config({
                        // ciphertext: window.location.host.indexOf('192.168.0.36') != -1 ? '2f234e371fba2bb3acd3681c99600950' : 'e24bd0485b057280f7ab39ec2f5b3aba',
                        ciphertext: config.ciphertext,
                        //95f1a701018006747e4e5734311cfa3c..a6234a71e54c20476bfcf17aed569d69..87bbbe833e2e1c7f3c7af1643052f63a..2f234e371fba2bb3acd3681c99600950..398372824acd5ccfe8becf2ba66baa51
                        // debug: 1,
                        success: function () {

                            jsuper.userInfo({
                                success: function (data) {
                                    commit('setId', data.identity);
                                    resolve(data.identity);
                                }
                            });
                        },
                        fail: function () {
                            alert('登录失败，请稍后再试。');
                        }
                    });
                } else { //非表表浏览器
                    let identity = utils.cookie.get('identity') || '566012E6330102932B67EC82A2A21992';

                    // if ($utils.isWXBrowser) { //微信浏览器

                    // } else {
                    commit('setId', identity);
                    resolve(identity); //38D98D45BF5FD7408CFF368AA4088595 4BC1923F6BF52D6B4A9F3C99CF9F4249 566012E6330102932B67EC82A2A21992
                    // resolve(identity); //38D98D45BF5FD7408CFF368AA4088595 4BC1923F6BF52D6B4A9F3C99CF9F4249 566012E6330102932B67EC82A2A21992

                    // }
                    return;
                }
            })
        }
    }
});

export default store;