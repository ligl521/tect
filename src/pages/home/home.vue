<template>
  <div>
    <button @click="btn">tijaio</button>
    <button @click="btn">tijaio</button>
    <button @click="btn">tijaio</button>
    <button @click="btn">tijaio</button>
    <button @click="btn">tijaio</button>
    <button @click="btn">tijaio</button>
    <button @click="btn">tijaio</button>

    <button @click="btn">tijaio</button>
    <button @click="btn">tijaio</button>，了么五官科方面赶快来仍可乱扔快乐
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
      console.log("11122 311")

    }
  },
  mounted:function(){
    this.data()
  }
}
</script>
<style scoped>

</style>
