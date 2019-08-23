// import videoComponent from '@/components/Video';
// import { mergeOptions } from '@/libs/plugin_helper';
// import _ from 'lodash';
// let $vm;
// let watcher;


// const plugin = {
//     install(vue, options = {}) {
//         const Video = vue.extend(videoComponent);
//         if (!$vm) {
//             $vm = new Video({
//                 el: document.createElement('div')
//             });
//             document.body.appendChild($vm.$el)
//         }
//         const video = {
//             renderVideo(options) {
//                 // $vm.$el.play();
//                 mergeOptions($vm, options);
//                 options.el.appendChild($vm.$el).play();
//             },
//         }

//         if (!vue.$super) {
//             vue.$super = {
//                 video
//             }
//         } else {
//             vue.$super.video = video
//         }

//         vue.mixin({
//             created: function() {
//                 this.$super = _.extend({}, this.$super, vue.$super)
//             }
//         });
//     }
// }

// export default plugin