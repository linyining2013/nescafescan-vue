import ShareTipComponent from '@/components/shareTip';
import _ from 'lodash';
let $vm;

const plugin = {
    install(vue, options = {}) {
        const ShareTip = vue.extend(ShareTipComponent);

        const shareTip = {
            show(options = {}) {
                if (!$vm) {
                    $vm = new ShareTip({
                        el: document.createElement('div')
                    });
                    document.body.appendChild($vm.$el)
                };
                $vm.show = true
            }
        }

        if (!vue.$super) {
            vue.$super = {
                shareTip
            }
        } else {
            vue.$super.shareTip = shareTip
        }

        vue.mixin({
            created: function() {
                this.$super = _.extend({}, this.$super, vue.$super)
            }
        });
    }
}

export default plugin