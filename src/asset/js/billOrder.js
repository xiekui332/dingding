var vm = new Vue({
    el:'#app',
    //	此处的data返回应该是一个object，vue-cli构建的里面才可返回方法
    data:{
        list:[
            
        ],
        list2:[

        ],
        orderId:'',
        ordersProductEntity:'',
        url:getApiUrl('/rest/bills/view'),
        allCount:'',
        waitMoney:'',
        money:'',

    },
    methods:{
        init:function(){
            vm.request();
            
        },
        //	请求数据
        request:function(){
            $.ajax({
                type:'get',
                data:{
                    orderId:202
                },
                url:vm.url,
                success:function(data){
                    console.log(data)
                    if(data.code == 200){
                        vm.ordersProductEntity = data.data.ordersProductEntity;

                        // 如果值为null则赋值0
                        if(data.data.ordersProductEntity.totalAmount == null){
                            data.data.ordersProductEntity.totalAmount = 0;
                        }
                        if(data.data.money == null){
                            vm.money = 0;
                        }
                        vm.ordersProductEntity.totalAmount = data.data.ordersProductEntity.totalAmount.toFixed(2);
                        vm.list = data.data.noPaidList;
                        vm.list2 = data.data.paidList;
                        vm.money = data.data.money;
                        vm.waitMoney = (vm.ordersProductEntity.totalAmount - vm.money).toFixed(2);
                        vm.list.forEach(function(k,v){
                            k.cdate = getTime(k.cdate,1);
                            vm.allCount = data.data.ordersProductEntity.periodNumber;
                        });
                        vm.list2.forEach(function(k,v){
                            k.cdate = getTime(k.cdate);
                        })
                    }
                },
                error:function(){
                    console.log(':)')
                }
            })

            // this.$axios.get(url+'shop-service/rest/bills/Ddview',{'orderId':''}).then(res=>{
            // 	console.log(res)
            // })
        }
    }
})
vm.init()