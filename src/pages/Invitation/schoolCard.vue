<template>
  <section id="school-card-wrap" :class="{'fixed-style': noticeIsShow}">
    <section v-show="!noticeIsShow">
      <header class="school-card-wrap__header">你已经成功报名第二大学，<br/>请填写以下真实信息，<br/>以便参与之后的企业参观与实训活动。</header>
      <section class="school-card-wrap-form" v-show="!searchIsShow">
        <div class="school-card-wrap-form__title">入学报名表</div>
        <div class="form-group ">
          <label class="form-group__name">* 姓名:</label>
          <div class="form-group-box require">
            <input type="text" class="form-group__control" :class="{error: !isName}" placeholder="请输入姓名" maxlength="30" @blur="blurData.realName = 1" v-model.trim="submitData.realName">
          </div>
        </div>
        <div class="form-group ">
          <label class="form-group__name">* 手机:</label>
          <div class="form-group-box require">
            <input type="text" class="form-group__control" :class="{error: !isMobile}" @blur="blurData.mobileNumber = 1" placeholder="请输入正在使用的手机号" maxlength="11" v-model.trim="submitData.mobileNumber">
          </div>
        </div>
        <div class="form-group form-group-triangle form-group-style">
          <label class="form-group__name">* 学校:</label>
          <div class="form-group-box">
            <p class="form-group__control form-group__scholl" @click="showSchoolSearch">{{submitData.schoolName}}</p>
          </div>
        </div>
        <div class="form-group form-group-triangle form-group-select">
          <label class="form-group__name">* 学院:</label>
          <div class="form-group-box">
            <select class="form-group__select" id="academyId" name="academyId" v-model="submitData.academyId">
              <option value="">请选择学院</option>
              <option v-for="(value, index) in academyList" :key="value.id" :value="value.id">{{value.name}}</option>
            </select>
          </div>
        </div>
        <div class="form-group ">
          <label class="form-group__name">* 专业:</label>
          <div class="form-group-box require">
            <!-- <input type="text" class="form-group__control" placeholder="请输入专业" v-model.trim="submitData.profession"> -->
            <input type="text" class="form-group__control" :class="{error: !isProfession}" @blur="blurData.isProfession = 1" placeholder="请输入专业" v-model.trim="submitData.profession">
          </div>
        </div>
        <div class="form-group form-group-triangle form-group-select">
          <label class="form-group__name">* 年级:</label>
          <div class="form-group-box">
            <select class="form-group__select" id="enrollment" name="enrollmentDate" v-model="submitData.enrollmentDate">
              <option value="">请选择年级</option>
              <option value="2019">19级</option>
              <option value="2018">18级</option>
              <option value="2017">17级</option>
              <option value="2016">16级</option>
              <option value="2015">15级</option>
              <option value="2014">14级</option>
              <option value="2013">13级</option>
              <option value="2012">12级</option>
              <option value="2011">11级</option>
              <option value="2010">10级</option>
              <option value="2009">09级</option>
            </select>
          </div>
        </div>
        <div class="form-group form-group-radio">
          <label class="form-group__name">* 性别:</label>
          <div class="form-group-box ">
            <label class="form-group__radioC" :class="{checked: (submitData.gender == 1)}" for="gender__male">
              <span class="symbol"></span> 男</label>
            <label class="form-group__radioC" :class="{checked: (submitData.gender == 0)}" for="gender__female">
              <span class="symbol"></span> 女</label>
            <input class="form-group__radio" id="gender__female" type="radio" name="gender" value="0" v-model="submitData.gender" />
            <input class="form-group__radio" id="gender__male" type="radio" name="gender" value="1" v-model="submitData.gender" />
          </div>
        </div>
        <div class="form-group form-group-triangle form-group-select">
          <label class="form-group__name">* 地址:</label>
          <div class="form-group-box">
            <select class="form-group__select" id="addressProvinceId" name="addressProvinceId" @change="changeProvince" v-model="submitData.addressProvinceId">
              <option value="">请选择省份</option>
              <option v-for="(value, index) in provinceList" :key="value.id" :value="value.id">{{value.name}}</option>
            </select>
          </div>
          <div class="form-group-box">
            <select class="form-group__select" id="addressCityId" name="addressCityId" v-model="submitData.addressCityId">
              <option value="">请选择城市</option>
              <option v-for="(value, index) in cityList" :key="value.id" :value="value.id">{{value.name}}</option>
            </select>
          </div>
        </div>
        <div class="form-group form-group-single">
          <label class="form-group__name"></label>
          <div class="form-group-box require">
            <input type="text" class="form-group__control" :class="{error: !isAddress}" @blur="blurData.addressDetail = 1" placeholder="请输入详细地址" maxlength="30" v-model.trim="submitData.addressDetail">
          </div>
        </div>
        <footer class="school-card-wrap__footer">注：地址信息方便官方寄送毕业证书、实习证明等</footer>
        <button class="school-card-wrap__btn" @click="addSelfAndEdu">已确认填写真实信息</button>
      </section>
      <schoolSearch v-if="searchIsShow" v-on:selectedRes="selectedRes"></schoolSearch>
    </section>
    <div v-show="noticeIsShow" class="school-card__notice" v-if="noticePic != ''">
      <img :src="noticePic" width="100%" />
      <p class="school-card__tip">*长按保存图片到手机</p>
      <div :class="{'btn-group': btnType}">
        <router-link tag="button" :to="{path: '/practice/' + $store.state.user.data.practiceComboId}" class="school-card__btn">进入新媒体学院</router-link>
        <router-link v-if="btnType" tag="button" :to="{path: '/'}" class="school-card__btn">进入第二大学首页</router-link>
      </div>
    </div>
  </section>
