<template>
  <section id="main-wrap" class="" :style="{'min-height': (getWindowStyle().height)}">
    <header class="main-header">
      <div class="banner-wrap" :style="{'height': getStyle().height}" v-if="banner">
        <div class="banner-move-box " :class="{'move-active': touch_move.moveStart}" :style="[getStyle(banner.length + 2),slide_move.translateStyle]">
          <template v-if="banner[bannerIndex].url">
            <template v-for="(value, index) in banner">
              <div class="banner-box" :style="[getStyle(),{'margin-right': getMargin()}]" :key="index" @touchstart="touch($event)" @touchmove.prevent="touch($event)" @touchend="touch($event)">
                <p class="img-box">
                  <a class="link-btn" :href="banner[index].url" v-track-event="'banner跳转, banner跳转链接:'+ banner[index].url +', banner跳转区:'+ ($utils.isSuperBrowser? '表表' : $utils.isWXBrowser ? '微信' : '外部浏览器')">
                    <img :src="banner[index].picture" width="100%" />
                  </a>
                </p>
              </div>
            </template>
            <div class="banner-box last-banner-box" :style="[getStyle(),{'margin-right': getMargin()}]" :key="bannerIndex" v-if="banner.length > 1">
              <p class="img-box">
                <a class="link-btn">
                  <img :src="banner[0].picture" width="100%" />
                </a>
              </p>
            </div>
          </template>
          <template v-else>
            <div class="banner-wrap" :key="banner[bannerIndex].picture">
              <p class="img-box">
                <a class="link-btn" href="javascript:void(0)">
                  <img :src="banner[bannerIndex].picture" width="100%" />
                </a>
              </p>
            </div>
          </template>
        </div>
        <div class="point-wrap" id="point-data-wrap" v-if="banner.length > 1">
          <!-- banner[bannerIndex].id == value.id || (!banner[bannerIndex].id && index == 0) -->
          <p class="point" :class="{active: bannerIndex == index? true: false}" v-for="(value, index) in bannerLen" :key="index"></p>
        </div>
      </div>
    </header>
    <div id="category-data-wrap" :class="this.categoryCss">
      <header class="wrap-category-header normal-header">
        <span class="wrap-category-header__title normal-header__title">搜索课程</span>
      </header>
      <template v-for="(value, index) in category" v-if="index + 1 < categoryMaxNum || (index + 1 == categoryMaxNum && category.length <= categoryMaxNum)">
        <router-link class="category-item category-btn" :key="value.id" tag="button" :to="{path: '/courseList/' + value.id}">
          <img :src="value.iconUrl" height="22px" />
          <span class="txt" v-if="value.name">{{value.name}}</span>
        </router-link>
      </template>
      <template v-else-if="index + 1 == categoryMaxNum">
        <router-link class="category-item category-btn" :key="value.id" tag="button" :to="{path: '/categoryList'}">
          <img :src="require('@/assets/images/index/categoryMore.png')" height="22px" />
          <span class="txt">更多</span>
        </router-link>
      </template>
      
    </div>
    <nav id="course-type-nav">
      <section class="course-type-nav__boxstyle">
        <router-link :to="{path: '/course'}" exact-active-class='active' tag="button" class="course-type-nav__btn course" replace>
          全部课程
        </router-link>
        <router-link :to="{path: '/package'}" exact-active-class='active' tag="button" class="course-type-nav__btn package" replace>
          课程组合
        </router-link>
      </section>
    </nav>

    <div class="transition-parent" id="data-wrap">
      <transition :name="courseToPackTransitionName">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>
    </div>
  </section>
</template>

<script>
// import _methods from "../../plugins/methods";
// import API from "../../plugins/API";
// import Vue from "vue";

