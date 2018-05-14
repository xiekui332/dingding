
var vm = new Vue({
    
    el:'#app',
    components: {
    },
    props: {
    },
    data: {
		showImgPreview:false,
        user: {},
        productId: '',
        orderNo: '',
        userAuth: {
            nailCropId: '',
            userid: '',
            company: "",
            companyDelegateImg: 'asset/images/icon/proof.png',
            dingIndexImg: 'asset/images/icon/proof.png',
            idcard: "",
            name: "",
            // phone: "",
            registerNo: "",
            status: 0,
            rejectReason: ""
        },
        isFirstAuth: true,
        canEdit: true,
        validate: ['company', 'idcard', 'name', 'registerNo'],
        authStatus: {
            success: 1,
            fail: 2,
            audit: 0,
            invalid: 3
        },
        authHead: {
            icon: '',
            title: '',
            describe: []
        },
        showPop: false,
        popTitle: '客服电话',
        setStyle: 'textAlign:center;fontSize:.38rem;lineHeight:2',
        popContent: [
            '<a href="tel:0571-8518073" style="color:#333">0571-85180735</a>'
        ],
        urls:'asset/images/icon/example_index.png',
        isFocus: false
    },
    computed: {
    },
    watch: {
    },
    filters: {
    },
    methods: {
        onFileChange(e, index) {
            const imgFile = e.target.filter
            // if (imgFile.length > 1) {
            //     ddToast('只能上传一张')
            //     return
            // }
            if(!/\.(gif|jpg|jpeg|png)$/i.test(imgFile[0].name))  
            {  
                ddToast("图片类型必须是.gif,jpeg,jpg,png中的一种")  
                return;  
            }  

            let url =  getApiUrl('/shop-test/img/upload.do') 
            uploadImg(e, url).then((imgUrl)=>{
                if (index === 0) {
                    this.userAuth.dingIndexImg = imgUrl
                } else if (index === 1) {
                    this.userAuth.companyDelegateImg = imgUrl
                }
            }).catch((err)=>{
                ddToast(err)
            })  
        },
        closeImg(index) {
            if (index === 0) {
                this.userAuth.dingIndexImg = 'asset/images/icon/proof.png'
            } else if (index === 1) {
                this.userAuth.companyDelegateImg = 'asset/images/icon/proof.png'
            }
        },
        authValidate() {
            let message = true
            this.validate.some((name) => { 
                if (!this.userAuth[name]) {
                    message = '请填写必填项'
                    return true
                }
            })
            if (message != true) {
                return message
            }
            
            if (this.userAuth.dingIndexImg == 'asset/images/icon/proof.png' || this.userAuth.companyDelegateImg == 'asset/images/icon/proof.png') {
                message = '请上传凭证' 
            } else if (!checkIdcard(this.userAuth.idcard)) {
                message = '身份证号输入有误' 
            } 
            // else if (!phoneValid(this.userAuth.phone)) {
            //     message = '手机号输入有误' 
            // }
            return message
        },
        saveUserAuth() {
            let message = this.authValidate()
            if (message != true) {
                ddToast(message)
                return
            }
            let url = getApiUrl('/shop-test/rest/dingDingUserInfo/Ddcreate')
            this.userAuth.nailCropId = this.user.corpId
            this.userAuth.userid = this.user.userId
            $.ajax({
                url: url,
                type: "POST",
                // dataType: "json",
                data: JSON.stringify(this.userAuth),
                contentType: "application/json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: result => {
                    if (result.code == 200) {
                        this.getUserAuth()
                        // ddToast('授权成功')
                        this.zhimaAuth()
                    } else {
                        ddToast(result.message)
                    }
                },
                error: e => {
                    ddToast('网络错误')
                }
            });
        },
        getUserAuth() {
            let url = getApiUrl('/shop-test/rest/dingDingUserInfo/Ddlist')
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: {
                    nailCropId: this.user.corpId,
                    userId: this.user.userId
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: result => {
                    if (result.code == 200) {
                        this.isFirstAuth = false
                        this.userAuth = result.data
                        // 审核拒绝可再编辑
                        if (this.userAuth.status == this.authStatus.fail) {
                            this.canEdit = false
                            this.authHead.icon = 'asset/images/icon/auth_fail.png'
                            this.authHead.title = '审核拒绝'
                            this.authHead.describe[0] = this.userAuth.rejectReason
                            this.authHead.describe[1] = '请重新编辑授权信息，再次提交审核'
                        } else if (this.userAuth.status == this.authStatus.success) {
                            this.canEdit = false
                            this.authHead.icon = 'asset/images/icon/auth_success.png'
                            this.authHead.title = '审核通过'
                            this.authHead.describe[0] = '恭喜你，授权信息已经审核通过；可以前往订单列表页完成支付'
                        } else if (this.userAuth.status == this.authStatus.audit) {
                            this.canEdit = false
                            this.authHead.icon = 'asset/images/icon/auth_audit.png'
                            this.authHead.title = '审核中'
                            this.authHead.describe[0] = '你的授权信息正在审核中，请耐心等待'
                        }  else if (this.userAuth.status == this.authStatus.invalid) {
                            this.isFirstAuth = true
                            this.canEdit = true
                        } 
                    } else if (result.code == 7010) {
                        this.isFirstAuth = true
                        this.canEdit = true
                    }
                },
                error: e => {
                    ddToast('网络错误')
                }
            });
        },
        updateUserAuth() {
            let message = this.authValidate()
            if (message != true) {
                ddToast(message)
                return
            }
            let url = getApiUrl('/shop-test/rest/dingDingUserInfo/Ddupdate')
            $.ajax({
                url: url,
                type: "POST",
                // dataType: "json",
                data: JSON.stringify(this.userAuth),
                contentType: "application/json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: result => {
                    if (result.code == 200) {
                        this.getUserAuth()
                        this.zhimaAuth()
                    } else {
                        ddToast(result.message)
                    }
                },
                error: e => {
                    ddToast('网络错误')
                }
            });
        },
        zhimaAuth() {
            let url = getPhpApiUrl('/nail/zhimaauth.html')
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: {
                    name: this.userAuth.name,
                    card: this.userAuth.idcard,
                    productId: this.productId,
                    nail_crop_id: this.user.corpId,
                    userid: this.user.userId,
                    order_no: this.orderNo
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: result => {
                    if (result.code == 200) {
                        location.href = result.data.url
                    } else {
                        ddToast(result.message)
                    }
                },
                error: e => {
                    ddToast('网络错误')
                }
            });
        },
        // 预览图片
        imgPreview(url){
            // dd.ready(function(){
            //     dd.biz.util.previewImage({
            //         urls: ['asset/images/icon/example_index.png','asset/images/icon/example_index.png'],//图片地址列表
            //         current: 'asset/images/icon/example_index.png',//当前显示的图片链接
            //         onSuccess : function(result) {
            //             /**/
            //             alert(JSON.stringify(result))
            //         },
            //         onFail : function(err) {
            //             alert(JSON.stringify(err))
            //         }
            //     })
            // });
            this.urls = url;
            this.showImgPreview = true;
           
        },
        doFocus() {
            this.isFocus = true
        },
        doBlur() {
            this.isFocus = false
        },
        failEdit() {
            if (this.canEdit) {
                this.updateUserAuth()
            } else {
                this.canEdit = true
            }
        }
    },
    created() {
    },
    destroyed() {
    },
    mounted() {
		this.user = getSession()
        this.productId = getUrlParam('productId')
        this.orderNo = getUrlParam('orderNo')
        this.getUserAuth()

        // dd.ready(function(){
        //     dd.biz.navigation.setLeft({
        //         control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
        //         text: '返回',//控制显示文本，空字符串表示显示默认文本
        //         onSuccess :function(result) {
        //             dd.biz.navigation.goBack({
        //                 onSuccess : function(result) {
        //                 },
        //                 onFail : function(err) {}
        //             })
        //         },
        //         onFail:function(err){}
        //     });
        // }) 


        // var winHeight = $(window).height();   //获取当前页面高度
        // $(window).resize(()=>{
            // alert($(this).height())
            // var thisHeight = $(this).height();
            // if(winHeight - thisHeight >50){
            //     //当软键盘弹出，在这里面操作
            //     this.isFocus = true
            // }else{
            //     //当软键盘收起，在此处操作
            //     this.isFocus = false
            // }
        // });
    },
})

