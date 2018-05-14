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
          this.goodsList1 = json.data
         // console.log(json)
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
      dd.ready(()=>{
        //获取免登授权码
        dd.runtime.permission.requestAuthCode({
          corpId: this.corpId,
          onSuccess: (result)=> {
            // alert('requestAuthCode:' + JSON.stringify(result))
            this.getUserId(result.code) 
          },
          onFail: (err)=> {
            // alert("fail" + JSON.stringify(err))
          }
        })
      });

      // let url = getApiUrl('/ding-isv-access/get_js_config');
      // $.ajax({
      //   url: url,
      //   type: "GET",
      //   dataType: "json",
      //   data: {
      //     url: window.location.href,
      //     corpId: this.corpId
      //   },
      //   xhrFields: {
      //     withCredentials: true
      //   },
      //   crossDomain: true,
      //   success: res => {
      //     ddConfig(res)
      //   },
      //   error: e => {
      //     ddToast('网络错误')
      //   }
      // })
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
          let sessionObj = {
            corpId: this.corpId,
            userId: result.userid,
            companyName: result.companyName,
            avatar: result.avatar,
            name: result.name
          }
          //  session存储对象
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
    },
  },
  created() { },
  destroyed() {},
  mounted() {
    this.corpId = getUrlParam('corpId')
    this.getGoodsList()
    this.getAuthCode()

    // let sessionObj = {
    //   corpId: 'ding232f30042c7d834635c2f4657eb6378f',
    //   userId: '08623665231156032'
    // }
    // setSession(sessionObj)
   
    // 钉钉页面title右侧更多文字
    dd.ready(() => {
      dd.biz.navigation.setRight({
          show: true,
          control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
          text: '更多',//控制显示文本，空字符串表示显示默认文本
          onSuccess :(result) => {
            dd.biz.util.share({
              type: 0,//分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
              url: window.location.href,
              title: '淘租公公公',
              content: '淘租公钉钉微应用',
              image: 'asset/images/icon/logo.png',
              onSuccess : function() {
                  //onSuccess将在调起分享组件成功之后回调
                  /**/
              },
              onFail : function(err) {}
            })
          },
          onFail:(err) => {}
      });

      
    }) 
  },
})

