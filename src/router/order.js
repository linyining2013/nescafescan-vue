// const orderList = resolve => require(['@/pages/Order/orderList'], resolve);
// const payOrder = resolve => require(['@/pages/Order/pay'], resolve);
// const unpayOrder = resolve => require(['@/pages/Order/unpay'], resolve);

import orderList from '@/pages/Order/orderList';
import payOrder from '@/pages/Order/pay';
import unpayOrder from '@/pages/Order/unpay';

export default [{ //订单查询页面
    path: '/order',
    component: orderList,
    children: [{
            path: '',
            name: 'Order.unpay',
            component: unpayOrder,
        },
        {
            path: 'pay',
            name: 'Order.pay',
            component: payOrder,
        }
    ]
}];