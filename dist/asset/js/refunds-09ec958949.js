"use strict";var vm=new Vue({el:"#app",components:{},props:{},data:{showA:!0,showB:!1,dataArray:[]},computed:{},watch:{},filters:{},methods:{toRefundsing:function(){var t=this;this.showA=!1,$.ajax({type:"post",url:getApiUrl("/nail/confirmreturn.html"),data:{order_no:"ZY1525401037862742"},xhrFields:{withCredentials:!0},crossDomain:!0,success:function(e){200==e.code&&(1==e.data.status?t.showB=!0:0==e.data.status&&(t.showB=!1))},error:function(t){ddToast("网络错误")}})},init:function(){var t=this;$.ajax({type:"post",url:getApiUrl("/nail/requestreturn.html"),async:!0,data:{order_no:"ZY1525401037862742"},xhrFields:{withCredentials:!0},crossDomain:!0,success:function(e){200==e.code&&(Number(e.data.Liquidated_amount).toFixed(2),Number(e.data.total_amount).toFixed(2),t.dataArray=e.data)},error:function(t){ddToast("网络错误")}})}},created:function(){},destroyed:function(){},mounted:function(){document.body.clientWidth;document.documentElement.style.fontSize=document.documentElement.clientWidth/7.5+"px",this.init()}});