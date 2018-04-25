var vm = new Vue({
    el:'#app',
    components: {
    },
    props: {
      loading :true
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
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let last = this.homeList[this.homeList.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.homeList.push(last + i);
          }
          this.loading = false;
        }, 2500);
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