<template>
<div v-loading.fullscreen="uploadLoading" element-loading-text="图片上传中" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- 表单 -->
    <el-form ref="createNewsform" status-icon :rules="rules" class="createNews" :model="form" label-width="100px">
      <el-form-item label="商品名称" prop="goodsName" required>
        <el-input v-model="form.goodsName"></el-input>
      </el-form-item>
      <el-form-item label="作者：" prop="goodsAuthor" required>
         <el-input v-model="form.goodsAuthor"></el-input>
      </el-form-item>
      <el-form-item label="价格：" prop="goodsPrice" required>
         <el-input v-model="form.goodsPrice"></el-input>
      </el-form-item>
        <div style="padding:20px;">
            <div style="margin-top:20px;text-align: left;">
              <span class="inforImgLabel"><span style="color:#F00;padding:1px 2px;">*</span>商品封面：</span>
              <img :src="uploadImgSrc" width="140" height="200" alt="">
              <input type="file" style="display:none" id="change" accept="image" @change="change">
              <label for="change" class="imgInputLabel">更改图片</label>
            </div>
            <p style="color:#999;text-align:left;text-indent:80px;margin-top:10px;font-size:16px;">注意:文件大小限制<span style="color:#000;font-size:14px;">300kb</span>,尺寸为<span style="color:#000;font-size:14px;">280*400</span>像素最佳</p>
        </div>
        <div class="container" v-show="cropperStatus">
            <div style="width: 800px;height: 500px;overflow:hidden;margin-left:100px;">
                <img id="image" :src="cropperImgUrl" alt="Picture">
            </div>
            <el-button type="primary" class="makeSure" @click="uploadCutImg">确定上传</el-button>
        </div>

        <el-form-item label="出版社：" prop="goodsPress" required>
         <el-input v-model="form.goodsPress"></el-input>
        </el-form-item>
         <el-form-item label="出版时间：" prop="goodsPubdate" required>
            <el-date-picker
                v-model="form.goodsPubdate"
                type="year"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
         <el-form-item label="商品类型：" prop="goodsType" required>
           <el-radio-group v-model="form.goodsType" size="medium">
            <el-radio border label="新学说书籍"></el-radio>
          </el-radio-group>
        </el-form-item>
         <el-form-item label="库存：" prop="goodsStock" required>
             <el-input-number v-model="form.goodsStock" :min="1" :max="9999" label="描述文字"></el-input-number>
        </el-form-item>
         <el-form-item label="权重：" prop="goodsLevel" required>
             <el-input-number class="TextLeft" v-model="form.goodsLevel" :min="1" :max="5" label="描述文字"></el-input-number>
        </el-form-item>
         <el-form-item label="标签：" prop="goodsLabel" required>
         <el-input v-model="form.goodsLabel"></el-input>
        </el-form-item>
        <el-form-item label="系列：" prop="goodsSeries" required>
         <el-input v-model="form.goodsSeries"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio-group v-model="form.goodsState" size="medium">
            <el-radio border @change="siftTypeChange" label="上架"></el-radio>
            <el-radio border @change="siftTypeChange" label="下架"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="销量：" prop="goodsSales" required>
            <el-input v-model="form.goodsSales" label="描述文字"></el-input>
        </el-form-item>
        <el-form-item label="访问量：" prop="goodsVisitcount" required>
             <el-input v-model="form.goodsVisitcount" label="描述文字"></el-input>
        </el-form-item>
        <el-form-item label="商品描述：" prop="goodsDescribe" required>
         <el-input :autosize="{ minRows: 4, maxRows: 8}" type="textarea" v-model="form.goodsDescribe"></el-input>
        </el-form-item>
        <div ref="editor" style="text-align:left;"></div>
      <div>
        <el-button @click="createNewsFun" class="createNews" type="primary">{{updateOrAdd}}</el-button>
        <el-button @click="backRouter" class="createNews comebackHome" type="primary">返回</el-button>
      </div>
    </el-form>
</div>

</template>

