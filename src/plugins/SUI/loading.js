import ToastComponent from '@/components/Toast';
import { mergeOptions } from '@/libs/plugin_helper';
import _ from 'lodash';
import loadingSVG from '@/assets/loading.gif';
let $vm;
let watcher;
let timer = 0;

const plugin = {
    install(vue, options = {}) {
        let LoadingComponent = _.extend({}, ToastComponent, {
            name: 'sui-loading'
        });

        LoadingComponent.watch.show = function(val) {
            if (val) {
                this.$emit("on-show");
                this.fixSafariOverflowScrolling("auto");
            }
        };

        const Loading = vue.extend(LoadingComponent);
        if (!$vm) {
            $vm = new Loading({
                el: document.createElement('div')
            });
            document.body.appendChild($vm.$el)
        }
        const loading = {
            show(text = '表表正在努力') {
                timer++;
                // destroy watcher
                watcher && watcher();
                $vm.text = `<div style="width:3rem;margin-bottom: .1rem;"><img style="width:50%" src="${loadingSVG}"/></div><p style="margin:0 0 .2rem">${text}</p>`;
                if (_.isObject(options) && options.onShow || options.onHide) {
                    watcher = $vm.$watch('show', (val) => {
                        val && options.onShow && options.onShow($vm)
                        val === false && options.onHide && options.onHide($vm)
                    })
                }
                $vm.toastCSS = "loading-content";
                $vm.isShowMask = true;
                $vm.show = true;
            },
            hide() {
                if (timer > 0) {
                    timer--;
                }
                if (timer === 0) {
                    $vm.show = false
                }
            }
        }
        if (!vue.$super) {
            vue.$super = {
                loading
            }
        } else {
            vue.$super.loading = loading
        }

        vue.mixin({
            created: function() {
                this.$super = _.extend({}, this.$super, vue.$super)
            }
        });
    }
}

export default plugin