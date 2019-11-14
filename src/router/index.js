import Vue from 'vue';
import Router from 'vue-router';

import Index from "@/pages/index";
import list from "@/pages/list"; 
import rules from "@/pages/rules"; 
import seckill from "@/pages/seckill"; 

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



Vue.use(Router);

export default new Router({
    routes: [
        {

        path: '/',
        component: Index,
        children: [
            //     {
            //     path: 'list',
            //     component: list,
            //     children: [
            //     ]
            // },
            // {
            //     path: '',
            //     name: 'Home.me',
            //     component: me,
            //     meta: { keepAlive: true }
            // }
        ]
    },
        {
            path: '/list',
            name: 'list',
            component: list,
            
        },
        {
            path: '/rules',
            name: 'rules',
            component: rules,
            
        },
        {
            path: '/seckill',
            name: 'seckill',
            component: seckill,
            
        },
]
});