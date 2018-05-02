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
      // let url = getApiUrl('/rest/ddproducts/dingding/list')
      let url = '/getapi/rest/ddproducts/dingding/list'
      $.ajax({
        type: "GET",
        url: "http://192.168.16.198:8081/rest/ddproducts/dingding/list",
        data: {
          // id: id,
        },
        success: (json) => {
          // console.log(json.data)
          this.goodsList1 = json.data
        }
      })
    },
    toUserCenter() {
      location.href = 'userCenter.html'
    }
  },
  created() {},
  destroyed() {},
  mounted() {
    this.getGoodsList()
  },
})