import indexRouter from '@/pages/SchoolRoll/Index';
import indexBaseRouter from '@/pages/SchoolRoll/Index.base';
import indexEduRouter from '@/pages/SchoolRoll/Index.edu';

export default [{ //学籍
    path: '/schoolRoll',
    component: indexRouter,
    name: 'schoolRoll.Index'
}, { //学籍基础信息编辑
    path: '/schoolRoll/base',
    component: indexBaseRouter,
    name: 'schoolRoll.Index.base'
}, { //学籍教育经历
    path: '/schoolRoll/edu',
    component: indexEduRouter,
    name: 'schoolRoll.Index.edu'
}];