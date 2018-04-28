var vm = new Vue({
    el:'#app',
    //	此处的data返回应该是一个object，vue-cli构建的里面才可返回方法
    data:{
        select:true,
        agree:false,
        show: false,
        list:[
            {
                month:'7/9期',
                status:'待还款',
                num:'249',
                time:'2018年08月29日通过支付宝免密支付还款'
            },
            {
                month:'8/9期',
                status:'待还款',
                num:'250',
                time:'2018年08月30日通过支付宝免密支付还款'
            }
        ],
        list2:[
            {
                month:'7/9期',
                status:'已还款',
                num:'249',
                time:'2018年03月29日'
            },
            {
                month:'8/9期',
                status:'已还款',
                num:'250',
                time:'2018年03月29日'
            }
        ],
        checked:false
    },
    methods:{
        click:function(){
            vm.agree = !vm.agree;
            vm.select = !vm.select;
        },
        submit:function(){
        	//	判断是否添加收货地址，改变show的状态触发提示
//      	if(){
//      		vm.show = true;		//	没有添加收货地址
//      	}
           console.log(':)')
        },
        jump:function(){
            
        }
    },
    mounted() {
        var body = document.body.clientWidth;		
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
    }
})