var vm = new Vue({
	el: '#app',
	components: {
	},
	props: {
	},
	data: {
		orderNo: 'ZY1522327243828780',
		express: {
			expressName: '',
			expressCode: ''
		},
		logistic: [
		]
	},
	computed: {
	},
	watch: {
	},
	filters: {
	},
	methods: {
		getLogistics() {
			let url = getApiUrl('/shop-test/rest/express/orderexpress')
			$.ajax({
				type: 'GET',
				url: url,
				data: {
					orderNo: orderNo,
				},
				success: (res) => {
					if (res.code == 200) {
						this.express.expressName = res.data.expressName;
						this.express.expressCode = res.data.expressCode;
						this.logistic = res.data.expressStatus;
					} else {
						ddToast(res.message)
					}
				},
				error: (e) => {
					ddToast('网络错误')
				}
			})
		}
	},
	created() {
	},
	destroyed() {
	},
	mounted() {
		this.orderNo = getUrlParam('orderNo')
		this.getLogistics()
	},
})