var vm = new Vue({
    el:'#app',
    components: {
    },
    props: {
    },
    data: {
      show:true,
      navList:[
          {
           url:'asset/images/icon/review_success.png',
           navTitle:'租用中' 
          },
          {
            url:'asset/images/icon/wait_deliver.png',
            navTitle:'待发货' 
          },
          {
            url:'asset/images/icon/wait_receive.png',
            navTitle:'待收货' 
          },
          {
            url:'asset/images/icon/wait_pay.png',
            navTitle:'待支付' 
          },
          {
            url:'asset/images/icon/in_review.png',
            navTitle:'审核中' 
          },
          

      ],
      navList2:[
        {
          url:'asset/images/icon/in_review.png',
          navTitle:'审核中' 
        },
        {
          url:'asset/images/icon/review_success.png',
          navTitle:'审核通过' 
        },
        {
          url:'asset/images/icon/review_fail.png',
          navTitle:'审核失败' 
        },
        {
          url:'asset/images/icon/lease_full.png',
          navTitle:'租期已满' 
        },
        {
          url:'asset/images/icon/order_cancel.png',
          navTitle:'订单取消' 
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
        location.href = 'home.html'
      },
      toOrderList() {
        location.href = 'orderList.html'
      },
      toBillOrder(){
        location.href = 'billOrder.html'
     },
     toUserAuth(){
      location.href = 'UserAuth.html'
     },
     toManageAddress(){
       location.href = 'manageAddress.html'
     },
     toAbout(){
       location.href = 'about.html'
     }
    },
    created() {
    },
    destroyed() {
    },
    mounted:function() {
        var body = document.body.clientWidth;		
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
    },
})