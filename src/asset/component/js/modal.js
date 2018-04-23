Vue.component('modal',{
    props: {
        showPop: {
            type: Boolean,
            default: false
        },
        popTitle: {
            type: String,
            default: ''
        },
        popContent: {
            type: Array,
            default: []
        },
        setStyle: {
            type: String,
            default: ''
        }
    },
    data:function () {
        return {
        }
    },
    computed: {},
    watch: {},
    methods: {},
    template: `
    <div>
        <transition name="fade">
            <div class="pop_screen" v-show="showPop"></div>
            <div class="pop_box" v-show="showPop">
                <div class="pop_title largeFont">{{popTitle}}</div>
                <div class="pop_content" :style="setStyle"> 
                    <div v-for="item in popContent">
                        <p>{{item}}</p>
                    </div>
                </div>
                <div class="close">
                    <img src="asset/images/icon/close.png"/>
                </div>
            </div>
        </transition>
    </div>`,
});