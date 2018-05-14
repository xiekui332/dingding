var vm = new Vue({
	el: '#app',
	data: {
		user: {},
		addressId: '',
		// nailUserId: '1',
		// nailUserInfoId: '1',
		address: {
			addressId: '',
			nailUserId: '1',
			nailUserInfoId: '1',
			username: '',
			mobile: '',
			company: '',
			provinceId: 0,
			cityId: 0,
			districtId: 0,
			detail: '',
			// isDefault: 0,
		},
		addressName: '',
		validate: ['username', 'mobile', 'company', 'provinceId', 'detail'],

		// 地址
		addressShow: false,
		detailAddresslist: [],
		addressVisible: false,
		addressList: [{ name: '浙江省', id: '330903' }, { name: '杭州市', id: '330903' }, { name: '西湖区', id: '330903' }],
		province: province
	},
	methods: {
		getAddress() {
			let url = getApiUrl('/shop-test/api/address/get_shipping_address_one/')
			$.ajax({
				url: url,
				type: "POST",
				dataType: "json",
				// contentType: "application/json",
				data: {
					nailUserId: this.user.userId,
					nailUserInfoId: this.user.corpId,
					addressId: this.addressId
				},
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: result => {
					if (result.code == 200) {
						//console.log(result)
						this.address = result.data.addressEntity
						this.addressName = result.data.addressVo.prefix
					} else {
						ddToast(result.message)
					}
				},
				error: e => {
					ddToast('网络错误')
				}
			})
		},
		saveAddress() {
			let flag = 0
			this.validate.some(item => {
				if (!this.address[item]) {
					ddToast('请填写完整')
					flag = 1
					return true
				}
			})
			if (flag) return
			if (!phoneValid(this.address.mobile)) {
				ddToast('手机号码格式错误')
				return
			}

			this.address.addressId = this.addressId
			this.address.nailUserId = this.user.userId
			this.address.nailUserInfoId = this.user.corpId
			let url = getApiUrl('/shop-test/api/address/add_shipping_address/')
			$.ajax({
				url: url,
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(this.address),
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: result => {
					if (result.code == 200) {
						if (this.addressId) {
							location.href = 'manageAddress.html?product=' + getUrlParam('product') + '&time=' + (+new Date())
						} else if (getUrlParam('product') == 'null') {
							location.href = 'manageAddress.html?addressType=userCenter' + '&time=' + (+new Date())
						} else {
							location.href = 'orderComfirm.html?product=' + getUrlParam('product') + '&time=' + (+new Date())
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
		addressChange(addressList) {
			this.addressName = ''
			addressList.forEach(address => {
				this.addressName += address.name + ' '
			});
			this.address.provinceId = addressList[0].id
			this.address.cityId = addressList[1].id
			this.address.districtId = addressList[2].id
		},
		// 街道地址编辑
		getDetailAddress() {
			let citycode = ''
			if (this.address.provinceId == "") {
				citycode = ''
			} else {
				citycode = this.address.cityId;
			}
			// console.log(citycode);
			let key = this.address.detail;
			let autocomplete = ''
			AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], () => {
				var autoOptions = {
					city: citycode //城市，默认全国
				};
				autocomplete = new AMap.Autocomplete(autoOptions);
				autocomplete.search(key, (status, result) => {
					//TODO:开发者使用result自己进行下拉列表的显示与交互功能
					this.detailAddresslist = result.tips;
				});
			});
			this.addressShow = true
		},
		looseBlur() {
			this.addressShow = false
		},
		chooseDetailAddress(item) {
			this.address.detail = item.name;
			this.addressShow = false;
		},
		chooseAddress() {
			setTimeout(() => {
				this.addressVisible = !this.addressVisible
            }, 550);
		}
	},
	mounted() {
		//身份信息
		this.user = getSession()
		
		this.addressId = getUrlParam('addressId')
		if (this.addressId) {
			this.getAddress()
		}
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


