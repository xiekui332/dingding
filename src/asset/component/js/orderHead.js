Vue.component('goodHead',{
    props:{
       goods:{
            type: Object,
            default: {}
       },
    },
    data(){
        return{

        }
    },
    template:'<div class="sec-1">'+
                '<div class="con-head">'+
                    '<img src="" class="img"/>'+
                        '<div class="detail-box">'+
                            '<p>'+
                                '<span>yaman/雅萌</span>'+
                            '</p>'+
                            '<p>瘦脸射频美颜仪瘦脸射频美颜仪</p>'+
                            '<p>'+
                                '<span>总租金:</span>'+
                                '<span>￥2,988.00</span>'+
                                '<span class="right">x2</span>'+
                            '</p>'+
                        '</div>'+
                '</div>'+
            '</div>',
    methods:{
        
    }
})