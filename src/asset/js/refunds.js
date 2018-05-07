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
          async:true,
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
    },
  })