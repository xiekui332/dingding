'use strict';

Vue.component('popModal', {
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
    data: function data() {
        return {};
    },

    computed: {},
    watch: {},
    methods: {
        closeModal: function closeModal() {
            this.$emit('input', false);
        }
    },
    template: '\n    <div>\n        <transition name="popfade">\n            <div class="pop_screen" v-show="value">\n                <div class="pop_box">\n                    <div class="pop_title largeFont">{{poptitle}}</div>\n                    <div class="pop_content" :style="setstyle"> \n                        <div v-for="item in popcontent">\n                            <p>{{item}}</p>\n                        </div>\n                    </div>\n                    <div class="close" @click="closeModal">\n                       \n                        \u786E\u5B9A\n                    </div>\n            </div>\n            </div>\n        </transition>\n    </div>\n    \n    '
});