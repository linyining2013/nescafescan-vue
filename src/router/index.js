

//http://www.cnblogs.com/coolslider/p/7074609.html
// const couponList = resolve => require(['@/pages/Coupon/couponList'], resolve);
// const coupon = resolve => require(['@/pages/Coupon/coupon'], resolve);
// const mine = resolve => require(['@/pages/Mine/mine'], resolve);
// const courseList = resolve => require(['@/pages/CourseList/list'], resolve);
// const categoryList = resolve => require(['@/pages/CategoryList/list'], resolve);
// const author = resolve => require(['@/pages/Author/author'], resolve);
// const payment = resolve => require(['@/pages/Payment/payment'], resolve);
// const InstituteNewmediamarketing = resolve => require(['@/pages/Invitation/Institute.newmediamarketing'], resolve);
// const InstituteNewmediamarketing_1 = resolve => require(['@/pages/Invitation/Institute.newmediamarketing.1'], resolve)
// const InstituteNewmediamarketing_2 = resolve => require(['@/pages/Invitation/Institute.newmediamarketing.2'], resolve)
// const InstituteNewmediamarketing_3 = resolve => require(['@/pages/Invitation/Institute.newmediamarketing.3'], resolve)
// const agreement = resolve => require(['@/pages/Agreement/agreement'], resolve);

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/index",
            name: "x-index",
            meta: {
                title: "短饮咖啡•集签起飞"
            },
            component: resolve => require(["@/pages/index"], resolve)
        },
        {
            path: "/rule",
            name: "x-rule",
            meta: {
                title: "短饮咖啡•集签起飞"
            },
            component: resolve => require(["@/pages/rules"], resolve)
        },
        // {
        //     path: "/accept",
        //     name: "x-accept",
        //     meta: {
        //         title: "短饮咖啡•集签起飞"
        //     },
        //     component: resolve => require(["@/pages/accept"], resolve)
        // },
        // {
        //     path: "/acceptindex",
        //     name: "x-acceptindex",
        //     meta: {
        //         title: "短饮咖啡•集签起飞"
        //     },
        //     component: resolve => require(["@/pages/acceptindex"], resolve)
        // },
        {
            path: "/share",
            name: "x-share",
            meta: {
                title: "短饮咖啡•集签起飞"
            },
            component: resolve => require(["@/pages/share"], resolve)
        },
        {
            path: "/red",
            name: "x-red",
            meta: {
                title: "短饮咖啡•集签起飞"
            },
            component: resolve => require(["@/pages/red"], resolve)
        },
        {
            path: "/",
            name: "x-ground",
            meta: {
                title: "短饮咖啡•集签起飞"
            },
            component: resolve => require(["@/pages/ground"], resolve)
        },
    ]
});


// Vue.use(Router);

// export default new Router({
//     routes: [
//         {

//             path: '/',
//             name: 'ground',
//             component: ground,
//         },
//         {
//             path: '/share',
//             name: 'share',
//             component: share,

//         },
//         {
//             path: '/index',
//             name: 'index',
//             component: Index,

//         },
//         {
//             path: '/list',
//             name: 'list',
//             component: list,

//         },
//         {
//             path: '/rules',
//             name: 'rules',
//             component: rules,

//         },
//         {
//             path: '/seckill',
//             name: 'seckill',
//             component: seckill,

//         },
//     ]
// });