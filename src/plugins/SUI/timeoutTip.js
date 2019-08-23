import TimeoutTipComponent from '@/components/TimeoutTip';
import _ from 'lodash';
let $vm;

const plugin = {
    install(vue, options = {}) {
        const TimeoutTip = vue.extend(TimeoutTipComponent);

        const timeoutTip = {
            show(options = {}) {
                if (!$vm) {
                    $vm = new TimeoutTip({
                        el: document.createElement('div')
                    });
                    document.body.appendChild($vm.$el)
                };
                $vm.show = true
            }
        }

        if (!vue.$super) {
            vue.$super = {
                timeoutTip
            }
        } else {
            vue.$super.timeoutTip = timeoutTip
        }

        vue.mixin({
            created: function() {
                this.$super = _.extend({}, this.$super, vue.$super)
            }
        });
    }
}

export default plugin