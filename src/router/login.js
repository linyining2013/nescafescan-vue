// import loginRouter from '@/pages/Login/loginRouter';


// const loginRouter = () =>
//     import ( /* webpackChunkName: "LoginChunk" */ '@/pages/Login/loginRouter');
// const login = () =>
//     import ( /* webpackChunkName: "LoginChunk" */ '@/pages/Login/login');
// const register = () =>
//     import ( /* webpackChunkName: "LoginChunk" */ '@/pages/Login/register');

// import Vue from 'vue';

// const loginRouter = resolve => {
//     Vue.$super.loading.show();
//     require.ensure(['@/pages/Login/loginRouter'], () => {
//         resolve(require('@/pages/Login/loginRouter'))
//         Vue.$super.loading.hide();
//     })
// }
import loginRouter from '@/pages/Login/loginRouter';
import login from '@/pages/Login/login';
import register from '@/pages/Login/register';
import loginRouter2 from '@/pages/newWxLogin/loginRouter';
import login2 from '@/pages/newWxLogin/login';
import loginRouter3 from '@/pages/newWxLogin/loginRouter2';
import login3 from '@/pages/newWxLogin/login2';

export default [{ //站外登陆注册
    path: '/login',
    component: loginRouter,
    children: [{
        path: '',
        name: 'login',
        component: login,
    }, {
        path: '/register',
        name: 'login.register',
        component: register,
    }]
}, {
    path: '/newLogin',
    component: loginRouter2,
    children: [{
        path: '',
        name: 'nlogin',
        component: login2
    }]
}, {
    path: '/newLogin2',
    component: loginRouter3,
    children: [{
        path: '',
        name: 'nlogin',
        component: login3
    }]
}];