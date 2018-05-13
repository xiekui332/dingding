"use strict";function uploadImg(t,e){return new Promise(function(n,o){var r=t.target.files[0],i=(r.length,new FormData);i.append("picture",r),i.append("filename",r.name),$.ajax({url:e,type:"POST",data:i,contentType:!1,processData:!1,xhrFields:{withCredentials:!0},crossDomain:!0,success:function(t){200==t.code&&n(t.data)},error:function(t){o("上传失败")}})})}function checkIdcard(t){if("string"!=typeof t)return!1;var e,n,o={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},r=t.substr(6,4)+"/"+Number(t.substr(10,2))+"/"+Number(t.substr(12,2)),i=new Date(r),a=i.getFullYear()+"/"+Number(i.getMonth()+1)+"/"+Number(i.getDate()),u=(new Date).getTime(),s=i.getTime(),c=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],g=["1","0","X","9","8","7","6","5","4","3","2"],d=0;if(!/^\d{17}(\d|x)$/i.test(t))return!1;if(void 0===o[t.substr(0,2)])return!1;if(s>=u||r!==a)return!1;for(e=0;e<17;e++)d+=t.substr(e,1)*c[e];return n=g[d%11],n===t.substr(17,1)}function phoneValid(t){var e=/^1[345789]\d{9}$/;return e.test(t)}function emailValid(t){var e=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;return e.test(t)}function getUrlParam(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(e);return null!=n?decodeURI(n[2]):null}function getHostUrl(t){var e="https://lease.taozugong.com";return e+t}function getApiUrl(t){var e="http://api.taozugong.com:8080";return e+t}function getPhpApiUrl(t){var e="http://test.api.taozugong.net";return e+t}function ddToast(t){dd.device.notification.toast({icon:"",text:t,duration:3,delay:0,onSuccess:function(t){},onFail:function(t){}})}function ddConfig(t){alert("config"),dd.config({agentId:t.agentId,corpId:t.corpId,timeStamp:t.timeStamp,nonceStr:t.nonce,signature:t.signature,jsApiList:["runtime.permission","runtime.info","ui.pullToRefresh.enable","ui.pullToRefresh.stop","biz.util.openLink","biz.navigation.setLeft","biz.navigation.setTitle","biz.navigation.setRight"]}),alert("configend")}function setSession(t){window.localStorage.clear(),window.localStorage.setItem("tzgDingDing",JSON.stringify(t))}function getSession(){return JSON.parse(window.localStorage.getItem("tzgDingDing"))}function tranformTow(t){return t<10?"0"+t:t}function dateFormat(t,e,n,o,r){e||(e=20);var i=new Date(t),a=i.getFullYear(),u=tranformTow(i.getMonth()+1),s=tranformTow(i.getDate()),c=tranformTow(i.getHours()),g=tranformTow(i.getMinutes()),d=tranformTow(i.getSeconds()),f=a+n+u+o+s+r+" "+c+":"+g+":"+d;return f.substring(0,e)}function getTime(t,e){var n=new Date(t),o=void 0,r=void 0,i=void 0,a=void 0,u=void 0,s=void 0;return o=n.getFullYear()+"年",r=(n.getMonth()+1<10?"0"+(n.getMonth()+1):n.getMonth()+1)+"月",i=tranformTow(n.getDate())+"日 ",a=tranformTow(n.getHours())+":",u=tranformTow(n.getMinutes()),s=tranformTow(n.getSeconds()),1==e?o+r+i:2==e?o+r+i+a+u:3==e?o+r+i+a+u+":"+s:void 0}var body=document.body.clientWidth;document.documentElement.style.fontSize=document.documentElement.clientWidth/7.5+"px";