export default {
  name: "coupon",
  data() {
    return {
      courseToPackTransitionName: "slide-left",
      category: [
        {
          iconUrl:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NzFjMGNjNS04Mzc5LTQzZTUtOWY4MS02ZWJkZWUzOWZjYzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzhFMUFGRDZFRjk4MTFFN0I5NDJCQzIwOUE4NTUzNjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzhFMUFGRDVFRjk4MTFFN0I5NDJCQzIwOUE4NTUzNjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M2NjMzJhOGEtMzc4YS01ZTRiLTk5YzMtZmQ1NGQ5NDA4ODI0IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YjdiNTRmMWEtMjdiZC0xMTdiLWEyMzUtOTVkYzQ5YzgxM2I3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FS6t6gAAAYJJREFUeNrs3EtKw1AYxfGb1MceVBDUHThyFxWsq1BEB3YHgnbSSVdRH3UfiuC4goLSBSg+okXP19ykaQnO0/s/cCBc7iQ/8prki94/flxJFtS675a65NeqnDf1Wb1Tr9RrNZneFJWAbKtn6oab7fTVpnpZXIwLxzX11G+YdQznz/HCn3MtW5wrbDhRj114yc65WbxldtSuCzsN9dxA7GH5oK4EDvKirsVeJnQMy7K6G/tXK0lTt1vmUQerWIzyZCCfOljEYpTEQH5xKP8wI4AAAggggAACCCCAAAIIIIAAAggggBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAIYAAAggggAACCCCAAAJIJUFeYciTGMgAhzwDA7nHIc+NgfRwyNPjR+Zx7EfmdbtCbGTEEReHO1S/steu/fffChij5Q0m5ofYyIi2uhcYRkc9UIfTH2a2sO/SSRH9ACDsHBv+Ahhmi9E/I3dss02b2XTpoID5igN8+wfnrUtH7nRdycidPwEGAA69UdUJBL3qAAAAAElFTkSuQmCC"
        },
        {
          iconUrl:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NzFjMGNjNS04Mzc5LTQzZTUtOWY4MS02ZWJkZWUzOWZjYzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzhFMUFGRDZFRjk4MTFFN0I5NDJCQzIwOUE4NTUzNjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzhFMUFGRDVFRjk4MTFFN0I5NDJCQzIwOUE4NTUzNjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M2NjMzJhOGEtMzc4YS01ZTRiLTk5YzMtZmQ1NGQ5NDA4ODI0IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YjdiNTRmMWEtMjdiZC0xMTdiLWEyMzUtOTVkYzQ5YzgxM2I3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FS6t6gAAAYJJREFUeNrs3EtKw1AYxfGb1MceVBDUHThyFxWsq1BEB3YHgnbSSVdRH3UfiuC4goLSBSg+okXP19ykaQnO0/s/cCBc7iQ/8prki94/flxJFtS675a65NeqnDf1Wb1Tr9RrNZneFJWAbKtn6oab7fTVpnpZXIwLxzX11G+YdQznz/HCn3MtW5wrbDhRj114yc65WbxldtSuCzsN9dxA7GH5oK4EDvKirsVeJnQMy7K6G/tXK0lTt1vmUQerWIzyZCCfOljEYpTEQH5xKP8wI4AAAggggAACCCCAAAIIIIAAAggggBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAIYAAAggggAACCCCAAAJIJUFeYciTGMgAhzwDA7nHIc+NgfRwyNPjR+Zx7EfmdbtCbGTEEReHO1S/steu/fffChij5Q0m5ofYyIi2uhcYRkc9UIfTH2a2sO/SSRH9ACDsHBv+Ahhmi9E/I3dss02b2XTpoID5igN8+wfnrUtH7nRdycidPwEGAA69UdUJBL3qAAAAAElFTkSuQmCC"
        },
        {
          iconUrl:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NzFjMGNjNS04Mzc5LTQzZTUtOWY4MS02ZWJkZWUzOWZjYzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzhFMUFGRDZFRjk4MTFFN0I5NDJCQzIwOUE4NTUzNjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzhFMUFGRDVFRjk4MTFFN0I5NDJCQzIwOUE4NTUzNjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M2NjMzJhOGEtMzc4YS01ZTRiLTk5YzMtZmQ1NGQ5NDA4ODI0IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YjdiNTRmMWEtMjdiZC0xMTdiLWEyMzUtOTVkYzQ5YzgxM2I3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FS6t6gAAAYJJREFUeNrs3EtKw1AYxfGb1MceVBDUHThyFxWsq1BEB3YHgnbSSVdRH3UfiuC4goLSBSg+okXP19ykaQnO0/s/cCBc7iQ/8prki94/flxJFtS675a65NeqnDf1Wb1Tr9RrNZneFJWAbKtn6oab7fTVpnpZXIwLxzX11G+YdQznz/HCn3MtW5wrbDhRj114yc65WbxldtSuCzsN9dxA7GH5oK4EDvKirsVeJnQMy7K6G/tXK0lTt1vmUQerWIzyZCCfOljEYpTEQH5xKP8wI4AAAggggAACCCCAAAIIIIAAAggggBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAIYAAAggggAACCCCAAAJIJUFeYciTGMgAhzwDA7nHIc+NgfRwyNPjR+Zx7EfmdbtCbGTEEReHO1S/steu/fffChij5Q0m5ofYyIi2uhcYRkc9UIfTH2a2sO/SSRH9ACDsHBv+Ahhmi9E/I3dss02b2XTpoID5igN8+wfnrUtH7nRdycidPwEGAA69UdUJBL3qAAAAAElFTkSuQmCC"
        },
        {
          iconUrl:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NzFjMGNjNS04Mzc5LTQzZTUtOWY4MS02ZWJkZWUzOWZjYzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzhFMUFGRDZFRjk4MTFFN0I5NDJCQzIwOUE4NTUzNjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzhFMUFGRDVFRjk4MTFFN0I5NDJCQzIwOUE4NTUzNjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M2NjMzJhOGEtMzc4YS01ZTRiLTk5YzMtZmQ1NGQ5NDA4ODI0IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YjdiNTRmMWEtMjdiZC0xMTdiLWEyMzUtOTVkYzQ5YzgxM2I3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FS6t6gAAAYJJREFUeNrs3EtKw1AYxfGb1MceVBDUHThyFxWsq1BEB3YHgnbSSVdRH3UfiuC4goLSBSg+okXP19ykaQnO0/s/cCBc7iQ/8prki94/flxJFtS675a65NeqnDf1Wb1Tr9RrNZneFJWAbKtn6oab7fTVpnpZXIwLxzX11G+YdQznz/HCn3MtW5wrbDhRj114yc65WbxldtSuCzsN9dxA7GH5oK4EDvKirsVeJnQMy7K6G/tXK0lTt1vmUQerWIzyZCCfOljEYpTEQH5xKP8wI4AAAggggAACCCCAAAIIIIAAAggggBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAIYAAAggggAACCCCAAAJIJUFeYciTGMgAhzwDA7nHIc+NgfRwyNPjR+Zx7EfmdbtCbGTEEReHO1S/steu/fffChij5Q0m5ofYyIi2uhcYRkc9UIfTH2a2sO/SSRH9ACDsHBv+Ahhmi9E/I3dss02b2XTpoID5igN8+wfnrUtH7nRdycidPwEGAA69UdUJBL3qAAAAAElFTkSuQmCC"
        },
        {
          iconUrl:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NzFjMGNjNS04Mzc5LTQzZTUtOWY4MS02ZWJkZWUzOWZjYzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzhFMUFGRDZFRjk4MTFFN0I5NDJCQzIwOUE4NTUzNjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzhFMUFGRDVFRjk4MTFFN0I5NDJCQzIwOUE4NTUzNjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M2NjMzJhOGEtMzc4YS01ZTRiLTk5YzMtZmQ1NGQ5NDA4ODI0IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YjdiNTRmMWEtMjdiZC0xMTdiLWEyMzUtOTVkYzQ5YzgxM2I3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FS6t6gAAAYJJREFUeNrs3EtKw1AYxfGb1MceVBDUHThyFxWsq1BEB3YHgnbSSVdRH3UfiuC4goLSBSg+okXP19ykaQnO0/s/cCBc7iQ/8prki94/flxJFtS675a65NeqnDf1Wb1Tr9RrNZneFJWAbKtn6oab7fTVpnpZXIwLxzX11G+YdQznz/HCn3MtW5wrbDhRj114yc65WbxldtSuCzsN9dxA7GH5oK4EDvKirsVeJnQMy7K6G/tXK0lTt1vmUQerWIzyZCCfOljEYpTEQH5xKP8wI4AAAggggAACCCCAAAIIIIAAAggggBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAIYAAAggggAACCCCAAAJIJUFeYciTGMgAhzwDA7nHIc+NgfRwyNPjR+Zx7EfmdbtCbGTEEReHO1S/steu/fffChij5Q0m5ofYyIi2uhcYRkc9UIfTH2a2sO/SSRH9ACDsHBv+Ahhmi9E/I3dss02b2XTpoID5igN8+wfnrUtH7nRdycidPwEGAA69UdUJBL3qAAAAAElFTkSuQmCC"
        }
      ],
      categoryCss: "",
      isPushBanner: false,
      bannerIndex: 0,
      bannerLen: 0,
      bannerPushList: [],
      banner: [
        {
          picture:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAp4AAADSCAYAAADjc8CtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NzFjMGNjNS04Mzc5LTQzZTUtOWY4MS02ZWJkZWUzOWZjYzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlFREI4RTFFRkI0MTFFN0IyOTdFMzNDQUZBNEE2MkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlFREI4RTBFRkI0MTFFN0IyOTdFMzNDQUZBNEE2MkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M2NjMzJhOGEtMzc4YS01ZTRiLTk5YzMtZmQ1NGQ5NDA4ODI0IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YjdiNTRmMWEtMjdiZC0xMTdiLWEyMzUtOTVkYzQ5YzgxM2I3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Ut/5dwAAA/9JREFUeNrs20FKAmEYx2GdEb1CaSvpCLXoFtMib2IdIfIoUeFNukDt6gZREC18X/iKQVxJX7R4HvhjDLN6Vz8Mh+8fX4MdxrGu7Cw2Lc8AAGDbW+wl9hhbl31uvzTcEZ7nsVXs2A0BANjDU+wq9tB/2PT+bmM35QXRCQDAvrIl70tbtt8PR70XrmNLdwIA4Jdcls/89vPnX+0XsVu3AQCggmzNuwzP/NHQc+zITQAAqOA1Nm9KgYpOAABqmcUWGZ6dWwAAUFmX4XnqDgAAVHaS4XngDgAAVHaY4TlxBwAAKhs3bgAAwF8QngAACE8AAIQnAAAITwAAhCcAAMITAACEJwAAwhMAAIQnAADCEwAA4QkAAMITAADhCQAAwhMAAOEJAIDwBAAA4QkAgPAEAADhCQCA8AQAQHgCAIDwBABAeAIAgPAEAEB4AgAgPAEAQHgCACA8AQAQngAAIDwBABCeAAAgPAEAEJ4AAAhPAAAQngAACE8AABCeAAAITwAAhCcAAAhPAACEJwAACE8AAIQnAADCEwAAhCcAAMITAACEJwAAwhMAAOEJAADCEwAA4QkAgPAEAADhCQCA8AQAAOEJAIDwBABAeAIAgPAEAEB4AgCA8AQAQHgCACA8AQBAeAIAIDwBAEB4AgAgPAEAEJ4AACA8AQAQngAAIDwBABCeAAAITwAAEJ4AAAhPAACEJwAACE8AAIQnAAAITwAAhCcAAMITAACEJwAAwhMAAIQnAADCEwAA4QkAAMITAADhCQAAwhMAAOEJAIDwBAAA4QkAgPAEAADhCQCA8AQAQHgCAIDwBABAeAIAIDwBAEB4AgAgPAEAQHgCACA8AQAQngAAIDwBABCeAAAgPAEAEJ4AAAhPAAAQngAACE8AABCeAAAITwAAhCcAAAhPAACEJwAACE8AAIQnAADCEwAAhCcAAMITAADhCQAAwhMAAOEJAADCEwAA4QkAgPAEAADhCQCA8AQAAOEJAIDwBABAeAIAgPAEAEB4AgCA8AQAQHgCACA8AQBAeAIAIDwBAEB4AgAgPAEAEJ4AACA8AQAQngAACE8AABCeAAAITwAAEJ4AAAhPAACEJwAACE8AAIQnAAAITwAAhCcAAMITAACEJwAAwhMAAIQnAADCEwAA4QkAAMITAADhCQAAwhMAAOEJAIDwBAAA4QkAgPAEAEB4AgCA8AQAQHgCAIDwBABAeAIAIDwBAEB4AgAgPAEAQHgCACA8AQAQngAAIDwBABCeAAAgPAEAEJ4AAAhPAAAQngAACE8AABCeAAAITwAAhCcAAAhPAACEJwAAwhMAAIQnAADCEwAAhCcAAMITAADhCQAAwhMAAOEJAADCEwCA/2AjwADIuyEaYm8rCQAAAABJRU5ErkJggg=="
        }
      ],
      categoryMaxNum: 5, //分类显示最大数目
      touch_move: {
        startX: 0,
        startY: 0,
        x: 0,
        y: 0,
        start: true,
        moveStart: false
      },
      slide_move: {
        transitionName: "",
        isPause: false,
        interval: null,
        perMove: document.body.clientWidth * 0.91,
        nowMove: 0,
        translateStyle: {
          transform: `translate3d(0, 0, 0)`,
          "-ms-transform": `translate3d(0, 0, 0)`,
          "-moz-transform": `translate3d(0, 0, 0)`,
          "-webkit-transform": `translate3d(0, 0, 0)`,
          "-o-transform": `translate3d(0, 0, 0)`
        }
      },
      scroll: {
        top: 0
      }
    };
  },
  watch: {
    bannerIndex(val) {
      if (val >= this.banner.length - 2 && !this.isPushBanner) {
        this.pushBanner();
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    window.scrollTo(0, 1);
    next();
  },
  mounted: function() {
    this.$API.indexCourse().then(res => {
      let banner = res.banner,
        category = res.category;
      this.category = category;

      let studentBo = this.$store.state.user.data.student;
      if (
        studentBo &&
        studentBo.cityName != "广州市" &&
        this.$utils.isSuperBrowser
      ) {
        let i = 0,
          len = banner.length;
        for (; i < len; i++) {
          if (banner[i].url.indexOf("Institute") != -1) {
            //训练营链接
            banner.splice(i, 1);
            break;
          }
        }
      }

      this.banner = banner;
      this.bannerIndex = 0;
      this.bannerLen = this.banner.length + 5;
      if (this.banner.length == 1 && !this.isPushBanner) {
        this.pushBanner();
      }
      this.renderSlide();
    });
    
    // this.$nextTick(() => {
    //   window.scrollTo(0, 1);
    // });



  },
  beforeDestroy() {
    // if (this.$utils.isAndroid)
    //   window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    pushBanner() {
      this.isPushBanner = true;
      this.$API.bannerPush().then(res => {
        this.banner.push(...res);
      });
    },
    getMargin() {
      return document.body.clientWidth * 0.03 + "px";
    },
    getTranslateStyle(i) {
      let num = i + "px";
      this.slide_move.translateStyle = {
        transform: `translate3d(${num}, 0, 0)`,
        "-ms-transform": `translate3d(${num}, 0, 0)`,
        "-moz-transform": `translate3d(${num}, 0, 0)`,
        "-webkit-transform": `translate3d(${num}, 0, 0)`,
        "-o-transform": `translate3d(${num}, 0, 0)`
      };
    },
    getWindowStyle() {
      return {
        height: window.innerHeight + "px", //document.body.clientWidth / 25 * 7 + "px",
        width: window.innerWidth + "px"
      };
    },
    getStyle(times = 1) {
      return {
        height: document.body.clientWidth * 0.88 / 63 * 22 + "px", //document.body.clientWidth / 25 * 7 + "px",
        width: document.body.clientWidth * 0.88 * times + "px"
      };
    },
    // handleScroll() {
    //   let scrollTop =
    //       window.pageYOffset ||
    //       document.documentElement.scrollTop ||
    //       document.body.scrollTop,
    //     offsetH = document.getElementById("category-data-wrap").offsetHeight,
    //     dis = scrollTop - this.scroll.top;

    //   if (scrollTop + (dis < 0 ? -50 : -10) >= offsetH) {
    //     this.categoryCss = "fixTop";
    //   } else {
    //     this.categoryCss = "";
    //   }

    //   this.scroll.top = scrollTop;
    // },
    slide(status) {
      this.touch_move.moveStart = true;
      if (status != undefined) {
        let len = this.banner.length - 1;
        this.bannerIndex =
          status == 1
            ? this.bannerIndex++ >= len
              ? (this.bannerIndex = 0)
              : this.bannerIndex
            : this.bannerIndex-- <= 0
              ? (this.bannerIndex = len)
              : this.bannerIndex;
      }

      if (status == 1) {
        this.getTranslateStyle(
          (this.slide_move.nowMove -= this.slide_move.perMove)
        );
      } else if (status == 0) {
        this.getTranslateStyle(
          (this.slide_move.nowMove += this.slide_move.perMove)
        );
      } else {
        this.getTranslateStyle(this.slide_move.nowMove);
      }

      setTimeout(() => {
        this.touch_move.start = true;
        this.touch_move.moveStart = false;
        if (this.bannerIndex == 0) {
          this.getTranslateStyle((this.slide_move.nowMove = 0));
        }
      }, 600);
    },
    renderSlide() {
      if (!this.interval)
        this.interval = window.setInterval(() => {
          this.slide(1);
        }, 5000);
    },
    touch(event) {
      if (!this.touch_move.start) {
        return false;
      }
      switch (event.type) {
        case "touchstart":
          window.clearInterval(this.interval); //暂停自动
          this.interval = null;
          this.touch_move.x = 0;
          this.touch_move.startX = event.touches[0].pageX;
          this.touch_move.startY = event.touches[0].pageY;
          break;
        case "touchend":
          var dis = Math.abs(this.touch_move.x); //移动距离
          this.touch_move.start = false;
          if (dis > 100 && this.banner.length > 1) {
            // 移动了60像素以上才考虑滚动;
            if (this.touch_move.state == 1 && this.bannerIndex != 0) {
              //上一页
              this.slide(0);
            } else if (this.touch_move.state == 0) {
              this.slide(1);
            } else {
              this.slide();
            }
          } else {
            this.slide();
          }
          this.banner.length > 1 && this.renderSlide();

          break;
        case "touchmove":
          this.touch_move.x = this.touch_move.startX - event.touches[0].pageX;
          // this.touch_move.y = this.touch_move.startY - event.touches[0].pageY;

          if (this.touch_move.x >= 0) {
            this.touch_move.state = 0; //下一页
          } else {
            this.touch_move.state = 1; //向右滑动，上一页
          }

          if (!this.touch_move.moveStart) {
            this.getTranslateStyle(
              this.slide_move.nowMove + this.touch_move.x * -1 * 0.5
            );
          }

          break;
      }
    }
    // getIndexCourse: function() {

    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss">
@import "../../styles/common.pcss";
@import "../../styles/home/home.index.pcss";
/* tab切换 滚动动画 */
.slide-left-course-leave-active,
.slide-left-course-enter-active {
  opacity: 1;
  transition: opacity 0.3s;
}

.slide-left-course-enter {
  opacity: 0;
}

.slide-left-course-leave-to {
  opacity: 0;
}

/* banner 滚动动画 banner-slide-left*/

.banner-slide-left-enter-active,
.banner-slide-left-leave-active,
.banner-slide-right-enter-active,
.banner-slide-right-leave-active {
  position: absolute;
  transition: all 0.6s;
}

.banner-slide-left-enter-to,
.banner-slide-right-enter-to {
  transform: translateX(0);
}
.banner-slide-left-leave,
.banner-slide-right-leave {
  transform: translateX(0);
}
.banner-slide-left-enter {
  transform: translateX(100%);
}
.banner-slide-left-leave-to {
  transform: translateX(-100%);
}
.banner-slide-right-enter {
  transform: translateX(-100%);
}
.banner-slide-right-leave-to {
  transform: translateX(100%);
}

@-webkit-keyframes openAnimate {
    0% {
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}

@keyframes openAnimate {
    0% {
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}

</style>
