var vm = new Vue({
	el: '#app',
	components: {
	},
	props: {
	},
	data: {
		flag: 0,
		orderNo: '',
		createTime: '',
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
					orderNo: this.orderNo,
				},
				success: (res) => {
					if (res.code == 200) {
						if (res.data) {
							this.express.expressName = res.data.expressName;
							this.express.expressCode = res.data.expressCode;
							this.logistic = res.data.expressStatus;
						} else {
							this.flag = 1
							this.logistic.push({
								time: dateFormat(parseInt(this.createTime), 19, '-','-',' '),
								status: '正在为你备货，请耐心等待'
							})
						}
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
		this.createTime = getUrlParam('createTime')
		this.getLogistics()
	},
})