Vue.component('popModal',{
    props: {
        value: {
            type: Boolean,
            default: false
        },
        poptitle: {
            type: String,
            default: '12'
        },
        popcontent: {
            type: Array,
            default: []
        },
        setstyle: {
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
    methods: {
        closeModal: function() {
            this.$emit('input', false)
        }
    },
    template:  `
    <div>
        <transition name="popfade">
            <div class="pop_screen" v-show="value">
                <div class="pop_box">
                    <div class="pop_title largeFont">{{poptitle}}</div>
                    <div class="pop_content" :style="setstyle"> 
                        <div v-for="item in popcontent">
                            <p>{{item}}</p>
                        </div>
                    </div>
                    <div class="close" @click="closeModal">
                        <img src="asset/images/icon/close.png"/>
                    </div>
            </div>
            </div>
        </transition>
    </div>
    
    `
});


