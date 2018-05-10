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
    }
})