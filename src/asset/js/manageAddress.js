var vm = new Vue({
    el:'#app',
    //	此处的data返回应该是一个object，vue-cli构建的里面才可返回方法
    data:{
        nailUserId: 1,
        nailUserInfoId: 1,
        activeAddressId: 1, 
        addressList:[],
    },
    methods:{
        getAddressList() {
            let url = getApiUrl('/api/address/get_shipping_address_list/')
			$.ajax({
                url: url,
                type: "POST",
				dataType: "json",
                data: {
                    nailUserId: this.nailUserId,
                    nailUserInfoId: this.nailUserInfoId
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: result => {
                    if (result.code == 200) {
                        this.addressList = result.data
                        this.addressList.some(address => {
                            if (address.isDefault) {
                                this.activeAddressId = address.addressId
                                return true
                            }
                        })
                    } else {
                        ddToast(result.message)
                    }
                },
                error: e => {
                    ddToast('网络错误')
				}
			})
        },
        checkAddress(addressId) {
            let url = getApiUrl('/api/address/set_default_address/')
			$.ajax({
                url: url,
                type: "POST",
				dataType: "json",
                data: {
                    nailUserId: this.nailUserId,
                    nailUserInfoId: this.nailUserInfoId,
                    addressId: addressId
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: result => {
                    if (result.code == 200) {
                        this.activeAddressId = addressId
                    } else {
                        ddToast(result.message)
                    }
                },
                error: e => {
                    ddToast('网络错误')
				}
			})
        },
        toAddressEdit(addressId) {
            if (addressId) {
                location.href = 'editAddress.html?addressId='+addressId
            } else {
                location.href = 'editAddress.html'
            }
        },
        deleteAddress(addressId){
            this.$dialog.confirm({
                title: '确认要删除收货地址吗',
                message: ''
            }).then(() => {
                let url = getApiUrl('/api/address/del_address/')
                $.ajax({
                    url: url,
                    type: "POST",
                    dataType: "json",
                    data: {
                        nailUserId: this.nailUserId,
                        nailUserInfoId: this.nailUserInfoId,
                        addressId: addressId
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: result => {
                        if (result.code == 200) {
                            this.getAddressList()
                        } else {
                            ddToast(result.message)
                        }
                    },
                    error: e => {
                        ddToast('网络错误')
                    }
                })
            }).catch(() => {
                ddToast('网络错误')
            });
           
        },
    },
    mounted() {
        this.getAddressList()
    }
})
