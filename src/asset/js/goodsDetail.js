var vm = new Vue({
    el:'#app',
    components: {
    },
    props: {
    },
    data: {
        user: {},
        productId: 0,
        tabActive: 0,
        timeActive: 0,
        monthPrice: 0,
        productPriceId: 0,
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
        },
        popupVisible: false,
        count: 1,
        showPop: false,
        popTitle: '客服电话',
        setStyle: 'textAlign:center;fontSize:.38rem;lineHeight:2;',
        popContent: [
            '<a href="tel:0571-8518073" style="color:#333">0571-85180735</a>'
        ],
    },
    computed: {
    },
    watch: {
    },
    filters: {
    },
    methods: {
        getGoodsDetail() {
            let url = getApiUrl('/shop-test/rest/ddproducts/dingding/view')
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
                        this.goodsDetail.productDeposit = res.data.productDeposit.toFixed(2)
                        
                        this.monthPrice = this.goodsDetail.productPrice
                        this.productPriceId = res.data.productPriceEntity[0].id
                        
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
            this.productPriceId = item.id
        },
        adjust(count) {
            if (count < 0 && this.count <=1) {
                return
            } else if (count > 0 && this.count >= parseInt(this.goodsDetail.inventory)) { //库存判断
                ddToast('超过库存了')
                return
            }
            this.count += count;
        },
        openModal() {
            this.showPop = true
        },
        toOrderComfirm() {
            if (this.count > this.goodsDetail.inventory) {
                ddToast('库存不足~')
                return
            }
            let url = getApiUrl('/shop-test/rest/dingDingUserInfo/DdStatus')
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: {
                    userId: this.user.userId,
                    nailCropId: this.user.corpId
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: res => {
                    // 7010 未提交授权信息；7014 授权待审核；7015 授权审核通过；7016 授权审核拒绝
                    if (res.code == 7016) {
                        this.popupVisible = false
                        this.$dialog.alert({
                            message: '授权信息，审核拒绝中请到“个人中心”重新提交企业授权信息',
                            confirmButtonText: '我知道了'
                        }).then(() => {
                        });
                    } else if (res.code == 7014) {
                        this.popupVisible = false
                        
                        ddToast('授权信息审核中~')
                        return
                    } else {
                        location.href = 'orderComfirm.html?product=' + this.productId + '-' + this.productPriceId + '-' + this.count
                    } 
                },
                error: e => {
                    ddToast('网络错误')
                }
            });
        },
    },
    created() {
    },
    destroyed() {
    },
    mounted() {
		this.user = getSession()
        this.productId = getUrlParam('productId')
        this.getGoodsDetail()
        ddShare(window.location.href)
        

        // dd.ready(() => {
        //     dd.biz.navigation.setLeft({
        //         control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
        //         text: '返回',//控制显示文本，空字符串表示显示默认文本
        //         onSuccess :(result) => {
        //             location.href = 'home.html'
        //         },
        //         onFail:(err)=>{}
        //     });
        // }) 

        // document.addEventListener('backbutton', function(e) {
        //     e.preventDefault();
        //     location.href = 'orderList.html'
        // });

        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
            $('.v-modal').on('touchmove',function(e){
                e.stopPropagation();
                e.preventDefault();
            })

            $('.mint-popup-bottom').on('touchmove',function(e){
                e.stopPropagation();
                e.preventDefault();
            })
        }
    },
})