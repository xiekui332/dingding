var vm = new Vue({
  el: '#app',
  components: {},
  props: {
    loading: false
  },
  data: {
    id: "",
    goodsList1: [],
    show: true,
    selected:[ ]
  },
  computed: {},
  watch: {},
  filters: {},
  methods: {
    getGoodsList(id) {
		  let url = getApiUrl('/rest/products/list');
      $.ajax({
        type: "GET",
        url: url,
        xhrFields:{
        	withCredentails:true
        },
        crossDomain:true,
        data: {
          categoryId:1
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
      alert(8)
      // let url = getApiUrl('/ding-isv-access/suite/callback/suitepfxkjqyuxbyxkeqw');

      // let url = getApiUrl('/ding-isv-access/get_js_config');
      

      // let url = 'http://api.taozugong.com:8080/ding-isv-access/suite/callback/suitepfxkjqyuxbyxkeqw'
      $.ajax({
        type: "POST",
        url: 'http://api.taozugong.com:8080/ding-isv-access/suite/callback/suitepfxkjqyuxbyxkeqw',
        xhrFields:{
        	withCredentails:true
        },
        crossDomain:true,
        data: {
        },
        success: (res) => {
          alert(9)
          alert(JSON.stringify(res))

          let authCode = requestAuthCode(corpid);


        },
        error: e => {
					ddToast(e)
				}
      })


      // let corpid = 'ding232f30042c7d834635c2f4657eb6378f'
      // let authCode = requestAuthCode(corpid);
      // alert('authCode:'+authCode)

      // alert(2)
      // dd.runtime.permission.requestAuthCode({
      //   corpId: corpid,
      //   onSuccess: function(result) {

      //       alert('requestAuthCode:'+JSON.stringify(result))
      //       return result.code
      //   },
      //   onFail : function(err) {
      //       alert(1)
      //   }
      // })
    }
  },
  created() {},
  destroyed() {},
  mounted() {
    this.getGoodsList()
    // alert('测试')
    this.getAuthCode()
  },
})