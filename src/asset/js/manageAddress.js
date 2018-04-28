var vm = new Vue({
    el:'#app',
    //	此处的data返回应该是一个object，vue-cli构建的里面才可返回方法
    data:{
        list:[
        {
            id: '1',
            name: '张三',
            tel: '13000000000',
            address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
            checked:false
        },
        {
            id: '2',
            name: '李四',
            tel: '13100000000',
            address: '浙江省杭州市拱墅区莫干山路 50 号',
            checked:false
        }
        ],
        chosenAddressId:1,
        // checked:true,
    },
    methods:{
        dele:function(a){
            //  splice(a,b)参数分别为下标和删除的数量

            this.$dialog.confirm({
                title: '确认要删除收货地址吗',
                message: ''
            }).then(() => {
                vm.list.splice(a,1)
            }).catch(() => {
                console.log(':)')
            });
           
        },
        edit:function(a){
            console.log('(:')
           
        },
        // 选择默认收货地址
        check:function(a){
           
            for(var i = 0; i < vm.list.length;i++){
                vm.list[i].checked = false;  
                vm.list[a].checked = true;
            }

            
        },
        addNew:function(){

        }
    }
})
