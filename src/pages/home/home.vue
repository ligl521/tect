<template>
  <div>
    <button @click="btn">tijaio</button>
  </div>
</template>
<script>
import {getSchoolLibrary} from '@/assets/api/api';
export default {
  data() {
    return {
    }
  },
  methods:{
    btn:function(){
      this.$router.push({path:'/tect'});
    },
    data:function(){
      getSchoolLibrary({

      }).then(res => {
        console.log(res)
      })
      console.log("11122311")

    }
  },
  mounted:function(){
    this.data()
  }
}
</script>
<style scoped>

</style>