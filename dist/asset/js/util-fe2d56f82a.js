"use strict";function uploadImg(t,e){return new Promise(function(n,r){var a=t.target.files[0],u=(a.length,new FormData);u.append("picture",a),u.append("filename",a.name),$.ajax({url:e,type:"POST",data:u,contentType:!1,processData:!1,xhrFields:{withCredentials:!0},crossDomain:!0,success:function(t){200==t.code&&n(t.data)},error:function(t){r("上传失败")}})})}function checkIdcard(t){if("string"!=typeof t)return!1;var e,n,r={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},a=t.substr(6,4)+"/"+Number(t.substr(10,2))+"/"+Number(t.substr(12,2)),u=new Date(a),o=u.getFullYear()+"/"+Number(u.getMonth()+1)+"/"+Number(u.getDate()),i=(new Date).getTime(),s=u.getTime(),c=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],d=["1","0","X","9","8","7","6","5","4","3","2"],l=0;if(!/^\d{17}(\d|x)$/i.test(t))return!1;if(void 0===r[t.substr(0,2)])return!1;if(s>=i||a!==o)return!1;for(e=0;e<17;e++)l+=t.substr(e,1)*c[e];return n=d[l%11],n===t.substr(17,1)}function phoneValid(t){var e=/^1[345789]\d{9}$/;return e.test(t)}function emailValid(t){var e=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;return e.test(t)}function getUrlParam(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(e);return null!=n?decodeURI(n[2]):null}function getHostUrl(t){var e="https://lease.taozugong.com";return e+t}function getApiUrl(t){var e="/getapi";return e+t}function ddToast(t){alert(t)}var body=document.body.clientWidth;document.documentElement.style.fontSize=document.documentElement.clientWidth/7.5+"px";