<template>
    <section class="wrapper">
        <transition :name="indexTransitionName">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </transition>

        <footer id="footer" class="footer-wrap" v-show="$store.state.identity">
            <div class="tips" v-if="isTips">
                <div class="close" @click="isTips = false"></div>
                <div class="p-box">
                    <p>点击这里</p>
                    <p>就可以学习已经报名的课程</p>
                </div>
            </div>
            <ul class="btn-wrap flex-parent">
                <router-link
                    :to="{path: '/course'}"
                    exact-active-class='active'
                    tag="li"
                    class="item-btn class flex-child clearfix"
                    :class="{active: (activeName == 'Home.index.course' || activeName == 'Home.index.package')}"
                    replace>
                    <p class="icon"></p>
                    <p class="txt">选课</p>
                </router-link>
                <router-link
                    :to="{path: '/'}"
                    exact-active-class='active'
                    tag="li"
                    class="item-btn me flex-child clearfix"
                    replace>
                    <p class="icon"></p>
                    <p class="txt">学习</p>
                </router-link>
            </ul>
        </footer>
    </section>
</template>

<script>
    import API from "@/plugins/API";
    import cookies from "js-cookie";

    export default {
        data() {
            return {
                activeName: this.$route.name, indexTransitionName: "slide-left",
                // title: this.$route.name == "Home.me" ? "我的" : "超级课堂"
                isTips: false
            };
        },
        beforeRouteEnter(to, from, next) {
            if (window.location.search.indexOf("client") != -1) {
                API
                    .getMyCourses({pageNo: 1})
                    .then(data => {
                        if (data.myCourses && data.myCourses.list.length >= 1) {
                            cookies.set("isClient", 1);
                            next("/mine");
                        } else {
                            next();
                        }
                    });
            } else 
                next();
            }
        ,
        created () {
            this.$router.replace({name: 'Home.index.course'})
        },
        mounted() {
            if (!localStorage.getItem("studyTips") && this.$store.state.identity) {
                this.isTips = true
                localStorage.setItem("studyTips","true")
            }
            document.title = "第二大学";
            // document.title = this.title;
            if (this.$utils.isSuperBrowser) {
                this
                    .$utils
                    .setShare();
            } else if (this.$utils.isWXBrowser) {
                this
                    .$weixin
                    .init();
            }
        },
        // beforeDestroy() {   this.$super.buyTip.hide(); },
        watch : {
            $route(to, from) {
                // this.$ba.trackPageview('/#' + from.fullPath)
                this.activeName = to.name;
                // if (to.name == "Home.me") {   this.title = "我的"; } else {   this.title =
                // "第二大学"; } document.title = this.title;
                if (this.isTips && to.name === 'Home.me') {
                    this.isTips = false
                }
            }
        }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only @import "../../styles/label&Course&pack.pcss";-->
<style lang="postcss">
    @import "../../styles/home/home.pcss";
  
</style>