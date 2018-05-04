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
      // let url = getApiUrl('/ding-isv-access/get_js_config');

      // let url = 'http://api.taozugong.com:8080/ding-isv-access/get_js_config';
      

      // let url = 'http://api.taozugong.com:8080/ding-isv-access/suite/callback/suitepfxkjqyuxbyxkeqw'

      // $.ajax({
			// 	url: url,
			// 	type: "GET",
			// 	dataType: "json",
			// 	data: {
      //     url: window.location.href,
      //     corpId: 'dingaaa4a95c02214e0835c2f4657eb6378f'
      //   },
			// 	xhrFields: {
			// 		withCredentials: true
			// 	},
			// 	crossDomain: true,
			// 	success: res => {
      //     alert(9)
      //     alert("success:"+JSON.stringify(res))
			// 	},
			// 	error: e => {
			// 		alert("error:"+JSON.stringify(e))
			// 	}
			// })

      let corpid = 'ding232f30042c7d834635c2f4657eb6378f'
      // let authCode = requestAuthCode(corpid);
      // alert('authCode:'+authCode)

      // alert(2)
      dd.runtime.permission.requestAuthCode({
        corpId: corpid,
        onSuccess: function(result) {

            alert('requestAuthCode:'+JSON.stringify(result))
            return result.code
        },
        onFail : function(err) {
            alert(1)
        }
      })
    },
    getUserId() {
      alert(1)
      dd.biz.user.get({
        corpId:'', // 可选参数，如果不传则使用用户当前企业的corpId。
        onSuccess: function (info) {
            alert('userGet success: ' + JSON.stringify(info));
        },
        onFail: function (err) {
            alert('userGet fail: ' + JSON.stringify(err));
        }
    });
    }
  },
  created() {},
  destroyed() {},
  mounted() {



    // this.getGoodsList()
    // alert('测试')
    // this.getAuthCode()
    // this.getUserId()
  },
})