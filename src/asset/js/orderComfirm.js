
var vm = new Vue({
    el:'#app',
    //	此处的data返回应该是一个object，vue-cli构建的里面才可返回方法
    data:{
        select:true,
        agree:false,
        show: false,
        addShow:true,	//	是否添加地址
        addNew:false,	//	新建收货地址
        readFile:false,	//	提示勾选阅读提示
        showPop:false,
        value:'',
        popTitle:'',
        popContent: [],
        setStyle: '',
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
        	if(vm.addShow == false){
        		vm.show = true;		//	没有添加收货地址
        		vm.addNew = true;
        	}else{
        		vm.show = false;
        		vm.addNew = false;
        	};
        	//	判断勾选
        	if(vm.checked == false){
                vm.readFile = true;
                $('.readFile').show();
                //  3000后消失
                setTimeout(function(){
                    vm.readFile = false;
                    $('.readFile').hide();
                },3000);
        	}else if(vm.checked == true){
                vm.readFile = false;
                $('.readFile').hide();
        	}
         //  console.log(':)')
        },
        jump:function(){
            
        },
        openModal:function(modalType) {
            if (modalType == 'payTip') {
                this.popTitle = '支付宝免密支付',
                this.setStyle = ''
                this.popContent = [
                    '租用中，相关费用由商户通过支付宝向用户发起扣款，如约归还物品后，支付宝免密支付自动取消'
                ]
            } else if (modalType == 'signTip'){
                this.popTitle = '签收须知'
                this.setStyle = ''
                this.popContent = [
                    '收货当天你需求:',
                    '1.检查商品外包装完整；',
                    '2.快递本人签收；',
                    '3.签收当天视为合约生效'
                ]
            } else if (modalType == 'contactTip') {
                this.popTitle = '客服电话'
                this.setStyle = 'textAlign:center;fontSize:.38rem;lineHeight:2'
                this.popContent = [
                    '0571-85180735'
                ]
            }
            this.showPop = true
        },
        readAgree:function(){
            if(vm.checked == true){
                vm.readFile = false;
                $('.readFile').hide();
            }else{
                vm.readFile = true;
                $('.readFile').show();
                //  3000后消失
                setTimeout(function(){
                    vm.readFile = false;
                    $('.readFile').hide();
                },3000)
            }
        }
    },
    mounted() {
        var body = document.body.clientWidth;		
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
    }
})