<script>
  //引入编辑器
  import E from 'wangeditor'
  import Cropper from "cropperjs"
  export default {
    data() {
      return {
        picValue: "",//input数据
        cropper: "",//图片裁剪对象
        croppable: false,//图片裁剪是否准备好
        cropperImgUrl: "",//改变iputfile时图片改变
        imgCropperData: {//接受的图片类型
          accept: "image/jpeg, image/png, image/jpg"
        },
        cropperStatus:false,//是否显示裁剪
        uploadImgSrc:'',//要上传的图片
        form: {
          goodsName: '',
          goodsAuthor: '',
          goodsPress: '',
          goodsPubdate:'',
          goodsType: '新学说书籍',
          goodsStock:'',
          goodsLevel:'',
          goodsLabel:'',
          goodsSeries:'',
          goodsState:'',
          goodsSales:'',
          goodsVisitcount:'',
          goodsDescribe:'',
          goodsPrice:''
        },
        updateOrAdd:'立即创建',//立即创建或确认修改
        fileData:{
          type:'nsi-official/article/'//上传图片参数
        },
        articleContent:'',//编辑器返回的值
        uploadLoading:false,//上传图片loading
        uploadImgStatus:false,//预览图片状态
        //表单规则
        rules: {
          goodsName: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          goodsAuthor: [
            { required: true, message: '请输入作者', trigger: 'blur' }
          ],
          goodsPress: [
            { required: true, message: '请输入出版社', trigger: 'blur' }
          ],
          goodsPubdate: [
            { required: true, message: '请输入出版时间', trigger: 'blur' }
          ],
          goodsPrice: [
            { required: true, message: '请输入商品价格', trigger: 'blur' }
          ],
          goodsType: [
            { required: true, message: '请输入商品类型', trigger: 'blur' }
          ],
          goodsStock: [
            { required: true, message: '请输入库存', trigger: 'blur' }
          ],
          goodsLevel: [
            { required: true, message: '请输入权重', trigger: 'blur' }
          ],
          goodsLabel: [
            { required: true, message: '请输入标签', trigger: 'blur' }
          ],
          goodsSeries: [
            { required: true, message: '请输入系列', trigger: 'blur' }
          ],
          goodsState: [
            { required: true, message: '请输入状态', trigger: 'blur' }
          ],
          goodsSales: [
            { required: true, message: '请输入销量', trigger: 'blur' }
          ],
          goodsVisitcount: [
            { required: true, message: '请输入访问量', trigger: 'blur' }
          ],
          goodsDescribe: [
            { required: true, message: '请输入商品描述', trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      //加载动画
      setLoader(){
          this.loading = this.$loading({
            lock: true,
            text: '加载中,请稍候',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
      },
      //上传图片
      uploadCutImg(){
        this.uploadLoading=true
        this.cropperStatus = false;
        var croppedCanvas;
        var roundedCanvas;
        if (!this.croppable) {
          return;
        }
        croppedCanvas = this.cropper.getCroppedCanvas({width:750,height:400});
        this.uploadImgSrc = croppedCanvas.toDataURL("image/jpeg",.5);
        this.uploadImgSrc=this.uploadImgSrc.slice(23,)
        //上传图片
        this.postImg();
      },
      //取消上传
      cancel() {
          this.cropperStatus = false;
          var obj = document.getElementById('change') ;
          obj.outerHTML=obj.outerHTML;
      },
      //创建url路径
      getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
          // basic
          url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
          // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
          // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      //input框change事件，获取到上传的文件
      change(e) {
        var that=this
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        let type = files[0].type; //文件的类型，判断是否是图片
        let size = files[0].size; //文件的大小，判断图片的大小
        if (this.imgCropperData.accept.indexOf(type) == -1) {
          that.$message({
              message: '请选择我们支持的图片格式！',
              type: 'error'
          });
          return false;
        }
        if (size > 307200) {
          that.$message({
              message: '请选择300kb以下的图片！',
              type: 'error'
          });
          return false;
        }
        this.picValue = files[0];
        this.cropperImgUrl = this.getObjectURL(this.picValue);
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload=function(){
          let imgUrlBase64=this.result
          var image = new Image();
          image.src= imgUrlBase64;
          image.onload=function(){
            console.log(imgUrlBase64)
               let width=image.width
               let height=image.height
               if(width==280&&height==400){
                 let flagData=imgUrlBase64.split(',')
                  that.postImg(flagData[1])
                  that.uploadLoading=true
               }else{
                  that.$message({
                      message: '图片必须为280*400像素',
                      type: 'error'
                  });
                  // that.cropperStatus=true
                  // //每次替换图片要重新得到新的url
                  // if (that.cropper) {
                  //   that.cropper.replace(that.cropperImgUrl);
                  // }
                  // that.cropperStatus = true;
               }
          };
        }
      },
      //提交上传函数
      postImg(imgurl) {
        var that=this
        if(imgurl){this.uploadImgSrc=imgurl}
        var formData =new URLSearchParams();
        formData.append('strImage', this.uploadImgSrc);
        formData.append("type", 'nsi-shop/goods-info/');
        let url=that.baseUrl+'/manager/talent/get_base64_image.do'
        that.$axios.post(url,formData).then(resp => {
            that.uploadImgSrc=resp.data.data.url
            that.uploadLoading=false
            that.$message({
              message: '提交图片成功',
              type: 'success'
            });
        }).catch(err=>{
            that.uploadLoading=false
            that.$message({
              message: '提交图片失败',
              type: 'error'
            });
        })
        //console.log(this.uploadImgSrc)
      },
      //立即创建
      createNewsFun(){
        var that=this
        this.$refs.createNewsform.validate((valid) => {
          console.log(valid,that.uploadImgSrc)
          if(valid&&that.uploadImgSrc!='') {
            that.setLoader()
            let url=that.baseUrl+'/goods/goods_add.do'
            let addNews=new URLSearchParams();
            let successMessage='新建资讯成功'
            let errorMessage='修改资讯失败'
            if(that.$route.params.id=='add'){
              url=that.baseUrl+'/goods/goods_add.do'
              successMessage='添加商品成功'
              errorMessage='添加商品失败'
            }else{
              url=that.baseUrl+'/goods/goods_modify.do'
              addNews.append('id',that.$route.params.id);
              successMessage='修改商品信息成功'
              errorMessage='修改商品信息失败'
            }
            addNews.append('goodsPrice',that.form.goodsPrice);
            addNews.append('goodsImg',that.uploadImgSrc);
            addNews.append('goodsName',that.form.goodsName);
            addNews.append('goodsAuthor',that.form.goodsAuthor);
            addNews.append('goodsPress',that.form.goodsPress);
            addNews.append('goodsPubdate',that.form.goodsPubdate);
            addNews.append('goodsType',that.form.goodsType);
            addNews.append('goodsStock',that.form.goodsStock);
            addNews.append('goodsLevel',that.form.goodsLevel);
            addNews.append('goodsLabel',that.form.goodsLabel);
            addNews.append('goodsSeries',that.form.goodsSeries);
            addNews.append('goodsState',that.form.goodsState);
            addNews.append('goodsSales',that.form.goodsSales);
            addNews.append('goodsVisitcount',that.form.goodsVisitcount);
            addNews.append('goodsDescribe',that.form.goodsDescribe);
            addNews.append('goodsInfo',that.articleContent);
            that.$axios.post(url,addNews).then(resp => {
                that.$message({
                  message: successMessage,
                  type: 'success'
                });
                that.loading.close()
                that.$router.push({path:'/mall/goods'});
            }).catch(err=>{
                that.loading.close()
                that.$message({
                  message: errorMessage,
                  type: 'error'
                });
            })
          } else {
              that.$message.error('有字段为空');
              return false;
          }
        });
      },
      dateToDateNum(endTime){
        var date=new Date();
    date.setFullYear(endTime.substring(0,4));
    date.setMonth(endTime.substring(5,7)-1);
    date.setDate(endTime.substring(8,10));
    return Date.parse(date)/1000;
      },
      //改变模版类型
      siftTypeChange(type){
        this.form.goodsState=type
      },
      //返回上一级
      backRouter(){
        this.$router.push({path:'/mall/goods'});
      },
    },
    //加载编辑器
    mounted(){
      var that=this
      that.setLoader()
       //加载编辑器组件
      var editor = new E(this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.articleContent = html
      }
      editor.customConfig.uploadImgServer = that.baseUrl+'/manager/talent/upload.do'
      editor.customConfig.uploadImgParams = {
          'type':'nsi-official/article/'//上传图片参数
      }
      editor.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {
            that.uploadLoading=true
        },
        success: function (xhr, editor, result) {
            that.uploadLoading=false
            that.$message({
              message: '图片上传成功',
              type: 'success'
            });
        },
        fail: function (xhr, editor, result) {
            that.uploadLoading=false
            that.$message({
              message: '图片上传成功,但未插入',
              type: 'error'
            });
        },
        error: function (xhr, editor) {
            that.uploadLoading=false
            that.$message({
              message: '图片上传失败',
              type: 'error'
            });
        },
        timeout: function (xhr, editor) {
            that.uploadLoading=false
            that.$message({
              message: '上传图片超时,请检查网络连接',
              type: 'error'
            });
        },
        customInsert: function (insertImg, result, editor) {
            var url = result.data.url
            insertImg(url)
        }
      }
      editor.customConfig.uploadFileName = 'file'
      editor.customConfig.uploadImgTimeout = 10000
      editor.customConfig.pasteTextHandle = function (content) {
          if(content.indexOf('"=""')>=0){
            that.$message({
              message: '文章有不规范字符,请粘贴纯文本',
              type: 'error'
            });
          }
          return content.replace(/<img src="http:\/\//g,'<img src="https://')

      }
      editor.create()
      if(that.$route.params.id=='add'){
        that.loading.close();
        return;
      }
      that.updateOrAdd='确认修改'
      //编辑请求默认资讯
      let url=that.baseUrl + "/goods/goods_detail.do"+"?Id="+that.$route.params.id
      that.$axios.get(url).then(function(response){
        let data=response.data.data

        that.form.goodsVisitcount=data.goodsVisitcount
        that.form.goodsDescribe=data.goodsDescribe
        that.articleContent=data.goodsInfo

        //调用编辑器方法，默认数据
        editor.cmd.do('insertHTML', that.articleContent)
        that.loading.close();

      }).catch(function (response){
        that.loading.close();
        that.$message({
          message: '数据请求失败',
          type: 'error'
        });
      });
    },
  }
</script>

