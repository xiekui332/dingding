1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
var vm = new Vue({
  el: '#app',
  components: {},
  data: {
    id: '',
    goodsList1: [],
    show: true,
    selected: [],
    corpId: ''
  },
  computed: {},
  watch: {},
  filters: {},
  methods: {
    getGoodsList(id) {
      let url = getApiUrl('/shop-test/rest/ddproducts/dingding/list');
      $.ajax({
        type: "GET",
        url: url,
        xhrFields: {
          withCredentails: true
        },
        crossDomain: true,
        data: {
          categoryId: 1
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
      let url = getApiUrl('/ding-isv-access/get_js_config');
      $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        data: {
          url: window.location.href,
          corpId: this.corpId
        },
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: res => {
          ddConfig(res)
          dd.ready(() => {
            dd.runtime.permission.requestAuthCode({
              corpId: this.corpId,
              onSuccess: (result) => {
                alert('requestAuthCode:' + JSON.stringify(result))
                getUserId(result.code)
              },
              onFail: (err) => {
                alert("fail" + JSON.stringify(err))
              }
            })
          });
        },
        error: e => {
          alert("error:" + JSON.stringify(e))
        }
      })
    },
    getUserId() {
      let url = getApiUrl('/ding-isv-access/get_user_info');
      $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        data: {
          url: window.location.href,
          corpId: this.corpId,
          code: code
        },
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: result => {
          alert("sucess:" + JSON.stringify(result))
          let sessionObj = {
            corpId: this.corpId,
            userId: result.userId
          }
          setSession(sessionObj)
        },
        error: e => {
          ddToast('网络错误')
        }
      })
    }
  },
  created() { },
  destroyed() { },
  mounted() {
    this.corpId = getUrlParam('corpId')
    this.getGoodsList()
    this.getAuthCode()


    let sessionObj = {
      corpId: 'ding232f30042c7d834635c2f4657eb6378f',
      userId: 6
    }
    setSession(sessionObj)
  },
})

