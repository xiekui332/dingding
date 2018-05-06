var vm = new Vue({
    el:'#app',
    components: {
    },
    props: {
    },
    data: {
        express: {
            expressName: '',
            expressCode: ''
        },
        logistic: [
            
        ]
    },
    computed: {
    },
    watch: {
    },
    filters: {
    },
    methods: {
        init(){
            var orderNo = 'ZY1522327243828780';
                $.ajax({
                    type:'get',
                    url:getApiUrl('/shop-test/rest/express/orderexpress'),
                    data:{
                        orderNo:orderNo, 
                    },
                    success:function(data){
                        //  console.log(data)
                        if(data.code == 200){
                            vm.express.expressName = data.data.expressName;
                            vm.express.expressCode = data.data.expressCode;
                            vm.logistic = data.data.expressStatus;
                        }
                    },
                    error:function(){
                        console.log(':)')
                    }
                })
        }
    },
    created() {
    },
    destroyed() {
    },
    mounted:function() {
        var body = document.body.clientWidth;		
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
        this.init();
    },
})