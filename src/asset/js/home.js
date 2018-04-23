var vm = new Vue({
    el:'#app',
    components: {
    },
    props: {
    },
    data: {
      homeList:[
          {
            url:'/src/asset/images/icon/waitPay.png',
            price1:'1234',
            price2:'12.34'
          },
          {
            url:'/src/asset/images/icon/waitPay.png',
            price1:'1234',
            price2:'12.34'
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
    mounted:function() {
        var body = document.body.clientWidth;		
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
    },
})