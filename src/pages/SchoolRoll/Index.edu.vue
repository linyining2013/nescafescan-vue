<template>
  <section>
    <!-- 全部学礼  @click="addSelfAndEdu"-->
    <section id="school-edu-wrap" v-show="!editIsShow">
      <section class="school-edu-wrap__item" v-for="(value, index) in studentEduBOs" :key="value.id" @click="editEduShow(index)">
        <p class="graduation-date">{{$utils.setIssueTime(value.enrollmentDate, 'yyyy-mm')}} ~ {{(value.graduationDate > new Date().getTime())?'至今':$utils.setIssueTime(value.graduationDate, 'yyyy/mm/dd')}}</p>
        <p class="school-name">{{value.schoolName}}</p>
        <p class="school-roll" :type="(schoolRoll[value.schoolRoll]=1)">{{value.schoolRoll == 0? '本科':value.schoolRoll == 1?'硕士':value.schoolRoll == 2?'博士':'专科'}}&emsp;{{value.profession}}</p>
      </section>
      <footer class="school-input-wrap-footer">
        <button class="school-input-wrap-footer__btn" @click="editEduShow('')">添加更多教育经历</button>
      </footer>
    </section>

    <!-- 编辑学礼 -->
    <section id="school-edu-input-wrap" v-show="editIsShow">
      <div class="form-group form-group-triangle form-group-style">
        <label class="form-group__name">学校名称</label>
        <div class="form-group-box">
          <p class="form-group__control form-group__scholl" @click="showSchoolSearch">{{submitData.schoolName}}</p>
        </div>
      </div>
      <!-- <div class="form-group form-group-triangle form-group-style" v-if="submitData.eduId">
        <label class="form-group__name">学历/学位</label>
        <div class="form-group-box">
          <p class="form-group__control form-group__scholl">{{submitData.schoolRoll == 0?'专科':submitData.schoolRoll == 1?'硕士':submitData.schoolRoll == 2?'博士':'高中'}}</p>
        </div>
      </div> -->
      <div class="form-group form-group-triangle form-group-select">
        <label class="form-group__name">学历/学位</label>
        <div class="form-group-box">
          <select class="form-group__select" id="schoolRoll" name="schoolRoll" @change="isChange = 1" v-model="submitData.schoolRoll">
            <option value="">请选择学历/学位</option>
            <option value="-1">专科</option>
            <option value="0">本科</option>
            <option value="1">硕士</option>
            <option value="2">博士</option>
          </select>
        </div>
      </div>
      <div class="form-group form-group-triangle form-group-date">
        <label class="form-group__name">入学时间</label>
        <div class="form-group-box">
          <input type="month" class="form-group__control" placeholder="请输入入学时间" @change="isChange = 1" v-model="submitData.enrollmentDate">
        </div>
      </div>
      <div class="form-group form-group-triangle form-group-date">
        <label class="form-group__name">毕业时间</label>
        <div class="form-group-box">
          <input type="month" class="form-group__control" placeholder="请输入毕业时间" @change="isChange = 1" v-model="submitData.graduationDate">
        </div>
      </div>
      <div class="form-group form-group-triangle form-group-select">
        <label class="form-group__name">学院名称</label>
        <div class="form-group-box">
          <select class="form-group__select" id="academyId" name="academyId" @change="isChange = 1" v-model="submitData.academyId">
            <option value="">请选择学院名称</option>
            <option v-for="(value, index) in academyList" :key="value.id" :value="value.id">{{value.name}}</option>
          </select>
        </div>
      </div>
      <div class="form-group form-group-triangle">
        <label class="form-group__name">专业名称</label>
        <div class="form-group-box">
          <input type="text" class="form-group__control" placeholder="请输入专业名称" maxlength="20" @input="isChange = 1" @propertychange="isChange = 1" v-model.trim="submitData.profession">
        </div>
      </div>
      <footer class="school-input-wrap-footer">
        <button class="school-input-wrap-footer__btn" @click="editEdu">保存</button>
      </footer>
    </section>
    <!-- 学校搜索 -->
    <schoolSearch v-if="searchIsShow" v-on:selectedRes="selectedRes"></schoolSearch>
  </section>
</template>

