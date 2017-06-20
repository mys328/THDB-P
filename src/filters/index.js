/**
 * 个位数前加零
 * @param  {Number} val
 * @return {String/Number}
 */
const zerofill = val => val >= 10 ? val : '0' + val
/* 相当于：
  var zerofill = function (val) {
    return val >=10 ? val : '0' + val
  };
*/
const pluralize = function (time, label) {
    if (time < 2 && label === '分钟') {
        return '刚刚'
    }
    return time + label + '前'
}

const filters = {
  /**
   * 功能：将时间戳按照给定的 时间/日期 格式进行处理
   * @param {Number} date 时间戳
   * @param {String} fmtExp 时间格式 'hh:ss'
   * @returns {String} 规范后的 时间/日期 字符串
   */
    fmtDate: function (date, fmtExp) {
        var dates = new Date(date)
        var o = {
            'M+': dates.getMonth() + 1, // 月份
            'd+': dates.getDate(), // 日
            'h+': dates.getHours(), // 小时
            'm+': dates.getMinutes(), // 分
            's+': dates.getSeconds(), // 秒
            'q+': Math.floor((dates.getMonth() + 3) / 3), // 季度
            'S': dates.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmtExp)) {
            fmtExp = fmtExp.replace(RegExp.$1, (dates.getFullYear() + '').substr(4 - RegExp.$1.length))
        }

        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmtExp)) {
                fmtExp = fmtExp.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
            }
        }
        return fmtExp
    },

    timeAgo: function (time) {
        const between = Date.now() - Number(time)
        if (between < 3600000) {
            return pluralize(~~(between / 60000), '分钟')
        } else if (between < 86400000) {
            return pluralize(~~(between / 3600000), '小时')
        } else {
            return pluralize(~~(between / 86400000), '天')
        }
    },

  /**
   * 格式化时间
   * @param  {Number} time 时间戳
   * @param  {Number} type 格式化类型
   * @return {String}
   */
    dataTimeFgo: function (time) {
        let times = time * 1
        let date = new Date(times)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
    // let hours = date.getHours()
    // let minutes = date.getMinutes()
    // let second = date.getSeconds()

    // 2015-01-05
        return `${year}-${zerofill(month)}-${zerofill(day)}`

    // 2015-01-05 11:12:13
    // return `${year}-${zerofill(month)}-${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}:${zerofill(second)}`
    }

}

export default (Vue) => {
    Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
    })
}
