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
<<<<<<< HEAD
		  let url = getApiUrl('/shop-test/rest/products/list');
=======
      let url = getApiUrl('/rest/products/list');
>>>>>>> 0f715d9377b9aa048693e2bbf14ea16aac6f5bf7
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
        }
      })
    },
    toUserCenter() {
      location.href = 'userCenter.html'
    },
    toGoodsDetail(productId) {
      location.href = 'goodsDetail.html?productId=' + productId
    },
    getAuthCode() {
<<<<<<< HEAD
      let url = getApiUrl('/shop-test/ding-isv-access/get_js_config');

      // let url = 'http://api.taozugong.com:8080/ding-isv-access/get_js_config';
      
      // let corpId = getUrlParam('corpIp')
      let corpId = 'ding232f30042c7d834635c2f4657eb6378f'
      
=======
      let url = getApiUrl('/ding-isv-access/get_js_config');
>>>>>>> 0f715d9377b9aa048693e2bbf14ea16aac6f5bf7
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
            dd.runtime.permission.requestAuthCode({
              corpId: this.corpId,
              onSuccess: (result) => {
                alert('requestAuthCode:' + JSON.stringify(result))
                getUserId(result.code)
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
    getUserId() {
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
          alert("sucess:" + JSON.stringify(result))
          let sessionObj = {
            corpId: this.corpId,
            userId: result.userId
          }
          setSession(sessionObj)
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
    this.getAuthCode()
  },
})