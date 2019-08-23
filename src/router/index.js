import Vue from 'vue';
import Router from 'vue-router';

import CourseRouter from './course';
import HomeRouter from './Home';
import PackageRouter from './Package';
import loginRouter from './login';
import learningRouter from './learning';
import orderRouter from './order';
import practiceRouter from './practice';
import schoolRollRouter from './schoolRoll';

import couponList from '@/pages/Coupon/couponList';
import coupon from '@/pages/Coupon/coupon';
import courseList from '@/pages/CourseList/list';
import categoryList from '@/pages/CategoryList/list';
import author from '@/pages/Author/author';
import mine from '@/pages/Mine/mine';
import payment from '@/pages/Payment/payment';
import InstituteNewmediamarketing from '@/pages/Invitation/Institute.newmediamarketing';
import InstituteNewmediamarketing_1 from '@/pages/Invitation/Institute.newmediamarketing.1';
import InstituteNewmediamarketing_2 from '@/pages/Invitation/Institute.newmediamarketing.2';
import InstituteNewmediamarketing_3 from '@/pages/Invitation/Institute.newmediamarketing.3';
import InstituteSchoolCard from '@/pages/Invitation/schoolCard';

import agreement from '@/pages/Agreement/agreement';
import invitation from '@/pages/Invitation/invitation';
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
    /**** 
        mode: 'history', 
        去除#  
        https://www.cnblogs.com/zhuzhenwei918/p/6892066.html  
        需要后端支持 
        https://router.vuejs.org/zh-cn/essentials/history-mode.html
    ***/
    // scrollBehavior: () => ({ y: 0 }), //更新router返回顶部
    routes: [
        ...HomeRouter,
        ...CourseRouter,
        ...PackageRouter,
        ...loginRouter,
        ...learningRouter,
        ...orderRouter,
        ...practiceRouter,
        ...schoolRollRouter,
        { //优惠券列表
            path: '/couponList',
            name: 'couponList',
            component: couponList,
        }, { //优惠券领取页面
            path: '/coupon/:cpIde',
            name: 'coupon',
            component: coupon,
        },
        { //我的课程页面
            path: '/mine',
            name: 'mine',
            component: mine,
        },
        { //课程列表
            path: '/courseList/:id',
            name: 'courseList',
            component: courseList,
        },
        { //分类列表
            path: '/categoryList',
            name: 'categoryList',
            component: categoryList,
        },
        { //微博验证页面
            path: '/author',
            name: 'author',
            component: author,
        },
        { //邀请函
            path: '/invitation',
            name: 'invitation',
            component: invitation,
        },
        { //第二大学介绍
            path: '/Institute/newmediamarketing',
            component: InstituteNewmediamarketing,
            children: [{
                    path: '',
                    name: 'Institute.newmediamarketing.1',
                    component: InstituteNewmediamarketing_1
                },
                {
                    path: '2',
                    name: 'Institute.newmediamarketing.2',
                    component: InstituteNewmediamarketing_2
                },
                {
                    path: '3',
                    name: 'Institute.newmediamarketing.3',
                    component: InstituteNewmediamarketing_3
                }
            ]
        },
        { //第二大学介绍
            path: '/Institute/schoolCard',
            component: InstituteSchoolCard,
            name: 'Institute.schoolCard',
        },
        { //合约
            path: '/agreement',
            name: 'agreement',
            component: agreement,
            meta: { keepAlive: true }
        },
        { //支付
            path: '/payment/:id/:type',
            name: 'payment',
            component: payment,
        },
        { path: '*', redirect: '/' }
    ],
});