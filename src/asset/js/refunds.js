var vm = new Vue({
    el: '#app',
    components: {},
    props: {
      
    },
    data: {
      showA:true,
      showB:true,
      
    },
    computed: {},
    watch: {},
    filters: {},
    methods: {
      changePage(){
        this.showB=true;
      }
    },
    created() {},
    destroyed() {},
    mounted: function () {
      var body = document.body.clientWidth;
      document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
      
    },
  })