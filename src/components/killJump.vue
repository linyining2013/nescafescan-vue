<template>
   
     <modal-diago :isShow='jShow' class="killJump" :kill3='jShow'  @on-hide='hideKill' ></modal-diago>
</template>
<script>
import ModalDiago from "@/components/ModalDiago";
 
export default {
  components:{
      ModalDiago
  },
  data() {
    return {
        jShow:this.todos,
      jText:false,
       startTime:this.$store.state.startTime,
        endTime:this.$store.state.endTime,
      date:'',
      time1:'',
      time2:'',
    };
  },
  created() {
     this.init()
      },
    
  mounted() {
      //  console.log( $('.btn'));
    //选择上传文件
  
  },
  computed:{
		todos:function() {  //通过方法访问
            return this.$store.getters.secKillGet;
        },
  },   
  //  computed:{
  //    now(){
  //   //     if(!localStorage.getItem('kill')) {
  //   //        this.date = new Date().getTime()
  //   //          this.time1 = new Date('2019/09/05 10:30:00').getTime();
  //   //          this.time2 = new Date('2019/09/05 16:05:00').getTime();
  //   //         console.log(this.jShow);
  //           // if (this.time1 <= date && this.time2 >= date){
  //           //   this.$store.dispatch("updateUnReadNum", true);
  //           //   return true
  //           // }
  //           // else{
  //   //           this.$store.dispatch("updateUnReadNum", false);
  //   //           return false
  //   //         }
  //   //  }
  //   clg
  //   return false
  //    }
  //  }, 
  methods: {
    hideKill(){
        localStorage.setItem('kill','kill')
      // this.$store.dispatch("updateUnReadNum", false);
         this.jShow = false
    },
    init(){
         var inte= setInterval(() => {
          // console.log(new Date(this.startTime).getTime());
          // console.log(new Date(this.endTime).getTime());
          console.log(new Date(this.startTime).getTime() <= new Date().getTime() && new Date(this.endTime).getTime() >= new Date().getTime());
                if (new Date(this.startTime).getTime() <= new Date().getTime() && new Date(this.endTime).getTime() >= new Date().getTime()) {

                    if(!localStorage.getItem('kill')) {
                      this.jShow=true
                    }else{
                      this.jShow=false
                    }
                } else {
                  if(new Date(this.startTime).getTime() <= new Date().getTime()){
                    clearInterval(inte)
                  }
                    this.jShow=false
                }
            }, 1000);
    }
  }
};
</script>  
<style lang="postcss" >
.killJump{
    a{
        height: 113px!important;
        line-height: 113px!important;
        width: 412px!important;
        font-size: 48px!important;
        border-radius: 57px!important;
    }
}
</style>
