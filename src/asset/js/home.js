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
//    let url = getApiUrl('/rest/ddproducts/dingding/list')
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
    }
  },
  created() {},
  destroyed() {},
  mounted() {
    this.getGoodsList()
  },
})