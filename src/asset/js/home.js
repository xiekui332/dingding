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
    footerFnn(){
      $('.myContent').addClass('active').siblings().removeClass('active')
      $('.footer-img').addClass(active).siblings().removeClass('active')
    },
    getGoodsList(id) {
      let url = getApiUrl('/rest/ddproducts/dingding/list')
      // let url = '/getapi/rest/ddproducts/dingding/list'
      $.ajax({
        type: "GET",
        url: url,
        data: {
          // id: id,
        },
        success: (json) => {
          // console.log(json.data)
          this.goodsList1 = json.data
        }
      })
    },
    imgFnn(id) {
      console.log(id)
      this.$router.push({
        name: 'home',
        params: {
          userId: id
        }
      })

    }
  },
  created() {},
  destroyed() {},
  mounted: function () {
    this.getGoodsList()
  },
})