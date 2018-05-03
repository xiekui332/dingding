// import province from './../../../static/js/province';
Vue.component('popupAddress',{
    props: {
        popupvisible: {
            type: Boolean,
            default: false
        },
        value: {
            type: Array,
            default: () => {
                return [
                    {
                        name: '浙江省',
                        id: '330000'
                    },
                    {
                        name: '杭州市',
                        id: '330100'
                    },
                    {
                        name: '西湖区',
                        id: '330106'
                    }
                ]
            }
        },
        province: {
            type: Array,
            default: {}
        }
    },
    data() {
        return {
            isVisible: this.popupvisible,
            resultList: this.init(),
            provincelen: province.length,
            provinceList: [],
            cityList: [],
            areaList: [],
            addressSlots:[
                {
                    flex: 1,
                    textAlign: 'right',
                    // defaultIndex: 18,
                    values: [],
                }, 
                {
                    flex: 1,
                    textAlign: 'center',
                    // defaultIndex: 2,
                    values: [],
                }, 
                {
                    flex: 1,
                    textAlign: 'left',
                    values: [],
                }
            ],
        }
    },
    computed: {},
    watch: {
        popupvisible(val) {
            this.isVisible = true;
        },
        // isVisible(val) {
        //     if (!val) {
        //         let addressList = [];

        //         this.provinceList.forEach(item => {
        //             if (item.name == this.resultList[0]) {
        //                 addressList[0] = item;
        //             }
        //         });
        //         this.cityList.forEach(item => {
        //             if (item.name == this.resultList[1]) {
        //                 addressList[1] = item;
        //             }
        //         });
        //         this.areaList.forEach(item => {
        //             if (item.name == this.resultList[2]) {
        //                 addressList[2] = item;
        //             }
        //         });
        //         this.$emit('input', addressList);
        //     }
        // },
    },
    methods: {
        init() {
            if (this.value.length) {
                let list = [];
                this.value.forEach((item) => {
                    list.push(item.name);
                });
                return list;
            }
            return ['广东省','深圳市','直辖区']
        },
        changeSlot(picker, values) {
            this.resultList = values;
            picker.setSlotValues(1, this.getCityList());
            picker.setSlotValues(2, this.getAreaList());       
        },
        getProvinceList() {
            let list = [];
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
        getCityList() {
            let list = [];
            this.cityList = [];
            for (let i = 0; i < this.provincelen; i++) {
                if (this.province[i].name == this.resultList[0]) {
                    var provinceObj = this.province[i];
                    for (let j = 0; j < provinceObj.child.length; j++) {
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
        getAreaList() {
            let list = [];
            this.areaList = [];
            for (let i = 0; i < this.provincelen; i++) {
                if (this.province[i].name == this.resultList[0]) {

                    var provinceObj = this.province[i];
                    for (let i = 0; i < provinceObj.child.length; i++) {

                        let cityObj = provinceObj.child[i];
                        if (cityObj.name == this.resultList[1]) {
                            let areasObj = cityObj.child;
                            if (areasObj !== undefined) {
                                for (let k = 0; k < areasObj.length; k++) {
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
        setSlots() {
            this.addressSlots[0].values = this.getProvinceList();
            this.addressSlots[1].values = this.getCityList();
            this.addressSlots[2].values = this.getAreaList();
        },
        checkAddress() {
            this.isVisible = !this.isVisible

            let addressList = [];

            this.provinceList.forEach(item => {
                if (item.name == this.resultList[0]) {
                    addressList[0] = item;
                }
            });
            this.cityList.forEach(item => {
                if (item.name == this.resultList[1]) {
                    addressList[1] = item;
                }
            });
            this.areaList.forEach(item => {
                if (item.name == this.resultList[2]) {
                    addressList[2] = item;
                }
            });
            // console.log(addressList)
            this.$emit('change', addressList);
            
            // addressList = JSON.parse(JSON.stringify(addressList))
            this.$emit('input', addressList);
        }
    },
    created() {
        this.setSlots();
    },
    template:  `
    <div>
        <mt-popup v-model="isVisible" position="bottom" style="width:100%;">
            <mt-picker :slots="addressSlots" :showToolbar="true" :visibleItemCount="5" @change="changeSlot"  style="margin-bottom:5px">
                <div style="display:flex;justify-content: space-between;padding: 0 .3rem;">
                    <span class="sure" @click="isVisible = !isVisible">取消</span>
                    <span class="sure" style="color:#000">选择地区</span>
                
                    <span class="sure" @click="checkAddress">确定</span>
                </div>
                <div class="coverTop"></div>
                <div class="coverBottom"></div>
            </mt-picker>
            
        </mt-popup>
    </div>
    `
});


