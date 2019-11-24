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
      updateCartData:"c罗123",
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
        var updateCart02 = function (data) {
          return new Promise(function (resolve, reject) {
              resolve(data);
          })
        }
        
        updateCart01(this.updateCartData).then(res => {
          console.log(res)
          return updateCart02(res + "0202")
        }).then(res => { 
        
          console.log(res)
        }).then(res => {

        }).then(res => {
          
        }).then(res => {
          
        })

          // // 更新购物车
          // let sendList=JSON.stringify(this.goodsList)
          // updateCart({
            //     openId:localStorage.getItem('openId'),
          //     goodsJson:sendList
          // }).then(res=>{
            // this.updateCartData = "c罗";
          // })
          // console.log(this.Cluo)
     


        
      }
  }
}
</script>
<style scoped>

</style>
