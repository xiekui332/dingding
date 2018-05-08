"use strict";var vm=new Vue({el:"#app",components:{},props:{},data:{user:{},tabDefault:[{id:-1,name:"全部"},{id:9,name:"租用中"},{id:2,name:"待发货"},{id:3,name:"待收货"},{id:0,name:"待支付"}],tabNew:[],tab:[{id:-1,name:"全部"},{id:9,name:"租用中"},{id:2,name:"待发货"},{id:3,name:"待收货"},{id:0,name:"待支付"}],open:!1,tabId:-1,clientWidth:{},categryList:[[{id:10,name:"租期已满"},{id:1,name:"订单取消"},{id:15,name:"审核中"},{id:16,name:"审核失败"}]],orderList:[],page:1,pageSize:15,loading:!1,isEnd:!1,orderStatus:{cancel:"1",unpay:"0",lease:"9",complete:"10",send:"2",receive:"3",end:"4",authing:"15",authFail:"16"}},computed:{},watch:{},filters:{},methods:{loadMore:function(){0!=this.orderList&&1!=this.isEnd&&(this.loading=!0,this.getOrderList())},getOrderList:function(){var t=this,e=getApiUrl("/shop-test/rest/orders/dingding/list");$.ajax({url:e,type:"GET",dataType:"json",data:{userid:this.user.userId,nailCropId:this.user.corpId,status:this.tabId,page:this.page,rows:this.pageSize},xhrFields:{withCredentials:!0},crossDomain:!0,success:function(e){if(200==e.code){if(0===e.data.data.length)return t.isEnd=!0,void(t.loading=!1);e.data.data.forEach(function(t){t.orderTime=dateFormat(t.createTime,20,"-","-"," ")}),t.orderList=t.orderList.concat(e.data.data),t.page+=1,t.loading=!1}else ddToast(e.message)},error:function(t){ddToast("网络错误")}})},getOrderStatus:function(t){return t==this.orderStatus.unpay?orderState="待支付":t==this.orderStatus.lease?orderState="租赁中":t==this.orderStatus.complete?orderState="租期已满":t==this.orderStatus.send?orderState="待发货":t==this.orderStatus.receive?orderState="待收货":t==this.orderStatus.end?orderState="交易结束":t==this.orderStatus.authing?orderState="审核中":t==this.orderStatus.authFail?orderState="审核失败":t==this.orderStatus.cancel?orderState="订单取消":orderState="订单已失效",orderState},showCategory:function(){this.open=!this.open,this.open?(this.tabNew=this.tab,this.tab=this.tabDefault):this.tab=this.tabNew},chooseCategory:function(t,e){e==-1&&(e=15==t||16==t||1==t||10==t?1:0),e&&(this.tabNew=this.categryList[e-1],this.tab=this.tabNew),this.tabId=t,this.open=!1,this.orderList=[],this.page=1,this.loading=!1,this.isEnd=!1,this.getOrderList()},toLogistics:function(t){location.href="logistics.html?orderNo="+t.orderNo+"&createTime="+t.createTime},toOrderDetail:function(t){location.href="orderDetail.html?orderId="+t.orderId}},created:function(){},destroyed:function(){},mounted:function(){this.user=getSession(),this.tabId=getUrlParam("status"),this.chooseCategory(this.tabId||-1,-1)}});