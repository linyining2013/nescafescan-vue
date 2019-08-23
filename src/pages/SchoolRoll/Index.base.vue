<template>
  <section id="school-input-wrap" :style="{'min-height': (getWindowStyle().height)}">
    <section class="school-input-wrap-form">
      <div class="form-group">
        <label class="form-group__name">*&emsp;姓&emsp;&emsp;名
        </label>
        <div class="form-group-box">
          <input type="text" class="form-group__control" :class="{error: !isName}" placeholder="请输入姓名" maxlength="30" @blur="(blurData.realName = 1)" @input="isChange = 1"  @propertychange="isChange = 1" v-model.trim="submitData.realName">
        </div>
      </div>
      <div class="form-group form-group-triangle form-group-select">
        <label class="form-group__name">*&emsp;性&emsp;&emsp;别</label>
        <div class="form-group-box">
          <select class="form-group__select" id="gender" name="gender" @change="isChange = 1" v-model="submitData.gender">
            <option value="1">男</option>
            <option value="0">女</option>
          </select>
        </div>
      </div>
      <template v-if="$store.state.user.data.student.isInPractice == 1">
        <div class="form-group form-group-style">
          <label class="form-group__name xl">&nbsp;&emsp;所属学院
            <span class="symbol">(不可编辑)</span>
          </label>
          <div class="form-group-box">
            <p class="form-group__control form-group__scholl">{{virtualSchoolBO.academyName}}</p>
          </div>
        </div>
        <div class="form-group form-group-style">
          <label class="form-group__name xl">&nbsp;&emsp;学&emsp;&emsp;号
            <span class="symbol">(不可编辑)</span>
          </label>
          <div class="form-group-box">
            <p class="form-group__control form-group__scholl">{{studentNo}}</p>
          </div>
        </div>
        <div class="form-group form-group-style">
          <label class="form-group__name xl">&nbsp;&emsp;班&emsp;&emsp;级
            <span class="symbol">(不可编辑)</span>
          </label>
          <div class="form-group-box">
            <p class="form-group__control form-group__scholl">{{virtualSchoolBO.profession}}</p>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-group form-group-style">
          <label class="form-group__name xl">&nbsp;&emsp;所属学院
            <span class="symbol">(不可编辑)</span>
          </label>
          <div class="form-group-box">
            <router-link tag="p" :to="{path: '/Institute/newmediamarketing'}" class="form-group__control form-group__scholl">
              <small>加入第二大学，学籍更丰富</small>
            </router-link>
          </div>
        </div>
        <div class="form-group form-group-style">
          <label class="form-group__name xl">&nbsp;&emsp;学&emsp;&emsp;号
            <span class="symbol">(不可编辑)</span>
          </label>
          <div class="form-group-box">
            <router-link tag="p" :to="{path: '/Institute/newmediamarketing'}" class="form-group__control form-group__scholl">
              <small>加入第二大学，获得专属学号</small>
            </router-link>
          </div>
        </div>
        <div class="form-group form-group-style">
          <label class="form-group__name xl">&nbsp;&emsp;班&emsp;&emsp;级
            <span class="symbol">(不可编辑)</span>
          </label>
          <div class="form-group-box">
            <router-link tag="p" :to="{path: '/Institute/newmediamarketing'}" class="form-group__control form-group__scholl">
              <small>加入第二大学，遇见更多同学</small>
            </router-link>
          </div>
        </div>
      </template>
      <div class="form-group">
        <label class="form-group__name">*&emsp;手&emsp;&emsp;机
        </label>
        <div class="form-group-box">
          <input type="text" id="mobileNumber" class="form-group__control" :class="{error: !isMobile}" @blur="blurData.mobileNumber = 1" @input="isChange = 1"  @propertychange="isChange = 1" placeholder="请输入手机号" maxlength="11" v-model.trim="submitData.mobileNumber">
        </div>
      </div>
    </section>

    <footer class="school-input-wrap-footer">
      <button class="school-input-wrap-footer__btn" @click="addSelfAndEdu">保存</button>
    </footer>
  </section>
</template>

<script>
// import API from "../../plugins/API";
// import _ from "lodash";
import schoolSearch from "@/components/SchoolSearch.vue";
export default {
  components: {
    schoolSearch
  },
  data() {
    return {
      isChange: 0,
      submitData: {
        realName: "",
        mobileNumber: "",
        gender: 1,
        eduId: 0
      },
      studentNo: 0,
      virtualSchoolBO: "",
      blurData: {
        realName: 0,
        mobileNumber: 0
      }
    };
  },
  computed: {
    isMobile() {
      if (this.blurData.mobileNumber == 0) {
        return true;
      } else {
        return /^([1][0-9]{10})$/.test(this.submitData.mobileNumber);
      }
    },
    isName() {
      if (this.blurData.realName == 0) {
        return true;
      } else {
        return /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z_\s ]){1,30}$/.test(
          this.submitData.realName
        );
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.isChange) {
      const answer = window.confirm("确定要离开吗？ 离开后将不保存已填信息");
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
  mounted() {
    document.title = '基本信息';

    let that = this;

    let student = this.$store.state.user.data.student;

    this.virtualSchoolBO = student.virtualSchoolBO || "";
    this.studentNo = student.studentNo;

    this.submitData = {
      realName: student.realName || student.nickName,
      mobileNumber: student.mobileNumber || "",
      gender: student.gender,
      eduId: student.eduId
    };

    if (this.$utils.isSuperBrowser) {
      this.$utils.setShare();
    } else if (this.$utils.isWXBrowser) {
      this.$weixin.init();
    }
  },
  methods: {
    getWindowStyle() {
      return {
        height: window.innerHeight - 40 + "px", //document.body.clientWidth / 25 * 7 + "px",
        width: window.innerWidth + "px"
      };
    },
    addSelfAndEdu() {
      let that = this;
      this.blurData = {
        realName: 1,
        mobileNumber: 1
      };
      if (!this.isName) {
        this.$super.toast.text("请输入1-30个汉字或字母、空格");
        return false;
      }
      if (!this.isMobile) {
        this.$super.toast.text("请输入正确的手机号");
        return false;
      }

      this.$API.saveExtra(this.submitData).then(data => {
        that.$store.dispatch("updateStudentInfo", data);
        this.$super.toast.text("保存成功~");
        this.isChange = 0;

        this.$router.go(-1);
      }).catch(err => {
          if (err.message.indexOf("timeout") != -1) {
            // console.log('超时囖囖囖囖咯');
            this.$super.toast.text("请求超时了，请稍后再试");
          } else {
            err.message && this.$super.toast.text(err.message == 'Network Error'?'请求出错了，请稍后再试' : err.message);
          }
        });
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="postcss">
@import "../../styles/common.pcss";
@import "../../styles/schoolRoll/schoolRoll.index.pcss";
</style>