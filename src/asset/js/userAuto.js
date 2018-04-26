var vm = new Vue({
    el:'#app',
    components: {
    },
    props: {
    },
    data: {
        userAuto: {
            company: "zh",
            companyDelegateImg: 'asset/images/icon/proof.png',
            dingIndexImg: 'asset/images/icon/proof.png',
            idcard: "321322199602052213",
            name: "zhoulei",
            phone: "13637098149",
            registerNo: "330104000287730",
            rejectReason: "的v"
        },
        isFirstAuto: true,



        // status1: false, //  审核状态
        // list: [],
        // st: '审核通过',
        // img: [],
        // bot: false,
        // st1: true,
    },
    computed: {
    },
    watch: {
    },
    filters: {
    },
    methods: {
        onFileChange(e) {
            // let url =  getApiUrl('/shop-service/img/upload.do') 
            // let url = 'http://192.168.18.59:8080/img/upload.do'
            let url =  '/getapi/img/upload.do'
            uploadImg(e, url).then((imgUrl)=>{
                this.userAuto.dingIndexImg = imgUrl
            }).catch((err)=>{
                    alert(err)
            })  
        },
        closeImg(index) {
            if (index == 0) {
                this.userAuto.dingIndexImg = 'asset/images/icon/proof.png'
            } else if (index == 1) {
                this.userAuto.companyDelegateImg = 'asset/images/icon/proof.png'
            }
        },
        saveUserAuto() {
            // dd.device.notification.showPreloader({
            //     text: "使劲加载中..", //loading显示的字符，空表示不显示文字
            //     showIcon: false, //是否显示icon，默认true
            //     onSuccess : function(result) {
            //         /*{}*/
            //     },
            //     onFail : function(err) {}
            // })


            


            // Toast({
            //     message: '提示',
            //     position: 'bottom',
            //     duration: 5000
            // });


            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: formData,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: result => {
                    if (result.code == 200) {
                        ddToast('成功')
                    } 
                },
                error: e => {
                    ddToast('网络错误')
                }
            });
        },



        see: function () {

        },
        back: function () {

        },
        ljsq: function () {

        },
        onRead1(file) {
            // 以base64位上传图片
            console.log(file)
        },
        onRead2(file) {
            // 以base64位上传图片
            console.log(file)
        }
    },
    created() {
    },
    destroyed() {
    },
    mounted() {
    },
})