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
      $.ajax({
        type: "GET",
        url: "http://192.168.18.119:8080/rest/ddproducts/dingding/list",
        data: {
          id: id,
        },
        success: (json) => {
          console.log(json.data)
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
    var body = document.body.clientWidth;
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
    this.getGoodsList()
  },
})