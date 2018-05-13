var vm = new Vue({
	el: '#app',
	data: {
		orderId: 0,
		noPaidList: [],
		paidList: [],
		ordersProductEntity: {},
		allCount: '',
		waitMoney: '',
		money: '',
	},
	methods: {
		//	请求数据
		getBillOrder() {
			let url = getApiUrl('/shop-test/rest/bills/view')
			$.ajax({
				type: 'get',
				data: {
					orderId: this.orderId
				},
				url: url,
				success: (data) => {
					//console.log(data)
					if (data.code == 200) {
						this.ordersProductEntity = data.data.ordersProductEntity;

						// 如果值为null则赋值0
						if (data.data.ordersProductEntity.totalAmount == null) {
							data.data.ordersProductEntity.totalAmount = 0;
						}
						if (data.data.money == null) {
							this.money = 0;
						}
						this.ordersProductEntity.totalAmount = data.data.ordersProductEntity.totalAmount.toFixed(2);
						this.noPaidList = data.data.noPaidList;
						this.paidList = data.data.paidList;
						this.money = data.data.money;
						this.waitMoney = (this.ordersProductEntity.totalAmount - this.money).toFixed(2);
						this.noPaidList.forEach((k, v) => {
							k.cdate = getTime(k.cdate, 1);
							this.allCount = data.data.ordersProductEntity.periodNumber;
						});
						this.paidList.forEach((k, v) => {
							k.cdate = getTime(k.cdate, 1);
						})
					} else {
						ddToast(data.message)
					}
				},
				error() {
					ddToast('网络错误')
				}
			})
		}
	},
	mounted() {
		this.orderId = getUrlParam('orderId')
		this.getBillOrder()

		// dd.ready(function(){
		// 	dd.biz.navigation.setLeft({
		// 		control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
		// 		text: '返回',//控制显示文本，空字符串表示显示默认文本
		// 		onSuccess :function(result) {
		// 			dd.biz.navigation.goBack({
		// 				onSuccess : function(result) {
		// 				},
		// 				onFail : function(err) {}
		// 			})
		// 		},
		// 		onFail:function(err){}
		// 	});
		// }) 
	}
})