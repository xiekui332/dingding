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
    console.info('newDate:'+newDate)

    var year = newDate.getFullYear()
    var month = tranformTow(newDate.getMonth()+1)
    var date = tranformTow(newDate.getDate())
    var hour = tranformTow(newDate.getHours())
    var minute = tranformTow(newDate.getMinutes())
    var second = tranformTow(newDate.getSeconds())

    var newDate = year + yearName + month + monthName + date + dateName + ' ' + hour + ':' + minute + ':' + second

    return newDate.substring(0, length)
}

function tranformTow(number) {
    return number < 10 ? '0'+number:number
}

export default {
    getOverdueTime,
    dateFormat
}