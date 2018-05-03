var vm = new Vue({
    el: '#app',
    components: {},
    props: {
    },
    data: {  
      showA:true,
      showB:false
    },
    computed: {},
    watch: {},
    filters: {},
    methods: {
      toRefundsing(){
        this.showA=false;
      }
    },
    created() {},
    destroyed() {},
    mounted: function () {
      var body = document.body.clientWidth;
      document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
      
    },
  })