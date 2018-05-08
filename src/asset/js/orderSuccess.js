var vm = new Vue({
    el:'#app',
    //	此处的data返回应该是一个object，vue-cli构建的里面才可返回方法
    data:{
    },
    methods:{
        toOrderDetail(){
            //orderId
            location.href = 'orderDetail.html'
        },
        toHome(){
            location.href = 'home.html'
        }
    }
})