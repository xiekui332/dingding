var vm = new Vue({
    el:'#app',
    //	此处的data返回应该是一个object，vue-cli构建的里面才可返回方法
    data:{
        peo:'谢春花',
        tel:'18888888888',
        com:'杭州淘租公科技有限公司',
        add:'浙江省杭州市西湖区',
        det:'文二路188号',
        pos:'310013'
    },
    methods:{
        save:function(){
            var pto = {
                peo:vm.peo,
                tel:vm.tel,
                com:vm.com,
                add:vm.add,
                det:vm.det,
                pos:vm.pos
            }
            
        }
   
    }
})
