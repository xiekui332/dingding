var vm = new Vue({
    el:'#app',
    components: {
    },
    props: {
    },
    data: {
        authId: 3,
        userAuto: {
            company: "",
            companyDelegateImg: 'asset/images/icon/proof.png',
            dingIndexImg: 'asset/images/icon/proof.png',
            idcard: "321322199602052213",
            name: "",
            // phone: "",
            registerNo: "330104000287730",
            status: 0,
            rejectReason: "的v"
        },
        isFirstAuto: true,
        canEdit: true,
        validate: ['company', 'idcard', 'name', 'registerNo'],
        
        autoStatus: {
            success: 1,
            fail: 2,
            audit: 0
        },
        autoHead: {
            icon: '',
            title: '',
            describe: []
        },
        showPop: false,
        popTitle: '客服电话',
        setStyle: 'textAlign:center;fontSize:.38rem;lineHeight:2',
        popContent: [
            '0571-85180735'
        ],
    },
    computed: {
    },
    watch: {
    },
    filters: {
    },
    methods: {
        onFileChange(e, index) {
            // let url =  getApiUrl('/shop-service/img/upload.do') 
            // let url = 'http://192.168.17.21:8080/img/upload.do'
            let url =  '/getapi/img/upload.do'
            uploadImg(e, url).then((imgUrl)=>{
                if (index === 0) {
                    this.userAuto.dingIndexImg = imgUrl
                } else if (index === 1) {
                    this.userAuto.companyDelegateImg = imgUrl
                }
            }).catch((err)=>{
                ddToast('图片上传失败')
            })  
        },
        closeImg(index) {
            if (index === 0) {
                this.userAuto.dingIndexImg = 'asset/images/icon/proof.png'
            } else if (index === 1) {
                this.userAuto.companyDelegateImg = 'asset/images/icon/proof.png'
            }
        },
        autoValidate() {
            let message = true
            this.validate.some((name) => { 
                if (!this.userAuto[name]) {
                    message = '请填写必填项'
                    return true
                }
            })
            if (message) {
                return message
            }
            if (this.userAuto.dingIndexImg == 'asset/images/icon/proof.png' || this.userAuto.companyDelegateImg == 'asset/images/icon/proof.png') {
                message = '请上传凭证' 
            } else if (!checkIdcard(this.userAuto.idcard)) {
                message = '身份证号输入有误' 
            } 
            // else if (!phoneValid(this.userAuto.phone)) {
            //     message = '手机号输入有误' 
            // }
            return message
        },
        saveUserAuto() {
            let flag = ''
            let message = this.autoValidate()
            if (message != true) {
                ddToast(message)
                return
            }

            let url = '/getapi/rest/dingDingUserInfo/Ddcreate'
            $.ajax({
                url: url,
                type: "POST",
                // dataType: "json",
                data: JSON.stringify(this.userAuto),
                contentType: "application/json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: result => {
                    if (result.code == 200) {
                        ddToast('授权成功')
                    } else {
                        ddToast(result.message)
                        
                    }
                },
                error: e => {
                    ddToast('网络错误')
                }
            });
        },
        getUserAuto() {
            // let url = '/getapi/rest/dingDingUserInfo/Ddlist'
            let url = getApiUrl('/rest/dingDingUserInfo/Ddlist')
            
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: {
                    id: this.authId
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: result => {
                    if (result.code == 200) {

                        this.userAuto = result.data
                        this.userAuto.status = this.autoStatus.fail
                        // 审核拒绝可再编辑
                        if (this.userAuto.status === this.autoStatus.fail) {
                            this.canEdit = true
                            this.autoHead.icon = 'asset/images/icon/auto_fail.png'
                            this.autoHead.title = '审核拒绝'
                            this.autoHead.describe[0] = this.userAuto.rejectReason
                            this.autoHead.describe[1] = '请重新编辑授权信息，再次提交审核'
                        } else if (this.userAuto.status === this.autoStatus.success) {
                            this.autoHead.icon = 'asset/images/icon/auto_success.png'
                            this.autoHead.title = '审核通过'
                            this.autoHead.describe[0] = '恭喜你，授权信息已经审核通过；可以前往订单列表页完成支付'
                        } else if (this.userAuto.status === this.autoStatus.audit) {
                            this.autoHead.icon = 'asset/images/icon/auto_audit.png'
                            this.autoHead.title = '审核中'
                            this.autoHead.describe[0] = '你的授权信息正在审核中，请耐心等待'
                        }
                    } 
                },
                error: e => {
                    ddToast('网络错误')
                }
            });
        },
        updateUserAuto() {
            let flag = ''
            let message = this.autoValidate()
            if (message != true) {
                ddToast(message)
                return
            }

            // let url = '/getapi/rest/dingDingUserInfo/Ddcreate'
            let url = getApiUrl('/rest/dingDingUserInfo/Ddupdate')
            this.userAuto.id = this.authId
            $.ajax({
                url: url,
                type: "POST",
                // dataType: "json",
                data: JSON.stringify(this.userAuto),
                contentType: "application/json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: result => {
                    if (result.code == 200) {
                        ddToast('修改成功')
                    } else {
                        ddToast(result.message)
                    }
                },
                error: e => {
                    ddToast('网络错误')
                }
            });
        }
    },
    created() {
    },
    destroyed() {
    },
    mounted() {
        this.authId = getUrlParam('authId')
        if (getUrlParam('authId')) {
            this.authId = getUrlParam('authId')
            this.canEdit = false
            this.isFirstAuto = false
            // this.getUserAuto()
        } else {
            this.isFirstAuto = true
            this.canEdit = true
        }
    },
})