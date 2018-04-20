var vm = new Vue({
    el:'#app',
    components: {
    },
    props: {
    },
    data: {
        goodsDetail: {
            productImages: [
                {
                    imagePath: 'http://img.taozugong.com/product/2018-04-11/15293fb5jTpA2a'
                },
                {
                    imagePath: 'http://img.taozugong.com/product/2018-04-11/15293fb5jTpA2a'
                }
            ]
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
            if (this.isEnd == true) {
                return;
            }
            this.loading = true
            this.getOrderList();
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