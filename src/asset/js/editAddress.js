var vm = new Vue({
	el: '#app',
	data: {
		addressId: '',
		nailUserId: '1',
		nailUserInfoId: '1',
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
					nailUserId: this.nailUserId,
					nailUserInfoId: this.nailUserInfoId,
					addressId: this.addressId
				},
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: result => {
					console.log(result)
					if (result.code == 200) {
						this.address = result.data
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
			this.address.nailUserId = this.nailUserId
			this.address.nailUserInfoId = this.nailUserInfoId
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
						location.href = 'manageAddress.html'
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
	},
	mounted() {
		//身份信息

		this.addressId = getUrlParam('addressId')
		if (this.addressId) {
			this.getAddress()
		}
	}
})

