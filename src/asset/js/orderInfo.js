var vm = new Vue({
    el:'#app',
    //	此处的data返回应该是一个object，vue-cli构建的里面才可返回方法
    data:{
        list:[
            {
                month:'7/9期',
                status:'待还款',
                num:'249',
                time:'2018年08月29日通过支付宝免密支付还款'
            }
        ],
        value:1,
        redio:1,
        checked:false
    },
    methods:{
        see:function(){

        },
        back:function(){

        },
        zf:function(){
            if(vm.checked == true){
                console.log(':)')
            }
        }
    }
})