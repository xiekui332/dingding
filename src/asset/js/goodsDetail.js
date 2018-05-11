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
        setStyle: 'textAlign:center;fontSize:.38rem;lineHeight:2',
        popContent: [
            '0571-85180735'
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
                 //   console.log(res)
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
            alert(JSON.stringify(this.user))
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
                    alert(JSON.stringify(res))
                    if (res.code == 7014) {
                        ddToast('授权信息审核中~')
                        return
                    } else {
                        ddToast(res.message)
                        
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
    },
    template: `
    <div class="regular">
            
    <mt-swipe :auto="3000" style="height:6.82rem;" class="writeBackColor layout">
        <mt-swipe-item v-for="(item, index) in goodsDetail.productImages">
            <img class="full-width" :src="item.imagePath" style="will-change: transform;">
        </mt-swipe-item>
    </mt-swipe>



    <div class="content writeBackColor">
        <div class="title overHidden">{{goodsDetail.name}}</div>
        <div class="mediumstFont light-gray overHidden">{{goodsDetail.brief}}</div>
        <div class="priceTitle">月租金<span class="unit">￥</span><span class="largestFont" style="margin-right:.2rem">{{goodsDetail.productPrice}}</span></div>
        <div class="gray regular smallFont deposit">
            <span>
                <span style="background: #F5F5F5;padding:.03rem .07rem">官网售价</span>
                <span class="smallerFont" style="color:#2A2A2A">￥</span><span class="mediumFont" style="color:#2A2A2A">{{goodsDetail.productDeposit}}</span>
            </span>
            <span class="tip">非全新</span>
        </div>
    </div>


    <div class="writeBackColor layout" style="margin-top:.31rem;padding: .4rem .3rem">
        <p class="mediumerFont black">租赁流程</p>
        <img src="asset/images/icon/lease_process.png" class="full-width" style="margin-top:.2rem">
    </div>

    <div class="tab writeBackColor" style="margin-top:.2rem">
        <span @click="tabTap(0)" :class="{'tabActive':tabActive==0}">商品介绍</span>
        <span @click="tabTap(1)" :class="{'tabActive':tabActive==1}">规格参数</span>
        <span @click="tabTap(2)" :class="{'tabActive':tabActive==2}">售后说明</span>
    </div>
    <div style="margin-bottom:1rem" v-if="goodsDetail.productDescEntity">
        <div v-for="item in goodsDetail.productDescEntity.contentlist" v-show="tabActive == 0" :key="item">
            <image :src="item" class="full-width"/>
        </div>
        <div v-for="item in goodsDetail.productDescEntity.specificationslist" v-show="tabActive == 1" :key="item">
            <image :src="item" class="full-width" />
        </div>
        <div v-for="item in goodsDetail.productDescEntity.afterSalesInstructionslist" v-show="tabActive == 2" :key="item">
            <image :src="item" class="full-width" />
        </div>
    </div>

    <div class="fixed-bottom">
        <span style="width:83%;display:inline-block">
            <mt-button class="largeFont right-button" @click="openSku">立即租赁</mt-button>
        </span>
        <span style="width:17%;float:left" >
            <mt-button style="width:100%;height:1rem;background:#fff;" @click="openModal">
                <img style="height:.5rem;width:auto;vertical-align: middle;" src="asset/images/icon/service.png">
            </mt-button>
        </span>
    </div>
    
    <!--  sku -->
    <mt-popup v-model="popupVisible" position="bottom" class="popup">
        <div style="margin: 0 .4rem;">
            <div style="padding: .28rem 0;position: relative;">
                <img :src="goodsDetail.cover" style="width:1.5rem">
                <span class="sku-price">
                    <span style="font-size:.288rem">￥</span>{{monthPrice}}<span style="font-size:.24rem">/月</span>
                </span>
            </div>
            <div style="background: linear-gradient(90deg, #F3654C , #ffffff);height:1px"></div>
            <div class="popup-sku">
                <p>租用方式</p>
                <div>
                    <!-- <span class="sku-active">一次性付清（立减189元）</span> -->
                    <span class="sku-active">按月支付</span>
                </div>
                <p>租期</p>
                <div>
                    <span v-for="(item, index) in goodsDetail.productPriceEntity" 
                        :class="{'sku-active':timeActive==index}" 
                        style="padding: .09rem .37rem .08rem .37rem;" 
                        @click="skuTap(item, index)">{{item.timeLength}}期</span>
                </div>
                <p>数量</p>
                <div class="sku-number">
                    <span class="reduce" @click="adjust(-1)">-</span><span class="num">{{count}}</span><span class="add" @click="adjust(1)">+</span>
                </div>
            </div>
            <mt-button class="full-width submit" @click="toOrderComfirm()">确认</mt-button>
        </div>
    </mt-popup>
    <pop-modal v-model="showPop" :poptitle="popTitle" :popcontent="popContent" :setstyle="setStyle"></pop-modal>
</div>
    
    `
})