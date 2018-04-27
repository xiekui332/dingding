var vm = new Vue({
    el:'#app',
    components: {
    },
    props: {
    },
    data: {
        productId: 5,
        tabActive: 0,
        timeActive: 0,
        monthPrice: 0,
        goodsDetail: {
            // productImages: [
            //     {
            //         imagePath: 'http://img.taozugong.com/product/2018-04-11/15293fb5jTpA2a'
            //     },
            //     {
            //         imagePath: 'http://img.taozugong.com/product/2018-04-11/15293fb5jTpA2a'
            //     }
            // ],
            // productDescEntity: {
            //     contentlist: ['http://img.taozugong.com/product/2018-04-11/15293fb5jTpA2a'],
            //     specificationslist: ['http://img.taozugong.com/product/2018-04-11/15293fb5jTpA2a'],
            //     afterSalesInstructionslist: ['http://img.taozugong.com/product/2018-04-11/15293fb5jTpA2a']
            // },
            // cover: 'http://img.taozugong.com/product/2018-04-11/15293fb5jTpA2a',
            // name: '空气堡（AIRBURG)新风系统新风系统新风 新风系统新风系统新风',
            // brief: '紧急集合',
            // productPrice: 123,
            // productDeposit: 232,
            // inventory: '12',
            // province: province
        },
        popupVisible: false,
        num: 1,
        showPop: false,
        popTitle: '客服电话',
        setStyle: 'textAlign:center;fontSize:.38rem;lineHeight:2',
        popContent: [
            '0571-85180735'
        ],
        // 地址
        address: '',
        addressShow: false,
        addresslist: [],
        addressVisible: false,
        addressList: [{name:'浙江省', id:'330903'},{name:'杭州市', id:'330903'},{name:'西湖区', id:'330903'}],
        province: province
    },
    computed: {
    },
    watch: {
    },
    filters: {
    },
    methods: {
        getGoodsDetail() {
            let url = getApiUrl('/rest/ddproducts/dingding/view')
            // let url = '/getapi/rest/ddproducts/dingding/view'
            
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                data: {
                    id: this.productId
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: res => {
                    if (res.code == 200) {
                        this.goodsDetail = res.data
                        this.goodsDetail.productPrice = res.data.productPriceEntity[0].price.toFixed(2)
                        this.monthPrice = this.goodsDetail.productPrice
                    } else {
                        ddToast(res.message)
                    }
                },
                error: e => {
                    ddToast('网络错误')
                }
            });
        },
        tabTap(index) {
            this.tabActive = index
        },
        openSku() {
            this.popupVisible = true
        },
        skuTap(item, index) {
            this.timeActive = index
            this.monthPrice = item.price.toFixed(2)
        },
        adjust(num) {
            if (num < 0 && this.num <=1) {
                return
            } else if (num > 0 && this.num >= parseInt(this.goodsDetail.inventory)) { //库存判断
                ddToast('超过库存了')
                return
            }
            this.num += num;
        },
        openModal() {
            this.showPop = true
        },
        toSure() {
            
        },
        // 地址
        // getDetaiAddress(){
        //     let citycode = ''
        //     // if (this.selectedProvince == ""){
        //     //     citycode = ''
        //     // }else {
        //     //     this.user.cityId = getId(citytest, this.addressId[1]);
        //     //     citycode = this.user.cityId;
        //     // }
        //     console.log(citycode);
        //     let key = this.address;
        //     let autocomplete = ''
        //     AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],()=>{
        //         var autoOptions = {
        //             city: citycode //城市，默认全国
        //         };
        //         autocomplete= new AMap.Autocomplete(autoOptions);
        //         autocomplete.search(key, (status, result)=>{
        //             //TODO:开发者使用result自己进行下拉列表的显示与交互功能
        //                 // console.log(key)
        //                 // console.log(result)
        //                 // console.log(this);
        //                 this.addresslist = result.tips;
        //             });
        //     });
        //     this.addressShow = true
        // },
        // looseBlur(){
        //     this.addressShow = false
        // },
        // chooseDetailAddress(item){
        //     this.address = item.name;
        //     this.addressShow = false;
        // },
    },
    created() {
    },
    destroyed() {
    },
    mounted() {
        this.getGoodsDetail()
    },
})