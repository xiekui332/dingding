var vm = new Vue({
    el: '#app',
    components: {},
    props: {
    },
    data: {  
      showA:true,
      showB:false
    },
    computed: {},
    watch: {},
    filters: {},
    methods: {
//  	确认归还按钮
      toRefundsing(){
        this.showA=false;
      },
//    页面加载函数
		init(){
			$.ajax({
				type:"post",
				url:getApiUrl("/nail/requestreturn.html"),
				async:true,
				data:{
					order_no:'20'
				},
				xhrFields:{
					withCredentials:true
				},
				crossDomain:true,
				success:res =>{
					console.log(res)
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