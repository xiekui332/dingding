var vm = new Vue({
  el: '#app',
  components: {},
  data: {
    id: '',
    goodsList1: [],
    show: true,
    selected: [],
    corpId: ''
  },
  computed: {},
  watch: {},
  filters: {},
  methods: {
    getGoodsList(id) {
      let url = getApiUrl('/shop-test/rest/ddproducts/dingding/list');
      $.ajax({
        type: "GET",
        url: url,
        xhrFields: {
          withCredentails: true
        },
        crossDomain: true,
        data: {
          categoryId: 1
        },
        success: (json) => {
        //  console.log(json)
          this.goodsList1 = json.data
        }
      })
    },
    // 跳往我的页面
    toUserCenter() {
      location.href = 'userCenter.html'
    },
    //  跳往商品详情
    toGoodsDetail(productId) {
      location.href = 'goodsDetail.html?productId=' + productId
    },
    getAuthCode() {
      let url = getApiUrl('/ding-isv-access/get_js_config');
      $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        data: {
          url: window.location.href,
          corpId: this.corpId
        },
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: res => {
         
          ddConfig(res)
          dd.ready(() => {
          //  获取免登授权码
            dd.runtime.permission.requestAuthCode({
              corpId: this.corpId,
              onSuccess: (result) => {
                //  得到授权码
                alert('requestAuthCode:' + JSON.stringify(result))
                
                this.getUserId(result.code)
              },
              onFail: (err) => {
                alert("fail" + JSON.stringify(err))
              }
            })
          });
        },
        error: e => {
          alert("error:" + JSON.stringify(e))
        }
      })
    },
    getUserId(code) {
      let url = getApiUrl('/ding-isv-access/get_user_info');
      $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        data: {
          url: window.location.href,
          corpId: this.corpId,
          code: code
        },
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: result => {
          alert("userIdSuccess:" + JSON.stringify(result))
          // let sessionObj = {
          //   corpId: this.corpId,
          //   userId: result.userId
          // }
          // setSession(sessionObj)

          this.getUserDetail(result.userId)
        },
        error: e => {
          ddToast('网络错误')
        }
      })
    },
    getUserDetail(userId) {
      // this.corpId = 'dingaaa4a95c02214e0835c2f4657eb6378f'
      // userId = '141502201726340017'
      let url = getApiUrl('/ding-isv-access/get_user_detail');
      $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        data: {
          corpId: this.corpId,
          useId: userId
        },
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: result => {
          alert('getUserDetail:'+JSON.stringify(result))
          let sessionObj = {
            corpId: this.corpId,
            userId: result.userid,
            companyName: result.companyName,
            avatar: result.avatar,
            name: result.name
          }
          setSession(sessionObj)

          this.setUserDetail(result)
        },
        error: e => {
          ddToast('网络错误')
        }
      })
    },
    setUserDetail(user) {
      let userDetail = {
        userid: user.userid,
        unionid: user.unionid,
        nailCropId: this.corpId,
        name: user.name,
        isAdmin: user.isAdmin,
        isBoss: user.isBoss,
        dingId: user.dingId,
        companyName: user.companyName
      }
      let url = getApiUrl('/shop-test/rest/user/addInformation');
      $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(userDetail),
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: result => {
          
        },
        error: e => {
          ddToast('网络错误')
        }
      })
    }
  },
  created() { },
  destroyed() { },
  mounted() {
    this.corpId = getUrlParam('corpId')
    this.getGoodsList()
    if (!getSession) {
      alert(3)
      this.getAuthCode()
    }
    // this.getUserDetail()

    // let sessionObj = {
    //   corpId: 1,
    //   userId: 1
    // }
    // setSession(sessionObj)
  },
})

