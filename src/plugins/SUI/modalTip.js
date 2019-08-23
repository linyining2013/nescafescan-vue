import ModalTipComponent from '@/components/ModalTip';
import { mergeOptions } from '@/libs/plugin_helper';
import _ from 'lodash';
let $vm;

const plugin = {
    install(vue, options = {}) {
        const ModalTip = vue.extend(ModalTipComponent);
        let onClose, onHide;
        const modalTip = {
            show(options = {}) {
                if (!$vm) {
                    $vm = new ModalTip({
                        el: document.createElement('div')
                    });
                    document.body.appendChild($vm.$el)
                };
                mergeOptions($vm, options);
                $vm.show = true;

                // $vm.autoClose = options.autoClose;
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
                if ($vm && $vm.autoHide) {
                    $vm.$off('on-close', onClose);
                    $vm.$off('on-hide', onHide);
                    $vm.show = false;
                    $vm.autoHide = false;
                }

            }
        }


        if (!vue.$super) {
            vue.$super = {
                modalTip
            }
        } else {
            vue.$super.modalTip = modalTip
        }

        vue.mixin({
            created: function() {
                this.$super = _.extend({}, this.$super, vue.$super)
            }
        });
    }
}

export default plugin