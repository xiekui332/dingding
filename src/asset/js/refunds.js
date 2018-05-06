var vm = new Vue({
    el: '#app',
    components: {},
    props: {
    },
    data: {  
      showA:true,
      showB:false,
      dataArray:[],
    },
    computed: {},
    watch: {},
    filters: {},
    methods: {
//  	确认归还按钮
      toRefundsing(){
        this.showA=false;
        $.ajax({
          type:'post',
          url:getApiUrl('/nail/confirmreturn.html'),
          data:{
            order_no:'ZY1525401037862742'
          },
          xhrFields:{
            withCredentials:true
          },
          crossDomain:true,
          success:res=>{
           // console.log(res)
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
        
       
        dd.ready(function() {
         
          dd.runtime.permission.requestAuthCode({
              corpId: "corpid",
              onSuccess: function(result) {
                console.log(result)
              /*{
                  code: 'hYLK98jkf0m' //string authCode
              }*/
              },
              onFail : function(err) {}
        
          });
      });


      },
//    页面加载函数
		init(){
			$.ajax({
				type:"post",
				url:getApiUrl("/nail/requestreturn.html"),
				async:true,
				data:{
					order_no:'ZY1525401037862742'
				},
				xhrFields:{
					withCredentials:true
				},
				crossDomain:true,
				success:res =>{
         // console.log(res)
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
		}
    },
    created() {},
    destroyed() {},
    mounted: function () {
      var body = document.body.clientWidth;
      document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
      this.init();
    },
  })