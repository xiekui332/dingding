"use strict";var vm=new Vue({el:"#app",data:{orderId:0,noPaidList:[],paidList:[],ordersProductEntity:{},allCount:"",waitMoney:"",money:""},methods:{getBillOrder:function(){var t=this,o=getApiUrl("/shop-test/rest/bills/view");$.ajax({type:"get",data:{orderId:this.orderId},url:o,success:function(o){200==o.code?(t.ordersProductEntity=o.data.ordersProductEntity,null==o.data.ordersProductEntity.totalAmount&&(o.data.ordersProductEntity.totalAmount=0),null==o.data.money&&(t.money=0),t.ordersProductEntity.totalAmount=o.data.ordersProductEntity.totalAmount.toFixed(2),t.noPaidList=o.data.noPaidList,t.paidList=o.data.paidList,t.money=o.data.money,t.waitMoney=(t.ordersProductEntity.totalAmount-t.money).toFixed(2),t.noPaidList.forEach(function(d,e){d.cdate=getTime(d.cdate,1),t.allCount=o.data.ordersProductEntity.periodNumber}),t.paidList.forEach(function(t,o){t.cdate=getTime(t.cdate,1)})):ddToast(o.message)},error:function(){ddToast("网络错误")}})}},mounted:function(){this.orderId=getUrlParam("orderId"),this.getBillOrder()}});