var vm = new Vue({
    el: '#app',
    components: {},
    props: {
    },
    data: {  
      orderNo: '',
      showA:true,
      showB:false,
      dataArray:[],
    },
    computed: {},
    watch: {},
    filters: {},
    methods: {
      toRefundsing(){
        $.ajax({
          type:'post',
          url:getPhpApiUrl('/nail/confirmreturn.html'),
          data:{
            order_no: this.orderNo
          },
          xhrFields:{
            withCredentials:true
          },
          crossDomain:true,
          success:res=>{
            if(res.code == 200){
              this.showA = false
              if(res.data.status == 1){
                this.showB = true;
              }else if(res.data.status == 0){
                this.showB = false;
              }
            }
          },
          error:e=>{
            ddToast('网络错误')
          }
        })
      },
      init(){
        $.ajax({
          type:"post",
          url:getPhpApiUrl("/nail/requestreturn.html"),
          // async:true,
          data:{
            order_no: this.orderNo
          },
          xhrFields:{
            withCredentials:true
          },
          crossDomain:true,
          success:res =>{
            if(res.code == 200){
              Number(res.data.Liquidated_amount).toFixed(2);
              Number(res.data.total_amount).toFixed(2);
              this.dataArray = res.data;

              if (res.data.status == 0) { //归还中
                this.showA = false
              } else if (res.data.status == 1)  { //归还成功
                this.showA = false
                this.showB = true
              }
            }
          },
          error:e =>{
            ddToast('网络错误')
          }
        });
      },
      toOrderDetail() {
        window.history.go(-1);
      }
    },
    created() {},
    destroyed() {},
    mounted() {
      this.orderNo = getUrlParam('orderNo')
      this.init();

      dd.ready(function(){
        dd.biz.navigation.setLeft({
            control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
            text: '返回',//控制显示文本，空字符串表示显示默认文本
            onSuccess :function(result) {
                dd.biz.navigation.goBack({
                    onSuccess : function(result) {
                    },
                    onFail : function(err) {}
                })
            },
            onFail:function(err){}
        });
      }) 
    },
  })