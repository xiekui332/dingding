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
            inventory: '12'
        },
        popupVisible: false,
        num: 1,
        showPop: false,
        popTitle: '客服电话',
        setStyle: 'textAlign:center;fontSize:.38rem;lineHeight:2',
        popContent: [
            '0571-85180735'
        ]
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
        }
    },
    created() {
    },
    destroyed() {
    },
    mounted() {
        var body = document.body.clientWidth;		
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
    },
})