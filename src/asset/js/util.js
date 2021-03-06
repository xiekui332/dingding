function uploadImg(e, url) {
    return new Promise((resolve, reject) => {
        const imgFile = e.target.files[0]
        let length = imgFile.length
        let formData = new FormData()
        formData.append('picture', imgFile)
        formData.append('filename', imgFile.name)
        $.ajax({
            url: url,
            type: "POST",
            // dataType: "json",
            data: formData,
            // contentType: "application/json;charset=utf-8",
            // contentType: "multipart/form-data",
            contentType: false,  
            processData: false,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: result => {
                if (result.code == 200) {
                    resolve(result.data)
                } 
            },
            error: e => {
                reject('上传失败')
            }
        });
    })
}


function checkIdcard(ID) {
	if (typeof ID !== 'string') return false;
	var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
	var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2));
	var d = new Date(birthday);
	var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
	var currentTime = new Date().getTime();
	var time = d.getTime();
	var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
	var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
	var sum = 0, i, residue;

	if (!/^\d{17}(\d|x)$/i.test(ID)) return false;
	if (city[ID.substr(0, 2)] === undefined) return false;
	if (time >= currentTime || birthday !== newBirthday) return false;
	for (i = 0; i < 17; i++) {
		sum += ID.substr(i, 1) * arrInt[i];
	}
	residue = arrCh[sum % 11];
	if (residue !== ID.substr(17, 1)) return false;

	return true
}

function phoneValid(phone) {
    var phoneExp = /^1[345789]\d{9}$/;//电话号码;
    return phoneExp.test(phone)
}

function emailValid(email) {
    var emailExp = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;//邮箱
    return emailExp.test(email)
}

//解析url
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) return decodeURI(r[2]);
	return null; //返回参数值
}


//租赁正式域名
function getHostUrl(url) {
    const tzg_lease_domain = "http://ding.taozugong.com"; 
    return tzg_lease_domain + url
}
//接口api地址
function getApiUrl(url) {
    const taozugonghost = "http://api.taozugong.com:8080";
    // const taozugonghost = '/getapi'
    return taozugonghost + url
}

function getPhpApiUrl(url) {
    const taozugonghost = "http://test.api.taozugong.net";
    // const taozugonghost = "/getapi";
    
    return taozugonghost + url
}

var body = document.body.clientWidth;		
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';


function ddToast(message) {
    dd.ready(() => {
        dd.device.notification.toast({
            icon: '', //icon样式，有success和error，默认为空 0.0.2
            text: message, //提示信息
            duration: 3, //显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
            delay: 0, //延迟显示，单位秒，默认0
            onSuccess : function(result) {
            },
            onFail : function(err) {}
        })
    })
}

function ddConfig(config) {
    
    dd.config({
        agentId: config.agentId, // 必填，微应用ID
        corpId: config.corpId,//必填，企业ID
        timeStamp: config.timeStamp, // 必填，生成签名的时间戳
        nonceStr: config.nonce, // 必填，生成签名的随机串
        signature: config.signature, // 必填，签名
        jsApiList: ['ui.pullToRefresh.enable','ui.pullToRefresh.stop','biz.util.openLink','biz.navigation.setLeft','biz.navigation.setTitle','biz.navigation.setRight'] // 必填，需要使用的jsapi列表
    });
}

function ddShare(url) {
    dd.ready(() => {
        dd.biz.navigation.setRight({
            show: true,
            control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
            text: '更多',//控制显示文本，空字符串表示显示默认文本
            onSuccess :(result) => {
              dd.biz.util.share({
                type: 0,//分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
                url: url,
                title: '淘租公信享生活',
                content: '生活不将就，乐享每一天。',
                image: 'https://lease.taozugong.com/asset/img/us/logo.png',
                onSuccess : function() {
                },
                onFail : function(err) {}
              })
            },
            onFail:(err) => {}
        });
    }) 
}

//{corpId:1,  userId:1}
function setSession(sessionObj) {
    window.localStorage.clear()
    window.localStorage.setItem('tzgDingDing', JSON.stringify(sessionObj));
}

function getSession() {
    // let sessionObj = {}
    // list.forEach(item => {
    //     sessionObj[item] = window.sessionStorage.getItem(item);
    // })
    // alert(JSON.parse(window.localStorage.getItem('tzgDingDing')))
    return JSON.parse(window.localStorage.getItem('tzgDingDing'))
}


function tranformTow(number) {
    return number < 10 ? '0'+number:number
}

function dateFormat(dateF, length, yearName, monthName, dateName) {//日期
    if (!length) {
        length = 20
    }
    var newDate = new Date(dateF)
    var year = newDate.getFullYear()
    var month = tranformTow(newDate.getMonth()+1)
    var date = tranformTow(newDate.getDate())
    var hour = tranformTow(newDate.getHours())
    var minute = tranformTow(newDate.getMinutes())
    var second = tranformTow(newDate.getSeconds())

    var newDate1 = year + yearName + month + monthName + date + dateName + ' ' + hour + ':' + minute + ':' + second
    return newDate1.substring(0, length)
}

/* 时间戳转化为时间格式 */
function getTime(createTime,a) {
    
	var date = new Date(createTime)
	let Y, M, D, h, m, s
	Y = date.getFullYear() + '年'
	M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
	D = tranformTow(date.getDate()) + '日 '
	h = tranformTow(date.getHours()) + ':'
	m = tranformTow(date.getMinutes())
    s = tranformTow(date.getSeconds())
    
    if(a == 1){
        return Y + M + D
    }else if(a == 2){
        return Y + M + D + h + m 
    }else if(a == 3){
        return Y + M + D + h + m  + ':' + s
    }
}

// function mask(){
//     var w = $(window).width(),
//         h = $(window).height(),
//         div = '<div class="mask"></div>';
//         $(document.body).append('<div class="mask"></div>')
//         $('.mask').css({'position':'fixed','top':'0','left':'0','background-color':'rgba(0,0,0,.7)','width':w,'height':h,'display':'none'});
//         $('.mask').fadeIn(200);
// }