<script>
// import API from "../../plugins/API";
import _ from "lodash";
import schoolSearch from "@/components/SchoolSearch.vue";
export default {
  components: {
    schoolSearch
  },
  data() {
    return {
      isNeedSaveEdu: false,
      needSaveEdu: "", //额外存储用户基础信息
      searchIsShow: false,
      editIsShow: false,
      studentEduBOs: [],
      graduationDate: 4070880000000,
      editIndex: "",
      schoolRoll: {
        0: 0,
        1: 0,
        2: 0,
        "-1": 0
      },
      academyList: [],
      submitData: {
        schoolName: "",
        enrollmentDate: "",
        graduationDate: "",
        schoolRoll: "",
        profession: "",
        eduId: 0,
        academyId: "",
        schoolId: 0
      },
      blurData: {
        profession: 0
      }
    };
  },
  beforeRouteLeave(to, from, next) {
    // document.querySelectorAll('input:focus')[0].blur();

    if (this.isChange || this.searchIsShow) {
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
    document.title = '教育经历';
    window.scrollTo(1, 1);

    let that = this;

    let studentEduBOs = this.$store.state.user.data.studentEduBOs;

    if (!studentEduBOs) {
      let that = this;
      this.$API.getMySchoolRollInfo().then(data => {
        that.studentEduBOs = data.studentEduBOs;
        that.renderData();
      });
    } else {
      this.studentEduBOs = studentEduBOs;
      that.renderData();
    }

    if (this.$utils.isSuperBrowser) {
      this.$utils.setShare();
    } else if (this.$utils.isWXBrowser) {
      this.$weixin.init();
    }
  },
  methods: {
    renderData() {
      if (this.studentEduBOs.length == 1 && this.studentEduBOs[0].id == 0) {
        this.needSaveEdu = this.studentEduBOs[0];
      }
    },
    editEdu() {
      let that = this;

      if (!this.submitData.schoolName) {
        this.$super.toast.text("请输入学校名称");
        return false;
      }

      if (!this.submitData.enrollmentDate) {
        this.$super.toast.text("请选择入学时间");
        return false;
      }

      if (this.submitData.graduationDate) {
        if (this.submitData.graduationDate < this.submitData.enrollmentDate) {
          this.$super.toast.text("毕业时间不能早于入学时间");
          return false;
        }
      }

      if (!this.submitData.academyId) {
        this.$super.toast.text("请选择学院名称");
        return false;
      }

      // if (!this.submitData.profession) {
      //   this.$super.toast.text("请输入专业名称");
      //   return false;
      // }

      let enrollmentDate = new Date(
          `${this.submitData.enrollmentDate}`
        ).getTime(),
        graduationDate = this.submitData.graduationDate
          ? new Date(`${this.submitData.graduationDate}`).getTime()
          : this.graduationDate;

      this.submitEduData(
        _.extend({}, this.submitData, {
          enrollmentDate: enrollmentDate,
          graduationDate: graduationDate
        }),
        data => {
          that.$store.dispatch("updateStudentInfo", data.studentInfoBO);

          if (that.editIndex !== "" && that.editIndex !== undefined) {
            that.studentEduBOs[that.editIndex] = data.curStudentEduBO;
            that.$store.dispatch("updateEduInfo", that.studentEduBOs);
          } else {
            that.studentEduBOs = [data.curStudentEduBO, ...that.studentEduBOs];
            that.$store.dispatch("updateEduInfo", that.studentEduBOs);
          }

          if (this.needSaveEdu != "" && this.isNeedSaveEdu) {
            this.submitEduData(this.needSaveEdu, data => {
              that.studentEduBOs[0] = data.curStudentEduBO;
              that.$store.dispatch("updateEduInfo", that.studentEduBOs);
              that.needSaveEdu = "";
              that.isNeedSaveEdu = false;
            });
          }

          that.$super.toast.text("保存成功~");
          that.editIsShow = false;

          that.isChange = 0;
        }
      );
    },
    editEduShow(index) {
      if (index !== undefined && index !== "") {
        let eduBo = this.studentEduBOs[index];
        if (eduBo.id == 0) {
          this.isNeedSaveEdu = false;
          this.needSaveEdu = "";
        }
        this.submitData = {
          schoolName: eduBo.schoolName,
          enrollmentDate: this.$utils.setIssueTime(
            eduBo.enrollmentDate,
            "yyyy-mm"
          ),
          graduationDate:
            eduBo.graduationDate != this.graduationDate
              ? this.$utils.setIssueTime(eduBo.graduationDate, "yyyy-mm")
              : "",
          schoolRoll: eduBo.schoolRoll,
          profession: eduBo.profession,
          eduId: eduBo.id,
          schoolId: eduBo.schoolId,
          academyId: eduBo.academyId || ""
        };
        eduBo.schoolId && this.searchAcademy(eduBo.schoolId);
      } else {
        this.isNeedSaveEdu = true;
        this.submitData = {
          schoolName: "",
          enrollmentDate: "",
          graduationDate: "",
          schoolRoll: "",
          profession: "",
          eduId: 0,
          academyId: "",
          schoolId: 0
        };
      }

      this.editIndex = index;
      this.editIsShow = true;
    },
    showSchoolSearch() {
      this.searchIsShow = true;
      document.title = "选择学校";
    },
    selectedRes(value) {
      if (value) {
        this.isChange = 1;
        this.submitData.schoolName = value.name;
        this.submitData.schoolId = value.id;
        this.submitData.academyId = "";
        this.searchAcademy(value.id);
      }
      document.title = "教育经历";
      this.searchIsShow = false;
    },
    searchAcademy(schoolId) {
      let that = this;
      this.$API.getSchoolAcademies({ schoolId: schoolId }).then(data => {
        that.academyList = data;
      });
    },

    submitEduData(submitData, fn) {
      this.$API
        .editEdu(submitData)
        .then(data => {
          fn(data);
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
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="postcss">
@import "../../styles/common.pcss";
@import "../../styles/schoolRoll/schoolRoll.index.pcss";
</style>