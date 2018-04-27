var vm = new Vue({
    el:'#app',
    //	此处的data返回应该是一个object，vue-cli构建的里面才可返回方法
    data:{
        select:true,
        agree:false,
        bot:true,
        // st:'待发货',
        stw:'暂无',
        stt:'',
        list:[
            
        ],
        list2:[
            
        ],
        showPop: false,
        popTitle: '',
        popContent: [],
        setStyle: '',
        url:getApiUrl('/rest/orders/dingding/view'),
        status:'',  //  订单状态
        nothing:'暂无',
        phone:'',
        obj:'',
    },
    methods:{
        init:function(){
            $.ajax({
                type:'get',
                data:{
                    id:177
                },
                url:vm.url,
                success:function(data){
                    console.log(data)
                    if(data.code == 200){
                        vm.status = data.data.status;
                        if(vm.status == 111){
                            vm.stw = '订单取消，用户主动取消';
                            vm.nothing = '订单取消';
                        }else if(vm.status == 9){
                            vm.stw = '商品租用到期后买断或完成回收，冻结预授权金额将会释放';
                            vm.nothing = '租用中';
                        }else if(vm.status == 3){
                            vm.stw = '显示第三方物流轨迹或固定文案：您的包裹已交由{快递公司}配送';
                            vm.nothing = '待收货';
                        }else if(vm.status == 0){
                            vm.stw = '请尽快完成支付，把宝贝带回家哦';
                            vm.nothing = '待支付';
                        }else if(vm.status == 10){
                            vm.stw = '宝贝到期啦，重新下单吧';
                            vm.nothing = '租期已满';
                        }else if(vm.status == 2){
                            vm.stw = '订单已经在备货中，请耐心等待';
                            vm.nothing = '待发货';
                        }else if(vm.status == 112){
                            vm.stw = '请调整完善审核资料，增加审核成功概率';
                            vm.nothing = '审核拒绝';
                        }else if(vm.status == 113){
                            vm.stw = '订单已经完成审核，请继续完成支付';
                            vm.nothing = '审核通过';
                        }else if(vm.status == 114){
                            vm.stw = '授权信息正在审核中，请耐心等待';
                            vm.nothing = '审核中';
                        }

                        //  转化时间

                        vm.stt = getTime(data.data.createTime,2);
                        vm.phone = data.data.phone.substring(0,3)+'****'+data.data.phone.substring(7);
                        //    保证取值为两位有效数字
                        if(data.data.totalAmount == null || data.data.totalAmount == 0){
                            data.data.totalAmount = 0.00
                        };
                        data.data.totalAmount = (data.data.totalAmount).toFixed(2);
                       
                        vm.obj = data.data;
                        
                    }
                },
                error:function(){
                    console.log(':)')
                }
            })
        },
        click:function(){
            vm.agree = !vm.agree;
            vm.select = !vm.select;
        },
        seeCount:function(){
           
        },
        contact:function(){
            
        },
        mm:function(){

        },
        close:function(){
            $('.mask').hide();
        },
        pay:function(){

        },
        seePower:function(){

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
        }
    },
    mounted() {
        var body = document.body.clientWidth;		
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';

       
    },
})

vm.init();

// 蒙版方法
function mask(){
    var w = $(window).width(),
        h = $(window).height();
        $('.mask').width(w).height(h);
    }