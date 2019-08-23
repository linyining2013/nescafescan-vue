import PracticeRouter from '@/pages/Practice/index';
import PlanRouter from '@/pages/Practice/index.plan';
import NewsRouter from '@/pages/Practice/index.news';
import PracticeCourseRouter from '@/pages/Practice/course';
import PracticeCreditRouter from '@/pages/Practice/credit';
import PracticeCreditRuleRouter from '@/pages/Practice/creditRule';

export default [{ //站外登陆注册
        path: '/practice/:id',
        component: PracticeRouter,
        children: [{
            path: '',
            name: 'Practice.index.plan',
            component: PlanRouter,
        }, {
            path: 'news',
            name: 'Practice.index.news',
            component: NewsRouter,
        }],
    },
    //  {
    //     path: '/practice/:id/course',
    //     component: PracticeCourseRouter,
    //     name: 'Practice.course'
    // }, 
    {
        path: '/practice/:id/credit',
        component: PracticeCreditRouter,
        name: 'Practice.credit'
    }, {
        path: '/practice/:id/creditRule',
        component: PracticeCreditRuleRouter,
        name: 'Practice.creditRule'
    }
];