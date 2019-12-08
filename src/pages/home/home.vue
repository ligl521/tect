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
      console.log("1111")

    }
  },
  mounted:function(){
    this.data()
  }
}
</script>
<style scoped>

</style>