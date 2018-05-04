'use strict';

// import province from './../../../static/js/province';
Vue.component('popupAddress', {
    props: {
        popupvisible: {
            type: Boolean,
            default: false
        },
        value: {
            type: Array,
            default: function _default() {
                return [{
                    name: '浙江省',
                    id: '330000'
                }, {
                    name: '杭州市',
                    id: '330100'
                }, {
                    name: '西湖区',
                    id: '330106'
                }];
            }
        },
        province: {
            type: Array,
            default: {}
        }
    },
    data: function data() {
        return {
            isVisible: this.popupvisible,
            resultList: this.init(),
            provincelen: province.length,
            provinceList: [],
            cityList: [],
            areaList: [],
            addressSlots: [{
                flex: 1,
                textAlign: 'right',
                // defaultIndex: 18,
                values: []
            }, {
                flex: 1,
                textAlign: 'center',
                // defaultIndex: 2,
                values: []
            }, {
                flex: 1,
                textAlign: 'left',
                values: []
            }]
        };
    },

    computed: {},
    watch: {
        popupvisible: function popupvisible(val) {
            this.isVisible = true;
        }
    },
    methods: {
        init: function init() {
            if (this.value.length) {
                var list = [];
                this.value.forEach(function (item) {
                    list.push(item.name);
                });
                return list;
            }
            return ['广东省', '深圳市', '直辖区'];
        },
        changeSlot: function changeSlot(picker, values) {
            this.resultList = values;
            picker.setSlotValues(1, this.getCityList());
            picker.setSlotValues(2, this.getAreaList());
        },
        getProvinceList: function getProvinceList() {
            var list = [];
            this.provinceList = [];
            for (var i = 0; i < this.provincelen; i++) {
                this.provinceList.push({
                    name: this.province[i].name,
                    id: this.province[i].id
                });
                list.push(this.province[i].name);
                if (this.resultList[0] && this.resultList[0] == this.province[i].name) {
                    this.addressSlots[0].defaultIndex = i;
                }
            }
            return list;
        },
        getCityList: function getCityList() {
            var list = [];
            this.cityList = [];
            for (var i = 0; i < this.provincelen; i++) {
                if (this.province[i].name == this.resultList[0]) {
                    var provinceObj = this.province[i];
                    for (var j = 0; j < provinceObj.child.length; j++) {
                        this.cityList.push({
                            name: provinceObj.child[j].name,
                            id: provinceObj.child[j].id
                        });
                        list.push(provinceObj.child[j].name);
                        if (this.resultList[1] && this.resultList[1] == provinceObj.child[j].name) {
                            this.addressSlots[1].defaultIndex = j;
                        }
                    }
                    break;
                }
            }
            return list;
        },
        getAreaList: function getAreaList() {
            var list = [];
            this.areaList = [];
            for (var i = 0; i < this.provincelen; i++) {
                if (this.province[i].name == this.resultList[0]) {

                    var provinceObj = this.province[i];
                    for (var _i = 0; _i < provinceObj.child.length; _i++) {

                        var cityObj = provinceObj.child[_i];
                        if (cityObj.name == this.resultList[1]) {
                            var areasObj = cityObj.child;
                            if (areasObj !== undefined) {
                                for (var k = 0; k < areasObj.length; k++) {
                                    this.areaList.push({
                                        name: areasObj[k].name,
                                        id: areasObj[k].id
                                    });
                                    list.push(areasObj[k].name);
                                    if (this.resultList[2] && this.resultList[2] == areasObj[k].name) {
                                        this.addressSlots[2].defaultIndex = k;
                                    }
                                }
                            } else {
                                // 这里你自己设置一个默认值吧
                                this.areaList.push({ name: ' ', id: '0' });
                                list.push(' ');
                            }
                            break;
                        }
                    }
                    break;
                }
            }
            return list;
        },
        setSlots: function setSlots() {
            this.addressSlots[0].values = this.getProvinceList();
            this.addressSlots[1].values = this.getCityList();
            this.addressSlots[2].values = this.getAreaList();
        },
        checkAddress: function checkAddress() {
            var _this = this;

            this.isVisible = !this.isVisible;

            var addressList = [];

            this.provinceList.forEach(function (item) {
                if (item.name == _this.resultList[0]) {
                    addressList[0] = item;
                }
            });
            this.cityList.forEach(function (item) {
                if (item.name == _this.resultList[1]) {
                    addressList[1] = item;
                }
            });
            this.areaList.forEach(function (item) {
                if (item.name == _this.resultList[2]) {
                    addressList[2] = item;
                }
            });
            // console.log(addressList)
            this.$emit('change', addressList);

            // addressList = JSON.parse(JSON.stringify(addressList))
            this.$emit('input', addressList);
        }
    },
    created: function created() {
        this.setSlots();
    },

    template: '\n    <div>\n        <mt-popup v-model="isVisible" position="bottom" style="width:100%;">\n            <mt-picker :slots="addressSlots" :showToolbar="true" :visibleItemCount="5" @change="changeSlot"  style="margin-bottom:5px">\n                <div style="display:flex;justify-content: space-between;padding: 0 .3rem;">\n                    <span class="sure" @click="isVisible = !isVisible">\u53D6\u6D88</span>\n                    <span class="sure" style="color:#000">\u9009\u62E9\u5730\u533A</span>\n                \n                    <span class="sure" @click="checkAddress">\u786E\u5B9A</span>\n                </div>\n                <div class="coverTop"></div>\n                <div class="coverBottom"></div>\n            </mt-picker>\n            \n        </mt-popup>\n    </div>\n    '
});