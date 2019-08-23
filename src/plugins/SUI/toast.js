import ToastComponent from '@/components/Toast';
import { mergeOptions } from '@/libs/plugin_helper';
import _ from 'lodash';
let $vm;
let watcher;


const plugin = {
    install(vue, options = {}) {
        const Toast = vue.extend(ToastComponent);
        if (!$vm) {
            $vm = new Toast({
                el: document.createElement('div')
            });
            document.body.appendChild($vm.$el)
        }
        const toast = {
            show(options = {}) {
                // destroy watcher
                watcher && watcher();

                if (_.isString(options)) {
                    $vm.text = options
                } else if (_.isObject(options)) {
                    mergeOptions($vm, options)
                }

                if (_.isObject(options) && options.onShow || options.onHide) {
                    watcher = $vm.$watch('show', (val) => {
                        val && options.onShow && options.onShow($vm)
                        val === false && options.onHide && options.onHide($vm)
                    })
                }
                $vm.show = true
            },
            text(text) {
                this.show({
                    text
                })
            },
            hide() {
                $vm.show = false
            }
        }

        if (!vue.$super) {
            vue.$super = {
                toast
            }
        } else {
            vue.$super.toast = toast
        }

        vue.mixin({
            created: function() {
                this.$super = _.extend({}, this.$super, vue.$super)
            }
        });
    }
}

export default plugin