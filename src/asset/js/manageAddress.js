var vm = new Vue({
    el:'#app',
    data:{
        user: {},
        // nailUserId: 1,
        // nailUserInfoId: 1,
        activeAddressId: -1, 
        addressList:[],
        addressType: '',
        backUrl: ''
    },
    methods:{
        getAddressList() {
            let url = getApiUrl('/shop-test/api/address/get_shipping_address_list/')
			$.ajax({
                url: url,
                type: "POST",
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
                        this.addressList = result.data
                        this.addressList.some(address => {
                            if (address.isDefault) {
                                this.activeAddressId = address.addressId
                                return true
                            }
                        })
                    } else if (result.code == 6019) {//地址为空
                        this.addressList = result.data
                        this.activeAddressId = 0
                    } else {
                        ddToast(result.message)
                    }
                },
                error: e => {
                    ddToast('网络错误')
				}
			})
        },
        checkAddress(addressId, item) {
            let url = getApiUrl('/shop-test/api/address/set_default_address/')
			$.ajax({
                url: url,
                type: "POST",
				dataType: "json",
                data: {
                    nailUserId: this.user.userId,
					nailUserInfoId: this.user.corpId,
                    addressId: addressId
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: result => {
                    if (result.code == 200) {
                        this.activeAddressId = addressId
                        if (getUrlParam('product') && getUrlParam('product')!='null') {
                            location.href = 'orderComfirm.html?product=' + getUrlParam('product')
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
        toAddressEdit(addressId) {
            if (addressId) {
                location.href = 'editAddress.html?addressId='+ addressId + '&product=' + getUrlParam('product')
            } else {
                location.href = 'editAddress.html?product=' + getUrlParam('product')
            }
        },
        deleteAddress(addressId){
            this.$dialog.confirm({
                title: '确认要删除收货地址吗',
                message: ''
            }).then(() => {
                let url = getApiUrl('/shop-test/api/address/del_address/')
                $.ajax({
                    url: url,
                    type: "POST",
                    dataType: "json",
                    data: {
                        nailUserId: this.user.userId,
					    nailUserInfoId: this.user.corpId,
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
		this.user = getSession()
        this.getAddressList()
        this.addressType = getUrlParam('addressType')
        if (this.addressType == 'userCenter') {
            this.backUrl = 'userCenter.html'
        } else {
            this.backUrl = window.sessionStorage.getItem('tzdDingDingOrderComfirmUrl')
        }
        ddShare(window.location.href)
        
        // dd.ready(() => {
        //     dd.biz.navigation.setLeft({
        //         control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
        //         text: '返回',//控制显示文本，空字符串表示显示默认文本
        //         onSuccess :(result) => {
        //             location.href = this.backUrl
        //         },
        //         onFail : function(err) {}
        //     });
        // }) 
    }
})
