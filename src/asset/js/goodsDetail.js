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
            name: '123',
            productPrice: 123,
            productDeposit: 232
        }
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