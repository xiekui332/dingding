
var vm = new Vue({
	el: '#app',
	data: {
		user: {},
		// nailUserId: 1,
		// nailUserInfoId: 1,
		productId: 0,
		skuId: 0,
		hasDefaultAddress: false,
		address: {},
		order: {
			nailUserId: '1',
			nailCropId: '1',
			productId: '',
			productPriceId: '',
			companyName: '',
			count: '',
			provinceId: '',
			cityId: '',
			districtId: '',
			address: '',
			name: '',
			phone: '',
			is_once_pay: 0,
			order_remark: '',
			invitationCode: ''
		},
		goodsInfo: {
			productName: '',
			cover: '',
			brief: '',
			count: 1,
			productPrice: {}
		},
		isAgreement: false,
		showAddressTip: false,
		readFile: false,	//	提示勾选阅读提示
		showPop: false,
		popTitle: '',
		popContent: [],
		setStyle: '',
	},
	methods: {
		submitOrder() {
			if (!this.submitValid()) {
				return
			}
			let url = getApiUrl('/shop-test/rest/orders/dingding/create')
			$.ajax({
				url: url,
				type: "POST",
				dataType: "json",
				data: this.order,
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: result => {
					if (result.code == 200) {
						// 没有进行授权需求去授权
						location.href = 'userAuth.html?productId=' + this.order.productId


						//已授权直接支付
					} else {
						ddToast(result.message)
					}
				},
				error: e => {
					ddToast('网络错误')
				}
			})

		},
		submitValid() {
			//	判断是否添加收货地址，改变show的状态触发提示
			if (this.hasDefaultAddress == false) {
				this.showAddressTip = true;		//	没有添加收货地址
				return false
			} 
			//	判断勾选
			if (this.isAgreement == false) {
				this.readFile = true;
				$('.readFile').show();
				setTimeout(() => {
					this.readFile = false;
					$('.readFile').hide();
				}, 1000);

				return false
			} 

			return true
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
		getAddress() {
			let url = getApiUrl('/shop-test/api/address/get_default_address/')
			$.ajax({
				url: url,
				type: "GET",
				dataType: "json",
				data: {
					nailUserId: this.user.userId,
					nailUserInfoId: this.user.corpId
				},
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: result => {
					if (result.code == 200) {
						if (result.data) {
							this.hasDefaultAddress = true
							this.order.name = result.data.username
							this.order.phone = result.data.mobile

							//要改
							this.order.address = result.data.detail

							this.order.detail = result.data.detail
							this.order.provinceId = result.data.provinceId
							this.order.cityId = result.data.cityId
							this.order.districtId = result.data.districtId
							this.order.companyName = result.data.company
							this.order.mobile = result.data.mobile.substring(0, 4) + '****' + result.data.mobile.substring(7)
						} else {
							this.hasDefaultAddress = false
						}
					} else {
						ddToast(result.message)
					}
				},
				error: e => {
					ddToast('网络错误')
				}
			})
		},
		toManageAddress() {
			location.href = 'manageAddress.html'
		},
		getGoodsInfo() {
			let url = getApiUrl('/shop-test/rest/ddproducts/dingding/view')
			$.ajax({
				url: url,
				type: "GET",
				dataType: "json",
				data: {
					id: this.order.productId
				},
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: result => {
					if (result.code == 200) {
						result.data.productPriceEntity.some(item => {
							if (item.id == this.order.productPriceId) {
								this.goodsInfo.productPrice = item
								return true
							}
						})
						this.goodsInfo.productName = result.data.productName
						this.goodsInfo.cover = result.data.cover
						this.goodsInfo.brief = result.data.brief
						this.goodsInfo.count = this.order.count
						
						this.getTotalAmount()
					} else {
						ddToast(result.message)
					}
				},
				error: e => {
					ddToast('网络错误')
				}
			})
		},
		getTotalAmount() {
			this.goodsInfo.totalAmount = (this.goodsInfo.count * this.goodsInfo.productPrice.price * this.goodsInfo.productPrice.timeLength).toFixed(2)
		},
		countChange() {
			this.getTotalAmount()
		}
	},
	mounted() {
		this.user = getSession()
		// console.log(this.user)
		this.order.productId = getUrlParam('productId')
		this.order.productPriceId = getUrlParam('productPriceId')
		this.order.count = getUrlParam('count')
		this.getAddress()
		this.getGoodsInfo()
	},
})