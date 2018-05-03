var vm = new Vue({
	el: '#app',
	//	此处的data返回应该是一个object，vue-cli构建的里面才可返回方法
	data: {
		orderId: 202,
		list: [
		],
		list2: [
		],
		ordersProductEntity: {},
		allCount: '',
		waitMoney: '',
		money: '',
	},
	methods: {
		//	请求数据
		getBillOrder() {
			let url = getApiUrl('/rest/bills/view')
			$.ajax({
				type: 'get',
				data: {
					orderId: this.orderId
				},
				url: url,
				success: (data) => {
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
						this.list = data.data.noPaidList;
						this.list2 = data.data.paidList;
						this.money = data.data.money;
						this.waitMoney = (this.ordersProductEntity.totalAmount - this.money).toFixed(2);
						this.list.forEach((k, v) => {
							k.cdate = getTime(k.cdate, 1);
							this.allCount = data.data.ordersProductEntity.periodNumber;
						});
						this.list2.forEach((k, v) => {
							k.cdate = getTime(k.cdate);
						})
					} else {
						ddToast(data.message)
					}
				},
				error() {
					ddToast('网络错误')
				}
			})

			// this.$axios.get(url+'shop-service/rest/bills/Ddview',{'orderId':''}).then(res=>{
			// 	console.log(res)
			// })
		}
	},
	mounted() {
		this.getBillOrder()
	}
})