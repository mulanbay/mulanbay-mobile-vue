export function getFormatDate(date,format) {
    return date.Format(format);
}

export function getNowDateTimeString() {
    return new Date().Format("yyyy-MM-dd hh:mm:ss");
}

export function getNowDateString() {
    return new Date().Format("yyyy-MM-dd");
}

export function getDateString(date,format) {
    return date.Format(format);
}

export function formatDateStr(data) {
	if (data == null || data == '') {
		return '--';
	} else {
		return data.substr(0, 10);
	}
}

export function formatTimeStr(data) {
	if (data == null || data == '') {
		return '--';
	} else {
		return data.substr(0, 19);
	}
}

//距离现在的时间
export function tillNowSeconds(now,data) {
	// 支持 火狐、IE
	//data = data.replace(/-/g, "/");
	var nextExecuteTime = Date.parse(data);
	// console.log(nextExecuteTime);
	var nowTime=null;
	if(now==''||now == null){
		nowTime = new Date();
	}else{
		nowTime = Date.parse(now);
	}

	// 秒
	var r = (parseInt(nextExecuteTime - nowTime)) / 1000;
	return r;
}

//距离现在的时间
export function tillNowDays(now,data) {
  var ss = tillNowSeconds(now,data);
  return ss/(24*3600);
}


//距离现在的时分秒
export function tillNowString(second) {
	var time = '';
	if (second < 0) {
		time = '已过去';
		second = Math.abs(second);
	}
	if (second > 3600 * 24) {
		var days = parseInt(second/(3600*24));
		if(days<=30){
			return time + days + '天+';
		}else if(days<=365){
			var months =  parseInt(days/30);
            return time + months + '月+';
        }else{
            return time + '大于一年';
        }
	} else {
		if (second >= 3600) {
			time += parseInt(second / 3600) + '小时';
			second %= 3600;
		}
		if (second >= 60) {
			time += parseInt(second / 60) + '分钟';
			second %= 60;
		}
		if (second > 0) {
			time += parseInt(second) + '秒';
		}
		return time;
	}

}

//距离现在的时分秒
export function formatSeconds(second) {
	var time = '';
	if (second >= 3600 * 24) {
		time += parseInt(second / (3600 * 24)) + '天';
		second %= 3600 * 24;
	}
	if (second >= 3600) {
		time += parseInt(second / 3600) + '小时';
		second %= 3600;
	}
	if (second >= 60) {
		time += parseInt(second / 60) + '分钟';
		second %= 60;
	}
	if (second > 0) {
		time += parseInt(second) + '秒';
	}
	return time;
}

//距离现在的年月日
export function formatDays(days) {
    var time = '';
    if (days >= 365) {
        time += parseInt(days / 365) + '年';
        days %= 365;
    }
    if (days >= 30) {
        time += parseInt(days / 30) + '个月';
        days %= 30;
    }
    if (days > 0) {
        time += parseInt(days) + '天';
    }
    return time;
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

//获取指定日期的月第一天
export function getFirstDayOfMonth(date) {
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    if (month < 10) {
        month = "0" + month;
    }
    var firstDay = year + "-" + month + "-" + "01";//的第一天
	return firstDay;
}

//获取指定日期的月最后一天
export function getLastDayOfMonth(date) {
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    if (month < 10) {
        month = "0" + month;
    }
    var myDate = new Date(year, month, 0);
    var lastDay = year + "-" + month + "-" + myDate.getDate();//月的最后一天
	return lastDay;
}

//获取这周的周一
export function getFirstDayOfWeek (date) {
	var weekday = date.getDay()||7; //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
    date.setDate(date.getDate()-weekday+1);//往前算（weekday-1）天，年份、月份会自动变化
    var y = date.getFullYear(); //年
    var m = date.getMonth() + 1; //月
    var d = date.getDate(); //日
    return y + "-" + m + "-" + d;
}

//获取这周的周一
export function getLastDayOfWeek (date) {
    var weekday = date.getDay()||7; //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
    date.setDate(date.getDate()-weekday+7);//往前算（weekday-1）天，年份、月份会自动变化
    var y = date.getFullYear(); //年
    var m = date.getMonth() + 1; //月
    var d = date.getDate(); //日
    return y + "-" + m + "-" + d;
}

// 获取距离当前日期，n为距离天数，负数表示往前
export function getDay(n){
    var dd = new Date();
    dd.setDate(dd.getDate()+n);
    return dd.Format('yyyy-MM-dd');
}

// 距离指定日期天数后的日期
export function getDayByDate(n,dateString){
    var dd = new Date(dateString.replace(/-/,"/"))
    dd.setDate(dd.getDate()+n);
    return dd.Format('yyyy-MM-dd');
}

// 获取距离当前日期，n为距离月数，负数表示往前
export function getMonth(n,dateString){
    var dd = new Date(dateString.replace(/-/,"/"))
    dd.setMonth(dd.getMonth()+n);
    return dd.Format('yyyy-MM-dd');
}

export function getYear(n){
    var dd = new Date();
    return dd.getFullYear()+n;
}

// 分钟转换为小时，n为小数位数
export function minuteToHour(minute,n) {
	var res= minute/60.0;
    return res.toFixed(n);
}

// 年的时间段
export function getYearDateRange(n) {
    const year = getYear(n);
    return [year+'-01-01',year+'-12-31'];
}

// 月的时间段
export function getMonthDateRange(date) {
    return [getFirstDayOfMonth(date),getLastDayOfMonth(date)];
}

//两个日期间天数
export function dateDiff(sDate1,  sDate2){
	//sDate1和sDate2是2002-12-18格式
    var oDate1,  oDate2,  iDays;
    var oDate1 = Date.parse(sDate1);
    var oDate2 = Date.parse(sDate2);;
    var iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);   //把相差的毫秒数转换为天数
    return  iDays;
}

