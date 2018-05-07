var vm = new Vue({
	el: '#app',
	data: {
		phone: '',
		orderId: 0,
		goodsInfo: {
			productName: '',
			cover: '',
			brief: '',
			totalAmount: '',
			count: '',
		},
		bottom: true,        //  若底部有页脚，则需要距离底部一定距离
		showPop: false,
		statusTime: '',      //  时间
		popTitle: '',
		popContent: [],
		setStyle: '',
		url: '',
		status: -1,  //  订单状态
		orderStatus: '暂无',     //  默认状态
		statusWords: '暂无',
		objAddress: '',
		orderNo: '',
		createTime: '',
		id: ''
	},
	methods: {
		getOrderDetail() {
			// let url = getApiUrl('/shop-test/rest/orders/dingding/view')
			let url = 'http://192.168.17.214:8080/rest/orders/dingding/view'

			$.ajax({
				type: 'get',
				data: {
					id: this.orderId
				},
				url: url,
				success: (data) => {
					if (data.code == 200) {
						vm.status = data.data.status;
						vm.status = 9
						if (vm.status == 9) {
							vm.statusWords = '商品租用到期后买断或完成回收，冻结预授权金额将会释放';
							vm.orderStatus = '租用中';
							vm.bottom = true;
						} else if (vm.status == 3) {
							vm.statusWords = data.data.expressName + '：' + data.data.expressLastInfo.time + ' ' + data.data.expressLastInfo.status;
							vm.orderStatus = '待收货';
							vm.bottom = true;
						} else if (vm.status == 0) {
							vm.statusWords = '请尽快完成支付，把宝贝带回家哦';
							vm.orderStatus = '待支付';
							vm.bottom = true;
						} else if (vm.status == 10) {
							vm.statusWords = '宝贝到期啦，重新下单吧';
							vm.orderStatus = '租期已满';
							vm.bottom = true;
						} else if (vm.status == 2) {
							vm.statusWords = '订单已经在备货中，请耐心等待';
							vm.orderStatus = '待发货';
							vm.bottom = true;
						} else if (vm.status == 16) {
							vm.statusWords = '请调整完善审核资料，增加审核成功概率';
							vm.orderStatus = '审核拒绝';
							vm.bottom = true;
						} else if (vm.status == 15) {
							vm.statusWords = '授权信息正在审核中，请耐心等待';
							vm.orderStatus = '审核中';
							vm.bottom = true;
						} else if (vm.status == 1) {
							vm.statusWords = '订单取消，用户主动取消';
							vm.orderStatus = '订单取消';
							vm.bottom = true;
						} else {
							vm.statusWords = '订单失效';
							vm.orderStatus = '订单取消';
							vm.bottom = true;
						}

						//  转化时间
						vm.statusTime = getTime(data.data.createTime, 2);
						vm.phone = data.data.phone.substring(0,3)+'****'+data.data.phone.substring(7);
						//    保证取值为两位有效数字
						if (data.data.totalAmount == null || data.data.totalAmount == 0) {
							data.data.totalAmount = 0.00
						};
						data.data.totalAmount = (data.data.totalAmount).toFixed(2);

						vm.objAddress = data.data;
						vm.goodsInfo.productName = data.data.productName;
						vm.goodsInfo.cover = data.data.cover;
						vm.goodsInfo.brief = data.data.brief;
						vm.goodsInfo.totalAmount = data.data.totalAmount;
						vm.goodsInfo.count = data.data.quantity;
						vm.orderNo = data.data.sn;
						vm.createTime = data.data.createTime;
					}
				},
				error: (e) => {
					ddToast('网络错误')
				}
			})
		},
		toBillOrder() {
			location.href = 'billOrder.html?orderId=' + this.orderId
		},
		toUserAuth() {
			location.href = 'userAuth.html'
		},
		openModal(modalType) {
			if (modalType == 'payTip') {
				this.popTitle = '支付宝免密支付',
					this.setStyle = ''
				this.popContent = [
					'租用中，相关费用由商户通过支付宝向用户发起扣款，如约归还物品后，支付宝免密支付自动取消'
				]
			} else if (modalType == 'signTip') {
				this.popTitle = '签收须知'
				this.setStyle = ''
				this.popContent = [
					'收货当天你需求:',
					'1.检查商品外包装完整；',
					'2.快递本人签收；',
					'3.签收当天视为合约生效'
				]
			} else if (modalType == 'contactTip') {
				this.popTitle = '客服电话'
				this.setStyle = 'textAlign:center;fontSize:.38rem;lineHeight:2'
				this.popContent = [
					'0571-85180735'
				]
			}
			this.showPop = true
		},
		//  申请归还
		retBack() {
			location.href = 'refunds.html?orderId=' + this.orderId
		},
		//  跳转物流信息
		toLogistics() {
			location.href = 'logistics.html?orderNo=' + this.orderNo + '&createTime=' + this.createTime
		}
	},
	mounted() {
		this.orderId = getUrlParam('orderId')
		this.getOrderDetail()
	},
})