var vm = new Vue({
    el:'#app',
    //	此处的data返回应该是一个object，vue-cli构建的里面才可返回方法
    data:{
        address: {
            name: '',
            phone: '',
            company: '',
            address: '',
            detailAddress: '',
            pos: ''
        },

        // 地址
        // address: '',
        addressShow: false,
        addresslist: [],
        addressVisible: false,
        addressList: [{name:'浙江省', id:'330903'},{name:'杭州市', id:'330903'},{name:'西湖区', id:'330903'}],
        province: province
    },
    methods:{
        save:function(){
            var pto = {
                peo:vm.peo,
                tel:vm.tel,
                com:vm.com,
                add:vm.add,
                det:vm.det,
                pos:vm.pos
            }
           // console.log(pto)
        },
        // 地址
        getDetaiAddress(){
            let citycode = ''
            // if (this.selectedProvince == ""){
            //     citycode = ''
            // }else {
            //     this.user.cityId = getId(citytest, this.addressId[1]);
            //     citycode = this.user.cityId;
            // }
            console.log(citycode);
            let key = this.address.detailAddress;
            let autocomplete = ''
            AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],()=>{
                var autoOptions = {
                    city: citycode //城市，默认全国
                };
                autocomplete= new AMap.Autocomplete(autoOptions);
                autocomplete.search(key, (status, result)=>{
                    //TODO:开发者使用result自己进行下拉列表的显示与交互功能
                        // console.log(key)
                        // console.log(result)
                        // console.log(this);
                        this.addresslist = result.tips;
                    });
            });
            this.addressShow = true
        },
        looseBlur(){
            this.addressShow = false
        },
        chooseDetailAddress(item){
            this.address.detailAddress = item.name;
            this.addressShow = false;
        },
    }
})

