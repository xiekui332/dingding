'use strict';

Vue.component('goodInfo', {
    props: {
        goodsinfo: {
            type: Object,
            default: {}
        }
    },
    data: function data() {
        return {};
    },

    computed: {},
    watch: {},
    methods: {},
    template: '\n    <div class="layout">\n        <div class="goodsInfo">\n            <img :src="goodsinfo.cover"/>\n            <div class="goodsInfoRight regular">\n                <div class="mediumerFont black overHidden" style="margin-top:.1rem">{{goodsinfo.productName}}</div>\n                <div class="goodsInfoSmall gray overHidden">{{goodsinfo.brief}}</div>\n                <div class="mediumerFont black price-num">\n                    <span>\u603B\u79DF\u91D1\uFF1A\xA5{{goodsinfo.totalAmount}}</span>\n                    <span class="gray">x{{goodsinfo.num}}</span>\n                </div>\n                <!-- <div style="margin-top:.20rem">\n                    <img src="asset/images/icon/zm.png" style="height:.3rem"/>\n                </div> -->\n            </div>\n        </div>\n    </div>\n    '
});