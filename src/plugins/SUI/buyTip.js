import BuyTipComponent from '@/components/BuyTip';
import { mergeOptions } from '@/libs/plugin_helper';
import _ from 'lodash';
let $vm;

const plugin = {
    install(vue, options = {}) {
        const BuyTip = vue.extend(BuyTipComponent);
        let onClose, onHide;
        const buyTip = {
            show(options = {}) {
                if (!$vm) {
                    $vm = new BuyTip({
                        el: document.createElement('div')
                    });
                    document.body.appendChild($vm.$el)
                };
                mergeOptions($vm, options);
                $vm.show = true;
                if (options.onClose) {
                    onHide = function() {
                        $vm.$off('on-close', onClose);
                        $vm.$off('on-hide', onHide);

                        if (options.autoClose != false) {
                            $vm.show = false;
                        }
                    };
                    onClose = function(res) {
                        options.onClose(arguments.length > 0 && arguments[0]);
                        onHide();
                    };

                    $vm.$on('on-close', onClose);
                    $vm.$on('on-hide', onHide);
                }
            },
            hide(options = {}) {
                if ($vm) {
                    $vm.$off('on-close', onClose);
                    $vm.$off('on-hide', onHide);
                    $vm.show = false;
                }

            }
        }


        if (!vue.$super) {
            vue.$super = {
                buyTip
            }
        } else {
            vue.$super.buyTip = buyTip
        }

        vue.mixin({
            created: function() {
                this.$super = _.extend({}, this.$super, vue.$super)
            }
        });
    }
}

export default plugin