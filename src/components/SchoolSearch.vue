<template>
  <section id="school-search-wrap">
    <header class="school-search-wrap-header">
      <input type="text" placeholder="请输入学校名称" v-model.trim="lName" class="school-search-wrap-header__control" />
      <button class="school-search-wrap-header__btn" @click="selected(0)">取消</button>
    </header>
    <div class="school-search-list">
      <p class="school-search-list__item" @click="selected(value)" :key="value.id" v-for="(value, index) in schoolResList" v-html="renderRes(value.name)"></p>
    </div>
  </section>
</template>
<script>
// import API from "@/plugins/API";

export default {
  data() {
    return {
      lName: "",
      timeoutEvent: "",
      schoolResList: [],
      defaultRes: [
        {
          addTime: 1386194868000,
          compatible: false,
          crawType: 0,
          id: 1,
          initials: "qtxx",
          name: "其它学校",
          provinceId: 1,
          schoolId: 1,
          schoolLogo: "",
          status: 1
        }
      ]
    };
  },
  watch: {
    lName(newVal, oldVal) {
      let that = this;
      clearTimeout(this.timeoutEvent);
      if (newVal == "") {
        that.schoolResList = [];
      } else {
        this.timeoutEvent = setTimeout(() => {
          that.search();
        }, 300);
      }
    }
  },
  // mounted() {
    // document.title = "选择学校";
  // },
  methods: {
    selected(value) {
      this.$emit("selectedRes", value);
    },
    search() {
      let that = this;
      if (this.lName) {
        this.$API.getSchoolsByName({ lName: this.lName }).then(data => {
          if (data.length) that.schoolResList = data;
          else that.schoolResList = that.defaultRes;
        });
      } else {
        this.schoolResList = this.defaultRes;
      }
    },
    renderRes(val) {
      let lName = this.lName;
      return val.replace(
        new RegExp(lName, "g"),
        `<span class="symbol">${this.lName}</span>`
      );
    }
  }
};
</script>
<style lang="postcss">
#school-search-wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 10;
  overflow: hidden;
  .school-search-wrap-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 0 20px;
    z-index: 11;
    .school-search-wrap-header__control {
      display: inline-block;
      color: #b8b8b8;
      padding: 0 20px;
      margin: 20px 0;
      height: 60px;
      line-height: 60px;
      width: 80%;
      box-sizing: border-box;
      background-color: #eeeff3;
      font-size: 28px;
      border: 0;
      border-radius: 10px;
    }
    .school-search-wrap-header__btn{
      float: right;
      margin-top: 20px;
      display: inline-block;
      background: #fff;
      color: #11bff1;
      font-size: 28px;
      height: 60px;
      width: 16%;
      border: 0;
    }
  }
  .school-search-list {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding-top: 100px;
    .school-search-list__item {
      background-color: #fff;
      position: relative;
      color: #333;
      font-size: 36px;
      padding: 0 20px;
      height: 110px;
      line-height: 100px;
      border-bottom: 3px solid #e6e6e6;
      white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
      .symbol {
        color: #00aef4;
      }
    }
  }
}
</style>