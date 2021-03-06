
var vm = new Vue({
	el: '#app',
	data: {
		user: {},
		productDeposit: 0,
		zmStatus: 0,
		productId: 0,
		skuId: 0,
		hasDefaultAddress: false,
		address: {},
		order: {
			nailUserId: '',
			nailCropId: '',
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
			invitationCode: '',
			allAddress: ''
		},
		goodsInfo: {
			productName: '',
			cover: '',
			brief: '',
			count: 1,
			productPrice: {},
			totalAmount: 0,
			productDeposit: 0
		},
		redeceDeposit: 10000,
		isAgreement: false,
		showAddressTip: false,
		readFile: false,	//	提示勾选阅读提示
		showPop: false,
		popTitle: '',
		popContent: [],
		setStyle: '',
		payHtml: '',
		orderNo: '',
		orderId: '',
		isPay: '',
		name: '',
		hasSubmit: 0
	},
	methods: {
		submitOrder() {
			if (!this.submitValid()) {
				return
			}

			if (this.isPay == 'p') {
				this.pay()
				return
			}
			this.hasSubmit = 1 
			window.localStorage.setItem('tzgInvitationCode', this.order.invitationCode)
			window.localStorage.setItem('tzgOrderRemark', this.order.order_remark)

			let url = getApiUrl('/shop-test/rest/orders/Ddcreate')
			this.order.nailUserId = this.user.userId
			this.order.nailCropId = this.user.corpId
			this.order.count = this.goodsInfo.count
			$.ajax({
				url: url,
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(this.order),
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: result => {
					if (result.code == 200) {
						this.orderNo = result.data.sn
						this.orderId = result.data.orderId
						if (result.data.authCode == 7010 || result.data.authCode == 7016 || result.data.authCode == 7022) {//未授权 或 拒绝 或 授权无效
							location.href = 'userAuth.html?productId=' + this.order.productId + '&orderNo=' + this.orderNo
						} else if (result.data.authCode == 7014) {//待审核
							ddToast("授权待审核中")
						} else if (result.data.authCode == 7015) {  //审核通过
							// 支付
							this.pay()
						} else if (result.data.authCode == 7012) {  //芝麻分失效 重新芝麻授权
							this.zhimaAuth(result.data.IdCard, result.data.username)
						}
					} else {
						ddToast(result.message)
					}
				},
				error: e => {
					ddToast('网络错误')
					this.hasSubmit = 0
					
				}
			})
		},
		submitValid() {
			//	判断是否添加收货地址，改变show的状态触发提示
			if (this.hasDefaultAddress == false) {
				this.showAddressTip = true;		//	没有添加收货地址
				setTimeout(() => {
					this.showAddressTip = false
				}, 2000)
				return false
			}
			//	判断勾选
			if (this.isAgreement == false) {
				this.readFile = true;
				$('.readFile').show();
				// setTimeout(() => {
				// 	this.readFile = false;
				// 	$('.readFile').hide();
				// }, 2000);

				return false
			}

			return true
		},
		pay() {
			let url = getPhpApiUrl('/nail/pay.html')
			$.ajax({
				url: url,
				type: "POST",
				dataType: "json",
				data: {
					order_no: this.orderNo,
					product_id: this.order.productId,
					product_price_id: this.order.productPriceId,
					count: this.order.count,
					order_id: this.orderId
				},
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: result => {
					// alert(JSON.stringify(result))
					if (result.code == 200) {
						if (result.data.flag == 1 || result.data.flag == 2) { //2免密签约跳转; 1花呗冻结跳转
							// 支付链接
							if (result.data.flag == 2) {
								window.localStorage.setItem('tzgPay', true);
							}
							location.href = result.data.html
						} else if (result.data.flag == 0) {
							// 免密
							this.orderId = result.data.order_id
							this.SecretFree()
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
		SecretFree() {
			let url = getPhpApiUrl('/nail/nailpay.html')
			$.ajax({
				url: url,
				type: "POST",
				dataType: "json",
				data: {
					order_no: this.orderNo,
					order_id: this.orderId
				},
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: result => {
					if (result.code == 200) {
						this.orderId = result.data
						location.href = 'orderSuccess.html?orderId=' + this.orderId
					} else if (result.code == -1) {
						location.href = 'orderFailed.html?productId=' + this.order.productId
					}
				},
				error: e => {
					ddToast('网络错误')
				}
			})
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
					'<a href="tel:0571-8518073" style="color:#333">0571-85180735</a>'
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
							// alert(JSON.stringify(result.data.addressEntity))
							// let address = JSON.parse(JSON.stringify(result.data.addressEntity))
							this.hasDefaultAddress = true
							this.order.name = result.data.addressEntity.username
							this.order.phone = result.data.addressEntity.mobile

							this.order.allAddress = result.data.addressVo.address

							this.order.address = result.data.addressEntity.detail
							this.order.provinceId = result.data.addressEntity.provinceId
							this.order.cityId = result.data.addressEntity.cityId
							this.order.districtId = result.data.addressEntity.districtId
							this.order.companyName = result.data.addressEntity.company
							this.order.mobile = result.data.addressEntity.mobile.substring(0, 4) + '****' + result.data.addressEntity.mobile.substring(7)
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
		toManageAddress(index) {
			if (index == 0) { //新增
                location.href = 'editAddress.html?product=' + getUrlParam('product')
			} else if (index == 1) {
				location.href = 'manageAddress.html?product=' + getUrlParam('product')
			}
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
						this.goodsInfo.inventory = result.data.inventory

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
			this.goodsInfo.productDeposit = (this.goodsInfo.count * this.goodsInfo.productPrice.price * this.goodsInfo.productPrice.timeLength)
			if (this.zmStatus == 7018) {
				this.goodsInfo.productDeposit = (parseFloat(this.goodsInfo.productDeposit) - this.redeceDeposit) > 0 ? (parseFloat(this.goodsInfo.productDeposit) - this.redeceDeposit) : 0
			}
			this.goodsInfo.productDeposit = this.goodsInfo.productDeposit.toFixed(2)
		},
		countChange() {
			// let value = parseInt(val)
			// if (value <= 0 || isNaN(value)) {
			// 	alert(value)
			// 	this.goodsInfo.count = 1
			// } else if (value > this.goodsInfo.inventory) {
			// 	this.goodsInfo.count = this.goodsInfo.inventory
			// 	return
			// }
			this.getTotalAmount()
		},
		getZmStatus() {
			let url = getApiUrl('/shop-test/rest/dingDingUserInfo/DdZmStatus')
			$.ajax({
				url: url,
				type: "POST",
				dataType: "json",
				data: {
					nailCropId: this.user.corpId,
					userId: this.user.userId
				},
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: result => {
					//7019小于700; 7020 为空； 7018大于700；
					this.zmStatus = result.code
					this.getGoodsInfo()
				},
				error: e => {
					ddToast('网络错误')
				}
			})

		},
		adjust(count) {
			this.goodsInfo.count = parseInt(this.goodsInfo.count)
            if (count < 0 && this.goodsInfo.count <=1) {
                return
            } else if (count > 0 && this.goodsInfo.count >= parseInt(this.goodsInfo.inventory)) { //库存判断
                ddToast('超过库存了')
                return
            }
			this.goodsInfo.count += count;
			this.getTotalAmount()
		},
		zhimaAuth(idCard, username) {
            let url = getPhpApiUrl('/nail/zhimaauth.html')
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: {
                    name: username,
                    card: idCard,
                    product: getUrlParam('product'),
                    nail_crop_id: this.user.corpId,
                    userid: this.user.userId,
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: result => {
                    if (result.code == 200) {
                        location.href = result.data.url
                    } else {
                        ddToast(result.message)
                    }
                },
                error: e => {
                    ddToast('网络错误')
                }
            });
        },
	},
	mounted() {
		this.user = getSession()
		this.getAddress()
		let product = getUrlParam('product')
		if (product) {//productId-productPriceId-count-P-orderNo-orderId
			let arr = product.split('-')
			this.order.productId = arr[0]
			this.order.productPriceId = arr[1]
			this.order.count = arr[2]

			this.orderId = arr[5]
			if (arr[3]) {
				this.isPay = arr[3]
				this.orderNo = arr[4]

				if (window.localStorage.getItem('tzgPay') == 'true') {
					this.order.invitationCode = window.localStorage.getItem('tzgInvitationCode')
					this.order.order_remark = window.localStorage.getItem('tzgOrderRemark')
					this.isAgreement = true
					setTimeout(()=>{
						this.pay()
					}, 2000)
					window.localStorage.setItem('tzgPay', false);
				}
			}
		}
		
		this.getZmStatus()
		window.sessionStorage.setItem('tzdDingDingOrderComfirmUrl', window.location.href);
		ddShare(window.location.href)
		
		// dd.ready(() => {
        //     dd.biz.navigation.setLeft({
        //         control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
        //         text: '返回',//控制显示文本，空字符串表示显示默认文本
        //         onSuccess :(result) => {
        //             location.href = 'goodsDetail.html?productId=' + this.order.productId
        //         },
        //         onFail:(err)=>{}
        //     });
        // }) 
	},
})