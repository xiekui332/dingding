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
            // let url = getApiUrl('/shop-test/rest/orders/dingding/list')
            let url = 'http://192.168.17.214:8080/rest/orders/dingding/list'
            
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
                        if (res.data.data.length === 0) {
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
                orderState = '待支付';
            } else if (status == this.orderStatus.lease) {
                orderState = '租赁中';
            } else if (status == this.orderStatus.complete) {
                orderState = '租期已满';
            } else if (status == this.orderStatus.send) {
                orderState = '待发货';
            } else if (status == this.orderStatus.receive) {
                orderState = '待收货';
            } else if (status == this.orderStatus.end) {
                orderState = '交易结束';
            } else if (status == this.orderStatus.authing) {
                orderState = '审核中';
            } else if (status == this.orderStatus.authFail) {
                orderState = '审核失败';
            } else if (status == this.orderStatus.cancel) {
                orderState = '订单取消';
            } else {
                orderState = '订单已失效';
            }
            return orderState
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

    }
})