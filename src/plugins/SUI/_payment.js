import PaymentComponent from '@/components/Payment';
import store from '../../vuex/store';
import { mergeOptions } from '@/libs/plugin_helper';
import utils from '@/plugins/methods';
import _ from 'lodash';
import Vue from 'vue';
let $vm;
let watcher;


/**
 * 使用方法
 * 
 * 在vue的实例下调用
 * 
 * this.$super.payment.createOrder({
 *      courseId:Number //课程ID,
 *      onPay:Function // 调用原生支付之后
 * })
 */
// const ua = navigator.userAgent.toLowerCase(),
//     isSuperBrowser= !!~ua.indexOf('superfriday'),
//     isWXBrowser= !!~ua.indexOf("micromessenger"),

const plugin = {
    install(vue, options = {}) {

        const Payment = vue.extend(PaymentComponent);
        const payment = {
            createOrder(options) {
                if (!store.state.identity) {
                    // vue.$super.buyTip.show({ type: "download", infoType: "download" }); //12.1 暂时去除站外登陆
                    window.location.href = `${window.location.origin}${window.location.pathname}#/login?id=${options.loginData.id}&name=${options.loginData.name}&checkBuy=${options.loginData.checkBuy}`;
                    return false;
                } else if (!utils.isSuperBrowser && !utils.isWXBrowser) {
                    vue.$super.buyTip.show({
                        type: "download",
                        infoType: "notBuy",
                        onClose: res => {
                            if (res == 1) {
                                window.location.href = "http://www.super.cn/jump.php";
                            } else {
                                utils.deepLinkTo();
                            }
                        }
                    });
                } else {
                    if (!$vm) {
                        $vm = new Payment({
                            el: document.createElement('div')
                        });
                        document.body.appendChild($vm.$el);
                    }
                    mergeOptions($vm, options);
                    $vm.action = options.action || 'createOrder';
                    $vm.show = true;
                    if (options.onPay) {
                        let onHide = function() {
                            $vm.$off('on-pay', options.onPay);
                            $vm.$off('on-paySuccess', options.onPaySuccess);
                            $vm.$off('on-payFail', options.onPayFail);
                            $vm.$off('on-payCancel', options.onPayCancel);
                            $vm.$off('on-hide', onHide)
                        }
                        $vm.$on('on-payFail', options.onPayFail);
                        $vm.$on('on-payCancel', options.onPayCancel);
                        $vm.$on('on-paySuccess', options.onPaySuccess);
                        $vm.$on('on-pay', options.onPay);
                        $vm.$on('on-hide', onHide);

                    }
                }

            }
        };



        if (!vue.$super) {
            vue.$super = {
                payment
            }
        } else {
            vue.$super.payment = payment
        }

        vue.mixin({
            created: function() {
                this.$super = _.extend({}, this.$super, vue.$super)
            }
        });
    }
}

export default plugin