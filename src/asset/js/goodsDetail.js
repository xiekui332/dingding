var vm = new Vue({
    el:'#app',
    components: {
    },
    props: {
    },
    data: {
        tabActive: 0,
        goodsDetail: {
            productImages: [
                {
                    imagePath: 'http://img.taozugong.com/product/2018-04-11/15293fb5jTpA2a'
                },
                {
                    imagePath: 'http://img.taozugong.com/product/2018-04-11/15293fb5jTpA2a'
                }
            ],
            productDescEntity: {
                contentlist: ['http://img.taozugong.com/product/2018-04-11/15293fb5jTpA2a'],
                specificationslist: ['http://img.taozugong.com/product/2018-04-11/15293fb5jTpA2a'],
                afterSalesInstructionslist: ['http://img.taozugong.com/product/2018-04-11/15293fb5jTpA2a']
            },
            cover: 'http://img.taozugong.com/product/2018-04-11/15293fb5jTpA2a',
            name: '空气堡（AIRBURG)新风系统新风系统新风 新风系统新风系统新风',
            brief: '紧急集合',
            productPrice: 123,
            productDeposit: 232,
            inventory: '12',
            province: province
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
        tabTap(index) {
            this.tabActive = index
        },
        openSku() {
            this.popupVisible = true
        },
        setSkuData() {
    
            let list = this.goodsDetail.productPriceEntity
            let item = JSON.parse(JSON.stringify(list[0]))
            item.totalAmount = (parseInt(item.timeLength) * parseFloat(item.price)).toFixed(2)
            item.price = item.price.toFixed(2)
            this.setData({
              oncePay: 0, //按月
              time: 0,
              oncePrice: item.isOncePrice,
              monthPrice: item.price,
              item: item
            });
        },
        adjust(num) {
            if (num < 0 && this.num <=1) {
                return
            } else if (num > 0 && this.num >= parseInt(this.goodsDetail.inventory)) { //库存判断
                return
            }
            this.num += num;
        },
        openModal() {
            this.showPop = true
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
            let key = this.address;
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
            this.address = item.name;
            this.addressShow = false;
        },

        uploadFile(e) {
            // let url =  getApiUrl('/shop-service/img/upload.do') 
            let url =  '/getapi/shop-service/img/upload.do'
            uploadImg(e, url).then((imgUrl)=>{
                alert(imgUrl)
            }).catch((err)=>{
                alert(err)
            })  
        }
    },
    created() {
    },
    destroyed() {
    },
    mounted() {
    },
})