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
		  let url = getApiUrl('/shop-test/rest/products/list');
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
      let url = getApiUrl('/shop-test/ding-isv-access/get_js_config');

      // let url = 'http://api.taozugong.com:8080/ding-isv-access/get_js_config';
      
      // let corpId = getUrlParam('corpIp')
      let corpId = 'ding232f30042c7d834635c2f4657eb6378f'
      
      $.ajax({
				url: url,
				type: "GET",
				dataType: "json",
				data: {
          url: window.location.href,
          corpId: corpId
        },
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: res => {
          alert("success:"+JSON.stringify(res))

          dd.config({
              agentId: res.agentId, // 必填，微应用ID
              corpId: res.orpId,//必填，企业ID
              timeStamp: res.timeStamp, // 必填，生成签名的时间戳
              nonceStr: res.nonce, // 必填，生成签名的随机串
              signature: res.signature, // 必填，签名
              jsApiList: ['ui.pullToRefresh.enable','ui.pullToRefresh.stop','biz.util.openLink','biz.navigation.setLeft','biz.navigation.setTitle','biz.navigation.setRight'] // 必填，需要使用的jsapi列表
          });

          dd.ready(function(){
              //  获取免登授权码

                dd.runtime.permission.requestAuthCode({
                    corpId: corpId,
                    onSuccess: function(result) {
            
                        alert('requestAuthCode:'+JSON.stringify(result))
                        return result.code
                    },
                    onFail : function(err) {
                        alert("fail"+1)
                    }
                  })
              });
				},
				error: e => {
					alert("error:"+JSON.stringify(e))
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