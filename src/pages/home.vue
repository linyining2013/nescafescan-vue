<template>
  <div>
    <div>点击点击</div>
    <div class="ft-plant-upload-button">
      <Button icon="ios-cloud-upload-outline" @click="zh_uploadFile">选择文件</Button>

      <input type="file" ref="evfile" @change="zh_uploadFile_change" class="hide" />
    </div>
    <img :src="dataimg" alt width="100%" />
  </div>
</template>
<script>
// import jsuper from "exports-loader?jsuper!@/../node_modules/SuperBrowserLibs/dist/jsuperV2.js";
import * as qiniu from "qiniu-js";
import API from "@/plugins/API";

export default {
  data() {
    return {
      isInvitation: true,
      token: "",
      dataimg: "",
      damaion: "http://qiniu.myfriday.cn/"
    };
  },
  created() {
    API.getQiNiuInfo().then(data => {
      // console.log(data);
    });
    API.getQiNiuToken().then(res => {
      this.token = res.uptoken;
    });
  },
  mounted() {
    //  console.log( $('.btn'));
    //选择上传文件
  },
  methods: {
    zh_uploadFile() {
      this.$refs.evfile.click();
    },
    //选择文件后触发的事件
    zh_uploadFile_change(evfile) {
      //后端获取token
      console.log(file);
      var uptoken = this.token;
      var file = evfile.target.files[0]; //Blob 对象，上传的文件
      var key = file.name; // 上传后文件资源名以设置的 key 为主，如果 key 为 null 或者 undefined，则文件资源名会以 hash 值作为资源名。
      console.log(file.size);
      if (file.size > 4000000) {
        this.$super.toast.text("图片最大只能上传 4MB 哦~");
        return;
      }

      let config = {
        useCdnDomain: true, //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
        region: qiniu.region.z0 // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
      };

      let putExtra = {
        fname: "", //文件原文件名
        params: {}, //用来放置自定义变量
        mimeType: null //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
      };
      // var requestUrl = qiniu.createMkFileUrl(
      // uploadUrl,
      // file.size,
      // key,
      // putExtra
      // );
      var observable = qiniu.upload(file, key, uptoken, putExtra, config);
      this.$refs.evfile.value = null;
      observable.subscribe({
        next: result => {
          // 主要用来展示进度
          // console.log(result);
        },
        error: errResult => {
          // 失败报错信息
          // console.log(errResult);
        },
        complete: result => {
          // 接收成功后返回的信息
          console.log(result);
          this.$super.toast.text("上传成功");
          this.dataimg = this.damaion + result.key;
        }
      });
    }
  }
};
</script>  
<style lang="postcss">
.hide {
  display: none;
}
</style>