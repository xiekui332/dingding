var vm = new Vue({
  el: '#app',
  components: {
  },
  props: {
  },
  data: {
    user: {},
    show: true,
    navList: [
      {
        url: 'asset/images/icon/review_success.png',
        navTitle: '租用中',
        status: 9
      },
      {
        url: 'asset/images/icon/wait_deliver.png',
        navTitle: '待发货',
        status: 2
      },
      {
        url: 'asset/images/icon/wait_receive.png',
        navTitle: '待收货',
        status: 3
      },
      {
        url: 'asset/images/icon/wait_pay.png',
        navTitle: '待支付',
        status: 0
      },
      {
        url: 'asset/images/icon/in_review.png',
        navTitle: '审核中',
        status: 15
      },
    ],
    navList2: [
      {
        url: 'asset/images/icon/wait_pay.png',
        navTitle: '待支付',
        status: 0
      },
      {
        url: 'asset/images/icon/in_review.png',
        navTitle: '审核中',
        status: 15
      },
      // {
      //   url:'asset/images/icon/review_success.png',
      //   navTitle:'审核通过',
      // },
      {
        url: 'asset/images/icon/review_fail.png',
        navTitle: '审核失败',
        status: 16
      },
      {
        url: 'asset/images/icon/lease_full.png',
        navTitle: '租期已满',
        status: 10
      },
      {
        url: 'asset/images/icon/order_cancel.png',
        navTitle: '订单取消',
        status: 1
      }
    ]
  },
  computed: {
  },
  watch: {
  },
  filters: {
  },
  methods: {
    toHome() {
      location.href = 'home.html?corpId=' + this.user.corpId
    },
    toOrderList() {
      location.href = 'orderList.html'
    },
    toBillOrder() {
      location.href = 'billOrder.html'
    },
    toUserAuth() {
      location.href = 'userAuth.html'
    },
    toManageAddress() {
      location.href = 'manageAddress.html'
    },
    toAbout() {
      location.href = 'about.html'
    },
    toOrderList(status) {
      location.href = 'orderList.html?status=' + status
    },
  },
  created() {
  },
  destroyed() {
  },
  mounted() {
    this.user = getSession()
  },
})