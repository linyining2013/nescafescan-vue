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
        // checkBuy: utils.cookie.get("checkBuy") || 0,
        user: {
            WXaccount: '',
            openid: '', //!utils.isWXBrowser ? -1 : '',//
            unionid: '', //!utils.isWXBrowser ? -1 : '',//
            unReadNum: 0,
            data: {},
            nickname: '',
            avatarUrl: '',
            gender: 0
        },
        orderTip: true,
        courseInfo: null,
        // orderInfo: null
    },
    getters: { //获取对应值之前进行的一步计算
        // count:function(state){
        //     return state.count +=100;
        // }
    },
    mutations: { //在vue 中，只有mutation 才能改变state.
        setUnReadNum(state, info) {
            state.user.unReadNum = info;
        },
        setCourseInfo(state, info) {
            state.courseInfo = info;
        },
        setOrderTip(state, i) {
            state.orderTip = i;
        },
        setId(state, i) {
            state.identity = i;
        },
        // setCheckBuy(state, i) {
        //     state.checkBuy = i;
        // },
        setWXaccount(state, i) {
            state.user.WXaccount = i;
        },
        setUnionId(state, i) {
            state.user.unionid = i;
        },
        setOpenId(state, i) {
            state.user.openid = i;
        },
        setUserinfo(state, info) {
            state.user.data = info;
        },
        setStudentInfo(state, info) {
            state.user.data.student = info;
        },
        setEduInfo(state, info) {
            state.user.data.studentEduBOs = info;
        },
        setStudentNo(state, info) {
            if (!state.user.data.student) {
                state.user.data.student = {};
            }
            state.user.data.student.studentNo = info;
        },
        setNickname(state, info) {
            state.user.nickname = info;
        },
        setAvatarUrl(state, info) {
            state.user.avatarUrl = info;
        },
        setGender(state, i) {
            state.user.gender = i;
        }
    },
    actions: {
        updateCourseInfo({ commit }, info) {
            commit('setCourseInfo', info);
        },
        updateUnReadNum({ commit }, info) {
            commit('setUnReadNum', info);
        },
        updateStudentNo({ commit }, info) {
            commit('setStudentNo', info);
        },
        updateUserinfo({ commit }, info) {
            commit('setUserinfo', info);
        },
        updateStudentInfo({ commit }, info) {
            commit('setStudentInfo', info);
        },
        updateStudentInfo({ commit }, info) {
            commit('setStudentInfo', info);
        },
        updateEduInfo({ commit }, info) {
            commit('setEduInfo', info);
        },
        updateOrderTip({ commit }, i) {
            commit('setOrderTip', i);
        },

        updateId({ commit }, identity) {
            commit('setId', identity);
        },
        // updateCheckBuy({ commit }, i) {
        //     // if (utils.cookie.get("checkBuy")) {
        //     //     utils.cookie.set("checkBuy", i);
        //     // }
        //     commit('setCheckBuy', i);
        // },
        updateGender({ commit }, i){
            commit('setGender', i);
        },
        updateNickname({ commit }, info){
            commit('setNickname', info);
        },
        updateAvatarUrl({ commit }, info){
            commit('setAvatarUrl', info);
        },
        updateWXaccount({ commit }, id) {
            commit('setWXaccount', id);
        },
        updateUnionId({ commit }, id) {
            commit('setUnionId', id);
        },
        updateOpenId({ commit }, id) {
            commit('setOpenId', id);
        },
        getOpenId({ commit }) {
            return new Promise((resolve, reject) => {
                let id = this.state.user.openid;
                if (id) {
                    resolve(id);
                } else {
                    id = utils.cookie.get('openid');
                    id && commit('setOpenId', id);
                    resolve(id);
                }
            });
        },
        login({ commit }) {
            return new Promise((resolve, reject) => {
                if (utils.isSuperBrowser) {
                    jsuper.config({
                        // ciphertext: window.location.host.indexOf('192.168.0.36') != -1 ? '2f234e371fba2bb3acd3681c99600950' : 'e24bd0485b057280f7ab39ec2f5b3aba',
                        ciphertext: config.ciphertext,
                        //95f1a701018006747e4e5734311cfa3c..a6234a71e54c20476bfcf17aed569d69..87bbbe833e2e1c7f3c7af1643052f63a..2f234e371fba2bb3acd3681c99600950..398372824acd5ccfe8becf2ba66baa51
                        // debug: 1,
                        success: function() {
                    
                            jsuper.userInfo({
                                success: function(data) {
                                    commit('setId', data.identity);
                                    resolve(data.identity);
                                }
                            });
                        },
                        fail: function() {
                            alert('登录失败，请稍后再试。');
                        }
                    });
                } else { //非表表浏览器
                    let identity = utils.cookie.get('identity') || '';

                    // if ($utils.isWXBrowser) { //微信浏览器
                    
                    // } else {
                    commit('setId', identity);
                    resolve(identity); //38D98D45BF5FD7408CFF368AA4088595 4BC1923F6BF52D6B4A9F3C99CF9F4249 566012E6330102932B67EC82A2A21992

                    // }
                    return;
                }
            })
        }
    }
});

export default store;