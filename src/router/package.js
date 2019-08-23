// import PackageDetail from '@/pages/Package/detail';

// import Vue from 'vue';
// const PackageDetail = resolve => {
//     Vue.$super.loading.show();
//     require.ensure(['@/pages/Package/detail'], () => {
//         resolve(require('@/pages/Package/detail'))
//         Vue.$super.loading.hide();
//     })
// }

import PackageDetail from "@/pages/Package/detail";
import DetailCourse from "@/pages/Package/detail.course";
import DetailComments from "@/pages/Package/detail.comments";

export default [{
    path: '/package/:id',
    component: PackageDetail,
    children: [{
            name: 'Package',
            path: "",
            component: DetailCourse,
            meta: { keepAlive: true },
        },
        {
            name: 'Package.Comments',
            path: "comments",
            component: DetailComments,
            meta: { keepAlive: true },
        }
    ]
}];