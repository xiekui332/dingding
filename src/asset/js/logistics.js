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
								time: dateFormat(parseInt(this.createTime), 16, '-','-',''),
								status: '正在为你备货，请耐心等待'
							})
						}
					} else {
						// this.flag = 1
						// this.logistic.push({
						// 	time: dateFormat(parseInt(this.createTime), 16, '-','-',''),
						// 	status: '正在为你备货，请耐心等待'
						// })
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
		ddShare(window.location.href)
		
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
	},
})