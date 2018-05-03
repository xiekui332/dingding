var vm = new Vue({
	el: '#app',
	data: {
		address: {
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
			address: ''
		},

		// 地址
		// address: '',
		addressShow: false,
		detailAddresslist: [],
		addressVisible: false,
		addressList: [{ name: '浙江省', id: '330903' }, { name: '杭州市', id: '330903' }, { name: '西湖区', id: '330903' }],
		province: province
	},
	methods: {
		saveAddress() {
			let url = getApiUrl('/api/address/add_shipping_address')
			$.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: this.address,
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
			this.address.address = ''
			addressList.forEach(address => {
				this.address.address += address.name + ' '
			});
			this.address.provinceId = addressList[0].id
			this.address.cityId = addressList[1].id
			this.address.districtId = addressList[2].id
		},
		// 地址
		getDetaiAddress() {
			let citycode = ''
			if (this.address.provinceId == ""){
			    citycode = ''
			}else {
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
	}
})