</template>

<script>
// import API from "../../plugins/API"; :class="{'btn-group': }"
import _ from "lodash";
import schoolSearch from "@/components/SchoolSearch.vue";
export default {
  components: {
    schoolSearch
  },
  data() {
    return {
      searchIsShow: false,
      noticeIsShow: false,
      noticePic: "",
      btnType: 0,
      submitData: {
        realName: "",
        mobileNumber: "",
        gender: 1,
        enrollmentDate: "",
        addressDetail: "", //联系地址街道等详情
        academyId: "", //学院id
        addressCityId: "", //联系地址城市id
        addressProvinceId: "", //联系地址省id
        profession: "", //专业
        schoolId: "",
        schoolName: "", //高中分类，则直接添加学校名称
        schoolRoll: "", //学校分类 -1：专科 0：专科\本科 1：硕士 2：博士
        eduId: 0
      },
      blurData: {
        realName: 0,
        mobileNumber: 0,
        addressDetail: 0,
        isProfession: 0
      },
      provinceList: [],
      academyList: [],
      cityList: []
      //   academyName: "" //学院名称
    };
  },
  computed: {
    isProfession() {
      if (this.blurData.profession == 0) {
        return true;
      } else {
        return (
          this.submitData.profession != undefined &&
          this.submitData.profession != ""
        );
      }
    },
    isMobile() {
      if (this.blurData.mobileNumber == 0) {
        return true;
      } else {
        return /^([1][0-9]{10})$/.test(this.submitData.mobileNumber);
      }
    },
    isAddress() {
      if (this.blurData.addressDetail == 0) {
        return true;
      } else {
        return (
          this.submitData.addressDetail != undefined &&
          this.submitData.addressDetail != ""
        );
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
  beforeDestroy() {
    window.scrollTo(1, 1);
  },
  mounted() {
    this.btnType = this.$router.currentRoute.query.type || 0;

    let that = this;
    let student = this.$store.state.user.data.student;

    if (!student.noticePic && !student.isNeedAddEdu) {
      this.noticeIsShow = true;

      let img = new Image();
      img.onload = function() {
        that.noticePic = student.noticePic;
      };
      img.src = student.noticePic;
    } else {
      this.submitData = {
        realName: student.realName || student.nickName,
        mobileNumber: student.mobileNumber,
        gender: student.gender,
        enrollmentDate: student.enrollmentDate
          ? this.$utils.setIssueTime(student.enrollmentDate, "yyyy")
          : "",
        addressDetail: student.addressDetail, //联系地址街道等详情
        academyId: student.academyId, //学院id
        addressCityId: student.cityId, //联系地址城市id
        addressProvinceId: student.provinceId, //联系地址省id
        profession: student.profession, //专业
        schoolId: student.schoolId,
        schoolName: student.schoolName, //高中分类，则直接添加学校名称
        schoolRoll: 0, //学校分类 -1：专科 0：本科 1：硕士 2：博士
        eduId: student.eduId
      };

      this.searchProvinceList();
      student.schoolId && this.searchAcademy(student.schoolId);
      student.provinceId && this.searchCityList();
    }

    if (this.$utils.isSuperBrowser) {
      this.$utils.setShare();
    } else if (this.$utils.isWXBrowser) {
      this.$weixin.init();
    }
  },
  methods: {
    addSelfAndEdu() {
      let that = this;
      this.blurData = {
        realName: 1,
        mobileNumber: 1,
        addressDetail: 1,
        profession: 1
      };
      if (!this.isName) {
        this.$super.toast.text("请输入1-30个汉字或字母、空格");
        return false;
      }
      if (!this.isMobile) {
        this.$super.toast.text("请输入正确的手机号");
        return false;
      }

      if (!this.submitData.academyId) {
        this.$super.toast.text("请选择学院名称");
        return false;
      }

      if (!this.isProfession) {
        this.$super.toast.text("请填写你的专业");
        return false;
      }
      if (!this.submitData.addressProvinceId) {
        this.$super.toast.text("请选择省份");
        return false;
      }
      if (!this.submitData.addressCityId) {
        this.$super.toast.text("请选择城市");
        return false;
      }
      if (!this.isAddress) {
        this.$super.toast.text("请输入详细地址");
        return false;
      }
      let enrollmentDate = new Date(
        `${this.submitData.enrollmentDate * 1}/09/01`
      ).getTime();

      this.$API
        .addSelfAndEdu(
          _.extend({}, this.submitData, { enrollmentDate: enrollmentDate })
        )
        .then(data => {
          that.$store.dispatch("updateStudentInfo", data);
          that.noticeIsShow = true;
          that.noticePic = data.noticePic;
        })
        .catch(err => {
          if (err.message.indexOf("timeout") != -1) {
            // console.log('超时囖囖囖囖咯');
            this.$super.toast.text("请求超时了，请稍后再试");
          } else {
            err.message &&
              this.$super.toast.text(
                err.message == "Network Error"
                  ? "请求出错了，请稍后再试"
                  : err.message
              );
          }
        });
    },
    changeProvince() {
      this.submitData.addressCityId = "";
      this.searchCityList();
    },
    searchCityList() {
      let that = this;
      this.$API
        .getProvinceCities({ provinceId: this.submitData.addressProvinceId })
        .then(data => {
          that.cityList = data;
        });
    },
    searchProvinceList() {
      let that = this;
      this.$API.getAllProvinces().then(data => {
        that.provinceList = data;
      });
    },
    searchAcademy(schoolId) {
      let that = this;
      this.$API.getSchoolAcademies({ schoolId: schoolId }).then(data => {
        that.academyList = data;
      });
    },
    showSchoolSearch() {
      this.searchIsShow = true;
      document.title = "选择学校";
    },
    selectedRes(value) {
      if (value) {
        this.submitData.schoolName = value.name;
        this.submitData.schoolId = value.id;
        this.submitData.academyId = "";

        this.searchAcademy(value.id);
      }

      document.title = "第二大学";
      this.searchIsShow = false;
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="postcss">
@import "../../styles/common.pcss";
@import "../../styles/test.pcss";
#school-card-wrap {
  padding: 60px 30px 70px;
  background: #4877b6 url(../../assets/images/practice/bg.png) 0 -30px no-repeat;
  font-size: 28px;
  background-size: contain;
  color: #fff;

  &.fixed-style {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding-top: 20px;
    overflow: auto;
    z-index: 10;
    -webkit-overflow-scrolling: touch;
    .school-card__notice {
      @extend %clearfix;
      text-align: center;
      padding-bottom: 50px;
      .school-card__tip {
        font-size: 24px;
        line-height: 74px;
        text-align: center;
        color: #ffffff;
      }
      .school-card__btn {
        border-radius: 30px;
        width: 100%;
        @extend %normal-btn;
        background-color: #fff;
        color: #3861a3;
        &:after {
          border-left-color: #3861a3;
        }
      }
      .btn-group {
        .school-card__btn {
          display: inline-block;
          width: 46%;
          &:last-child {
            float: right;
            &:after {
              border-left-color: #3861a3;
            }
          }
          &:first-child {
            float: left;
            background-color: #4877b6;
            color: #fff;
            border: 3px solid #fff;
            &:after {
              border-left-color: #fff;
            }
          }
        }
      }
    }
  }
  .school-card-wrap__header {
    font-size: 32px;
    line-height: 44px;
    color: #fefefe;
  }
  .school-card-wrap__footer {
    margin: 40px 0;
    text-align: center;
    font-size: 22px;
    line-height: 60px;
    color: #d87575;
  }
  .school-card-wrap__btn {
    display: block;
    width: 100%;
    border-radius: 30px;
    @extend %normal-btn;
  }
  .school-card-wrap-form {
    color: #404040;
    background-color: #fff;
    padding: 60px;
    border-radius: 10px;
    margin-top: 40px;
    .school-card-wrap-form__title {
      position: relative;
      text-align: center;
      color: #2a4d8a;
      font-size: 38px;
      line-height: 52px;
      font-weight: bold;
      &:after,
      &:before {
        content: "";
        display: inline-block;
        width: 64px;
        height: 3px;
        background-color: #2a4d8a;
        vertical-align: middle;
      }
      &:after {
        margin-left: 40px;
      }
      &:before {
        margin-right: 40px;
      }
    }
  }
}

#school-card-wrap {
  .form-group {
    position: relative;
    height: 60px;
    margin-top: 40px;
    @extend %flex-parent;
    .form-group__name {
      display: block;
      width: 120px;
      line-height: 70px;
    }
    .form-group-box {
      position: relative;
      @extend %flex-child;
      overflow: hidden;
      .form-group__control {
        display: block;
        width: 100%;
        height: 60px;
        line-height: 60px;
        position: relative;
        border: 0;
        background-color: #fff;
        padding: 5px 8px;
        font-size: 28px;
        border-radius: 0;
        border-bottom: 3px solid #e6e6e6;
        box-sizing: border-box;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        &.error {
          border-bottom: 3px solid #d87575;
          color: #d87575;
        }
      }
      &.require {
        &:after {
          position: absolute;
          top: 25px;
          right: -20px;
          content: "";
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 12px;
          background-color: #e15656;
          box-shadow: 0px 3px 4px 0px rgba(225, 86, 86, 0.52);
          vertical-align: text-top;
          margin-left: 20px;
        }
      }
    }
    &.form-group-select {
      .form-group__select {
        font-size: 28px;
        color: #404040;
        display: block;
        border: 0;
        background: #fff;
        height: 60px;
        line-height: 60px;
        width: 100%;
        border-radius: 0;
        outline: none;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        -ms-appearance: none;
        border-bottom: 3px solid #e6e6e6;
        padding-left: 6px;
      }
    }
    &.form-group-radio {
      .form-group__radioC {
        position: relative;
        font-size: 28px;
        height: 60px;
        line-height: 60px;
        color: #404040;
        padding: 0 30px 0 60px;
        .symbol {
          position: absolute;
          display: block;
          top: -4px;
          left: 0;
          width: 36px;
          height: 36px;
          border-radius: 36px;
          border: 3px solid #e6e6e6;
          vertical-align: middle;
          margin-right: 8px;
          &:after {
            content: "";
            display: block;
            position: absolute;
            top: 7px;
            left: 7px;
            width: 22px;
            height: 22px;
            border-radius: 22px;
            background-color: #fff;
            transition: background-color 0.4s;
            -moz-transition: background-color 0.4s;
            /* Firefox 4 */
            -webkit-transition: background-color 0.4s;
            /* Safari 和 Chrome */
            -o-transition: background-color 0.4s;
            /* Opera */
          }
        }
        &.checked {
          .symbol {
            &:after {
              background-color: #3861a3;
            }
          }
        }
      }
      .form-group__radio {
        visibility: hidden;
      }
    }
    &.form-group-triangle {
      .form-group-box {
        position: relative;
        &:after {
          position: absolute;
          right: 8px;
          top: 25px;
          content: "";
          display: inline-block;
          width: 0;
          height: 0;
          margin-left: 20px;
          border-top: 11px solid #404040;
          border-right: 8px solid transparent;
          border-left: 8px solid transparent;
        }
      }
    }
    &.form-group-address {
    }
  }
}
</style>