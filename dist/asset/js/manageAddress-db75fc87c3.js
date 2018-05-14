"use strict";var vm=new Vue({el:"#app",data:{user:{},activeAddressId:-1,addressList:[],addressType:"",backUrl:""},methods:{getAddressList:function(){var s=this,e=getApiUrl("/shop-test/api/address/get_shipping_address_list/");$.ajax({url:e,type:"POST",dataType:"json",data:{nailUserId:this.user.userId,nailUserInfoId:this.user.corpId},xhrFields:{withCredentials:!0},crossDomain:!0,success:function(e){200==e.code?(s.addressList=e.data,s.addressList.some(function(e){if(e.isDefault)return s.activeAddressId=e.addressId,!0})):6019==e.code?(s.addressList=e.data,s.activeAddressId=0):ddToast(e.message)},error:function(s){ddToast("网络错误")}})},checkAddress:function(s,e){var d=this,t=getApiUrl("/shop-test/api/address/set_default_address/");$.ajax({url:t,type:"POST",dataType:"json",data:{nailUserId:this.user.userId,nailUserInfoId:this.user.corpId,addressId:s},xhrFields:{withCredentials:!0},crossDomain:!0,success:function(e){if(200==e.code){if(d.activeAddressId=s,getUrlParam("product")&&"null"!=getUrlParam("product")){var t="orderComfirm.html?product="+getUrlParam("product")+"&time="+ +new Date;dd.biz.util.openLink({url:t})}}else ddToast(e.message)},error:function(s){ddToast("网络错误")}})},toAddressEdit:function(s){s?location.href="editAddress.html?addressId="+s+"&product="+getUrlParam("product"):location.href="editAddress.html?product="+getUrlParam("product")},deleteAddress:function(s){var e=this;this.$dialog.confirm({title:"确认要删除收货地址吗",message:""}).then(function(){var d=getApiUrl("/shop-test/api/address/del_address/");$.ajax({url:d,type:"POST",dataType:"json",data:{nailUserId:e.user.userId,nailUserInfoId:e.user.corpId,addressId:s},xhrFields:{withCredentials:!0},crossDomain:!0,success:function(s){200==s.code?e.getAddressList():ddToast(s.message)},error:function(s){ddToast("网络错误")}})})["catch"](function(){ddToast("网络错误")})}},mounted:function(){this.user=getSession(),this.getAddressList(),this.addressType=getUrlParam("addressType"),"userCenter"==this.addressType?this.backUrl="userCenter.html":this.backUrl=window.sessionStorage.getItem("tzdDingDingOrderComfirmUrl")}});