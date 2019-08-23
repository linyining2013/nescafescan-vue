// import CourseDetail from '@/pages/Course/Detail';
// const CourseDetail = resolve => require(['@/pages/Course/Detail'], resolve);

// import Vue from 'vue';
// const CourseDetail = resolve => {
//     Vue.$super.loading.show();
//     require.ensure(['@/pages/Course/Detail'], () => {
//         resolve(require('@/pages/Course/Detail'))
//         Vue.$super.loading.hide();
//     })
// }

import CourseDetail from "@/pages/Course/Detail";
import DetailIntroduction from "@/pages/Course/Detail.introduction";
import DetailSection from "@/pages/Course/Detail.section";
import DetailComment from "@/pages/Course/Detail.comment";


// const DetailIntroduction = resolve => require(['@/pages/Course/Detail.introduction'], resolve);
// const DetailSection = resolve => require(['@/pages/Course/Detail.section'], resolve);
// const DetailComment = resolve => require(['@/pages/Course/Detail.comment'], resolve);

export default [{
    path: '/course/:id',
    component: CourseDetail,
    children: [{
            name: 'CourseDetail',
            path: "",
            component: DetailIntroduction
        },
        {
            name: 'CourseDetail.Section',
            path: "section",
            component: DetailSection
        },
        {
            name: 'CourseDetail.Comment',
            path: "comments",
            component: DetailComment
        },
        {
            path: 'introduction',
            redirect: { name: 'CourseDetail' }
        }
    ]
}];