Vue.component('popModal',{
    props: {
        value: {
            type: Boolean,
            default: false
        },
        poptitle: {
            type: String,
            default: ''
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
    data() {
        return {
        }
    },
    computed: {},
    watch: {},
    methods: {
        closeModal() {
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
                       
                        确定
                    </div>
            </div>
            </div>
        </transition>
    </div>
    
    `
});


