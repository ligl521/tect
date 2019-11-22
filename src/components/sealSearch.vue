<template>
  <div class="box">
    <button @click="toApple">提交</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hasNoAddress:false,
      updateCartData:"",
      Cluo:"",
    }
  },
  methods: {
      toApple:function(){
        var updateCart01 = function (data) {
          return new Promise(function (resolve, reject) {

              resolve(data);




          })
        }
        if(this.hasNoAddress){
          this.$message({
            message: '请补全收货地址',
            type: 'warning'
          })
        }else{
          updateCart01("this.updateCartData").then(res => {
            return updateCart01(this.updateCartData)
          }).then(res => {
            this.Cluo = res
            console.log(this.Cluo)
          })

          // // 更新购物车
          // let sendList=JSON.stringify(this.goodsList)
          // updateCart({
            //     openId:localStorage.getItem('openId'),
          //     goodsJson:sendList
          // }).then(res=>{
            this.updateCartData = "c罗";
          // })
          function test(){

          }
            console.log(this.Cluo)


        }
      }
  }
}
</script>
<style scoped>

</style>
