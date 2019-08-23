import ImageComponent from '@/components/PreviewImage';
import { mergeOptions } from '@/libs/plugin_helper';
import _ from 'lodash';
let $vm;
let watcher;

const plugin = {
    install(vue, options = {}) {
        const PreviewImage = vue.extend(ImageComponent);

        const previewImage = {
            render(options) {
                if (!$vm) {
                    $vm = new PreviewImage({
                        el: document.createElement('div')
                    });
                    document.body.appendChild($vm.$el)
                }
                mergeOptions($vm, options);
                // this.show();
                $vm.setMarginTop();
            },
        }

        if (!vue.$super) {
            vue.$super = {
                previewImage
            }
        } else {
            vue.$super.previewImage = previewImage
        }

        vue.mixin({
            created: function() {
                this.$super = _.extend({}, this.$super, vue.$super)
            }
        });
    }
}

export default plugin