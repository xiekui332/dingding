var vm = new Vue({
    el:'#app',
    components: {
    },
    props: {
    },
    data: {
      navList:[
          {
            url:'/src/asset/images/icon/waitPay.png',
            navTitle:'待支付' 
          },
          {
            url:'/src/asset/images/icon/waitPay.png',
            navTitle:'待发货' 
          },
          {
            url:'/src/asset/images/icon/waitPay.png',
            navTitle:'待收货' 
          },
          {
            url:'/src/asset/images/icon/waitPay.png',
            navTitle:'租凭中' 
          },
          {
            url:'/src/asset/images/icon/waitPay.png',
            navTitle:'租凭中' 
          }

      ],
      mainList:[
          {
              urll:'/src/asset/images/icon/wenhao.png',
              mainTitle:'我的账单'
          },
          {
            urll:'/src/asset/images/icon/zan.png',
            mainTitle:'我的授权'
        },
        {
            urll:'/src/asset/images/icon/wenhao.png',
            mainTitle:'关于我们'
        },
      ]  
    },
    computed: {
    },
    watch: {
    },
    filters: {
    },
    methods: {
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