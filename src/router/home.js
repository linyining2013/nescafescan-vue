// import Vue from 'vue';

// const Home = resolve => {
//     Vue.$super.loading.show();
//     require.ensure(['@/pages/Home/home'], () => {
//         resolve(require('@/pages/Home/home'));
//         Vue.$super.loading.hide();
//     })
// }
// const me = resolve => {
//     Vue.$super.loading.show();
//     require.ensure(['@/pages/Home/me'], () => {
//         resolve(require('@/pages/Home/me'));
//         Vue.$super.loading.hide();
//     })
// }

// const coursePackage = resolve => {
//     Vue.$super.loading.show();
//     require.ensure(['@/pages/Home/package'], () => {
//         resolve(require('@/pages/Home/package'))
//         Vue.$super.loading.hide();
//     })
// }
import Home from "@/pages/Home/home";
import me from "@/pages/Home/me";
import coursePackage from "@/pages/Home/package";
import index from "@/pages/Home/index";
import course from "@/pages/Home/course";

// const coursePackage = resolve => require(['@/pages/Home/package'], resolve);

export default [{
    path: '/',
    component: Home,
    children: [{
            path: 'course',
            component: index,
            children: [{
                    path: '',
                    name: 'Home.index.course',
                    component: course,
                    meta: { keepAlive: true }
                },
                {
                    path: '/package',
                    name: 'Home.index.package',
                    component: coursePackage,
                    meta: { keepAlive: true }
                }
            ]
        },
        {
            path: '',
            name: 'Home.me',
            component: me,
            meta: { keepAlive: true }
        }
    ]
}];