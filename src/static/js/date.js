function getOverdueTime(year, month, date, time) {//3  7

    if (isNaN(parseInt(year))) {
        year = 0
    }
    if (isNaN(parseInt(month))) {
        month = 0
    }
    if (isNaN(parseInt(date))) {
        date = 0
    }

    var _date = new Date(time)
    var _year = _date.getFullYear() + parseInt(year)
    var _mouth = _date.getMonth() + parseInt(month)
    var _dateDay = _date.getDate() + parseInt(date)


    var newDate = new Date(_year, _mouth, _dateDay, _date.getHours(), _date.getMinutes(), _date.getSeconds())

    var year = newDate.getFullYear()
    var month = tranformTow(newDate.getMonth()+1)
    var date = tranformTow(newDate.getDate())
    var hour = tranformTow(newDate.getHours())
    var minute = tranformTow(newDate.getMinutes())
    var second = tranformTow(newDate.getSeconds())

    // var time = dateFormat(newDate,16, '-', '-', '')

    var overdueTime = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    return overdueTime
}

function dateFormat(dateF, length, yearName, monthName, dateName) {//日期
    if (!length) {
        length = 19
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

function tranformTow(number) {
    return number < 10 ? '0'+number:number
}
/* 时间戳转化为时间格式 */
function getTime(createTime,a) {
    
	var date = new Date(createTime)
	let Y, M, D, h, m, s
	Y = date.getFullYear() + '年'
	M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
	D = date.getDate() + '日'
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

// export default {
//     getOverdueTime,
//     dateFormat
// }