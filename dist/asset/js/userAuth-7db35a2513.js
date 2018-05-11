"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},vm=new Vue({el:"#app",components:{},props:{},data:{user:{},productId:"",orderNo:"",userAuth:{nailCropId:"",userid:"",company:"不匠",companyDelegateImg:"asset/images/icon/proof.png",dingIndexImg:"asset/images/icon/proof.png",idcard:"321322199602052213",name:"周磊",registerNo:"330104000287730",status:0,rejectReason:"的v"},isFirstAuth:!0,canEdit:!0,validate:["company","idcard","name","registerNo"],authStatus:{success:1,fail:2,audit:0,invalid:3},authHead:{icon:"",title:"",describe:[]},showPop:!1,popTitle:"客服电话",setStyle:"textAlign:center;fontSize:.38rem;lineHeight:2",popContent:["0571-85180735"]},computed:{},watch:{},filters:{},methods:{onFileChange:function(t,e){var s=this,i=getApiUrl("/shop-test/img/upload.do");uploadImg(t,i).then(function(t){0===e?s.userAuth.dingIndexImg=t:1===e&&(s.userAuth.companyDelegateImg=t)})["catch"](function(t){ddToast(t)})},closeImg:function(t){0===t?this.userAuth.dingIndexImg="asset/images/icon/proof.png":1===t&&(this.userAuth.companyDelegateImg="asset/images/icon/proof.png")},authValidate:function(){var t=this,e=!0;return this.validate.some(function(s){if(!t.userAuth[s])return e="请填写必填项",!0}),1!=e?e:("asset/images/icon/proof.png"==this.userAuth.dingIndexImg||"asset/images/icon/proof.png"==this.userAuth.companyDelegateImg?e="请上传凭证":checkIdcard(this.userAuth.idcard)||(e="身份证号输入有误"),e)},saveUserAuth:function(){var t=this,e=this.authValidate();if(1!=e)return void ddToast(e);var s=getApiUrl("/shop-test/rest/dingDingUserInfo/Ddcreate");this.userAuth.nailCropId=this.user.corpId,this.userAuth.userid=this.user.userId,$.ajax({url:s,type:"POST",data:JSON.stringify(this.userAuth),contentType:"application/json",xhrFields:{withCredentials:!0},crossDomain:!0,success:function(e){200==e.code?t.zhimaAuth():ddToast(e.message)},error:function(t){ddToast("网络错误")}})},getUserAuth:function(){var t=this,e=getApiUrl("/shop-test/rest/dingDingUserInfo/Ddlist");$.ajax({url:e,type:"POST",dataType:"json",data:{nailCropId:this.user.corpId,userId:this.user.userId},xhrFields:{withCredentials:!0},crossDomain:!0,success:function(e){200==e.code?(t.isFirstAuth=!1,t.userAuth=e.data,t.userAuth.status==t.authStatus.fail?(t.canEdit=!0,t.authHead.icon="asset/images/icon/auth_fail.png",t.authHead.title="审核拒绝",t.authHead.describe[0]=t.userAuth.rejectReason,t.authHead.describe[1]="请重新编辑授权信息，再次提交审核"):t.userAuth.status==t.authStatus.success?(t.canEdit=!1,t.authHead.icon="asset/images/icon/auth_success.png",t.authHead.title="审核通过",t.authHead.describe[0]="恭喜你，授权信息已经审核通过；可以前往订单列表页完成支付"):t.userAuth.status==t.authStatus.audit?(t.canEdit=!1,t.authHead.icon="asset/images/icon/auth_audit.png",t.authHead.title="审核中",t.authHead.describe[0]="你的授权信息正在审核中，请耐心等待"):t.userAuth.status==t.authStatus.invalid&&(t.isFirstAuth=!0,t.canEdit=!0)):7010==e.code&&(t.isFirstAuth=!0,t.canEdit=!0)},error:function(t){ddToast("网络错误")}})},updateUserAuth:function(){var t=this,e=this.authValidate();if(1!=e)return void ddToast(e);var s=getApiUrl("/shop-test/rest/dingDingUserInfo/Ddupdate");$.ajax({url:s,type:"POST",data:JSON.stringify(this.userAuth),contentType:"application/json",xhrFields:{withCredentials:!0},crossDomain:!0,success:function(e){200==e.code?t.zhimaAuth():ddToast(e.message)},error:function(t){ddToast("网络错误")}})},zhimaAuth:function(){var t=getPhpApiUrl("/nail/zhimaauth.html");$.ajax({url:t,type:"POST",dataType:"json",data:{name:this.userAuth.name,card:this.userAuth.idcard,productId:this.productId,nail_crop_id:this.user.corpId,userid:this.user.userId,order_no:this.orderNo},xhrFields:{withCredentials:!0},crossDomain:!0,success:function(t){200==t.code?location.href=t.data.url:ddToast(t.message)},error:function(t){ddToast("网络错误")}})},imgPreview:function(){console.log("undefined"==typeof ImagePreview?"undefined":_typeof(ImagePreview))}},created:function(){},destroyed:function(){},mounted:function(){this.user=getSession(),this.productId=getUrlParam("productId"),this.orderNo=getUrlParam("orderNo"),this.getUserAuth()}});