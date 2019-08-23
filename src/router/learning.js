// import learningRouter from '@/pages/Learning/learningRouter';
// import Vue from 'vue';

// const learningRouter = resolve => {
//     Vue.$super.loading.show();
//     require.ensure(['@/pages/Learning/learningRouter'], () => {
//         resolve(require('@/pages/Learning/learningRouter'))
//         Vue.$super.loading.hide();
//     })
// }

import learningRouter from '@/pages/Learning/learningRouter';
import learning from '@/pages/Learning/Learning';
import discuss from '@/pages/Learning/Learning.discuss';
import finished from '@/pages/Learning/Learning.finished';

// const learningRouter = resolve => require(['@/pages/Learning/learningRouter'], resolve);
// const learning = resolve => require(['@/pages/Learning/Learning'], resolve);
// const discuss = resolve => require(['@/pages/Learning/Learning.discuss'], resolve);

export default [{ //站外登陆注册
    path: '/learning/:id/:pageNum',
    component: learningRouter,
    children: [{
            path: '',
            name: 'Learning',
            component: learning,
        }, {
            path: 'discuss',
            name: 'Learning.discuss',
            component: discuss,
        },
        {
            path: '/learning/:id',
            // redirect: { name: 'Learning', }
            redirect: to => {
                const { hash, params, query } = to
                // if (query.to === 'foo') {
                //   return { path: '/foo', query: null }
                // }
                // if (hash === '#baz') {
                //   return { name: 'baz', hash: '' }
                // }
                if (params.id) {
                    return '/course/:id'
                } else {
                    return '/'
                }
            }
        }
        // {
        //     path: '/learning/finished/:id/:pageNum',
        //     name: 'Learning.finished',
        //     component: finished,
        // }
    ]
}];