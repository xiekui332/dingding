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
      $.ajax({
        type: "GET",
        url: "http://192.168.20.167:8080/rest/ddproducts/dingding/list",
        data: {
          id: id,
        },
        success: (json) => {
          console.log(json.data)
          this.goodsList1 = json.data
        }
      })
    },
  },
  created() {},
  destroyed() {},
  mounted: function () {
    var body = document.body.clientWidth;
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
    this.getGoodsList()
  },
})