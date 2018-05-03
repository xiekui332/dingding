Vue.component('goodInfo',{
    props: {
        goodsinfo: {
            type: Object,
            default: {}
        },
    },
    data() {
        return {
        }
    },
    computed: {},
    watch: {},
    methods: {},
    template:  `
    <div class="layout">
        <div class="goodsInfo">
            <img :src="goodsinfo.cover"/>
            <div class="goodsInfoRight regular">
                <div class="mediumerFont black overHidden" style="margin-top:.1rem">{{goodsinfo.productName}}</div>
                <div class="goodsInfoSmall gray overHidden">{{goodsinfo.brief}}</div>
                <div class="mediumerFont black price-num">
                    <span>总租金：¥{{goodsinfo.totalAmount}}</span>
                    <span class="gray">x{{goodsinfo.count}}</span>
                </div>
                <!-- <div style="margin-top:.20rem">
                    <img src="asset/images/icon/zm.png" style="height:.3rem"/>
                </div> -->
            </div>
        </div>
    </div>
    `
});


