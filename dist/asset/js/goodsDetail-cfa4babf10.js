"use strict";var vm=new Vue({el:"#app",components:{},props:{},data:{productId:0,tabActive:0,timeActive:0,monthPrice:0,productPriceId:0,goodsDetail:{},popupVisible:!1,count:1,showPop:!1,popTitle:"客服电话",setStyle:"textAlign:center;fontSize:.38rem;lineHeight:2",popContent:["0571-85180735"]},computed:{},watch:{},filters:{},methods:{getGoodsDetail:function(){var t=this,o=getApiUrl("/rest/ddproducts/dingding/view");$.ajax({url:o,type:"GET",dataType:"json",data:{id:this.productId},xhrFields:{withCredentials:!0},crossDomain:!0,success:function(o){200==o.code?(t.goodsDetail=o.data,t.goodsDetail.productPrice=o.data.productPriceEntity[0].price.toFixed(2),t.goodsDetail.productDeposit=o.data.productDeposit.toFixed(2),t.monthPrice=t.goodsDetail.productPrice,t.productPriceId=o.data.productPriceEntity[0].id):ddToast(o.message)},error:function(t){ddToast("网络错误")}})},tabTap:function(t){this.tabActive=t},openSku:function(){this.popupVisible=!0},skuTap:function(t,o){this.timeActive=o,this.monthPrice=t.price.toFixed(2),this.productPriceId=t.id},adjust:function(t){if(!(t<0&&this.count<=1))return t>0&&this.count>=parseInt(this.goodsDetail.inventory)?void ddToast("超过库存了"):void(this.count+=t)},openModal:function(){this.showPop=!0},toOrderComfirm:function(){location.href="orderComfirm.html?productId="+this.productId+"&productPriceId="+this.productPriceId+"&count="+this.count}},created:function(){},destroyed:function(){},mounted:function(){this.productId=getUrlParam("productId"),this.getGoodsDetail()}});