//两个日期间小时
export function hourDiff(sDate1,  sDate2){
    //sDate1和sDate2是2002-12-18格式
    var oDate1,  oDate2,  iDays;
    var oDate1 = Date.parse(sDate1);
    var oDate2 = Date.parse(sDate2);;
    var iDays  =  parseFloat(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60 );   //把相差的毫秒数转换为天数
    return  iDays;
}

//两个时间间的分钟
export function minuteDiff(sDate1,  sDate2){
    //sDate1和sDate2是2002-12-18格式
    var oDate1,  oDate2,  iDays;
    var oDate1 = Date.parse(sDate1);
    var oDate2 = Date.parse(sDate2);;
    var iDays  =  parseFloat(Math.abs(oDate1  -  oDate2)  /  1000  /  60  );   //把相差的毫秒数转换为天数
    return  iDays;
}

// 格式化时间的描述
export function formatDateDesc(dateString){
    var dd = new Date(dateString.replace(/-/,"/"))
    if(new Date().toString().substr(0, 15) === dd.toString().substr(0, 15)){
      //今天,取时分
      return dateString.substr(11, 5);
    }else{
      //取日期
      return dateString.substr(0, 10);
    }
}

//美化时间
export function beautifyDateTime(dateTimeString){
  if(dateTimeString==null){
    return null;
  }
  let dd = new Date(dateTimeString.replace(/-/,"/"))
  let today = new Date();
  //取今天凌晨
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  let offset = today.getTime()-dd.getTime();
  if(offset<=0){
    if(offset>=-24*3600*1000){
      //今天,取时分
      return dateTimeString.substr(11, 5);
    }else{
      //将来
      return dateTimeString+'(将来)';
    }
  }else{
    if(offset<=24*3600*1000){
      //昨天,取时分
      return '昨天'+dateTimeString.substr(11, 5);
    }else{
      //
      return dateTimeString;
    }
  }
}

//美化时间
export function beautifyDate(dateString){
  if(dateString==null){
    return null;
  }
  let dd = new Date(dateString.replace(/-/,"/"))
  let today = new Date();
  //取今天凌晨
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  let offset = today.getTime()-dd.getTime();
  if(offset<=0){
    if(offset>=-24*3600*1000){
      //今天,取时分
      return dateString;
    }else{
      //将来
      return dateString+'(将来)';
    }
  }else{
    if(offset<=24*3600*1000){
      //昨天,取时分
      return dateString+'(昨天)';
    }else{
      //
      return dateString;
    }
  }
}

// 小时的描述
export function getHourDesc(date) {
  var hs= date.substr(11,2);
  var h =parseInt(hs);
  if (0<=h&&h<11) {
    return '上午';
  }else if(11<=h&&h<12){
    return '中午';
  }else if(12<h&&h<=17){
    return '下午';
  }else {
    return '晚上';
  }
}
