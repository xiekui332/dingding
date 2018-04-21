var vm = new Vue({
    el:'#app',
    components: {
    },
    props: {
    },
    data: {
        express: {
            expressName: '圆通',
            expressCode: 1232312312
        },
        logistic: [
            {
                time: '2018-02-29 12:12',
                status: '大家回到北京东北部的奔波的微博'
            },
            {
                time: '2018-02-29 12:12',
                status: '大家回到北京东北部的奔波的微博'
            },
            {
                time: '2018-02-29 12:12',
                status: '大家回到北京东北部的奔波的微博'
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