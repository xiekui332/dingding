var vm = new Vue({
    el:'#app',
    components: {
    },
    props: {
    },
    data: {
        user: {},
        tabDefault: [
            {
                id: -1,
                name: '全部'
            },
            {
                id: 9,
                name: '租用中'
            },
            {
                id: 2,
                name: '待发货'
            },
            {
                id: 3,
                name: '待收货'
            },
            {
                id: 0,
                name: '待支付'
            }
        ],
        tabNew: [],
        tab: [
            {
                id: -1,
                name: '全部'
            },
            {
                id: 9,
                name: '租用中'
            },
            {
                id: 2,
                name: '待发货'
            },
            {
                id: 3,
                name: '待收货'
            },
            {
                id: 0,
                name: '待支付'
            }
        ],
        open: false,
        tabId: -1,
        clientWidth: {},
        categryList: [
            [
                {
                    id: 10,
                    name: '租期已满'
                },
                {
                    id: 1,
                    name: '订单取消'
                },
                {
                    id: 15,
                    name: '审核中'
                },
                {
                    id: 16,
                    name: '审核失败'
                }
            ],
        ],
        orderList: [
            // {
            //     orderId:1,
            //     cover: 'http://img.taozugong.com/product/2018-04-11/15293fb5jTpA2a',
            //     createTime: '2018-10-10 10:10:19',
            //     status: 15,
            //     productName: '123',
            //     brief:'21324',
            //     totalAmount: 123,
            //     count: 2
            // },
            // {
            //     orderId:1,
            //     cover: 'http://img.taozugong.com/product/2018-04-11/15293fb5jTpA2a',
            //     createTime: '2018-10-10 10:10:1',
            //     status: 16,
            //     productName: '123',
            //     brief:'21324',
            //     totalAmount: 123,
            //     count: 1
            // }
        ],
        page: 1,
        pageSize: 15,
        loading: false,
        isEnd: false,
        orderStatus: {//租赁状态  0-待支付 1-订单取消 9租赁中 10-租期已满 2待发货 3待收货 4交易结束 15审核中 16审核失败
            cancel: '1',
            unpay: '0',
            lease: '9',
            complete: '10',
            send: '2',
            receive: '3',
            end: '4',
            authing: '15',
            authFail: '16'
        }
    },
    computed: {
    },
    watch: {
    },
    filters: {
    },
    methods: {
         //加载更多
        loadMore() {
            if (this.orderList == 0) {
                return;
            }
            if (this.isEnd == true) {
                return;
            }
            this.loading = true
            this.getOrderList();
        },
        getOrderList() {
            let url = getApiUrl('/shop-test/rest/orders/dingding/list')
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                data: {
                    userid: this.user.userId,
                    nailCropId: this.user.corpId,
                    status: this.tabId,
                    page: this.page,
                    rows: this.pageSize
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: res => {
                    if (res.code == 200) {
                        if (res.data.data.length == 0) {
                            this.isEnd = true
                            this.loading = false
                            return
                        }
                        res.data.data.forEach((item) => {
                            item.orderTime = dateFormat(item.createTime, 20, '-', '-', ' ')
                        })
                        this.orderList = this.orderList.concat(res.data.data);
                        this.page += 1;
                        this.loading = false;
                    } else {
                        ddToast(res.message)
                    }
                },
                error: e => {
                    ddToast('网络错误')
                }
            });
        },
        getOrderStatus(status) {
            let orderStatus = ''

            if (status == this.orderStatus.unpay) {//订单商品转态 0-待支付1-订单取消-9租赁中 10-完成
                orderStatus = '待支付';
            } else if (status == this.orderStatus.lease) {
                orderStatus = '租赁中';
            } else if (status == this.orderStatus.complete) {
                orderStatus = '租期已满';
            } else if (status == this.orderStatus.send) {
                orderStatus = '待发货';
            } else if (status == this.orderStatus.receive) {
                orderStatus = '待收货';
            } else if (status == this.orderStatus.end) {
                orderStatus = '交易结束';
            } else if (status == this.orderStatus.authing) {
                orderStatus = '审核中';
            } else if (status == this.orderStatus.authFail) {
                orderStatus = '审核失败';
            } else if (status == this.orderStatus.cancel) {
                orderStatus = '订单取消';
            } else {
                orderStatus = '订单已失效';
            }
            return orderStatus
        },
        showCategory() {
            this.open = !this.open;
            if (this.open) {
                this.tabNew = this.tab
                this.tab = this.tabDefault
            } else {
                this.tab = this.tabNew
            }
        },
        //选中商品分类
        chooseCategory(id, index) {
            if (index == -1) {
                if (id == 15 || id == 16 || id == 1 || id == 10) {
                    index = 1
                } else {
                    index = 0
                }
            }

            if (index) {
                this.tabNew = this.categryList[index-1]
                this.tab = this.tabNew
            }

            // if (index) {
            //     this.open = false
            //     this.tabNew = this.categryList
            //     this.tab = this.tabNew
            // } else if (!index && this.open) {
            //     this.open = false
            // }

            this.tabId = id
            this.open = false
            this.orderList = []
            this.page = 1
            this.loading = false;
            this.isEnd = false
            // this.ordersDisplay = false

            this.getOrderList()
        },
        toLogistics(item) {
            location.href = 'logistics.html?orderNo=' + item.orderNo + '&createTime=' + item.createTime
        },
        toOrderDetail(item) {
            location.href = 'orderDetail.html?orderId=' + item.orderId
        },
    },
    created() {
    },
    destroyed() {
    },
    mounted() {
        this.user =  getSession()
        this.tabId = getUrlParam('status')
        // if (status) {
        //     this.chooseCategory(status, -1)
        // }

        this.chooseCategory(this.tabId || -1, -1)
    },
    template: `
    <div class="container">
        <!-- 类别 -->
        <div style="position: fixed;top: 0;width: 100%;z-index: 10;border-bottom: 1px solid rgba(0,0,0,0.12);border-top: 1px solid #f7f7f7;">
            <div style="padding:0.27rem 0 0 .1rem;background-color:white;border-bottom:1px solid #eeeeee">
                <div style="position:relative">
                    <div class="category" :style="{'width': tab.length == 1 ? '1.6rem' : ''}">
                        <div v-for="tabitem in tab" style="text-align:center;">
                            <span class="type" :class="{choose:tabitem.id == tabId}" @click="chooseCategory(tabitem.id, 0)">{{tabitem.name}}</span>
                        </div>
                    </div>
                    <div style="right: .1rem;top: 0.05rem;position:absolute;width:0.5rem;height:0.5rem" @click="showCategory">
                        <img style="width:0.32rem;height:auto" :class="{rotate:open}" src="asset/images/icon/up.png">
                    </div>

                </div>
            </div>
            <transition name="mu-popover">
                <div v-show="open" class="mu-popover" style="padding-right: .6rem">
                    <div style="padding-right: .6rem;border-bottom: 1px solid rgba(0,0,0,0.12);">
                        <div style="background-color:#fff;display: flex;justify-content: space-around;">
                            <span style="box-sizing:border-box;padding:0.24rem 0" v-for="categryitem in categryList[0]" :key="categryitem.categoryId" @click="chooseCategory(categryitem.id, 1)"
                                class="type"  :class="{choose:categryitem.id == tabId}">{{categryitem.name}}</span>
                        </div>
                    </div>
                    <div style="padding-right: 5.7rem">
                        <div style="background-color:#fff;display: flex;justify-content: space-around;">
                            <span style="box-sizing:border-box;padding:0.24rem 0" v-for="categryitem in categryList[1]" :key="categryitem.categoryId" @click="chooseCategory(categryitem.id, 2)"
                                class="type"  :class="{choose:categryitem.id == tabId}">{{categryitem.name}}</span>
                        </div>
                    </div>
                </div>
            </transition>
        </div>

        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <div :style="{'margin-top': open ? '1.9rem' : '1.1rem'}" style="transition: all .3s;">
                <div v-for="(item, index) in orderList" :key="item">
                    <div class="orderBar line mediumerFont black">
                        <span>{{item.orderTime}}</span>
                        <span>{{getOrderStatus(item.status)}}</span>
                    </div>
                    <a @click="toOrderDetail(item)"><good-info :goodsinfo="item"></good-info></a>
                    <div class="footer" v-if="item.status == 3 || item.status == 9 || item.status == 10">
                        <button class="hollow-button" @click="toLogistics(item)">订单跟踪</button>
                    </div>
                </div>
            </div>
            <div v-if="orderList.length==0 && isEnd" class="mediumFont orderNone grayBackColor">
                <img src="asset/images/icon/none.png" style="width:2.1rem;margin-top:3rem">
                <p class="mediumerFont black" style="margin-top:.1rem">您还没有创建订单</p>
            </div>
            <div v-if="orderList.length!=0 && isEnd" class="mediumFont orderNone">
            到底了哦~
            </div>
        
            <div style="text-align:center;padding:0.32rem 0" v-show="loading">
                <mt-spinner type="fading-circle" style="display:inline-block;vertical-align: middle;"></mt-spinner>
                加载中...
            </div>
        </div>
    </div>
    `
})