var vm = new Vue({
    el:'#app',
    //	此处的data返回应该是一个object，vue-cli构建的里面才可返回方法
    data:{
        orderId: '',
        orderInfo: {}
    },
    methods:{
        getOrderDetail() {
            let url = getApiUrl('/shop-test/rest/orders/dingding/view')
			$.ajax({
				type: 'get',
				data: {
					id: this.orderId
				},
				url: url,
				success: (res) => {
					if (res.code == 200) {
                        this.orderInfo = res.data
					}
				},
				error: (e) => {
					ddToast('网络错误')
				}
			})
        },
        toOrderDetail(){
            location.href = 'orderDetail.html?orderId=' + this.orderId
        },
        toHome(){
            location.href = 'home.html'
        }
    },
    mounted() {
        this.orderId = getUrlParam('orderId')
        this.getOrderDetail()

        dd.ready(() => {
            dd.biz.navigation.setLeft({
                control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                text: '返回',//控制显示文本，空字符串表示显示默认文本
                onSuccess :(result) => {
                    location.href = 'home.html'
                },
                onFail :(err)=> {}
            });
        }) 
    }
})